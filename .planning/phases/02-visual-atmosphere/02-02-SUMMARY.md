---
phase: 02-visual-atmosphere
plan: 02
subsystem: ui
tags: [canvas, film-grain, requestAnimationFrame, performance, mobile-optimization]

# Dependency graph
requires:
  - phase: 02-01
    provides: "Dark cinematic palette with neon green accents and radial gradient background"
provides:
  - "Film grain canvas overlay with mobile-optimized rendering"
  - "Throttled rAF loop at ~15fps for battery-friendly animation"
  - "Pixelated image-rendering for sharp grain upscaling"
affects: [03-content-reveal, 04-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Canvas rendering at fractional resolution (1/4 desktop, 1/8 mobile) with CSS upscaling"
    - "rAF timestamp-based throttling for framerate control"

key-files:
  modified:
    - app/components/AnimatedBackground.tsx
    - app/globals.css

key-decisions:
  - "Grain alpha fixed at 12 per pixel (very subtle, cinematic not harsh)"
  - "Scale factor 4 (desktop) and 8 (mobile) for resolution reduction"
  - "15fps throttle — grain doesn't need 60fps, saves CPU/battery"
  - "image-rendering: pixelated keeps grain sharp despite low-res canvas"

patterns-established:
  - "Canvas performance pattern: render small, scale up with CSS pixelated"
  - "rAF throttle pattern: timestamp delta check before rendering"

# Metrics
duration: 1min
completed: 2026-02-12
---

# Phase 2 Plan 02: Film Grain Overlay Summary

**Organic film grain canvas at 1/4-1/8 resolution with 15fps throttle replacing harsh TV static**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-12T13:56:49Z
- **Completed:** 2026-02-12T13:57:54Z
- **Tasks:** 1 (checkpoint skipped per config)
- **Files modified:** 2

## Accomplishments
- Replaced binary black/white TV static with full grayscale range film grain
- Canvas renders at 1/4 (desktop) or 1/8 (mobile) resolution -- massive performance win
- Throttled animation from 60fps to ~15fps via rAF timestamp check
- Removed staticIntensity state and breathing useEffect (film grain has constant intensity)
- Removed setStaticIntensity calls from image flash sequence
- Added image-rendering: pixelated for sharp grain upscaling

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace TV static with film grain canvas** - `44e5ba8` (feat)

**Plan metadata:** pending (this commit)

## Files Created/Modified
- `app/components/AnimatedBackground.tsx` - Film grain rendering with throttled rAF, mobile resolution scaling
- `app/globals.css` - Added image-rendering: pixelated to .mystery-static

## Decisions Made
- Grain alpha = 12 per pixel (subtle cinematic texture, not harsh noise)
- Desktop scale factor = 4 (canvas ~480x270 on 1920x1080), mobile = 8 (~47x100 on 375x812)
- 15fps via rAF timestamp throttle -- grain doesn't need high framerate
- image-rendering: pixelated keeps individual grain pixels sharp when CSS scales up

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Visual atmosphere complete (dark palette + neon accents + film grain)
- Phase 3 (content reveal) can build on this foundation
- Image flash sequence preserved intact for Phase 3 replacement
- Reduced-motion experience unchanged (grain hidden via display: none)

---
*Phase: 02-visual-atmosphere*
*Completed: 2026-02-12*
