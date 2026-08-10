---
name: street.london
description: Marketing site for STREET — London's high street, delivered.
colors:
  primary: "#c6ff00"
  black: "#000000"
  white: "#ffffff"
  cream: "#fdfbf7"
  sand: "#f7f3ed"
  gray: "#a4a3a8"
  gray-light: "#f5f5f5"
  gray-dark: "#666666"
  terracotta: "#e8d5c4"
  sage: "#dce5dc"
  error: "#c62828"
typography:
  display:
    fontFamily: "Hanson, Arial Black, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.2
  headline:
    fontFamily: "Hanson, Arial Black, sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 1.85rem)"
    fontWeight: 800
  tagline:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "1rem 2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.black}"
  form-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "3rem"
  pill-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.25rem"
  pill-button-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.black}"
---

# Design System: street.london

## Overview

**Creative North Star: "The High Street, Signposted"**

The site borrows its grammar from street furniture and wayfinding: black signage tiles with lime numerals, route spines that walk you shop by shop, breadcrumbs, and one loud lime accent that works like a painted kerb line. Everything sits on a warm cream ground with white surfaces floating gently above it — bold but friendly, chunky display type softened by rounded corners and pill shapes.

Density is generous and editorial. Pages are single-column stories (guides cap at an 820px container) inside a 1280px site frame, with centered heroes on every subpage. The system is deliberately small: one display face, one body face, one accent, three shadows.

**Key Characteristics:**
- Warm cream ground, white cards, black ink, lime signal
- Hanson display type used sparingly and always in charge
- Wayfinding motifs: numbered black waypoint tiles, route spines, breadcrumbs
- Soft ambient shadows; no borders doing depth work

## Colors

A near-monochrome ink-on-cream palette with a single electric accent.

### Primary
- **Street Lime** (`--primary`): the brand signal. Button hover fills, waypoint numerals, link underlines, benefit pills, input focus borders. Never body text — it fails contrast on light grounds; it lives on black or as a fill behind black text.

### Neutral
- **Ink Black** (`--black`): all headings, body-emphasis, primary button fill, waypoint tiles.
- **Morning Cream** (`--cream`): the page ground everywhere, and the nav bar at 98% opacity over blur.
- **Gallery White** (`--white`): every raised surface — form cards, guide content, nav CTA text.
- **Warm Sand** (`--sand`): tinted panels inside white surfaces (guide CTA block).
- **Slate** (`--gray-dark`): the only gray for text on light grounds (5.7:1 on white). `--gray` is decorative-only (never for text below ~19px).
- **Mist** (`--gray-light`): input borders, route spines, dividers.

### Tertiary
- **Terracotta / Sage** (`--terracotta`, `--sage`): reserved warm-tint accents from the shopping palette; currently near-unused. Don't expand their role without a decision.
- **Signal Red** (`--error`): inline form errors only.

### Named Rules
**The Kerb Line Rule.** Lime is a signal, not a surface. It appears on interaction (hover, focus, active pill), on waypoints, and on small brand marks — never as large fills behind text blocks and never as text on cream/white.

## Typography

**Display Font:** Hanson Bold (with Arial Black fallback), self-hosted, weight 800 only
**Body Font:** Barlow (400/500/600/700)

