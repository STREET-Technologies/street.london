'use client';

import { useEffect, useRef, useState } from 'react';
import HomepageSignup from './HomepageSignup';

const TOTAL_IMAGES = 29;
const IMG_BASE = '/img/street/';

// Sequence: [1-based image number, hold duration in ms]
// Rhythm: quick lifestyle flashes build kinetic energy → text-overlay images HOLD so copy lands
const SEQUENCE: [number, number][] = [
  // Phase 1: Quick intro — viewer registers each image, pace feels urgent not chaotic
  [6,  350],  // hoodies rack
  [2,  300],  // green cap girl
  [4,  400],  // tram interior
  [10, 300],  // green bag
  [8,  400],  // neon corridor
  [6,  300],  // hoodies
  [4,  350],  // tram
  [2,  300],  // cap girl

  // Phase 2: First message hits — flash then HOLD so copy reads clearly
  [8,  400],  // atmospheric transition
  [20, 2000], // "FAILED DELIVERY?" — green cap side — READ IT
  [6,  320],  // quick reset
  [4,  300],  // quick
  [15, 2200], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — plant face — READ IT
  [2,  320],  // quick
  [10, 350],  // quick

  // Phase 3: Narrative builds — longer holds, copy escalates
  [9,  2500], // "WE TRIED, BUT YOU WEREN'T HOME" — elevator — READ IT
  [8,  700],  // breathe
  [7,  2500], // "WHERE WERE YOU WHEN THE PARCEL CAME?" — blazer — READ IT
  [6,  700],  // breathe

  // Phase 4: Final beats — slowest pace, maximum impact before form
  [13, 2500], // "WHERE WERE YOU?" — green slip dress
  [11, 2800], // "SORRY WE MISSED YOU" — concert sparkle
  [5,  2800], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — neon portrait
  [1,  3200], // "WHERE WERE YOU WHEN THE PARCEL CAME?" — final hold, then form
];

type Phase = 'black' | 'flash' | 'fadeout' | 'form';

export default function JoinFlashSequence() {
  const [phase, setPhase] = useState<Phase>('black');
  const [currentImg, setCurrentImg] = useState(1);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, delay: number) {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timers.push(id);
    }

    // Preload all images so the sequence never stalls on a late network request
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      const img = new window.Image();
      img.src = `${IMG_BASE}${i}.jpg`;
    }

    // Reduced-motion users go straight to form
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('form');
      return () => { cancelled = true; timers.forEach(clearTimeout); };
    }

    // Show skip after 2s — doesn't interrupt the opening impact
    schedule(() => setShowSkip(true), 2000);

    // 600ms black hold — creates tension before first image hits
    schedule(() => {
      setPhase('flash');

      let offset = 0;
      SEQUENCE.forEach(([imgNum, duration], i) => {
        schedule(() => setCurrentImg(imgNum), offset);
        offset += duration;

        // After last image's hold, fade to form
        if (i === SEQUENCE.length - 1) {
          schedule(() => {
            setPhase('fadeout');
            schedule(() => setPhase('form'), 600);
          }, offset);
        }
      });
    }, 600);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  function skipToForm() {
    setPhase('form');
    setShowSkip(false);
  }

  return (
    <div className={`join-root join-phase-${phase}`}>

      {/* Full-screen image — <img> lets mask-image percentages target the image itself, not the viewport */}
      {(phase === 'flash' || phase === 'fadeout') && (
        <img
          src={`${IMG_BASE}${currentImg}.jpg`}
          alt=""
          className="join-image"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          }}
        />
      )}

      {/* Form reveal */}
      {phase === 'form' && (
        <div className="join-form-overlay">
          <div className="join-form-inner">
            <p className="join-eyebrow">LONDON</p>
            <h1 className="join-headline">GET EARLY ACCESS</h1>
            <HomepageSignup />
          </div>
        </div>
      )}

      {/* Skip — appears after 2s, only during flash phase */}
      {showSkip && phase === 'flash' && (
        <button className="join-skip" onClick={skipToForm}>
          skip
        </button>
      )}

    </div>
  );
}
