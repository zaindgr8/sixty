// Vercel serverless function: GET & POST /api/tracker
// Persists tracker data directly to the Supabase database.
import { getTracker, updateTracker } from '../lib/tracker.mjs';

export default async function handler(req, res) {
  // CORS support for development or cross-subdomain calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sixty-key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const { status, body } = await getTracker();
    return res.status(status).json(body);
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ ok: false, error: 'Invalid JSON payload' });
      }
    }
    const { status, body: out } = await updateTracker(body || {});
    return res.status(status).json(out);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
