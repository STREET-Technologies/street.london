'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function RiderPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    rideType: '',
    referral: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
              <h1>Thank you!</h1>
              <p>We will be in touch soon! Don&apos;t forget to refer your friends for rewards!</p>
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
      <main className="retailers-page">
        <div className="container">
          <div className="retailers-hero">
            <h1 className="retailers-title">Let&apos;s cover the streetS together</h1>
            <p className="retailers-subtitle">
              Join our team of riders and drivers. Earn money delivering to your local community with flexible hours.
            </p>
          </div>

          <form className="retailers-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
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
              <label htmlFor="rideType">Ride Type *</label>
              <select id="rideType" name="rideType" value={formData.rideType} onChange={handleChange} required>
                <option value="">Select your ride type</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="car">Car</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="referral">Referral Name (Optional)</label>
              <input
                type="text"
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                placeholder="Who referred you?"
              />
            </div>

            <button type="submit" className="btn-primary btn-large">
              Submit Application
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
