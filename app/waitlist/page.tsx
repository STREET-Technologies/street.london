import type { Metadata } from 'next';
import WaitlistClient from './WaitlistClient';

const TITLE = 'Join the Waitlist — STREET London Early Access';
const DESCRIPTION = "Be first to shop London's high street through STREET. Sign up for early access to instant delivery from independent boutiques and local shops.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/waitlist' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/waitlist',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Join the waitlist for early access' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

export default function WaitlistPage() {
  return <WaitlistClient />;
}
