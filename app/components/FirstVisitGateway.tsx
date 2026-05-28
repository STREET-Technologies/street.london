'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const IMAGES = [
  '/img/gateway/2.jpg',
  '/img/gateway/1.jpg',
  '/img/gateway/3.jpg',
  '/img/gateway/4.jpg',
];

const TAGLINES = [
  'Your high street, instantly.',
  'Independent London shops, one app.',
  'Delivered to your door in minutes.',
];

const CROSSFADE_INTERVAL = 3000;
const TAGLINE_INTERVAL = 4000;

export default function FirstVisitGateway() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeTagline, setActiveTagline] = useState(0);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const imgTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const taglineTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    imgTimer.current = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % IMAGES.length);
    }, CROSSFADE_INTERVAL);

    taglineTimer.current = setInterval(() => {
      setActiveTagline((prev) => (prev + 1) % TAGLINES.length);
    }, TAGLINE_INTERVAL);

    return () => {
      clearInterval(imgTimer.current);
      clearInterval(taglineTimer.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Please enter your email');
      setFormState('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || undefined, email }),
      });

      if (response.ok) {
        setFormState('success');
        localStorage.setItem('street-visited', '1');
      } else {
        setErrorMessage('Something went wrong. Try again.');
        setFormState('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Try again.');
      setFormState('error');
    }
  };

  return (
    <div className="gateway">
      {/* Crossfading background images */}
      <div className="gateway-bg">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`gateway-bg-img${i === activeImg ? ' is-active' : ''}`}
          />
        ))}
        <div className="gateway-overlay" />
      </div>

      {/* Content — always visible */}
      <div className="gateway-content">
        <h1 className="gateway-logo">STREET</h1>

        <div className="gateway-tagline-wrap">
          {TAGLINES.map((line, i) => (
            <p
              key={line}
              className={`gateway-tagline${i === activeTagline ? ' is-active' : ''}`}
            >
              {line}
            </p>
          ))}
        </div>

        {formState === 'success' ? (
          <div className="gateway-success">
            <p className="gateway-success-text">You&apos;re on the list.</p>
            <Link href="/" className="gateway-explore">
              Explore STREET →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="gateway-form">
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="gateway-input"
              disabled={formState === 'loading'}
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="gateway-input"
              disabled={formState === 'loading'}
              autoComplete="email"
              inputMode="email"
              required
            />
            {formState === 'error' && (
              <p className="gateway-error">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="gateway-submit"
              disabled={formState === 'loading'}
            >
              {formState === 'loading' ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>
        )}

        {formState !== 'success' && (
          <Link href="/" className="gateway-explore">
            Explore STREET →
          </Link>
        )}
      </div>
    </div>
  );
}
