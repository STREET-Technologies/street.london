'use client';

import { useEffect, useRef } from 'react';
import { ShoppingBag, CreditCard, Zap } from 'lucide-react';

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
          <p className="section-intro">Shopping your high street has never been easier</p>
        </div>
        <div className="steps-grid">
          <div className="step" data-aos="fade-up">
            <div className="step-visual">
              <div className="step-icon">
                <ShoppingBag size={48} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="step-title">Browse Local Shops</h3>
            <p className="step-description">
              Explore products from all your favourite high street stores in one beautiful app
            </p>
          </div>
          <div className="step" data-aos="fade-up" data-aos-delay="100">
            <div className="step-visual">
              <div className="step-icon">
                <CreditCard size={48} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="step-title">Pick Your Store & Order</h3>
            <p className="step-description">
              Found something you love? Order directly from the store and checkout in seconds
            </p>
          </div>
          <div className="step" data-aos="fade-up" data-aos-delay="200">
            <div className="step-visual">
              <div className="step-icon">
                <Zap size={48} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="step-title">Receive Instantly</h3>
            <p className="step-description">
              Your order is collected from the store and delivered straight to your door in minutes, not days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
