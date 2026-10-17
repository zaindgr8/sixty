// Live demo: a WhatsApp-style chat with Freya (Gemini via /api/wa-chat)
// and a clickable CRM that updates as she learns about the visitor.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = $('#crm');
  if (!root) return;

  // ---- tiny DOM helper (always textContent, never innerHTML for user/AI text) ----
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : String(k));
    return el;
  }
  const clock = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  // ---- state ----
  const STAGES = ['New', 'Qualified', 'Booked', 'Won'];
  const cards = [
    { id: 'omar', name: 'Omar K.', detail: '2BR · JVC · AED 90k', stage: 'New' },
    { id: 'lisa', name: 'Lisa M.', detail: 'Table for 6 · Fri', stage: 'New' },
    { id: 'sara', name: 'Sara A.', detail: 'Ready this month', stage: 'Qualified', hot: true },
    { id: 'dan', name: 'Dan R.', detail: 'Pre-approved', stage: 'Qualified' },
    { id: 'priya', name: 'Priya S.', detail: 'Sat 11:00 viewing', stage: 'Booked' },
    { id: 'mike', name: 'Mike T.', detail: 'Test drive · Thu', stage: 'Booked' },
    { id: 'ali', name: 'Ali H.', detail: 'Signed · AED 140k', stage: 'Won', won: true },
  ];
  const FIELDS = [
    ['lead_name', 'Name'], ['company', 'Company'], ['industry', 'Industry'], ['location', 'Location'],
    ['lead_sources', 'Lead sources'], ['monthly_leads', 'Monthly leads'], ['crm', 'CRM'], ['pain', 'Main pain'],
    ['interest', 'Interested in'], ['meeting_time', 'Demo meeting'], ['email', 'Email'], ['next_step', 'Next step'],
  ];
  const state = {
    view: 'pipeline',
    // Conversation sent to Gemini each turn; starts with Freya's greeting from the page.
    history: [{ role: 'model', text: document.querySelector('#wa-log .wam.in')?.firstChild?.textContent?.trim() || '' }],
    lead: null, // created on the first message
    lastMsg: '',
    aiOn: true,
    needsHuman: false,
    replyMs: [],
    events: [],
    settings: { language: true, hours: false, tone: 'Friendly' },
    sources: { 'Property portals': 46, 'Meta ads': 31, 'Website': 14, 'Missed calls': 9 },
    inboxPick: null,
  };

  // ---- activity feed ----
  function log(text) {
    state.events.unshift({ at: clock(), text });
    $('#feed-text').textContent = text;
    const feed = $('#crm-feed');
    feed.classList.remove('pulse'); void feed.offsetWidth; feed.classList.add('pulse');
    if (state.view === 'lead') render();
  }

  // ---- views ----
  const views = {
    pipeline() {
      const all = [...cards];
      if (state.lead) {
        const st = STAGES.includes(state.lead.stage) ? state.lead.stage : 'New';
        all.unshift({ id: 'you', you: true, stage: st, name: state.lead.lead_name || 'You', detail: [state.lead.company, state.lead.industry, state.lead.monthly_leads].filter(Boolean).join(' · ') || `New ${channelLabel()} lead` });
      }
      return h('div', { class: 'p-board' }, STAGES.map((stage) => {
        const list = all.filter((c) => c.stage === stage);
        const base = { New: 24, Qualified: 18, Booked: 11, Won: 6 }[stage];
        return h('div', { class: 'p-col', 'data-stage': stage, ondragover: (e) => { e.preventDefault(); e.currentTarget.classList.add('over'); }, ondragleave: (e) => e.currentTarget.classList.remove('over'), ondrop: (e) => drop(e, stage) },
          h('h4', {}, stage, h('i', {}, String(base + list.filter((c) => c.you).length))),
          list.map((c) => h('div', { class: `p-card${c.hot ? ' hot' : ''}${c.won ? ' won' : ''}${c.you ? ' you' : ''}${c.you && state.needsHuman ? ' human' : ''}`, draggable: 'true', 'data-id': c.id, ondragstart: (e) => { e.dataTransfer.setData('text/plain', c.id); e.currentTarget.classList.add('drag'); }, ondragend: (e) => e.currentTarget.classList.remove('drag'), onclick: c.you ? () => go('lead') : null },
            c.you ? h('em', { class: 'you-tag' }, state.needsHuman ? 'Needs human' : 'You · live') : null,
            h('b', {}, c.name), h('span', {}, c.detail))));
      }));
    },

    lead() {
      if (!state.lead) return empty('Your lead card appears here as soon as you message Freya.');
      const L = state.lead;
      return h('div', { class: 'lead-view' },
        h('div', { class: 'lead-top' },
          h('span', { class: 'lead-av' }, (L.lead_name || '?').slice(0, 1).toUpperCase()),
          h('div', {}, h('b', {}, L.lead_name || 'New lead'), h('small', {}, [L.company, L.location].filter(Boolean).join(' · ') || `${channelLabel()} · just now`)),
          h('span', { class: `stage-pill s-${(L.stage || 'New').replace(/\s/g, '')}` }, state.needsHuman ? 'Needs human' : L.stage || 'New')),
        h('dl', { class: 'lead-fields' }, FIELDS.map(([k, label]) => h('div', { class: L[k] ? 'on' : '' }, h('dt', {}, label), h('dd', {}, L[k] || '—')))),
        h('div', { class: 'lead-log' }, h('h4', {}, 'Activity'), h('ol', {}, state.events.slice(0, 8).map((e) => h('li', {}, h('time', {}, e.at), e.text)))));
    },

    inbox() {
      const rows = [
        state.lead && { id: 'you', name: state.lead.lead_name || 'You', msg: (state.lead.channels.at(-1) === 'Call' ? '📞 ' : '') + (state.lastMsg || ''), time: clock(), unread: true, you: true },
        { id: 'omar', name: 'Omar K.', msg: 'Is the JVC 2BR still available?', time: '9:41 PM', ai: 'Yes! It’s available at AED 90k. Want to see it Thursday 6:30pm or Saturday 11am?' },
        { id: 'lisa', name: 'Lisa M.', msg: 'Table for 6 Friday 8pm?', time: '8:12 PM', ai: 'Done ✓ Friday 8:00pm for 6. See you then!' },
        { id: 'sara', name: 'Sara A.', msg: 'Can I see it this week?', time: '7:03 PM', ai: 'Of course. Thursday 6:30pm or Saturday 11am?' },
      ].filter(Boolean);
      const pick = rows.find((r) => r.id === state.inboxPick && !r.you);
      return h('div', { class: 'inbox' },
        h('ul', { class: 'inbox-list' }, rows.map((r) => h('li', {},
          h('button', { type: 'button', class: `${r.you ? 'you' : ''}${state.inboxPick === r.id ? ' on' : ''}`, onclick: () => { if (r.you) { $('#wa-text').focus(); return; } state.inboxPick = r.id; render(); } },
            h('span', { class: 'lead-av sm' }, r.name.slice(0, 1)),
            h('span', { class: 'ib-txt' }, h('b', {}, r.name, r.you ? h('em', { class: 'you-tag' }, 'live') : null), h('small', {}, r.msg || '…')),
            h('time', {}, r.time))))),
        pick ? h('div', { class: 'ib-thread' }, h('p', { class: 'wam out' }, pick.msg), h('p', { class: 'wam in' }, pick.ai), h('small', {}, 'Answered by Sixty in 4 seconds')) : h('div', { class: 'ib-thread hint' }, 'Pick a conversation to see how Sixty answered it.'));
    },

    agent() {
      const tog = (key, label, desc, real) => h('label', { class: 'tog' },
        h('input', { type: 'checkbox', checked: key === 'ai' ? state.aiOn : state.settings[key], onchange: (e) => setting(key, e.target.checked) }),
        h('span', { class: 'sw', 'aria-hidden': 'true' }),
        h('span', {}, h('b', {}, label, real ? h('em', { class: 'you-tag' }, 'live') : null), h('small', {}, desc)));
      return h('div', { class: 'agent-view' },
        tog('ai', 'AI auto-reply', 'Turn off to take over the WhatsApp chat yourself, like a real teammate would.', true),
        tog('language', 'Reply in the customer’s language', 'English and Arabic, matched automatically.'),
        tog('hours', 'Business hours only', 'Outside hours, send an away message instead.'),
        h('div', { class: 'agent-row' }, h('b', {}, 'Tone of voice'), h('div', { class: 'seg' }, ['Friendly', 'Formal', 'Luxury'].map((t) => h('button', { type: 'button', 'aria-pressed': String(state.settings.tone === t), onclick: () => { state.settings.tone = t; log(`Tone set to ${t}`); render(); } }, t)))),
        h('div', { class: 'agent-row' }, h('b', {}, 'Hand over to a human when they say'), h('div', { class: 'kw' }, ['agent', 'manager', 'complaint', 'refund'].map((k) => h('span', {}, k)))),
        h('p', { class: 'source' }, 'Only AI auto-reply changes this demo. The rest shows what you can control.'));
    },

    calls() {
      const rows = [
        ['Omar K.', 'Inbound · 2:41', 'Viewing booked', 'ok'],
        ['New web lead', 'Callback in 0:48 · 3:05', 'Qualified', 'ok'],
        ['Old lead list', 'Campaign · 112 calls', '9 re-engaged', 'warm'],
        ['Unknown', 'Inbound · 0:22', 'Wrong number', 'cold'],
      ];
      return h('div', { class: 'calls-view' },
        h('ul', {}, rows.map(([who, meta, out, k]) => h('li', {}, h('span', { class: 'lead-av sm' }, '☎'), h('span', { class: 'ib-txt' }, h('b', {}, who), h('small', {}, meta)), h('span', { class: `stage-pill c-${k}` }, out)))),
        h('button', { type: 'button', class: 'btn btn-sm', onclick: () => $('#orb')?.click() }, 'Talk to Freya by voice →'));
    },

    analytics() {
      const src = state.sources;
      const max = Math.max(...Object.values(src));
      const avg = state.replyMs.length ? state.replyMs.reduce((a, b) => a + b, 0) / state.replyMs.length / 1000 : null;
      return h('div', { class: 'an-view' },
        h('div', { class: 'an-card' }, h('h4', {}, 'Leads by source'),
          Object.entries(src).map(([k, v]) => h('div', { class: 'bar' }, h('span', {}, k), h('i', { style: `--w:${(v / max) * 100}%` }), h('b', { class: 'dot' }, String(v))))),
        h('div', { class: 'an-card' }, h('h4', {}, 'First reply time'),
          h('div', { class: 'bar' }, h('span', {}, 'Before Sixty (example)'), h('i', { class: 'slow', style: '--w:100%' }), h('b', {}, '3h 20m')),
          h('div', { class: 'bar' }, h('span', {}, avg ? 'Freya, in your chat' : 'With Sixty'), h('i', { style: '--w:3%' }), h('b', { class: 'dot' }, avg ? `${avg.toFixed(1)}s` : '4s'))),
        h('p', { class: 'source' }, 'Example numbers, except your own reply time.'));
    },
  };

  function empty(text) { return h('div', { class: 'ib-thread hint' }, text); }

  function render() {
    const view = $('#crm-view');
    view.replaceChildren(views[state.view]());
    $$('.crm-side [role="tab"]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === state.view)));
  }
  function go(v) { state.view = v; if (v === 'inbox') $('#dot-inbox').classList.remove('on'); render(); }

  function drop(e, stage) {
    e.preventDefault();
    e.currentTarget.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    if (id === 'you' && state.lead) { state.lead.stage = stage; log(`You moved your lead to ${stage}`); }
    else { const c = cards.find((x) => x.id === id); if (c && c.stage !== stage) { c.stage = stage; log(`${c.name} moved to ${stage}`); } }
    render();
  }

  function setting(key, on) {
    if (key === 'ai') {
      state.aiOn = on;
      if (on) { state.needsHuman = false; log('AI auto-reply is back on'); sys('Freya is back on this chat.'); }
      else { log('AI paused. You’re handling this chat now'); sys('AI paused. A teammate has taken over this chat.'); }
    } else {
      state.settings[key] = on;
      log(`${key === 'hours' ? 'Business hours only' : 'Reply in customer’s language'} turned ${on ? 'on' : 'off'}`);
    }
    render();
  }

  $$('.crm-side [role="tab"]').forEach((b) => b.addEventListener('click', () => go(b.dataset.view)));

  // ---- CRM updates from Freya ----
  function ensureLead(channel = 'WhatsApp') {
    if (state.lead) {
      if (!state.lead.channels.includes(channel)) { state.lead.channels.push(channel); log(`Same lead, now on ${channel === 'Call' ? 'a call' : 'WhatsApp'}`); }
      return;
    }
    state.lead = { stage: 'New', channels: [channel] };
    $('#k-leads').textContent = '313';
    $('#dot-inbox').classList.add('on');
    log(channel === 'Call' ? 'New lead from an inbound call' : 'New lead from WhatsApp');
  }
  const channelLabel = () => (state.lead?.channels || ['WhatsApp']).join(' + ');

  function applyCrm(crm) {
    if (!crm) return;
    const L = state.lead;
    const before = L.stage;
    const filled = [];
    for (const [k, label] of FIELDS) {
      const v = typeof crm[k] === 'string' ? crm[k].trim() : '';
      if (v && v !== 'Unclear' && v !== 'Unknown' && v !== L[k]) { L[k] = v; filled.push(label.toLowerCase()); }
    }
    if (crm.stage && STAGES.concat('Not a fit').includes(crm.stage)) L.stage = crm.stage === 'Not a fit' ? 'New' : crm.stage;
    if (filled.length) log(`Synced to CRM: ${filled.slice(0, 3).join(', ')}${filled.length > 3 ? ` +${filled.length - 3}` : ''}`);
    if (L.stage !== before) {
      log(`Stage → ${L.stage}`);
      if (L.stage === 'Booked') { $('#k-booked').textContent = '88'; root.classList.add('celebrate'); setTimeout(() => root.classList.remove('celebrate'), 1600); }
    }
    if (L.lead_sources) {
      const s = L.lead_sources.toLowerCase();
      const key = /portal|finder|bayut|zillow|dubizzle/.test(s) ? 'Property portals' : /meta|facebook|instagram|google|ads/.test(s) ? 'Meta ads' : /web|site/.test(s) ? 'Website' : null;
      if (key && !state.countedSource) { state.sources[key] += 1; state.countedSource = true; }
    }
    render();
  }

  // ---- WhatsApp chat ----
  const logEl = $('#wa-log');
  const status = $('#wa-status');
  const input = $('#wa-text');
  const form = $('#wa-form');
  let busy = false;

  function bubble(text, who) {
    const li = h('li', { class: `wam ${who}` }, text, h('time', {}, clock(), who === 'out' ? h('span', { class: 'ticks', 'aria-label': 'read' }, ' ✓✓') : null));
    logEl.append(li);
    logEl.scrollTop = logEl.scrollHeight;
    return li;
  }
  function sys(text) { logEl.append(h('li', { class: 'wa-sys' }, text)); logEl.scrollTop = logEl.scrollHeight; }
  function typing(on) {
    status.textContent = on ? 'typing…' : 'online';
    $('#wa-typing')?.remove();
    if (on) { logEl.append(h('li', { class: 'wam in typing', id: 'wa-typing' }, h('i'), h('i'), h('i'))); logEl.scrollTop = logEl.scrollHeight; }
  }

  async function send(text) {
    text = text.trim();
    if (!text || busy) return;
    bubble(text, 'out');
    state.lastMsg = text;
    state.history.push({ role: 'user', text });
    ensureLead('WhatsApp');
    $('#wa-chips').hidden = true;
    render();

    if (!state.aiOn) {
      state.needsHuman = true;
      log('Customer replied. Waiting for your team');
      render();
      return;
    }

    busy = true;
    form.classList.add('busy');
    const t0 = performance.now();
    setTimeout(() => busy && typing(true), 350);
    try {
      const res = await fetch('/api/wa-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ history: state.history.slice(-40) }) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'Freya is having trouble replying. Please try again.');
      const ms = performance.now() - t0;
      state.replyMs.push(ms);
      $('#k-reply').textContent = `00:${String(Math.max(1, Math.round(ms / 1000))).padStart(2, '0')}`;
      applyCrm(out.crm);
      typing(false);
      for (const [i, r] of out.replies.entries()) {
        if (i) { typing(true); await new Promise((ok) => setTimeout(ok, 700)); typing(false); }
        bubble(r, 'in');
        state.history.push({ role: 'model', text: r });
      }
      if (out.replies.length) log(`Freya replied in ${(ms / 1000).toFixed(1)}s`);
    } catch (err) {
      typing(false);
      sys(err.message);
    } finally {
      busy = false;
      form.classList.remove('busy');
      typing(false);
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; send(v); });
  $$('#wa-chips button').forEach((b) => b.addEventListener('click', () => send(b.textContent)));

  // ---- Channel toggle: WhatsApp | Call ----
  const chTabs = [$('#ch-wa'), $('#ch-call')];
  function pickChannel(btn, focus) {
    chTabs.forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      $(`#${b.getAttribute('aria-controls')}`).hidden = !on;
    });
    if (focus) btn.focus();
  }
  chTabs.forEach((b, i) => {
    b.addEventListener('click', () => pickChannel(b));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); pickChannel(chTabs[1 - i], true); }
    });
  });

  // ---- Voice call pane (Gemini Live engine in voice.js) + live CRM from the transcript ----
  const cp = $('#call-pane');
  const cpLog = $('#cp-log');
  const cpState = $('#cp-state');
  const cpTimer = $('#cp-timer');
  const cpStart = $('#cp-start');
  const cpEnd = $('#cp-end');
  const voice = () => window.sixtyVoice;
  const transcript = []; // [{role:'user'|'agent', text}]
  let cur = null; // the bubble being written
  let callTick = null, callStart = 0, extracting = false, pending = false, heardSince = false;

  const startCall = () => { pickChannel($('#ch-call')); voice()?.start(); };
  $('#cp-orb').addEventListener('click', () => (voice()?.phase === 'idle' ? startCall() : voice()?.stop()));
  cpStart.addEventListener('click', startCall);
  cpEnd.addEventListener('click', () => voice()?.stop());

  function say(role, text) {
    if (!cur || cur.role !== role) {
      $('.cp-hint', cpLog)?.remove();
      cur = { role, el: h('li', { class: role === 'user' ? 'cp-u' : 'cp-a' }), line: { role, text: '' } };
      transcript.push(cur.line);
      cpLog.append(cur.el);
    }
    cur.line.text += text;
    cur.el.textContent = cur.line.text.trim();
    cpLog.scrollTop = cpLog.scrollHeight;
  }

  async function extract() {
    if (extracting) { pending = true; return; }
    extracting = true;
    try {
      const res = await fetch('/api/lead-extract', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ transcript: transcript.slice(-60) }) });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.crm) applyCrm(out.crm);
    } catch { /* the next turn will try again */ } finally {
      extracting = false;
      if (pending) { pending = false; extract(); }
    }
  }

  addEventListener('sixty:voice', ({ detail: d }) => {
    if (d.type === 'phase') {
      cp.dataset.phase = d.phase;
      cpStart.hidden = d.phase !== 'idle';
      cpEnd.hidden = d.phase === 'idle';
      $('#cp-status').textContent = d.phase === 'live' ? 'on call' : d.phase === 'connecting' ? 'calling…' : 'AI voice agent';
      if (d.phase === 'connecting') { $('#cp-err').textContent = ''; cpState.textContent = 'Connecting to Freya…'; pickChannel($('#ch-call')); }
      if (d.phase === 'live') {
        ensureLead('Call');
        render();
        callStart = Date.now();
        callTick = setInterval(() => {
          const sec = Math.floor((Date.now() - callStart) / 1000);
          cpTimer.textContent = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
        }, 500);
        log('Freya picked up the call');
      }
      if (d.phase === 'idle') {
        clearInterval(callTick);
        cpTimer.textContent = '00:00';
        cpState.textContent = 'Tap to call Freya';
        $('#cp-err').textContent = d.message || '';
        cur = null;
        if (callStart) { log('Call ended'); callStart = 0; if (heardSince) extract(); }
      }
    } else if (d.type === 'level') {
      cp.style.setProperty('--lvl', d.lvl.toFixed(3));
      if (voice()?.phase === 'live') cpState.textContent = d.lvl > 0.04 ? 'Freya is speaking' : 'Listening…';
    } else if (d.type === 'user') {
      say('user', d.text);
      state.lastMsg = cur.line.text.trim();
      heardSince = true;
    } else if (d.type === 'agent') {
      say('agent', d.text);
    } else if (d.type === 'turn') {
      cur = null;
      if (heardSince) { heardSince = false; extract(); }
    } else if (d.type === 'booked') {
      const a = d.args || {};
      applyCrm({ stage: 'Booked', lead_name: a.name, email: a.email, company: a.company, meeting_time: a.meeting_time, industry: a.industry, interest: a.interest });
      log('Demo booked on the call. Invite email sent to the team');
    }
  });

  render();
})();
