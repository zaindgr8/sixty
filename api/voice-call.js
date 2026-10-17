// Vercel serverless function: POST /api/voice-call → { accessToken } for Retell's web SDK.
// Note: Vercel functions don't share memory, so add rate limiting at the edge (e.g. Vercel Firewall)
// or keep the agent's max call duration short in Retell to cap cost.
import { handleVoiceCall } from '../lib/voice.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { status, body: out } = await handleVoiceCall(body || {});
  return res.status(status).json(out);
}
