import type { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';

const TITLE = 'Contact STREET — London Local Delivery Marketplace';
const DESCRIPTION = 'Get in touch with the STREET team. Email hi@street.london or visit us at 62 Sutherland Avenue, London W9 2QU.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/contact-us' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/contact-us',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'Contact STREET' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
