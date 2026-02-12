# Codebase Concerns

**Analysis Date:** 2026-02-12

## Tech Debt

**Duplicated form logic across 5 pages:**
- Issue: Same form submission pattern (fetch -> JSON -> setState), success state management, and success UI repeated in every form page
- Files: `app/waitlist/page.tsx`, `app/retailers/page.tsx`, `app/rider/page.tsx`, `app/doers/page.tsx`, `app/contact-us/page.tsx`
- Why: Each form built independently during rapid development
- Impact: Changes to form UX require updating 5 files; inconsistencies likely
- Fix approach: Extract reusable `FormPage` component or custom hook for form submission pattern

**Unsafe TypeScript (`any` types):**
- Issue: `Record<string, any>` used for Airtable fields, `(window as any)` for analytics scripts
- Files: `lib/airtable.ts` (lines 4, 13), `lib/cookies.ts` (lines 22-86)
- Why: Quick integration without defining proper types
- Impact: No compile-time validation of Airtable field names or analytics API
- Fix approach: Create typed interfaces for each Airtable table's fields; use proper type declarations for GA and FB Pixel

**Inconsistent quote style:**
- Issue: Mixed single and double quotes across files
- Files: Single quotes in `app/components/*.tsx`, `lib/*.ts`; double quotes in `app/layout.tsx`
- Why: No Prettier configured to enforce consistency
- Impact: Minor - visual inconsistency only
- Fix approach: Add `.prettierrc` with `singleQuote: true` and run formatter

## Known Bugs

No bugs identified during static analysis.

## Security Considerations

**No server-side input validation:**
- Risk: Form data sent directly to Airtable without validation; `data.communicationChannels.join(', ')` in `app/api/doers/route.ts` will crash if array is undefined
- Files: `app/api/waitlist/route.ts`, `app/api/retailers/route.ts`, `app/api/riders/route.ts`, `app/api/doers/route.ts`, `app/api/contact/route.ts`
- Current mitigation: HTML5 `required` attributes on frontend (client-side only, easily bypassed)
- Recommendations: Add Zod schemas to validate all POST request bodies at API route level

**Generic error responses hide issues:**
- Risk: All API errors return `{ success: false, error: 'Server error' }` - makes debugging production issues difficult
- Files: All `app/api/*/route.ts` files
- Current mitigation: `console.error()` logging (only visible in server logs)
- Recommendations: Add error tracking service (Sentry); differentiate 400 vs 500 errors

## Performance Bottlenecks

**TV static canvas animation:**
- Problem: Full-screen canvas animation running `Math.random()` per pixel per frame at ~30fps
- File: `app/page.tsx`
- Cause: Iterating over every pixel (innerWidth x innerHeight x 4 channels) each frame
- Improvement path: Pre-generate static noise texture, use WebGL, or reduce canvas resolution

## Fragile Areas

**Airtable integration (single point of failure):**
- File: `lib/airtable.ts`
- Why fragile: All form submissions depend on Airtable API availability; no retry logic, no fallback
- Common failures: Airtable rate limits (5 requests/sec), API key expiration, network timeouts
- Safe modification: Add retry logic with exponential backoff
- Test coverage: No tests

## Scaling Limits

**Airtable API rate limits:**
- Current capacity: 5 requests per second per base
- Limit: High traffic form submissions will hit 429 rate limit errors
- Symptoms at limit: Form submissions silently fail with generic error
- Scaling path: Add request queuing, or migrate to direct database (PostgreSQL)

## Dependencies at Risk

No dependencies at risk - small dependency footprint with actively maintained packages.

## Missing Critical Features

**No error tracking:**
- Problem: No Sentry or equivalent for production error visibility
- Current workaround: `console.error()` in server logs only
- Blocks: Cannot monitor form submission failures or frontend errors in production
- Implementation complexity: Low (add @sentry/nextjs)

**No test suite:**
- Problem: Zero test coverage across entire codebase
- Current workaround: Manual testing only
- Blocks: Cannot safely refactor or validate form submission logic
- Implementation complexity: Medium (setup Vitest + write tests for critical paths)

## Test Coverage Gaps

**All code untested:**
- What's not tested: Entire codebase - API routes, Airtable integration, cookie consent, form components
- Risk: Breaking changes go undetected; Airtable field mapping errors not caught
- Priority: High for `lib/airtable.ts` and API routes; Medium for components
- Difficulty to test: Low for utility functions; Medium for API routes (need request mocking)

## Documentation Gaps

**Outdated font README:**
- File: `public/fonts/README.md`
- Issue: References Flutter/pubspec.yaml instructions (irrelevant to Next.js project)
- Fix: Update with Next.js font usage instructions

---

*Concerns audit: 2026-02-12*
*Update as issues are fixed or new ones discovered*
