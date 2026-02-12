'use client';

import { useEffect, useState } from 'react';
import HomepageSignup from './HomepageSignup';

type SequenceState = 'pending' | 'play' | 'skip';

export default function CinematicSequence() {
  const [state, setState] = useState<SequenceState>('pending');

  useEffect(() => {
    // Reduced-motion users skip the sequence entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('skip');
      return;
    }

    // Returning visitors skip the sequence
    if (localStorage.getItem('street-visited')) {
      setState('skip');
      return;
    }

    // First-time visitor: play the cinematic sequence
    setState('play');

    // Mark as visited after sequence completes (~11s)
    const timer = setTimeout(() => {
      localStorage.setItem('street-visited', '1');
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mystery-content sequence-${state}`}>
      {/* Pain-point beats — each occupies same center position, fades in/out */}
      <div className="sequence-hook">
        <p className="sequence-line sequence-line-1">3-day delivery.</p>
        <p className="sequence-line sequence-line-2">Next-day delivery.</p>
        <p className="sequence-line sequence-line-3">Same-day delivery.</p>
        <p className="sequence-line sequence-line-4">Not fast enough.</p>
      </div>

      {/* Brand reveal — stays visible after appearing */}
      <div className="sequence-reveal sequence-reveal-logo">
        <h1 className="mystery-logo">STREET</h1>
      </div>
      <div className="sequence-reveal sequence-reveal-tagline">
        <p className="mystery-tagline">Coming to London.</p>
      </div>
      <div className="sequence-reveal sequence-reveal-form">
        <HomepageSignup />
      </div>
    </div>
  );
}
