import Image from 'next/image';
import Link from 'next/link';
import HeroVideoStack, { type HeroClip } from './HeroVideoStack';

// Edit this array to change the desktop hero playlist.
// Clips play in order, then loop back to the first. Mobile (.hero-video-mobile)
// stays on the single portrait loop until portrait variants exist for new clips.
const DESKTOP_CLIPS: HeroClip[] = [
  { webm: '/img/hero.webm', mp4: '/img/hero.mp4' },
  { webm: '/img/hero-2.webm', mp4: '/img/hero-2.mp4' },
  { webm: '/img/hero-3.webm', mp4: '/img/hero-3.mp4' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-video-stack hero-video-desktop">
          <HeroVideoStack clips={DESKTOP_CLIPS} poster="/img/hero-poster.jpg" />
        </div>
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
        <Image
          src="/img/hero-poster.jpg"
          alt="Person walking through a London street carrying a lime-green STREET shopping bag"
          className="hero-image hero-fallback"
          width={1920}
          height={1280}
          priority
          sizes="100vw"
        />
      </div>
      <div className="container hero-content">
        <h1 className="hero-title">
          Your high street, <span className="highlight">instantly</span>
        </h1>
        <h2 className="hero-tagline">
          Instant delivery from London&apos;s local shops in under an hour
        </h2>
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
