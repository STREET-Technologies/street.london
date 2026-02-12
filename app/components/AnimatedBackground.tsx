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

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [staticIntensity, setStaticIntensity] = useState(0.08);

  // TV Static Effect
  useEffect(() => {
    // Respect OS-level reduced motion preference — skip canvas animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    const renderStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() > 0.5 ? 255 : 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = Math.random() * 40 * staticIntensity * 10;
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(renderStatic);
    };

    renderStatic();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [staticIntensity]);

  // Static intensity breathing
  useEffect(() => {
    // Respect OS-level reduced motion preference — skip breathing animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const breathe = () => {
      const time = Date.now() / 1000;
      const base = 0.08;
      const variation = 0.04;
      setStaticIntensity(base + Math.sin(time * 0.5) * variation);
    };

    const interval = setInterval(breathe, 50);
    return () => clearInterval(interval);
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
            // Intensify static during image
            setStaticIntensity(0.15);
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
            setStaticIntensity(0.08);
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

      {/* TV Static overlay */}
      <canvas ref={canvasRef} className="mystery-static" />
    </>
  );
}
