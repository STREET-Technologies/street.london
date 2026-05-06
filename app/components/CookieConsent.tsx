'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { applyCookiePreferences, getCookiePreferences, saveCookiePreferences } from '@/lib/cookies';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    performance: false,
    advertising: false,
  });

  useEffect(() => {
    // localStorage is browser-only — must read after mount to avoid SSR/hydration mismatch.
    // The setState-in-effect lint rule's recommended alternative (useSyncExternalStore) is
    // awkward here because localStorage doesn't emit change events for the same tab.
    const savedPreferences = getCookiePreferences();
    if (!savedPreferences) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    setPreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      performance: false,
      advertising: false,
    };
    setPreferences(onlyNecessary);
    saveCookiePreferences(onlyNecessary);
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
              We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.
              You can accept all cookies, reject all non-essential cookies, or manage your preferences. Strictly necessary
              cookies are always on so the site works correctly.
            </p>
            <div className="cookie-banner-actions">
              <button onClick={acceptAll} className="btn-primary">
                Accept All
              </button>
              <button onClick={rejectAll} className="btn-primary">
                Reject All
              </button>
            </div>
            <button
              onClick={() => setShowManage(true)}
              className="cookie-manage-link"
              type="button"
            >
              Manage Preferences
            </button>
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
