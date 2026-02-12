# Architecture Research: Cinematic Auto-Playing Web Sequence

**Domain:** Cinematic mystery teaser / pre-launch hype landing page
**Researched:** 2026-02-12
**Overall Confidence:** MEDIUM-HIGH (patterns well-established; specific integration with Next.js 16 / React 19 requires some extrapolation)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                              │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  SceneRenderer│  │ TextReveals  │  │ Atmosphere   │  │ WaitlistCTA│  │
│  │  (per-scene   │  │ (typed text, │  │ (particles,  │  │ (form,     │  │
│  │   visuals)    │  │  fade-ins)   │  │  gradients,  │  │  final act)│  │
│  │              │  │              │  │  neon glows)  │  │            │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │
│         │                 │                 │                │          │
├─────────┴─────────────────┴─────────────────┴────────────────┴──────────┤
│                        ORCHESTRATION LAYER                              │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    SequenceDirector                                │  │
│  │  - Owns the master GSAP timeline                                  │  │
│  │  - Maps scenes to timeline positions                              │  │
│  │  - Dispatches scene transitions                                   │  │
│  │  - Handles skip / replay / pause                                  │  │
│  └────────────────────────┬───────────────────────────────────────────┘  │
│                           │                                             │
│  ┌────────────────┐  ┌────┴───────────┐  ┌──────────────────────────┐   │
│  │  AudioManager  │  │ SceneRegistry  │  │  SequenceState (reducer) │   │
│  │  (Howler.js)   │  │ (scene configs │  │  - currentScene          │   │
│  │  - play/pause  │  │  as data)      │  │  - phase (loading/       │   │
│  │  - fade/sync   │  │                │  │    playing/complete)     │   │
│  │  - user unlock │  │                │  │  - hasSeenIntro          │   │
│  └────────────────┘  └────────────────┘  │  - audioEnabled          │   │
│                                          └──────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│                          DATA / CONFIG LAYER                            │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │ Scene Defs   │  │ Asset        │  │ Persistence  │                   │
│  │ (JSON/TS     │  │ Manifest     │  │ (localStorage│                   │
│  │  config)     │  │ (preload     │  │  for skip/   │                   │
│  │              │  │  priority)   │  │  seen state) │                   │
│  └──────────────┘  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Next.js App Router Boundary

```
                     SERVER                    CLIENT
                  ┌──────────┐            ┌───────────────────┐
   page.tsx       │ Layout   │            │                   │
   (server)  ───> │ Metadata │ ──mounts──>│ CinematicSequence │
                  │ OG tags  │            │ "use client"      │
                  └──────────┘            │                   │
                                          │ All interactive   │
                                          │ logic lives here  │
                                          └───────────────────┘
```

**Confidence: HIGH** -- This server/client split is standard Next.js App Router architecture. The page.tsx remains a server component for SEO metadata, while the entire cinematic experience is a single client component tree.

---

## Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `CinematicSequence` | Root client component. Mounts the sequence, manages top-level state, renders current scene. | `"use client"` wrapper, houses `useReducer` for sequence state and `useGSAP` for master timeline |
| `SequenceDirector` | Builds and controls the master GSAP timeline. Maps scene configs to timeline positions. Exposes play/pause/skip/replay. | Custom hook (`useSequenceDirector`) that creates a `gsap.timeline()` inside `useGSAP`, stores in ref |
| `SceneRenderer` | Renders the visual content for a given scene -- text, images, overlays, effects. | Presentational component receiving scene config as props; elements targeted by GSAP via className/ref |
| `AudioManager` | Handles background audio lifecycle: user unlock, play, pause, fade, sync to scene transitions. | Custom hook (`useAudioManager`) wrapping Howler.js; responds to scene change events |
| `AtmosphericEffects` | CSS/canvas-based ambient effects (noise, gradients, glow, particles). | Lightweight component with CSS animations or a small canvas; reduces complexity on mobile |
| `WaitlistForm` | The "climax" -- signup form revealed at sequence end. | Standard form component, animated in by the master timeline as the final scene |
| `SkipControl` | Persistent UI for skipping intro or replaying. | Fixed-position button, dispatches SKIP/REPLAY actions to state reducer |
| `PreloadManager` | Preloads assets for upcoming scenes before they're needed. | `useEffect` that loads images via `new Image()` based on asset manifest; reports readiness |

**Confidence: HIGH** -- Component decomposition follows established patterns from GSAP scene manager architecture and React best practices.

---

## Scene / Act System

### Structure: Scenes as Data, Not Components

The cinematic sequence is defined as a **data structure**, not as individual React components per scene. This is the critical architectural decision. Each scene is a configuration object; a single renderer interprets them.

