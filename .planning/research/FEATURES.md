# Feature Research

**Domain:** Cinematic mystery teaser / pre-launch hype landing page
**Researched:** 2026-02-12
**Confidence:** MEDIUM-HIGH (mix of documented case studies and pattern analysis)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist on any credible pre-launch page. Missing these = page feels broken or scammy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Single-field email capture | Users expect frictionless signup. Reducing fields from 4 to 3 increases conversion ~50%. Email-only is the standard for pre-launch. [Source: WPForms, VentureHarbour] | LOW | Use one email field. Collect name/details in follow-up email or post-signup flow. Robinhood and Harry's both used email-only. Confidence: HIGH |
| Mobile-responsive design | 53% of mobile users abandon pages loading >3s. Mobile loads are 70.9% slower than desktop on average. [Source: Google Think, Hostinger] | LOW | Next.js handles this well. Must be the primary design target, not an afterthought. Performance budget: <3s load on 4G. Confidence: HIGH |
| Clear value hint (without full reveal) | Loewenstein's Information Gap Theory (1994): curiosity requires awareness of a gap. If the page communicates nothing, there's no gap to close, just confusion. [Source: CMU/Loewenstein research] | LOW | The page must hint at *enough* -- "something is coming to London" -- without explaining what. The gap between hint and full knowledge drives signup. Confidence: HIGH |
| Social proof / traction signal | Users need to know others care. Dynamic counters ("2,847 people waiting") or live notifications ("Sarah just joined") trigger competitive instincts and validate the page isn't dead. [Source: QueueUp, Prefinery] | LOW | Even a simple "X people on the waitlist" counter works. Can be real or approximate. Confidence: HIGH |
| Confirmation/thank-you state | After signup, users need acknowledgment. This is where referral loops start. Robinhood showed queue position. Harry's showed referral rewards. [Source: Viral Loops, Prefinery] | LOW | Post-signup screen is the most underrated conversion moment. This is where sharing happens. Confidence: HIGH |
| Fast load time (<3s) | Pages loading in 1s convert at 39% vs 29% at 3s vs steep dropoff after 5s. Heavy animations that tank performance will kill conversions. [Source: Portent, Conductor] | MEDIUM | All visual effects must be performance-budgeted. Canvas particle counts need mobile limits. CSS-based effects preferred over JS where possible. Confidence: HIGH |
| Accessible CTA button copy | "Submit" decreases conversion by 3%. Action-oriented copy like "Get Early Access" or "Unlock Access" outperforms generic labels. [Source: ConvertFlow, Moosend, GetResponse] | LOW | The CTA should feel like gaining something, not giving something away. "Unlock" / "Claim" / "Get In" framing. Confidence: HIGH |

### Differentiators (Competitive Advantage)

