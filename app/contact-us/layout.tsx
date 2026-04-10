import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — STREET',
  description: 'Get in touch with STREET. Have questions about our instant delivery service, retail partnerships, or careers? We\'d love to hear from you.',
  alternates: {
    canonical: 'https://street.london/contact-us',
  },
  openGraph: {
    title: 'Contact Us — STREET',
    description: 'Get in touch with STREET. Have questions about our instant delivery service, retail partnerships, or careers? We\'d love to hear from you.',
    url: 'https://street.london/contact-us',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET — Your high street, instantly' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
