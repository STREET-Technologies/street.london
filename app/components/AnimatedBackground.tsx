'use client';

import { useEffect, useRef } from 'react';

const GRAIN_FPS = 15;
const GRAIN_ALPHA = 20;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Film grain overlay — renders at reduced resolution, throttled to ~15fps
  useEffect(() => {
    // Respect OS-level reduced motion preference — skip canvas animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const scale = window.innerWidth <= 768 ? 6 : 4;
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

  return (
    <canvas ref={canvasRef} className="mystery-static" />
  );
}
