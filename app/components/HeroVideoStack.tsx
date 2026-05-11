'use client';

import { useEffect, useRef, useState } from 'react';

export interface HeroClip {
  webm: string;
  mp4: string;
}

interface Props {
  clips: HeroClip[];
  poster: string;
}

export default function HeroVideoStack({ clips, poster }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const advance = () => {
    setActiveIndex((current) => {
      const next = (current + 1) % clips.length;
      const nextEl = videoRefs.current[next];
      if (nextEl) {
        nextEl.currentTime = 0;
        nextEl.play().catch(() => {});
      }
      return next;
    });
  };

  useEffect(() => {
    videoRefs.current[0]?.play().catch(() => {});
  }, []);

  return (
    <>
      {clips.map((clip, i) => (
        <video
          key={clip.mp4}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`hero-video-fade ${i === activeIndex ? 'is-active' : ''}`}
          muted
          playsInline
          poster={poster}
          preload="auto"
          onEnded={advance}
        >
          <source src={clip.webm} type="video/webm" />
          <source src={clip.mp4} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
