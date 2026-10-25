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

## Leads CRM (/crm)

The project's CRM lives at `/crm` and is part of this repo, not a side page: `crm/index.html` is the shell and `crm/app.js` holds the logic. Vercel serves it at `/crm` (clean URLs) and the local dev server serves it the same way.

Sign in with the dashboard login. Data comes from Supabase through the `dash_*` functions in `SIXTY- Leads/supabase/schema.sql` (`dash_login`, `dash_leads`, `dash_lead_events`, `dash_update_lead`), and the Email log and Stats tabs read Brevo through `/api/brevo-history`.

Tabs: Leads (search, filters, lead drawer, CSV export), LinkedIn (leads tagged `linkedin_invited` or `linkedin_commented`, with invite and comment detail in the drawer), Funnel (pipeline counts from fetched leads, leads to contacted to replied to meetings booked to won, split by country, meetings booked as the headline number), Email log and Stats.

Reply logging is manual for now: the lead drawer's Mark replied button sets the pipeline status to `replied` (which also stamps `replied_at`) and appends a dated note. The email sequence step shown in the drawer comes from `email_sequence_step` in the lead feed; the feed does not carry an emails-sent count or a segment field, so those are not shown.

## Leads CRM (Google Sheet, legacy)

Legacy: website demo leads were originally saved to a Google Sheet. The project's CRM is now /crm (see above); this section is kept for history.

Every lead is saved in the **Sixty Leads CRM** Google Sheet (owned by desigeek0007@gmail.com): website form submissions, WhatsApp demo chats and voice demo calls. One chat or call stays one row (matched on *Record ID*) and fills in as Freya learns more. Your team owns the *Sales status*, *Owner* and *Notes* columns; the website never overwrites them. The *Summary* tab counts everything automatically.

Route: website -> n8n automation **"Sixty: leads to Google Sheet CRM"** (`CRM_WEBHOOK_URL`) -> Apps Script web app inside the sheet (`CRM_SHEET_URL`) -> Leads tab. n8n stores no Google login. If n8n is offline, the website sends the lead straight to the Apps Script, so nothing is lost.

One-time setup (sheet owner):
1. In the sheet: Extensions > Apps Script, paste `scripts/sheet-crm-apps-script.local.gs` (the copy with your secret; it is not committed), Save. On another machine use `scripts/sheet-crm-apps-script.gs` and replace PASTE_CRM_WEBHOOK_SECRET_HERE with `CRM_WEBHOOK_SECRET`.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy and authorise.
3. Copy the Web app URL (ends in `/exec`) into `CRM_SHEET_URL` (in `.env` and in Vercel).
4. In Vercel, also set `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_SECRET` (same values as `.env`), then redeploy.

## Before launch

- Add `og-image.png` (1200×630) for link previews on WhatsApp, LinkedIn and X.
- The page assumes it lives at `https://sixty.devmatesolutions.com/`. If not, update the canonical, Open Graph, JSON-LD, `robots.txt` and `sitemap.xml` URLs.
- Check that the integrations, guarantee and plan limits listed on the page match what you deliver.
- Submit `sitemap.xml` in Google Search Console.

## Pricing

Prices are set in `PRICES` in `main.js` (USD and AED, monthly and yearly). The JSON-LD offers in `index.html` repeat the USD monthly prices.

## Retell (no longer used by the site)

The Retell agents created earlier still exist in your Retell account ("Sixty by DevMate - Freya (Sales & Meetings)" for phone calls and the WhatsApp demo chat agent). The website now runs entirely on Gemini; the `RETELL_*` values in `.env` are unused and can be removed.
