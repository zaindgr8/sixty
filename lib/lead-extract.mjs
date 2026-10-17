// Reads a live call transcript and returns the lead fields for the CRM panel (Gemini, structured output).
import { LEAD_SCHEMA } from './wa-chat.mjs';
import { logLead, fromGeminiLead, hasSubstance, safeId, dubaiStamp } from './crm.mjs';

const MAX_CHARS = 12_000;

const INSTRUCTION = `You update a sales CRM from a live call transcript between Freya (Sixty's AI sales agent) and a visitor who is a potential Sixty customer.
Extract only what the visitor actually said. Leave unknown fields as empty strings (use "Unknown" for industry and interest when not clear).
stage: "New" at first; "Qualified" once you know their industry and how they get leads or roughly how many; "Booked" once they agreed a demo day and time and gave an email; "Not a fit" if clearly not interested.
monthly_leads like "800/mo". location like "Dubai, UAE". meeting_time like "Tue 20 Oct, 11:00 AM Dubai time". next_step: one short line for the sales team. summary: one or two sentences on what the visitor asked about or wants.
Speech-to-text can garble emails: rebuild them sensibly ("zain at devmate dot ae" -> "zain@devmate.ae").`;

/** Returns { status, body } so any server can turn it into an HTTP response. */
export async function handleLeadExtract(body, { env = process.env } = {}) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) return { status: 503, body: { ok: false, error: 'Lead extraction is offline.' } };

  const lines = Array.isArray(body?.transcript) ? body.transcript : [];
  const text = lines
    .filter((l) => l && (l.role === 'user' || l.role === 'agent') && typeof l.text === 'string')
    .map((l) => `${l.role === 'user' ? 'Visitor' : 'Freya'}: ${l.text.trim()}`)
    .join('\n')
    .slice(-MAX_CHARS);
  if (!text.includes('Visitor:')) return { status: 400, body: { ok: false, error: 'Nothing to read yet.' } };

  const model = env.GEMINI_CHAT_MODEL || 'gemini-3.8-flash';
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: INSTRUCTION }] },
        contents: [{ role: 'user', parts: [{ text: `Call transcript so far:\n${text}` }] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json', responseSchema: LEAD_SCHEMA, thinkingConfig: { thinkingLevel: 'low' } },
      }),
      signal: AbortSignal.timeout(20_000),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${JSON.stringify(out.error || out).slice(0, 300)}`);
    const lead = JSON.parse(out.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '{}');
    if (hasSubstance(lead)) {
      await logLead({ ...fromGeminiLead(lead), record_id: safeId(body?.callId, 'call'), channel: 'Voice demo', received: dubaiStamp(body?.startedAt) }, { env });
    }
    return { status: 200, body: { ok: true, crm: lead } };
  } catch (err) {
    console.error('Lead extraction failed:', err.message);
    return { status: 502, body: { ok: false, error: 'Could not read the call right now.' } };
  }
}
