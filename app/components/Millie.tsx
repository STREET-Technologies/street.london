import { Star, Scan, Mic } from 'lucide-react';

export default function Millie() {
  return (
    <section className="millie-section">
      <div className="container">
        <div className="millie-content">
          <div className="millie-text">
            <p className="millie-eyebrow">Your Personal Stylist</p>
            <h2 className="section-title millie-title">Meet Millie</h2>
            <p className="section-subtitle">
              Your AI shopping assistant who knows your style better than you do
            </p>
            <div className="millie-features">
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Star size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Knows Your Style</h4>
                  <p>Millie learns what you love and finds pieces that match your unique taste</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Scan size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Try Before You Buy</h4>
                  <p>See how clothes look on you with virtual try-on technology</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Mic size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Shop by Voice</h4>
                  <p>Just tell Millie what you need - &quot;black dress for a wedding&quot; - and she&apos;ll find it</p>
                </div>
              </div>
            </div>
          </div>
          <div className="millie-visual">
            <div className="millie-images-grid">
              <div className="millie-image">
                <img src="/img/millie-1.png" alt="Millie AI interface 1" />
              </div>
              <div className="millie-image">
                <img src="/img/millie-2.png" alt="Millie AI interface 2" />
              </div>
              <div className="millie-image">
                <img src="/img/millie-3.png" alt="Millie AI interface 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
