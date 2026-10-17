// Creates a Retell web call for the "Talk to Freya" voice orb and returns its access token.
// Freya is Sixty's AI sales agent: she asks about the visitor's use case and books a demo.
// The browser joins the call with Retell's web SDK. The API key never leaves the server.

const CREATE_URL = 'https://api.retellai.com/v2/create-web-call';

/** Returns { status, body } so any server can turn it into an HTTP response. */
export async function handleVoiceCall(_body, { env = process.env } = {}) {
  const apiKey = env.RETELL_API_KEY;
  const agentId = env.RETELL_AGENT_ID;
  if (!apiKey || !agentId) {
    console.error('RETELL_API_KEY or RETELL_AGENT_ID is not set');
    return { status: 503, body: { ok: false, error: 'Freya is offline right now. Please try again later.' } };
  }

  const payload = { agent_id: agentId, metadata: { source: 'sixty-website-orb' } };
  if (env.RETELL_AGENT_VERSION) payload.agent_version = Number(env.RETELL_AGENT_VERSION);

  try {
    const res = await fetch(CREATE_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.access_token) throw new Error(`Retell ${res.status}: ${JSON.stringify(out).slice(0, 300)}`);
    return { status: 200, body: { ok: true, accessToken: out.access_token, callId: out.call_id } };
  } catch (err) {
    console.error('Create web call failed:', err.message);
    return { status: 502, body: { ok: false, error: "We couldn't start the call. Please try again in a moment." } };
  }
}
