// Email sent to everyone who applies through the Sixty site (form or voice booking).
// Email-safe HTML: tables, inline styles and bgcolor attributes, so it renders in Gmail, Outlook and Apple Mail.
// Colours follow sixty.devmatesolutions.com: near-black, DevMate red, soft greys.

const SITE = 'https://sixty.devmatesolutions.com';
const C = { bg: '#0a0a0b', card: '#121213', line: '#262628', text: '#f2f2f2', muted: '#a3a3a3', dim: '#6e6e6e', red: '#e5484d' };
const FONT = "'Lexend','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'Geist Mono',SFMono-Regular,Menlo,Consolas,monospace";

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * @param {{ name: string, email: string, phone?: string, company?: string, interest?: string,
 *           contact_pref?: string, meeting_time?: string }} d
 */
export function applicantEmail(d) {
  const first = String(d.name || '').trim().split(/\s+/)[0] || 'there';
  const via = d.contact_pref === 'Email' ? 'by email' : d.contact_pref === 'Phone call' ? 'with a call' : 'on WhatsApp';
  const booked = Boolean(d.meeting_time);
  const subject = booked ? `You're booked, ${first}. See you soon.` : `Thanks ${first}, our sales team will be in touch`;
  const preheader = booked
    ? `Your Sixty demo: ${d.meeting_time}. Our sales team will send the invite.`
    : `We got your request. Our sales team will reach out ${via} shortly.`;

  const rows = [
    ['Email', d.email],
    ['WhatsApp', d.phone],
    ['Company', d.company],
    ['Interested in', d.interest],
    booked ? ['Demo', d.meeting_time] : ['We’ll reach you', d.contact_pref || 'WhatsApp'],
  ].filter(([, v]) => v && String(v).trim() && v !== 'Not given');

  const lead = booked
    ? `Your 15-minute demo is set for <b style="color:${C.text};font-weight:600;">${esc(d.meeting_time)}</b>. Our sales team will email you the calendar invite and get in touch personally before the call.`
    : `We’ve received your request. <b style="color:${C.text};font-weight:600;">Our sales team will contact you personally ${esc(via)}</b> to understand your business and set up a demo built around it. No need to do anything else.`;

  const steps = [
    ['01', 'We review your details', 'So the demo fits your industry and your leads.'],
    ['02', 'Our sales team reaches out', `Personally, ${via}, at a time that suits you.`],
    ['03', 'You see Sixty live', 'Your own leads, qualified in under 60 seconds.'],
  ];

  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark">
<title>${esc(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&family=Geist+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  body{margin:0;padding:0;background:${C.bg};}
  a{color:${C.red};}
  @media (max-width:620px){ .px{padding-left:24px!important;padding-right:24px!important;} .h1{font-size:28px!important;line-height:34px!important;} .step td{display:block;width:auto!important;} }
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};" bgcolor="${C.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${esc(preheader)}&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

    <!-- brand -->
    <tr><td class="px" style="padding:0 40px 22px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="width:18px;height:18px;border:2px solid ${C.red};border-radius:50%;" width="18" height="18">&nbsp;</td>
        <td style="padding-left:10px;font:700 15px ${FONT};letter-spacing:4px;color:${C.text};">SIXTY</td>
        <td style="padding-left:10px;font:500 11px ${MONO};color:${C.dim};">by DevMate</td>
      </tr></table>
    </td></tr>

    <!-- card -->
    <tr><td bgcolor="${C.card}" style="background:${C.card};border:1px solid ${C.line};border-radius:20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="height:3px;line-height:3px;font-size:0;background:${C.red};border-radius:20px 20px 0 0;" bgcolor="${C.red}">&nbsp;</td></tr>
        <tr><td class="px" style="padding:36px 40px 8px;">
          <p style="margin:0 0 14px;font:500 11px ${MONO};letter-spacing:2px;text-transform:uppercase;color:${C.red};">${booked ? 'Demo booked' : 'Request received'}</p>
          <h1 class="h1" style="margin:0;font:700 32px/38px ${FONT};letter-spacing:-0.5px;color:${C.text};">${booked ? `You’re booked, ${esc(first)}.` : `Thanks, ${esc(first)}.<br>We’ll take it from here.`}</h1>
          <p style="margin:18px 0 0;font:400 16px/26px ${FONT};color:${C.muted};">${lead}</p>
        </td></tr>

        ${rows.length ? `<!-- summary -->
        <tr><td class="px" style="padding:26px 40px 6px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
            ${rows.map(([k, v]) => `<tr>
              <td style="padding:12px 0;border-bottom:1px solid ${C.line};font:500 11px ${MONO};letter-spacing:1px;text-transform:uppercase;color:${C.dim};width:38%;" width="38%">${esc(k)}</td>
              <td style="padding:12px 0;border-bottom:1px solid ${C.line};font:400 15px ${FONT};color:${C.text};">${esc(v)}</td>
            </tr>`).join('')}
          </table>
        </td></tr>` : ''}

        <!-- what happens next -->
        <tr><td class="px" style="padding:26px 40px 8px;">
          <p style="margin:0 0 14px;font:500 11px ${MONO};letter-spacing:2px;text-transform:uppercase;color:${C.dim};">What happens next</p>
          ${steps.map(([n, t, s]) => `<table role="presentation" class="step" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px;"><tr>
            <td style="width:44px;vertical-align:top;font:500 13px ${MONO};color:${C.red};" width="44">${n}</td>
            <td style="vertical-align:top;font:400 15px/22px ${FONT};color:${C.text};">${t}<br><span style="font-size:14px;color:${C.muted};">${s}</span></td>
          </tr></table>`).join('')}
        </td></tr>

        <!-- cta -->
        <tr><td class="px" style="padding:14px 40px 38px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td bgcolor="${C.red}" style="background:${C.red};border-radius:999px;">
              <a href="${SITE}/#live" style="display:inline-block;padding:13px 24px;font:600 15px ${FONT};color:#ffffff;text-decoration:none;border-radius:999px;">Try the live demo while you wait →</a>
            </td>
          </tr></table>
          <p style="margin:18px 0 0;font:400 14px/22px ${FONT};color:${C.dim};">Questions in the meantime? Just reply to this email.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- footer -->
    <tr><td class="px" style="padding:26px 40px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle;"><img src="${SITE}/devmate-mark.png" width="22" height="22" alt="DevMate" style="display:block;border:0;border-radius:5px;"></td>
        <td style="padding-left:10px;vertical-align:middle;font:400 13px ${FONT};color:${C.muted};">Sixty is a product of <a href="https://www.devmatesolutions.com" style="color:${C.text};text-decoration:none;font-weight:600;">DevMate Solutions</a></td>
      </tr></table>
      <p style="margin:14px 0 0;font:500 11px ${MONO};letter-spacing:2px;color:${C.dim};">NYC&nbsp;&nbsp;|&nbsp;&nbsp;DUBAI&nbsp;&nbsp;|&nbsp;&nbsp;MUSCAT</p>
      <p style="margin:14px 0 0;font:400 12px/20px ${FONT};color:${C.dim};">
        <a href="${SITE}" style="color:${C.muted};text-decoration:none;">sixty.devmatesolutions.com</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="mailto:management@devmatesolutions.com" style="color:${C.muted};text-decoration:none;">Email us</a><br>
        You’re receiving this because you asked Sixty for a demo. Never type “sorry for the late reply” again.
      </p>
    </td></tr>

  </table>
</td></tr>
</table>
</body></html>`;

  const text = [
    booked ? `You're booked, ${first}.` : `Thanks, ${first}. We'll take it from here.`,
    '',
    booked
      ? `Your 15-minute Sixty demo is set for ${d.meeting_time}. Our sales team will email you the calendar invite and get in touch personally before the call.`
      : `We've received your request. Our sales team will contact you personally ${via} to understand your business and set up a demo built around it.`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'What happens next',
    ...steps.map(([n, t, s]) => `${n}  ${t}: ${s}`),
    '',
    `Try the live demo while you wait: ${SITE}/#live`,
    'Questions? Just reply to this email.',
    '',
    'Sixty is a product of DevMate Solutions · NYC | Dubai | Muscat',
    SITE,
  ].join('\n');

  return { subject, html, text };
}
