import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Millie from './components/Millie';
import Join from './components/Join';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Millie />
        <Join />
      </main>
      <Footer />
    </>
  );
}
