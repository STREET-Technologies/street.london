import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a STREET Ambassador — The Doers',
  description: 'Join the STREET Doers programme. Get early access, exclusive rewards, STREET credit, and be at the forefront of London\'s instant delivery movement.',
  alternates: {
    canonical: 'https://street.london/doers',
  },
  openGraph: {
    title: 'Become a STREET Ambassador — The Doers',
    description: 'Join the STREET Doers programme. Get early access, exclusive rewards, STREET credit, and be at the forefront of London\'s instant delivery movement.',
    url: 'https://street.london/doers',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function DoersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
