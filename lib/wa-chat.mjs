// Live WhatsApp-style demo: Freya, Sixty's AI sales rep, powered by Gemini.
// The browser sends the conversation so far; we return Freya's next message plus the lead
// details she has gathered (silently), which the page uses to update the CRM panel.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { logLead, fromGeminiLead, hasSubstance, safeId, dubaiStamp } from './crm.mjs';

const PROMPT = readFileSync(join(process.cwd(), 'agents', 'sixty-whatsapp-chat-prompt.md'), 'utf8');
const PROMPT_NL = readFileSync(join(process.cwd(), 'agents', 'sixty-nl-prompt.md'), 'utf8');
const MAX_TURNS = 40;
const MAX_LEN = 600;

const str = { type: 'STRING' };
// The lead fields both the WhatsApp chat and the call extractor fill in for the CRM panel.
export const LEAD_SCHEMA = {
  type: 'OBJECT',
  properties: {
    lead_name: str, company: str,
    industry: { type: 'STRING', enum: ['Unknown', 'Real estate', 'Hospitality', 'Restaurants', 'Clinics & aesthetics', 'Automotive', 'Education & services', 'Other'] },
    location: str, lead_sources: str, monthly_leads: str, crm: str, pain: str,
    interest: { type: 'STRING', enum: ['Unknown', 'WhatsApp AI Agent', 'AI Call Agent', 'Both'] },
    stage: { type: 'STRING', enum: ['New', 'Qualified', 'Booked', 'Not a fit'] },
    meeting_time: str, email: str, next_step: str,
    summary: { type: 'STRING', description: 'One or two sentences for the sales team: what the visitor asked about or wants from Sixty.' },
  },
  required: ['stage'],
};
const SCHEMA = {
  type: 'OBJECT',
  properties: {
    reply: { type: 'STRING', description: 'Your next WhatsApp message to the visitor.' },
    lead: LEAD_SCHEMA,
  },
  required: ['reply', 'lead'],
};

function dubaiNow(locale = 'en-US') {
  return new Date().toLocaleString(locale, { timeZone: 'Asia/Dubai', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/** Returns { status, body } so any server can turn it into an HTTP response. */
export async function handleWaChat(body, { env = process.env } = {}) {
  const nl = body?.lang === 'nl';
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return { status: 503, body: { ok: false, error: 'The live chat is offline right now.' } };
  }

  const history = Array.isArray(body?.history) ? body.history.slice(-MAX_TURNS) : [];
  const contents = history
    .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string' && m.text.trim())
    .map((m) => ({ role: m.role, parts: [{ text: m.text.trim().slice(0, MAX_LEN) }] }));
  if (!contents.length || contents.at(-1).role !== 'user') return { status: 400, body: { ok: false, error: 'Type a message first.' } };
  if (contents.filter((c) => c.role === 'user').length > MAX_TURNS / 2) {
    return { status: 429, body: { ok: false, error: "This demo chat has reached its limit. Book a demo and we'll show you the rest!" } };
  }
  // Gemini expects the conversation to start with the user; our greeting is the first model turn.
  if (contents[0].role === 'model') contents.unshift({ role: 'user', parts: [{ text: '(The visitor opened the WhatsApp chat from the Sixty website.)' }] });

  const model = env.GEMINI_CHAT_MODEL || 'gemini-3.8-flash';
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: nl ? `${PROMPT_NL}\n\nHuidige tijd in Dubai: ${dubaiNow('nl-NL')}.` : `${PROMPT}\n\nCurrent time in Dubai: ${dubaiNow()}.` }] },
        contents,
        generationConfig: { temperature: 0.7, responseMimeType: 'application/json', responseSchema: SCHEMA, thinkingConfig: { thinkingLevel: 'low' } },
      }),
      signal: AbortSignal.timeout(25_000),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${JSON.stringify(out.error || out).slice(0, 300)}`);
    const text = out.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
    const parsed = JSON.parse(text);
    const reply = String(parsed.reply || '').trim();
    if (!reply) throw new Error('Empty reply');
    const lead = parsed.lead || null;
    // Keep the CRM sheet in step with the conversation (one row per chat, updated each turn).
    if (lead && hasSubstance(lead)) {
      await logLead({
        ...fromGeminiLead(lead),
        asked: lead.summary || contents.filter((c) => c.role === 'user').map((c) => c.parts[0].text).slice(1, 3).join(' / '),
        record_id: safeId(body?.conversationId, 'wa'), channel: nl ? 'WhatsApp demo (NL)' : 'WhatsApp demo', received: dubaiStamp(body?.startedAt),
      }, { env });
    }
    return { status: 200, body: { ok: true, replies: [reply], crm: lead } };
  } catch (err) {
    console.error('WhatsApp demo chat failed:', err.message);
    return { status: 502, body: { ok: false, error: 'Freya is having trouble replying. Please try again.' } };
  }
}
