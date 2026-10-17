// Validates a contact-form submission and emails it to the team through Resend.
// Shared by the local server (server.mjs) and the Vercel function (api/contact.js).

const RESEND_URL = 'https://api.resend.com/emails';
const LIMITS = { name: 100, email: 160, phone: 40, company: 120, country: 60, industry: 60, interest: 40, plan: 40, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

function validate(body) {
  if (!body || typeof body !== 'object') return { error: 'Please fill in the form.' };
  if (body.website) return { spam: true }; // honeypot: real visitors never see this field
  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = k === 'message' ? String(body[k] ?? '').trim().slice(0, max) : clean(body[k], max);
  if (!d.name) return { error: 'Please add your name.' };
  if (!EMAIL_RE.test(d.email)) return { error: 'Please add a valid email address.' };
  if (!d.company) return { error: 'Please add your company name.' };
  if (!d.industry) return { error: 'Please choose your industry.' };
  return { data: d };
}

async function send(apiKey, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

function teamEmail(d, meta) {
  const rows = [
    ['Name', d.name], ['Email', d.email], ['Phone / WhatsApp', d.phone || '—'], ['Company', d.company],
    ['Country', d.country || '—'], ['Industry', d.industry], ['Interested in', d.interest || '—'], ['Plan clicked', d.plan || '—'],
  ];
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
  <h2 style="margin:0 0 12px;color:#bd2120">New Sixty lead: ${esc(d.company)}</h2>
  <table cellpadding="6" style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join('')}</table>
  <p style="margin:16px 0 4px;color:#666">Message</p>
  <p style="white-space:pre-wrap;margin:0">${esc(d.message || '—')}</p>
  <p style="margin-top:20px;color:#999;font-size:12px">Sent from the Sixty by DevMate website · ${esc(meta.when)}${meta.ip ? ` · IP ${esc(meta.ip)}` : ''}</p>
</div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${d.message || '—'}\n\nSent ${meta.when}`;
  return { html, text };
}

function confirmationEmail(d) {
  const first = d.name.split(' ')[0];
  return {
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
  <p>Hi ${esc(first)},</p>
  <p>Thanks for reaching out about Sixty. We've got your details and someone from our team will get back to you shortly with a demo built around ${esc(d.company)}.</p>
  <p>Talk soon,<br>The Sixty team at DevMate Solutions</p>
  <p style="color:#999;font-size:12px">Never type “sorry for the late reply” again.</p>
</div>`,
    text: `Hi ${first},\n\nThanks for reaching out about Sixty. We've got your details and someone from our team will get back to you shortly with a demo built around ${d.company}.\n\nTalk soon,\nThe Sixty team at DevMate Solutions`,
  };
}

/** Returns { status, body } so any server can turn it into an HTTP response. */
export async function handleContact(body, { ip = '', env = process.env } = {}) {
  const v = validate(body);
  if (v.spam) return { status: 200, body: { ok: true } };
  if (v.error) return { status: 400, body: { ok: false, error: v.error } };

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return { status: 500, body: { ok: false, error: 'Our form is down right now. Please email management@devmatesolutions.com.' } };
  }
  const to = (env.CONTACT_TO || 'management@devmatesolutions.com').split(',').map((s) => s.trim()).filter(Boolean);
  const from = env.RESEND_FROM || 'Sixty by DevMate <onboarding@resend.dev>';
  const d = v.data;

  try {
    const mail = teamEmail(d, { ip, when: new Date().toISOString() });
    await send(apiKey, { from, to, reply_to: d.email, subject: `New Sixty lead: ${d.company} (${d.industry}, ${d.country || 'n/a'})`, ...mail });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    return { status: 502, body: { ok: false, error: "We couldn't send your message. Please try again, or email management@devmatesolutions.com." } };
  }

  // Resend's shared test sender can only deliver to your own account, so only confirm to the lead
  // once a verified sending domain is set in RESEND_FROM.
  if (!from.includes('@resend.dev')) {
    await send(apiKey, { from, to: [d.email], reply_to: to[0], subject: 'Thanks, we got your message', ...confirmationEmail(d) })
      .catch((err) => console.error('Confirmation email failed:', err.message));
  }
  return { status: 200, body: { ok: true } };
}
