// Live voice with Freya, Sixty's AI sales agent, on Gemini Live.
// One shared engine (window.sixtyVoice) drives both the floating orb and the "Call" tab of the live demo.
// /api/voice-call returns a one-time Gemini token (prompt, voice and tools are locked server-side).
// The browser streams 16 kHz mic audio up and plays Gemini's 24 kHz audio back.
//
// The engine announces everything on window as 'sixty:voice' events, detail.type is one of:
//   phase {phase: idle|connecting|live, message?} · level {lvl} · user {text} · agent {text}
//   turn {} (Freya finished speaking) · booked {args}

const WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained';
const MAX_CALL_MS = 10 * 60_000;

const emit = (type, detail = {}) => dispatchEvent(new CustomEvent('sixty:voice', { detail: { type, ...detail } }));

const b64 = {
  fromBytes(bytes) { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); },
  toBytes(str) { const bin = atob(str); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; },
};

// Captures mic audio, downsamples to 16 kHz and converts to 16-bit PCM in an AudioWorklet.
const WORKLET = `
class Pcm16 extends AudioWorkletProcessor {
  constructor() { super(); this.buf = []; this.ratio = sampleRate / 16000; this.pos = 0; }
  process(inputs) {
    const ch = inputs[0][0];
    if (!ch) return true;
    for (; this.pos < ch.length; this.pos += this.ratio) {
      const s = Math.max(-1, Math.min(1, ch[Math.floor(this.pos)]));
      this.buf.push(s < 0 ? s * 0x8000 : s * 0x7fff);
    }
    this.pos -= ch.length;
    if (this.buf.length >= 1600) { // 100 ms chunks
      const pcm = new Int16Array(this.buf); this.buf = [];
      this.port.postMessage(pcm.buffer, [pcm.buffer]);
    }
    return true;
  }
}
registerProcessor('pcm16', Pcm16);`;


// ---- Office ambience: quiet room tone, distant chatter and the odd burst of typing behind Freya ----
// Generated in the browser (no audio files). It plays straight to the speakers, so it doesn't move the orb.
const AMBIENCE_VOLUME = 1; // 0 turns it off; 1.5 is noticeably busier

function startAmbience(ctx) {
  if (!AMBIENCE_VOLUME) return () => {};
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(AMBIENCE_VOLUME, ctx.currentTime + 1.5); // fade in
  master.connect(ctx.destination);

  const noise = (seconds, brown) => {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    return buf;
  };
  const loop = (buf) => { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; };

  // 1. Room tone / air conditioning
  const room = loop(noise(4, true));
  const roomLp = ctx.createBiquadFilter(); roomLp.type = 'lowpass'; roomLp.frequency.value = 700;
  const roomGain = ctx.createGain(); roomGain.gain.value = 0.05;
  room.connect(roomLp).connect(roomGain).connect(master);

  // 2. Distant chatter: voice-band noise whose loudness drifts like people talking across the office
  const chat = loop(noise(3, false));
  const chatBp = ctx.createBiquadFilter(); chatBp.type = 'bandpass'; chatBp.frequency.value = 520; chatBp.Q.value = 1.4;
  const chatGain = ctx.createGain(); chatGain.gain.value = 0.006;
  chat.connect(chatBp).connect(chatGain).connect(master);
  const chatter = setInterval(() => {
    const t = ctx.currentTime;
    chatGain.gain.linearRampToValueAtTime(0.002 + Math.random() * 0.012, t + 0.25);
    chatBp.frequency.linearRampToValueAtTime(380 + Math.random() * 400, t + 0.25);
  }, 280);

  // 3. Someone typing nearby, in short bursts every few seconds
  const clickBuf = noise(0.02, false);
  const click = (at, level) => {
    const s = ctx.createBufferSource(); s.buffer = clickBuf;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800 + Math.random() * 1500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.018);
    s.connect(hp).connect(g).connect(master);
    s.start(at); s.stop(at + 0.03);
  };
  let typingTimer = null;
  const typingBurst = () => {
    let t = ctx.currentTime + 0.05;
    const keys = 6 + Math.floor(Math.random() * 22);
    for (let i = 0; i < keys; i++) { t += 0.07 + Math.random() * 0.12; click(t, 0.012 + Math.random() * 0.016); }
    typingTimer = setTimeout(typingBurst, 3500 + Math.random() * 9000);
  };
  typingTimer = setTimeout(typingBurst, 2000);

  return () => {
    clearInterval(chatter);
    clearTimeout(typingTimer);
    try { master.gain.setTargetAtTime(0, ctx.currentTime, 0.2); } catch { /* context closed */ }
    setTimeout(() => { try { room.stop(); chat.stop(); master.disconnect(); } catch { /* already stopped */ } }, 600);
  };
}

