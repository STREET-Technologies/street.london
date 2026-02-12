# Research Summary

**Domain:** Cinematic mystery teaser / pre-launch hype landing page
**Researched:** 2026-02-12
**Overall Confidence:** MEDIUM-HIGH

---

## Executive Summary

Building a cinematic mystery teaser for STREET's pre-launch requires balancing two competing forces: **visual spectacle** and **conversion performance**. Research across stack, features, architecture, and pitfalls reveals a clear path: start with CSS-native animations (zero bundle cost), layer GSAP only if timeline complexity demands it (~29KB), and treat the referral-gated waitlist as the primary growth engine -- not the visual effects.

The biggest risk isn't technical. It's **mystery becoming confusion**. Every successful pre-launch campaign studied (Robinhood 1M, Harry's 100K/week, Clubhouse 10M) provided at least one concrete anchor. STREET must hint at *enough* -- London, local, something new -- without explaining the product.

---

## Key Findings

### Stack (STACK.md)

**Recommended approach: CSS-first, GSAP-if-needed**

| Layer | Technology | Bundle Impact |
|-------|-----------|---------------|
| Animation sequencing | CSS keyframes + `animation-delay` chaining | 0 KB |
| Complex orchestration (if needed) | GSAP 3.14.2 + @gsap/react 2.1.2 | ~29 KB |
| Ambient sound | Native Web Audio API | 0 KB |
| Sound fallback (if needed) | Howler.js 2.2.4 | ~7 KB |
| Film grain/noise | Canvas 2D (128px tiled) or CSS SVG filter | 0 KB |
| View transitions | React 19.2 native View Transitions | 0 KB |

**Critical note:** GSAP is now 100% free (Webflow acquisition). All plugins including SplitText and ScrollTrigger are included at no cost.

**Maximum total bundle impact: ~36 KB** (GSAP + Howler). Minimum: 0 KB (CSS + native APIs only).

### Features (FEATURES.md)

**What actually drives waitlist signups (proven):**

1. **Referral mechanics with queue position** -- #1 driver. Robinhood: 50%+ from referrals. Harry's: 77% from referrals.
2. **Single email field** -- Every additional field costs ~25-50% conversions.
3. **Social proof counter** -- "X people waiting" validates the decision.
4. **Clear value hint** -- Curiosity gap requires awareness of a gap. Must hint at *something*.
5. **Exclusivity-framed CTA** -- "Get Early Access" > "Sign Up" > "Submit".
6. **Fast page load** -- Every second costs ~5% conversion rate.

**What looks cool but doesn't directly convert:**

- Complex WebGL/3D scenes (impressive, heavy, no documented conversion lift)
- Ambient sound (memorable for ~5-10% who enable it)
- Easter eggs (sharing amplifier, not converter)
- Cursor animations (perceived quality, not signup driver)

**Anti-features to avoid:**

- Autoplay video (kills mobile performance)
- Multi-field forms (kills conversion)
- Full product explanation (kills mystery)
- Chatbot (kills mystique)
- Fake countdown timer (kills trust)

### Architecture (ARCHITECTURE.md)

**Three-layer system:**

1. **Presentation:** SceneRenderer, TextReveals, AtmosphericEffects, WaitlistCTA
2. **Orchestration:** SequenceDirector (GSAP master timeline), AudioManager, SceneRegistry, SequenceState (useReducer state machine)
3. **Data/Config:** Scene definitions as TypeScript config objects, asset manifest, localStorage persistence

**Key architectural decisions:**

- Scenes are **data, not components** -- single renderer interprets config objects
- **useReducer state machine** for sequence lifecycle (loading -> ready -> playing -> paused -> complete -> skipped)
- **Master GSAP timeline** with labeled scene segments for skip/replay/seek
- **Event-driven audio sync** (not frame-level) -- timeline fires callbacks at scene boundaries
- **Server/client split** -- page.tsx is server component (SEO), CinematicSequence is "use client"
- **Scene-lookahead preloading** -- preload first 1-2 scenes, then next scene during playback

### Pitfalls (PITFALLS.md)

**8 critical pitfalls ranked by severity:**

| # | Pitfall | Risk Level | Phase to Address |
|---|---------|------------|------------------|
| 1 | Page load time kills conversions (53% bounce >3s) | CRITICAL | Foundation |
| 2 | Mobile degradation (iOS Low Power Mode = 30fps) | HIGH | Foundation + Animation |
| 3 | Sound autoplay fails silently | HIGH | Sound |
| 4 | Mystery becomes confusion (no anchor = no conversion) | HIGH | Narrative |
| 5 | Accessibility violations (seizure risk, screen reader exclusion) | HIGH | Foundation |
| 6 | rAF memory leaks and canvas cleanup failures | MEDIUM | Foundation |
| 7 | Scroll hijacking destroys user control | MEDIUM | Animation |
| 8 | LCP/Core Web Vitals failure tanks SEO | MEDIUM | Foundation |

**Performance budgets (hard limits):**

| Metric | Target | Maximum |
|--------|--------|---------|
| Total JS (compressed) | <150 KB | 200 KB |
| LCP | <2.0s | 2.5s |
| FCP | <1.0s | 1.5s |
| CLS | <0.05 | 0.1 |
| Animation frame time | <12ms | 16.7ms |
| Lighthouse Performance | >90 | >80 min |
| Lighthouse Accessibility | >95 | >90 min |

---

## Roadmap Implications

### Suggested Phase Structure

**Phase 1: Foundation**
- Performance budget enforcement from day one
- `prefers-reduced-motion` hook and static fallback experience
- Server/client component boundary (page.tsx server, cinematic client)
- HTML structure ensuring good LCP independent of JS
- Animation lifecycle architecture (cleanup, memory management)
- Mobile-first responsive scaffolding

**Phase 2: Cinematic Sequence**
- Data-driven scene system (TypeScript configs, not hardcoded components)
- GSAP master timeline with scene segments (or CSS-only if complexity stays low)
- 3-act narrative structure: Mystery -> Tension -> Climax (waitlist)
- Text reveals, atmospheric effects (grain, gradients, neon accents)
- Skip/replay controls, returning visitor detection (localStorage)
- Mobile adaptation (30fps-safe, compositor-only properties)

**Phase 3: Waitlist & Growth Engine**
- Single-field email capture with exclusivity-framed CTA
- Queue position reveal on signup
- Referral link generation and sharing UI
- Social proof counter (waitlist count)
- Post-signup confirmation state (the conversion climax)
- Airtable integration for email storage

**Phase 4: Sound & Polish**
- Opt-in ambient audio (Web Audio API or Howler.js)
- Persistent sound toggle with clear visual state
- Micro-interactions (hover effects, CTA animation)
- Cross-browser testing and performance optimization
- Accessibility audit (WCAG 2.1 AA, PEAT testing)

**Phase 5: Growth Amplifiers (post-launch)**
- Referral reward tiers (Harry's model)
- Hidden easter eggs for social sharing
- Dynamic social proof notifications
- A/B testing CTA copy and form placement

### Critical Constraints

1. **Mobile is the primary target** -- Gen Z London audience, 70%+ mobile traffic expected
2. **Performance budget is non-negotiable** -- <150KB JS, <2.5s LCP, <3s total load on 4G
3. **Accessibility is non-negotiable** -- `prefers-reduced-motion`, skip controls, screen reader support, no seizure-triggering flashes
4. **Audio must be opt-in only** -- default muted, user gesture required, persistent toggle
5. **Mystery needs an anchor** -- "Something is coming to London" is the minimum. Pure abstraction = confusion, not curiosity.

---

## Confidence Assessment

| Research Area | Confidence | Gaps |
|---------------|-----------|------|
| Stack (libraries, versions, compatibility) | HIGH | GSAP bundle size is approximate (~28KB, not directly verified via bundlephobia) |
| Features (what drives signups) | HIGH | Campaign results are well-documented; direct applicability to STREET's London market is assumed |
| Architecture (patterns, structure) | HIGH | Patterns are well-established; specific Next.js 16.1.6 + React 19.2 integration may have minor quirks |
| Pitfalls (what goes wrong) | HIGH | Performance budgets are industry-standard; exact conversion impact depends on STREET's audience |

### What We Don't Know

- **STREET's actual audience behavior** -- all conversion data is from US/global campaigns. London Gen Z may differ.
- **Exact content/copy** -- research provides the structure (information gap, anchor, CTA framing) but not the words.
- **Audio asset availability** -- ambient sound requires actual audio files to be sourced or created.
- **Referral infrastructure** -- queue position and referral links require backend work beyond the current Airtable setup.

---

## Research Documents

| Document | Contents |
|----------|----------|
| [STACK.md](./STACK.md) | Libraries, versions, bundle sizes, implementation patterns, compatibility matrix |
| [FEATURES.md](./FEATURES.md) | Expected features, differentiators, anti-features, competitor analysis, psychology framework |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, component responsibilities, scene system, state management, data flow |
| [PITFALLS.md](./PITFALLS.md) | Critical pitfalls, performance budgets, UX traps, recovery strategies, "looks done but isn't" checklist |

---
*Research summary for: STREET Landing Page — Cinematic Mystery Teaser*
*Researched: 2026-02-12*
