import JoinFlashSequence from '../components/JoinFlashSequence';

export const metadata = {
  title: 'Get Early Access — STREET',
  description: 'Be the first to experience STREET in London. Join the waitlist for early access to instant delivery from your favourite local shops.',
  alternates: {
    canonical: 'https://street.london/join',
  },
  openGraph: {
    title: 'Get Early Access — STREET',
    description: 'Be the first to experience STREET in London. Join the waitlist for early access to instant delivery from your favourite local shops.',
    url: 'https://street.london/join',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function JoinPage() {
  return <JoinFlashSequence />;
}
