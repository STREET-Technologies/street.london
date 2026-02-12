# Stack Research

**Domain:** Cinematic mystery teaser / pre-launch hype landing page
**Researched:** 2026-02-12
**Confidence:** MEDIUM-HIGH (library versions and APIs verified; bundle sizes approximate where Bundlephobia scraping failed)

## Current Project Context

| Dependency | Version | Notes |
|------------|---------|-------|
| Next.js | ^16.1.6 | App Router, Turbopack default, React Compiler stable |
| React | ^19.2.0 | View Transitions, useEffectEvent, Activity API |
| React DOM | ^19.2.0 | |
| TypeScript | ^5.9.3 | |
| Swiper | ^12.0.2 | Already installed -- carousel component |
| Lucide React | ^0.544.0 | Already installed -- icon library |

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Bundle Impact |
|------------|---------|---------|-----------------|---------------|
| CSS Keyframe Animations | native | Timed reveals, fade-ins, opacity sequences, text reveals | Zero bundle cost. Hardware-accelerated via `transform` and `opacity`. Sufficient for linear cinematic sequences with `animation-delay` chaining. | 0 KB |
| CSS `animation-timeline` (scroll-driven) | native | Scroll-linked animations if needed | Native CSS, no JS. Shipped in Chrome 115+, Firefox 110+, Safari 26+. Progressive enhancement -- degrades to static. | 0 KB |
| React 19.2 View Transitions | native | Page/route transitions, element morphing between states | Built into React 19.2 and Next.js 16. Wrap elements in `<ViewTransition>`. Handles orchestration natively. Enable via `next.config.js: { viewTransition: true }`. | 0 KB |
| Canvas 2D API | native | Film grain / noise overlay | Lightweight, no library needed. Generate noise texture once at a small canvas size (100-200px), tile it. Animate with configurable interval (not every frame). | 0 KB |
| Web Audio API | native | Ambient sound loop with fade-in/out, volume control | No library needed for simple ambient loop + gain control. Use `AudioContext`, `AudioBufferSourceNode.loop`, and `GainNode` for crossfade/volume. Must be triggered by user gesture (autoplay policy). | 0 KB |

### Supporting Libraries (if native isn't enough)

| Library | Version | Purpose | When to Use | Bundle Impact (gzipped) |
|---------|---------|---------|-------------|------------------------|
| GSAP | 3.14.2 | Complex timeline sequencing, staggered reveals, SplitText | Use if CSS `animation-delay` chaining becomes too complex (5+ elements with interdependent timing). Timeline API is unmatched for cinematic sequencing. Now 100% free including all plugins (Webflow acquisition). | ~28 KB core |
| @gsap/react | 2.1.2 | `useGSAP()` hook -- drop-in `useEffect` replacement with auto-cleanup | Always use alongside GSAP in React. Handles `gsap.context()` cleanup automatically. SSR-safe (uses `useIsomorphicLayoutEffect`). | ~1 KB |
| GSAP ScrollTrigger | (included in gsap) | Scroll-linked animation triggering | Use if CSS scroll-driven animations have insufficient browser support for your audience or need complex pin/scrub behavior. | ~10 KB additional |
| GSAP SplitText | (included in gsap) | Character/word/line splitting for text reveal animations | Use for cinematic text reveals where each character/word animates independently. Previously paid, now free. | ~5 KB additional |
| Howler.js | 2.2.4 | Audio playback with Web Audio + HTML5 Audio fallback | Use if you need broader browser fallback, sprite sheets (multiple sounds in one file), or spatial audio. For a single ambient loop, native Web Audio API is sufficient. | ~7 KB |
| Motion (formerly Framer Motion) | 12.x | Declarative React animations, layout animations, gestures | Use if you prefer declarative/component-based animation API over imperative GSAP. Better for UI transitions (modals, lists, layout shifts). Worse for cinematic timeline sequencing. | ~34 KB full; ~4.6 KB with LazyMotion; ~2.3 KB useAnimate mini |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Chrome DevTools Performance tab | Profile animation frame rate | Check for layout thrashing during grain overlay animation |
| Chrome DevTools > Animations panel | Inspect CSS animation timing | Visual timeline of all running animations |
| `will-change: transform, opacity` | GPU compositing hint | Apply to animated elements. Remove after animation completes to free GPU memory. |
| `prefers-reduced-motion` media query | Accessibility | MUST respect this. Disable all motion, grain animation, and auto-playing sequences for users who prefer reduced motion. |

---

## Installation

```bash
# Recommended: GSAP for timeline sequencing (if CSS animations insufficient)
npm install gsap @gsap/react

# Alternative: If preferring declarative React approach
npm install motion

# Alternative: If needing robust audio fallback
npm install howler
```

