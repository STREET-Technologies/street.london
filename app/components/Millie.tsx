import Link from 'next/link';

export default function Millie() {
  return (
    <section className="millie-section">
      <div className="container">
        <div className="millie-content">
          <div className="millie-text">
            <h2 className="section-title millie-title">Meet Millie</h2>
            <p className="section-subtitle">
              Your AI stylist is on the way. Join the waitlist to be among the first to try her.
            </p>
            <Link href="/#join" className="millie-cta">Join the waitlist to meet Millie first →</Link>
          </div>
          <div className="millie-visual">
            <div className="millie-brand-image" style={{ backgroundImage: 'url(/img/street/27.jpg)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
