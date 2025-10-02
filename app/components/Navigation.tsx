'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            <Link href="/#join" className="nav-link">
              Join
            </Link>
            <Link href="/waitlist" className="btn-primary-sm">Join Waitlist</Link>
          </div>
          <button
            className="mobile-menu-btn"
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
  );
}
