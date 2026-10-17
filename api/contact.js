// Vercel serverless function: POST /api/contact
import { handleContact } from '../lib/contact.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body;
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const { status, body: out } = await handleContact(body, { ip });
  return res.status(status).json(out);
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return null; }
}
