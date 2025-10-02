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
            <div className="benefit-image benefit-img-1" style={{ backgroundImage: 'url(/img/4.png)' }}>
              <div className="benefit-overlay">
                <span className="benefit-badge">All Your Favourites</span>
              </div>
            </div>
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
          </div>

          {/* Benefit 2 */}
          <div className="benefit-card benefit-card-reverse" data-aos="fade-up" data-aos-delay="100">
            <div className="benefit-content">
              <h3 className="benefit-title">Instant Delivery</h3>
              <p className="benefit-description">
                Not next day. Not same day. <strong>Right now.</strong> Get your shopping delivered in minutes or pick up instantly from your local store.
              </p>
              <ul className="benefit-list">
                <li>Delivery in under 60 minutes</li>
                <li>Track in real-time</li>
                <li>Flexible pickup options</li>
              </ul>
            </div>
            <div className="benefit-image benefit-img-2" style={{ backgroundImage: 'url(/img/5.png)' }}>
              <div className="benefit-overlay">
                <span className="benefit-badge">Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
            <div className="benefit-image benefit-img-3" style={{ backgroundImage: 'url(/img/6.png)' }}>
              <div className="benefit-overlay">
                <span className="benefit-badge">Hassle-Free</span>
              </div>
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Easy Returns</h3>
              <p className="benefit-description">
                Changed your mind? No problem. We&apos;ll collect it, process your refund instantly, and you don&apos;t even need to find a box.
              </p>
              <ul className="benefit-list">
                <li>No packaging needed</li>
                <li>Instant refund processing</li>
                <li>Free collection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
