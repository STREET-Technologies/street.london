import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Millie from './components/Millie';
import FAQ from './components/FAQ';
import AppDownload from './components/AppDownload';
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
        <FAQ />
        <AppDownload />
        <Join />
      </main>
      <Footer />
    </>
  );
}
