import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sixty.devmatesolutions.com'),
  title: 'Sixty by DevMate | AI WhatsApp & Voice Agent That Qualifies Every Lead in 60 Seconds',
  description:
    'Sixty qualifies every WhatsApp and phone lead in under 60 seconds, 24/7. It replies instantly, books and syncs to your CRM. Built for real estate, hospitality, restaurants and clinics in the UAE and USA.',
  keywords: [
    'AI WhatsApp agent',
    'WhatsApp chatbot Dubai',
    'WhatsApp Business API UAE',
    'AI call agent',
    'AI voice agent',
    'speed to lead',
    'lead response software',
    'real estate WhatsApp automation',
    'AI receptionist',
    'WhatsApp automation Dubai',
    'voice AI agent UAE',
    'CRM lead automation',
    'lead qualification bot',
  ],
  authors: [{ name: 'DevMate Solutions' }],
  publisher: 'DevMate Solutions',
  alternates: {
    canonical: '/',
    languages: {
      'en-us': '/',
      'en-ae': '/',
      'x-default': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Sixty by DevMate',
    title: "Sixty by DevMate | Never type 'sorry for the late reply' again",
    description:
      'An AI agent that qualifies every WhatsApp and phone lead in under 60 seconds, books the next step and updates your CRM.',
    url: 'https://sixty.devmatesolutions.com/',
    images: [
      {
        url: '/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Sixty by DevMate - AI WhatsApp and Voice Agent that qualifies every lead in under 60 seconds',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['en_AE'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sixty by DevMate | Never type 'sorry for the late reply' again",
    description: 'Every WhatsApp and phone lead qualified in under 60 seconds. Booked and in your CRM.',
    images: ['/og-image.png?v=2'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Vanilla scripts (i18n.js, main.js) adjust lang/data-* on <html> after load.
    <html lang="en" data-region="uae" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Doto:wght@700;900&family=Lexend:wght@500;600;700&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
