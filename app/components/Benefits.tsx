'use client';

import { useEffect, useRef } from 'react';

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-aos]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="benefits" id="features" ref={sectionRef}>
      <div className="container">
        <div className="benefits-intro">
          <h2 className="section-title">Why Shop with STREET?</h2>
          <p className="section-intro">Local shops, one app, sixty-minute delivery</p>
        </div>
        <div className="benefits-grid">
          {/* Benefit 1 */}
          <div className="benefit-card" data-aos="fade-up">
            <div className="benefit-image">
              <div className="benefit-collage-primary" style={{ backgroundImage: 'url(/img/street/31.jpg)' }} />
              <div className="benefit-collage-secondary" style={{ backgroundImage: 'url(/img/street/10.jpg)' }} />
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Discover Your High Street</h3>
              <p className="benefit-description">
                Find independent boutiques, local favourites, and emerging brands you won&apos;t find anywhere else. Your street, curated for you.
              </p>
              <ul className="benefit-list">
                <li>Independent and local stores</li>
                <li>Personalised recommendations</li>
                <li>Support your neighbourhood</li>
              </ul>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="benefit-card benefit-card-reverse" data-aos="fade-up" data-aos-delay="100">
            <div className="benefit-content">
              <h3 className="benefit-title">All Shops in One Place</h3>
              <p className="benefit-description">
                Every shop on your high street, in one app. Browse and buy without leaving home.
              </p>
              <ul className="benefit-list">
                <li>Every local store in one place</li>
                <li>Fast checkout direct with your store</li>
                <li>Unified loyalty rewards</li>
              </ul>
            </div>
            <div className="benefit-image">
              <div className="benefit-collage-primary" style={{ backgroundImage: 'url(/img/street/28.jpg)' }} />
              <div className="benefit-collage-secondary" style={{ backgroundImage: 'url(/img/street/16.jpg)' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Benefit 3 — full-width media band (breaks the zigzag, climaxes the section) */}
      <div
        className="benefit-band"
        data-aos="fade-up"
        style={{ backgroundImage: 'url(/img/street/instant-delivery.jpg)' }}
      >
        <div className="benefit-band-scrim" aria-hidden="true" />
        <div className="container benefit-band-inner">
          <h3 className="benefit-band-title">Right now.</h3>
          <p className="benefit-band-statement">Not next day. Not same day.</p>
          <p className="benefit-band-description">
            Collected from the shop and delivered to your door while you carry on with your day.
          </p>
          <ul className="benefit-band-points">
            <li>In under an hour</li>
            <li>Track it in real time</li>
            <li>Door to door, every time</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
