'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
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
        <main className="contact-page">
          <div className="container">
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={64} strokeWidth={2} />
              </div>
              <h1>Message Sent!</h1>
              <p>Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">
                Send Another Message
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
      <main className="contact-page">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <h1 className="contact-title">Get in Touch</h1>
              <p className="contact-intro">
                Have a question or want to learn more about STREET? We&apos;d love to hear from you.
              </p>

              <div className="company-details">
                <h2>STREET Technologies</h2>
                <div className="detail-item">
                  <strong>Company Number:</strong> 16248225
                </div>
                <div className="detail-item">
                  <strong>Address:</strong><br />
                  62 Sutherland Avenue<br />
                  London, England<br />
                  W9 2QU
                </div>
                <div className="detail-item">
                  <strong>Email:</strong><br />
                  <a href="mailto:hi@street.london" className="contact-link">hi@street.london</a>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-buttons">
                  <a
                    href="https://www.linkedin.com/company/street-london/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/st.reet.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send us a message</h2>

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
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary btn-large">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