Features that elevate the page from "another coming soon page" to "a cultural moment." These are where STREET competes for attention.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cinematic dark/moody aesthetic with TV static | Creates instant mood differentiation. Dark themes signal luxury and exclusivity. TV static/glitch effects are achievable in pure CSS (conic-gradient bug, repeating-radial-gradient animations) with minimal performance cost. Retro-digital decay aesthetic resonates with Gen Z nostalgia. [Source: CSS-Tricks, FreeFrontend, HyperViolet] | MEDIUM | Pure CSS static effects perform well. Can use mix-blend-mode: screen for chromatic aberration. steps() timing for glitchy movement. Keep canvas usage minimal. Confidence: HIGH (technique is well-documented) |
| Progressive scroll-driven reveal / storytelling | Scrollytelling transforms static pages into narrative experiences. Apple's AirPods Pro page is the gold standard. The page "unfolds" as you scroll, creating cinematic pacing. CSS Scroll-driven Animations API now handles this natively. [Source: CreativeCorner, Vev, Figma] | MEDIUM-HIGH | Use scroll-triggered animations to progressively reveal cryptic phrases, imagery, location hints. Each scroll section deepens the mystery. Builds the curiosity gap layer by layer. Confidence: HIGH |
| Referral-gated queue position (viral loop) | Robinhood: 1M signups, 50%+ from referrals. Harry's: 100K emails in one week, 77% from referrals. Each referral moves you up the queue. This is the single highest-impact growth mechanic for pre-launch waitlists. [Source: Viral Loops, Prefinery, Tim Ferriss blog] | MEDIUM | Show queue position after signup. Provide unique referral link. "Invite friends to move up." Reward tiers (Harry's model): 5 referrals = X, 10 = Y, 25 = Z. The Zeigarnik Effect keeps people mentally invested in incomplete progress. Confidence: HIGH |
| Micro-interactions and cursor effects | Custom cursors that morph, expand, or trigger animations. Hover effects on text elements. Adobe research shows 12% increase in click-through rates for pages with subtle motion elements (2024 A/B tests). 200-500ms is the ideal micro-animation duration. [Source: Vev, ColorColourCreative, Adobe] | LOW-MEDIUM | Cursor trail effects, text that reacts to hover, glitch on interaction. These make the page feel alive and tactile. Keep to CSS transforms to avoid layout thrashing. Confidence: MEDIUM (Adobe stat is secondhand) |
| Sound design (opt-in ambient audio) | Ambient audio creates immersive mood. Netflix's "Dark" series site used deep ambient tones. Web Audio API enables browser-native audio without plugins. Critical: must be opt-in (click-to-enable), never autoplay. [Source: Smashing Magazine, SitePoint, Orpetron] | MEDIUM | A subtle "Enable Sound" toggle that activates low ambient drone/static. Enhances the cinematic mystery feel. Must degrade gracefully. Most users won't enable it, but those who do will have a memorable experience. Confidence: MEDIUM |
| Hidden easter eggs / secret interactions | Easter eggs create shareability and community bonding. Taylor Swift + Google vault tracks puzzle drove millions of collaborative interactions. Konami code reveals are a beloved dev tradition. Finding hidden elements triggers dopamine and social sharing. [Source: Phable, Figmints, MediaValet] | LOW | Hide subtle interactive elements: a Konami code that reveals a secret message, clickable elements in the static that briefly show imagery, coordinates that mean something. These become social currency when shared. Confidence: HIGH (pattern is proven) |
| Countdown or "something is happening" temporal urgency | Countdown timers increased conversions 226% in one A/B test and 300% in another. However, they can also decrease conversions by 67% if they feel artificial. [Source: Leadpages, ABMatic, NiftyImages] | LOW | Don't use a fake countdown. Instead, use an ambiguous temporal signal: "Coming [season] 2026" or a date that appears and glitches away before you can fully read it. Creates urgency without the cheesiness of a ticking timer. Confidence: MEDIUM (data is context-dependent) |
| Anti-corporate, raw aesthetic (Gen Z alignment) | 84% of Gen Z trust brands more when they feature real customers. 67% stop purchasing from brands that "pretend to be something they're not." Polished corporate campaigns don't feel trustworthy. MSCHF and Duolingo succeed by rejecting polish. [Source: Zensciences, CampHouse, VistaPrint] | LOW | The page should feel like it was made by someone, not a corporation. Raw typography, intentional imperfection, glitch as design language. The mystery itself is anti-corporate -- real brands explain themselves; this one doesn't. Confidence: HIGH |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good for a teaser page but create problems in practice.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Autoplay background video | Cinematic feel, high production value | Destroys mobile performance (8.6s avg mobile load already). Eats data. Most browsers block autoplay with sound. Requires video production budget. A 5MB video on a teaser page is a conversion killer. | CSS/canvas-based visual effects (static, particles, glitch). Achieve cinematic mood at 1/100th the file size. |
| Multi-field signup form (name, phone, location, interests) | More data = better segmentation | Every additional field reduces conversion ~25-50%. Pre-launch, the only goal is email capture. Segment later via email flows or post-signup progressive profiling. | Single email field. Collect everything else after they're invested (post-signup screen or first email). |
| Full product explanation / feature list | "People need to know what they're signing up for" | Destroys the mystery. Information Gap Theory: curiosity requires an unresolved gap. Explaining the product removes the reason to sign up to "find out." Superhuman and Clubhouse both launched with minimal product explanation. | Hint at the category (London, local, commerce) without explaining the product. Let curiosity do the conversion work. |
| Complex WebGL 3D scenes | Impressive visual showcase | Three.js/WebGL scenes are heavy (100KB+ library alone), perform poorly on mid-range mobile devices, drain battery, and often feel disconnected from the actual product. Diminishing returns on mobile where most Gen Z traffic originates. | Targeted canvas effects (particles, static) with mobile particle count limits. CSS animations for everything else. Performance > spectacle. |
| Social media feed integration | Show activity, build trust | Pulls attention away from the CTA. External embeds slow load times. Social feeds look corporate. The page should drive TO social sharing, not display FROM social. | Post-signup: "Share on Twitter/IG" with pre-written copy. Make the page itself the thing worth sharing. |
| Chatbot / live chat | Engagement, answer questions | There are no questions to answer on a mystery page. A chatbot undermines the entire mystique. It says "we're a normal company" when the goal is "we're something you haven't seen yet." | A single contact email in the footer for press/partnerships. Nothing else. |
| Aggressive popup / modal on page load | Capture emails before they bounce | Popups on first visit have a 3.09% conversion rate on average, but they interrupt the cinematic experience. On a mystery page, the journey IS the conversion funnel. Interrupting it with a modal breaks immersion. | The signup form should feel like the natural climax of the scroll experience, not an interruption of it. |
| Fake countdown timer to arbitrary date | Creates urgency | 67% conversion decrease observed in some A/B tests with countdown timers. Gen Z specifically distrust performative urgency. If the timer hits zero and nothing happens, you've burned trust permanently. | Ambiguous temporal cues: a date that glitches in and out, "Soon" in large type, seasonal references. Mystery > manufactured urgency. |

