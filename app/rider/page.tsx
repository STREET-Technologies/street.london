import type { Metadata } from 'next';
import RiderClient from './RiderClient';

const TITLE = 'Become a STREET Courier — Flexible Delivery Work';
const DESCRIPTION = 'Earn flexible income as a STREET delivery courier in London. Choose your hours, get paid weekly, deliver from local shops. Apply now.';

// Page hidden from indexing/linking 2026-05-16 — couriers not yet onboarded.
// To restore: re-add canonical alternates, remove robots overrides, restore Footer/Join/404/sitemap links.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: undefined },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/rider',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Flexible delivery work in London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

export default function RiderPage() {
  return <RiderClient />;
}
