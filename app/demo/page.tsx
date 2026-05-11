import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Plug, BadgePercent, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'STREET Retailer Demo',
  description: 'A short tour of how STREET works for London retailers.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: undefined },
};

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <main className="demo-page">
        <div className="container">
          <header className="demo-hero">
            <h1 className="demo-title">See STREET in action</h1>
            <p className="demo-tagline">
              A 60-second tour of how STREET connects your shop to London customers
              with instant delivery.
            </p>
          </header>

          <div className="demo-video-wrap demo-video-landscape">
            <video
              className="demo-video"
              controls
              playsInline
              preload="metadata"
              poster="/demo/poster.jpg"
            >
              <source src="/demo/demo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.{' '}
              <a href="/demo/demo.mp4">Download the demo</a>.
            </video>
          </div>

          <div className="demo-video-wrap demo-video-portrait">
            <video
              className="demo-video"
              controls
              playsInline
              preload="metadata"
              poster="/demo/poster-portrait.jpg"
            >
              <source src="/demo/demo-portrait.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.{' '}
              <a href="/demo/demo-portrait.mp4">Download the demo</a>.
            </video>
          </div>

          <section className="demo-why">
            <h2 className="demo-section-title">Why STREET</h2>
            <div className="demo-why-grid">
              <div className="demo-why-card">
                <div className="demo-why-icon">
                  <Zap size={28} strokeWidth={2.25} />
                </div>
                <h3>Instant delivery, ready to go</h3>
                <p>
                  We bring London shoppers to your shop without them needing
                  to travel. Orders arrive at the customer in under an hour.
                </p>
              </div>

              <div className="demo-why-card">
                <div className="demo-why-icon">
                  <Plug size={28} strokeWidth={2.25} />
                </div>
                <h3>Full Shopify integration</h3>
                <p>
                  Your products, inventory and orders sync automatically. No
                  new system to learn, no manual updates.
                </p>
              </div>

              <div className="demo-why-card">
                <div className="demo-why-icon">
                  <BadgePercent size={28} strokeWidth={2.25} />
                </div>
                <h3>Zero platform fees to start</h3>
                <p>
                  No upfront cost. No platform fees on your first orders. We
                  earn when you earn.
                </p>
              </div>
            </div>
          </section>

          <div className="demo-cta">
            <Link href="/retailers" className="btn-primary btn-large">
              Apply to join STREET <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
