import Link from 'next/link';
import Image from 'next/image';

export default function Join() {
  return (
    <section className="join-closer" id="join">
      <div className="join-closer-grid">
        <div className="join-closer-left">
          <h2 className="join-closer-title">Your High Street Awaits</h2>
          <p className="join-closer-subtitle">
            Be the first to shop London&apos;s independent stores, delivered to your door in minutes.
          </p>
          <Link href="/waitlist" className="join-closer-cta">Join the Waitlist</Link>
          <div className="join-closer-badges">
            <Link href="/waitlist" aria-label="Download STREET on the App Store (coming soon)">
              <Image src="/img/badges/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} />
            </Link>
            <Link href="/waitlist" aria-label="Get STREET on Google Play (coming soon)">
              <Image src="/img/badges/google-play-badge.png" alt="Get it on Google Play" width={127} height={43} />
            </Link>
          </div>
        </div>

        <div className="join-closer-right">
          <Link href="/retailers" className="join-closer-card">
            <h3 className="join-closer-card-title">For Retailers</h3>
            <p className="join-closer-card-text">
              Bring your shop to thousands of new customers. We handle delivery, you handle the product.
            </p>
            <span className="join-closer-card-cta">Learn more →</span>
          </Link>
          <Link href="/doers" className="join-closer-card">
            <h3 className="join-closer-card-title">For Ambassadors</h3>
            <p className="join-closer-card-text">
              Spread the word in your neighbourhood and earn exclusive rewards as STREET grows.
            </p>
            <span className="join-closer-card-cta">Learn more →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
