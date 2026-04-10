import Link from 'next/link';
import { Star, Scan, ShoppingBag } from 'lucide-react';

export default function Millie() {
  return (
    <section className="millie-section">
      <div className="container">
        <div className="millie-content">
          <div className="millie-text">
            <p className="millie-eyebrow">Your Personal Stylist</p>
            <span className="millie-coming-soon">Coming Soon</span>
            <h2 className="section-title millie-title">Meet Millie</h2>
            <p className="section-subtitle">
              She&apos;s almost here. Millie will know your style, find your fits, and make shopping on your high street effortless.
            </p>
            <div className="millie-features">
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Star size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Knows Your Style</h4>
                  <p>Millie will learn what you love and find pieces that match your unique taste across every store on your street</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Scan size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Try Before You Buy</h4>
                  <p>See how clothes will look on you before you buy, powered by virtual try-on technology</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <ShoppingBag size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Buy Through the Conversation</h4>
                  <p>Find what you love and buy it directly through Millie — no switching apps, no separate checkout</p>
                </div>
              </div>
            </div>
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
