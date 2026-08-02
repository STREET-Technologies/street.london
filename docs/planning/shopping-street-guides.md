# London shopping street guides — content engine spec

**Linear:** TT-407 (Urgent) · **Related:** TT-239 (delivery cluster), TT-393 (brand SERP)
**Written:** 2026-08-02

## Why

street.london has 11 routes and none of them is a content page. A site audit found no
critical issues, which confirms the problem is not technical — there is no surface for
organic search to rank. Current performance is 460 impressions and 8 clicks over 28 days.

Retailer acquisition was tested as a search channel and rejected: 20 of 28 retailer-side
terms returned no volume at all, and the two with real CPC (£20.21, £23.91) sit on ~10
searches/month each. Retailers come from cold calling, Shopify market research, and the
founders' network. Consumer visibility is what gives that motion its pitch.

So: one consumer-facing editorial engine. Retailer acquisition rides on its visibility.

## Architecture

Hub and spoke. Pillar links down to all five spokes; each spoke links up to the pillar and
sideways to two neighbours. The internal linking is what makes the cluster rank as a unit
rather than six orphans.

| Route | Target | Vol/mo | KD |
|---|---|---|---|
| `/shopping` | london shopping areas · shopping streets london | ~7,270 | 7–17 |
| `/shopping/carnaby-street` | carnaby street shops · soho shopping london | ~8,150 | 0–6 |
| `/shopping/kings-road` | kings road shops · kings road shopping | ~6,870 | 3–4 |
| `/shopping/notting-hill` | notting hill shops · shopping in notting hill | ~4,910 | 0 |
| `/shopping/kensington-high-street` | kensington high street shops | ~4,610 | 0–1 |
| `/shopping/marylebone-high-street` | marylebone high street shops · marylebone shops | ~4,290 | 0 |

**No Chelsea page.** `chelsea shopping london` is 140/mo; `kings road shops` alone is
5,400. A borough page would cannibalise the street page carrying the volume. Search
demand organises by street, not borough — which matches both the product and the brand.

## Partner exclusion list

**Do not name in published copy:**

- **Percival** — signed partner
- **Nobody's Child** — demo held, in flight

Both sit in the Soho/Carnaby area, so the Carnaby guide is the page most at risk.
Everyone else is fair game. This list lives here, not in Linear and not in published copy.
Re-check it before each new page ships — it will grow as retailers sign.

## Page template

1. Street character and history — what makes it distinct
2. What it is known for today — categories and quarters, not a directory dump
3. What you will find — the actual browsing experience, block by block
4. Practical detail — nearest tube, best day to visit, where to eat nearby
5. Close: celebrate the street, then offer the bridge. Waitlist CTA **at the foot, not the
   top**

Target 900–1,200 words. Metadata description 70–160 characters.

### The close, specifically

STREET is an **extension** of the street, never a substitute for it. Every guide ends by
telling the reader the place is worth the trip, and then offering to cover the weeks they
cannot make it. The pattern locked on the Carnaby draft:

> Go when you can. We will cover the weeks you cannot.

This is not just tone. A guide that ends "skip the visit, order online" undercuts the 900
words above it, and reads to any shop owner who finds the page as a threat to footfall.
Retailers will find these pages, and the retailer pitch is reach, not replacement. The copy
must not contradict the sales conversation.

## Editorial rules

- **No em dashes. No AI-isms.** Plain, confident, specific.
- Premium lifestyle register — Fenwick-tier, not discount-tier.
- The bar is genuinely useful, not rank-shaped. Google's helpful-content systems bury thin
  aggregation, and at KD 4 the competition is Visit London and TimeOut, who do this well.
  A page that reads as generated will neither rank nor convert.
- Specificity is the whole game. "Independent menswear on Newburgh Street" beats "a range
  of quality retailers".

## The shop list is a walk, not a directory

Locked on the Carnaby page. Shops are listed **in the order you meet them**, grouped by
street, hung off a route spine with numbered waypoints. The markup is `.route` /
`.route-leg` / `.route-stop`, shared by every guide.

Two patterns were tried and rejected, both for being the obvious AI answer:

