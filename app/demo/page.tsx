import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TITLE = 'See STREET in Action: The Retailer Demo';
const DESCRIPTION =
  'A short product tour for London shops. See how customers browse your store, check out, and get their order delivered in under an hour, and how you manage it all from the retailer app.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/demo' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/demo',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'STREET. See how London shops sell and deliver.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

const JOURNEY = [
  { n: '1', title: 'Browse', text: 'Discover stores near any London address.' },
  { n: '2', title: 'Choose', text: 'Full product details with live stock levels.' },
  { n: '3', title: 'Checkout', text: 'Pay in seconds, delivered in under an hour.' },
  { n: '4', title: 'Track', text: 'Live map from the store to the door.' },
];

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <main className="demo-page">
        {/* Hero — value prop + the customer-journey video as the money shot */}
        <section className="demo-hero">
          <div className="container demo-hero-grid">
            <div className="demo-hero-content">
              <h1 className="demo-title">See STREET in action</h1>
              <p className="demo-hero-subtitle">
                Watch a customer browse local shops, check out, and track
                delivery to the door. The whole journey takes under a minute.
              </p>
              <Link href="/retailers" className="demo-cta-button">
                Join STREET <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
            <div className="demo-hero-visual">
              <video
                className="demo-video-phone"
                controls
                playsInline
                preload="metadata"
                poster="/demo/poster-new.jpg"
              >
                <source src="/demo/demo-new.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Customer journey — 4-step hairline row (no cards) */}
        <section className="demo-journey">
          <div className="container">
            <div className="demo-section-head">
              <h2>The complete customer journey</h2>
              <p>Everything your customer sees, from the first tap to the doorstep.</p>
            </div>
            <div className="demo-journey-grid">
              {JOURNEY.map((step) => (
                <div className="demo-journey-step" key={step.n}>
                  <span className="demo-journey-num" aria-hidden="true">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature — visual left, content right */}
        <section className="demo-feature demo-feature-sand">
          <div className="container demo-feature-grid">
            <div className="demo-feature-visual">
              <Image
                src="/img/demo/shopping-v2.png"
                alt="Two phones showing the STREET app: browsing a store page with real storefront photography and viewing a product with sizes and pricing"
                width={1920}
                height={1440}
                className="demo-feature-img"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
            <div className="demo-feature-content">
              <h2 className="demo-feature-heading">Your shop, in every pocket</h2>
              <p className="demo-feature-text">
                Customers discover your store and browse your full product range
                through the STREET app. Your storefront, your products, your
                brand identity, presented exactly the way you want.
              </p>
              <ul className="demo-feature-list">
                <li>Real storefront photography and brand identity</li>
                <li>Full product catalog with live inventory from Shopify</li>
                <li>One-tap checkout with saved payment methods</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Orders — compact split: content left, retailer screens right */}
        <section className="demo-feature">
          <div className="container demo-feature-grid">
            <div className="demo-feature-content">
              <h2 className="demo-feature-heading">Orders that manage themselves</h2>
              <p className="demo-feature-text">
                When a customer places an order, you get an instant notification
                with a countdown timer. Review the items, confirm stock, pack the
                bag, hand it to our courier. The whole flow takes minutes.
              </p>
              <ul className="demo-feature-list">
                <li>Instant push notification with full order details</li>
                <li>Built-in packing checklist for accuracy</li>
                <li>No spreadsheets, no phone calls, no manual entry</li>
              </ul>
            </div>
            <div className="demo-feature-visual">
              <div className="demo-screens">
                <Image
                  src="/img/demo/retailer-incoming-v2.png"
                  alt="Retailer app showing an incoming order with a five-minute countdown timer, item details, and accept or decline buttons"
                  width={1290}
                  height={2796}
                  className="demo-screen demo-screen-back"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
                <Image
                  src="/img/demo/retailer-packing.png"
                  alt="Retailer app packing screen with items being checked off as available and placed in the bag"
                  width={1290}
                  height={2796}
                  className="demo-screen demo-screen-front"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tracking — dark band: phone left, content right.
            The tracking phone PNG is cropped at the bottom; a dark background
            hides that cut (cream exposed it). One deliberate colour block. */}
        <section className="demo-feature demo-feature-dark">
          <div className="container demo-feature-grid">
            <div className="demo-feature-visual">
              <Image
                src="/img/demo/tracking-v2.png"
                alt="Phone showing live order tracking with a map of central London, courier location, and real-time delivery status updates"
                width={1920}
                height={1440}
                className="demo-feature-img demo-feature-img--device"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
            <div className="demo-feature-content">
              <h2 className="demo-feature-heading">From your store to their door</h2>
              <p className="demo-feature-text">
                Your customer tracks their order in real time from the moment
                you hand it off. Live map, courier details, every status update
                from accepted to delivered.
              </p>
              <ul className="demo-feature-list">
                <li>Real-time GPS tracking on a live map</li>
                <li>Automatic status updates at every stage</li>
                <li>Average delivery time under 45 minutes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="demo-cta-section">
          <div className="container">
            <h2 className="demo-cta-heading">Ready to join STREET?</h2>
            <p className="demo-cta-text">
              Join London&apos;s fastest-growing local delivery platform. No
              upfront costs, no platform fees on your first orders.
            </p>
            <Link href="/retailers" className="demo-cta-button">
              Join STREET <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
