import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <Image
          src="/img/hero-bg.png"
          alt="STREET shopping experience"
          className="hero-image"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="container hero-content">
        <h1 className="hero-title">
          Your high street, <span className="highlight">instantly</span>
        </h1>
        <p className="hero-subtitle">
          Discover your favourite local shops, all in one place. Browse, buy, and get it delivered in minutes.
        </p>
        <div className="hero-cta">
          <Link href="/waitlist" className="btn-primary btn-large">
            Join the Waitlist
          </Link>
          <Link href="#how-it-works" className="btn-secondary btn-large">
            See How it Works
          </Link>
        </div>
      </div>
    </section>
  );
}
