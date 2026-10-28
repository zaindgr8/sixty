import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Script from 'next/script';

// The landing page markup lives in /index.html (single source of truth, easy to edit).
// It is read at build time and rendered statically; the vanilla scripts in /public add the interactivity.
export const dynamic = 'force-static';

function loadLanding() {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]?.trim() ?? '';
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';
  // Drop <script> tags from the body; they are loaded below with next/script instead.
  const markup = body.replace(/<script\b[\s\S]*?<\/script>/g, '').trim();
  return { jsonLd, markup };
}

export default function HomePage() {
  const { jsonLd, markup } = loadLanding();
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/i18n.js" strategy="afterInteractive" />
      <Script src="/main.js" strategy="afterInteractive" />
      <Script src="/voice.js" type="module" strategy="afterInteractive" />
      <Script src="/live-demo.js" strategy="afterInteractive" />
    </>
  );
}
