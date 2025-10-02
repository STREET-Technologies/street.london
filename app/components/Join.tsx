import Link from 'next/link';
import { Store, Car, Megaphone } from 'lucide-react';

export default function Join() {
  return (
    <section className="join-section" id="join">
      <div className="container">
        <div className="join-hero">
          <h2 className="section-title">Ready to Start Shopping?</h2>
          <p className="section-subtitle">
            Join the waitlist and be the first to experience your high street, instantly
          </p>
          <button className="btn-primary btn-large">Join the Waitlist</button>
          <p className="join-note">No credit card required • Early access for first 1,000 users</p>
        </div>

        <div className="join-options">
          <h3 className="join-options-title">Join the STREET Community</h3>
          <div className="join-grid">
            <div className="join-card">
              <div className="join-icon">
                <Store size={48} strokeWidth={1.5} />
              </div>
              <h4>For Retailers</h4>
              <p>Bring your store online and reach more local customers</p>
              <Link href="#retailers" className="btn-text">
                Learn More →
              </Link>
            </div>
            <div className="join-card">
              <div className="join-icon">
                <Car size={48} strokeWidth={1.5} />
              </div>
              <h4>For Drivers</h4>
              <p>Earn money delivering to your local community</p>
              <Link href="#drivers" className="btn-text">
                Learn More →
              </Link>
            </div>
            <div className="join-card">
              <div className="join-icon">
                <Megaphone size={48} strokeWidth={1.5} />
              </div>
              <h4>For Ambassadors</h4>
              <p>Spread the word and earn exclusive rewards</p>
              <Link href="#ambassadors" className="btn-text">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
