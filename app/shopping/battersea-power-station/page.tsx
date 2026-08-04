import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Battersea Power Station Shops: A Shopping Guide';
const DESCRIPTION =
  'A guide to shopping Battersea Power Station, from the restored Turbine Halls to Electric Boulevard and the Arcade food hall.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/battersea-power-station' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/battersea-power-station',
    images: [{ url: 'https://street.london/img/shopping/og/battersea-power-station.jpg', width: 1200, height: 630, alt: 'Shopping Battersea Power Station with STREET.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://street.london/img/shopping/og/battersea-power-station.jpg'],
  },
};

// Tenancies cross-checked against batterseapowerstation.co.uk/shop
// 2026-08-04 (Scamp & Dude also verified in person 2026-07-31). Hall/floor
// placements are still approximate — confirm on the ground before claiming
// locations. Partner exclusions (do not add): Percival, Nobody's Child.
// See docs/planning/shopping-street-guides.md
const ROUTE = [
  {
    street: 'Turbine Hall A and B',
    stores: [
      { name: 'Ralph Lauren', at: '', note: 'The Art Deco interiors do more for a shopfront than any fit-out could.' },
      { name: 'Mulberry', at: '', note: 'British leather, in a building that spent forty years derelict.' },
      { name: 'Nike', at: '', note: 'Bigger than the average branch, and busier at weekends.' },
      { name: 'Theory', at: '', note: 'Clean tailoring for people who buy once and keep it.' },
    ],
  },
  {
    street: 'Electric Boulevard',
    stores: [
      { name: 'Zara', at: '48,000 sq ft', note: 'Ground and upper ground. One of the largest branches in the country.' },
      { name: 'Anthropologie', at: 'opening soon', note: 'Lifestyle and homeware, next through the doors.' },
      { name: 'Uniqlo', at: '', note: 'The basics run, done properly.' },
      { name: 'Mango', at: '', note: 'Spanish, and consistently better in person than online.' },
    ],
  },
  {
    street: 'The beauty halls',
    stores: [
      { name: 'Le Labo', at: '', note: 'Fragrance blended in front of you and labelled with your name.' },
      { name: 'Aesop', at: '', note: 'The interiors are designed per site, so this one is worth a look on its own.' },
      { name: 'Penhaligon\'s', at: '', note: 'British scent since 1870, and the gifting answer when you have run out of ideas.' },
      { name: 'Moida K-Beauty', at: 'opened 2026', note: 'Korean skincare, and the reason this corner now gets queues.' },
    ],
  },
  {
    street: 'The independents',
    stores: [
      { name: 'Scamp & Dude', at: '', note: 'Independent British womenswear with a superhero streak, in among the flagships.' },
      { name: 'Curated Makers', at: '', note: 'More than forty local independent makers under one roof. If you came for the independents, start here.' },
      { name: 'The Battersea General Store', at: '', note: 'The clue is in the name: the local store, not a national anybody.' },
      { name: 'Postmark', at: '', note: 'An independent London card shop, for the thing you always remember on the way out.' },
    ],
  },
  {
    street: 'Arcade food hall',
    stores: [
      { name: 'Arcade', at: '24,000 sq ft', note: "Chef-led kitchens, three restaurants and two bars under one roof. Manna, Gracey's Pizza, Hero and Shatta & Toum among them." },
    ],
  },
];

