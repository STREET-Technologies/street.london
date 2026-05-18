import type { Metadata } from 'next';
import DoersClient from './DoersClient';

const TITLE = 'Become a STREET Ambassador: Earn While You Share';
const DESCRIPTION = "Love your local high street? Join the STREET ambassador programme and earn rewards for sharing London's best independent shops.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/doers' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/doers',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET. Become an ambassador.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

export default function DoersPage() {
  return <DoersClient />;
}
