# Requirements: STREET Landing Page — Cinematic Mystery Teaser

**Defined:** 2026-02-12
**Core Value:** Make every visitor feel like they've stumbled onto something they need to know more about — curiosity so strong they sign up before they even know what it is.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Visual Atmosphere

- [x] **VIS-01**: Homepage displays a dark cinematic aesthetic with deep blacks, subtle glows, and neon accents
- [x] **VIS-02**: Animated film grain/noise overlay covers the viewport (Canvas 2D or CSS SVG, low opacity, non-interactive)
- [x] **VIS-03**: Visual atmosphere works on mobile screens without performance degradation

### Cinematic Sequence

- [x] **SEQ-01**: Homepage auto-plays a timed cinematic sequence that builds tension across multiple beats
- [x] **SEQ-02**: Sequence includes a clear value hint anchored to London (e.g. "Something is coming to London") without explaining the product
- [ ] **SEQ-03**: Sequence culminates with the waitlist form appearing as the climax/payoff
- [x] **SEQ-04**: Returning visitors (detected via localStorage) skip the sequence and see the waitlist form directly

### Waitlist Capture

- [ ] **WL-01**: Existing email capture form is integrated into the homepage cinematic experience
- [ ] **WL-02**: Form submissions continue flowing to Airtable via existing API route
- [ ] **WL-03**: Form uses exclusivity-framed CTA copy (e.g. "Get Early Access" not "Submit")

### Performance & Accessibility

- [x] **PERF-01**: Total JavaScript bundle stays under 150KB compressed (200KB hard max)
- [x] **PERF-02**: Page achieves LCP under 2.5 seconds on throttled 4G
- [x] **PERF-03**: Users with `prefers-reduced-motion` see an elegant static fallback (not broken/blank)
- [x] **PERF-04**: Meaningful HTML text renders in the DOM for SEO and screen readers (not canvas-only)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Growth Engine

- **GROW-01**: Social proof counter showing waitlist size near CTA
- **GROW-02**: Queue position revealed after signup
- **GROW-03**: Unique referral link generated per signup
- **GROW-04**: Referral reward tiers (Harry's model: 5/10/25 referrals = rewards)

### Interactions & Polish

- **INT-01**: Micro-interactions on CTA (hover effects, subtle animations)
- **INT-02**: Custom cursor effects
- **INT-03**: Hidden easter eggs (Konami code, clickable secrets)
- **INT-04**: Skip/replay controls for the cinematic sequence

### Sound Design

- **SND-01**: Opt-in ambient audio with persistent toggle
- **SND-02**: Audio cues synced to scene transitions

### Visual Enhancements

- **VIS-04**: CSS glitch/static transition effects
- **VIS-05**: Anti-corporate raw typography aesthetic
- **VIS-06**: Temporal urgency cues (glitching date)

### Architecture

- **ARCH-01**: Data-driven scene system (scenes as TypeScript config objects)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Autoplay background video | Kills mobile performance, requires video production |
| Multi-field signup form | Every extra field costs ~25-50% conversions |
| Full product explanation | Destroys the mystery; information gap is the conversion driver |
| Complex WebGL/3D scenes | 100KB+ library, poor mobile performance, overkill |
| Chatbot / live chat | Undermines mystique of a mystery page |
| Fake countdown timer | Gen Z distrust performative urgency; 67% conversion decrease in some tests |
| Social media feed embed | Pulls attention from CTA, slows load, looks corporate |
| Scroll hijacking | Destroys user control, accessibility nightmare |
| Full site redesign | Other pages stay as-is; homepage only |
| User accounts / authentication | Marketing teaser, not an app |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PERF-01 | Phase 1 | Complete |
| PERF-02 | Phase 1 | Complete |
| PERF-03 | Phase 1 | Complete |
| PERF-04 | Phase 1 | Complete |
| VIS-01 | Phase 2 | Complete |
| VIS-02 | Phase 2 | Complete |
| VIS-03 | Phase 2 | Complete |
| SEQ-01 | Phase 3 | Complete |
| SEQ-02 | Phase 3 | Complete |
| SEQ-04 | Phase 3 | Complete |
| SEQ-03 | Phase 4 | Pending |
| WL-01 | Phase 4 | Pending |
| WL-02 | Phase 4 | Pending |
| WL-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---
*Requirements defined: 2026-02-12*
*Last updated: 2026-02-12 after Phase 3 completion*