## Feature Dependencies

```
[TV Static / Glitch Aesthetic]
    |-- enhances --> [Progressive Scroll Reveal]
    |                    |-- requires --> [Mobile-Responsive Design]
    |                    |-- enhances --> [Single-Field Email Capture]
    |
    |-- enhances --> [Micro-Interactions / Cursor Effects]
    |-- enhances --> [Hidden Easter Eggs]

[Single-Field Email Capture]
    |-- requires --> [Confirmation/Thank-You State]
    |                    |-- enables --> [Referral Queue Position (Viral Loop)]
    |                                        |-- enhances --> [Social Proof Counter]
    |
    |-- requires --> [Accessible CTA Button Copy]

[Sound Design (Opt-in)]
    |-- enhances --> [TV Static / Glitch Aesthetic]
    |-- conflicts --> [Fast Load Time] (if not lazy-loaded)

[Anti-Corporate Aesthetic]
    |-- enhances --> [TV Static / Glitch Aesthetic]
    |-- enhances --> [Hidden Easter Eggs]
    |-- conflicts --> [Full Product Explanation]
```

### Dependency Notes

- **Progressive Scroll Reveal requires Mobile-Responsive Design:** Scroll-driven animations must be built mobile-first. Desktop is the enhancement, not the other way around.
- **Referral Queue Position requires Confirmation State:** The viral loop only starts after signup. The thank-you screen is the launch pad for referrals.
- **Sound Design conflicts with Fast Load Time:** Audio files must be lazy-loaded and only fetched after user opt-in. Never bundle in initial payload.
- **Anti-Corporate Aesthetic conflicts with Full Product Explanation:** You can't be mysterious and explanatory simultaneously. Pick one. For a teaser page, mystery wins.
- **Social Proof Counter enhances Single-Field Email Capture:** Seeing "3,200 people waiting" next to the email field provides the social validation nudge needed to convert fence-sitters.

## MVP Definition

### Launch With (v1)

Minimum viable teaser page -- what's needed to capture emails and create buzz.

- [ ] Dark cinematic aesthetic with CSS-based TV static/glitch effects -- this IS the brand identity at launch. Without it, it's just another "coming soon" page.
- [ ] Progressive scroll reveal with 3-4 sections building mystery (cryptic phrases, London hints, temporal cues) -- the scroll journey is the conversion funnel.
- [ ] Single email field with "Unlock Access" or similar CTA -- the one thing the page needs to do is capture emails.
- [ ] Post-signup confirmation showing queue position + referral link -- this is where viral growth starts. Robinhood and Harry's prove this is the highest-leverage feature.
- [ ] Social proof counter (waitlist count) -- reduces signup anxiety, validates that others care.
- [ ] Mobile-first performance (<3s load on 4G) -- non-negotiable. If it doesn't load fast on mobile, nothing else matters.
- [ ] Basic micro-interactions (hover effects on CTA, text glitch on scroll) -- makes the page feel alive without heavy implementation.

### Add After Validation (v1.x)

Features to add once the page is live and generating signups.

