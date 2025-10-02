'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function RetailersPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shopName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    categories: [] as string[],
    multipleLocations: '',
    inventorySystem: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/retailers', {
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
              <div className="success-icon">
                <CheckCircle size={64} strokeWidth={2} />
              </div>
              <h1>Thank you!</h1>
              <p>
                We are thrilled at your interest! Our awesome team will get back to you shortly! Keep an eye on your
                inbox.
              </p>
              <p className="success-tagline">See you on the STREETS.</p>
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
            <h1 className="retailers-title">Become one of our retail partners</h1>
            <p className="retailers-subtitle">
              Let us bring shoppers to you virtually and increase your exposure! Sign up to hear more and be one of the
              first brands onboard!
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

            <div className="form-group">
              <label htmlFor="shopName">Shop Name *</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
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
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Shop Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Shop Website (Optional)</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Product Categories *</label>
              <div className="selection-pills">
                {['Womenswear', 'Menswear', 'Accessories', 'Shoes', 'Kidswear', 'Kids', 'Beauty', 'Homewear'].map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      className={`pill-button ${formData.categories.includes(category) ? 'active' : ''}`}
                      onClick={() => handleCheckboxChange(category)}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="multipleLocations">Multiple Locations? *</label>
              <select
                id="multipleLocations"
                name="multipleLocations"
                value={formData.multipleLocations}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not-sure">Not sure</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="inventorySystem">Inventory Management System *</label>
              <select
                id="inventorySystem"
                name="inventorySystem"
                value={formData.inventorySystem}
                onChange={handleChange}
                required
              >
                <option value="">Select a system</option>
                <option value="shopify">Shopify</option>
                <option value="square">Square</option>
                <option value="revolut">Revolut</option>
                <option value="sumup">SumUp</option>
                <option value="other">Other</option>
              </select>
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
