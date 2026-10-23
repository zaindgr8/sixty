// Vercel serverless function: POST /api/brevo-history → Sixty email history and stats from Brevo.
import { handleBrevoHistory } from '../lib/brevo-history.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { status, body: out } = await handleBrevoHistory(body || {});
  return res.status(status).json(out);
}
