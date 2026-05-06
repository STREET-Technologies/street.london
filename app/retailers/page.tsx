import type { Metadata } from 'next';
import RetailersClient from './RetailersClient';

const TITLE = 'Sell on STREET — Get Your London Shop Online';
const DESCRIPTION = "Reach more London customers with instant delivery, full Shopify integration, and zero platform fees on your first orders. Apply to become a STREET retailer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/retailers' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/retailers',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Sell to London via instant delivery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

export default function RetailersPage() {
  return <RetailersClient />;
}
