import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Waitlist — STREET',
  description: 'Get exclusive early access to STREET. Join our waitlist and be among the first Londoners to experience instant delivery from your favourite high street shops.',
  alternates: {
    canonical: 'https://street.london/waitlist',
  },
  openGraph: {
    title: 'Join the Waitlist — STREET',
    description: 'Get exclusive early access to STREET. Join our waitlist and be among the first Londoners to experience instant delivery from your favourite high street shops.',
    url: 'https://street.london/waitlist',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
