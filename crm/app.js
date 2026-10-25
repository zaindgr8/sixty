const STATUSES = ['new', 'contacted', 'replied', 'interested', 'demo_booked', 'won', 'not_interested', 'lost'];
const EMAIL_STATUSES = ['pending', 'sent', 'failed', 'invalid', 'bounced', 'complained', 'unsubscribed'];
const PAGE = 50;

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n || 0).toLocaleString();
const pct = (a, b) => b ? Math.round((a / b) * 1000) / 10 + '%' : '–';
const label = (s) => String(s || '').replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
const when = (d) => d ? new Date(d).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–';
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* storage blocked */ } },
};

let session = store.get('sixty_session');
let state = { tab: 'leads', page: 0, total: 0, rows: [], liRows: [], liPage: 0, liFilter: 'all', funnelRows: [] };

function toast(msg, ms = 2600) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add('hidden'), ms);
}

async function rpc(fn, args = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  let data = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && (data.message || data.hint)) || `Request failed (${res.status})`;
    if (/session expired|log in again/i.test(msg) && fn !== 'dash_login') { logout(true); }
    throw new Error(msg);
  }
  return data;
}
const authed = (fn, args = {}) => rpc(fn, { p_token: session.token, ...args });

// ---------------- Auth ----------------
function showLogin() { $('#appView').classList.add('hidden'); $('#loginView').classList.remove('hidden'); $('#u').focus(); }
function showApp() { $('#loginView').classList.add('hidden'); $('#appView').classList.remove('hidden'); switchTab(state.tab); }
async function logout(expired) {
  if (session && !expired) { try { await rpc('dash_logout', { p_token: session.token }); } catch { /* ignore */ } }
  session = null; store.del('sixty_session'); showLogin();
  if (expired) $('#loginErr').textContent = 'Your session expired. Please sign in again.';
}
$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = $('#loginBtn'); btn.disabled = true; $('#loginErr').textContent = '';
  try {
    session = await rpc('dash_login', { p_username: $('#u').value, p_password: $('#p').value });
    store.set('sixty_session', session); $('#p').value = ''; showApp();
  } catch (err) { $('#loginErr').textContent = err.message; }
  finally { btn.disabled = false; }
});
$('#logoutBtn').addEventListener('click', () => logout(false));

