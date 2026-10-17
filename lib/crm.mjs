// Sends a lead to the Sixty Leads CRM (Google Sheet).
// Route: website -> n8n automation (CRM_WEBHOOK_URL) -> Apps Script web app in the sheet.
// If n8n is unreachable, the lead goes straight to the Apps Script (CRM_SHEET_URL) so nothing is lost.
// The sheet row is matched on record_id, so the same conversation or call updates one row
// as Freya learns more. Never throws: a CRM hiccup must not break the form or the demo.

const FIELDS = ['name', 'company', 'email', 'phone', 'location', 'industry', 'interest', 'asked', 'lead_sources',
  'monthly_leads', 'crm', 'pain', 'contact_pref', 'meeting_time', 'stage', 'next_step'];
const SKIP = new Set(['Unknown', 'Unclear', 'Not given']);

/** "2026-10-17 21:05" in Dubai time, which the sheet reads as a date-time. */
export function dubaiStamp(ms = Date.now()) {
  const t = new Date(Number(ms) || Date.now());
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
    .formatToParts(t).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
}

export const safeId = (v, prefix) => (typeof v === 'string' && /^[a-z0-9_-]{6,80}$/i.test(v) ? v : `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`);

/**
 * @param {{ record_id: string, channel: string, received?: string } & Record<string, any>} lead
 */
export async function logLead(lead, { env = process.env } = {}) {
  if (!lead?.record_id || (!env.CRM_WEBHOOK_URL && !env.CRM_SHEET_URL)) return false;
  const body = { record_id: lead.record_id, channel: lead.channel, received: lead.received || dubaiStamp() };
  for (const k of FIELDS) {
    let v = lead[k];
    if (v == null) continue;
    v = String(v).replace(/\s+/g, ' ').trim().slice(0, 1000);
    if (!v || SKIP.has(v)) continue;
    // Keep phone numbers and anything starting with = + - @ as text in the sheet.
    if (k === 'phone' || /^[=+\-@]/.test(v)) v = `'${v}`;
    body[k] = v;
  }
  const secret = env.CRM_WEBHOOK_SECRET || '';

  // 1) n8n automation (needs the sheet URL to forward to)
  if (env.CRM_WEBHOOK_URL && env.CRM_SHEET_URL) {
    try {
      const res = await fetch(env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-sixty-key': secret, 'ngrok-skip-browser-warning': '1' },
        body: JSON.stringify({ ...body, sheet_url: env.CRM_SHEET_URL || '' }), // n8n forwards to this sheet
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) return true;
      console.error('CRM n8n webhook returned', res.status);
    } catch (err) {
      console.error('CRM n8n webhook failed:', err.message);
    }
  }
  // 2) Backup: straight to the sheet's Apps Script
  if (env.CRM_SHEET_URL) {
    try {
      const res = await fetch(env.CRM_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, key: secret }),
        signal: AbortSignal.timeout(8000),
      });
      const out = await res.json().catch(() => ({}));
      if (out.ok) return true;
      console.error('CRM sheet backup failed:', res.status, out.error || '');
    } catch (err) {
      console.error('CRM sheet backup failed:', err.message);
    }
  }
  return false;
}

/** Maps the lead fields Gemini extracts (wa-chat / lead-extract) to CRM fields. */
export function fromGeminiLead(crm = {}) {
  return {
    name: crm.lead_name, company: crm.company, email: crm.email, location: crm.location, industry: crm.industry,
    interest: crm.interest, asked: crm.summary, lead_sources: crm.lead_sources, monthly_leads: crm.monthly_leads,
    crm: crm.crm, pain: crm.pain, meeting_time: crm.meeting_time, stage: crm.stage, next_step: crm.next_step,
  };
}

/** Only worth a row once the visitor has told us something about themselves. */
export const hasSubstance = (crm = {}) => ['lead_name', 'company', 'email', 'industry', 'lead_sources', 'monthly_leads', 'summary']
  .some((k) => crm[k] && !SKIP.has(String(crm[k]).trim()));
