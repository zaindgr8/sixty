# Sixty by DevMate — landing page

Static page (`index.html`, `styles.css`, `main.js`) plus four small endpoints: `POST /api/contact` (form emails via Resend), `POST /api/wa-chat` (WhatsApp demo), `POST /api/voice-call` (Gemini Live token) and `POST /api/lead-extract` (CRM fields from call transcripts).

## Run locally

```bash
npm run dev
```

Opens on http://localhost:4173 and reads secrets from `.env` (not committed; see `.env.example`).

## Deploy

**Vercel (recommended):** import this folder. `api/contact.js` becomes the form endpoint automatically. In Project → Settings → Environment Variables add `RESEND_API_KEY`, `CONTACT_TO`, `RESEND_FROM`, `GEMINI_API_KEY` and optionally `GEMINI_CHAT_MODEL` / `GEMINI_VOICE`.

**Any Node host:** run `npm run dev` (scripts/dev-server.mjs) with the same environment variables.

## Email (Resend)

- Every form submission is emailed to `CONTACT_TO` (default `management@devmatesolutions.com`), with reply-to set to the lead's email, so you can just hit Reply.
- `RESEND_FROM` starts as Resend's shared test sender `onboarding@resend.dev`, which **only delivers to the email address that owns the Resend account**. To deliver to management@devmatesolutions.com reliably:
  1. In Resend → Domains, add `devmatesolutions.com` and add the DNS records it shows.
  2. Set `RESEND_FROM=Sixty by DevMate <sixty@devmatesolutions.com>`.
  3. Once a verified sender is set, the lead also gets an automatic "Thanks, we got your message" email.
- Spam protection: hidden honeypot field, input length limits, and 5 submissions per 10 minutes per IP on the Node server.

## Live demo: WhatsApp | Call (Gemini)

The "Try it live" section (right after the hero) lets visitors be the lead. A toggle switches between:
- **WhatsApp:** chat with Freya. `POST /api/wa-chat` sends the conversation to Gemini (`GEMINI_CHAT_MODEL`, default `gemini-3.8-flash`) with the prompt in `agents/sixty-whatsapp-chat-prompt.md`, and gets back her next message plus the lead fields as structured JSON.
- **Call:** a live voice call with Freya on **Gemini Live** (`gemini-3.8-live`, prompt in `agents/sixty-voice-gemini-prompt.md`). `POST /api/voice-call` mints a one-time, 15-minute Gemini token with the prompt, voice and tools locked in, so the browser talks to Gemini directly without seeing the key. After each of Freya's turns, `POST /api/lead-extract` reads the transcript with Gemini and returns the lead fields. When Freya books the demo she calls `book_demo`, which emails the team through `/api/contact`.

Both channels feed the same CRM panel (pipeline card, lead card, inbox, activity feed, KPIs). The floating orb uses the same voice engine (`voice.js`), so orb calls update the CRM too.

Limits on the Node server: voice 3 calls/hour per IP (10 min max each), chat 20 visitor messages per conversation and 40 per 10 minutes per IP, extraction 60 per 10 minutes. On Vercel, add equivalent firewall rate limits.

## Before launch

- Add `og-image.png` (1200×630) for link previews on WhatsApp, LinkedIn and X.
- The page assumes it lives at `https://sixty.devmatesolutions.com/`. If not, update the canonical, Open Graph, JSON-LD, `robots.txt` and `sitemap.xml` URLs.
- Check that the integrations, guarantee and plan limits listed on the page match what you deliver.
- Submit `sitemap.xml` in Google Search Console.

## Pricing

Prices are set in `PRICES` in `main.js` (USD and AED, monthly and yearly). The JSON-LD offers in `index.html` repeat the USD monthly prices.

## Retell (no longer used by the site)

The Retell agents created earlier still exist in your Retell account ("Sixty by DevMate - Freya (Sales & Meetings)" for phone calls and the WhatsApp demo chat agent). The website now runs entirely on Gemini; the `RETELL_*` values in `.env` are unused and can be removed.
