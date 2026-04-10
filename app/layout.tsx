import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const barlow = Barlow({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://street.london'),
  title: {
    default: 'STREET — Your high street, instantly',
    template: '%s | STREET',
  },
  description: 'Discover independent boutiques and local favourites on your London high street. Browse, buy, and get it delivered to your door in under 60 minutes.',
  keywords: ['high street shopping', 'London delivery', 'local shops London', 'instant delivery London', 'independent boutiques London'],
  authors: [{ name: 'STREET', url: 'https://street.london' }],
  creator: 'STREET',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://street.london',
    siteName: 'STREET',
    title: 'STREET — Your high street, instantly',
    description: 'Discover independent boutiques and local favourites on your London high street. Browse, buy, and get it delivered to your door in under 60 minutes.',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'STREET — Your high street, instantly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STREET — Your high street, instantly',
    description: 'Discover independent boutiques and local favourites on your London high street. Browse, buy, and get it delivered to your door in under 60 minutes.',
    images: ['/img/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://street.london',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "STREET",
            "url": "https://street.london",
            "description": "Instant delivery from your favourite local shops on your London high street.",
            "email": "hi@street.london",
            "logo": "https://street.london/img/logo-green-transparent.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "62 Sutherland Avenue",
              "addressLocality": "London",
              "postalCode": "W9 2QU",
              "addressCountry": "GB"
            },
            "sameAs": [
              "https://www.instagram.com/st.reet.app/",
              "https://www.linkedin.com/company/street-london/"
            ]
          })}}
        />
      </head>
      <body className={barlow.variable}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
