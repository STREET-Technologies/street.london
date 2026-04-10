import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with STREET — List Your Shop',
  description: 'Join STREET as a retail partner. Get your local London shop discovered by thousands of shoppers and start selling online with instant delivery.',
  alternates: {
    canonical: 'https://street.london/retailers',
  },
  openGraph: {
    title: 'Partner with STREET — List Your Shop',
    description: 'Join STREET as a retail partner. Get your local London shop discovered by thousands of shoppers and start selling online with instant delivery.',
    url: 'https://street.london/retailers',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function RetailersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