```bash
# No install needed for:
# - CSS keyframe animations
# - CSS scroll-driven animations
# - Canvas 2D noise/grain
# - Web Audio API
# - React 19.2 View Transitions
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| CSS keyframe animations | GSAP timeline | When you have 5+ interdependent animation sequences, need pause/resume/reverse, or need to dynamically adjust timing at runtime |
| CSS keyframe animations | Motion (Framer Motion) | When animations are tightly coupled to React component state/lifecycle and you want declarative `<motion.div>` syntax |
| GSAP | anime.js v4 (~10 KB gzip) | When you need a lighter animation library and don't need ScrollTrigger/SplitText. Modular ES imports, good timeline support. Less mature React integration. |
| Native Web Audio API | Howler.js (7 KB) | When you need HTML5 Audio fallback for older browsers, audio sprites, or spatial/3D audio positioning |
| Native Web Audio API | Tone.js | When you need real-time synthesis, effects chains, or musical scheduling. Overkill for ambient loop playback. Very heavy bundle. |
| Canvas 2D grain | CSS SVG filter (`feTurbulence`) | When grain is static (not animated). SVG noise filter is pure CSS, zero JS, uses `feTurbulence` + `feDisplacementMap`. Animated SVG filters cause repaints and are less performant than canvas. |
| Canvas 2D grain | WebGL shader (glsl-film-grain) | When you want photorealistic film grain with precise control over grain size, luminance response. Requires WebGL context -- more setup, better visual quality. |
| Canvas 2D grain | Pixlated web component | Framework-agnostic, zero-dependency web component for grain. Good if you want drop-in solution without writing canvas code. |
| Manual canvas code | grained.js | Tiny library that generates animated noise texture. Last updated years ago but still works. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Three.js / React Three Fiber | Massive bundle (~150+ KB). Overkill for 2D grain/noise effects. Only justified if you need actual 3D scenes. | Canvas 2D for grain; CSS for animations |
| Lottie / lottie-web | Designed for After Effects exports. Not the right tool for code-driven cinematic sequences. Bundle is ~50 KB+ and requires JSON animation files. | CSS keyframes or GSAP for code-driven animation |
| p5.js | Creative coding framework, not a production animation tool. ~80 KB, brings its own rendering loop. | Raw Canvas 2D API |
| jQuery animations | Dead paradigm. | Literally anything else |
| `react-spring` | Physics-based spring animations are wrong mental model for timed cinematic reveals. Springs don't have deterministic end times, which makes sequencing unreliable. | GSAP (precise timing) or CSS keyframes |
| `framer-motion` (old package name) | Deprecated package name. Renamed to `motion`. Import from `motion/react` not `framer-motion`. | `motion` package |
| Tone.js for ambient playback | ~200+ KB. Full DAW-in-a-browser. Designed for music synthesis and complex audio graphs. Absurdly oversized for playing an ambient loop. | Web Audio API (native) or Howler.js (7 KB) |
| Heavy particle libraries (tsparticles, particles.js) | 30-50+ KB for particles alone. Continuous rendering loop is expensive on mobile. | CSS pseudo-element animation or lightweight canvas with infrequent redraws |

---

## Stack Patterns by Variant

**If the cinematic sequence is a simple timed reveal (fade in title, then subtitle, then CTA):**
- Use pure CSS keyframe animations with `animation-delay` chaining
- Use CSS custom properties for timing tokens (`--reveal-delay: 0.8s`, `--stagger: 0.3s`)
- Zero dependencies added
- Because: This is the lightest possible approach and sufficient for linear sequences

**If the cinematic sequence has complex orchestration (pause, branch, reverse, dynamic timing):**
- Use GSAP `gsap.timeline()` with `useGSAP()` hook
- Because: GSAP timeline is the industry standard for complex animation sequencing. Pause/resume/reverse built in. SplitText included free for character-level text reveals.

**If sound is a single ambient loop with volume toggle:**
- Use native Web Audio API: `fetch` -> `decodeAudioData` -> `AudioBufferSourceNode` with `loop: true` -> `GainNode` for volume
- Wrap in a custom React hook (`useAmbientSound`) with `useEffect` cleanup
- Must be started from a user gesture (click/tap) due to autoplay policy
- Because: Zero dependencies, full control, ~20 lines of code

**If sound needs fallback or multiple effects:**
- Use Howler.js
- Because: 7 KB, handles Web Audio / HTML5 Audio fallback, sprite support for multiple sound effects

**If grain effect should be static (not animated):**
- Use CSS SVG filter: `<svg>` with `<feTurbulence>` + CSS `filter: url(#noise)` or `background` with SVG data URI
- Because: Zero JS, zero canvas, pure CSS. Most performant for static grain.

**If grain effect should be subtly animated (breathing/living texture):**
- Use Canvas 2D: generate noise at 100-200px, `ctx.getImageData` / `putImageData`, tile via CSS `background-size`
- Refresh at 100-200ms intervals (5-10 fps), NOT 60fps
- Use `requestAnimationFrame` with frame skipping or `setInterval`
- Apply as a `position: fixed` overlay with `pointer-events: none` and low opacity (0.03-0.08)
- Because: Good balance of visual quality and performance. Canvas 2D is universally supported.

---

## Implementation Patterns

### CSS Animation Sequencing Pattern

```css
:root {
  --seq-delay: 0.5s;
  --seq-stagger: 0.4s;
  --seq-duration: 0.8s;
  --seq-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes fadeReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  opacity: 0;
  animation: fadeReveal var(--seq-duration) var(--seq-easing) forwards;
}

.reveal:nth-child(1) { animation-delay: calc(var(--seq-delay)); }
.reveal:nth-child(2) { animation-delay: calc(var(--seq-delay) + var(--seq-stagger)); }
.reveal:nth-child(3) { animation-delay: calc(var(--seq-delay) + var(--seq-stagger) * 2); }
```

### GSAP Timeline Sequencing Pattern (if needed)

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function CinematicReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const split = new SplitText(".hero-title", { type: "chars" });

    tl.from(split.chars, { opacity: 0, y: 20, stagger: 0.03, duration: 0.6 })
      .from(".hero-subtitle", { opacity: 0, y: 10, duration: 0.8 }, "-=0.3")
      .from(".hero-cta", { opacity: 0, duration: 0.6 }, "+=0.2");
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### Web Audio API Ambient Sound Pattern

```tsx
"use client";
import { useRef, useCallback } from "react";

export function useAmbientSound(audioUrl: string) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const start = useCallback(async () => {
    if (ctxRef.current) return; // already playing
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    const response = await fetch(audioUrl);
    const buffer = await ctx.decodeAudioData(await response.arrayBuffer());

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    source.start();

    // Fade in over 2 seconds
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);

    ctxRef.current = ctx;
    gainRef.current = gain;
    sourceRef.current = source;
  }, [audioUrl]);

  const stop = useCallback(() => {
    if (!ctxRef.current || !gainRef.current) return;
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    setTimeout(() => {
      sourceRef.current?.stop();
      ctx.close();
      ctxRef.current = null;
    }, 1100);
  }, []);

  return { start, stop };
}
```

### Canvas Grain Overlay Pattern

```tsx
"use client";
import { useEffect, useRef } from "react";

export function GrainOverlay({ opacity = 0.05, refreshInterval = 150 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 128; // small canvas, tiled via CSS
    canvas.width = size;
    canvas.height = size;

    const generateNoise = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    generateNoise();
    const interval = setInterval(generateNoise, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        zIndex: 9999,
        imageRendering: "pixelated",
        /* Tile the small canvas across viewport */
        background: "repeat",
      }}
    />
  );
}
```

### CSS SVG Static Grain Pattern (zero JS alternative)

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
```

---

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| gsap@3.14.2 | React 19.2, Next.js 16.x | Use `@gsap/react` for hook integration. Must use `"use client"` directive. |
| @gsap/react@2.1.2 | gsap@3.12+, React 18.2+ | SSR-safe via `useIsomorphicLayoutEffect`. |
| motion@12.x | React 18.2+, Next.js 15+ | Import from `motion/react`. For SSR: `motion/react-client`. Not tested on Next.js 16 specifically but no breaking changes expected. |
| howler@2.2.4 | Any framework | Client-only. Dynamic import or `useEffect` guard needed for SSR. Stable but last published 2+ years ago. |
| animejs@4.2.2 | Framework-agnostic | No official React bindings. Manual cleanup needed in `useEffect`. |
| CSS scroll-driven animations | Chrome 115+, Firefox 110+, Safari 26+ | Use `@supports (animation-timeline: scroll())` for progressive enhancement. |
| React 19.2 View Transitions | Next.js 16+ | Enable via `viewTransition: true` in `next.config.js`. Chrome-first, other browsers catching up. |

---

## Recommendation Summary

For a cinematic auto-playing homepage sequence with the constraints given (lightweight, performant, mobile-friendly), the recommended approach in priority order:

1. **Start with CSS-only**: keyframe animations with `animation-delay` chaining for the timed reveal sequence. This covers 80% of cinematic reveal needs at zero bundle cost.

2. **Add GSAP only if CSS becomes unwieldy**: If you need pause/resume, complex branching, character-level text splitting, or dynamic timing adjustments. GSAP is now free and is the industry standard for this exact use case. ~28 KB core + ~1 KB React hook.

3. **Use native Web Audio API for ambient sound**: A single ambient loop with gain control is ~20 lines of code. No library needed. Wrap in a custom hook.

4. **Use Canvas 2D for animated grain**: Small canvas (128px) with noise generation at 5-10fps, tiled across viewport. OR use CSS SVG filter for static grain (zero JS).

5. **Respect `prefers-reduced-motion`**: Mandatory. Disable all animation, grain, and sound for users who prefer reduced motion.

**Total bundle impact of recommended approach: 0 KB** (CSS + native APIs only)
**Total bundle impact if GSAP needed: ~29 KB** (gsap + @gsap/react)
**Total bundle impact maximum (GSAP + Howler): ~36 KB**

---

## Sources

- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) -- Next.js 16 features, React 19.2 integration (HIGH confidence)
- [React 19.2 Release Blog](https://react.dev/blog/2025/10/01/react-19-2) -- View Transitions, useEffectEvent, Activity API (HIGH confidence)
- [Next.js viewTransition Config](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) -- View Transitions setup (HIGH confidence)
- [GSAP Docs](https://gsap.com/docs/v3/) -- Timeline, ScrollTrigger, SplitText API (HIGH confidence)
- [Webflow makes GSAP free](https://webflow.com/blog/gsap-becomes-free) -- License change, all plugins free (HIGH confidence)
- [GSAP React Integration](https://gsap.com/resources/React/) -- useGSAP hook docs (HIGH confidence)
- [Setting Up GSAP with Next.js 2025](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6) -- Next.js specific setup patterns (MEDIUM confidence)
- [Motion.dev Docs](https://motion.dev/docs/react-reduce-bundle-size) -- Bundle size reduction, LazyMotion (HIGH confidence)
- [Motion Installation Guide](https://motion.dev/docs/react-installation) -- Next.js App Router compatibility (HIGH confidence)
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion -> motion migration (HIGH confidence)
- [Framer Motion vs Motion One Performance](https://reactlibraries.com/blog/framer-motion-vs-motion-one-mobile-animation-performance-in-2025) -- Mobile performance comparison (MEDIUM confidence)
- [MDN CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) -- Spec reference, browser support (HIGH confidence)
- [Chrome View Transitions 2025 Update](https://developer.chrome.com/blog/view-transitions-in-2025) -- View Transitions API progress (HIGH confidence)
- [MDN Web Audio API Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) -- AudioContext patterns (HIGH confidence)
- [MDN AudioBufferSourceNode.loop](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop) -- Loop implementation (HIGH confidence)
- [Howler.js Official Site](https://howlerjs.com/) -- Feature overview, 7KB size claim (HIGH confidence)
- [Anime.js v4 Official](https://animejs.com/) -- v4 features, modular API (HIGH confidence)
- [Anime.js v4 What's New](https://github.com/juliangarnier/anime/wiki/What's-new-in-Anime.js-V4) -- v4 changes, ~10KB size (MEDIUM confidence)
- [CSS Film Grain Effect](https://redstapler.co/css-film-grain-effect/) -- Pure CSS grain technique (HIGH confidence)
- [Grainy Gradients CSS-Tricks](https://css-tricks.com/grainy-gradients/) -- SVG feTurbulence noise technique (HIGH confidence)
- [WebGL Film Grain](https://maximmcnair.com/p/webgl-film-grain) -- GLSL film grain implementation (MEDIUM confidence)
- [Pixlated Web Components](https://pixlated.vercel.app/) -- Zero-dependency grain web component (MEDIUM confidence)
- [VFX-JS Codrops](https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/) -- Lightweight WebGL effects (MEDIUM confidence)
- [LogRocket Best React Animation Libraries 2026](https://blog.logrocket.com/best-react-animation-libraries/) -- Library comparison (MEDIUM confidence)
- [Comparing GSAP vs Motion 2026](https://peerlist.io/scroll/post/ACTHGNQQ6EE967OJ72KKN6NKMNGMKB) -- Head-to-head comparison (MEDIUM confidence)
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) -- Full API reference (HIGH confidence)
- [Web Animations API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) -- WAAPI reference (HIGH confidence)
- GSAP bundle size: ~28 KB core gzipped (LOW confidence -- extrapolated from forum posts and bundlephobia references, not directly verified)
- Motion bundle size: ~34 KB full / ~4.6 KB LazyMotion (HIGH confidence -- from official docs)

---
*Stack research for: Cinematic mystery teaser / pre-launch hype landing page*
*Researched: 2026-02-12*