```typescript
// types/sequence.ts
interface SceneConfig {
  id: string;
  act: number;                    // Group scenes into dramatic acts
  duration: number;               // Seconds this scene occupies in the timeline
  elements: SceneElement[];       // What to show
  atmosphere: AtmosphereConfig;   // Background mood (colors, effects)
  audio?: AudioCue;               // Sound changes at this scene
  transition: TransitionType;     // How to enter this scene
}

interface SceneElement {
  type: 'text' | 'image' | 'component';
  content: string;                // Text content or image path
  animation: ElementAnimation;    // How this element enters/exits
  delay: number;                  // Offset within the scene
  className?: string;             // For GSAP targeting
}

interface AtmosphereConfig {
  background: string;             // CSS gradient or color
  neonColor?: string;             // Accent glow color
  noiseOpacity?: number;          // TV static / grain intensity
  particleDensity?: number;       // Ambient particle count
}

interface AudioCue {
  action: 'play' | 'crossfade' | 'stop' | 'volume';
  track?: string;                 // Audio file key
  volume?: number;
  fadeDuration?: number;
}
```

**Confidence: HIGH** -- Data-driven scene definitions are the established pattern. The Codrops "Spark" experience uses JSON entries that render dynamically into UI elements, keeping implementation separated from narrative structure. Dave Stewart's GSAP Scene Manager uses a similar hierarchical config approach.

### Scene Sequence Example

```typescript
// config/scenes.ts
export const CINEMATIC_SCENES: SceneConfig[] = [
  // === ACT 1: MYSTERY ===
  {
    id: 'blackout',
    act: 1,
    duration: 2,
    elements: [],
    atmosphere: { background: '#000', noiseOpacity: 0.3 },
    transition: 'fade',
  },
  {
    id: 'first-whisper',
    act: 1,
    duration: 4,
    elements: [
      {
        type: 'text',
        content: 'Something is coming.',
        animation: { type: 'typewriter', speed: 0.08 },
        delay: 0.5,
        className: 'reveal-text',
      },
    ],
    atmosphere: { background: '#000', neonColor: '#00ff88', noiseOpacity: 0.15 },
    audio: { action: 'play', track: 'ambient-drone', volume: 0.3, fadeDuration: 2 },
    transition: 'fade',
  },

  // === ACT 2: TENSION ===
  {
    id: 'brand-reveal',
    act: 2,
    duration: 5,
    elements: [
      {
        type: 'image',
        content: '/images/street-logo-glitch.webp',
        animation: { type: 'glitch-in', intensity: 0.8 },
        delay: 0,
        className: 'logo-reveal',
      },
      {
        type: 'text',
        content: 'The street has a new address.',
        animation: { type: 'fade-up', stagger: 0.05 },
        delay: 2,
        className: 'tagline',
      },
    ],
    atmosphere: { background: 'linear-gradient(#000, #0a0a1a)', neonColor: '#ff0066' },
    audio: { action: 'volume', volume: 0.6, fadeDuration: 1 },
    transition: 'glitch',
  },

  // === ACT 3: CLIMAX (waitlist) ===
  {
    id: 'waitlist-reveal',
    act: 3,
    duration: 6,
    elements: [
      {
        type: 'text',
        content: 'Be first.',
        animation: { type: 'scale-in' },
        delay: 0,
        className: 'cta-headline',
      },
      {
        type: 'component',
        content: 'WaitlistForm',
        animation: { type: 'fade-up' },
        delay: 1.5,
        className: 'waitlist-form',
      },
    ],
    atmosphere: { background: '#0a0a1a', neonColor: '#00ff88', particleDensity: 50 },
    audio: { action: 'crossfade', track: 'ambient-resolve', fadeDuration: 3 },
    transition: 'fade',
  },
];
```

**Confidence: MEDIUM** -- The specific scene definitions are illustrative. The data structure pattern itself is HIGH confidence, but exact fields will evolve during implementation.

---

## Recommended Project Structure

```
app/
├── page.tsx                        # Server component: metadata, OG tags
├── layout.tsx                      # Root layout
├── globals.css                     # Global styles, CSS variables for palette
│
├── cinematic/                      # Cinematic sequence feature
│   ├── CinematicSequence.tsx       # "use client" root component
│   ├── SceneRenderer.tsx           # Renders a single scene from config
│   ├── AtmosphericEffects.tsx      # Background mood (gradients, noise, particles)
│   ├── WaitlistForm.tsx            # Final CTA form
│   ├── SkipControl.tsx             # Skip / replay UI
│   │
│   ├── hooks/
│   │   ├── useSequenceDirector.ts  # Master GSAP timeline builder & controller
│   │   ├── useAudioManager.ts      # Howler.js audio lifecycle
│   │   ├── usePreloader.ts         # Asset preloading logic
│   │   └── useSequenceState.ts     # useReducer state machine
│   │
│   ├── config/
│   │   ├── scenes.ts               # SceneConfig[] array
│   │   ├── assets.ts               # Asset manifest with preload priorities
│   │   └── audio.ts                # Audio track definitions
│   │
│   ├── types/
│   │   └── sequence.ts             # TypeScript interfaces
│   │
│   └── animations/
│       ├── transitions.ts          # GSAP transition presets (fade, glitch, etc.)
│       └── elementAnimations.ts    # Per-element animation builders
│
├── components/                     # Shared components
│   └── ...
│
public/
├── audio/
│   ├── ambient-drone.mp3
│   └── ambient-resolve.mp3
├── images/
│   ├── street-logo-glitch.webp
│   └── ...
└── fonts/
    └── ...
```

