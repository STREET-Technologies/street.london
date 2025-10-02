'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: '',
    postcode: '',
    email: '',
    phone: '',
    stores: '',
    referredBy: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        console.error('Submission failed:', result.error);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <>
        <Navigation />
        <main className="waitlist-page">
          <div className="container">
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={64} strokeWidth={2} />
              </div>
              <h1>Welcome to the waitlist!</h1>
              <p>You&apos;re now on the list to be one of the first to experience STREET.</p>
              <p className="success-tagline">
                Follow us on Instagram{' '}
                <a href="https://www.instagram.com/st.reet.app/" target="_blank" rel="noopener noreferrer">
                  @ST.REET.APP
                </a>
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">
                Submit Another
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="waitlist-page">
        <div className="container">
          <div className="waitlist-hero">
            <h1 className="waitlist-title">
              WE ARE <span className="highlight">speeding up</span> SHOPPING!
            </h1>
            <p className="waitlist-subtitle">
              BE THE FIRST ON OUR STREET AND SIGN UP TO GET EXCLUSIVE REWARDS!
            </p>
          </div>

          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First and Last Name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postcode">Postcode *</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="SW1A 1AA"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 7XXX XXXXXX"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stores">Top 2 stores are you most excited to shop from? *</label>
              <input
                type="text"
                id="stores"
                name="stores"
                value={formData.stores}
                onChange={handleChange}
                placeholder="e.g., Zara, H&M"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="referredBy">Referred by (Their Full Name)</label>
              <input
                type="text"
                id="referredBy"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <p className="form-disclaimer">
              By signing up, you agree to our{' '}
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
              .
            </p>

            <button type="submit" className="btn-primary btn-large">
              Join the Waitlist
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
