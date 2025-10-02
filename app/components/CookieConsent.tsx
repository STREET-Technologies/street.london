'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { applyCookiePreferences, getCookiePreferences, saveCookiePreferences } from '@/lib/cookies';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    performance: true,
    advertising: true,
  });

  useEffect(() => {
    const savedPreferences = getCookiePreferences();
    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      setPreferences(savedPreferences);
      applyCookiePreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      performance: true,
      advertising: true,
    };
    saveCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const savePreferences = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowManage(false);
  };

  const togglePreference = (key: 'performance' | 'advertising') => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {!showManage ? (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <h3>We value your privacy</h3>
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By
              clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="cookie-banner-actions">
              <button onClick={acceptAll} className="btn-primary">
                Accept All
              </button>
              <button onClick={() => setShowManage(true)} className="btn-secondary">
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cookie-modal-overlay" onClick={() => setShowManage(false)}>
          <div className="cookie-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <h2>MANAGE COOKIES</h2>
              <button onClick={() => setShowManage(false)} className="cookie-close" aria-label="Close">
                <X size={24} />
              </button>
            </div>

            <div className="cookie-modal-body">
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h3>NECESSARY</h3>
                  <span className="always-on">ALWAYS ON</span>
                </div>
                <p className="cookie-category-description">
                  Required to enable core site functionality and to remember user preferences and choices, such as language
                  preferences or customized settings.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h3>PERFORMANCE AND ANALYTICS</h3>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={() => togglePreference('performance')}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{preferences.performance ? 'ON' : 'OFF'}</span>
                  </label>
                </div>
                <p className="cookie-category-description">
                  These cookies provide quantitative measures of website visitors. With the usage of these cookies we are able
                  to count visits and traffic sources to improve the performance of our site.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h3>ADVERTISING</h3>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={() => togglePreference('advertising')}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{preferences.advertising ? 'ON' : 'OFF'}</span>
                  </label>
                </div>
                <p className="cookie-category-description">
                  These cookies are used by advertising companies to serve ads that are relevant to your interests.
                </p>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button onClick={savePreferences} className="btn-primary btn-large">
                SAVE PREFERENCES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
