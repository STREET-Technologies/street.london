import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Kings Road Shops: A Guide to Shopping in Chelsea';
const DESCRIPTION =
  "A guide to shopping the Kings Road, from Duke of York Square at the Sloane Square end to World's End, where punk was assembled.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/kings-road' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/kings-road',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'Shopping the Kings Road in Chelsea with STREET.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

// PLACEHOLDER DATA — researched, not verified. Confirm every tenancy before
// production. Partner exclusions (do not add): Percival, Nobody's Child.
// See docs/planning/shopping-street-guides.md
const ROUTE = [
  {
    street: 'Duke of York Square',
    shops: [
      { name: 'Hayley Menzies', at: '', note: 'Two floors of maximalist print, silk dresses and statement knits.' },
      { name: 'Space NK', at: '', note: 'Beauty, and the branch people travel for.' },
      { name: 'Saturday food market', at: '', note: 'Traders fill the square every Saturday, which is the day to come.' },
    ],
  },
  {
    street: 'Kings Road, the middle stretch',
    shops: [
      { name: 'RIXO', at: '', note: 'Hand-painted prints, and the label that put this stretch back on the map.' },
      { name: 'GANNI', at: '', note: 'Copenhagen tailoring with the volume turned up.' },
      { name: "Penhaligon's", at: '', note: 'British perfumery since 1870, and the packaging alone is worth the stop.' },
      { name: 'Toast', at: '', note: 'Quiet linens and homeware for people who have stopped chasing trends.' },
    ],
  },
  {
    street: "World's End",
    shops: [
      { name: '430 Kings Road', at: 'No. 430', note: "The shop that has been Paradise Garage, SEX, Seditionaries and World's End. Punk was assembled behind this door." },
    ],
  },
];

export default function KingsRoadPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Kings Road</span>
          </nav>

          <h1 className="guide-title">Kings Road Shops: A Guide to Shopping in Chelsea</h1>
          <p className="guide-standfirst">
            The Kings Road is a mile and a half long and changes character roughly every four hundred yards.
            Walk it east to west and you get the whole story: polished at Sloane Square, stranger by the time
            you reach the other end.
          </p>

          <figure className="guide-figure guide-figure-hero">
            <Image
              src="/img/shopping/kings-road-hero.jpg"
              alt="A terrace of pastel-painted Chelsea townhouses behind street trees in blossom."
              width={1800}
              height={1200}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
            />
            <figcaption>
              Chelsea off the main road. The Kings Road itself is one long straight run; the streets either side look like this. Photograph by Anthony Delanoix on Unsplash.
            </figcaption>
          </figure>

          <div className="guide-content">
            <section className="guide-section">
              <h2>It was a private road first</h2>
              <p>
                The name is literal. <strong>Charles II</strong> had it built in the late seventeenth century
                as his private route from St James&apos;s to Hampton Court, and it stayed closed to the public
                for well over a century. That origin explains the shape of it: one long straight run rather
                than the tangle of lanes you get in Soho.
              </p>
              <p>
                Two fashion revolutions started here, twenty years apart, and both began in a single shop.
              </p>
              <p>
                In 1955 <strong>Mary Quant</strong> opened Bazaar at 138a, selling clothes she wanted to wear
                and could not find. The miniskirt came out of that shop and the Kings Road became the place
                young London bought its clothes.
              </p>
              <p>
                In 1971 Trevor Myles was running a shop called Paradise Garage at number 430 and rented the
                back of it to <strong>Vivienne Westwood</strong> and Malcolm McLaren. By 1974 the frontage
                carried four feet of pink padded plastic spelling SEX, and the shop was selling rubber, PVC
                and fetish wear. Tartan, leather and bondage straps went out of that door and became the
                uniform of British punk.
              </p>
              <p>
                Number 430 is still trading, under its fourth or fifth name. The Kings Road has roughly 160
                shops now and none of the others have that on their record.
              </p>
            </section>

            <section className="guide-section">
              <h2>Walking it</h2>
              <p>
                Start at Sloane Square and walk west. The shopping gets less predictable the further you go,
                which is the right direction to travel.
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
            </section>

            <section className="guide-section">
              <h2>Duke of York Square</h2>
              <p>
                Just off the main road, and the part of Chelsea that works hardest. The square mixes the
                serious luxury houses with independents selling books, homeware, jewellery and children&apos;s
                clothes, and it has the Saatchi Gallery on one side if the shopping runs out of road.
              </p>
              <p>
                Come on a Saturday for the food market. It is the one day the square stops feeling like a
                shopping development and starts feeling like a place.
              </p>
            </section>

            <section className="guide-section">
              <h2>Where it gets interesting</h2>
              <p>
                West of the Town Hall the rents drop and the shops loosen up. This is the stretch that still
                has vintage, odd homeware and the occasional shop you cannot categorise. Most visitors turn
                back before they reach it, which is exactly why it is worth the extra twenty minutes.
              </p>
            </section>

            <section className="guide-section">
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Sloane Square, on the District and Circle lines, at the eastern end. The western end has no tube at all, so plan to walk back or catch a bus along the road.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Saturday for the Duke of York Square market. Weekday afternoons if you want the shops to yourself.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>Three hours to walk the length properly. Two if you stop at the Town Hall and turn back.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
                  <dd>The Saatchi Gallery is on Duke of York Square, the Royal Court Theatre is on Sloane Square, and Chelsea Physic Garden is a ten minute walk south.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, if you have the afternoon</h2>
              <p>
                The Kings Road is a walk before it is a shopping trip. A mile and a half of it, changing as
                you go, and no map tells you which of the 160 shops is worth your time on the day.
              </p>
              <p>Most of us do not have the afternoon.</p>
              <p>
                STREET brings the same shops to your door. Browse what London&apos;s independent shops
                actually have on the shelf, buy from the ones nearest you, and have it delivered the same day.
                Chelsea is in our first launch area.
              </p>
              <p className="guide-cta-line">Go when you can. We will cover the weeks you cannot.</p>
              <Link href="/waitlist" className="btn btn-primary">
                Join the waitlist
              </Link>
            </section>

            <section className="guide-section">
              <h2>Nearby guides</h2>
              <p>
                <Link href="/shopping/kensington-high-street" className="guide-area-link">
                  Kensington High Street
                </Link>{' '}
                is fifteen minutes north.{' '}
                <Link href="/shopping/notting-hill" className="guide-area-link">
                  Notting Hill
                </Link>{' '}
                is the next one worth a Saturday.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
