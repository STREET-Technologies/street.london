// Cookie management utility
export interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  advertising: boolean;
}

// Initialize Google Analytics (Performance cookies)
export const initGA = () => {
  if (typeof window === 'undefined') return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;

  // Load GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize GA
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', gaId);

  console.log('Google Analytics initialized');
};

// Initialize Facebook Pixel (Advertising cookies)
export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;

  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  if (!fbPixelId) return;

  (window as any).fbq = function() {
    (window as any).fbq.callMethod
      ? (window as any).fbq.callMethod.apply((window as any).fbq, arguments)
      : (window as any).fbq.queue.push(arguments);
  };

  if (!(window as any)._fbq) (window as any)._fbq = (window as any).fbq;
  (window as any).fbq.push = (window as any).fbq;
  (window as any).fbq.loaded = true;
  (window as any).fbq.version = '2.0';
  (window as any).fbq.queue = [];

  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.async = true;
  document.head.appendChild(script);

  (window as any).fbq('init', fbPixelId);
  (window as any).fbq('track', 'PageView');

  console.log('Facebook Pixel initialized');
};

// Apply cookie preferences
export const applyCookiePreferences = (preferences: CookiePreferences) => {
  if (typeof window === 'undefined') return;

  // Performance cookies (Analytics)
  if (preferences.performance) {
    initGA();
  } else {
    // Disable GA if it was enabled
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  }

  // Advertising cookies
  if (preferences.advertising) {
    initFacebookPixel();
  } else {
    // Disable advertising if it was enabled
    if ((window as any).fbq) {
      (window as any).fbq('consent', 'revoke');
    }
  }

  console.log('Cookie preferences applied:', preferences);
};

// Get cookie preferences from localStorage
export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null;

  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return null;

  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

// Save cookie preferences to localStorage
export const saveCookiePreferences = (preferences: CookiePreferences) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('cookieConsent', JSON.stringify(preferences));
  applyCookiePreferences(preferences);
};
