'use client';

import { useEffect, useRef, useState } from 'react';
import HomepageSignup from './HomepageSignup';

const TOTAL_IMAGES = 29;
const IMG_BASE = '/img/street/';

// Three speed tiers:
//   FAST   150–250ms — abstract/atmospheric, subliminal energy
//   NORMAL 400–600ms — lifestyle shots, viewer registers them
//   SLOW   2000–3000ms — text overlay images, copy must be read
//
// Sequence loops continuously. Form is always visible on top.
const SEQUENCE: [number, number][] = [
  // Fast burst — pure energy
  [19, 180], // metro tunnel
  [16, 160], // green coat detail
  [21, 200], // green staircase
  [14, 180], // neon exit door
  [26, 160], // Nike AF1 shoes
  [27, 200], // green doorway abstract

  // Normal + first text hit
  [22, 500], // two girls street style
  [8,  500], // neon corridor
  [20, 2500], // "FAILED DELIVERY?"

  // Fast burst
  [24, 180], // hanging lights
  [28, 200], // man neon green
  [4,  180], // tram interior

  // Normal + text
  [10, 500], // green bag
  [18, 2500], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — portal doorway
  [6,  500], // hoodies rack
  [23, 2500], // "OOPS, WE TRIED BUT YOU WEREN'T IN"

  // Fast burst
  [27, 160], // green doorway
  [21, 180], // staircase
  [19, 160], // metro

  // Normal + text escalation
  [2,  500], // green cap girl
  [7,  2800], // "WHERE WERE YOU WHEN THE PARCEL CAME?"
  [16, 200], // quick flash
  [11, 2800], // "SORRY WE MISSED YOU" — concert sparkle

  // Emotional peak — slowest holds
  [5,  2800], // "DELIVERY ATTEMPT UNSUCCESSFUL?" — neon portrait
  [9,  3000], // "WE TRIED, BUT YOU WEREN'T HOME" — elevator
  [1,  3000], // "WHERE WERE YOU WHEN THE PARCEL CAME?"
  [29, 3500], // "BE THE FIRST ON OUR STREET" — then loops back
];

export default function JoinFlashSequence() {
  const [currentImg, setCurrentImg] = useState(SEQUENCE[0][0]);
  const cancelledRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    cancelledRef.current = false;

    // Preload all images before sequence starts
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      const img = new window.Image();
      img.src = `${IMG_BASE}${i}.jpg`;
    }

    // Reduced motion: static background
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentImg(29);
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

      {/* Dark scrim so form text is always legible over any image */}
      <div className="join-scrim" />

      {/* Form — always visible, centered over the images */}
      <div className="join-form-overlay">
        <div className="join-form-inner">
          <HomepageSignup />
        </div>
      </div>

    </div>
  );
}