- [ ] Referral reward tiers (Harry's model) -- add when you see referral links being shared but want to incentivize more. Trigger: >500 signups.
- [ ] Hidden easter eggs (Konami code, clickable static reveals) -- add when social sharing of the page is happening organically. These give people something new to discover and share.
- [ ] Ambient sound toggle -- add when the page aesthetic is locked in and you want to deepen immersion for engaged visitors.
- [ ] Dynamic social proof notifications ("X just joined from Shoreditch") -- add when signups reach a rate where real-time notifications feel genuine, not manufactured.
- [ ] Cursor effects and advanced micro-interactions -- add after initial performance metrics confirm the page isn't suffering from animation overhead.

### Future Consideration (v2+)

Features to defer until the pre-launch campaign is in full swing.

- [ ] Progressive content reveals over time (the page changes week over week, revealing more) -- defer because it requires an ongoing content strategy and the initial page needs to prove the concept first.
- [ ] A/B tested CTA copy and form placement -- defer until there's enough traffic volume for statistically significant tests.
- [ ] Invite-only access codes (Clubhouse model) -- defer because this requires a functioning product to grant access to. Better suited for the actual product launch, not the teaser page.
- [ ] SMS capture for drop notifications (MSCHF model) -- defer because SMS requires compliance infrastructure (TCPA, GDPR) and is better suited for post-waitlist engagement.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Single email field + CTA | HIGH | LOW | P1 |
| Dark cinematic aesthetic (CSS static/glitch) | HIGH | MEDIUM | P1 |
| Mobile-first responsive design | HIGH | LOW | P1 |
| Post-signup queue position + referral link | HIGH | MEDIUM | P1 |
| Progressive scroll reveal (3-4 sections) | HIGH | MEDIUM | P1 |
| Social proof counter | MEDIUM | LOW | P1 |
| Basic micro-interactions (hover, glitch) | MEDIUM | LOW | P1 |
| Referral reward tiers | HIGH | MEDIUM | P2 |
| Hidden easter eggs | MEDIUM | LOW | P2 |
| Ambient sound toggle | LOW | MEDIUM | P2 |
| Dynamic social proof notifications | MEDIUM | LOW | P2 |
| Cursor effects / advanced interactions | LOW | MEDIUM | P2 |
| Progressive content reveals over time | MEDIUM | HIGH | P3 |
| A/B tested CTA variations | MEDIUM | MEDIUM | P3 |
| Invite-only access codes | MEDIUM | HIGH | P3 |
| SMS capture for notifications | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

Note: "Competitors" here means other pre-launch campaigns targeting similar audiences (Gen Z, London, hype culture), not direct marketplace competitors.

| Feature | Robinhood Pre-Launch | Harry's Pre-Launch | Superhuman Waitlist | Clubhouse Invite-Only | STREET Approach |
|---------|---------------------|-------------------|--------------------|-----------------------|-----------------|
| Aesthetic | Clean, minimal, fintech-friendly. White background, stock imagery. | Minimal 2-page microsite. Didn't reveal the product. | Premium, dark, fast. Matched the "fastest email" brand. | Simple, clean. The exclusivity was the design. | Cinematic dark mystery. TV static, glitch, noir. The aesthetic IS the product tease. |
| Signup mechanic | Email only -> queue position -> referral to move up | Email only -> referral link -> tiered rewards (5/10/25/50 referrals) | Referral from existing user required. No public signup initially. | Invite from existing user only. Invites sold on eBay. | Email only -> queue position -> referral link -> reward tiers (v1.x) |
| Mystery level | LOW -- clearly stated "commission-free stock trading" | MEDIUM -- minimal product reveal, focus on the campaign mechanics | MEDIUM -- positioned as "the fastest email experience" but access was gated | HIGH -- invite-only with zero public explanation initially | VERY HIGH -- no product explanation, pure cinematic mystery. Information gap as the core strategy. |
| Viral mechanic | Queue position + referral link. 50%+ signups from referrals. 1M total. | Tiered referral rewards. 77% of 100K signups from referrals in one week. | Existing user referrals only. Organic word-of-mouth. 500K+ waitlist. | Each user got 2 invites. Invites became social currency. 10M waitlist. | Queue position + referral link (v1). Tiered rewards (v1.x). Easter eggs as social sharing hooks. |
| Social proof | Queue position number | Queue position + leaderboard | "Join 500,000+ on the waitlist" | Celebrity users (Elon, Oprah, Zuck) | Real-time waitlist counter + location-based signals ("X people in London") |
| What drove signups | Clear value prop (free trading) + referral incentive | Referral reward tiers + mystery | Extreme exclusivity + word-of-mouth | FOMO + celebrity + cultural moment | Curiosity gap + cinematic experience + referral loop. The page itself should be worth sharing. |

## What Actually Drives Waitlist Signups vs What Just Looks Cool

### Drives Signups (Proven)

1. **Referral mechanics with queue position** -- This is the #1 driver across all successful pre-launch campaigns studied. Robinhood (1M), Harry's (100K/week), Superhuman (500K+). The data is overwhelming. Confidence: HIGH.

2. **Single email field with zero friction** -- Every additional field costs ~25-50% of conversions. Robinhood, Harry's, and Notion all used email-only. Confidence: HIGH.

3. **Social proof (counter or notifications)** -- Seeing others have signed up validates the decision. Dynamic counters outperform static numbers. Confidence: HIGH.

4. **Clear (but mysterious) value hint** -- The curiosity gap only works if there IS a gap. "Something is coming to London" creates a gap. A blank page with just an email field creates confusion. Confidence: HIGH.

5. **Exclusivity framing in CTA copy** -- "Get Early Access" outperforms "Sign Up." "Unlock" outperforms "Submit." The framing of gaining privileged access drives action. Confidence: HIGH.

6. **Fast page load** -- Every second of load time costs ~5% conversion. This is boring but critical. Confidence: HIGH.

### Looks Cool But Doesn't Directly Drive Signups

1. **Complex WebGL/3D scenes** -- Impressive but heavy. No documented case of 3D visuals increasing waitlist signups specifically. They increase time-on-page but can decrease mobile conversions due to performance. Confidence: MEDIUM.

2. **Ambient sound design** -- Creates immersive experience for the ~5-10% of users who enable it. Memorable but not a conversion driver. Worth adding for brand differentiation, not for signup numbers. Confidence: MEDIUM.

3. **Hidden easter eggs** -- Drive social sharing and repeat visits but don't directly convert. They're a virality amplifier on top of a referral mechanic, not a replacement for one. Confidence: MEDIUM.

4. **Cursor animations and advanced micro-interactions** -- Increase perceived quality and time-on-page. Make the experience feel premium. But the email field converts, not the cursor trail. Confidence: MEDIUM.

5. **Countdown timers** -- Data is wildly inconsistent (226% increase in one test, 67% decrease in another). On a mystery page where you can't commit to a real date, they're risky. Confidence: LOW.

## Real Campaign Results (Where Available)

| Campaign | Signups | Timeframe | Key Mechanic | Source Confidence |
|----------|---------|-----------|--------------|-------------------|
| Robinhood | ~1,000,000 | ~1 year pre-launch | Email + queue position + referral to move up. 50%+ from referrals. | HIGH (multiple sources, founder interviews) |
| Harry's | 100,000 | 1 week | Email + tiered referral rewards (5/10/25/50). 77% from referrals. Seeded by 12 employees. | HIGH (Tim Ferriss blog, founder writeup) |
| Superhuman | 500,000+ | ~2 years | Invite-only + referral from existing users + 30min onboarding call. | HIGH (multiple case studies, founder interviews) |
| Clubhouse | 10,000,000 | ~1 year (2020-2021) | Invite-only (2 invites per user). Celebrity endorsement (Musk, Zuck). | HIGH (CNBC, multiple sources) |
| CeraVe x Michael Cera | Not disclosed (signups), but massive social reach | 4-week narrative arc | Mystery/conspiracy campaign. Influencer seeding. Gradual reveal. | MEDIUM (campaign documented, conversion numbers not public) |

## Psychology Framework: Why Mystery Converts

The theoretical foundation for a mystery teaser page rests on three psychological principles:

1. **Information Gap Theory (Loewenstein, 1994):** Curiosity arises when attention focuses on a gap in knowledge. The gap must be: (a) noticeable (the page must hint at something), (b) specific enough to care about (London, local commerce), and (c) unresolved (don't explain the product). The motivation to fill the gap drives signup. [Source: CMU research papers. Confidence: HIGH]

2. **Reactance Theory:** When access is restricted, desire increases. "You can't have this yet" makes people want it more. Supreme, Clubhouse, and Superhuman all leveraged this. The waitlist itself is a restriction that increases desire. [Source: Psychology of Scarcity research. Confidence: HIGH]

3. **Zeigarnik Effect:** Uncompleted tasks occupy mental space more than completed ones. A waitlist position is an open loop. Showing someone they're #847 in line creates a persistent mental thread that keeps the product top-of-mind until access is granted. [Source: QueueUp, psychological research. Confidence: HIGH]

**Applied to STREET:** The page creates an information gap (what is this?), restricts access (waitlist), and opens a loop (your position in the queue). Each layer deepens psychological investment.

## Sources

### Case Studies and Campaign Analysis
- [Robinhood waitlist case study](https://viral-loops.com/blog/robinhood-referral-got-1-million-users/) - Viral Loops
- [Harry's 100K emails in one week](https://viral-loops.com/blog/harrys-gathered-100k-emails-single-week-milestone-referral-program/) - Viral Loops
- [Superhuman waitlist strategy](https://waitlister.me/growth-hub/case-studies/superhuman) - Waitlister
- [Clubhouse 10M waitlist](https://waitlister.me/growth-hub/case-studies/club-house) - Waitlister
- [Harry's pre-launch on Tim Ferriss blog](https://tim.blog/2014/07/21/harrys-prelaunchr-email/) - Tim Ferriss
- [How Superhuman Grows](https://www.howtheygrow.co/p/how-superhuman-grows) - How They Grow
- [MSCHF marketing drops](https://www.goodmarketing.club/marketing-example/the-complete-list-of-mschfs-campaign-drops-1-10/) - Good Marketing Club
- [MSCHF fluid branding strategy](https://jasonawheeler.com/2025/03/16/breaking-all-the-rules-the-mschf-approach-to-fluid-branding/) - Jason A. Wheeler
- [CeraVe mystery campaign](https://seranking.com/blog/top-marketing-case-studies/) - SE Ranking

### Psychology and Conversion Research
- [Information Gap Theory - Loewenstein](https://www.cmu.edu/dietrich/sds/docs/golman/golman_loewenstein_curiosity.pdf) - CMU
- [Psychology of Scarcity in marketing](https://www.phable.io/phable-labs/psychology-of-scarcity-limited-releases-marketing) - Phable
- [Psychology behind effective waitlists](https://queueup.dev/blog/psychology-effective-waitlists) - QueueUp
- [Countdown timer A/B test data](https://www.leadpages.com/blog/landing-page-countdown-timers) - Leadpages
- [Form fields and conversion rates](https://ventureharbour.com/how-form-length-impacts-conversion-rates/) - VentureHarbour
- [Page load time and conversions](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) - Portent
- [Website load time statistics](https://www.hostinger.com/tutorials/website-load-time-statistics) - Hostinger

### Design and Technical Implementation
- [CSS TV static noise effect](https://css-tricks.com/making-static-noise-from-a-weird-css-gradient-bug/) - CSS-Tricks
- [CSS glitch effects collection](https://freefrontend.com/css-glitch-effects/) - FreeFrontend
- [Scroll-driven animations](https://www.creativecorner.studio/blog/website-scroll-animations) - Creative Corner
- [Web Audio API for immersive experiences](https://www.smashingmagazine.com/2021/06/web-design-done-well-audio/) - Smashing Magazine
- [Micro-interactions in 2025](https://www.colorcolourcreative.com/creative-hub/2025/micro-interactions) - Color Colour Creative
- [Dark moody web design inspiration](https://hyperviolet.co/blog/dark-and-moody-web-design-inspiration-for-your-next-project) - HyperViolet
- [Particle effects with Canvas](https://css-tricks.com/adding-particle-effects-to-dom-elements-with-canvas/) - CSS-Tricks

### Audience and Market Context
- [Gen Z marketing preferences 2025](https://zensciences.com/blogs/marketing-in-the-age-of-gen-z-strategies-that-work/) - Zensciences
- [Gen Z trends 2025](https://camphouse.io/blog/gen-z-trends) - Camphouse
- [Drop culture and scarcity](https://www.jasminedirectory.com/blog/the-drop-culture-creating-hype-through-scarcity-marketing/) - Jasmine Directory
- [Supreme and fluid values](https://medium.com/irregular-labs/the-illusion-of-scarcity-supreme-fluid-values-and-drops-f113d84f7bd8) - Irregular Labs

### Waitlist Best Practices
- [Waitlist landing page examples](https://www.flowjam.com/blog/waitlist-landing-page-examples-10-high-converting-pre-launch-designs-how-to-build-yours) - Flowjam
- [Coming soon page examples](https://www.shopify.com/blog/coming-soon-page) - Shopify
- [Building a viral waitlist](https://viral-loops.com/blog/how-to-build-a-waitlist/) - Viral Loops
- [Easter eggs and brand engagement](https://www.phable.io/phable-labs/the-art-of-brand-easter-eggs) - Phable
- [CTA button examples](https://www.involve.me/blog/100-call-to-action-button-examples) - Involve.me

---
*Feature research for: Cinematic mystery teaser / pre-launch hype landing page*
*Researched: 2026-02-12*
