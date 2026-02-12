# Coding Conventions

**Analysis Date:** 2026-02-12

## Naming Patterns

**Files:**
- PascalCase for components: `Hero.tsx`, `Navigation.tsx`, `CookieConsent.tsx` (in `app/components/`)
- camelCase for utilities: `airtable.ts`, `cookies.ts` (in `lib/`)
- kebab-case for route directories: `contact-us/`, `privacy-policy/`, `user-terms/`
- `page.tsx` / `route.ts` for Next.js conventions

**Functions:**
- camelCase for all functions: `handleSubmit`, `handleChange`, `closeMenu`, `togglePreference`
- PascalCase for React components: `function Hero()`, `function Navigation()`

**Variables:**
- camelCase for state and locals: `formData`, `mobileMenuOpen`, `imageOpacity`
- UPPER_SNAKE_CASE for constants: `FLASH_IMAGES` (`app/page.tsx`), `TABLES` (`lib/airtable.ts`), `AIRTABLE_API_KEY`

**Types:**
- PascalCase for interfaces: `AirtableRecord`, `CookiePreferences`
- `interface` preferred over `type` for objects

## Code Style

**Formatting:**
- No Prettier configured (no `.prettierrc` file)
- 2-space indentation throughout
- Inconsistent quotes: single quotes in components (`app/components/*.tsx`), double quotes in some imports (`app/layout.tsx`)
- Semicolons required

**Linting:**
- ESLint with `.eslintrc.json`
- Extends `next/core-web-vitals`
- Custom rule: `react/no-unescaped-entities: off`

## Import Organization

**Order:**
1. React/Next.js framework imports (`'next/link'`, `'next/image'`, `'react'`)
2. External packages (`'swiper/react'`, `'lucide-react'`)
3. Internal modules (`'@/lib/airtable'`, `'@/lib/cookies'`)

**Path Aliases:**
- `@/*` maps to `./` (project root) - configured in `tsconfig.json`

## Error Handling

**Patterns:**
- try/catch at API route handler level
- `console.error()` for server-side error logging
- Generic error responses: `{ success: false, error: 'Server error' }`
- Frontend checks `response.ok` and `result.success`

**Error Types:**
- No custom error classes
- No error differentiation (all return same generic message)

## Logging

**Framework:**
- `console.log` / `console.error` only
- No structured logging library

**Patterns:**
- Analytics initialization logged: `console.log('Google Analytics initialized')` (`lib/cookies.ts`)
- API errors logged: `console.error('Error:', error)` (API routes)

## Comments

**When to Comment:**
- Section markers in utility files: `// Table names`, `// Submit to Airtable`
- CSS section dividers: `/* ================================= ... */` (`app/globals.css`)

**JSDoc/TSDoc:**
- Not used

**TODO Comments:**
- None found in codebase

## Function Design

**Size:**
- Form pages are large (177-250 lines) with form + UI combined
- Utility functions are small and focused (`lib/airtable.ts`, `lib/cookies.ts`)

**Parameters:**
- API functions use typed objects: `submitToAirtable(tableName: string, fields: Record<string, any>)`
- Event handlers follow React patterns: `handleChange(e: React.ChangeEvent<HTMLInputElement>)`

**Return Values:**
- API routes return `NextResponse.json()` with `{ success, ... }` or `{ success, error }`
- Utility functions return promises

## Module Design

**Exports:**
- Named exports for utilities: `export async function submitToAirtable()`
- Default exports for React components: `export default function Hero()`
- Constants exported with named exports: `export const TABLES = { ... }`

**Client/Server Split:**
- `'use client'` directive at top of interactive components (`app/page.tsx`, `app/components/CookieConsent.tsx`)
- Server components by default for layouts and static pages
- API routes are server-side only

---

*Convention analysis: 2026-02-12*
*Update when patterns change*
