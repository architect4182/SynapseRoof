import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Synapse Roof — $0 Electricity Bills for the Next 7 Years',
  description:
    'Forget the energy market, weather conditions and seasons. Our Smart Controller guarantees you get no electricity bill for seven years.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Synapse Roof — $0 Electricity Bills for 7 Years',
    description:
      'Autonomous architectural solar systems with liquid-cooled LFP storage and 7-year zero-bill performance bond guarantee.',
    url: 'https://synapseroof.com',
    siteName: 'Synapse Roof',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b1426',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#0b1426] text-[#f3f5f9] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