**Character:** A hard-edged, extended display face doing signage duty over a tall, friendly grotesque. The contrast between Hanson's shout and Barlow's calm is the voice of the site.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 5vw, 3.5rem)`, lh 1.2): the `page-title` on every subpage hero. Mixed case, centered, black. One per page.
- **Headline** (800, `clamp(1.4rem, 3vw, 1.85rem)`): section h2s inside guide content.
- **Tagline** (600, `clamp(1.125rem, 2.5vw, 1.5rem)`, slate): the `page-tagline` h2 directly under a page title.
- **Body** (400, 1rem, lh 1.7–1.8, slate): article and supporting copy, capped at 68ch in guides.
- **Label** (600, 0.95rem, black): form labels and nav links.

### Named Rules
**The One Shout Rule.** Hanson appears only where it leads: page titles, section headings, the logo, waypoint numerals, pull-quote marks. Never for paragraphs, labels, or buttons.

## Layout

Site frame is a 1280px `.container` with 2rem side padding. Guide pages narrow the same container to 820px for reading; heroes cap at 800px. Every subpage opens with the shared `page-hero` (breadcrumb where applicable, title, tagline, subtitle — all centered), offset from the fixed nav by the single `--page-top` token (120px desktop, 100px ≤768px). Forms are centered single-column cards (600px waitlist, 800px multi-field). Body copy holds a 62–68ch measure. Spacing rhythm is rem-based and roomy: 3rem card padding (1.75–2rem mobile), 2.5–2.75rem between guide sections.

## Elevation & Depth

Soft ambient lift. The cream ground is flat; white surfaces float on very diffuse, low-opacity shadows and depth never comes from borders or hard lines. The fixed nav adds a 12px backdrop blur over cream instead of a shadow.

### Shadow Vocabulary
- **Whisper** (`--shadow-sm`: `0 2px 12px rgba(0,0,0,0.04)`): resting content surfaces (guide article card).
- **Lift** (`--shadow-md`: `0 8px 24px rgba(0,0,0,0.06)`): form cards; button hover.
- **Float** (`--shadow-lg`: `0 16px 48px rgba(0,0,0,0.08)`): large feature surfaces only.

### Named Rules
**The No Outline Rule.** Cards never take borders. If a surface needs separation from white, it gets a sand tint or a shadow step, not a stroke.

## Shapes

Two radius steps and a pill. Interactive rectangles (buttons, inputs) sit at 8px; containers (cards, images, tinted panels) at 12px; anything token-like (category pills, benefit chips, "soon" tags) goes full pill. Waypoint tiles are the one deliberate exception: sharp-cornered black squares, because they read as signage. No other sharp corners, no oversized radii.

## Components

### Buttons
- **Shape:** gently rounded (8px)
- **Primary:** black fill, white Barlow 600 text, `1rem 2.5rem` padding; `.btn-large` steps up to `1.25rem 3rem`
- **Hover:** fills Street Lime with black text, lifts 1px with the Lift shadow
- **Disabled:** 60% opacity, no lift, `not-allowed` cursor — used with a "Submitting…" label during async submits
- **Secondary:** white 2px outline, 15% white glass fill with 10px blur — dark/photo backgrounds only

### Chips
- **Style:** pill (50px), white fill, 2px Mist border, Barlow 500
- **State:** hover borders lime over cream; active fills Street Lime with black 600 text

### Cards / Containers
- **Corner Style:** 12px
- **Background:** white on cream; sand for nested tinted panels
- **Shadow Strategy:** Whisper at rest for content, Lift for forms (see Elevation)
- **Border:** none, ever
- **Internal Padding:** 3rem desktop, 1.75–2rem mobile

### Inputs / Fields
- **Style:** white fill, 2px Mist border, 8px radius, `0.875rem 1rem` padding
- **Focus:** border turns Street Lime, no outline ring
- **Error:** inline `.form-error` line in Signal Red above the submit button, `role="alert"`

### Navigation
- Fixed full-width bar: cream at 98% over 12px blur, 1px bottom hairline (6% black). Hanson logo left; Barlow 500 links right; solid black pill-adjacent CTA ("Join the Waitlist"). Mobile collapses to a full-screen overlay menu.

### Route Walk (signature)
The guide walk list: a 2px Mist spine that stops short of both ends, with numbered waypoints — sharp black tiles carrying lime Hanson numerals. Stops are name (Barlow 700) + address tag (0.8rem Slate) + note (0.95rem, 60ch). Numbering is real sequence only; never decorative.

## Do's and Don'ts

### Do:
- **Do** start every subpage with the shared `page-hero` block (`page-title` + `page-tagline` + `page-subtitle`) and let `--page-top` handle nav clearance — never hardcode top padding on a page shell.
- **Do** put lime on black (or black on lime) exclusively; check any new text/background pair against 4.5:1.
- **Do** use Slate (`--gray-dark`) for all secondary text on light grounds; `--gray` is decorative only.
- **Do** give every form submit a disabled/loading state and an inline `.form-error` — no `alert()`.

### Don't:
- **Don't** create a new hero, title, or form-card style per page; extend the shared classes in `globals.css` (one source of truth is a hard project rule).
- **Don't** use gradient text, side-stripe borders, or bordered cards — all previously shipped and deliberately removed.
- **Don't** set Hanson below ~1.4rem or use it for running text; it collapses at small sizes.
- **Don't** publish delivery-time claims in any copy surface (CAP Code 3.7 — the slogan is "Delivered", no minute numbers).
