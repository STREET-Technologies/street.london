'use client';

import { useEffect, useRef, useState } from 'react';
import HomepageSignup from './HomepageSignup';

const TOTAL_IMAGES = 29;
const IMG_BASE = '/img/street/';

// Sequence: [1-based image number, hold duration in ms]
// Every image used once. Lifestyle shots flash quick; text overlays hold so copy lands.
// Image 29 ("BE THE FIRST ON OUR STREET") closes the sequence — leads directly into the form.
const SEQUENCE: [number, number][] = [
  // Phase 1: Rapid intro — fresh lifestyle & atmospheric images
  [19, 300], // metro tunnel
  [16, 300], // green coat belt detail
  [21, 300], // green staircase gold rail
  [14, 350], // neon exit door
  [26, 300], // Nike AF1 shoes
  [27, 300], // green doorway abstract
  [24, 350], // hanging neon lights interior
  [22, 350], // two girls street style

  // Phase 2: First text overlays hit
  [8,  400], // neon corridor — atmospheric bridge
  [20, 2000], // "FAILED DELIVERY?" — green cap side
  [28, 350], // man neon green portrait
  [18, 2200], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — green portal doorway
  [4,  350], // tram interior
  [23, 2200], // "OOPS, WE TRIED BUT YOU WEREN'T IN" — green door

  // Phase 3: Tension builds
  [10, 400], // green bag detail
  [7,  2500], // "WHERE WERE YOU WHEN THE PARCEL CAME?" — blazer woman
  [6,  400], // hoodies rack
  [17, 2500], // "WE TRIED, BUT YOU WEREN'T HOME" — outdoors green
  [2,  400], // green cap girl

  // Phase 4: Emotional peak — longest holds
  [5,  2800], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — neon green portrait
  [9,  2800], // "WE TRIED, BUT YOU WEREN'T HOME" — elevator
  [1,  3000], // "WHERE WERE YOU WHEN THE PARCEL CAME?" — woman, green towel
  [29, 3500], // "BE THE FIRST ON OUR STREET" — leads straight into form
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
