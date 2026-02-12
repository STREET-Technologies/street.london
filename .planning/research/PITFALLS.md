# Pitfalls Research

**Domain:** Cinematic mystery teaser / pre-launch hype landing page (Next.js, Gen Z London audience, mobile-first)
**Researched:** 2026-02-12
**Confidence:** MEDIUM-HIGH (composite of multiple HIGH and MEDIUM sources)

## Critical Pitfalls

### Pitfall 1: Page Load Time Kills Conversions Before the Experience Starts

**What goes wrong:**
The cinematic experience requires loading animation libraries (GSAP ~50KB), canvas/WebGL assets, fonts, and possibly audio files. Total JavaScript payload on the median mobile page in 2024 was 558KB. If the page takes more than 3 seconds to load on mobile, 53% of visitors leave. Landing pages loading in 1 second convert at 3x the rate of pages loading in 5 seconds. Gen Z has a 1.3-second threshold for losing active attention.

**Why it happens:**
Developers build on fast connections with powerful machines. They add animation libraries, custom fonts, audio files, and high-resolution assets without measuring total payload. The cinematic vision drives asset bloat. "It looks amazing on my MacBook" syndrome.

**How to avoid:**
- Set a hard performance budget: <170KB JS (compressed), <2.5s LCP, <3s total load on 4G
- Lazy-load all non-critical assets (audio, later animation phases)
- Inline critical CSS and defer animation library loading
- Use code splitting so GSAP/animation code loads after first paint
- Measure on real devices over throttled 4G, not localhost
- Show meaningful content within 1 second (even if animations haven't started)

**Warning signs:**
- Lighthouse Performance score below 80 on mobile
- LCP above 2.5 seconds
- Total JS bundle exceeding 200KB compressed
- Any asset over 100KB that loads before first paint

**Phase to address:** Phase 1 (Foundation) -- performance budget must be set before any animation work begins

**Source:** [Shopify Landing Page Statistics](https://www.shopify.com/blog/landing-page-statistics), [HTTP Archive 2024 Page Weight](https://almanac.httparchive.org/en/2024/page-weight), [web.dev LCP](https://web.dev/articles/lcp) -- Confidence: HIGH

---

### Pitfall 2: Mobile Degradation -- Animations That Break on Real Phones

**What goes wrong:**
Animations that run smoothly on desktop become janky or completely broken on mobile. iOS Low Power Mode throttles requestAnimationFrame to 30fps (effectively undetectable by developers). Touch events conflict with scroll-driven animations. Browser address bar show/hide triggers resize events causing animation jumps. Canvas/WebGL memory usage is 5-10x higher than expected, causing crashes on older phones.

**Why it happens:**
Testing on desktop browsers with DevTools throttling is not the same as testing on real phones. iOS Low Power Mode is undetectable programmatically. Mobile Safari has unique quirks around viewport units, touch handling, and GPU memory limits. Developers assume 60fps everywhere.

**How to avoid:**
- Design animations to work at 30fps from the start (don't assume 60fps)
- Test on actual mid-range phones, not just flagship devices (budget Android + iPhone SE)
- Use CSS transforms and opacity exclusively for animations (GPU-compositable properties)
- Never animate margin, height, width, top, left -- these trigger layout recalculation
- Handle viewport resize carefully (lock viewport or debounce ScrollTrigger refresh)
- Set canvas resolution based on device pixel ratio, not always 2x
- Implement frame-rate-independent animation timing (delta time, not frame count)

**Warning signs:**
- Frame drops visible on iPhone in Low Power Mode
- Touch/scroll feels "stuck" or laggy on any mobile device
- Animation timing differs between desktop and mobile
- Memory warnings in Safari Web Inspector

**Phase to address:** Phase 1 (Foundation) -- mobile-first architecture decisions, Phase 2 (Animation) -- continuous mobile testing

**Source:** [Motion.dev: When Browsers Throttle rAF](https://motion.dev/blog/when-browsers-throttle-requestanimationframe), [Popmotion: iOS rAF throttling](https://popmotion.io/blog/20180104-when-ios-throttles-requestanimationframe/), [CSS-Tricks: Responsive Animations](https://css-tricks.com/responsive-animations-for-every-screen-size-and-device/) -- Confidence: HIGH

---

### Pitfall 3: Sound UX Disaster -- Autoplay Annoyance or Silent Confusion

**What goes wrong:**
Browser autoplay policies block audio without user gesture. Developers either (a) try to circumvent this and fail silently, leaving users confused about why there's no sound, or (b) blast audio immediately after first click, startling users. There's no visible mute control, or the mute control is hidden/unclear. Users in public spaces (tube, office) get embarrassed by unexpected sound.

**Why it happens:**
Chrome, Safari, and Firefox all block autoplay audio without prior user interaction. The Web Audio API AudioContext starts in a "suspended" state. Developers test in environments where their browser has high Media Engagement Index scores (granting autoplay), so they never experience the blocked state.

**How to avoid:**
- Audio must be 100% opt-in with a clearly visible, persistent toggle
- Resume AudioContext only on explicit user click/tap (not scroll, not page load)
- Default to muted. Always. No exceptions.
- Show a visual "sound on" affordance that communicates audio is available but not playing
- Keep volume at 60-70% max to avoid startling users
- Fade audio in over 500ms+ after user opts in
- Provide visual-only fallback that is equally compelling without sound
- Test with audio blocked (fresh incognito, no prior engagement)

**Warning signs:**
- Audio works in development but not in incognito/private browsing
- No visible mute/unmute control on the page at all times
- AudioContext.state is "suspended" and nobody handles it
- Sound plays immediately at full volume on any interaction

**Phase to address:** Phase 3 (Sound) -- but the opt-in UI pattern must be designed in Phase 2

**Source:** [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay), [MDN Autoplay Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide), [Chrome Web Audio Autoplay](https://developer.chrome.com/blog/web-audio-autoplay) -- Confidence: HIGH

---

### Pitfall 4: Mystery Becomes Confusion -- Users Don't Know What They're Signing Up For

**What goes wrong:**
The cinematic mystery is so opaque that users have no idea what Street is, what they'd get by joining a waitlist, or why they should care. They watch the animation, feel nothing, and leave. Or worse -- they feel manipulated by the mysteriousness and develop negative brand association. Research shows users form an impression within seconds; if they don't understand who you are, what you do, or how it benefits them, they leave and don't return.

**Why it happens:**
The team is in love with the mystery concept and conflates "intriguing" with "confusing." Internal team members already know what Street is, so they can't experience the page as a newcomer. The cinematic sequence delays the value proposition too long. There's no anchor point that grounds the mystery in something tangible.

**How to avoid:**
- Mystery should be in the *how*, not the *what*. Users need at least one concrete anchor: "Something is coming to London" or a category hint
- The value proposition (or at least a teaser of it) must appear within 8 seconds (Gen Z attention threshold)
- The waitlist CTA must clearly state what happens when you sign up ("Get early access" not just "Join")
- Test with 5 people who know nothing about Street -- if 3+ can't explain what the page is about, it's too opaque
- Use the 5th-7th grade reading level for all copy (this reading level converts at 11.1% vs 5.3% for college-level)

**Warning signs:**
- User testing reveals "I don't know what this is"
- Bounce rate above 80% (average landing page is 60-90%, but you want the low end)
- Waitlist signup rate below 3% of visitors
- Users scroll past the CTA without noticing it
- Social shares describe the page as "weird" rather than "intriguing"

**Phase to address:** Phase 2 (Content/Narrative) -- narrative structure must balance mystery with clarity from the start

**Source:** [Unbounce Conversion Rate Data](https://unbounce.com/average-conversion-rates-landing-pages/), [eMarketer Gen Z Attention](https://www.emarketer.com/content/gen-z-has-1-second-attention-span-work-marketers-advantage), [KlientBoost Landing Page Statistics](https://www.klientboost.com/landing-pages/landing-page-statistics/) -- Confidence: HIGH

---

### Pitfall 5: Accessibility Violations -- Seizure Risk, Screen Reader Exclusion, Motion Sickness

**What goes wrong:**
Flashing animations (more than 3 flashes per second) can trigger seizures in people with photosensitive epilepsy. Parallax and rapid motion cause nausea/vertigo in people with vestibular disorders. Screen readers encounter an empty or meaningless page because all content is in canvas/animation. Users with `prefers-reduced-motion` enabled get the full animation assault anyway. This is not just an ethical issue -- it's a legal liability (WCAG 2.1 AA compliance).

**Why it happens:**
Accessibility is treated as an afterthought to the "creative vision." Developers don't test with screen readers or motion sensitivity settings. Canvas elements are inherently inaccessible unless you add ARIA markup. The assumption is "our target audience is young and healthy."

**How to avoid:**
- Implement `prefers-reduced-motion` from day one -- provide a static, elegant alternative (fade-based, not motion-based)
- Run all animation sequences through PEAT (Photosensitive Epilepsy Analysis Tool) before shipping
- Never flash content more than 3 times per second (WCAG 2.3.1)
- Provide pause/stop controls for any animation lasting more than 5 seconds (WCAG 2.2.2)
- Ensure all meaningful content exists in the DOM (not just rendered in canvas) for screen readers
- Add ARIA labels, aria-live regions for dynamic content updates
- Prefer fade transitions over slide/zoom transitions (less likely to cause vestibular issues)
- Add a manual "reduce motion" toggle on the page itself (not everyone knows about OS settings)

**Warning signs:**
- Any rapidly flashing visual element in the animation sequence
- Canvas-only content with no DOM text fallback
- `prefers-reduced-motion` query not present in codebase
- No pause/stop button visible during animations
- axe/Lighthouse accessibility score below 90

**Phase to address:** Phase 1 (Foundation) -- reduced motion architecture, Phase 2 (Animation) -- PEAT testing on every animation

**Source:** [web.dev Accessibility Motion](https://web.dev/learn/accessibility/motion), [CSS-Tricks WCAG Animation](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/), [Princeton Digital Accessibility](https://digital.accessibility.princeton.edu/how/content/animations), [W3C WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- Confidence: HIGH

---

### Pitfall 6: requestAnimationFrame Memory Leaks and Canvas Cleanup Failures

**What goes wrong:**
Canvas animations using requestAnimationFrame create memory leaks when components unmount without cleanup. WebGL contexts are never garbage collected if references persist. Multiple competing animation loops stack up (especially in React StrictMode or with hot module replacement during development). On mobile, this leads to increasing memory consumption, eventual tab crashes, and battery drain.

**Why it happens:**
React's useEffect cleanup runs asynchronously, and a recursive rAF may schedule the next frame before cleanup executes. Developers store animation state in closures that capture stale references. WebGL textures and buffers aren't explicitly freed. Next.js route transitions unmount/remount components, triggering the leak on every navigation.

**How to avoid:**
- Always call `cancelAnimationFrame()` in the useEffect cleanup function
- Use `useRef` (not `useState`) for animation frame IDs and timestamps
- Consider `useLayoutEffect` instead of `useEffect` for animation cleanup (synchronous cleanup prevents frame pile-up)
- Explicitly dispose WebGL contexts, textures, and buffers on unmount
- Null out canvas references on cleanup
- Test for memory leaks: Chrome DevTools > Performance Monitor > JS Heap Size should not continuously grow
- Handle Next.js route transitions -- stop all animations before route change

**Warning signs:**
- JS heap size grows continuously in Performance Monitor
- Multiple `requestAnimationFrame` callbacks running simultaneously (visible in Performance tab)
- Tab becomes sluggish after navigating away and back
- Mobile Safari shows "A problem repeatedly occurred" crash message

**Phase to address:** Phase 1 (Foundation) -- animation lifecycle architecture must be correct from the start

**Source:** [CSS-Tricks: rAF with React Hooks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/), [Segmentio/Evergreen rAF Leak Fix](https://github.com/segmentio/evergreen/pull/1598), [Canvas Memory Leak Patterns](https://www.illyriad.co.uk/blog/2011/09/fix-memory-leaks-animating-html5-canvas/) -- Confidence: HIGH

---

### Pitfall 7: Scroll Hijacking Destroys User Control and Kills Engagement

**What goes wrong:**
Cinematic sequences often hijack scroll behavior to control pacing -- the user scrolls but the page advances in chunks or plays animations instead of scrolling. Users feel trapped, disoriented, and frustrated. Keyboard navigation (space bar, arrow keys) breaks. Accessibility is severely compromised. Nielsen Norman Group identifies scroll hijacking as a consistent usability failure.

**Why it happens:**
Designers want cinematic pacing control, like a film. The natural instinct is to tie animation progress to scroll position. But scroll is the user's primary navigation tool on the web, and overriding it violates fundamental interaction expectations.

**How to avoid:**
- Never fully hijack scroll. If scroll-driven animation is used, the page must still scroll naturally
- Use scroll-triggered animations (animations that START on scroll) rather than scroll-linked (animations that MOVE with scroll)
- If you must use scroll-linked animation, keep it limited to a single section with clear visual boundaries
- Always allow keyboard navigation and space bar scrolling
- Provide a "skip" button for any scroll-driven cinematic sequence
- Test with trackpad, mouse wheel, touch, and keyboard -- all must feel natural

**Warning signs:**
- User scrolls and the page doesn't move as expected
- Space bar or arrow keys don't work for scrolling
- Users on mobile can't "swipe through" naturally
- Testing reveals users trying to scroll past the animation and getting stuck

**Phase to address:** Phase 2 (Animation) -- interaction model must be decided before animation implementation

**Source:** [NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/), [SitePoint Scrolljacking Accessibility](https://www.sitepoint.com/scrolljacking-accessibility/), [Build/Create: Why Scroll Hijacking Destroys UX](https://buildcreate.com/why-scroll-hijacking-destroys-user-experience/) -- Confidence: HIGH

---

### Pitfall 8: LCP and Core Web Vitals Failure Tanks SEO

**What goes wrong:**
Canvas-rendered content is not recognized as LCP by Lighthouse. If the "largest contentful paint" element is a background image, video, or canvas animation, Core Web Vitals tend to fail. Google uses LCP as a ranking signal. A cinematic page that looks impressive but has poor LCP (>2.5s) will rank poorly in search results and show warnings in Google Search Console.

**Why it happens:**
Canvas draws pixels directly to a bitmap -- the browser doesn't track individual "paints" within canvas for LCP purposes. Developers assume the visual experience IS the LCP, but Lighthouse measures DOM elements. Heavy JS parsing delays the first meaningful paint. Custom fonts block text rendering.

**How to avoid:**
- Ensure meaningful DOM text or an image element renders within 2.5 seconds as the LCP element
- Don't rely on canvas for the initial visible content -- have real HTML/text that paints first
- Preload critical fonts with `<link rel="preload">`
- Use `font-display: swap` or `optional` to prevent font-blocking
- Inline critical CSS for above-the-fold content
- Defer animation library loading until after LCP

**Warning signs:**
- Lighthouse LCP above 2.5 seconds
- LCP element identified as canvas or video instead of text/image
- CLS (Cumulative Layout Shift) spikes as animations load and rearrange content
- "Needs Improvement" or "Poor" in Google Search Console Core Web Vitals report

**Phase to address:** Phase 1 (Foundation) -- HTML structure must ensure good LCP independent of animation

**Source:** [web.dev LCP](https://web.dev/articles/lcp), [web.dev Optimize LCP](https://web.dev/articles/optimize-lcp), [Backlinko LCP Guide](https://backlinko.com/lcp) -- Confidence: HIGH

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skipping `prefers-reduced-motion` support | Ship faster, one less code path | Legal liability, excludes 10-15% of users with vestibular/motion sensitivity, can't pass accessibility audits | Never |
| Using `setTimeout` instead of `requestAnimationFrame` | Simpler code | Janky animations, no browser optimization, wastes battery when tab is hidden | Never |
| Hardcoding animation durations in frames instead of seconds | Works on 60fps screens | Breaks at 30fps (iOS Low Power Mode) and 120fps (ProMotion), animations run too slow or fast | Never |
| Loading all assets upfront | No lazy-loading complexity | 3-5 second load times kill 50%+ of mobile traffic | Only if total page weight < 300KB |
| Inline audio files as base64 | No separate HTTP request | Bloats HTML, can't be cached independently, blocks parsing | Never for files > 10KB |
| Single monolithic animation component | Faster to build initially | Can't code-split, can't lazy-load phases, harder to test, memory leaks compound | Only for very simple animations (<100 lines) |
| Skipping the "skip animation" button | Cleaner UI | Accessibility violation (WCAG 2.2.2), frustrated returning visitors, SEO crawlers can't access content behind animation | Never |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Web Audio API | Creating AudioContext on page load (gets suspended by browser) | Create AudioContext only inside a click/tap event handler; check `.state === 'suspended'` and call `.resume()` |
| Next.js App Router | Putting canvas animation in a Server Component | Canvas/animation code must be in Client Components (`'use client'`); use dynamic import with `ssr: false` for heavy animation libs |
| GSAP ScrollTrigger | Not handling mobile address bar resize events | Disable `ScrollTrigger.config({ ignoreMobileResize: true })` or debounce refresh |
| Google Fonts / Custom Fonts | Loading fonts synchronously, blocking LCP | Use `next/font` with `display: swap`, preload critical subset, accept FOIT briefly |
| Analytics / Tracking | Loading analytics scripts before animation, blocking main thread | Defer all analytics to after LCP; use `requestIdleCallback` or `setTimeout(fn, 0)` for non-critical scripts |
| Waitlist Form (e.g., Airtable, API) | Form submission blocks the UI, no loading state | Use optimistic UI update, show success immediately, handle errors gracefully in background |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unthrottled canvas `getImageData`/`putImageData` calls | Freezes UI, janky animations, battery drain | Use GPU-composited operations only; avoid reading pixels back from GPU | Immediately on mobile, after ~10s on desktop |
| Animating non-compositable CSS properties (margin, width, height, top, left) | Layout thrashing, dropped frames, 16.7ms budget exceeded | Only animate `transform` and `opacity`; use `will-change` sparingly | Noticeable at >2 animated elements simultaneously |
| Creating new objects/arrays every animation frame | GC pauses cause periodic jank (every ~1-3 seconds) | Pre-allocate objects, reuse arrays, avoid closures that capture new allocations | After 5-10 seconds of continuous animation |
| Multiple overlapping `requestAnimationFrame` loops | CPU usage doubles/triples, battery drain, heat | Single animation loop that orchestrates all animations; centralized tick manager | Immediately -- compounds with every additional loop |
| Large canvas at device pixel ratio 3x | GPU memory exhaustion on mobile, crash | Cap canvas DPR at 2x on mobile; use `Math.min(window.devicePixelRatio, 2)` | On high-DPR phones (iPhone Pro, Samsung S series) |
| Not using `will-change` or using it on too many elements | Browser can't optimize compositing, or wastes GPU memory | Apply `will-change: transform` only to elements about to animate; remove after animation | >5 elements with `will-change` simultaneously |

## Performance Budgets and Thresholds

Hard limits to enforce throughout development.

| Metric | Target | Maximum | Tool to Measure |
|--------|--------|---------|-----------------|
| Total JS (compressed) | <150KB | 200KB | `next build` output, webpack-bundle-analyzer |
| LCP | <2.0s | 2.5s | Lighthouse, WebPageTest |
| FCP (First Contentful Paint) | <1.0s | 1.5s | Lighthouse |
| CLS (Cumulative Layout Shift) | <0.05 | 0.1 | Lighthouse |
| Time to Interactive | <3.0s | 4.0s | Lighthouse |
| Total Page Weight (initial load) | <500KB | 800KB | DevTools Network tab |
| Animation Frame Time | <12ms | 16.7ms (60fps) | DevTools Performance tab |
| JS Heap (after 60s) | <30MB | 50MB | DevTools Performance Monitor |
| Lighthouse Performance Score | >90 | >80 minimum | Lighthouse |
| Lighthouse Accessibility Score | >95 | >90 minimum | Lighthouse |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animation sequence is unskippable | Returning visitors and impatient users bounce; 74% leave if content takes >5s to access | Add "Skip to signup" button visible from the start; remember if user has visited before (localStorage) |
| CTA button is hidden until animation completes | Users who are ready to convert can't find the form; conversion window closes | CTA should be accessible at all times, even if visually subtle during animation |
| Using mystery/hype language with zero substance | Users feel manipulated, negative brand association, "this is an ad" rejection | Ground mystery in at least one concrete detail (location, category, timeline) |
| No visual progress indicator during cinematic sequence | Users don't know how long the experience is, feel anxiety about time investment | Subtle progress bar, dot indicators, or visual chapters |
| Sound toggle has no visual state | Users don't know if sound is on or off, can't tell if audio is part of the experience | Clear icon state (speaker with waves vs. muted), brief tooltip on first visit |
| Full-screen takeover on mobile | Users can't access browser controls, feels aggressive | Keep within normal page flow; never use fullscreen API without explicit request |
| Waitlist form asks for too much information | Every additional field reduces conversions ~10-15%; email-only forms convert highest | Ask for email only. Get other info later via follow-up or onboarding |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Animation:** Works on desktop Chrome but not tested on iOS Safari in Low Power Mode -- verify animation plays at 30fps without breaking
- [ ] **Sound:** Works in development but AudioContext is suspended in fresh incognito -- verify sound opt-in flow works with no prior site engagement
- [ ] **Reduced Motion:** Animations disabled but the page is now blank/broken instead of showing elegant fallback -- verify reduced motion path is a complete, designed experience
- [ ] **CTA Visibility:** Waitlist form exists but is below the fold during animation -- verify CTA is reachable at any point during the experience
- [ ] **Screen Readers:** Page "works" but canvas content is invisible to screen readers -- verify meaningful content is in the DOM with proper ARIA labels
- [ ] **Memory:** Animation looks great for 10 seconds in testing but leaks memory over 60+ seconds -- verify JS heap is stable after 60 seconds of animation
- [ ] **Cleanup:** Animation works on the homepage but navigating away and back creates duplicate animation loops -- verify `cancelAnimationFrame` cleanup in useEffect
- [ ] **Fonts:** Custom fonts load but cause a 2+ second FOIT (Flash of Invisible Text) -- verify `font-display: swap` is set and fallback font is visually acceptable
- [ ] **Mobile Viewport:** Looks correct in DevTools responsive mode but breaks on real phones due to address bar, notch, safe areas -- verify on real iPhone and Android devices
- [ ] **SEO:** Page looks amazing but has zero crawlable text content because it's all canvas-rendered -- verify `view-source:` shows meaningful HTML content

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Performance budget blown (>200KB JS) | MEDIUM | Audit with webpack-bundle-analyzer, tree-shake unused code, lazy-load animation phases, switch to lighter alternatives (CSS animations for simple effects) |
| Animation breaks on iOS Low Power Mode | LOW | Switch to frame-rate-independent timing (`deltaTime` approach), cap target FPS to 30 with graceful degradation |
| Sound autoplay fails silently | LOW | Add AudioContext state check on first interaction, show persistent "tap for sound" affordance, ensure visual experience is complete without audio |
| Users confused by mystery (high bounce) | MEDIUM | A/B test adding a one-line concrete value proposition, add visual cues that ground the mystery, shorten time-to-CTA |
| Accessibility complaint/legal issue | HIGH | Emergency: add `prefers-reduced-motion` support, add skip button, add ARIA labels, run full WCAG 2.1 AA audit, may need external accessibility consultant |
| Memory leaks causing mobile crashes | MEDIUM | Audit all rAF loops for cleanup, switch to centralized animation manager, add memory monitoring in development |
| LCP failure tanking SEO | LOW-MEDIUM | Add real DOM text/image as LCP element, defer animation below LCP, preload critical resources |
| Scroll hijacking complaints | LOW | Remove scroll hijacking entirely, switch to scroll-triggered (not scroll-linked) animations, add skip button |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Page load time kills conversions | Phase 1: Foundation | Lighthouse mobile score >80 before any animation code is added |
| Mobile degradation | Phase 1 + Phase 2 | Test every animation milestone on real iPhone SE + budget Android |
| Sound UX disaster | Phase 3: Sound | Test in incognito with no prior engagement; verify mute toggle works |
| Mystery becomes confusion | Phase 2: Narrative | 5-person hallway test: 3/5 must understand what the page is about |
| Accessibility violations | Phase 1: Foundation | `prefers-reduced-motion` hook exists before first animation; PEAT test all sequences |
| rAF memory leaks | Phase 1: Foundation | Chrome Memory Monitor shows stable heap after 60s; no duplicate rAF loops on navigation |
| Scroll hijacking | Phase 2: Animation | Keyboard, trackpad, touch, and mouse all scroll naturally; space bar works |
| LCP/Core Web Vitals failure | Phase 1: Foundation | Real DOM text renders as LCP element within 2.5s independent of any JS |

## Sources

### Post-mortems and Case Studies
- [HTTP Archive 2024 Web Almanac: Page Weight](https://almanac.httparchive.org/en/2024/page-weight) -- Confidence: HIGH (comprehensive dataset of millions of sites)
- [HTTP Archive 2024 Web Almanac: JavaScript](https://almanac.httparchive.org/en/2024/javascript) -- Confidence: HIGH
- [Unbounce: Average Conversion Rates (Q4 2024, 41K landing pages)](https://unbounce.com/average-conversion-rates-landing-pages/) -- Confidence: HIGH
- [Shopify: 20 Landing Page Statistics 2026](https://www.shopify.com/blog/landing-page-statistics) -- Confidence: HIGH

### Performance and Animation
- [Motion.dev: Web Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list) -- Confidence: HIGH
- [Motion.dev: When Browsers Throttle rAF](https://motion.dev/blog/when-browsers-throttle-requestanimationframe) -- Confidence: HIGH
- [MDN: Animation Performance and Frame Rate](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate) -- Confidence: HIGH
- [Addy Osmani: Performance Budgets](https://addyosmani.com/blog/performance-budgets/) -- Confidence: HIGH
- [MDN: Performance Budgets](https://developer.mozilla.org/en-US/docs/Web/Performance/Performance_budgets) -- Confidence: HIGH
- [WebGL Fundamentals: Memory Usage](https://webglfundamentals.org/webgl/lessons/webgl-qna-why-does-webgl-take-more-memory-than-canvas-2d.html) -- Confidence: HIGH

### Mobile-Specific
- [Popmotion: When iOS Throttles rAF to 30fps](https://popmotion.io/blog/20180104-when-ios-throttles-requestanimationframe/) -- Confidence: HIGH
- [CSS-Tricks: Responsive Animations for Every Screen Size](https://css-tricks.com/responsive-animations-for-every-screen-size-and-device/) -- Confidence: MEDIUM
- [WebKit Bug 215745: rAF Throttled to 30fps in Low Power Mode](https://bugs.webkit.org/show_bug.cgi?id=215745) -- Confidence: HIGH (primary source)
- [Yelp Engineering: Animating the Mobile Web](https://engineeringblog.yelp.com/2015/01/animating-the-mobile-web.html) -- Confidence: MEDIUM (older but fundamentals still apply)

### Sound UX
- [Chrome Developers: Autoplay Policy](https://developer.chrome.com/blog/autoplay) -- Confidence: HIGH (primary source)
- [Chrome Developers: Web Audio Autoplay and Games](https://developer.chrome.com/blog/web-audio-autoplay) -- Confidence: HIGH (primary source)
- [MDN: Autoplay Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide) -- Confidence: HIGH
- [Smashing Magazine: Web Design Done Well: Audio](https://www.smashingmagazine.com/2021/06/web-design-done-well-audio/) -- Confidence: MEDIUM
- [UXmatters: Sound Design in UX Beyond Notifications](https://www.uxmatters.com/mt/archives/2024/08/the-role-of-sound-design-in-ux-design-beyond-notifications-and-alerts.php) -- Confidence: MEDIUM

### Accessibility
- [web.dev: Animation and Motion Accessibility](https://web.dev/learn/accessibility/motion) -- Confidence: HIGH
- [CSS-Tricks: Accessible Web Animation and WCAG](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/) -- Confidence: HIGH
- [W3C: Understanding WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- Confidence: HIGH (primary source)
- [Josh W. Comeau: Accessible Animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) -- Confidence: HIGH
- [Princeton Digital Accessibility: Use Caution with Animations](https://digital.accessibility.princeton.edu/how/content/animations) -- Confidence: HIGH
- [Pope Tech: Accessible Animation with Code Examples](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) -- Confidence: MEDIUM

### User Behavior and Conversion
- [eMarketer: Gen Z Has a 1-Second Attention Span](https://www.emarketer.com/content/gen-z-has-1-second-attention-span-work-marketers-advantage) -- Confidence: MEDIUM (headline stat, underlying research is sound)
- [Search Engine Land: How Long Will People Wait 2024](https://searchengineland.com/people-wait-website-load-2024-stat-445223) -- Confidence: HIGH
- [Stanford Research: Finding the Sweet Spot for Loading Animations (2025)](https://news.stanford.edu/stories/2025/11/online-content-loading-animations-speed-research) -- Confidence: HIGH (academic source)
- [KlientBoost: 58 Landing Page Statistics](https://www.klientboost.com/landing-pages/landing-page-statistics/) -- Confidence: MEDIUM (aggregated from multiple sources)

### Scroll Hijacking
- [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) -- Confidence: HIGH (Nielsen Norman Group is gold standard for UX research)
- [SitePoint: Scrolljacking and Accessibility](https://www.sitepoint.com/scrolljacking-accessibility/) -- Confidence: MEDIUM

### React/Next.js Animation Patterns
- [CSS-Tricks: Using rAF with React Hooks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/) -- Confidence: HIGH
- [OpenReplay: Using rAF in React for Smooth Animations](https://blog.openreplay.com/use-requestanimationframe-in-react-for-smoothest-animations/) -- Confidence: MEDIUM
- [GSAP + Canvas Optimization](https://www.augustinfotech.com/blogs/optimizing-gsap-and-canvas-for-smooth-performance-and-responsive-design/) -- Confidence: MEDIUM

### Core Web Vitals
- [web.dev: Largest Contentful Paint](https://web.dev/articles/lcp) -- Confidence: HIGH (primary source)
- [web.dev: Optimize LCP](https://web.dev/articles/optimize-lcp) -- Confidence: HIGH (primary source)

---
*Pitfalls research for: Cinematic mystery teaser / pre-launch hype landing page (Next.js)*
*Researched: 2026-02-12*