### Structure Rationale

- **`app/cinematic/`**: Feature-grouped, not spread across generic folders. Everything the sequence needs lives together. This is a self-contained feature module.
- **`hooks/`**: Separates orchestration logic from presentation. Each hook has a single responsibility.
- **`config/`**: Scene definitions and asset manifests are pure data, easily editable by non-engineers or via a CMS later.
- **`animations/`**: Reusable GSAP tween builders, decoupled from scene definitions. Keeps scene configs declarative.
- **`public/audio/`**: Audio files served statically. Howler.js loads from URL.

**Confidence: HIGH** -- Standard Next.js App Router conventions with feature-based grouping.

---

## Architectural Patterns

### Pattern 1: State Machine for Sequence Control

**What:** Use `useReducer` with a finite state graph to manage the sequence lifecycle. Each state transition is explicit and predictable.

**When to use:** When you have distinct phases (loading, playing, paused, complete, skipped) with strict transition rules.

**Trade-offs:**
- Pro: Impossible states are impossible. Clear debugging. Testable transitions.
- Pro: Works natively in React 19 -- no external dependency.
- Con: Slightly more boilerplate than raw `useState`.
- Con: For very complex sequences, consider XState, but that is overkill here.

**Example:**

```typescript
// hooks/useSequenceState.ts

type SequencePhase =
  | 'loading'      // Assets preloading
  | 'ready'        // Assets loaded, waiting for user gesture (for audio)
  | 'playing'      // Sequence is auto-playing
  | 'paused'       // User paused or tab hidden
  | 'complete'     // Reached final scene, waitlist visible
  | 'skipped';     // User skipped, jumped to waitlist

type SequenceEvent =
  | 'ASSETS_LOADED'
  | 'USER_START'        // First interaction (unlocks audio)
  | 'PLAY'
  | 'PAUSE'
  | 'SCENE_COMPLETE'
  | 'SEQUENCE_COMPLETE'
  | 'SKIP'
  | 'REPLAY';

interface SequenceState {
  phase: SequencePhase;
  currentSceneIndex: number;
  audioEnabled: boolean;
  hasSeenIntro: boolean;
}

const STATE_GRAPH: Record<SequencePhase, Partial<Record<SequenceEvent, SequencePhase>>> = {
  loading:  { ASSETS_LOADED: 'ready' },
  ready:    { USER_START: 'playing', SKIP: 'skipped' },
  playing:  { PAUSE: 'paused', SKIP: 'skipped', SEQUENCE_COMPLETE: 'complete' },
  paused:   { PLAY: 'playing', SKIP: 'skipped' },
  complete: { REPLAY: 'loading' },
  skipped:  { REPLAY: 'loading' },
};

function sequenceReducer(state: SequenceState, event: SequenceEvent): SequenceState {
  const nextPhase = STATE_GRAPH[state.phase][event];
  if (!nextPhase) return state; // Invalid transition -- ignore

  const nextState = { ...state, phase: nextPhase };

  // Side-effect-like state changes based on transition
  switch (event) {
    case 'USER_START':
      nextState.audioEnabled = true;
      break;
    case 'SCENE_COMPLETE':
      nextState.currentSceneIndex = state.currentSceneIndex + 1;
      break;
    case 'SKIP':
      nextState.hasSeenIntro = true;
      break;
    case 'REPLAY':
      nextState.currentSceneIndex = 0;
      nextState.hasSeenIntro = true;
      break;
    case 'SEQUENCE_COMPLETE':
      nextState.hasSeenIntro = true;
      // Persist to localStorage so returning visitors skip
      if (typeof window !== 'undefined') {
        localStorage.setItem('street_intro_seen', 'true');
      }
      break;
  }

  return nextState;
}
```

**Confidence: HIGH** -- This pattern is directly sourced from Kyle Shevlin's useReducer-as-state-machine approach, adapted for animation sequence control. The state graph pattern is well-proven.

---

### Pattern 2: Master Timeline with Scene Segments

**What:** A single GSAP timeline orchestrates the entire sequence. Each scene occupies a labeled segment of the timeline. The timeline auto-plays forward and fires callbacks at scene boundaries.

**When to use:** When you need precise timing control, overlapping animations, and the ability to scrub/seek/reverse the entire sequence.

