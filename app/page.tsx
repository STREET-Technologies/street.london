import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
// Millie hidden 2026-05-27 — AI stylist too far from launch to promise. Restore post-launch.
// import Millie from './components/Millie';
import FAQ from './components/FAQ';
import Join from './components/Join';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        {/* <Millie /> — hidden 2026-05-27, restore post-launch */}
        <FAQ />
        <Join />
      </main>
      <Footer />
    </>
  );
}