const engine = (() => {
  let phase = 'idle';
  let ws = null, mic = null, out = null;
  let raf = null, limitTimer = null, booked = false, stopAmbience = () => {};
  let callId = '', callStartedAt = 0; // one CRM row per call

  const setPhase = (p, message) => { phase = p; emit('phase', { phase: p, message, callId, startedAt: callStartedAt }); };

  async function startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
    const ctx = new AudioContext();
    const url = URL.createObjectURL(new Blob([WORKLET], { type: 'application/javascript' }));
    await ctx.audioWorklet.addModule(url);
    URL.revokeObjectURL(url);
    const source = ctx.createMediaStreamSource(stream);
    const node = new AudioWorkletNode(ctx, 'pcm16');
    node.port.onmessage = (e) => {
      if (ws?.readyState !== WebSocket.OPEN || phase !== 'live') return;
      ws.send(JSON.stringify({ realtimeInput: { audio: { data: b64.fromBytes(new Uint8Array(e.data)), mimeType: 'audio/pcm;rate=16000' } } }));
    };
    source.connect(node);
    mic = { stream, ctx };
  }

  function startOutput() {
    const ctx = new AudioContext({ sampleRate: 24000 });
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.connect(ctx.destination);
    out = { ctx, analyser, nextAt: 0, sources: new Set() };
  }

  function playPcm(base64) {
    if (!out) return;
    const bytes = b64.toBytes(base64);
    const pcm = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 1);
    const f32 = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) f32[i] = pcm[i] / 0x8000;
    const buf = out.ctx.createBuffer(1, f32.length, 24000);
    buf.copyToChannel(f32, 0);
    const src = out.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(out.analyser);
    const at = Math.max(out.ctx.currentTime + 0.02, out.nextAt);
    src.start(at);
    out.nextAt = at + buf.duration;
    out.sources.add(src);
    src.onended = () => out?.sources.delete(src);
  }

  function flushPlayback() {
    if (!out) return;
    for (const s of out.sources) { try { s.stop(); } catch { /* already stopped */ } }
    out.sources.clear();
    out.nextAt = 0;
  }

  function level() {
    let lvl = 0;
    if (out) {
      const buf = new Uint8Array(out.analyser.fftSize);
      out.analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (const v of buf) { const x = (v - 128) / 128; sum += x * x; }
      lvl = Math.min(1, Math.sqrt(sum / buf.length) * 4);
    }
    emit('level', { lvl });
    raf = requestAnimationFrame(level);
  }

  async function onMessage(ev) {
    const text = typeof ev.data === 'string' ? ev.data : await ev.data.text();
    let m;
    try { m = JSON.parse(text); } catch { return; }

    if (m.setupComplete) {
      setPhase('live');
      level();
      if (out) stopAmbience = startAmbience(out.ctx);
      limitTimer = setTimeout(() => stop('That’s the end of the demo call. Thanks for talking to Freya!'), MAX_CALL_MS);
      const greet = document.documentElement.dataset.lang === 'nl'
        ? '(De bezoeker is zojuist het gesprek gestart vanaf de Sixty-website. Begroet hem of haar kort en warm in het Nederlands als Freya van Sixty en vraag met wie je spreekt.)'
        : '(The visitor just joined the call from the Sixty website. Greet them warmly and briefly as "Freya from Sixty" and ask who you are speaking with.)';
      ws.send(JSON.stringify({ clientContent: { turns: [{ role: 'user', parts: [{ text: greet }] }], turnComplete: true } }));
      return;
    }
    const sc = m.serverContent;
    if (sc) {
      if (sc.interrupted) flushPlayback();
      for (const p of sc.modelTurn?.parts || []) if (p.inlineData?.data) playPcm(p.inlineData.data);
      if (sc.inputTranscription?.text) emit('user', { text: sc.inputTranscription.text });
      if (sc.outputTranscription?.text) emit('agent', { text: sc.outputTranscription.text });
      if (sc.turnComplete) emit('turn');
    }
    if (m.toolCall?.functionCalls) {
      const responses = [];
      for (const fc of m.toolCall.functionCalls) {
        responses.push({ id: fc.id, name: fc.name, response: fc.name === 'book_demo' ? await bookDemo(fc.args || {}) : { error: 'Unknown tool' } });
      }
      ws?.send(JSON.stringify({ toolResponse: { functionResponses: responses } }));
    }
    if (m.goAway) stop('The call reached its time limit. Thanks for talking to Freya!');
  }

  // The booking goes to the team inbox through the same endpoint as the contact form.
  async function bookDemo(a) {
    if (booked) return { result: 'Already booked earlier in this call.' };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: a.name, email: a.email, phone: a.phone || '', company: a.company || 'Not given',
          country: a.country || '', industry: a.industry || 'Other', interest: a.interest || 'WhatsApp AI Agent',
          plan: 'Booked by voice with Freya', source: 'voice', meeting_time: a.meeting_time || '', record_id: callId,
          contact_pref: a.phone ? 'WhatsApp' : 'Email',
          message: `Demo booked by voice with Freya.\nMeeting: ${a.meeting_time}\n\nUse case: ${a.use_case || '—'}`,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) return { error: j.error || 'Booking failed. Ask them to email management@devmatesolutions.com instead.' };
      booked = true;
      emit('booked', { args: a });
      return { result: 'Booked. The team will email the calendar invite.' };
    } catch {
      return { error: 'Booking failed because of a connection problem. Ask them to email management@devmatesolutions.com instead.' };
    }
  }

  async function start() {
    if (phase !== 'idle') return;
    booked = false;
    callId = `call-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    callStartedAt = Date.now();
    setPhase('connecting');
    startOutput(); // created inside the click so the browser lets it play sound
    try {
      await startMic();
    } catch {
      return cleanup('Please allow microphone access to talk to Freya.');
    }
    out?.ctx.resume().catch(() => {});
    try {
      const res = await fetch('/api/voice-call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: document.documentElement.dataset.lang || 'en' }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) throw new Error(data.error || "We couldn't start the call. Please try again.");
      ws = new WebSocket(`${WS_URL}?access_token=${encodeURIComponent(data.token)}`);
      ws.onopen = () => ws.send(JSON.stringify({ setup: { model: data.model } }));
      ws.onmessage = onMessage;
      ws.onerror = () => cleanup('The call dropped. Please try again.');
      ws.onclose = (e) => { if (phase !== 'idle') cleanup(e.code === 1000 ? '' : 'The call ended unexpectedly. Please try again.'); };
    } catch (err) {
      cleanup(err.message);
    }
  }

  function stop(message) {
    cleanup(message || (booked ? 'Your demo is booked. Watch your inbox for the invite!' : 'Call ended. Thanks for talking to Freya!'));
  }

  function cleanup(message) {
    clearTimeout(limitTimer);
    cancelAnimationFrame(raf);
    stopAmbience();
    stopAmbience = () => {};
    const socket = ws;
    ws = null;
    if (socket && socket.readyState <= 1) { socket.onclose = null; socket.close(1000); }
    if (mic) { mic.stream.getTracks().forEach((t) => t.stop()); mic.ctx.close().catch(() => {}); mic = null; }
    if (out) { flushPlayback(); out.ctx.close().catch(() => {}); out = null; }
    emit('level', { lvl: 0 });
    setPhase('idle', message || '');
  }

  addEventListener('pagehide', () => { if (phase !== 'idle') cleanup(); });
  return { start, stop, get phase() { return phase; } };
})();
window.sixtyVoice = engine;

// ---- Floating orb UI ----
(() => {
  const $ = (id) => document.getElementById(id);
  const wrap = $('vdemo');
  if (!wrap) return;
  const orb = $('orb'), panel = $('vpanel'), idle = $('vp-idle'), live = $('vp-live');
  const startBtn = $('vp-start'), stateEl = $('vp-state'), timerEl = $('vp-timer'), errEl = $('vp-err'), capEl = $('vp-caption');
  let tick = null, startedAt = 0, caption = '';

  function open(show) {
    panel.hidden = !show;
    orb.setAttribute('aria-expanded', String(show));
    wrap.classList.toggle('open', show);
    if (show && engine.phase === 'idle') setTimeout(() => startBtn.focus(), 50);
  }

  addEventListener('sixty:voice', ({ detail: d }) => {
    if (d.type === 'phase') {
      wrap.dataset.phase = d.phase;
      idle.hidden = d.phase !== 'idle';
      live.hidden = d.phase === 'idle';
      startBtn.disabled = d.phase !== 'idle';
      if (d.phase === 'connecting') { errEl.textContent = ''; capEl.textContent = ''; stateEl.textContent = 'Connecting to Freya…'; }
      if (d.phase === 'live') {
        startedAt = Date.now();
        tick = setInterval(() => {
          const s = Math.floor((Date.now() - startedAt) / 1000);
          timerEl.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
        }, 500);
      }
      if (d.phase === 'idle') { clearInterval(tick); timerEl.textContent = '00:00'; errEl.textContent = d.message || ''; }
    } else if (d.type === 'level') {
      wrap.style.setProperty('--lvl', d.lvl.toFixed(3));
      const talking = d.lvl > 0.04;
      wrap.classList.toggle('talking', talking);
      if (engine.phase === 'live') stateEl.textContent = talking ? 'Freya is speaking' : 'Listening…';
    } else if (d.type === 'agent') {
      caption += d.text;
      capEl.textContent = caption.slice(-160);
    } else if (d.type === 'turn') {
      caption = '';
    }
  });

  orb.addEventListener('click', () => (engine.phase !== 'idle' ? open(true) : open(panel.hidden)));
  $('vp-close').addEventListener('click', () => open(false));
  $('vp-end').addEventListener('click', () => engine.stop());
  $('vp-form').addEventListener('submit', (e) => { e.preventDefault(); engine.start(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden && engine.phase === 'idle') { open(false); orb.focus(); }
  });
  window.sixtyOrb = { open };

  // The label slides in shortly after load to invite a click.
  setTimeout(() => $('orb-label').classList.add('show'), 1800);
})();