**Trade-offs:**
- Pro: Single source of truth for all timing. Trivial to implement skip (seek to end) and replay (seek to 0).
- Pro: GSAP handles all frame-level interpolation, RAF management, and performance optimization.
- Pro: GSAP is now 100% free (acquired by Webflow, fall 2024), including all premium plugins.
- Con: Imperative API that must be carefully integrated with React's declarative model via `useGSAP`.
- Con: Adds ~30kb to bundle (acceptable for this use case).

**Example:**

```typescript
// hooks/useSequenceDirector.ts
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { SceneConfig } from '../types/sequence';

gsap.registerPlugin(useGSAP);

export function useSequenceDirector(
  containerRef: React.RefObject<HTMLDivElement>,
  scenes: SceneConfig[],
  onSceneChange: (index: number) => void,
  onComplete: () => void,
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete,
    });

    scenes.forEach((scene, index) => {
      const label = `scene-${scene.id}`;

      // Add label at current position
      tl.addLabel(label);

      // Add callback when this scene starts
      tl.call(() => onSceneChange(index), [], label);

      // Build scene animations from config
      scene.elements.forEach((element) => {
        const target = `.${element.className}`;
        const offset = `${label}+=${element.delay}`;

        switch (element.animation.type) {
          case 'fade-up':
            tl.fromTo(target,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
              offset
            );
            break;
          case 'typewriter':
            // Custom typewriter: animate clip-path or use SplitText
            tl.fromTo(target,
              { opacity: 0 },
              { opacity: 1, duration: 0.3 },
              offset
            );
            break;
          case 'glitch-in':
            tl.fromTo(target,
              { opacity: 0, skewX: 20, scaleX: 1.1 },
              { opacity: 1, skewX: 0, scaleX: 1, duration: 0.5, ease: 'power3.out' },
              offset
            );
            break;
          case 'scale-in':
            tl.fromTo(target,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
              offset
            );
            break;
        }
      });

      // Add dead time to fill the scene's duration
      tl.to({}, { duration: scene.duration }, label);
    });

    timelineRef.current = tl;
  }, { scope: containerRef, dependencies: [] });

  // Controller methods
  const play = () => timelineRef.current?.play();
  const pause = () => timelineRef.current?.pause();
  const skip = () => timelineRef.current?.progress(1); // Jump to end
  const replay = () => {
    timelineRef.current?.seek(0);
    timelineRef.current?.play();
  };
  const seekToScene = (sceneId: string) => {
    timelineRef.current?.seek(`scene-${sceneId}`);
  };

  return { play, pause, skip, replay, seekToScene };
}
```

**Confidence: HIGH** -- GSAP's timeline with labels is the de facto standard for this pattern. The `useGSAP` hook integration is directly from GSAP's official React documentation. The position parameter (`label+=delay`) syntax is well-documented.

---

### Pattern 3: Audio Sync via Event-Driven Cues (Not Frame-Level Sync)

**What:** Rather than syncing audio frame-by-frame with `requestAnimationFrame`, use event-driven cues: the master timeline fires callbacks at scene boundaries that tell the audio manager to play, crossfade, or adjust volume. Audio runs independently via Web Audio API (through Howler.js), and scene transitions simply trigger audio state changes.

**When to use:** When audio is atmospheric/ambient (not lip-synced or beat-matched). Frame-perfect sync is unnecessary for mood audio.

**Trade-offs:**
- Pro: Dramatically simpler than frame-level sync. No audio clock drift issues.
- Pro: Howler.js handles Web Audio API / HTML5 Audio fallback automatically.
- Pro: Graceful degradation -- if audio fails to load or is blocked, visuals continue unaffected.
- Con: Not suitable if you need beat-synced animations (not our use case).

**Example:**

