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
          <p className="section-intro">Everything you love about shopping, made effortless</p>
        </div>
        <div className="benefits-grid">
          {/* Benefit 1 */}
          <div className="benefit-card" data-aos="fade-up">
            <div className="benefit-image">
              <div className="benefit-collage-primary" style={{ backgroundImage: 'url(/img/street/31.jpg)' }}>
                <div className="benefit-overlay">
                  <span className="benefit-badge">Made for You</span>
                </div>
              </div>
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
                Browse products from every store on your high street without leaving home. One app, one basket, one checkout.
              </p>
              <ul className="benefit-list">
                <li>Compare prices across stores</li>
                <li>Single checkout for everything</li>
                <li>Unified loyalty rewards</li>
              </ul>
            </div>
            <div className="benefit-image">
              <div className="benefit-collage-primary" style={{ backgroundImage: 'url(/img/street/22.jpg)' }}>
                <div className="benefit-overlay">
                  <span className="benefit-badge">Your High Street</span>
                </div>
              </div>
              <div className="benefit-collage-secondary" style={{ backgroundImage: 'url(/img/street/16.jpg)' }} />
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
            <div className="benefit-image">
              <div className="benefit-collage-primary" style={{ backgroundImage: 'url(/img/street/30.jpg)' }}>
                <div className="benefit-overlay">
                  <span className="benefit-badge">Lightning Fast</span>
                </div>
              </div>
              <div className="benefit-collage-secondary" style={{ backgroundImage: 'url(/img/street/26.jpg)' }} />
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Instant Delivery</h3>
              <p className="benefit-description">
                Not next day. Not same day. <strong>Right now.</strong> Get your shopping delivered straight to your door in minutes.
              </p>
              <ul className="benefit-list">
                <li>Delivery in under 60 minutes</li>
                <li>Track in real-time</li>
                <li>Straight to your door, every time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
