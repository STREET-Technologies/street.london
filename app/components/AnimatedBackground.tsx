'use client';

import { useState, useEffect, useRef } from 'react';

const FLASH_IMAGES = [
  '/img/millie-1.png',
  '/img/millie-2.png',
  '/img/millie-3.png',
  '/img/delivery.png',
  '/img/gen-z.png',
  '/img/bliss.png',
];

const GRAIN_FPS = 15;
const GRAIN_ALPHA = 12;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);

  // Film grain overlay — renders at reduced resolution, throttled to ~15fps
  useEffect(() => {
    // Respect OS-level reduced motion preference — skip canvas animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const scale = window.innerWidth <= 768 ? 8 : 4;
      canvas.width = Math.ceil(window.innerWidth / scale);
      canvas.height = Math.ceil(window.innerHeight / scale);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let lastFrame = 0;
    const frameInterval = 1000 / GRAIN_FPS;

    const renderGrain = (timestamp: number) => {
      animationId = requestAnimationFrame(renderGrain);
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = GRAIN_ALPHA;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    requestAnimationFrame(renderGrain);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Image flash sequence
  useEffect(() => {
    // Respect OS-level reduced motion preference — skip image flash sequence
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let imageIndex = 0;
    let phase: 'wait' | 'fadeIn' | 'hold' | 'fadeOut' = 'wait';
    let phaseStart = Date.now();

    const durations = {
      wait: 200,
      fadeIn: 75,
      hold: 100,
      fadeOut: 75,
    };

    const tick = () => {
      const elapsed = Date.now() - phaseStart;

      switch (phase) {
        case 'wait':
          if (elapsed >= durations.wait) {
            phase = 'fadeIn';
            phaseStart = Date.now();
            setCurrentImage(FLASH_IMAGES[imageIndex]);
          }
          break;
        case 'fadeIn':
          setImageOpacity(Math.min(elapsed / durations.fadeIn, 1) * 0.7);
          if (elapsed >= durations.fadeIn) {
            phase = 'hold';
            phaseStart = Date.now();
          }
          break;
        case 'hold':
          if (elapsed >= durations.hold) {
            phase = 'fadeOut';
            phaseStart = Date.now();
          }
          break;
        case 'fadeOut':
          setImageOpacity((1 - elapsed / durations.fadeOut) * 0.7);
          if (elapsed >= durations.fadeOut) {
            phase = 'wait';
            phaseStart = Date.now();
            setCurrentImage(null);
            setImageOpacity(0);
            imageIndex = (imageIndex + 1) % FLASH_IMAGES.length;
          }
          break;
      }
    };

    const interval = setInterval(tick, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background flash images */}
      {currentImage && (
        <div
          className="mystery-flash-image"
          style={{
            backgroundImage: `url(${currentImage})`,
            opacity: imageOpacity,
          }}
        />
      )}

      {/* Film grain overlay */}
      <canvas ref={canvasRef} className="mystery-static" />
    </>
  );
}