export default function BatterseaPowerStationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "London shopping areas", "item": "https://street.london/shopping" },
            { "@type": "ListItem", "position": 2, "name": "Battersea Power Station", "item": "https://street.london/shopping/battersea-power-station" }
          ]
        }) }}
      />
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Battersea Power Station</span>
          </nav>

          <h1 className="guide-title">Battersea Power Station Shops: A Shopping Guide</h1>
          <p className="guide-standfirst">
            Every other destination in this guide happened slowly. This one was designed. Battersea Power
            Station is the newest retail address in London and the only one where you can see exactly what it
            was built to be.
          </p>

          <figure className="guide-figure guide-figure-hero">
            <Image
              src="/img/shopping/battersea-power-station-hero.jpg"
              alt="The restored interior of Battersea Power Station: twin staircases and escalators either side of a glass-fronted jewellery hall, brick columns rising several storeys above."
              width={1800}
              height={1137}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
            />
            <figcaption>
              Inside Turbine Hall A. The brick and steel were restored rather than replaced, which is the
              whole argument for coming. Photograph by Richard Harris on Pexels.
            </figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <h2>It powered Buckingham Palace</h2>
              <p>
                Work started in 1929 to a design by <strong>Giles Gilbert Scott</strong>. The first turbine
                hall generated power in 1933 with two chimneys; Turbine Hall B followed in 1944, and the
                fourth and final chimney went up in 1955.
              </p>
              <p>
                At its peak the station supplied a fifth of London&apos;s electricity, Buckingham Palace and
                the Houses of Parliament included. Coal gave way to oil, gas and nuclear, the running costs
                climbed, and it was fully decommissioned in 1983.
              </p>
              <p>
                Then it sat empty. For most of forty years the most recognisable industrial building in London
                was a listed ruin with weather coming through the roof, and a succession of redevelopment
                schemes that never got built.
              </p>
              <p>
                It opened to the public in <strong>October 2022</strong>, for the first time in its history.
                What had been the turbine halls is now retail, the coal yard is now a pedestrianised high
                street called Electric Boulevard, and there are more than 140 stores, bars, restaurants and
                venues on the site.
              </p>
            </section>

            <section className="guide-section">
              <h2>What it is, honestly</h2>
              <p>
                This is a development, not a high street that grew. There is no equivalent of Newburgh
                Quarter here, no rent gradient that lets an oddity survive round the back, and the tenant list
                is a curated one rather than an accident of a hundred years.
              </p>
              <p>
                What you get instead is scale, weather protection, and interiors nowhere else in London can
                match. The Art Deco turbine halls were restored rather than gutted, and walking a retail floor
                inside them is a genuinely different experience from walking one inside a shopping centre.
              </p>
              <p>Come for that. The brands you can find anywhere.</p>
            </section>

            <section className="guide-section">
              <h2>Walking it</h2>
              <p>
                Start inside, finish outside. The turbine halls are the reason to come and Electric Boulevard
                is where the volume is, so do them in that order and eat at the end.
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
              <h2>Electric Boulevard</h2>
              <p>
                London does not get new high streets often. This one is pedestrianised, purpose-built and runs
                between the power station and the river, and it is where most of the fashion volume sits,
                Zara&apos;s 48,000 square feet included.
              </p>
              <p>
                It is worth registering how unusual that is. Every other address in this guide inherited its
                shape from something else, a private royal road, a farm track, a medieval lane. This one was
                drawn.
              </p>
            </section>

            <section className="guide-section">
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Battersea Power Station, at the end of the Northern line extension, which comes out at the site. Vauxhall and Sloane Square are both a walk or a short bus.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Weekday mornings for the interiors without the crowds. Weekends are busy, and the food hall is busiest of all.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>Half a day if you are eating. Two hours if you are not.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
                  <dd>Battersea Park is a ten minute walk west, and the river path runs the length of the site.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, and make a day of it</h2>
              <p>
                Battersea rewards the trip in a way the others do not need to. The building is the attraction,
                the retail sits inside it, and there is nowhere else in the city where those two things are
                the same visit.
              </p>
              <p>It is also south of the river and on the way to nothing, so it works better as a plan than a detour.</p>
              <p>
                STREET connects you to London&apos;s independents from wherever you are. Browse what
                they actually have, buy from the ones nearest you, and it comes to you instead.
                Battersea is in our first launch area.
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
                is over the bridge and the closest of the others.{' '}
                <Link href="/shopping/marylebone-high-street" className="guide-area-link">
                  Marylebone High Street
                </Link>{' '}
                is the opposite kind of place entirely.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
