'use client';

import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              STREET
            </Link>
            <div className="nav-links">
              <Link href="/#features" className="nav-link">
                Features
              </Link>
              <Link href="/#how-it-works" className="nav-link">
                How it Works
              </Link>
              <Link href="/#faq" className="nav-link">
                FAQ
              </Link>
              <Link href="/retailers" className="nav-link">
                For Retailers
              </Link>
              <Link href="/waitlist" className="btn-primary-sm">Join the Waitlist</Link>
            </div>
            <button
              className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link href="/" className="logo" onClick={closeMenu}>
            STREET
          </Link>
          <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
            <X size={28} />
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link href="/#features" className="mobile-nav-link" onClick={closeMenu}>
            Features
          </Link>
          <Link href="/#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
            How it Works
          </Link>
          <Link href="/#faq" className="mobile-nav-link" onClick={closeMenu}>
            FAQ
          </Link>
          <Link href="/retailers" className="mobile-nav-link" onClick={closeMenu}>
            For Retailers
          </Link>
          <Link href="/waitlist" className="btn-primary btn-large" onClick={closeMenu}>
            Join the Waitlist
          </Link>
        </div>
      </div>
    </>
  );
}
