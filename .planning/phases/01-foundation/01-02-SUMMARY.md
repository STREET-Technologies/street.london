---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [accessibility, prefers-reduced-motion, css-media-query, performance, eslint]

# Dependency graph
requires:
  - phase: 01-foundation/01
    provides: "Server-rendered homepage with AnimatedBackground client component"
provides:
  - prefers-reduced-motion CSS media query hiding canvas and flash images
  - JS-level reduced-motion detection skipping all animation loops
  - ESLint flat config for Next.js 16 with eslint-config-next
  - Performance baseline verification (build, types, lint, HTML)
affects: [02-atmosphere, 03-cinematic-sequence]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Belt-and-suspenders reduced-motion: CSS hides visuals immediately, JS prevents computation"
    - "window.matchMedia check at top of each useEffect for animation opt-out"

key-files:
  created:
    - eslint.config.mjs
  modified:
    - app/globals.css
    - app/components/AnimatedBackground.tsx
    - package.json

key-decisions:
  - "Used #0a0a0a for reduced-motion background (matches existing mystery-container #000 but slightly warmer)"
  - "Each useEffect gets its own matchMedia check rather than a shared state variable (simpler, no extra renders)"
  - "Fixed lint script from 'next lint' to 'eslint app/' since Next.js 16 removed the lint subcommand"

patterns-established:
  - "Reduced-motion pattern: CSS @media block at end of section styles + JS early-return in useEffects"
  - "ESLint config: eslint.config.mjs with CJS require for eslint-config-next"

# Metrics
duration: 4min
completed: 2026-02-12
---

# Phase 1 Plan 2: Reduced-Motion Accessibility Summary

**prefers-reduced-motion support via CSS media query (hide canvas/flash) and JS matchMedia checks (skip rAF/setInterval) plus ESLint config for Next.js 16**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-12T13:37:18Z
- **Completed:** 2026-02-12T13:41:01Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Users with prefers-reduced-motion see: dark background (#0a0a0a), STREET heading, "Something is coming." tagline, working waitlist form -- no animations
- CSS immediately hides canvas and flash images (no FOUC), JS prevents requestAnimationFrame and setInterval from starting (saves CPU/battery)
- Fixed broken ESLint setup: created eslint.config.mjs, updated lint script for Next.js 16 (which removed `next lint` subcommand)
- Verified performance baseline: build passes, TypeScript clean, HTML contains semantic content

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement prefers-reduced-motion support (CSS + JS)** - `f3aee3f` (feat)
2. **Task 2: Verify final performance and accessibility baseline** - `5580eec` (chore)

## Files Created/Modified
- `app/globals.css` - Added @media (prefers-reduced-motion: reduce) block hiding .mystery-static and .mystery-flash-image, setting solid dark background
- `app/components/AnimatedBackground.tsx` - Added window.matchMedia checks at top of all three useEffects (canvas render, breathing, image flash)
- `eslint.config.mjs` - New ESLint flat config using eslint-config-next
- `package.json` - Updated lint script from 'next lint' to 'eslint app/'

## Decisions Made
- Used `#0a0a0a` for reduced-motion background to match the existing dark aesthetic while being slightly warmer than pure black
- Each useEffect gets its own `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check rather than lifting to a shared state variable -- simpler, avoids extra re-renders, and each effect is independently correct
- No manual animation toggle added (that's INT-04, a v2 feature) -- this purely respects the OS-level accessibility setting

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created ESLint config and fixed lint script**
- **Found during:** Task 2 (Verify final performance baseline)
- **Issue:** `npm run lint` failed because Next.js 16 removed the `next lint` subcommand, and no eslint.config.mjs existed in the project
- **Fix:** Created `eslint.config.mjs` with eslint-config-next flat config, updated package.json lint script to `eslint app/`
- **Files modified:** eslint.config.mjs, package.json
- **Verification:** `npm run lint` now runs successfully (pre-existing warnings in legacy files only, plan-relevant files clean)
- **Committed in:** `5580eec` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix to make lint verification work. No scope creep.

## Issues Encountered

- Pre-existing lint errors in legacy files (CookieConsent.tsx, privacy-policy/page.tsx, user-terms/page.tsx) for unescaped entities and setState-in-effect. These are outside plan scope and do not affect the reduced-motion work.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 1 (Foundation) is now complete: PERF-01 (bundle), PERF-02 (LCP via server-rendered HTML), PERF-03 (reduced-motion), PERF-04 (meaningful HTML) all verified
- Reduced-motion pattern established for future animation work in Phase 2 (atmosphere) and Phase 3 (cinematic sequence)
- ESLint now works correctly for ongoing development

---
*Phase: 01-foundation*
*Completed: 2026-02-12*