```typescript
// hooks/useAudioManager.ts
import { useRef, useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import type { AudioCue } from '../types/sequence';

interface AudioTrack {
  key: string;
  src: string;
  howl?: Howl;
}

export function useAudioManager(tracks: AudioTrack[]) {
  const howlsRef = useRef<Map<string, Howl>>(new Map());
  const activeTrackRef = useRef<string | null>(null);
  const unlockedRef = useRef(false);

  // Pre-initialize Howl instances (won't play until unlocked)
  useEffect(() => {
    tracks.forEach((track) => {
      const howl = new Howl({
        src: [track.src],
        loop: true,
        volume: 0,
        preload: true,
        html5: false,     // Use Web Audio API for better control
        autoplay: false,  // CRITICAL: respect browser autoplay policy
      });
      howlsRef.current.set(track.key, howl);
    });

    return () => {
      howlsRef.current.forEach((howl) => howl.unload());
      howlsRef.current.clear();
    };
  }, [tracks]);

  // Must be called from a user gesture (click/tap)
  const unlock = useCallback(() => {
    if (unlockedRef.current) return;
    // Howler auto-unlocks Web Audio context on first interaction
    // but we explicitly resume just in case
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    unlockedRef.current = true;
  }, []);

  // Process audio cues from scene transitions
  const processCue = useCallback((cue: AudioCue) => {
    if (!unlockedRef.current) return;

    const fadeDuration = (cue.fadeDuration ?? 1) * 1000; // Howler uses ms

    switch (cue.action) {
      case 'play': {
        const howl = howlsRef.current.get(cue.track!);
        if (!howl) return;
        howl.volume(0);
        howl.play();
        howl.fade(0, cue.volume ?? 0.5, fadeDuration);
        activeTrackRef.current = cue.track!;
        break;
      }
      case 'crossfade': {
        // Fade out current, fade in new
        if (activeTrackRef.current) {
          const current = howlsRef.current.get(activeTrackRef.current);
          current?.fade(current.volume(), 0, fadeDuration);
          setTimeout(() => current?.stop(), fadeDuration);
        }
        const next = howlsRef.current.get(cue.track!);
        if (next) {
          next.volume(0);
          next.play();
          next.fade(0, cue.volume ?? 0.5, fadeDuration);
        }
        activeTrackRef.current = cue.track!;
        break;
      }
      case 'volume': {
        if (activeTrackRef.current) {
          const current = howlsRef.current.get(activeTrackRef.current);
          current?.fade(current.volume(), cue.volume ?? 0.5, fadeDuration);
        }
        break;
      }
      case 'stop': {
        if (activeTrackRef.current) {
          const current = howlsRef.current.get(activeTrackRef.current);
          current?.fade(current.volume(), 0, fadeDuration);
          setTimeout(() => current?.stop(), fadeDuration);
        }
        activeTrackRef.current = null;
        break;
      }
    }
  }, []);

  const stopAll = useCallback(() => {
    howlsRef.current.forEach((howl) => {
      howl.fade(howl.volume(), 0, 500);
      setTimeout(() => howl.stop(), 500);
    });
    activeTrackRef.current = null;
  }, []);

  return { unlock, processCue, stopAll };
}
```

**Confidence: HIGH** for the event-driven approach. **MEDIUM** for Howler.js specifics -- API is stable but may have minor version differences. Browser autoplay policy handling is well-documented in Howler.js GitHub issues.

---

### Pattern 4: Asset Preloading with Scene Lookahead

**What:** Before the sequence starts, preload critical assets (first 1-2 scenes). During playback, preload assets for the *next* scene while the current scene plays. Use a manifest with priority levels.

**When to use:** When the sequence relies on images or media that would cause visible loading delays if fetched on-demand.

**Trade-offs:**
- Pro: No visual jank from image loading mid-sequence.
- Pro: Lighter initial load than preloading everything upfront.
- Con: Adds complexity. Must handle preload failures gracefully.

**Example:**

```typescript
// hooks/usePreloader.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import type { SceneConfig } from '../types/sequence';

export function usePreloader(scenes: SceneConfig[]) {
  const [readyScenes, setReadyScenes] = useState<Set<string>>(new Set());
  const [allReady, setAllReady] = useState(false);
  const loadedRef = useRef<Set<string>>(new Set());

  const preloadScene = useCallback(async (scene: SceneConfig) => {
    if (loadedRef.current.has(scene.id)) return;
    loadedRef.current.add(scene.id);

    const imageElements = scene.elements.filter((e) => e.type === 'image');
    const promises = imageElements.map(
      (el) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on failure
          img.src = el.content;
        })
    );

    await Promise.all(promises);
    setReadyScenes((prev) => new Set([...prev, scene.id]));
  }, []);

  // Preload first 2 scenes immediately
  useEffect(() => {
    const initial = scenes.slice(0, 2);
    Promise.all(initial.map(preloadScene)).then(() => setAllReady(true));
  }, [scenes, preloadScene]);

  // Call this when a scene starts playing to preload the next one
  const preloadNext = useCallback(
    (currentIndex: number) => {
      const next = scenes[currentIndex + 1];
      if (next) preloadScene(next);
    },
    [scenes, preloadScene]
  );

  return { allReady, readyScenes, preloadNext };
}
```

**Confidence: HIGH** -- Image preloading via `new Image()` is a universally supported pattern. The lookahead strategy is standard in cinematic web experiences (Codrops "The Spark" loads only the next scene as you approach its boundary).

---

### Pattern 5: Reduced Motion and Mobile Adaptation

**What:** Detect `prefers-reduced-motion` and adapt the experience. On mobile, simplify atmospheric effects, reduce particle counts, and ensure touch targets are large enough. Provide an explicit skip button always visible.

**When to use:** Always. This is an accessibility and performance requirement.

**Trade-offs:**
- Pro: Inclusive. Prevents vestibular triggers. Better battery life on mobile.
- Pro: Reduced motion path can also serve as the "returning visitor" path.
- Con: Must design two valid experiences (full and reduced).

**Example:**

```typescript
// hooks/useMotionPreference.ts
import { useState, useEffect } from 'react';

export function useMotionPreference() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// In CinematicSequence.tsx:
// const prefersReduced = useMotionPreference();
// if (prefersReduced) {
//   // Skip animations, show static version with waitlist immediately
//   return <StaticLanding />;
// }
```

