# Codebase Structure

**Analysis Date:** 2026-02-12

## Directory Layout

```
street.london/
├── app/                          # Next.js App Router (primary codebase)
│   ├── api/                      # API route handlers
│   │   ├── waitlist/route.ts
│   │   ├── retailers/route.ts
│   │   ├── riders/route.ts
│   │   ├── doers/route.ts
│   │   └── contact/route.ts
│   ├── components/               # Reusable React components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Join.tsx
│   │   ├── Millie.tsx
│   │   ├── Footer.tsx
│   │   └── CookieConsent.tsx
│   ├── waitlist/page.tsx         # Waitlist signup form
│   ├── retailers/page.tsx        # Retailer partnership form
│   ├── rider/page.tsx            # Rider recruitment form
│   ├── doers/page.tsx            # Ambassador signup form
│   ├── contact-us/page.tsx       # Contact form
│   ├── privacy-policy/page.tsx   # Privacy policy (static)
│   ├── user-terms/page.tsx       # Terms & conditions (static)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage (TV static mystery)
│   └── globals.css               # Global CSS (1,961 lines)
├── lib/                          # Utility libraries
│   ├── airtable.ts               # Airtable API client
│   └── cookies.ts                # Cookie consent & analytics init
├── public/                       # Static assets
│   ├── img/                      # Marketing images
│   └── fonts/                    # Custom fonts (Hanson, Barlow)
├── docs/                         # Documentation
│   └── setup/                    # Setup guides
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── .env.example                  # Environment variable template
├── .env.local                    # Local secrets (gitignored)
└── .eslintrc.json                # ESLint configuration
```

## Directory Purposes

**app/**
- Purpose: All application code (Next.js App Router)
- Contains: Pages, components, API routes, global styles, root layout
- Key files: `layout.tsx` (root), `page.tsx` (homepage), `globals.css`

**app/api/**
- Purpose: Server-side API route handlers for form submissions
- Contains: One route per form type (`route.ts` files)
- Key files: `waitlist/route.ts`, `retailers/route.ts`, `riders/route.ts`, `doers/route.ts`, `contact/route.ts`

**app/components/**
- Purpose: Shared React components used across pages
- Contains: PascalCase `.tsx` component files
- Key files: `Navigation.tsx`, `Footer.tsx`, `CookieConsent.tsx`, `Hero.tsx`

**lib/**
- Purpose: Utility functions and external service wrappers
- Contains: TypeScript modules for Airtable and cookie management
- Key files: `airtable.ts` (API client), `cookies.ts` (consent + analytics)

**public/img/**
- Purpose: Marketing images, carousel assets, hero backgrounds
- Contains: PNG images for homepage sections and forms

**public/fonts/**
- Purpose: Custom font files
- Contains: Hanson and Barlow font files

**docs/**
- Purpose: Project documentation
- Contains: Setup guides for services like Airtable

## Key File Locations

**Entry Points:**
- `app/layout.tsx` - Root layout (HTML, fonts, metadata, CookieConsent)
- `app/page.tsx` - Homepage with TV static mystery landing

**Configuration:**
- `tsconfig.json` - TypeScript config (strict, `@/*` alias)
- `next.config.ts` - Next.js config (minimal)
- `.eslintrc.json` - ESLint rules
- `.env.example` - Environment variable template
- `package.json` - Dependencies and scripts

**Core Logic:**
- `lib/airtable.ts` - Airtable API wrapper (all form submissions)
- `lib/cookies.ts` - Cookie consent, GA init, FB Pixel init

**Form Pages:**
- `app/waitlist/page.tsx` - Waitlist signup
- `app/retailers/page.tsx` - Retailer application
- `app/rider/page.tsx` - Rider signup
- `app/doers/page.tsx` - Ambassador signup
- `app/contact-us/page.tsx` - Contact form

**Static Content:**
- `app/privacy-policy/page.tsx` - Privacy policy
- `app/user-terms/page.tsx` - Terms & conditions

**Testing:**
- No test files or test configuration present

## Naming Conventions

**Files:**
- PascalCase for components: `Navigation.tsx`, `CookieConsent.tsx`, `Millie.tsx`
- camelCase for utilities: `airtable.ts`, `cookies.ts`
- `page.tsx` for Next.js pages (framework convention)
- `route.ts` for API routes (framework convention)

**Directories:**
- kebab-case for route directories: `contact-us/`, `privacy-policy/`, `user-terms/`
- lowercase for non-route directories: `app/`, `lib/`, `public/`, `docs/`
- Plural for collections: `components/`

**Special Patterns:**
- `app/api/{resource}/route.ts` for API endpoints
- `app/{route-name}/page.tsx` for page routes

## Where to Add New Code

**New Form/Page:**
- Page: `app/{page-name}/page.tsx`
- API route: `app/api/{resource}/route.ts`
- Add table name to `TABLES` in `lib/airtable.ts`

**New Component:**
- Implementation: `app/components/{ComponentName}.tsx`
- Import in page with `@/app/components/{ComponentName}`

**New Utility:**
- Implementation: `lib/{utility-name}.ts`
- Import with `@/lib/{utility-name}`

**New Static Content Page:**
- Implementation: `app/{page-name}/page.tsx`
- Add link in `app/components/Navigation.tsx` and/or `app/components/Footer.tsx`

## Special Directories

**public/**
- Purpose: Static assets served at root URL
- Source: Committed to repo
- Committed: Yes

**node_modules/**
- Purpose: npm dependencies
- Source: Generated by `npm install`
- Committed: No (in `.gitignore`)

**.next/**
- Purpose: Next.js build output
- Source: Generated by `npm run build`
- Committed: No (in `.gitignore`)

---

*Structure analysis: 2026-02-12*
*Update when directory structure changes*
