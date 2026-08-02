import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Carnaby Street Shops: Where to Shop in Soho';
const DESCRIPTION =
  'A guide to shopping Carnaby Street and the wider Soho estate, from the independent boutiques of Newburgh Quarter to Kingly Court.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/carnaby-street' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/carnaby-street',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'Shopping Carnaby Street and Soho with STREET.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

// PLACEHOLDER DATA — researched, not verified. To be replaced with the list from the
// SLT session. Retail turnover here is high; confirm every tenancy before this ships.
// Partner exclusions (do not add): Percival, Nobody's Child.
// See docs/planning/shopping-street-guides.md
const SHOPS = [
  { name: "Annie's Ibiza", address: '3 Newburgh Street', note: 'Vintage and party-wear, styled like a dressing-up box for adults.' },
  { name: 'Aubin', address: '15 Newburgh Street', note: 'British menswear and womenswear, relaxed tailoring, denim done properly.' },
  { name: 'Soho Home', address: "31 Foubert's Place", note: 'Homeware and furniture lifted straight from the Soho House interiors.' },
  { name: 'Shinola', address: "28 Foubert's Place", note: 'Detroit-built watches, leather goods, journals and bicycles.' },
  { name: 'Mark Powell', address: 'Marshall Street', note: 'Bespoke Soho tailoring with a sharp, unmistakably British cut.' },
  { name: 'Peckham Rye', address: 'Newburgh Street', note: 'Silk ties, scarves and pocket squares from a family business dating to 1799.' },
];

