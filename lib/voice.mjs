// "Talk to Freya" voice orb, powered by Gemini Live.
// We mint a short-lived, single-use Gemini token with Freya's model, voice, prompt and tools locked in,
// so the browser can talk to Gemini directly without ever seeing the real API key or the prompt.
import { readFileSync } from 'node:fs';

const PROMPT = readFileSync(new URL('../agents/sixty-voice-gemini-prompt.md', import.meta.url), 'utf8');
const PROMPT_NL = readFileSync(new URL('../agents/sixty-nl-prompt.md', import.meta.url), 'utf8');
const VOICE_NL = 'Je voert een live telefoongesprek. Praat in korte, natuurlijke zinnen. Geen opsommingen, geen markdown, geen emoji. Eén vraag per keer en daarna luisteren.';
export const LIVE_MODEL = 'models/gemini-3.8-live';

const BOOK_DEMO = {
  name: 'book_demo',
  description: 'Book the 15-minute Sixty demo once the visitor has agreed a day and time and confirmed their email. Call it exactly once.',
  parameters: {
    type: 'OBJECT',
    properties: {
      name: { type: 'STRING', description: "Visitor's full name." },
      email: { type: 'STRING', description: 'Email exactly as confirmed, lowercase.' },
      company: { type: 'STRING', description: 'Company or business name.' },
      phone: { type: 'STRING', description: 'Phone or WhatsApp number, if given.' },
      industry: { type: 'STRING', enum: ['Real estate', 'Hospitality', 'Restaurants', 'Clinics & aesthetics', 'Automotive', 'Education & services', 'Other'] },
      country: { type: 'STRING', description: 'Country where the business is based.' },
      meeting_time: { type: 'STRING', description: "Agreed day, date, time and time zone, e.g. 'Tuesday 20 October 2026, 11:00 AM Dubai time'." },
      interest: { type: 'STRING', enum: ['WhatsApp AI Agent', 'AI Call Agent', 'Both'] },
      use_case: { type: 'STRING', description: 'Two or three sentences on their business, lead sources, volume and main pain.' },
    },
    required: ['name', 'email', 'meeting_time'],
  },
};

function dubaiNow(locale = 'en-US') {
  return new Date().toLocaleString(locale, { timeZone: 'Asia/Dubai', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/** Returns { status, body } with a one-time Gemini Live token for the browser. */
export async function handleVoiceCall(body, { env = process.env } = {}) {
  const nl = body?.lang === 'nl';
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return { status: 503, body: { ok: false, error: 'Freya is offline right now. Please try again later.' } };
  }
  const now = Date.now();
  const token = {
    uses: 1,
    expireTime: new Date(now + 15 * 60_000).toISOString(), // the conversation must finish within 15 minutes
    newSessionExpireTime: new Date(now + 2 * 60_000).toISOString(), // and start within 2
    bidiGenerateContentSetup: {
      model: LIVE_MODEL,
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { ...(nl ? { languageCode: 'nl-NL' } : {}), voiceConfig: { prebuiltVoiceConfig: { voiceName: env.GEMINI_VOICE || 'Aoede' } } },
      },
      systemInstruction: { parts: [{ text: nl ? `${PROMPT_NL}\n\n${VOICE_NL}\n\nHuidige tijd in Dubai: ${dubaiNow('nl-NL')}.` : `${PROMPT}\n\nCurrent time in Dubai: ${dubaiNow()}.` }] },
      tools: [{ functionDeclarations: [BOOK_DEMO] }],
      inputAudioTranscription: {},
      outputAudioTranscription: {},
    },
  };

  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1alpha/auth_tokens', {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
      signal: AbortSignal.timeout(10_000),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.name) throw new Error(`Gemini token ${res.status}: ${JSON.stringify(out.error || out).slice(0, 300)}`);
    return { status: 200, body: { ok: true, token: out.name, model: LIVE_MODEL, lang: nl ? 'nl' : 'en' } };
  } catch (err) {
    console.error('Create Gemini Live token failed:', err.message);
    return { status: 502, body: { ok: false, error: "We couldn't start the call. Please try again in a moment." } };
  }
}
