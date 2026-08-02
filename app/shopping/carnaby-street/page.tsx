import type { Metadata } from 'next';
import Image from 'next/image';
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
// Street numbers appear only where a source confirms them. Names without a
// number are confirmed as trading on the street but the door number is not.
const ROUTE = [
  {
    street: 'Newburgh Street',
    shops: [
      { name: "Annie's Ibiza", at: '', note: 'Vintage and party dresses, arranged like a dressing-up box for adults.' },
      { name: 'Aubin', at: '', note: 'British heritage clothing, relaxed tailoring, denim done properly.' },
      { name: 'RRL', at: '', note: "Ralph Lauren's selvedge denim and vintage workwear line." },
      { name: 'Mark Powell', at: '', note: 'Bespoke Soho tailoring with a sharp, unmistakably British cut.' },
      { name: 'Metal Morphosis', at: '', note: 'Piercing and jewellery, thirty years in the same trade on the same street.' },
      { name: 'The White Horse', at: '', note: 'A pub on this corner since the 1930s, which tells you what kind of street it is.' },
    ],
  },
  {
    street: "Foubert's Place",
    shops: [
      { name: 'Soho Home', at: 'No. 31', note: 'Homeware and furniture lifted straight from the Soho House interiors.' },
      { name: 'Shinola', at: 'No. 28', note: 'Detroit-built watches, leather goods, journals and bicycles.' },
      { name: 'Zahter', at: 'No. 30 to 32', note: 'Turkish cooking, and the best reason to stop before you reach Carnaby Street.' },
    ],
  },
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

          <figure className="guide-figure guide-figure-hero">
            <Image
              src="/img/shopping/carnaby-hero.jpg"
              alt="The Welcome to Carnaby Street arch spanning the pedestrianised street, painted shopfronts either side."
              width={1800}
              height={1200}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
            />
            <figcaption>
              The arch everyone photographs, at the Great Marlborough Street end. Photograph by Anthony
              Delanoix on Unsplash.
            </figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <p>The shopping worth the trip sits in the lanes either side.</p>
            </section>

            <section className="guide-section">
              <h2>A short history, because it explains the layout</h2>
              <p>
                Carnaby made its name in the 1960s on menswear. <strong>John Stephen</strong> opened His
                Clothes at 5 Carnaby Street in 1957, having been burned out of his original Beak Street
                premises the year before. By 1967 he ran fifteen shops on the street and the press had taken
                to calling him the King of Carnaby Street. He dressed the mods who made the place a
                destination and, briefly, a synonym for London itself. By 1965 the Small Faces, the Who, the
                Kinks and the Rolling Stones were all regulars.
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
                surface in nylon printed with geometric patterns.
              </p>

              <blockquote className="guide-quote">
                <p>Like the bathroom of some trendy giant.</p>
                <cite>Daily Mirror, on the new Carnaby Street, 1973</cite>
              </blockquote>

              <p>
                The nylon is long gone. The pedestrians stayed, and footfall rose by about 30 percent. The
                wider estate is owned and managed today as a single portfolio by{' '}
                <strong>Shaftesbury Capital</strong>, which is why the tenant mix feels curated rather than
                accidental.
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

              {/* No Newburgh Quarter image yet. One decisive photo beats one photo plus a grey
                  box, so this slot stays out until our own shoot lands. */}

              <p>
                Walk it in this order and you will not double back. Start at the north end of Newburgh Street
                and finish on Foubert&apos;s Place, which puts you back on Carnaby Street when you are done.
              </p>

              <ol className="route">
                {ROUTE.map((leg) => (
                  <li className="route-leg" key={leg.street}>
                    <h3 className="route-street">{leg.street}</h3>
                    <ul className="route-stops">
                      {leg.shops.map((shop) => (
                        <li className="route-stop" key={shop.name}>
                          <p className="route-stop-name">
                            {shop.name}
                            {shop.at ? <span className="route-stop-at">{shop.at}</span> : null}
                          </p>
                          <p className="route-stop-note">{shop.note}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              <p className="route-credit">
                Shops on Newburgh Street cross-checked against{' '}
                <a href="https://www.thisissoho.co.uk/every-street-has-a-story/newburgh-street/" target="_blank" rel="noopener noreferrer">
                  This Is Soho
                </a>
                , who know the street better than we do.
              </p>

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
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Oxford Circus, three minutes&apos; walk, on the Central, Bakerloo and Victoria lines. Piccadilly Circus is a similar distance from the southern end.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Weekday mornings for browsing, late afternoons for the courtyard. Saturdays are for people who enjoy crowds.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>Two hours to do the main street and Newburgh Quarter properly. Half a day if you are eating.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
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
