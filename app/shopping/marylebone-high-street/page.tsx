import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Marylebone High Street Shops: A Village Shopping Guide';
const DESCRIPTION =
  'A guide to shopping Marylebone High Street, the estate that rebuilt it around independents, and the Sunday farmers market on Cramer Street.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/marylebone-high-street' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/marylebone-high-street',
    images: [{ url: 'https://street.london/img/shopping/og/marylebone-high-street.jpg', width: 1200, height: 630, alt: 'Shopping Marylebone High Street with STREET.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://street.london/img/shopping/og/marylebone-high-street.jpg'],
  },
};

// PLACEHOLDER DATA — researched, not verified. Confirm every tenancy before
// production. Partner exclusions (do not add): Percival, Nobody's Child.
// See docs/planning/shopping-street-guides.md
const ROUTE = [
  {
    street: 'Marylebone High Street',
    stores: [
      { name: 'Daunt Books', at: 'No. 83 to 84', note: 'An Edwardian bookshop from 1912 with oak galleries and a long skylight, shelved by country rather than genre. Worth the visit even if you buy nothing.' },
      { name: 'The Ginger Pig', at: '', note: 'A butcher with its own farm in North Yorkshire. People cross London for the sausages.' },
    ],
  },
  {
    street: 'Moxon Street',
    stores: [
      { name: 'La Fromagerie', at: '', note: "Patricia Michelson's cheese room, with a tasting café attached. Go in cold and ask." },
    ],
  },
  {
    street: 'Marylebone Lane',
    stores: [
      { name: 'V V Rouleaux', at: '', note: 'Ribbons, trimmings and braid, in a shop that should not still exist and thankfully does.' },
    ],
  },
  {
    street: 'Cramer Street car park',
    stores: [
      { name: 'Marylebone Farmers Market', at: 'Sundays', note: 'Around forty producers of British seasonal food, every Sunday since 2003. The reason to come at the weekend.' },
    ],
  },
];

export default function MaryleboneHighStreetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "London shopping areas", "item": "https://street.london/shopping" },
            { "@type": "ListItem", "position": 2, "name": "Marylebone High Street", "item": "https://street.london/shopping/marylebone-high-street" }
          ]
        }) }}
      />
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Marylebone High Street</span>
          </nav>

          <h1 className="guide-title">Marylebone High Street Shops: A Village Shopping Guide</h1>
          <p className="guide-standfirst">
            The quietest shopping street in central London, and a lot of people would call it the finest. Fifteen minutes
            from Oxford Street and it does not feel like the same city.
          </p>

          <figure className="guide-figure guide-figure-hero">
            <Image
              src="/img/shopping/marylebone-high-street-hero.jpg"
              alt="Independent shopfronts in Marylebone: a newsagent with a striped awning, a menswear shop and a gallery, with tables on the pavement."
              width={1800}
              height={1200}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
            />
            <figcaption>
              Marylebone shopfronts. Small premises, one trade each, which is the whole character of the place. Photograph by Benjamin Cheng on Unsplash.
            </figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <h2>A landlord did this on purpose</h2>
              <p>
                Marylebone is not a village that survived by accident. It is one estate, held by one family
                through three hundred years and a run of female heirs, which is why its name changed from
                Newcastle to Oxford-Harley to Portland and finally to{' '}
                <strong>Howard de Walden</strong>, who inherited in 1879.
              </p>
              <p>
                Most of what you see was built around 1900, when the estate rebuilt the street as old leases
                fell in. Then it went wrong. By the mid 1990s roughly a third of the stores on the high street
                stood empty.
              </p>
              <p>
                What happened next is the interesting part. Rather than let the vacancies fill with whoever
                could pay, the estate curated the tenant mix deliberately, favouring independents and
                specialists over chains. Single ownership of a whole street is usually the enemy of character.
                Here it was the thing that saved it.
              </p>
              <p>
                That is why the street reads as a village. Someone decided it should.
              </p>
            </section>

            <section className="guide-section">
              <h2>Walking it</h2>
              <p>
                The high street is the spine, but three of the four you actually came for are round the corners off it.
                Take the side streets.
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
            </section>

            <section className="guide-section">
              <h2>Come for the food</h2>
              <p>
                Marylebone has the finest food shopping in central London and it is not particularly close. A
                butcher with its own farm, a cheese room with a tasting café, and forty producers in a car
                park every Sunday. You can do a genuine week&apos;s shop here from people who can tell you
                where everything came from.
              </p>
            </section>

            <section className="guide-section">
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Baker Street, on the Bakerloo, Jubilee, Circle, Hammersmith and City and Metropolitan lines, five minutes north. Bond Street on the Central, Jubilee and Elizabeth lines is a similar walk from the south.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Sunday for the farmers market. Any weekday morning if you want the street at its calmest.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>Two unhurried hours, which is the only speed this street works at.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
                  <dd>The Wallace Collection is on Manchester Square, five minutes south, and free. Regent&apos;s Park is ten minutes north.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, if you have the morning</h2>
              <p>
                Marylebone is the one street on this list where the shopping is the smaller half of the point.
                It is a place to spend two hours, not to complete a task.
              </p>
              <p>Which is exactly what most weeks do not have room for.</p>
              <p>
                STREET brings the same stores to your door. Browse what London&apos;s independent stores
                actually have, buy from the ones nearest you, and it comes to you instead.
                Marylebone is in our first launch area.
              </p>
              <p className="guide-cta-line">Go when you can. We will cover the weeks you cannot.</p>
              <Link href="/waitlist" className="btn btn-primary">
                Join the waitlist
              </Link>
            </section>

            <section className="guide-section">
              <h2>Nearby guides</h2>
              <p>
                <Link href="/shopping/carnaby-street" className="guide-area-link">
                  Carnaby Street
                </Link>{' '}
                is fifteen minutes south through Soho.{' '}
                <Link href="/shopping/notting-hill" className="guide-area-link">
                  Notting Hill
                </Link>{' '}
                is the opposite of this street in every way.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
