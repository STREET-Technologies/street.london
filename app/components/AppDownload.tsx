import Link from 'next/link';

export default function AppDownload() {
  return (
    <section className="app-download" aria-labelledby="app-download-heading">
      <div className="container">
        <h2 id="app-download-heading" className="section-title">Coming soon to your phone</h2>
        <p className="section-intro">Be among the first to download STREET. Join the waitlist below.</p>

        <div className="app-download-badges">
          <Link href="/waitlist" className="app-download-badge app-download-badge--apple" aria-label="Download STREET on the App Store (coming soon)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/badges/app-store-badge.svg" alt="Download on the App Store" width={150} height={50} />
          </Link>
          <Link href="/waitlist" className="app-download-badge app-download-badge--google" aria-label="Get STREET on Google Play (coming soon)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/badges/google-play-badge.png" alt="Get it on Google Play" width={159} height={54} />
          </Link>
        </div>

        <p className="app-download-note">Coming soon</p>
      </div>
    </section>
  );
}
