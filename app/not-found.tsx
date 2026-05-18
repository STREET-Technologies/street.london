import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: "This street doesn't exist.",
  description: "Page not found. Get back to STREET, instant delivery from London's local shops.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="not-found">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-code" aria-hidden="true">404</div>
            <h1 className="not-found-title">This street doesn&apos;t exist.</h1>
            <p className="not-found-subtitle">
              Looks like you took a wrong turn. The page you&apos;re after either moved or never made it to STREET.
            </p>
            <div className="not-found-cta">
              <Link href="/" className="btn-primary">
                ← Back to home
              </Link>
              <Link href="/waitlist" className="btn-secondary">
                Join the waitlist
              </Link>
            </div>

            <div className="not-found-suggested">
              <p className="not-found-suggested-label">Try one of these instead:</p>
              <ul className="not-found-suggested-list">
                <li><Link href="/retailers">For retailers</Link></li>
                {/* For couriers hidden 2026-05-16 — couriers not yet onboarded. */}
                <li><Link href="/doers">For ambassadors</Link></li>
                <li><Link href="/contact-us">Contact us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
