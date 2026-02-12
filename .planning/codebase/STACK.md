# Technology Stack

**Analysis Date:** 2026-02-12

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code (`package.json`)

**Secondary:**
- CSS - Global styling (`app/globals.css`, 1,961 lines)

## Runtime

**Environment:**
- Node.js (no version pinned - no `.nvmrc` or `engines` field)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (lockfile v3)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router (`package.json`)
- React 19.2.0 - UI library (`package.json`)
- React DOM 19.2.0 - DOM rendering (`package.json`)

**Testing:**
- Not configured - no test framework installed

**Build/Dev:**
- TypeScript 5.9.3 - Type checking (`package.json`)
- ESLint 9.36.0 - Code linting (`package.json`, `.eslintrc.json`)
- eslint-config-next 16.1.6 - Next.js linting rules

## Key Dependencies

**Critical:**
- lucide-react 0.544.0 - Icon library (`app/components/CookieConsent.tsx`, form pages)
- Swiper 12.0.2 - Carousel/slider for image galleries (`app/components/Millie.tsx`)

**Infrastructure:**
- @types/node 24.6.2 - Node.js type definitions
- @types/react 19.2.0 - React type definitions
- @types/react-dom 19.2.0 - React DOM type definitions

## Configuration

**Environment:**
- `.env.local` for secrets (gitignored)
- `.env.example` template with required vars
- Key vars: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_FB_PIXEL_ID`

**Build:**
- `tsconfig.json` - Strict TypeScript, ES2017 target, path alias `@/*` -> `./*`
- `next.config.ts` - Minimal configuration (no custom options)
- `.eslintrc.json` - Extends `next/core-web-vitals`, disables `react/no-unescaped-entities`

## Platform Requirements

**Development:**
- Any platform with Node.js
- No external dependencies (no Docker, no local DB)

**Production:**
- Vercel (Next.js hosting) - implied by framework choice
- No explicit deployment configuration found

---

*Stack analysis: 2026-02-12*
*Update after major dependency changes*
