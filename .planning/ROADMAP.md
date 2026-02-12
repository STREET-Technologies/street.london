# Roadmap: STREET Landing Page — Cinematic Mystery Teaser

## Overview

Replace the current underwhelming TV static homepage with a cinematic mystery teaser that builds tension and converts curiosity into waitlist signups. Four phases: lay performance/accessibility foundations, build the dark visual atmosphere, orchestrate the timed cinematic sequence, then wire the waitlist form as the climactic payoff.

## Phases

- [x] **Phase 1: Foundation** - Performance-safe, accessible page structure ready for cinematic content
- [x] **Phase 2: Visual Atmosphere** - Dark cinematic mood that feels intentional and immersive
- [ ] **Phase 3: Cinematic Sequence** - Auto-playing timed experience that builds tension and curiosity
- [ ] **Phase 4: Waitlist Integration** - Curiosity converts to email signups through existing Airtable pipeline

## Phase Details

### Phase 1: Foundation
**Goal**: Performance-safe, accessible page structure ready for cinematic content
**Depends on**: Nothing (first phase)
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04
**Success Criteria** (what must be TRUE):
  1. Homepage renders meaningful HTML text (visible in view-source) within 2.5s LCP
  2. Users with `prefers-reduced-motion` see a complete static experience (not blank/broken)
  3. JS bundle stays under 150KB compressed (verified via `next build` output)
  4. Page scores >80 on Lighthouse Performance (mobile)
**Research**: Unlikely (established Next.js patterns, standard CSS/HTML)
**Plans**: 2/2 complete

Plans:
- [x] 01-01: Server/client component boundary, page structure, performance baseline
- [x] 01-02: Reduced-motion fallback experience with static waitlist view

### Phase 2: Visual Atmosphere
**Goal**: Dark cinematic mood that feels intentional and immersive
**Depends on**: Phase 1
**Requirements**: VIS-01, VIS-02, VIS-03
**Success Criteria** (what must be TRUE):
  1. Homepage displays dark cinematic aesthetic with deep blacks, subtle glows, and neon accents
  2. Animated film grain overlay is visible and subtle (not distracting, not performance-killing)
  3. Visual atmosphere renders correctly on mobile screens without frame drops
**Research**: Unlikely (CSS animations + Canvas 2D patterns covered by project research)
**Plans**: 2/2 complete

Plans:
- [x] 02-01: Dark cinematic palette, layout, and neon accent styling
- [x] 02-02: Animated film grain overlay (Canvas 2D or CSS SVG) with mobile optimization

### Phase 3: Cinematic Sequence
**Goal**: Auto-playing timed experience that builds tension and curiosity
**Depends on**: Phase 2
**Requirements**: SEQ-01, SEQ-02, SEQ-04
**Success Criteria** (what must be TRUE):
  1. Homepage auto-plays a multi-beat timed sequence that builds tension (not a single static reveal)
  2. Sequence communicates "something is coming to London" without explaining what STREET is
  3. Returning visitors (localStorage) skip the sequence and see the waitlist form directly
**Research**: Unlikely (animation sequencing patterns covered by project research)
**Plans**: TBD

Plans:
- [ ] 03-01: Timed animation sequence with CSS keyframes or GSAP timeline
- [ ] 03-02: Narrative content, text reveals, and returning visitor detection

### Phase 4: Waitlist Integration
**Goal**: Curiosity converts to email signups through existing Airtable pipeline
**Depends on**: Phase 3
**Requirements**: SEQ-03, WL-01, WL-02, WL-03
**Success Criteria** (what must be TRUE):
  1. Waitlist form appears as the climax/payoff of the cinematic sequence
  2. Email submissions successfully reach Airtable via existing API route
  3. CTA uses exclusivity framing ("Get Early Access" or similar, not "Submit")
**Research**: Unlikely (reusing existing form and API route)
**Plans**: TBD

Plans:
- [ ] 04-01: Integrate existing waitlist form as sequence climax with exclusivity CTA

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-02-12 |
| 2. Visual Atmosphere | 2/2 | Complete | 2026-02-12 |
| 3. Cinematic Sequence | 0/2 | Not started | - |
| 4. Waitlist Integration | 0/1 | Not started | - |
