// Creates a Retell web call for the "Talk to Freya" voice demo and returns its access token.
// The browser then joins the call with Retell's web SDK. The API key never leaves the server.

const CREATE_URL = 'https://api.retellai.com/v2/create-web-call';

// dd-mm-yyyy, `daysAgo` days before today (the format Freya's prompt expects).
function ddmmyyyy(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  return [d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear()].map((n) => String(n).padStart(2, '0')).join('-');
}

// Keep only a plausible first name: letters, spaces, hyphens, apostrophes.
function firstName(raw) {
  const name = String(raw ?? '').normalize('NFKC').replace(/[^\p{L}\s'-]/gu, '').trim().split(/\s+/)[0] || '';
  return name.slice(0, 30);
}

/** Returns { status, body } so any server can turn it into an HTTP response. */
export async function handleVoiceCall(body, { env = process.env } = {}) {
  const apiKey = env.RETELL_API_KEY;
  const agentId = env.RETELL_AGENT_ID;
  if (!apiKey || !agentId) {
    console.error('RETELL_API_KEY or RETELL_AGENT_ID is not set');
    return { status: 503, body: { ok: false, error: 'The live demo is offline right now. Please try again later.' } };
  }

  const name = firstName(body?.name) || 'Alex';
  // A visitor plays a lead who enquired about Tilal Binghatti townhouses two weeks ago.
  const vars = {
    customer_name: name,
    lead_id: 'WEB-DEMO',
    project_name: 'Tilal Binghatti',
    property_type: '["townhouse/villa"]',
    timeframe: '["within_30_days"]',
    city: '["Dubai"]',
    nationality: '',
    first_contact_date: ddmmyyyy(14),
    last_follow_up: ddmmyyyy(7),
  };

  const payload = { agent_id: agentId, retell_llm_dynamic_variables: vars, metadata: { source: 'sixty-website' } };
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
