import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TITLE = 'Notting Hill Shops: Where to Shop on Portobello Road and Beyond';
const DESCRIPTION =
  'A guide to shopping Notting Hill: what runs where on Portobello Road, and the boutiques on Westbourne Grove, Ledbury Road and Golborne Road.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping/notting-hill' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping/notting-hill',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: 'Shopping Notting Hill and Portobello Road with STREET.' }],
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
    street: 'Portobello Road',
    shops: [
      { name: 'The antiques run', at: 'Chepstow Villas to Elgin Crescent', note: 'The famous stretch, and the reason most people come. Saturdays only if you want the dealers out.' },
      { name: 'Fresh produce', at: 'Elgin Crescent to Talbot Road', note: 'Where the market still does the job it was built for in the 1700s.' },
      { name: 'Vintage clothing', at: 'Talbot Road to the Westway', note: 'The best of the clothing, and busier than the antiques by mid-morning.' },
      { name: 'Second-hand goods', at: 'Westway to Golborne Road', note: 'Cheaper, scruffier, and the part locals actually shop.' },
    ],
  },
  {
    street: 'Westbourne Grove',
    shops: [
      { name: 'Wild at Heart', at: '', note: 'A florist with a shopfront half of Instagram has photographed.' },
      { name: 'RIXO', at: '', note: 'Hand-painted prints, and quieter here than on the Kings Road.' },
      { name: 'Sézane', at: '', note: 'French staples, and a shop that rewards going in with nothing in mind.' },
    ],
  },
  {
    street: 'Ledbury Road',
    shops: [
      { name: 'Caramel', at: '', note: 'Lifestyle and childrenswear with a vintage sensibility. Baskets, blankets, crockery, candles.' },
    ],
  },
  {
    street: 'Golborne Road',
    shops: [
      { name: 'The vintage furniture run', at: '', note: 'Most of a street given over to it, and the least performed part of the neighbourhood.' },
    ],
  },
];

export default function NottingHillPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/shopping">London shopping areas</Link>
            <span aria-hidden="true">/</span>
            <span>Notting Hill</span>
          </nav>

          <h1 className="guide-title">Notting Hill Shops: Where to Shop on Portobello Road and Beyond</h1>
          <p className="guide-standfirst">
            Come on a Saturday or do not come at all. Portobello Road runs five separate markets along its
            length and Saturday is the only day all of them trade. On a Tuesday you are walking down a
            pleasant residential street wondering what the fuss was about.
          </p>

          <div className="guide-content">
            <section className="guide-section">
              <h2>The market is older than the neighbourhood</h2>
              <p>
                Portobello Road was a country lane through farmland in the 1700s, running up to Portobello
                Farm. The farm took its name from a naval victory at Porto Bello in Panama in 1739, which is
                how a road in west London ended up named after a town on the Caribbean coast.
              </p>
              <p>
                Farmers sold produce along the lane from the beginning. The antiques trade arrived in the
                1940s and 1950s and never left. Today around a thousand traders work Portobello and Golborne
                between them, and more than a hundred thousand people come through on a Friday or Saturday.
              </p>
              <p>
                The 1999 film did the rest. It is worth knowing that the bookshop in it was invented, and that
                the crowds it created are the single biggest thing standing between you and a good morning
                here. Start early.
              </p>
            </section>

            <section className="guide-section">
              <h2>What runs where</h2>
              <p>
                The market is not one thing. It changes character four times over roughly a mile, and knowing
                the order saves you an hour of walking the wrong way.
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
              <h2>The shopping that is not the market</h2>
              <p>
                Most visitors do Portobello and leave, which is why the boutiques two streets east stay
                pleasant on the busiest day of the week. <strong>Westbourne Grove</strong> and{' '}
                <strong>Ledbury Road</strong> carry the fashion and homeware independents, and they are open
                the six days the market is not.
              </p>
              <p>
                If you want Notting Hill without the queue, this is the answer. Come on a weekday, skip the
                market entirely, and walk the Grove instead.
              </p>
            </section>

            <section className="guide-section">
              <h2>Go north</h2>
              <p>
                Push past the Westway to <strong>Golborne Road</strong> and the neighbourhood stops
                performing. Vintage furniture, Portuguese and Moroccan food, and prices that have not been set
                with tourists in mind. It is the part of Notting Hill that still belongs to the people who
                live there.
              </p>
            </section>

            <section className="guide-section">
              <h2>How do I get there?</h2>
              <dl className="guide-facts">
                <div>
                  <dt>Nearest tube</dt>
                  <dd>Notting Hill Gate, on the Central, District and Circle lines, for the southern end. Ladbroke Grove on the Hammersmith and City line puts you at the northern end near Golborne Road.</dd>
                </div>
                <div>
                  <dt>When to go</dt>
                  <dd>Saturday from 8.30am for the full market, and it peaks by noon. Any weekday for the boutiques without the crowds.</dd>
                </div>
                <div>
                  <dt>How long you need</dt>
                  <dd>Half a day for the market end to end. Two hours if you are only doing Westbourne Grove and Ledbury Road.</dd>
                </div>
                <div>
                  <dt>What else is close</dt>
                  <dd>Holland Park is a fifteen minute walk south. Kensington Palace Gardens is beyond it.</dd>
                </div>
              </dl>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go, if you have the Saturday</h2>
              <p>
                Portobello only works in person. Nothing online replaces finding the thing you were not
                looking for on a table of things nobody catalogued.
              </p>
              <p>But the market runs one day a week, and most of us are busy on it.</p>
              <p>
                STREET brings the neighbourhood&apos;s shops to your door the other six days. Browse what
                London&apos;s independent shops actually have on the shelf, buy from the ones nearest you, and
                have it delivered the same day. Notting Hill is in our first launch area.
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
                is south of Holland Park.{' '}
                <Link href="/shopping/marylebone-high-street" className="guide-area-link">
                  Marylebone High Street
                </Link>{' '}
                is the calm to Portobello&apos;s noise.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
