// Email history and stats for the /crm page, read straight from Brevo (no database log needed).
// Only Sixty outreach emails are included, identified by their sender elvira@devmatesolutions.com.
// (The "sixty-outreach" tag was the old identifier, but Brevo tags are set at send time and
// cannot be added afterwards — the 28 Oct 2026 batch of 355 was sent untagged, so a tag-only
// filter hid it. Sender filtering includes that batch while still excluding AFH sends, which
// go out from announcements@aifounderhub.com.)
// Brevo's statistics feed also lags: on 30 Oct 2026 only 5 of 172 sends were in the feed an
// hour after sending. So the local send log (lib/email-sends-log.mjs, Brevo messageIds
// returned at send time) is merged in below, so the CRM shows every send immediately.
// A log-only row shows as 'sent', never as delivered — Brevo events, when they arrive,
// add delivery/open/bounce status on top of the same messageId.
// Needs BREVO_API_KEY (Brevo key with statistics read access) and a signed-in CRM token.
import { EMAIL_SENDS } from './email-sends-log.mjs';

const SUPABASE_URL = 'https://fsopwsygsnuufwfylaiv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_V_ui2odaR5LZdDgpwElk3g_vgqNN4uU';
const BREVO_EVENTS = 'https://api.brevo.com/v3/smtp/statistics/events';
const SIXTY_SENDER = 'elvira@devmatesolutions.com';
const PAGE = 2500;
const MAX_PAGES = 8;

// Brevo event names. "opened" counts every open, not unique people.
const EVENTS = {
  requests: 'sent', delivered: 'delivered', opened: 'opened', clicks: 'clicked',
  hardBounces: 'hard_bounce', softBounces: 'soft_bounce', blocked: 'blocked',
  invalid: 'invalid', deferred: 'deferred', spam: 'spam', unsubscribed: 'unsubscribed',
};
// Status shown per email: the most serious thing that happened.
const RANK = ['sent', 'deferred', 'delivered', 'opened', 'clicked', 'soft_bounce', 'hard_bounce', 'invalid', 'blocked', 'unsubscribed', 'spam'];

const dayOf = (iso) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });

async function checkLogin(token) {
  if (!token) return false;
  // dash_leads is callable by the browser role and checks the session itself, so a 200 means the token is valid.
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/dash_leads`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_token: token, p_limit: 1, p_offset: 0 }),
    signal: AbortSignal.timeout(10_000),
  });
  return res.ok;
}

async function brevoEvents(apiKey, event, startDate, endDate) {
  const rows = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const qs = new URLSearchParams({ event, startDate, endDate, limit: String(PAGE), offset: String(page * PAGE), sort: 'desc' });
    const res = await fetch(`${BREVO_EVENTS}?${qs}`, { headers: { 'api-key': apiKey, accept: 'application/json' }, signal: AbortSignal.timeout(25_000) });
    if (!res.ok) throw new Error(`Brevo ${res.status} on ${event}`);
    const batch = (await res.json()).events || [];
    // Keep only Sixty outreach: sent from elvira@devmatesolutions.com. AFH sends
    // (announcements@aifounderhub.com) and any other sender are excluded here.
    // Events without a `from` field are kept, so older events are not lost.
    rows.push(...batch.filter((r) => !r.from || r.from === SIXTY_SENDER));
    if (batch.length < PAGE) break;
  }
  return rows;
}

// Every Brevo event in the range, tagged with our status name.
async function allEvents(apiKey, startDate, endDate) {
  const out = [];
  for (const [event, name] of Object.entries(EVENTS)) {
    const rows = await brevoEvents(apiKey, event, startDate, endDate);
    for (const r of rows) out.push({ name, date: r.date, email: r.email, subject: r.subject || '', messageId: r.messageId || '', link: r.link || '', reason: r.reason || '' });
  }
  return out;
}

export async function handleBrevoHistory(body, { env = process.env } = {}) {
  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) return { status: 503, body: { ok: false, error: 'Brevo is not connected yet (BREVO_API_KEY missing).' } };
  if (!(await checkLogin(body?.token))) return { status: 401, body: { ok: false, error: 'Please sign in again.' } };

  const dayPick = /^\d{4}-\d{2}-\d{2}$/.test(body.day || '') ? body.day : null;
  const days = Math.min(Math.max(Number(body.days) || 14, 1), 90);
  const endDate = dayPick || new Date().toISOString().slice(0, 10);
  const startDate = dayPick || new Date(Date.parse(endDate) - (days - 1) * 864e5).toISOString().slice(0, 10);

  let events;
  try { events = await allEvents(apiKey, startDate, endDate); } catch (err) {
    console.error('Brevo history failed:', err.message);
    return { status: 502, body: { ok: false, error: "Couldn't load data from Brevo. Please try again." } };
  }

  // Merge the local send log: any send whose messageId has no 'sent' event in the
  // Brevo feed yet (feed lag) is added as a 'sent' event, so it appears in the CRM
  // immediately. Dedupe by messageId, so a send is never counted twice once Brevo
  // catches up. Range filter: only sends whose Dubai date falls in the requested range.
  {
    const seenSent = new Set(events.filter((e) => e.name === 'sent').map((e) => e.messageId));
    const rangeStart = startDate;
    const rangeEnd = endDate;
    for (const s of EMAIL_SENDS) {
      if (seenSent.has(s.messageId)) continue;
      const d = dayOf(s.sent_at);
      if (d < rangeStart || d > rangeEnd) continue;
      events.push({ name: 'sent', date: s.sent_at, email: s.email, subject: s.subject, messageId: s.messageId, link: '', reason: '' });
    }
  }

  // Stats: counts per day (sent comes from the request events).
  const perDay = {};
  for (const e of events) {
    const day = dayOf(e.date);
    const d = (perDay[day] ||= { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, spam: 0, blocked: 0 });
    if (e.name === 'sent') d.sent++;
    else if (e.name === 'delivered') d.delivered++;
    else if (e.name === 'opened') d.opened++;
    else if (e.name === 'clicked') d.clicked++;
    else if (e.name === 'hard_bounce' || e.name === 'soft_bounce' || e.name === 'invalid') d.bounced++;
    else if (e.name === 'unsubscribed') d.unsubscribed++;
    else if (e.name === 'spam') d.spam++;
    else if (e.name === 'blocked') d.blocked++;
  }
  const stats = Object.keys(perDay).sort().reverse().map((day) => ({ day, ...perDay[day] }));

  // Email list for one day: one row per sent email, with its status and full event timeline.
  let sentOn = [];
  if (dayPick) {
    const byId = {};
    for (const e of events) {
      if (!e.messageId) continue;
      const m = (byId[e.messageId] ||= { messageId: e.messageId, email: '', subject: '', sent_at: '', timeline: [] });
      if (e.name === 'sent') { m.email = e.email; m.subject = e.subject; m.sent_at = e.date; }
      if (!m.email) m.email = e.email;
      if (!m.subject) m.subject = e.subject;
      m.timeline.push({ event: e.name, at: e.date, link: e.link, reason: e.reason });
    }
    sentOn = Object.values(byId)
      .filter((m) => m.sent_at && dayOf(m.sent_at) === dayPick)
      .map((m) => {
        m.timeline.sort((a, b) => (a.at < b.at ? -1 : 1));
        const status = m.timeline.reduce((best, t) => (RANK.indexOf(t.event) > RANK.indexOf(best) ? t.event : best), 'sent');
        return { ...m, status };
      })
      .sort((a, b) => (a.sent_at < b.sent_at ? 1 : -1));
  }
  return { status: 200, body: { ok: true, startDate, endDate, stats, sentOn } };
}
