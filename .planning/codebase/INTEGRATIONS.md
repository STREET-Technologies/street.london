# External Integrations

**Analysis Date:** 2026-02-12

## APIs & External Services

**Airtable (Form Database & CRM):**
- Airtable - Collects and stores form submissions across five user types
  - SDK/Client: Custom REST wrapper in `lib/airtable.ts`
  - API: `https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}`
  - Auth: Bearer token via `AIRTABLE_API_KEY` env var
  - Tables: Waitlist, Retailers, Riders, Doers, Contact
  - Endpoints:
    - `app/api/waitlist/route.ts` - Waitlist form submissions
    - `app/api/retailers/route.ts` - Retailer partnership applications
    - `app/api/riders/route.ts` - Rider/courier signups
    - `app/api/doers/route.ts` - Ambassador signups
    - `app/api/contact/route.ts` - Contact form messages

**Payment Processing:**
- Not detected

**Email/SMS:**
- Not detected

## Data Storage

**Databases:**
- None local - Airtable serves as external data store via API

**File Storage:**
- Static assets in `public/img/` and `public/fonts/` (committed to repo)

**Caching:**
- Not detected

## Authentication & Identity

**Auth Provider:**
- Not applicable - marketing website with no user accounts

**OAuth Integrations:**
- Not detected

## Monitoring & Observability

**Error Tracking:**
- Not detected - no Sentry or equivalent configured

**Analytics:**
- Google Analytics - Performance metrics and user behavior tracking
  - Config: `NEXT_PUBLIC_GA_ID` env var
  - Script: `https://www.googletagmanager.com/gtag/js`
  - Integration: `lib/cookies.ts` - `initGA()` function
  - Consent-gated: Only loads when performance cookies accepted

- Facebook Pixel - Conversion tracking and ad attribution
  - Config: `NEXT_PUBLIC_FB_PIXEL_ID` env var
  - Script: `https://connect.facebook.net/en_US/fbevents.js`
  - Integration: `lib/cookies.ts` - `initFacebookPixel()` function
  - Consent-gated: Only loads when advertising cookies accepted

**Logs:**
- Console.log/console.error only (no structured logging service)

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured (implied Vercel from Next.js framework)

**CI Pipeline:**
- Not detected - no `.github/workflows/` or CI config files

## Environment Configuration

**Development:**
- Required env vars: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`
- Optional env vars: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_FB_PIXEL_ID`
- Secrets location: `.env.local` (gitignored)
- Template: `.env.example`

**Staging:**
- Not configured

**Production:**
- Secrets management: Not documented

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-02-12*
*Update when adding/removing external services*
