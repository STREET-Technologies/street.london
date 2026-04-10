'use client';

import { useEffect, useRef, useState } from 'react';
import HomepageSignup from './HomepageSignup';

const TOTAL_IMAGES = 32;
const IMG_BASE = '/img/street/';

// Three speed tiers:
//   FAST   150–250ms — abstract/atmospheric, subliminal energy
//   NORMAL 300–500ms — lifestyle shots, viewer registers them
//   SLOW   2500–3500ms — text overlay images, copy must be read
//
// Three-act narrative structure:
//   ACT 1 — "You're out there"  (fast energy, no text, pure lifestyle)
//   ACT 2 — "The old world can't find you"  (delivery frustration beats)
//   ACT 3 — "STREET is the answer"  (pivot to solution + resolution)
//
// Form phases in at this sequence index (start of Act 3).
const ACT3_INDEX = 16;

// Sequence loops continuously. Form phases in at Act 3.
const SEQUENCE: [number, number][] = [

  // ── ACT 1: You're out there ─────────────────────────────────────
  // Fast burst — pure energy, no text
  [19, 180], // metro tunnel
  [16, 160], // coat detail
  [21, 200], // green staircase
  [14, 180], // neon exit door
  [26, 160], // Nike AF1
  [27, 200], // green doorway

  // Settle into the world — 5 lifestyle shots
  [22, 500], // two girls street style
  [30, 500], // man at King's Cross
  [8,  500], // neon corridor
  [31, 400], // woman in black cab
  [10, 500], // green bag

  // ── ACT 2: The old world can't find you ─────────────────────────
  [20, 2000], // "FAILED DELIVERY?"
  [19, 160],  // flash
  [9,  2500], // "WE TRIED, BUT YOU WEREN'T HOME"
  [1,  2500], // "WHERE WERE YOU WHEN THE PARCEL CAME?"

  // ── ACT 3: STREET is the answer ─────────────────────────────────
  [27, 160],  // doorway flash — tonal break
  [7,  2500], // "YOUR HIGH STREET, YOUR RULES"
  [13, 2500], // "THE STREET NEVER CLOSES"
  [12, 2000], // "NOT ANYMORE."
  [18, 2500], // "YOUR HIGH STREET. IN YOUR POCKET."

  // ── RESOLUTION ──────────────────────────────────────────────────
  [29, 3000], // "BE THE FIRST ON OUR STREET" — then loops back
];

export default function JoinFlashSequence() {
  const [currentImg, setCurrentImg] = useState(SEQUENCE[0][0]);
  const [showForm, setShowForm] = useState(false);
  const cancelledRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const formShownRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    formShownRef.current = false;

    // Preload all images before sequence starts
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      const img = new window.Image();
      img.src = `${IMG_BASE}${i}.jpg`;
    }

    // Reduced motion: show form immediately with static background
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentImg(29);
      setShowForm(true);
      return;
    }

    function runSequence() {
      if (cancelledRef.current) return;
      timersRef.current = [];
      let offset = 0;

      SEQUENCE.forEach(([imgNum, duration], i) => {
        const id = setTimeout(() => {
          if (cancelledRef.current) return;
          setCurrentImg(imgNum);
          // Reveal form once at Act 3 — never hides again
          if (i === ACT3_INDEX && !formShownRef.current) {
            formShownRef.current = true;
            setShowForm(true);
          }
          // After last image's hold, loop
          if (i === SEQUENCE.length - 1) {
            setTimeout(runSequence, duration);
          }
        }, offset);
        timersRef.current.push(id);
        offset += duration;
      });
    }

    // 600ms black hold before first image — creates opening tension
    const startId = setTimeout(runSequence, 600);
    timersRef.current.push(startId);

    return () => {
      cancelledRef.current = true;
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="join-root">

      {/* Looping background image */}
      <img
        src={`${IMG_BASE}${currentImg}.jpg`}
        alt=""
        className="join-image"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      />

      {/* Scrim — fades in with the form at Act 3 */}
      <div className={`join-scrim${showForm ? ' is-visible' : ''}`} />

      {/* Form — phases in at Act 3 alongside first solution image */}
      <div className={`join-form-overlay${showForm ? ' is-visible' : ''}`}>
        <div className="join-form-inner">
          <HomepageSignup />
          <a href="/" className="join-site-link">Explore STREET</a>
        </div>
      </div>

    </div>
  );
}