// ---------------- Tabs ----------------
function switchTab(tab) {
  state.tab = tab;
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  $$('main > section').forEach(s => s.classList.toggle('hidden', s.id !== 'tab-' + tab));
  if (tab === 'log') loadLog();
  if (tab === 'stats') loadStats();
  if (tab === 'leads') loadLeads();
  if (tab === 'linkedin') loadLinkedIn();
  if (tab === 'funnel') loadFunnel();
}
$$('#tabs button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
$('#refreshBtn').addEventListener('click', () => switchTab(state.tab));

// ---------------- Leads ----------------
$('#fStatus').innerHTML += STATUSES.map(s => `<option value="${s}">${label(s)}</option>`).join('');
$('#fEmailStatus').innerHTML += EMAIL_STATUSES.map(s => `<option value="${s}">${label(s)}</option>`).join('');
let searchT;
$('#fSearch').addEventListener('input', () => { clearTimeout(searchT); searchT = setTimeout(() => { state.page = 0; loadLeads(); }, 300); });
['#fCountry', '#fStatus', '#fEmailStatus', '#fEngagement'].forEach(s => $(s).addEventListener('change', () => { state.page = 0; loadLeads(); }));
$('#prevPage').addEventListener('click', () => { if (state.page > 0) { state.page--; loadLeads(); } });
$('#nextPage').addEventListener('click', () => { if ((state.page + 1) * PAGE < state.total) { state.page++; loadLeads(); } });

const leadFilters = () => ({
  p_search: $('#fSearch').value || null, p_country: $('#fCountry').value || null, p_status: $('#fStatus').value || null,
  p_email_status: $('#fEmailStatus').value || null, p_campaign: null, p_engagement: $('#fEngagement').value || null,
});

async function loadLeads() {
  try {
    const r = await authed('dash_leads', { ...leadFilters(), p_limit: PAGE, p_offset: state.page * PAGE });
    state.total = r.total; state.rows = r.rows || [];
    renderLeads();
  } catch (err) { toast(err.message); }
}
const statusPill = (s) => `<span class="pill ${['interested', 'demo_booked', 'won', 'replied'].includes(s) ? 'good' : ['not_interested', 'lost'].includes(s) ? 'bad' : ''}">${label(s)}</span>`;
const emailPill = (s) => `<span class="pill ${s === 'sent' ? 'brand' : ['bounced', 'invalid', 'complained', 'failed'].includes(s) ? 'bad' : s === 'unsubscribed' ? 'warn' : ''}">${label(s)}</span>`;
function renderLeads() {
  $('#leadCount').textContent = `${fmt(state.total)} leads`;
  $('#pageInfo').textContent = state.total ? `${state.page * PAGE + 1}–${Math.min(state.total, (state.page + 1) * PAGE)} of ${fmt(state.total)}` : '';
  $('#prevPage').disabled = state.page === 0; $('#nextPage').disabled = (state.page + 1) * PAGE >= state.total;
  if (!state.rows.length) { $('#leadsTable').innerHTML = '<div class="empty">No leads match these filters.</div>'; return; }
  $('#leadsTable').innerHTML = `<table><thead><tr><th>Name</th><th>Company</th><th>Industry</th><th>Country</th><th>Status</th><th>Email</th><th class="num">Opens</th><th class="num">Clicks</th><th>Last emailed</th></tr></thead><tbody>${state.rows.map((r, i) => `<tr class="click" data-i="${i}">
      <td><div class="trunc"><strong>${esc(r.full_name || [r.first_name, r.last_name].filter(Boolean).join(' ') || '–')}</strong></div><div class="trunc small muted">${esc(r.email)}</div></td>
      <td><div class="trunc">${esc(r.company || '–')}</div><div class="trunc small muted">${esc(r.job_title || '')}</div></td>
      <td class="trunc">${esc(r.industry || '–')}</td><td>${esc(r.country || '–')}</td>
      <td>${statusPill(r.status)}</td><td>${emailPill(r.email_status)}</td>
      <td class="num">${fmt(r.open_count)}</td><td class="num">${fmt(r.click_count)}</td><td class="small">${when(r.last_emailed_at)}</td></tr>`).join('')}</tbody></table>`;
  $$('#leadsTable tr.click').forEach(tr => tr.addEventListener('click', () => openLead(state.rows[Number(tr.dataset.i)])));
}

$('#exportBtn').addEventListener('click', async () => {
  try {
    const r = await authed('dash_leads', { ...leadFilters(), p_limit: 500, p_offset: 0 });
    const cols = ['email', 'first_name', 'last_name', 'job_title', 'company', 'company_website', 'industry', 'city', 'state', 'country', 'status', 'email_status', 'open_count', 'click_count', 'last_emailed_at', 'email_subject', 'notes'];
    const q = (v) => { const s = Array.isArray(v) ? v.join('; ') : String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const csv = [cols.join(',')].concat((r.rows || []).map(row => cols.map(c => q(row[c])).join(','))).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `sixty-leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(a.href);
    if (r.total > 500) toast('Exported the first 500 leads. Narrow the filters to export the rest.');
  } catch (err) { toast(err.message); }
});

// ---------------- LinkedIn (client-side filter over fetched leads) ----------------
const hasTag = (r, t) => (r.tags || []).includes(t);
const liOutreach = (r) => {
  const invited = hasTag(r, 'linkedin_invited');
  const commented = hasTag(r, 'linkedin_commented');
  const m = String(r.notes || '').match(/https:\/\/www\.linkedin\.com\/feed\/update\/[^\s"']+/);
  return { invited, commented, commentUrl: m ? m[0].replace(/\/$/, '') : null };
};
async function fetchAllLeads() {
  const rows = [];
  let offset = 0, total = 0;
  do {
    const r = await authed('dash_leads', { p_limit: 500, p_offset: offset });
    total = r.total || 0;
    if (!(r.rows || []).length) break;
    rows.push(...r.rows);
    offset += r.rows.length;
  } while (rows.length < total);
  return rows;
}
let liFiltered = [];
async function loadLinkedIn() {
  try {
    state.liRows = (await fetchAllLeads()).filter(r => hasTag(r, 'linkedin_invited') || hasTag(r, 'linkedin_commented'));
    state.liPage = 0;
    renderLinkedIn();
  } catch (err) { toast(err.message); }
}
function renderLinkedIn() {
  const f = state.liFilter;
  liFiltered = state.liRows.filter(r => f === 'invited' ? hasTag(r, 'linkedin_invited') : f === 'commented' ? hasTag(r, 'linkedin_commented') : true);
  $('#liCount').textContent = `${fmt(liFiltered.length)} LinkedIn leads`;
  const pageRows = liFiltered.slice(state.liPage * PAGE, (state.liPage + 1) * PAGE);
  $('#liPageInfo').textContent = liFiltered.length ? `${state.liPage * PAGE + 1}–${Math.min(liFiltered.length, (state.liPage + 1) * PAGE)} of ${fmt(liFiltered.length)}` : '';
  $('#liPrevPage').disabled = state.liPage === 0; $('#liNextPage').disabled = (state.liPage + 1) * PAGE >= liFiltered.length;
  if (!pageRows.length) { $('#liTable').innerHTML = '<div class="empty">No LinkedIn leads match this filter.</div>'; return; }
  $('#liTable').innerHTML = `<table><thead><tr><th>Name</th><th>Company</th><th>LinkedIn</th><th>Status</th></tr></thead><tbody>${pageRows.map((r, i) => {
    const o = liOutreach(r);
    return `<tr class="click" data-i="${i}">
      <td><div class="trunc"><strong>${esc(r.full_name || [r.first_name, r.last_name].filter(Boolean).join(' ') || '–')}</strong></div><div class="trunc small muted">${esc(r.email)}</div></td>
      <td><div class="trunc">${esc(r.company || '–')}</div><div class="trunc small muted">${esc(r.job_title || '')}</div></td>
      <td>${r.linkedin_url ? `<a href="${esc(r.linkedin_url)}" target="_blank" rel="noopener">Profile</a>` : '–'} ${o.invited ? '<span class="pill brand">Invited</span>' : ''} ${o.commented ? '<span class="pill good">Commented</span>' : ''}</td>
      <td>${statusPill(r.status)}</td></tr>`;
  }).join('')}</tbody></table>`;
  $$('#liTable tr.click').forEach(tr => tr.addEventListener('click', () => openLead(liFiltered[state.liPage * PAGE + Number(tr.dataset.i)])));
}
$('#liFilter').addEventListener('change', () => { state.liFilter = $('#liFilter').value; state.liPage = 0; renderLinkedIn(); });
$('#liPrevPage').addEventListener('click', () => { if (state.liPage > 0) { state.liPage--; renderLinkedIn(); } });
$('#liNextPage').addEventListener('click', () => { if ((state.liPage + 1) * PAGE < liFiltered.length) { state.liPage++; renderLinkedIn(); } });

// ---------------- Funnel (pipeline status counts from fetched leads) ----------------
const FUNNEL_STAGES = [
  { key: 'contacted', label: 'Contacted', statuses: ['contacted', 'replied', 'interested', 'demo_booked', 'won'] },
  { key: 'replied', label: 'Replied', statuses: ['replied', 'interested', 'demo_booked', 'won'] },
  { key: 'booked', label: 'Meetings booked', statuses: ['demo_booked', 'won'] },
  { key: 'won', label: 'Won', statuses: ['won'] },
];
const bucketCountry = (c) => {
  const v = String(c || '').toLowerCase();
  if (['uk', 'gb', 'united kingdom', 'great britain', 'england', 'scotland', 'wales', 'northern ireland'].includes(v)) return 'UK';
  if (['us', 'usa', 'united states', 'united states of america', 'america'].includes(v)) return 'USA';
  return c || 'Unknown';
};
async function loadFunnel() {
  try {
    state.funnelRows = await fetchAllLeads();
    renderFunnel();
  } catch (err) { toast(err.message); }
}
function funnelCounts(rows) {
  const out = { total: rows.length };
  for (const s of FUNNEL_STAGES) out[s.key] = rows.filter(r => s.statuses.includes(r.status)).length;
  return out;
}
function renderFunnel() {
  const c = funnelCounts(state.funnelRows);
  $('#funnelCount').textContent = `${fmt(c.total)} leads in total`;
  const cards = [{ label: 'Leads', value: c.total, sub: 'All leads', hot: false }]
    .concat(FUNNEL_STAGES.map(s => ({ label: s.label, value: c[s.key], sub: pct(c[s.key], c.total) + ' of leads', hot: s.key === 'booked' })));
  $('#funnelKpis').innerHTML = cards.map(k => `<div class="card kpi${k.hot ? ' hot' : ''}"><div class="label">${k.label}</div><div class="value">${fmt(k.value)}</div><div class="sub">${k.sub}</div></div>`).join('');
  const byCountry = {};
  for (const r of state.funnelRows) (byCountry[bucketCountry(r.country)] = byCountry[bucketCountry(r.country)] || []).push(r);
  const buckets = Object.keys(byCountry).sort((a, b) => byCountry[b].length - byCountry[a].length);
  $('#funnelTable').innerHTML = `<table><thead><tr><th>Country</th><th class="num">Leads</th><th class="num">Contacted</th><th class="num">Replied</th><th class="num">Meetings booked</th><th class="num">Won</th></tr></thead><tbody>${buckets.map(b => {
    const x = funnelCounts(byCountry[b]);
    return `<tr><td><strong>${esc(b)}</strong></td><td class="num">${fmt(x.total)}</td><td class="num">${fmt(x.contacted)}</td><td class="num">${fmt(x.replied)}</td><td class="num">${fmt(x.booked)}</td><td class="num">${fmt(x.won)}</td></tr>`;
  }).join('')}</tbody></table>`;
}

// ---------------- Email log (read from Brevo) ----------------
$('#logDay').value = new Date().toISOString().slice(0, 10);
$('#logDay').addEventListener('change', loadLog);
$('#statsRange').addEventListener('change', loadStats);
const brevo = async (body) => {
  const res = await fetch('/api/brevo-history', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: session.token, ...body }) });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || !out.ok) throw new Error(out.error || 'Could not load Brevo data');
  return out;
};
async function loadLog() {
  try {
    const out = await brevo({ mode: 'day', day: $('#logDay').value });
    const rows = out.sentOn || [];
    logRows = rows;
    $('#logCount').textContent = `${fmt(rows.length)} sent on ${new Date($('#logDay').value + 'T12:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`;
    $('#logTable').innerHTML = rows.length ? `<table><thead><tr><th>Sent</th><th>Recipient</th><th>Subject</th><th>Status</th><th class="num">Opens</th><th class="num">Clicks</th></tr></thead><tbody>${rows.map((r, i) => `<tr class="click" data-i="${i}">
      <td class="small">${when(r.sent_at)}</td><td class="trunc">${esc(r.email)}</td><td class="trunc">${esc(r.subject || '–')}</td>
      <td>${statusPillFor(r.status)}</td>
      <td class="num">${r.timeline.filter(t => t.event === 'opened').length}</td><td class="num">${r.timeline.filter(t => t.event === 'clicked').length}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No emails sent on this day.</div>';
    $$('#logTable tr.click').forEach(tr => tr.addEventListener('click', () => openMail(logRows[Number(tr.dataset.i)])));
  } catch (err) { toast(err.message); }
}
let logRows = [];
const EVENT_LABEL = { sent: 'Sent', delivered: 'Delivered', opened: 'Opened', clicked: 'Clicked', hard_bounce: 'Hard bounce', soft_bounce: 'Soft bounce', blocked: 'Blocked', invalid: 'Invalid address', deferred: 'Deferred', spam: 'Marked as spam', unsubscribed: 'Unsubscribed' };
const statusPillFor = (st) => `<span class="pill ${['delivered', 'opened', 'clicked'].includes(st) ? 'good' : ['hard_bounce', 'soft_bounce', 'blocked', 'invalid', 'spam'].includes(st) ? 'bad' : st === 'unsubscribed' ? 'warn' : ''}">${esc(EVENT_LABEL[st] || st)}</span>`;
function openMail(r) {
  if (!r) return;
  $('#mailBody').innerHTML = `
    <p class="muted small" style="margin:0">Recipient</p><p style="margin:2px 0 12px"><strong>${esc(r.email)}</strong></p>
    <p class="muted small" style="margin:0">Subject</p><p style="margin:2px 0 12px">${esc(r.subject || '–')}</p>
    <p class="muted small" style="margin:0">Current status</p><p style="margin:4px 0 16px">${statusPillFor(r.status)}</p>
    <p class="muted small" style="margin:0 0 8px">Timeline</p>
    <ol style="padding-left:18px;margin:0">${r.timeline.map(t => `<li style="margin-bottom:8px"><strong>${esc(EVENT_LABEL[t.event] || t.event)}</strong> <span class="muted small">${when(t.at)}</span>${t.link ? `<div class="small"><a href="${esc(t.link)}" target="_blank" rel="noopener">${esc(t.link)}</a></div>` : ''}${t.reason ? `<div class="small muted">${esc(t.reason)}</div>` : ''}</li>`).join('')}</ol>
    <p class="muted small" style="margin-top:16px">Message ID: ${esc(r.messageId || '–')}</p>`;
  $('#mailBg').classList.remove('hidden'); $('#mailPanel').classList.remove('hidden');
}
function closeMail() { $('#mailBg').classList.add('hidden'); $('#mailPanel').classList.add('hidden'); }

// ---------------- Stats (read from Brevo) ----------------
async function loadStats() {
  try {
    const out = await brevo({ mode: 'stats', days: Number($('#statsRange').value) });
    const rows = out.stats || [];
    const tot = rows.reduce((a, r) => { for (const k of Object.keys(a)) a[k] += r[k] || 0; return a; }, { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, spam: 0, blocked: 0 });
    $('#statsTable').innerHTML = `<table><thead><tr><th>Day</th><th class="num">Sent</th><th class="num">Delivered</th><th class="num">Opened</th><th class="num">Clicked</th><th class="num">Bounced</th><th class="num">Blocked</th><th class="num">Spam</th><th class="num">Unsubscribed</th></tr></thead><tbody>
      <tr><td><strong>Total</strong></td><td class="num"><strong>${fmt(tot.sent)}</strong></td><td class="num">${pct(tot.delivered, tot.sent)}</td><td class="num">${pct(tot.opened, tot.delivered)}</td><td class="num">${pct(tot.clicked, tot.delivered)}</td><td class="num">${fmt(tot.bounced)}</td><td class="num">${fmt(tot.blocked)}</td><td class="num">${fmt(tot.spam)}</td><td class="num">${fmt(tot.unsubscribed)}</td></tr>
      ${rows.map(r => `<tr class="click" data-day="${r.day}"><td>${new Date(r.day + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</td><td class="num">${fmt(r.sent)}</td><td class="num">${fmt(r.delivered)}</td><td class="num">${fmt(r.opened)}</td><td class="num">${fmt(r.clicked)}</td><td class="num">${fmt(r.bounced)}</td><td class="num">${fmt(r.blocked)}</td><td class="num">${fmt(r.spam)}</td><td class="num">${fmt(r.unsubscribed)}</td></tr>`).join('')}
    </tbody></table>`;
    $$('#statsTable tr.click').forEach(tr => tr.addEventListener('click', () => { $('#logDay').value = tr.dataset.day; switchTab('log'); }));
  } catch (err) { toast(err.message); }
}

// ---------------- Lead drawer ----------------
function closeDrawer() { $('#drawer').classList.add('hidden'); $('#drawerBg').classList.add('hidden'); }
$('#drawerBg').addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

async function openLead(r) {
  const d = $('#drawer');
  const name = r.full_name || [r.first_name, r.last_name].filter(Boolean).join(' ') || r.email;
  d.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:10px">
      <div style="flex:1;min-width:0"><h2>${esc(name)}</h2><div class="muted">${esc(r.job_title || '')}${r.job_title && r.company ? ' · ' : ''}${esc(r.company || '')}</div></div>
      <button class="btn" id="dClose">Close</button>
    </div>
    <div class="kv">
      <div>Email</div><div><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></div>
      <div>Website</div><div>${r.company_website ? `<a href="${esc(/^https?:/.test(r.company_website) ? r.company_website : 'https://' + r.company_website)}" target="_blank" rel="noopener">${esc(r.company_website)}</a>` : '–'}</div>
      <div>LinkedIn</div><div>${r.linkedin_url ? `<a href="${esc(r.linkedin_url)}" target="_blank" rel="noopener">Profile</a>` : '–'}</div>
      <div>LinkedIn outreach</div><div>${(() => { const o = liOutreach(r); const parts = []; if (o.invited) parts.push('<span class="pill brand">Invited</span>'); if (o.commented) parts.push('<span class="pill good">Commented</span>'); if (o.commentUrl) parts.push(`<a href="${esc(o.commentUrl)}" target="_blank" rel="noopener">Comment post</a>`); return parts.length ? parts.join(' ') : '–'; })()}</div>
      <div>Location</div><div>${esc([r.city, r.state, r.country].filter(Boolean).join(', ') || '–')}</div>
      <div>Industry</div><div>${esc(r.industry || '–')}</div>
      <div>Email status</div><div>${emailPill(r.email_status)} ${r.last_email_error ? `<span class="small muted">${esc(r.last_email_error)}</span>` : ''}</div>
      ${(() => { const seq = (typeof r.email_sequence_step === 'number' ? r.email_sequence_step : (typeof r.sequence_step === 'number' ? r.sequence_step : null)); return seq === null ? '' : `<div>Email sequence</div><div>${seq === 0 ? 'Not started (step 0)' : `Step ${seq}`}</div>`; })()}
      <div>Engagement</div><div>${fmt(r.open_count)} opens · ${fmt(r.click_count)} clicks</div>
      <div>Campaigns</div><div>${(r.custom_campaigns_sent || []).map(c => `<span class="pill">${esc(c.replace(/^sixty:/, ''))}</span>`).join(' ') || '–'}</div>
      <div>Source</div><div>${esc(r.source || '–')} ${(r.tags || []).map(t => `<span class="pill">${esc(t)}</span>`).join(' ')}</div>
    </div>
    <label for="dStatus">Pipeline status</label>
    <select id="dStatus">${STATUSES.map(s => `<option value="${s}" ${s === r.status ? 'selected' : ''}>${label(s)}</option>`).join('')}</select>
    <label for="dPers">Personalisation (the AI uses this in the next email)</label>
    <textarea id="dPers" rows="2" placeholder="e.g. Just opened a second office in Manchester; heavy Rightmove advertiser">${esc(r.personalization || '')}</textarea>
    <label for="dNotes">Notes (internal)</label>
    <textarea id="dNotes" rows="3">${esc(r.notes || '')}</textarea>
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
      <button class="btn primary" id="dSave">Save</button>
      ${['new', 'contacted'].includes(r.status) ? '<button class="btn" id="dReplied">Mark replied</button>' : ''}
      ${r.unsubscribed ? '<span class="pill warn">Do not email</span>' : '<button class="btn danger" id="dDne">Do not email</button>'}
    </div>
    <h3 style="margin-top:22px">Last email sent</h3>
    ${r.email_subject ? `<div class="email-preview"><div class="small muted">${when(r.last_emailed_at)}</div><p><strong>${esc(r.email_subject)}</strong></p>${sanitizeEmail(r.last_email_body)}</div>` : '<div class="muted">Nothing sent yet.</div>'}
    <h3 style="margin-top:22px">Activity</h3>
    <ul class="timeline" id="dEvents"><li class="muted">Loading…</li></ul>`;
  $('#drawerBg').classList.remove('hidden'); d.classList.remove('hidden');
  $('#dClose').addEventListener('click', closeDrawer);
  $('#dSave').addEventListener('click', () => saveLead(r.id, { status: $('#dStatus').value, personalization: $('#dPers').value, notes: $('#dNotes').value }));
  if ($('#dReplied')) $('#dReplied').addEventListener('click', () => {
    const stamp = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    const cur = $('#dNotes').value;
    saveLead(r.id, { status: 'replied', notes: (cur ? cur + '\n' : '') + `Marked replied via CRM on ${stamp}.` });
  });
  if ($('#dDne')) $('#dDne').addEventListener('click', () => { if (confirm('Never email this lead again?')) saveLead(r.id, { do_not_email: true }); });
  try {
    const ev = await authed('dash_lead_events', { p_lead_id: r.id });
    $('#dEvents').innerHTML = ev.length ? ev.map(e => `<li><span>${label(e.event)}${e.link ? ` <span class="small muted trunc">${esc(e.link)}</span>` : ''}${e.reason ? ` <span class="small muted">${esc(e.reason)}</span>` : ''}</span><span class="small muted">${when(e.event_at)}</span></li>`).join('') : '<li class="muted">No email events yet.</li>';
  } catch (err) { $('#dEvents').innerHTML = `<li class="muted">${esc(err.message)}</li>`; }
}
// Only allow the tags the AI is allowed to produce
function sanitizeEmail(html) {
  const tmp = document.createElement('div'); tmp.innerHTML = String(html || '');
  tmp.querySelectorAll('*').forEach(el => { if (!['P', 'STRONG', 'EM', 'B', 'I', 'BR', 'UL', 'LI'].includes(el.tagName)) el.replaceWith(...el.childNodes); else [...el.attributes].forEach(a => el.removeAttribute(a.name)); });
  return tmp.innerHTML;
}
async function saveLead(id, patch) {
  try {
    const updated = await authed('dash_update_lead', { p_id: id, p_patch: patch });
    toast('Saved'); closeDrawer();
    const sync = (arr) => { const i = arr.findIndex(x => x.id === id); if (i >= 0) arr[i] = { ...arr[i], ...updated }; };
    sync(state.rows); sync(state.liRows); sync(state.funnelRows);
    renderLeads();
    if (state.tab === 'linkedin') renderLinkedIn();
    if (state.tab === 'funnel') renderFunnel();
  } catch (err) { toast(err.message); }
}

// ---------------- Boot ----------------
if (session && session.token && new Date(session.expires_at) > new Date()) showApp(); else { session = null; showLogin(); }