**Mobile performance rules (animate ONLY these properties for 60fps):**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly)
- `clip-path`

Never animate `width`, `height`, `top`, `left`, `margin`, `padding` -- these trigger layout recalculation.

**Confidence: HIGH** -- `prefers-reduced-motion` is a W3C recommendation (WCAG 2.1 SC 2.3.3). The compositor-only animation list is from the Motion performance tier list and browser documentation.

---

## Data Flow

### Sequence Lifecycle Flow

```
[Page Load]
     │
     ▼
[CinematicSequence mounts]
     │
     ├──> usePreloader starts loading Act 1 assets
     │
     ▼
[ASSETS_LOADED] ──> phase: 'ready'
     │
     │    Show "Enter" / "Start" overlay
     │    (required for audio unlock on mobile)
     │
     ▼
[User taps/clicks] ──> USER_START
     │
     ├──> AudioManager.unlock() (resumes Web Audio context)
     ├──> SequenceDirector.play() (starts master timeline)
     │
     ▼
[Timeline auto-plays scenes]
     │
     ├── Scene boundary callback ──> onSceneChange(index)
     │       │
     │       ├──> Reducer: SCENE_COMPLETE (advance currentSceneIndex)
     │       ├──> AudioManager.processCue(scene.audio)
     │       ├──> Preloader.preloadNext(index)
     │       └──> AtmosphericEffects updates (new colors, effects)
     │
     ├── [User clicks Skip] ──> SKIP
     │       │
     │       ├──> SequenceDirector.skip() (timeline.progress(1))
     │       ├──> AudioManager.stopAll()
     │       └──> Render WaitlistForm directly
     │
     ├── [Tab hidden / visibility change] ──> PAUSE
     │       │
     │       ├──> SequenceDirector.pause()
     │       └──> AudioManager: fade to 0
     │
     ▼
[Timeline completes] ──> SEQUENCE_COMPLETE
     │
     ├──> phase: 'complete'
     ├──> localStorage.setItem('street_intro_seen', 'true')
     ├──> WaitlistForm is now the persistent view
     └──> "Replay" button appears
```

### State Management Flow

```
┌──────────────────────────────────────────────────────┐
│                useSequenceState (reducer)             │
│                                                      │
│  state: { phase, currentSceneIndex, audioEnabled,    │
│           hasSeenIntro }                             │
│                                                      │
│  dispatch(event) ──> STATE_GRAPH lookup ──> new state│
└──────────┬───────────────────────────────────────────┘
           │
           │ state is read by:
           │
    ┌──────┴──────────────────────────────┐
    │                                     │
    ▼                                     ▼
[CinematicSequence]               [SkipControl]
 - Reads phase to decide          - Shows/hides based on
   what to render                   phase
 - Passes currentSceneIndex       - Dispatches SKIP/REPLAY
   to SceneRenderer
```

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Single landing page (current) | Everything in one feature module. No CDN needed for 2-3 audio files and a handful of images. GSAP + Howler bundled directly. |
| Multiple cinematic pages | Extract `SequenceDirector` and `SceneRenderer` into a shared package. Scene configs become page-specific. Consider a CMS for scene content. |
| Heavy media (video, 3D) | Swap image-based scenes for `<video>` elements or WebGL (Three.js/cables.gl). Use HLS for video streaming. Preloader becomes a download progress bar. |
| International / multi-language | Scene text content moves to i18n system. Audio tracks may need localized versions. |

### Scaling Priorities

1. **First bottleneck: Initial load time.** If total assets exceed ~2MB, implement a progress-bar loading screen and aggressive code splitting. GSAP should be dynamically imported since it's only needed client-side.
2. **Second bottleneck: Mobile performance.** If atmospheric effects (particles, noise) cause frame drops on low-end devices, implement a device capability detection and serve a simplified experience.

---

## Anti-Patterns

### Anti-Pattern 1: One Component Per Scene

**What people do:** Create `<Scene1 />`, `<Scene2 />`, `<Scene3 />` as separate React components, each with their own animations.

**Why it's wrong:** Impossible to orchestrate timing across scenes. Each component manages its own lifecycle, leading to race conditions. No single timeline to scrub/skip/replay. Adding or reordering scenes requires code changes in multiple files.

**Do this instead:** Data-driven scene configs with a single `SceneRenderer` that interprets them. One master timeline controls all timing.

### Anti-Pattern 2: Using setTimeout for Sequencing

**What people do:** Chain `setTimeout` calls to sequence animations: `setTimeout(() => showText(), 2000); setTimeout(() => showLogo(), 5000)`.

**Why it's wrong:** Timers drift. They can't be paused, reversed, or scrubbed. No relationship between animations. Skip/replay is nearly impossible to implement. Cleanup is error-prone.

