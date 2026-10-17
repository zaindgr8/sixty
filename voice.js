// "Talk to Freya" floating orb: a live browser voice call with a Retell agent.
// The server (/api/voice-call) creates the call; the Retell web SDK is only loaded when someone starts one.

const SDK_URL = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.8/+esm';

const $ = (id) => document.getElementById(id);
const wrap = $('vdemo');
const orb = $('orb');
const panel = $('vpanel');
const idle = $('vp-idle');
const live = $('vp-live');
const form = $('vp-form');
const startBtn = $('vp-start');
const stateEl = $('vp-state');
const timerEl = $('vp-timer');
const errEl = $('vp-err');

let client = null;
let phase = 'idle'; // idle | connecting | live
let startedAt = 0;
let tick = null;
let raf = null;

function open(show) {
  panel.hidden = !show;
  orb.setAttribute('aria-expanded', String(show));
  wrap.classList.toggle('open', show);
  if (show && phase === 'idle') setTimeout(() => $('vp-name').focus(), 50);
}

function setPhase(p, label) {
  phase = p;
  wrap.dataset.phase = p;
  idle.hidden = p !== 'idle';
  live.hidden = p === 'idle';
  if (label) stateEl.textContent = label;
}

function showError(msg) { errEl.textContent = msg || ''; }

function startTimer() {
  startedAt = Date.now();
  tick = setInterval(() => {
    const s = Math.floor((Date.now() - startedAt) / 1000);
    timerEl.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }, 500);
}

// Drive the orb and meter from the agent's voice level.
function animateLevel() {
  const vol = client?.analyzerComponent?.calculateVolume?.() ?? (client?.isAgentTalking ? 0.5 : 0);
  wrap.style.setProperty('--lvl', Math.min(1, vol * 2.2).toFixed(3));
  raf = requestAnimationFrame(animateLevel);
}

function reset(message) {
  clearInterval(tick);
  cancelAnimationFrame(raf);
  wrap.style.setProperty('--lvl', 0);
  wrap.classList.remove('talking');
  timerEl.textContent = '00:00';
  setPhase('idle');
  startBtn.disabled = false;
  if (message) showError(message);
}

async function start(name) {
  showError('');
  startBtn.disabled = true;
  setPhase('connecting', 'Connecting to Freya…');

  try {
    // Ask for the mic first so a blocked mic doesn't create a call.
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
  } catch {
    return reset('Please allow microphone access to talk to Freya.');
  }

  try {
    const [{ RetellWebClient }, res] = await Promise.all([
      import(SDK_URL),
      fetch('/api/voice-call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) }),
    ]);
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.accessToken) throw new Error(out.error || "We couldn't start the call. Please try again.");

    client = new RetellWebClient();
    client.on('call_started', () => { setPhase('live', 'Freya is on the line'); startTimer(); animateLevel(); });
    client.on('agent_start_talking', () => { wrap.classList.add('talking'); stateEl.textContent = 'Freya is speaking'; });
    client.on('agent_stop_talking', () => { wrap.classList.remove('talking'); stateEl.textContent = 'Listening…'; });
    client.on('call_ended', () => { client = null; reset(); showError('Call ended. Want Sixty to make calls like this for you? Book a demo below.'); });
    client.on('error', (e) => { console.error('Retell error', e); client?.stopCall(); client = null; reset('The call dropped. Please try again.'); });

    await client.startCall({ accessToken: out.accessToken });
  } catch (err) {
    client = null;
    reset(err.message || "We couldn't start the call. Please try again.");
  }
}

function end() {
  if (client) client.stopCall();
  else reset();
}

orb.addEventListener('click', () => {
  if (phase !== 'idle') return open(true);
  open(panel.hidden);
});
$('vp-close').addEventListener('click', () => open(false));
$('vp-end').addEventListener('click', end);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (phase === 'idle') start($('vp-name').value.trim());
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !panel.hidden && phase === 'idle') { open(false); orb.focus(); }
});
addEventListener('beforeunload', () => client?.stopCall());

// The label slides in shortly after load to invite a click.
setTimeout(() => $('orb-label').classList.add('show'), 1800);
