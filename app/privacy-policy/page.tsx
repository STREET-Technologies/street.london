import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">Privacy Policy</h1>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                Street.london ("we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and share your personal data when you visit our website, interact with our services, or submit information through our webforms.
              </p>
              <p>
                By using this website, you agree to the terms of this Privacy Policy.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Personal Data We Collect</h2>

              <h3>2.1 Website Analytics</h3>
              <p>This website collects personal data to power our site analytics, including:</p>
              <ul>
                <li>Information about your browser, network, and device</li>
                <li>Web pages you visited prior to coming to this website</li>
                <li>Your IP address</li>
              </ul>
              <p>This information may also include details about your use of this website, including:</p>
              <ul>
                <li>Clicks</li>
                <li>Internal links</li>
                <li>Pages visited</li>
                <li>Scrolling</li>
                <li>Searches</li>
                <li>Timestamps</li>
              </ul>
              <p>We share this information with Squarespace, our website analytics provider, to learn about site traffic and activity.</p>

              <h3>2.2 Webforms & Submitted Data</h3>
              <p>When you submit a form on our website, we collect the information you provide. This may include:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Contact details</li>
                <li>Any other details entered into the form</li>
              </ul>
              <p>We use this data to respond to your submissions and improve our services. This information may be shared with:</p>
              <ul>
                <li>Squarespace – to facilitate website hosting and functionality</li>
                <li>Amazon AWS – for secure data storage</li>
                <li>Zapier – to automate and transfer data where necessary</li>
              </ul>

              <h3>2.3 Hosting Provider</h3>
              <p>This website is hosted by Squarespace. Squarespace collects personal data when you visit this website, including:</p>
              <ul>
                <li>Information about your browser, network and device</li>
                <li>Web pages you visited prior to coming to this website</li>
                <li>Web pages you view while on this website</li>
                <li>Your IP address</li>
              </ul>
              <p>
                Squarespace needs the data to run this website, and to protect and improve its platform and services. Squarespace analyses the data in a de-personalised form.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Data</h2>
              <p>We collect and use your personal data for the following purposes:</p>
              <ul>
                <li>To operate and improve our website</li>
                <li>To analyse website traffic and user behaviour</li>
                <li>To enhance website functionality and security</li>
                <li>To respond to user inquiries and feedback</li>
                <li>To automate data processing (where applicable)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Data Sharing & Third Parties</h2>
              <p>We do not sell or rent your personal data. However, we share data with third parties only where necessary:</p>
              <ul>
                <li>Squarespace – website hosting and analytics</li>
                <li>Amazon AWS – secure storage of form submissions</li>
                <li>Zapier – automation and data transfer (if applicable)</li>
              </ul>
              <p>These third parties process your data according to their own privacy policies.</p>
            </section>

            <section className="legal-section">
              <h2>5. Cookies & Tracking Technologies</h2>
              <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can manage or disable cookies through your browser settings.</p>
            </section>

            <section className="legal-section">
              <h2>6. Data Security</h2>
              <p>We take reasonable steps to protect your personal data from unauthorised access, loss, misuse, or alteration. However, no online data transmission is 100% secure.</p>
            </section>

            <section className="legal-section">
              <h2>7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to certain data processing activities</li>
              </ul>
              <p>To exercise your rights, please contact us at hi@street.london.</p>
            </section>

            <section className="legal-section">
              <h2>8. Updates to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </section>

            <section className="legal-section">
              <h2>9. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <p>
                📧 <a href="mailto:hi@street.london" className="contact-link">hi@street.london</a><br />
                📍 Street.london
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
