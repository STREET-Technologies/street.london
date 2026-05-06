import type { Metadata } from 'next';
import RiderClient from './RiderClient';

const TITLE = 'Become a STREET Courier — Flexible Delivery Work';
const DESCRIPTION = 'Earn flexible income as a STREET delivery courier in London. Choose your hours, get paid weekly, deliver from local shops. Apply now.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/rider' },
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
