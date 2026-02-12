# STREET Landing Page — Cinematic Mystery Teaser

## What This Is

A cinematic auto-playing teaser experience for the street.london homepage that builds mystery and tension around the upcoming STREET platform launch. Replaces the current underwhelming TV static page with a dark, atmospheric sequence that hooks visitors and converts them into waitlist signups.

## Core Value

Make every visitor feel like they've stumbled onto something they need to know more about — curiosity so strong they sign up before they even know what it is.

## Requirements

### Validated

- ✓ Marketing website with Next.js App Router — existing
- ✓ Form pages for waitlist, retailers, riders, doers, contact — existing
- ✓ Airtable integration for form submissions — existing
- ✓ Cookie consent with GA + FB Pixel — existing
- ✓ Navigation and footer components — existing

### Active

- [ ] Auto-playing cinematic sequence on homepage that builds tension like a movie trailer
- [ ] Dark & moody visual palette — deep blacks, subtle glows, neon accents, urban night feel
- [ ] Teaser-level content — clearly something launching in London, hints at local commerce, details withheld
- [ ] Integrated waitlist form as the climax — signing up feels like unlocking access, not filling out a form
- [ ] Optional atmospheric sound toggle that deepens the experience (works without sound)
- [ ] Mobile-responsive — cinematic feel must translate to phone screens

### Out of Scope

- Full site redesign — other pages (retailers, rider, doers, contact, privacy, terms) stay as they are
- Actual product reveals — no screenshots, feature lists, or explanations of what STREET does
- Video production — this is built with web technologies (CSS, canvas, WebGL), not pre-rendered video
- User accounts or authentication — this is a marketing teaser, not an app

## Context

- STREET is a multi-repo marketplace platform (backend, Shopify app, Flutter mobile apps, admin/vendor portals)
- The marketing site (this repo) is the public-facing teaser while the platform is being built
- Current homepage has a TV static canvas effect (`app/page.tsx`) that falls flat — no emotional hook, nothing to interact with, looks like a broken site rather than an intentional teaser
- Target audience likely Gen Z / young Londoners based on existing branding and imagery
- Existing waitlist form at `/waitlist` with Airtable submission works — needs to be integrated into the homepage experience rather than a separate page
- Site has ~2,600 lines of TypeScript, 8 components, 5 API routes — small, manageable codebase
- No test suite exists — changes should be careful but don't need to maintain test coverage

## Constraints

- **Tech stack**: Next.js 16, React 19, TypeScript — build within existing stack
- **No heavy dependencies**: Avoid large animation libraries if possible; prefer CSS animations, canvas, or lightweight solutions
- **Performance**: Cinematic experience must load fast and run smooth — no 10MB hero videos or janky scroll
- **Sound**: Must be click-to-enable or user-initiated (browser autoplay policies)
- **Accessibility**: Sound toggle must be visible; experience must be compelling even without sound
- **Airtable**: Waitlist submissions must continue flowing to existing Airtable base via existing API route

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cinematic tension over horror/thriller | Horror could alienate; cinematic tension is universally compelling | — Pending |
| Auto-playing sequence over scroll-driven | Scroll puts user in control too early; auto-play controls pacing for tension | — Pending |
| Homepage only, other pages untouched | Focused scope, other pages are functional and serve different audiences | — Pending |
| Optional sound, not required | Browser autoplay restrictions + accessibility; visual must stand alone | — Pending |
| Integrated waitlist as climax | Separate /waitlist page breaks the flow; signup should feel like the payoff | — Pending |

---
*Last updated: 2026-02-12 after initialization*
