'use client';

import { useState } from 'react';
import { Sparkles, Gift, DollarSign, Utensils, Shirt } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function DoersPage() {
  const [formData, setFormData] = useState({
    name: '',
    postcode: '',
    email: '',
    phone: '',
    age: '',
    socialHandles: '',
    referralSource: '',
    communicationChannels: [] as string[],
    motivation: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      communicationChannels: prev.communicationChannels.includes(channel)
        ? prev.communicationChannels.filter((c) => c !== channel)
        : [...prev.communicationChannels, channel],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <>
        <Navigation />
        <main className="retailers-page">
          <div className="container">
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h1>Welcome to the squad!</h1>
              <p>Thank you for joining us! We&apos;re excited to have you as part of the STREET community.</p>
              <p className="success-tagline">Follow us on Instagram for a chance to win FREE delivery for a whole year!</p>
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
      <main className="retailers-page doers-page">
        <div className="container">
          <div className="retailers-hero">
            <h1 className="retailers-title doers-title">WE ARE the DOERS</h1>
            <p className="retailers-subtitle">
              Be part of shaping London&apos;s instant delivery culture. Get early access, exclusive rewards, and be at the forefront of the movement.
            </p>
            <div className="doers-benefits">
              <div className="benefit-pill">
                <Sparkles size={18} /> Early Access to STREET
              </div>
              <div className="benefit-pill">
                <Gift size={18} /> Exclusive Rewards
              </div>
              <div className="benefit-pill">
                <DollarSign size={18} /> STREET Credit & Cash Bonuses
              </div>
              <div className="benefit-pill">
                <Utensils size={18} /> Dinner Coupons
              </div>
              <div className="benefit-pill">
                <Shirt size={18} /> Exclusive Merch
              </div>
            </div>
          </div>

          <form className="retailers-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="socialHandles">Social Media Handles *</label>
              <input
                type="text"
                id="socialHandles"
                name="socialHandles"
                value={formData.socialHandles}
                onChange={handleChange}
                placeholder="@yourhandle on Instagram, TikTok, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="referralSource">How did you hear about us? *</label>
              <select
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend/Referral</option>
                <option value="online-ad">Online Ad</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>How can we reach you? *</label>
              <div className="selection-pills">
                {['TikTok', 'Instagram', 'Facebook', 'Twitter/X', 'Email', 'WhatsApp'].map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    className={`pill-button ${formData.communicationChannels.includes(channel) ? 'active' : ''}`}
                    onClick={() => handleCheckboxChange(channel)}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to be a STREET ambassador? *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what excites you about STREET..."
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid var(--gray-light)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button type="submit" className="btn-primary btn-large">
              Join the Movement
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
