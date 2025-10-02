import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactUsPage() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">Contact Us</h1>

          <div className="legal-content">
            <section className="contact-section">
              <h2>Get in Touch</h2>
              <p>
                We'd love to hear from you! Whether you have a question about our service, need support, or just want to say hello, our team is ready to help.
              </p>
            </section>

            <section className="contact-section">
              <h2>Email</h2>
              <p>
                <a href="mailto:hello@street.london" className="contact-link">hello@street.london</a>
              </p>
            </section>

            <section className="contact-section">
              <h2>Social Media</h2>
              <p>
                Follow us on <a href="https://www.instagram.com/st.reet.app/" target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a> or connect with us on <a href="https://www.linkedin.com/company/street-london/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a> for the latest updates.
              </p>
            </section>

            <section className="contact-section">
              <h2>Business Inquiries</h2>
              <p>
                For partnership opportunities and business inquiries, please email us at <a href="mailto:partnerships@street.london" className="contact-link">partnerships@street.london</a>
              </p>
            </section>

            <section className="contact-section">
              <h2>Support</h2>
              <p>
                Need help with your order or account? Reach out to our support team at <a href="mailto:support@street.london" className="contact-link">support@street.london</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