export default function CarnabyStreetPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Carnaby Street</span>
          </nav>

          <h1 className="guide-title">Carnaby Street Shops: Where to Shop in Soho</h1>
          <p className="guide-standfirst">
            Carnaby Street is a neighbourhood pretending to be a street. Most people walk the pedestrianised
            main run between Great Marlborough Street and Broadwick Street, photograph the arch, and leave.
            That stretch is the least interesting part of it.
          </p>

          {/* PLACEHOLDER — awaiting own photography. Do not ship with placeholders visible.
              Replace with <Image /> once the Carnaby shoot lands. Same shoot feeds social. */}
          <figure className="guide-figure guide-figure-hero">
            <div className="guide-figure-placeholder">
              <span className="guide-figure-label">Carnaby Street photography</span>
              <span className="guide-figure-hint">Hero image, 16:9</span>
            </div>
            <figcaption>The pedestrianised run between Great Marlborough Street and Broadwick Street.</figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <p>The shopping worth the trip sits in the lanes either side.</p>
            </section>

            <section className="guide-section">
              <h2>A short history, because it explains the layout</h2>
              <p>
                Carnaby made its name in the 1960s on menswear. John Stephen opened His Clothes at 5 Carnaby
                Street in 1957, having been burned out of his original Beak Street premises the year before.
                By 1967 he ran fifteen shops on the street and the press had taken to calling him the King of
                Carnaby Street. He dressed the mods who made the place a destination and, briefly, a synonym
                for London itself. By 1965 the Small Faces, the Who, the Kinks and the Rolling Stones were all
                regulars.
              </p>
              <p>
                That history matters for a practical reason. The area was built as a warren of small premises
                rather than department-store footprints, and it never got rebuilt. The result is that
                independent shops can still afford a door here, which is why the neighbourhood has aged better
                than Oxford Street two minutes north.
              </p>
              <p>
                In October 1973 the Greater London Council closed the street to traffic between 11am and 8pm,
                along with several side roads including Foubert&apos;s Place and Ganton Street, and paved the
                surface in nylon printed with geometric patterns. The Daily Mirror called it the bathroom of
                some trendy giant. The nylon is long gone. The pedestrians stayed, and footfall rose by about
                30 percent.
              </p>
              <p>
                The wider estate is owned and managed today as a single portfolio by Shaftesbury Capital,
                which is why the tenant mix feels curated rather than accidental.
              </p>
            </section>

            <section className="guide-section">
              <h2>Newburgh Quarter, where the good shopping is</h2>
              <p>
                If you have an hour, spend it here. Newburgh Street, Foubert&apos;s Place, Marshall Street,
                Lowndes Court, Marlborough Court and Ganton Street form a pocket of independent and
                small-chain retail immediately east of Carnaby Street.
              </p>
              <p>
                The mix skews toward considered menswear, contemporary womenswear, denim specialists and
                footwear, with a handful of skate and streetwear shops that have been there long enough to
                have outlasted several waves of fashion. Shops are small. Stock is edited rather than piled.
                Staff generally know what they are selling, which is increasingly rare within walking distance
                of Oxford Circus.
              </p>

              <figure className="guide-figure">
                <div className="guide-figure-placeholder">
                  <span className="guide-figure-label">Newburgh Quarter photography</span>
                  <span className="guide-figure-hint">Inline image, 3:2</span>
                </div>
                <figcaption>Newburgh Street, where the premises are too small for chains to bother with.</figcaption>
              </figure>

              <ul className="guide-shops">
                {SHOPS.map((shop) => (
                  <li key={shop.name} className="guide-shop">
                    <h3>{shop.name}</h3>
                    <p className="guide-shop-address">{shop.address}</p>
                    <p className="guide-shop-note">{shop.note}</p>
                  </li>
                ))}
              </ul>

              <p>This is the part of the neighbourhood that rewards a slow walk rather than a list.</p>
            </section>

            <section className="guide-section">
              <h2>Carnaby Street itself</h2>
              <p>
                The main run is where the recognisable names sit: established British labels, a few flagship
                concept stores, and the seasonal installations the estate is known for. It is busier, louder
                and more commercial than the surrounding lanes, and it is the right place to start if you want
                to cover ground quickly.
              </p>
              <p>
                Go on a weekday morning if you can. By Saturday afternoon the street is moving at a shuffle
                and browsing stops being pleasant.
              </p>
            </section>

            <section className="guide-section">
              <h2>Kingly Court</h2>
              <p>
                Kingly Court is a three-storey open courtyard off the southern end of Carnaby Street, and it
                is where the neighbourhood eats. Around twenty restaurants and bars are stacked around a
                central well, with tables spilling onto every level.
              </p>
              <p>
                It is the natural break in a shopping afternoon: you can see everything on offer from the
                ground floor before committing, which is more than most of Soho allows.
              </p>
            </section>

            <section className="guide-section">
              <h2>Liberty, at the top of the street</h2>
              <p>
                Liberty sits on Great Marlborough Street at the northern end, in the mock-Tudor building that
                everyone photographs. It is technically not on Carnaby Street, and it is unmissable anyway.
                The fabric department and the beauty hall are worth the detour even if you buy nothing.
              </p>
            </section>

            <section className="guide-section">
              <h2>Practical</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Oxford Circus, three minutes&apos; walk, on the Central, Bakerloo and Victoria lines. Piccadilly Circus is a similar distance from the southern end.</dd>
                </div>
                <div>
                  <dt>Best time to go</dt>
                  <dd>Weekday mornings for browsing, late afternoons for the courtyard. Saturdays are for people who enjoy crowds.</dd>
                </div>
                <div>
                  <dt>Give it</dt>
                  <dd>Two hours to do the main street and Newburgh Quarter properly. Half a day if you are eating.</dd>
                </div>
                <div>
                  <dt>Nearby</dt>
                  <dd>Regent Street is one block west, Soho proper begins immediately south across Beak Street, and Oxford Street is two minutes north if you need a chain.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, if you have the afternoon</h2>
              <p>
                Carnaby rewards the walk. The lanes are the point, Kingly Court is worth an hour on its own,
                and nothing online replaces finding something in a window you were not looking for.
              </p>
              <p>Most of us do not have the afternoon.</p>
              <p>
                STREET brings the same shops to your door. Browse what London&apos;s independent shops actually
                have on the shelf, buy from the ones nearest you, and have it delivered the same day. Carnaby
                and the wider Soho estate are in our first launch area.
              </p>
              <p className="guide-cta-line">Go when you can. We will cover the weeks you cannot.</p>
              <Link href="/waitlist" className="btn btn-primary">
                Join the waitlist
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