- **Card grid.** A `repeat(auto-fit, minmax(240px, 1fr))` grid of boxes with a
  `border-left: 3px solid` accent. The Impeccable skill bans both by name: side-stripe
  borders ("never intentional") and identical card grids.
- **Ruled editorial index.** Display type, small tracked labels, hairline rules. This is
  the *second-order* trap: the skill lists "editorial-typographic" as a saturated
  reflex-reject lane, so the magazine answer is only one tier less generic than the cards.

The walk is right because the page describes a walk. Numbering is real sequence, which is
the only condition under which the skill permits numbered markers.

## Sourcing and attribution

**Facts yes, prose never.** Which shops trade on a street, their door numbers, and what
they sell are facts and are not copyrightable. Sentences describing them are, and crediting
the source does not change that. Read the source, take the facts, write our own copy, link
out.

Street numbers appear **only where a source confirms them**. A name without a number means
the shop is confirmed on the street but the door number is not. Do not invent precision.

Carnaby's Newburgh Street list is cross-checked against
[This Is Soho](https://www.thisissoho.co.uk/every-street-has-a-story/newburgh-street/),
credited in the page. That check corrected one error already: Mark Powell is on Newburgh
Street, not Marshall Street. Find the equivalent local authority for each remaining area.

## Imagery and licensing

**Facts and photographs are governed differently. Do not apply the sourcing rule above to
images.** A credit line is not a licence. Republishing a third party's photograph without
permission is infringement whether or not we name them, and these are public, indexed,
commercial pages.

Permitted sources, in order of preference:

1. **Our own photography.** The real answer, and the same shoot feeds Instagram and TikTok.
2. **Explicit permission.** Worth asking This Is Soho directly; a credit-and-link
   arrangement with a local Soho authority is plausible and may open a partnership.
3. **Properly licensed stock.** Unsplash permits commercial use with no attribution
   required. **Verify every URL resolves before shipping it** — guessed photo IDs look
   plausible and render as broken images. Unsplash blocks automated fetching, so IDs must
   be collected by hand in a browser.

Placeholders are a temporary state, not a design choice. Drop files at
`public/img/shopping/<area>-hero.jpg` and `<area>-inline.jpg` and swap the
`.guide-figure-placeholder` div for `next/image`.

## Verify before publishing

Named shop tenancies must be checked against current reality. Retail turnover on these
streets is high and drafts should be treated as unverified on specifics. Durable anchors
(Liberty, Kingly Court, Newburgh Quarter) are safe; individual shop names are not until
confirmed. **This is a hard gate — a guide with closed shops in it is worse than no guide.**

## Technical

- Server components. No client component unless there is interactivity — these must be
  server-rendered for crawlers.
- Follow the existing `TITLE` / `DESCRIPTION` const pattern feeding `metadata`,
  `openGraph` and `twitter` from one place (see `app/demo/page.tsx`).
- Add every route to `app/sitemap.ts`. Suggested priority 0.8, changeFrequency monthly.
- **Do not touch `proxy.ts`.** Its bot user-agent exemption is load-bearing for how
  crawlers see the site.
- Canonical per page, absolute URL, no trailing slash.

## Social

Each spoke is one shoot and roughly 8–10 posts — street-level, visual, location-tagged.
Postiz is already self-hosted, so scheduling is solved. Same research, three surfaces.
Instagram is also where London boutiques themselves are, making social the surface where
prospective retailers notice consumer traction.

## Measurement

Baseline recorded 2026-08-02: **460 impressions, 8 clicks, 28 days**, all clicks on the
homepage. Re-run the same Search Console pull at 4 and 8 weeks post-publication. Free —
GSC data costs no DataForSEO credit.

Do not judge before week 4. New pages take 4–6 weeks to register and 3–6 months to rank
meaningfully.

## Out of scope

- Retailer-targeted content — no search demand, tested and rejected
- The "online shopping london" cluster — KD 64–95 for 10–110/mo, abandoned
- Per-retailer pages — blocked until retailers are live and opted in (see TT-239)
- Bare brand terms (`street online` KD 100, `street website` KD 79) — unwinnable

## Sequence

Carnaby Street first, in full. Lock voice and template on that page, then produce the
pillar and remaining four against the approved pattern.
