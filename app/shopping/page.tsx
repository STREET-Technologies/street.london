import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TITLE = "London Shopping Areas: A Guide to the City's Shopping Streets";
const DESCRIPTION =
  'Where to shop in London, street by street. Carnaby, Kings Road, Notting Hill, Kensington, Marylebone and Battersea Power Station, and what each is good for.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://street.london/shopping' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://street.london/shopping',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630, alt: "A guide to London's shopping streets." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/img/og-image.jpg'],
  },
};

// Area guides. `href: null` renders as unlinked until that spoke ships, so the
// pillar never points at a 404. See docs/planning/shopping-street-guides.md
const AREAS = [
  {
    name: 'Carnaby Street and Soho',
    href: '/shopping/carnaby-street',
    blurb:
      'Menswear built this neighbourhood in the 1960s and the bones never changed. The main pedestrianised run is the famous part and the least interesting one. The shopping worth the trip sits in Newburgh Quarter, a pocket of small independent stores immediately east, where the premises are too small for chains to bother with.',
    goodFor: 'Considered menswear, contemporary womenswear, denim, footwear, and eating in Kingly Court afterwards.',
  },
  {
    name: 'Kings Road, Chelsea',
    href: '/shopping/kings-road',
    blurb:
      'Two fashion revolutions started on this road. Mary Quant opened Bazaar here in 1955 and put London on the map for the miniskirt. Twenty years later, punk was assembled at number 430. Today the eastern end near Sloane Square is the polished half, and it gets more independent the further west you walk.',
    goodFor: 'A long linear walk, mainstream fashion at the Sloane Square end, and Duke of York Square for a break.',
  },
  {
    name: 'Notting Hill',
    href: '/shopping/notting-hill',
    blurb:
      'Portobello Road is the reason to come, and Saturday is the only day the whole market runs. Antiques at the southern end, vintage clothing under the Westway, and the further north you push toward Golborne Road the less the neighbourhood is performing for visitors.',
    goodFor: 'Antiques, vintage, and the boutiques on Westbourne Grove and Ledbury Road if you want the shopping without the crowds.',
  },
  {
    name: 'Kensington High Street',
    href: '/shopping/kensington-high-street',
    blurb:
      'This street was once the most glamorous shopping in London. Biba occupied a seven-storey Art Deco department store here, with a roof garden of a garden and a half acres, flamingos included. That era ended in the seventies and the street has been more ordinary since.',
    goodFor: 'Efficient mainstream shopping in one straight line, and the handsomest architecture of any address on this list.',
  },
  {
    name: 'Marylebone High Street',
    href: '/shopping/marylebone-high-street',
    blurb:
      'The quietest street here, and the one people keep coming back to. In the mid-nineties a third of the stores were empty. The estate that owns the street rebuilt it deliberately around independents and specialists rather than chains, and it worked.',
    goodFor: "Bookshops, food, homeware, and a Sunday farmers' market. The most pleasant place in central London to spend two unhurried hours.",
  },
  {
    name: 'Battersea Power Station',
    href: '/shopping/battersea-power-station',
    blurb:
      'Every other destination here happened slowly. This one was designed. The Art Deco turbine halls were restored rather than gutted, the old coal yard is now a pedestrianised high street called Electric Boulevard, and there are more than 140 stores, bars and restaurants on the site. It opened to the public in 2022, for the first time in its history.',
    goodFor: 'Scale, weather protection, and interiors nowhere else in London can match. Come for the building; the brands you can find anywhere.',
  },
];

export default function ShoppingPage() {
  return (
    <>
      <Navigation />
      <main className="guide-page">
        <div className="container">
          <h1 className="guide-title">London Shopping Areas</h1>
          <p className="guide-standfirst">
            London does not have a shopping district. It has about forty of them, and the difference between a
            good afternoon and a wasted one is knowing which street matches what you came for.
          </p>

          <div className="guide-content">
            <section className="guide-section">
              <p>
                Oxford Street has the volume. Bond Street has the money. Regent Street has the flagships. Those
                three are well documented and easy to find, and they are not what this guide is about.
              </p>
              <p>
                The streets below are the ones where London still stores for itself. Each has a distinct
                character, most of it earned over a century or more, and each rewards a different kind of visit.
              </p>
            </section>

            {AREAS.map((area) => (
              <section className="guide-section guide-area" key={area.name}>
                <h2>{area.name}</h2>
                <p>{area.blurb}</p>
                <p>
                  <strong>Good for:</strong> {area.goodFor}
                </p>
                {area.href ? (
                  <Link href={area.href} className="guide-area-link">
                    Read the {area.name.split(',')[0].replace(' and Soho', '')} guide
                  </Link>
                ) : (
                  <span className="guide-area-soon">Full guide coming soon</span>
                )}
              </section>
            ))}

            <section className="guide-section">
              <h2>How to choose</h2>
              <p>If you want one street and one afternoon, go to Marylebone.</p>
              <p>If you want variety within a short walk, go to Carnaby.</p>
              <p>If you want to cover distance and see how London changes as you walk it, go to Kings Road.</p>
              <p>If it is Saturday, go to Portobello. If it is not Saturday, do not go to Portobello.</p>
              <p>If you want to shop and be finished quickly, go to Kensington High Street.</p>
              <p>If it is raining, go to Battersea Power Station. It is the only one of these that is indoors.</p>
            </section>

            <section className="guide-section guide-cta">
              <h2>Go when you can</h2>
              <p>
                Every street here is worth the journey. London shopping is a walking activity and no website
                replaces turning a corner into a shop you did not know was there.
              </p>
              <p>Most weeks have room for none of them.</p>
              <p>
                STREET brings the same stores to your door. Browse what London&apos;s independent stores actually
                have on the shelf, buy from the ones nearest you, and have it delivered the same day. Every
                street on this page is in our first launch area.
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
