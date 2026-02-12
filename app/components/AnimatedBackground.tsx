'use client';

import { useEffect, useRef } from 'react';

const GRAIN_ALPHA = 20;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Static film grain overlay — renders once for grungy texture without motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const scale = 4;
      canvas.width = Math.ceil(window.innerWidth / scale);
      canvas.height = Math.ceil(window.innerHeight / scale);

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

    render();
    window.addEventListener('resize', render);

    return () => {
      window.removeEventListener('resize', render);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="mystery-static" />
  );
}
