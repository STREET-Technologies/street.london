import type { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';

const TITLE = 'Contact STREET: London Local Delivery Marketplace';
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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://street.london/#localbusiness",
  "name": "STREET Technologies",
  "url": "https://street.london",
  "email": "hi@street.london",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "62 Sutherland Avenue",
    "addressLocality": "London",
    "postalCode": "W9 2QU",
    "addressCountry": "GB"
  },
  "sameAs": [
    "https://www.instagram.com/st.reet.app/",
    "https://www.linkedin.com/company/street-london/",
    "https://find-and-update.company-information.service.gov.uk/company/16248225"
  ],
  "parentOrganization": { "@id": "https://street.london/#organization" }
};

export default function ContactUsPage() {
  return (
    <>
      <ContactUsClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
