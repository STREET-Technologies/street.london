import AnimatedBackground from './components/AnimatedBackground';
import HomepageSignup from './components/HomepageSignup';

export default function MysteryLanding() {
  return (
    <main className="mystery-container">
      <AnimatedBackground />

      <div className="mystery-content">
        <h1 className="mystery-logo">STREET</h1>
        <p className="mystery-tagline">Something is coming.</p>
        <HomepageSignup />
      </div>
    </main>
  );
}
