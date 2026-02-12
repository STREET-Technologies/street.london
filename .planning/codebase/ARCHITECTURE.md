# Architecture

**Analysis Date:** 2026-02-12

## Pattern Overview

**Overall:** Static Marketing Website with Form Collection Backend

**Key Characteristics:**
- Next.js App Router with hybrid client/server rendering
- Stateless request-driven form collection
- External data persistence via Airtable API
- Consent-driven analytics loading
- No local database or user sessions

## Layers

**Presentation Layer:**
- Purpose: Render marketing pages, forms, and interactive UI
- Contains: React components, page routes, client-side state management
- Location: `app/components/*.tsx`, `app/*/page.tsx`
- Depends on: Next.js framework, CSS styling
- Used by: End users via browser

**API Layer:**
- Purpose: Receive form POST requests, normalize data, delegate to external services
- Contains: Next.js API route handlers
- Location: `app/api/*/route.ts`
- Depends on: Integration layer (`lib/airtable.ts`)
- Used by: Presentation layer via fetch

**Integration Layer:**
- Purpose: Communicate with external services (Airtable, GA, FB Pixel)
- Contains: API client wrappers, cookie/consent management
- Location: `lib/airtable.ts`, `lib/cookies.ts`
- Depends on: Environment variables, external APIs
- Used by: API layer, Presentation layer (cookies)

**Static Assets Layer:**
- Purpose: Serve images, fonts, and other static content
- Contains: Marketing images, custom fonts
- Location: `public/img/`, `public/fonts/`
- Depends on: Nothing
- Used by: Presentation layer

## Data Flow

**Form Submission (e.g., Waitlist Signup):**

1. User fills form on page (`app/waitlist/page.tsx`)
2. Client-side state managed via `useState`
3. Form submit triggers `fetch('/api/waitlist', { method: 'POST', body: JSON })`
4. API route handler (`app/api/waitlist/route.ts`) receives request
5. Handler calls `submitToAirtable(TABLES.WAITLIST, fields)` from `lib/airtable.ts`
6. `submitToAirtable` sends POST to Airtable REST API with Bearer auth
7. Response returned to frontend
8. UI shows success state or error message

**Analytics Loading:**

1. User visits page, `CookieConsent` component renders
2. User accepts cookies via consent banner
3. Preferences saved to localStorage via `lib/cookies.ts`
4. `applyCookiePreferences()` checks preferences
5. If performance accepted: loads Google Analytics script
6. If advertising accepted: loads Facebook Pixel script

**State Management:**
- Component-level: React `useState` for form data and UI state
- No external state management (no Redux, Zustand, Context)
- Cookie preferences: localStorage

## Key Abstractions

**submitToAirtable():**
- Purpose: Central Airtable API communication
- Location: `lib/airtable.ts`
- Pattern: Async function with Bearer auth, error handling
- Used by: All 5 API route handlers

**CookiePreferences:**
- Purpose: Privacy-first tracking consent management
- Location: `lib/cookies.ts`
- Pattern: Interface with `necessary`, `performance`, `advertising` booleans
- Used by: `app/components/CookieConsent.tsx`

**Form Page Pattern:**
- Purpose: Standardized form + submission + success state
- Location: All page routes (`waitlist`, `retailers`, `rider`, `doers`, `contact-us`)
- Pattern: `useState` for formData + submitted flag, fetch POST on submit

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every page load
- Responsibilities: HTML structure, Barlow font loading, metadata, CookieConsent wrapper

**Homepage:**
- Location: `app/page.tsx`
- Triggers: Root URL visit
- Responsibilities: TV static mystery landing page with canvas animation

**Form Pages:**
- Location: `app/waitlist/page.tsx`, `app/retailers/page.tsx`, `app/rider/page.tsx`, `app/doers/page.tsx`, `app/contact-us/page.tsx`
- Triggers: Route navigation
- Responsibilities: Render form, handle submission, show success

**API Routes:**
- Location: `app/api/waitlist/route.ts`, `app/api/retailers/route.ts`, `app/api/riders/route.ts`, `app/api/doers/route.ts`, `app/api/contact/route.ts`
- Triggers: POST requests from form pages
- Responsibilities: Parse JSON, call Airtable, return response

## Error Handling

**Strategy:** try/catch at API route level, generic error responses to client

**Patterns:**
- API routes: try/catch wrapping entire handler, `console.error()` for logging
- All errors return `{ success: false, error: 'Server error' }` (no error differentiation)
- Frontend: checks `response.ok` and `result.success`, shows alert on failure

## Cross-Cutting Concerns

**Logging:**
- `console.log` / `console.error` only (no structured logging)
- Analytics initialization logged to console (`lib/cookies.ts`)

**Validation:**
- HTML5 `required` attributes on form inputs (client-side only)
- No server-side validation on API routes

**Privacy/Consent:**
- Cookie consent banner (`app/components/CookieConsent.tsx`)
- Preference-gated analytics loading (`lib/cookies.ts`)
- Three categories: necessary (always on), performance (GA), advertising (FB Pixel)

---

*Architecture analysis: 2026-02-12*
*Update when major patterns change*
