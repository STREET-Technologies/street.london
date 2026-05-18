import Link from 'next/link';

export default function Join() {
  return (
    <section className="join-section" id="join">
      <div className="container">
        <div className="join-hero">
          <h2 className="section-title">Ready to Start Shopping?</h2>
          <p className="section-subtitle">
            Be the first to experience your high street, instantly
          </p>
          <Link href="/waitlist" className="btn-primary btn-large">Join the Waitlist</Link>
          <p className="join-note">Get exclusive early access &amp; rewards</p>
        </div>

        <div className="join-options">
          <h3 className="join-options-title">Join the STREET Community</h3>
          <div className="join-grid">
            <Link href="/retailers" className="join-option">
              <h4>For Retailers</h4>
              <p>Bring your shop online and reach more London customers.</p>
              <span className="join-option-cta">Learn more →</span>
            </Link>
            {/* "For Drivers" option hidden 2026-05-16 — couriers not yet onboarded. */}
            <Link href="/doers" className="join-option">
              <h4>For Ambassadors</h4>
              <p>Spread the word and earn exclusive rewards.</p>
              <span className="join-option-cta">Learn more →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
