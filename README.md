# Sixty by DevMate — landing page

Static page (`index.html`, `styles.css`, `main.js`) plus two small endpoints: `POST /api/contact` emails form submissions through Resend, and `POST /api/voice-call` starts the live Retell voice demo.

## Run locally

```bash
node server.mjs
```

Opens on http://localhost:4173 and reads secrets from `.env` (not committed; see `.env.example`).

## Deploy

**Vercel (recommended):** import this folder. `api/contact.js` becomes the form endpoint automatically. In Project → Settings → Environment Variables add `RESEND_API_KEY`, `CONTACT_TO`, `RESEND_FROM`, `RETELL_API_KEY` and `RETELL_AGENT_ID`.

**Any Node host:** run `node server.mjs` with the same environment variables.

## Email (Resend)

- Every form submission is emailed to `CONTACT_TO` (default `management@devmatesolutions.com`), with reply-to set to the lead's email, so you can just hit Reply.
- `RESEND_FROM` starts as Resend's shared test sender `onboarding@resend.dev`, which **only delivers to the email address that owns the Resend account**. To deliver to management@devmatesolutions.com reliably:
  1. In Resend → Domains, add `devmatesolutions.com` and add the DNS records it shows.
  2. Set `RESEND_FROM=Sixty by DevMate <sixty@devmatesolutions.com>`.
  3. Once a verified sender is set, the lead also gets an automatic "Thanks, we got your message" email.
- Spam protection: hidden honeypot field, input length limits, and 5 submissions per 10 minutes per IP on the Node server.

## Live voice demo (Retell)

- The floating orb ("Talk to Freya") starts a browser voice call with the Retell agent in `RETELL_AGENT_ID` (Vizz Real Estate Freya). The server creates the call at `POST /api/voice-call`; the API key never reaches the browser.
- Visitors type a first name and play a lead who enquired about Tilal Binghatti townhouses; those demo details are passed to Freya's prompt (`lib/voice.mjs`).
- Every call costs Retell minutes. The Node server allows 3 calls per hour per IP. On Vercel, add a firewall rate limit, and set a short **max call duration** on the agent in Retell (e.g. 3–5 minutes).
- Leave `RETELL_AGENT_VERSION` unset to use Retell's default version, or pin a published version.

## Before launch

- Add `og-image.png` (1200×630) for link previews on WhatsApp, LinkedIn and X.
- The page assumes it lives at `https://sixty.devmatesolutions.com/`. If not, update the canonical, Open Graph, JSON-LD, `robots.txt` and `sitemap.xml` URLs.
- Check that the integrations, guarantee and plan limits listed on the page match what you deliver.
- Submit `sitemap.xml` in Google Search Console.

## Pricing

Prices are set in `PRICES` in `main.js` (USD and AED, monthly and yearly). The JSON-LD offers in `index.html` repeat the USD monthly prices.
