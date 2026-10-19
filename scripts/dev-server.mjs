// Local / self-hosted server: serves the static site and POST /api/contact.
// Run: npm run dev   (reads .env in the project root). Not used on Vercel, which serves the static files and /api functions itself.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleContact } from '../lib/contact.mjs';
import { handleVoiceCall } from '../lib/voice.mjs';
import { handleWaChat } from '../lib/wa-chat.mjs';
import { handleLeadExtract } from '../lib/lead-extract.mjs';
import { getTracker, updateTracker } from '../lib/tracker.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = Number(process.env.PORT || 4173);

// Minimal .env loader (no dependency).
const envFile = join(ROOT, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };
const PUBLIC = new Set(['.html', '.css', '.js', '.svg', '.png', '.xml', '.txt', '.ico']);

// Simple per-IP rate limits: form 5 per 10 minutes, voice demo 3 calls per hour.
const hits = new Map();
function limited(key, max, windowMs) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

async function readBody(req, max = 20_000) {
  let size = 0;
  const chunks = [];
  for await (const c of req) {
    size += c.length;
    if (size > max) throw new Error('too large');
    chunks.push(c);
  }
  return Buffer.concat(chunks).toString('utf8');
}

const json = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/contact') {
    if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    if (limited(`form:${ip}`, 5, 10 * 60_000)) return json(res, 429, { ok: false, error: 'Too many messages. Please try again in a few minutes.' });
    let body = null;
    try { body = JSON.parse(await readBody(req)); } catch { return json(res, 400, { ok: false, error: 'Please fill in the form.' }); }
    const { status, body: out } = await handleContact(body, { ip });
    return json(res, status, out);
  }

  if (url.pathname === '/api/voice-call') {
    if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    if (limited(`voice:${ip}`, 3, 60 * 60_000)) return json(res, 429, { ok: false, error: "You've reached the demo limit for now. Book a demo and we'll show you more." });
    let body = {};
    try { body = JSON.parse((await readBody(req, 2_000)) || '{}'); } catch { /* name is optional */ }
    const { status, body: out } = await handleVoiceCall(body);
    return json(res, status, out);
  }

  if (url.pathname === '/api/wa-chat') {
    if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    if (limited(`chat:${ip}`, 40, 10 * 60_000)) return json(res, 429, { ok: false, error: "You're chatting fast! Give it a minute and try again." });
    let body = {};
    try { body = JSON.parse((await readBody(req, 4_000)) || '{}'); } catch { return json(res, 400, { ok: false, error: 'Type a message first.' }); }
    const { status, body: out } = await handleWaChat(body);
    return json(res, status, out);
  }

  if (url.pathname === '/api/lead-extract') {
    if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    if (limited(`extract:${ip}`, 60, 10 * 60_000)) return json(res, 429, { ok: false, error: 'Too many updates. Try again shortly.' });
    let body = {};
    try { body = JSON.parse((await readBody(req, 30_000)) || '{}'); } catch { return json(res, 400, { ok: false, error: 'Bad request.' }); }
    const { status, body: out } = await handleLeadExtract(body);
    return json(res, status, out);
  }

  if (url.pathname === '/api/tracker') {
    if (req.method === 'GET') {
      const { status, body: out } = await getTracker();
      return json(res, status, out);
    }
    if (req.method === 'POST') {
      let body = {};
      try { body = JSON.parse(await readBody(req, 100_000)); } catch { return json(res, 400, { ok: false, error: 'Bad JSON' }); }
      const { status, body: out } = await updateTracker(body);
      return json(res, status, out);
    }
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  // Static files only from this folder, never server code or secrets.
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (path.endsWith('/')) path += 'index.html';
  if (!extname(path) && existsSync(join(ROOT, path + '.html'))) path += '.html';
  const file = join(ROOT, path);
  if (!file.startsWith(ROOT) || !PUBLIC.has(extname(file)) || /[/\\](lib|api|scripts|agents|node_modules)[/\\]/.test(file)) {
    res.writeHead(404); return res.end('Not found');
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(PORT, () => console.log(`Sixty landing on http://localhost:${PORT}`));
