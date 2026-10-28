import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Deletion | Sixty by DevMate',
  description:
    'How to delete your data from Sixty by DevMate, including data received from WhatsApp and Instagram.',
  alternates: {
    canonical: '/data-deletion',
  },
};

export default function DataDeletionPage() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px', fontFamily: '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif', lineHeight: 1.7, color: 'var(--text, #f2f2f2)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 28, paddingBottom: 8 }}>
        <Link href="/" aria-label="Sixty home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#f2f2f2', textDecoration: 'none', font: '700 15px "Lexend", sans-serif', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true" style={{ color: '#e5484d' }}>
            <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" opacity=".25" />
            <path d="M16 3a13 13 0 1 1-11.3 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.6" fill="currentColor" />
          </svg>
          Sixty
        </Link>
      </header>

      <main>
        <h1 style={{ font: '700 clamp(30px,5vw,42px)/1.1 "Lexend", sans-serif', letterSpacing: '-.02em', margin: '40px 0 8px' }}>Data deletion</h1>
        <p style={{ color: '#a3a3a3', fontSize: 14 }}>Effective 20 October 2026 · How to remove your data from Sixty by DevMate Solutions.</p>

        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 16, padding: '18px 20px', margin: '22px 0' }}>
          <strong>Quickest way:</strong> email <a href="mailto:management@devmatesolutions.com?subject=Data%20deletion%20request" style={{ color: '#ff8a8c' }}>management@devmatesolutions.com</a> with the subject <em>&ldquo;Data deletion request&rdquo;</em>. We confirm within 3 business days and complete the deletion within 30 days.
        </div>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>If you messaged a business on WhatsApp or Instagram</h2>
        <p>Sixty is used by businesses to answer their customers. If you chatted with, called, or commented on a business that uses Sixty and want your data removed:</p>
        <ol style={{ paddingLeft: 20 }}>
          <li>Email <a href="mailto:management@devmatesolutions.com?subject=Data%20deletion%20request" style={{ color: '#ff8a8c' }}>management@devmatesolutions.com</a> with the subject <em>&ldquo;Data deletion request&rdquo;</em>.</li>
          <li>Include the <strong>phone number</strong> (WhatsApp or calls) and/or the <strong>Instagram username</strong> you used, and the name of the business, if you know it.</li>
          <li>We may ask you to confirm the request from that number or account, so we only delete your own data.</li>
        </ol>
        <p>We will delete your messages, call recordings and transcripts, lead details and profile information from Sixty, tell the business it was removed, and send you a confirmation with a reference number.</p>

        <h3 style={{ fontSize: 16, margin: '22px 0 6px' }}>Remove Sixty’s access from Instagram</h3>
        <p>You can also stop an Instagram account from sharing data with Sixty at any time: in Instagram open <strong>Settings → Website permissions → Apps and websites</strong>, choose <strong>Sixty by DevMate</strong> and tap <strong>Remove</strong>. On Facebook use <strong>Settings &amp; privacy → Settings → Apps and websites</strong>.</p>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>If you are a Sixty client (business account)</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Disconnect a channel:</strong> in the Sixty dashboard go to <strong>Workspace settings → Connections</strong> and click <strong>Disconnect</strong> on Instagram, or remove your WhatsApp details. We stop receiving data immediately and delete the stored access token.</li>
          <li><strong>Delete a contact:</strong> ask us by email and we will remove that customer&apos;s conversations and lead data.</li>
          <li><strong>Close your workspace:</strong> email us from the owner&apos;s address. We delete all of the workspace&apos;s conversations, leads, documents, settings and team accounts within 30 days.</li>
        </ul>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>What we may keep</h2>
        <p>We keep only what the law requires, such as invoices and records of the deletion request itself. Backups are overwritten within a further 30 days. See our <Link href="/privacy" style={{ color: '#ff8a8c' }}>Privacy Policy</Link> for details.</p>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>Contact</h2>
        <p>DevMate Solutions · Dubai, United Arab Emirates<br />Email: <a href="mailto:management@devmatesolutions.com" style={{ color: '#ff8a8c' }}>management@devmatesolutions.com</a></p>
      </main>

      <footer style={{ color: '#a3a3a3', fontSize: 13, paddingTop: 40, paddingBottom: 50, borderTop: '1px solid rgba(255,255,255,.09)', marginTop: 60 }}>
        © 2026 DevMate Solutions · <Link href="/" style={{ color: '#ff8a8c' }}>Sixty</Link> · <Link href="/privacy" style={{ color: '#ff8a8c' }}>Privacy</Link> · <Link href="/data-deletion" style={{ color: '#ff8a8c' }}>Data deletion</Link><br />
        WhatsApp and Instagram are trademarks of Meta Platforms, Inc. Sixty is not affiliated with Meta.
      </footer>
    </div>
  );
}
