# Mysterious Landing Page Design

## Overview

Replace the current homepage with a mysterious, cinematic landing page that builds anticipation. The main site remains hidden. Users enter name + email to join the waitlist and receive a cryptic confirmation.

## Visual Design

### Layout
- Full viewport black background
- STREET logo centered (Hanson Bold, white)
- TV static overlay (animated, semi-transparent)
- Image flashes behind static layer
- Minimal form below logo

### Visual Layers (back to front)
1. Solid black base (`#000000`)
2. Flashing images (full-bleed glimpses)
3. TV static/noise overlay (5-15% opacity, pulsing)
4. STREET logo (always visible, static position)
5. Form fields

### Color Palette
- Background: `#000000`
- Logo: `#ffffff`
- Form inputs: `#1a1a1a` with subtle border
- Submit button: `#c6ff00` background, black text

## Animation Sequence

### Static Effect
- Canvas-based TV noise (black/white pixels)
- Opacity pulses between 5-15% (breathing effect)
- Occasional interference moments where static intensifies

### Image Flash Sequence
- Images fade in over 0.5s, hold 0.5s, fade out 0.5s
- 1-2s delay between flashes (static only)
- Images: millie-1.png, millie-2.png, millie-3.png, delivery.png, gen-z.png, bliss.png
- Desaturated/high-contrast treatment
- Sequence loops continuously

### Timing
- Cinematic, deliberate pacing
- Form always visible (no waiting required)
- Visuals continue after form submission

## Form & Submission

### Form Fields
- Name (text input)
- Email (email input)
- Submit button: "JOIN" or "ENTER"

### Submission Flow
1. User submits form
2. Button shows loading state
3. Success: Form fades out → "We'll be in touch." message
4. Error: Inline message with retry option

### Airtable Integration
- Uses existing `/api/waitlist` endpoint
- Sends Name + Email only
- Other fields (Postcode, Phone, etc.) left empty

## Technical Implementation

### Files to Modify
- `app/page.tsx` - Replace with mysterious landing
- `app/globals.css` - Add mystery page styles
- `app/api/waitlist/route.ts` - Make fields optional

### Components to Create
- Static canvas (TV noise effect)
- Image flasher (cycling images with fades)
- Mystery form (name/email capture)

### No New Dependencies
- Pure CSS animations
- Canvas API for static effect

### Preservation
- Current homepage components stay in `/app/components/`
- Easy to restore by swapping page.tsx
