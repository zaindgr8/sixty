// Vercel serverless function: POST /api/lead-extract → CRM fields from a live call transcript.
import { handleLeadExtract } from '../lib/lead-extract.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { status, body: out } = await handleLeadExtract(body || {});
  return res.status(status).json(out);
}
