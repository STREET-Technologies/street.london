import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="logo-footer">STREET</h3>
            <p>Your high street, instantly</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Join Us</h4>
              <Link href="/retailers">For Retailers</Link>
              <Link href="/rider">For Drivers</Link>
              <Link href="/doers">For Ambassadors</Link>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/user-terms">User Terms</Link>
              <Link href="/contact-us">Contact Us</Link>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://www.linkedin.com/company/street-london/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/st.reet.app/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 STREET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
