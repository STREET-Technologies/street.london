import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deliver with STREET — Flexible Rider & Driver Roles',
  description: 'Earn money delivering for STREET in London. Flexible hours, local routes, and a supportive community. Apply to become a STREET rider or driver today.',
  alternates: {
    canonical: 'https://street.london/rider',
  },
  openGraph: {
    title: 'Deliver with STREET — Flexible Rider & Driver Roles',
    description: 'Earn money delivering for STREET in London. Flexible hours, local routes, and a supportive community. Apply to become a STREET rider or driver today.',
    url: 'https://street.london/rider',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
