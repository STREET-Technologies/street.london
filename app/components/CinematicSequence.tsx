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

    // Mark as visited after sequence completes (~8.5s)
    const timer = setTimeout(() => {
      localStorage.setItem('street-visited', '1');
    }, 8500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mystery-content sequence-${state}`}>
      <div className="sequence-beat-1">
        <h1 className="mystery-logo">STREET</h1>
      </div>
      <div className="sequence-beat-2">
        <p className="mystery-tagline">Something is coming to London.</p>
      </div>
      <div className="sequence-beat-3">
        <HomepageSignup />
      </div>
    </div>
  );
}
