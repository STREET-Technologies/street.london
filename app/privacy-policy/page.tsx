/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How STREET collects, uses, and protects personal data. Your privacy rights, data retention, and contact details for data requests.',
  alternates: { canonical: 'https://street.london/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: 1 May 2026</p>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                Street.london ("we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and share personal data when you visit our website, interact with our services, submit information through our webforms, or shop with merchants who use the STREET app on Shopify.
              </p>
              <p>
                Sections 1 to 7 cover our marketing website at street.london. Section 8 covers personal data processed through the STREET Shopify app and STREET mobile apps. By using this website or any STREET service, you agree to the terms of this Privacy Policy.
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
              <p>We share this information with Vercel, our website hosting provider, to learn about site traffic and activity.</p>

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
                <li>Vercel – to facilitate website hosting and functionality</li>
                <li>Amazon AWS – for secure data storage</li>
                <li>Zapier – to automate and transfer data where necessary</li>
              </ul>

              <h3>2.3 Hosting Provider</h3>
              <p>This website is hosted by Vercel. Vercel collects personal data when you visit this website, including:</p>
              <ul>
                <li>Information about your browser, network and device</li>
                <li>Web pages you visited prior to coming to this website</li>
                <li>Web pages you view while on this website</li>
                <li>Your IP address</li>
              </ul>
              <p>
                Vercel needs the data to run this website, and to protect and improve its platform and services. Vercel analyses the data in a de-personalised form.
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
                <li>Vercel – website hosting and analytics</li>
                <li>Amazon AWS – secure storage of form submissions</li>
                <li>Zapier – automation and data transfer (if applicable)</li>
              </ul>
              <p>These third parties process your data according to their own privacy policies.</p>
            </section>

            <section className="legal-section">
              <h2>5. Your Rights</h2>
              <p>If you are located in the UK, the European Economic Area, or another jurisdiction with comparable data protection laws, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Request deletion of your data ("right to erasure")</li>
                <li>Restrict or object to certain processing activities</li>
                <li>Receive a portable copy of your data ("data portability")</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Lodge a complaint with a supervisory authority (in the UK, the Information Commissioner's Office at ico.org.uk)</li>
              </ul>
              <p>To exercise your rights, please contact us at support@street.london. We will respond within one month, as required by the UK GDPR.</p>
            </section>

            <section className="legal-section">
              <h2>6. Cookies & Tracking Technologies</h2>
              <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can manage or disable cookies through your browser settings.</p>
            </section>

            <section className="legal-section">
              <h2>7. Data Security</h2>
              <p>We take reasonable technical and organisational steps to protect your personal data from unauthorised access, loss, misuse, or alteration. These include encryption in transit, access controls, environment separation between staging and production, audit logging, and a documented incident response process. However, no online data transmission is 100% secure.</p>
            </section>

            <section className="legal-section">
              <h2>8. STREET Shopify App Privacy Notice</h2>
              <p>This section applies when a Shopify merchant installs the STREET app from the Shopify App Store, and to customers of merchants who use the STREET platform. STREET acts as a data processor for the merchant under their instructions, and as a data controller for limited operational uses described below.</p>

              <h3>8.1 Data We Process</h3>
              <p>Through the STREET Shopify app and the STREET mobile apps, we process the following categories of personal data on behalf of merchants:</p>
              <ul>
                <li>Customer name, email address, phone number</li>
                <li>Shipping and billing address</li>
                <li>Order details (line items, quantities, totals, fulfilment status)</li>
                <li>Delivery tracking information (location updates during same-day delivery)</li>
                <li>Account and authentication data for STREET app users (where applicable)</li>
              </ul>
              <p>We do not process payment card data. Payments are processed directly by Shopify and the merchant's payment provider.</p>

              <h3>8.2 How We Use This Data</h3>
              <ul>
                <li>To synchronise products, inventory, and orders between Shopify and the STREET platform</li>
                <li>To deliver orders to customers, including coordinating same-day delivery via courier partners</li>
                <li>To send order, delivery, and account notifications to customers via email, SMS, or push notification</li>
                <li>To provide customer support and fulfil tax, accounting, and statutory obligations</li>
                <li>To detect, prevent, and respond to fraud, abuse, and security incidents</li>
              </ul>

              <h3>8.3 Lawful Basis</h3>
              <p>We rely on the following lawful bases under the UK GDPR and EU GDPR:</p>
              <ul>
                <li><strong>Contract</strong> – to fulfil the contract between the customer and the merchant, and the contract between STREET and the merchant</li>
                <li><strong>Legitimate interest</strong> – to operate, secure, and improve the STREET service</li>
                <li><strong>Legal obligation</strong> – to retain transaction records for tax and accounting purposes</li>
              </ul>

              <h3>8.4 Sub-Processors</h3>
              <p>We share personal data with the following sub-processors who help us operate the STREET service. Each sub-processor is contractually bound to apply appropriate technical and organisational measures.</p>
              <ul>
                <li><strong>Amazon Web Services (AWS)</strong> – application hosting and database storage (UK / EU regions)</li>
                <li><strong>Shopify</strong> – source of merchant and customer data, billing, and embedded app delivery</li>
                <li><strong>Sentry</strong> – error and performance monitoring (logs may include partial request metadata)</li>
                <li><strong>Google Firebase</strong> – push notifications and real-time delivery tracking</li>
                <li><strong>Vonage</strong> – SMS notifications to customers</li>
                <li><strong>Amplitude</strong> – product analytics for the STREET mobile apps</li>
                <li><strong>Stuart</strong> – courier delivery service for same-day orders</li>
                <li><strong>Vercel</strong> – marketing website hosting</li>
              </ul>

              <h3>8.5 International Transfers</h3>
              <p>Some sub-processors are located outside the UK or EEA. Where data is transferred internationally, we rely on Standard Contractual Clauses, the UK International Data Transfer Addendum, or equivalent safeguards approved by the UK Information Commissioner's Office.</p>

              <h3>8.6 Data Retention</h3>
              <p>We retain Shopify customer data for the duration of the merchant's installation of the STREET app, plus a short period required to complete in-flight orders and fulfilment.</p>
              <p>When a merchant uninstalls the STREET app, Shopify sends a <code>shop/redact</code> webhook 48 hours later, and we delete or anonymise the merchant's data within 30 days of receiving it.</p>
              <p>When a customer requests erasure (directly or via Shopify's <code>customers/redact</code> webhook), we delete or anonymise their personal data within 30 days, except where we are required to retain limited transaction records for up to 7 years to comply with UK tax law.</p>

              <h3>8.7 Customer Rights and Requests</h3>
              <p>Customers of STREET-enabled merchants can exercise their rights set out in section 7 by contacting either:</p>
              <ul>
                <li>The merchant they purchased from (the merchant is the primary data controller for their customer data)</li>
                <li>STREET directly at support@street.london – we will forward the request to the merchant where required and respond within one month</li>
              </ul>
              <p>Shopify also supports the <code>customers/data_request</code> webhook for formal data subject access requests, which we honour within 30 days.</p>

              <h3>8.8 Shopify Protected Customer Data</h3>
              <p>The STREET Shopify app processes Shopify Protected Customer Data (Level 2) under Shopify's Protected Customer Data programme. We have implemented controls including encryption at rest and in transit, environment separation, access controls, audit logging, password policy, and a documented incident response process.</p>
            </section>

            <section className="legal-section">
              <h2>9. Updates to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Material changes affecting Shopify merchants or their customers will be communicated through the STREET app or by email where contact details are available.</p>
            </section>

            <section className="legal-section">
              <h2>10. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <p>
                <a href="mailto:support@street.london" className="contact-link">support@street.london</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