**Do this instead:** GSAP timeline with position parameters. All timing is relative and controllable.

### Anti-Pattern 3: Autoplaying Audio Without User Gesture

**What people do:** Call `audio.play()` in `useEffect` on mount, expecting background music to start automatically.

**Why it's wrong:** Every modern browser blocks autoplay audio without a user gesture. The audio silently fails, or worse, the Web Audio context gets permanently suspended.

**Do this instead:** Require an explicit user interaction before playing audio. Show a "Start Experience" or "Enter" button. Use this click event to unlock the audio context via Howler's `ctx.resume()`. The "ready" -> "playing" state transition in the state machine enforces this.

### Anti-Pattern 4: Animating Layout Properties on Mobile

**What people do:** Animate `width`, `height`, `top`, `left`, `margin`, `border-radius` for visual effects.

**Why it's wrong:** These trigger layout recalculation on every frame. On mobile devices with limited GPU/CPU, this causes visible jank and drops below 60fps. Battery drain increases significantly.

**Do this instead:** Only animate compositor-friendly properties: `transform` (for position, scale, rotation), `opacity`, `filter`, and `clip-path`. These run on the GPU compositor thread and don't trigger layout.

### Anti-Pattern 5: Loading All Assets Upfront

**What people do:** Preload every image, audio file, and asset before showing anything, creating a long loading screen.

**Why it's wrong:** Users bounce. Research shows preloading too much can add 400-1200ms of delay. For a cinematic sequence, the user only needs Act 1 assets immediately.

**Do this instead:** Preload critical assets (first 1-2 scenes), then use scene-lookahead preloading during playback. Background-load remaining assets while the user watches earlier scenes.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GSAP (animation) | `npm install gsap @gsap/react` | Now 100% free after Webflow acquisition (2024). Use `useGSAP` hook for React integration. Must use `"use client"` directive in Next.js App Router. ~30kb gzipped. |
| Howler.js (audio) | `npm install howler` | Wraps Web Audio API with HTML5 Audio fallback. No React wrapper needed -- use in custom hook. ~10kb gzipped. `@types/howler` for TypeScript. |
| Motion (optional) | `npm install motion` | Alternative/complement to GSAP for React-native animations (variants, layout animations). Has a timeline API with `at` parameter for sequencing. Consider using for UI micro-interactions while GSAP handles the master timeline. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| State machine <-> Timeline | State dispatches control timeline (play/pause/skip); timeline fires callbacks that dispatch events (SCENE_COMPLETE, SEQUENCE_COMPLETE) | Bidirectional but through clean interfaces. Timeline never reads state directly. |
| Timeline <-> Audio | Timeline callbacks pass `AudioCue` objects to audio manager | One-way: timeline tells audio what to do. Audio never drives timeline. |
| Scene configs <-> Renderer | SceneRenderer receives config as props | Pure data -> presentation mapping. Renderer has no knowledge of timeline position. |
| Preloader <-> State machine | Preloader dispatches ASSETS_LOADED; state machine gates the "ready" transition on it | Preloader is independent; state machine decides when to proceed. |
| Persistence <-> State machine | localStorage checked on mount to set initial `hasSeenIntro`; written on SEQUENCE_COMPLETE and SKIP | Read on init, write on completion. Simple key-value. |

---

## Library Comparison: GSAP vs Motion for Master Timeline

| Criterion | GSAP | Motion (Framer Motion) |
|-----------|------|------------------------|
| Timeline API | `gsap.timeline()` with labels, position params, nested timelines. Mutable -- can add/remove tracks during playback. | `animate()` with sequence arrays, `at` parameter (absolute, relative, labels). Immutable after creation. |
| Playback control | `.play()`, `.pause()`, `.reverse()`, `.seek()`, `.progress()`, `.timeScale()` | Returns animation controls with `.play()`, `.pause()`, `.cancel()`. Less granular seeking. |
| React integration | `useGSAP` hook from `@gsap/react`. Scoped refs. Automatic cleanup. | Native React component API (`<motion.div>`). `useAnimate` for imperative control. |
| Skip/replay | Trivial: `timeline.progress(1)` or `timeline.seek(0)` | Possible but less ergonomic for complex sequences. |
| Bundle size | ~30kb gzipped | ~18kb gzipped |
| Ecosystem | ScrollTrigger, SplitText, MorphSVG (all free now) | Layout animations, AnimatePresence, gesture support |

**Recommendation:** Use **GSAP** for the master timeline and scene orchestration. Its timeline API with labels, position parameters, and granular playback control is purpose-built for cinematic sequences. Optionally use Motion for UI micro-interactions (button hovers, form transitions) where its React-native API is more ergonomic.

**Confidence: HIGH** -- This comparison is well-supported by multiple sources including GSAP's own documentation, Motion's comparison page, and multiple community analyses.

---

## Sources

