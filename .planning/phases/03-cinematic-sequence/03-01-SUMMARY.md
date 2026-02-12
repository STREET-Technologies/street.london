---
phase: 03-cinematic-sequence
plan: 01
status: complete
started: 2026-02-12
completed: 2026-02-12
duration: ~25 min (includes creative direction iteration)

commits:
  - 393f535: "feat(03-01): create CinematicSequence component with timed reveals"
  - 15fc457: "feat(03-01): add CSS keyframe animations for cinematic sequence beats"
  - c063c13: "fix(03-01): increase tagline visibility from 50% to 85% opacity"
  - cdbcd9e: "feat(03-01): pain-point cinematic sequence with escalating delivery beats"
  - 201c4eb: "fix(03-01): bigger, bolder pain-point taglines for more visual weight"
  - 7764b7c: "fix(03-01): grain scale consistency and bold tagline"
  - a3c076e: "fix(03-01): form width — explicit width on reveal wrapper"
  - 867ec0e: "fix(03-01): static grain, uniform scale, soft edges"

files_modified:
  - app/components/CinematicSequence.tsx (created)
  - app/components/AnimatedBackground.tsx (modified)
  - app/page.tsx (modified)
  - app/globals.css (modified)

deviations:
  - type: creative_direction
    description: "Original plan had 3-beat logo→tagline→form sequence. User pivoted to 7-beat pain-point escalation: '3-day delivery.' → 'Next-day delivery.' → 'Same-day delivery.' → 'Not fast enough.' → STREET → 'Coming to London.' → form"
  - type: visual_tuning
    description: "Film grain changed from animated 15fps to static single-render. Scale unified to 4 across all devices. image-rendering switched from pixelated to auto for softer grain."
  - type: visual_tuning
    description: "Tagline made bold (font-weight 700) and pain-point lines bumped to 1.5rem with full white color for better visibility against neon glow"
---

# Summary: Cinematic Sequence (03-01)

## What Was Built

7-beat cinematic sequence that auto-plays for first-time visitors:

1. **0.8s** — "3-day delivery." fades in and out
2. **2.5s** — "Next-day delivery." replaces it
3. **4.2s** — "Same-day delivery." replaces it
4. **5.9s** — "Not fast enough." (larger, bolder) replaces it
5. **8.0s** — STREET logo fades in with neon glow
6. **9.5s** — "Coming to London." fades in below
7. **10.3s** — Waitlist form (name + email + ENTER) fades in

Returning visitors skip straight to brand + form. Reduced-motion users see everything immediately.

## Key Decisions

- Pain-point copy over pure mystery — articulates the delivery frustration before revealing the brand
- Static film grain over animated — grungy texture without motion-induced headaches
- CSS-only animation timing via `animation-delay` + `forwards` fill mode — no JS timers for beats
- Two keyframe types: `beatInOut` (lines that appear and disappear) and `beatIn` (elements that stay)
- Absolute positioning for pain-point lines to overlap in same center position

## Verification

All 5 must-haves verified against codebase. See 03-VERIFICATION.md.
