import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <video
          className="hero-video hero-video-desktop"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-poster.jpg"
          preload="metadata"
        >
          <source src="/img/hero.webm" type="video/webm" />
          <source src="/img/hero.mp4" type="video/mp4" />
        </video>
        <video
          className="hero-video hero-video-mobile"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-poster.jpg"
          preload="metadata"
        >
          <source src="/img/hero-portrait.webm" type="video/webm" />
          <source src="/img/hero-portrait.mp4" type="video/mp4" />
        </video>
        {/* prefers-reduced-motion fallback */}
        <img
          src="/img/hero-poster.jpg"
          alt="STREET shopping experience"
          className="hero-image hero-fallback"
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
