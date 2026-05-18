'use client';

import { useEffect, useRef } from 'react';

export default function HowItWorks() {
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
    <section className="how-it-works" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How STREET Works</h2>
          <p className="section-intro">From browse to doorstep in under an hour</p>
        </div>
        <ol className="steps-grid">
          <li className="step" data-aos="fade-up">
            <span className="step-number" aria-hidden="true">01</span>
            <h3 className="step-title">Browse Local Shops</h3>
            <p className="step-description">
              Explore products from all your favourite high street stores in one beautiful app.
            </p>
          </li>
          <li className="step" data-aos="fade-up" data-aos-delay="100">
            <span className="step-number" aria-hidden="true">02</span>
            <h3 className="step-title">Pick Your Store &amp; Order</h3>
            <p className="step-description">
              Found something you love? Order directly from the store and checkout in seconds.
            </p>
          </li>
          <li className="step" data-aos="fade-up" data-aos-delay="200">
            <span className="step-number" aria-hidden="true">03</span>
            <h3 className="step-title">Receive Instantly</h3>
            <p className="step-description">
              Your order is collected from the store and delivered to your door in minutes, not days.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