### Animation Architecture
- [GSAP Timeline Documentation](https://gsap.com/docs/v3/GSAP/Timeline/) -- Official timeline API reference (HIGH confidence)
- [React & GSAP Patterns](https://gsap.com/resources/React/) -- Official useGSAP hook docs (HIGH confidence)
- [GSAP Scene Manager - Dave Stewart](https://davestewart-io.vercel.app/plugins/gsap/gsap-scene-manager/) -- Scene hierarchy architecture pattern (MEDIUM confidence -- older project but pattern is sound)
- [The Spark: Immersive Story-First Web Experience - Codrops](https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/) -- Scene-based architecture with scroll-driven narrative (HIGH confidence)
- [Cinematic 3D Scroll Experiences with GSAP - Codrops](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/) -- Camera path and scene perspective mapping (MEDIUM confidence)
- [Cinematic Scroll-Driven Video Experiences in React](https://medium.com/@maskanati/cinematic-scroll-driven-video-experiences-in-react-fe33f7749b26) -- React-specific cinematic architecture (MEDIUM confidence)
- [GSAP Timeline Position Parameter](https://gsap.com/community/position-parameter/) -- Core sequencing syntax reference (HIGH confidence)

### State Management
- [useReducer as a Finite State Machine - Kyle Shevlin](https://kyleshevlin.com/how-to-use-usereducer-as-a-finite-state-machine/) -- State graph pattern for React (HIGH confidence)
- [Persisting Animation State Across Page Views - Andrew Magill](https://magill.dev/post/persisting-animation-state-across-page-views-in-Reactjs) -- localStorage for animation state (MEDIUM confidence)

### Audio
- [Howler.js](https://howlerjs.com/) -- Audio library documentation (HIGH confidence)
- [Chrome Autoplay Policy - Howler.js Issue #939](https://github.com/goldfire/howler.js/issues/939) -- Browser autoplay workarounds (HIGH confidence)
- [Web Audio API Best Practices - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) -- AudioContext unlock patterns (HIGH confidence)
- [Near-Realtime Animations with Synchronized Audio - Fender Engineering](https://medium.com/fender-engineering/near-realtime-animations-with-synchronized-audio-in-javascript-6d845afcf1c5) -- Multi-clock audio sync (MEDIUM confidence)

### Performance & Mobile
- [Web Animation Performance Tier List - Motion](https://motion.dev/blog/web-animation-performance-tier-list) -- Which CSS properties to animate (HIGH confidence)
- [Optimize Motion Design for Mobile Performance](https://blog.pixelfreestudio.com/how-to-optimize-motion-design-for-mobile-performance/) -- Mobile animation constraints (MEDIUM confidence)
- [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) -- Accessibility media query (HIGH confidence)
- [prefers-reduced-motion - web.dev](https://web.dev/articles/prefers-reduced-motion) -- Practical implementation guide (HIGH confidence)

### Preloading
- [Image Preloading in Next.js](https://medium.com/@thomasaugot/image-preloading-in-next-js-15-make-your-website-load-ultra-fast-6e3743d55606) -- Next.js-specific preloading strategies (MEDIUM confidence)
- [Next.js Lazy Loading Guide](https://nextjs.org/docs/app/guides/lazy-loading) -- Official dynamic import docs (HIGH confidence)

### Library Licensing
- [GSAP is Now Completely Free - CSS-Tricks](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- GSAP free licensing after Webflow acquisition (HIGH confidence)

### Design Inspiration
- [Cinematic Web Design - KOTA](https://kota.co.uk/blog/cinematic-web-design-crafting-digital-experiences-for-film-tv) -- Cinematic design principles (LOW confidence -- opinion piece)
- [Awwwards Animation Websites](https://www.awwwards.com/websites/animation/) -- Design references (LOW confidence -- gallery, not architecture)
- [Rebuild Awwwards Landing Page - Olivier Larose](https://blog.olivierlarose.com/tutorials/awwwards-landing-page) -- Next.js + GSAP + Framer Motion tutorial (MEDIUM confidence)

### Motion (Framer Motion)
- [Motion Timeline API](https://motion.dev/dom/timeline) -- Sequence and `at` parameter docs (HIGH confidence)
- [GSAP vs Motion Comparison](https://motion.dev/docs/gsap-vs-motion) -- Official feature comparison (HIGH confidence -- but note Motion's bias)
- [useAnimate Hook](https://motion.dev/docs/react-use-animate) -- Imperative animation control in React (HIGH confidence)

### Next.js Integration
- [Mastering GSAP in React with Next.js App Router](https://medium.com/@bharatnatrayn11/mastering-gsap-core-methods-in-react-with-next-js-app-router-289ffc4006b9) -- App Router patterns (MEDIUM confidence)
- [@gsap/react npm](https://www.npmjs.com/package/@gsap/react) -- Hook package documentation (HIGH confidence)

---
*Architecture research for: Cinematic auto-playing web sequence*
*Researched: 2026-02-12*
