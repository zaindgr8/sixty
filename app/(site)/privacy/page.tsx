import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sixty by DevMate',
  description:
    'How Sixty by DevMate Solutions collects, uses, protects and deletes data, including data from WhatsApp, Instagram and Messenger.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
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
        <h1 style={{ font: '700 clamp(30px,5vw,42px)/1.1 "Lexend", sans-serif', letterSpacing: '-.02em', margin: '40px 0 8px' }}>Privacy Policy</h1>
        <p style={{ color: '#a3a3a3', fontSize: 14 }}>Effective 20 October 2026 · Applies to sixty.devmatesolutions.com, the Sixty dashboard and the Sixty Meta app (&ldquo;Sixty by DevMate&rdquo;).</p>

        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 16, padding: '18px 20px', margin: '22px 0' }}>
          <strong>In short:</strong> Sixty is a service that businesses use to answer their own customers on WhatsApp, Instagram and phone with an AI agent. We process messages only to provide that service to the business that connected the account. We never sell personal data or use it for advertising, and you can ask us to delete it at any time (see <Link href="/data-deletion" style={{ color: '#ff8a8c' }}>Data deletion</Link>).
        </div>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>1. Who we are</h2>
        <p>Sixty is a product of <strong>DevMate Solutions</strong>, with offices in Dubai (United Arab Emirates), New York and Muscat. For privacy questions, contact us at <a href="mailto:management@devmatesolutions.com" style={{ color: '#ff8a8c' }}>management@devmatesolutions.com</a>.</p>
        <p>When a business (our <strong>client</strong>) uses Sixty to talk to its customers, the client decides why and how those customers&apos; data is used and is the data controller. DevMate Solutions acts as the client&apos;s <strong>service provider (data processor)</strong> for that data. For our own website visitors and the people who sign up for Sixty, we are the controller.</p>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>2. What we collect</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px', margin: '10px 0' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)', color: '#a3a3a3' }}>Who</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)', color: '#a3a3a3' }}>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}><strong>Our website visitors</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}>Basic technical telemetry (IP address, user agent, pages viewed, time of visit) and anything you submit in our contact or demo forms (name, work email, phone, company, role, country).</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}><strong>Our clients</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}>Account details, contact info, billing info (handled by our payment processor; we do not store full card numbers), API tokens and webhook configuration needed to connect your WhatsApp Business, Instagram Professional or phone provider.</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}><strong>Customers who chat with or call a Sixty-powered business</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,.09)' }}>Phone number, WhatsApp name or profile picture URL (as sent by WhatsApp), message text, voice audio (only during a live call to transcribe it), and any information you provide in the conversation (such as budget, timeline, property preferences, email, appointment times).</td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>3. How we use Meta user data</h2>
        <p>Through the official <strong>WhatsApp Business Platform</strong>, <strong>Instagram Graph API</strong> and <strong>Messenger API</strong> (collectively the &ldquo;Meta APIs&rdquo;), Sixty receives inbound messages and sends outbound replies on behalf of our clients.</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>We use Meta user data <strong>only to provide the automated messaging service</strong> requested by the business that connected the account.</li>
          <li>We <strong>do not sell</strong> Meta user data to any third party.</li>
          <li>We <strong>do not use Meta user data for personalized advertising, retargeting, profiling, or cross-app tracking</strong>.</li>
          <li>We <strong>do not use customer conversations to train public or foundation AI models</strong>. Prompts and conversations sent to LLM providers (e.g. OpenAI, Anthropic, Google) are sent through enterprise APIs that do not train on customer inputs.</li>
          <li>We retain Meta message data only for the period necessary to power the client&apos;s CRM sync, conversation history, audit log, or as requested by the client.</li>
        </ul>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>4. Sub-processors and sharing</h2>
        <p>We share data only with infrastructure providers necessary to run the service:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Cloud hosting and database:</strong> Supabase, Vercel, AWS (hosting, encryption at rest, backups).</li>
          <li><strong>Messaging platforms:</strong> Meta Platforms, Inc. (WhatsApp Cloud API, Instagram Graph API).</li>
          <li><strong>Telephony &amp; Voice:</strong> Retell AI, Twilio (live call bridging and streaming).</li>
          <li><strong>AI processing:</strong> OpenAI, Anthropic, Google Cloud (processing prompts via enterprise zero-retention / no-training terms).</li>
          <li><strong>CRM integrations:</strong> Where configured by the client, data is forwarded to the client&apos;s own CRM (HubSpot, Salesforce, Zoho, Google Sheets, etc.).</li>
        </ul>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>5. Security and retention</h2>
        <p>All data in transit is encrypted using modern TLS (HTTPS / WSS). Data at rest in our databases is encrypted using AES-256. API keys and Meta access tokens are stored in encrypted vaults and never exposed to the browser.</p>
        <p>Conversation logs and audio recordings are retained for 90 days by default, or for the duration configured by the client. Clients can delete or export conversation logs at any time via the Sixty dashboard or by API.</p>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>6. Your rights and data deletion</h2>
        <p>Under the UAE Personal Data Protection Law (Federal Decree-Law No. 45/2021), GDPR, UK GDPR, and California CCPA/CPRA, you have the right to access, correct, export, or delete your personal data, and to withdraw consent.</p>
        <p>To request deletion of any data Sixty holds about you, see our <Link href="/data-deletion" style={{ color: '#ff8a8c' }}>Data Deletion Instructions</Link> or email <a href="mailto:management@devmatesolutions.com" style={{ color: '#ff8a8c' }}>management@devmatesolutions.com</a>. We acknowledge requests within 3 business days and complete deletion within 30 days.</p>

        <h2 style={{ font: '600 21px/1.3 "Lexend", sans-serif', margin: '40px 0 10px' }}>7. Updates to this policy</h2>
        <p>When we update this policy, we update the &ldquo;Effective&rdquo; date at the top. For material changes that affect existing clients, we notify by email or in-app notice 14 days before the changes take effect.</p>
      </main>

      <footer style={{ color: '#a3a3a3', fontSize: 13, paddingTop: 40, paddingBottom: 50, borderTop: '1px solid rgba(255,255,255,.09)', marginTop: 60 }}>
        © 2026 DevMate Solutions. All rights reserved. · <Link href="/" style={{ color: '#ff8a8c' }}>Home</Link> · <Link href="/privacy" style={{ color: '#ff8a8c' }}>Privacy</Link> · <Link href="/data-deletion" style={{ color: '#ff8a8c' }}>Data deletion</Link>
      </footer>
    </div>
  );
}
