(() => {
  const $ = (id) => document.getElementById(id);
  const KEY = 'sixty-tracker-v1';

  // ---- Daily checklist: same list every day, grouped by what it moves ----
  const TASKS = [
    { id: 'follow', t: 'Follow up every lead from yesterday (WhatsApp first)', why: 'Speed wins deals', tag: 'sales' },
    { id: 'pitch10', t: 'Send 10 personal LinkedIn messages to UAE real estate or clinic owners', why: 'Founder-led outreach', tag: 'LinkedIn' },
    { id: 'pitch5', t: 'Send 5 personal LinkedIn messages to US agency owners', why: 'Partner pipeline', tag: 'LinkedIn' },
    { id: 'partner', t: 'Contact 2 agencies about becoming a white-label partner', why: 'Partners bring 5 to 10 clients each', tag: 'partners' },
    { id: 'demo', t: 'Run or book at least 2 demos', why: 'Demos convert', tag: 'sales' },
    { id: 'post', t: 'Post 1 short video: a "spot the AI" chat or a client result', why: 'Proof sells', tag: 'content' },
    { id: 'demonum', t: 'Check the live demo WhatsApp and voice still work', why: 'Broken demos lose deals', tag: 'product' },
    { id: 'ask', t: 'Ask 1 happy client for a referral or a testimonial', why: 'Referrals are cheapest', tag: 'referrals' },
    { id: 'email', t: 'Send the cold email batch (50 people, personalised)', why: 'Reach the US market', tag: 'email' },
    { id: 'fix', t: 'Fix one product issue that slowed onboarding', why: 'Onboarding limits growth', tag: 'product' },
    { id: 'log', t: 'Update the client count and note what worked today', why: 'Measure to improve', tag: 'review' },
  ];

  // ---- Weekly cumulative targets (edit freely) ----
  const WEEKS = [3, 7, 13, 20, 28, 37, 47, 59, 73, 88, 100];
  const GOAL = 100;
  const END = new Date('2027-01-01T00:00:00');

  // ---- Storage: Supabase Database (with local storage as instant offline cache) ----
  const loadLocal = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const saveLocal = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };

  const syncDot = $('sync-dot');
  const syncText = $('sync-text');

  function setSyncStatus(state, label) {
    if (!syncDot || !syncText) return;
    syncText.textContent = label;
    syncDot.classList.remove('sync-pulse');
    if (state === 'syncing') {
      syncDot.style.background = '#f5a623';
      syncDot.classList.add('sync-pulse');
    } else if (state === 'saved') {
      syncDot.style.background = '#3ee0a6';
    } else if (state === 'loading') {
      syncDot.style.background = '#60a5fa';
      syncDot.classList.add('sync-pulse');
    } else if (state === 'error') {
      syncDot.style.background = '#e5484d';
    } else {
      syncDot.style.background = '#a3a3a3';
    }
  }

  const data = loadLocal();
  data.days = data.days || {};       // { 'YYYY-MM-DD': { taskId: true } }
  data.clients = data.clients || {}; // { 'YYYY-MM-DD': number }
  data.weeks = data.weeks || WEEKS;

  let saveTimer = null;
  function scheduleSave(immediate = false, extraPayload = {}) {
    saveLocal(data);
    setSyncStatus('syncing', 'Saving to database...');
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveToDatabase(extraPayload), immediate ? 100 : 400);
  }

  async function saveToDatabase(extra = {}) {
    try {
      const res = await fetch('/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          days: data.days,
          clients: data.clients,
          weeks: data.weeks,
          ...extra,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && json.ok) {
        setSyncStatus('saved', 'Synced to database');
      } else {
        throw new Error(json.error || 'Database save failed');
      }
    } catch (err) {
      console.warn('Database sync issue:', err.message);
      setSyncStatus('error', 'Saved locally · Database retry pending');
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => saveToDatabase(extra), 5000);
    }
  }

  async function loadFromDatabase() {
    setSyncStatus('loading', 'Connecting to database...');
    try {
      const res = await fetch('/api/tracker', { signal: AbortSignal.timeout(7000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && json.ok && json.data) {
        data.days = json.data.days || {};
        data.clients = json.data.clients || {};
        if (Array.isArray(json.data.weeks) && json.data.weeks.length) {
          data.weeks = json.data.weeks;
        }
        saveLocal(data);
        renderAll();
        setSyncStatus('saved', 'Synced to database');
        return;
      }
      setSyncStatus('saved', 'Connected to database');
    } catch (err) {
      console.warn('Could not reach database, running from cached state:', err.message);
      setSyncStatus('offline', 'Using local cache (offline)');
    }
  }

  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayKey = iso(new Date());
  let viewKey = todayKey;

  // ---- Clients: latest value recorded on or before a date ----
  const clientsOn = (key) => {
    const ks = Object.keys(data.clients).filter((k) => k <= key).sort();
    return ks.length ? data.clients[ks[ks.length - 1]] : 0;
  };

  // ---- Today's checklist ----
  function renderTodo() {
    const done = data.days[viewKey] || {};
    const readOnly = viewKey !== todayKey;
    $('today-title').textContent = readOnly ? new Date(viewKey + 'T00:00').toDateString() : 'Today · ' + new Date().toDateString();
    $('today-note').textContent = readOnly ? 'Past day: read only' : 'Tick each task when it is done';
    $('reset-day').hidden = readOnly;
    $('clients').disabled = readOnly;
    $('clients').value = data.clients[viewKey] ?? clientsOn(viewKey);
    const ul = $('todo');
    ul.innerHTML = '';
    for (const task of TASKS) {
      const li = document.createElement('li');
      const isDone = !!done[task.id];
      li.className = isDone ? 'done' : '';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.id = 'c-' + task.id; cb.checked = isDone; cb.disabled = readOnly;
      cb.addEventListener('change', () => {
        data.days[todayKey] = data.days[todayKey] || {};
        data.days[todayKey][task.id] = cb.checked;
        scheduleSave(true);
        renderAll();
      });
      const label = document.createElement('label');
      label.htmlFor = cb.id;
      label.innerHTML = '';
      const t = document.createElement('span'); t.className = 't'; t.textContent = task.t;
      const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = task.tag;
      const why = document.createElement('span'); why.className = 'why'; why.textContent = task.why;
      t.appendChild(tag); label.append(t, why);
      li.append(cb, label);
      ul.appendChild(li);
    }
  }

  // ---- Progress header ----
  function renderProgress() {
    const now = clientsOn(todayKey);
    const pct = Math.min(100, Math.round((now / GOAL) * 100));
    $('overall').textContent = `${now} / ${GOAL} clients`;
    $('bar').style.width = pct + '%';
    const daysLeft = Math.max(0, Math.ceil((END - new Date()) / 86400000));
    $('s-days').textContent = daysLeft;
    const weeksLeft = Math.max(1, daysLeft / 7);
    $('s-need').textContent = Math.max(0, Math.ceil((GOAL - now) / weeksLeft));
    // Are we on the weekly target?
    const weekIdx = Math.min(WEEKS.length - 1, Math.floor((Date.now() - new Date('2026-10-19').getTime()) / (7 * 86400000)));
    const target = data.weeks[Math.max(0, weekIdx)];
    $('pace').textContent = now >= target ? `On track: this week's target is ${target}` : `${target - now} behind this week's target of ${target}`;
    // Streak: consecutive days, ending today, with >= 80% done
    let streak = 0;
    for (let d = new Date(); ; d.setDate(d.getDate() - 1)) {
      const k = iso(d);
      const doneCount = Object.values(data.days[k] || {}).filter(Boolean).length;
      if (doneCount / TASKS.length >= 0.8) streak++; else break;
      if (streak > 365) break;
    }
    $('s-streak').textContent = streak;
  }

  // ---- Weekly table (editable targets) ----
  function renderWeeks() {
    const rows = data.weeks.map((target, i) => {
      const start = new Date('2026-10-19T00:00'); start.setDate(start.getDate() + i * 7);
      const end = new Date(start); end.setDate(end.getDate() + 6);
      const wkEnd = iso(end);
      const actual = clientsOn(wkEnd > todayKey ? todayKey : wkEnd);
      const mark = actual >= target ? 'Done' : (iso(start) <= todayKey ? 'In progress' : 'Upcoming');
      return `<tr><td>Week ${i + 1}<br><span class="note">${start.toDateString().slice(4, 10)} to ${end.toDateString().slice(4, 10)}</span></td>
        <td><input type="number" min="0" max="500" value="${target}" data-week="${i}" aria-label="Week ${i + 1} target"></td>
        <td class="fill">${actual} clients</td><td class="note">${mark}</td></tr>`;
    }).join('');
    $('weeks-table').innerHTML = `<tr><th>Week</th><th>Target</th><th>Actual</th><th>Status</th></tr>${rows}`;
    document.querySelectorAll('[data-week]').forEach((el) => el.addEventListener('change', () => {
      data.weeks[+el.dataset.week] = Math.max(0, +el.value || 0);
      scheduleSave(false);
      renderWeeks();
      renderProgress();
    }));
  }

  // ---- Last 14 days ----
  function renderLog() {
    const cells = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = iso(d);
      const n = Object.values(data.days[k] || {}).filter(Boolean).length;
      const cls = ['day', k < todayKey ? 'past' : '', n / TASKS.length >= 0.8 ? 'done' : '', k === todayKey ? 'today-b' : ''].join(' ');
      cells.push(`<button class="${cls}" data-day="${k}" title="${k}: ${n}/${TASKS.length} done" style="background:${n / TASKS.length >= 0.8 ? '' : 'none'};cursor:pointer">${d.getDate()}/${d.getMonth() + 1}<br><span style="font-size:10px">${n}/${TASKS.length}</span></button>`);
    }
    $('days').innerHTML = cells.join('');
    document.querySelectorAll('[data-day]').forEach((el) => el.addEventListener('click', () => { viewKey = el.dataset.day; showTab('today'); renderAll(); }));
  }

  function renderAll() { renderTodo(); renderProgress(); renderWeeks(); renderLog(); }

  // ---- Tabs ----
  function showTab(name) {
    for (const b of document.querySelectorAll('[data-tab]')) b.setAttribute('aria-selected', String(b.dataset.tab === name));
    for (const s of ['today', 'plan', 'weeks', 'log']) {
      const el = $('tab-' + s);
      if (el) el.hidden = s !== name;
    }
  }
  document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.tab === 'today') viewKey = todayKey;
    showTab(b.dataset.tab);
  }));

  // ---- Inputs ----
  $('clients')?.addEventListener('change', (e) => {
    data.clients[todayKey] = Math.max(0, Math.min(500, +e.target.value || 0));
    scheduleSave(false);
    renderAll();
  });
  $('reset-day')?.addEventListener('click', () => {
    if (!confirm('Clear today’s ticks?')) return;
    delete data.days[todayKey];
    scheduleSave(true, { resetDay: todayKey, days: { [todayKey]: null } });
    renderAll();
  });

  renderAll();
  loadFromDatabase();
})();
