'use client';

import { useEffect, useRef } from 'react';

const GRAIN_ALPHA = 20;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated film grain overlay — flashing pixels at ~15fps
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 4;
    let rafId: number;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 15; // ~15fps

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / scale);
      canvas.height = Math.ceil(window.innerHeight / scale);
    };

    resize();

    const render = (timestamp: number) => {
      rafId = requestAnimationFrame(render);
      if (timestamp - lastFrame < FRAME_INTERVAL) return;
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

    rafId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="mystery-static" />
  );
}
