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
              <h4>Company</h4>
              <Link href="#about">About</Link>
              <Link href="#careers">Careers</Link>
              <Link href="#press">Press</Link>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <Link href="#privacy">Privacy Policy</Link>
              <Link href="#terms">User Terms</Link>
              <Link href="#contact">Contact Us</Link>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <Link href="#linkedin">LinkedIn</Link>
              <Link href="#instagram">Instagram</Link>
              <Link href="#twitter">Twitter</Link>
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
