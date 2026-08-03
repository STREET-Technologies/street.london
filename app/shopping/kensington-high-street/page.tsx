import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Kensington High Street Shops: A Shopping Guide';
const DESCRIPTION =
  'A guide to shopping Kensington High Street, the department store architecture it inherited, and what actually trades there now.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/kensington-high-street' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/kensington-high-street',
    images: [{ url: 'https://street.london/img/shopping/og/kensington-high-street.jpg', width: 1200, height: 630, alt: 'Shopping Kensington High Street with STREET.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://street.london/img/shopping/og/kensington-high-street.jpg'],
  },
};

// PLACEHOLDER DATA — researched, not verified. Confirm every tenancy before
// production. Partner exclusions (do not add): Percival, Nobody's Child.
// See docs/planning/shopping-street-guides.md
const ROUTE = [
  {
    street: 'The Barkers building',
    stores: [
      { name: 'Whole Foods Market', at: '', note: 'The largest branch in the country, in the Art Deco shell of a department store that ran for 135 years.' },
    ],
  },
  {
    street: 'The main run, east to west',
    stores: [
      { name: 'Urban Outfitters', at: '', note: 'The anchor at the younger end of the street.' },
      { name: 'Reiss', at: '', note: 'Tailoring that behaves itself.' },
      { name: 'The Kooples', at: '', note: 'Parisian, and a reliable stop for a jacket.' },
      { name: 'Sweaty Betty', at: '', note: 'Activewear, and the Kensington branch is a large one.' },
      { name: "Neal's Yard Remedies", at: '', note: 'Organic skincare in the blue bottles, from a British herbalist that started in Covent Garden.' },
    ],
  },
];

export default function KensingtonHighStreetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "London shopping areas", "item": "https://street.london/shopping" },
            { "@type": "ListItem", "position": 2, "name": "Kensington High Street", "item": "https://street.london/shopping/kensington-high-street" }
          ]
        }) }}
      />
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Kensington High Street</span>
          </nav>

          <h1 className="guide-title">Kensington High Street Shops: A Shopping Guide</h1>
          <p className="guide-standfirst">
            This was once the most glamorous shopping street in London. It is now a very good high street in
            the shell of something grander, and knowing that is the key to enjoying it.
          </p>

          <figure className="guide-figure guide-figure-hero">
            <Image
              src="/img/shopping/kensington-high-street-hero.jpg"
              alt="A green-painted florist shopfront and a small gallery in a white stucco Kensington terrace."
              width={1800}
              height={1192}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
            />
            <figcaption>
              Kensington shopfronts a few streets off the main run, where the independents sit. Photograph by Tom McCarten on Pexels.
            </figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <h2>Three department stores and a roof garden</h2>
              <p>
                From the late nineteenth century until the mid 1970s this street carried three full department
                stores at once: Barkers, Derry &amp; Toms and Pontings. No other high street in London
                supported that.
              </p>
              <p>
                <strong>Derry &amp; Toms</strong> opened in 1860 and rebuilt in 1933 as a seven-storey Art
                Deco building by Bernard George. Between 1936 and 1938 the landscape architect Ralph Hancock
                laid out a garden on the roof: an acre and a half, three separate gardens, five hundred
                species of plant, a stream, fountains, ducks and flamingos. It cost twenty-five thousand
                pounds and it was the largest roof garden in Europe.
              </p>
              <p>
                In 1973 the building became <strong>Big Biba</strong>, the most extravagant shop London had
                seen, and the Art Deco was pushed further still. It closed in 1975. Kensington Market, three
                floors of independent stalls that opened in 1967, lasted until 2000. Barkers held on until
                January 2006 and then closed after 135 years.
              </p>
              <p>
                What is left is the architecture, and it is worth looking up at. The shopping underneath it is
                more ordinary now, and there is no point pretending otherwise.
              </p>
            </section>

            <section className="guide-section">
              <h2>What it is good for</h2>
              <p>
                One straight line, everything on it, done in an hour. If you know what you need and want to
                buy it without a project, this street beats Carnaby and the Kings Road comfortably.
              </p>

              <ol className="route">
                {ROUTE.map((leg) => (
                  <li className="route-leg" key={leg.street}>
                    <h3 className="route-street">{leg.street}</h3>
                    <ul className="route-stops">
                      {leg.stores.map((shop) => (
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

              <p>
                It is a high street, and the names on it are names you know. That is the trade: less
                discovery than Newburgh Quarter, far less walking than the Kings Road, and you will be
                finished before lunch.
              </p>
            </section>

            <section className="guide-section">
              <h2>Look up</h2>
              <p>
                What is worth most on Kensington High Street costs nothing. The Derry &amp; Toms frontage, the Barkers
                building, the metalwork and the relief panels are all still there above the shopfronts, and
                almost nobody shopping below ever raises their eyes to them.
              </p>
            </section>

            <section className="guide-section">
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>High Street Kensington, on the District and Circle lines, which comes out directly onto the street.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Any weekday. This is not a street that rewards a special trip on a Saturday.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>An hour to ninety minutes. It is one line and you will not get lost.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
                  <dd>The Design Museum is at the western end, Kensington Palace and Kensington Gardens are five minutes north, and Holland Park is a short walk west.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, if you are passing</h2>
              <p>
                Kensington High Street is the most efficient shopping in west London and the handsomest street
                to do it on. Both of those are worth something.
              </p>
              <p>It is still an hour on a tube and an hour back.</p>
              <p>
                STREET brings the same stores to your door. Browse what London&apos;s independent stores
                actually have on the shelf, buy from the ones nearest you, and have it delivered the same day.
                Kensington is in our first launch area.
              </p>
              <p className="guide-cta-line">Go when you can. We will cover the weeks you cannot.</p>
              <Link href="/waitlist" className="btn btn-primary">
                Join the waitlist
              </Link>
            </section>

            <section className="guide-section">
              <h2>Nearby guides</h2>
              <p>
                <Link href="/shopping/kings-road" className="guide-area-link">
                  Kings Road
                </Link>{' '}
                is fifteen minutes south.{' '}
                <Link href="/shopping/notting-hill" className="guide-area-link">
                  Notting Hill
                </Link>{' '}
                is north, past Holland Park.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
