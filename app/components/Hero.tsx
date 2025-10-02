import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-image-grid">
          <div className="hero-image hero-img-1">
            <Image src="/img/1.png" alt="Shopping lifestyle" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="hero-image hero-img-2">
            <Image src="/img/2.png" alt="Local retail" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="hero-image hero-img-3">
            <Image src="/img/3.png" alt="High street shopping" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">Shop Local. Shop Now.</p>
            <h1 className="hero-title">
              <span className="hero-title-main">your high street,</span>
              <span className="hero-title-accent">instantly</span>
            </h1>
            <p className="hero-subtitle">
              Discover your favourite local shops, all in one place. Browse, buy, and get it delivered in minutes.
            </p>
            <div className="hero-cta">
              <button className="btn-primary">Start Shopping</button>
              <Link href="#features" className="btn-text">
                See How It Works →
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-badge">
                <span className="trust-number">500+</span>
                <span className="trust-label">Local Retailers</span>
              </div>
              <div className="trust-badge">
                <span className="trust-number">10,000+</span>
                <span className="trust-label">Products Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
