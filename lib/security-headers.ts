// Single source of truth for HTTP security headers served on every route.
// Wired in next.config.ts via headers(); tested in security-headers.test.ts.

// Third-party origins the site legitimately talks to. Keep this list tight;
// anything not listed here is blocked by the CSP.
const GTM = "https://www.googletagmanager.com";
const GA = "https://*.google-analytics.com https://*.analytics.google.com";
const FB_SCRIPT = "https://connect.facebook.net";
const FB_TRACK = "https://www.facebook.com";
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com";
const GOOGLE_FONTS_FILES = "https://fonts.gstatic.com";
const VERCEL_INSIGHTS = "https://vitals.vercel-insights.com https://va.vercel-scripts.com";
const VERCEL_TOOLBAR = "https://vercel.live"; // preview-deployment comments toolbar

// 'unsafe-inline' on script-src is required: Next.js emits inline hydration
// scripts and the pages inline JSON-LD blocks. A nonce-based policy would force
// every page to render dynamically, which we do not want for a static
// marketing site. frame-ancestors, object-src and base-uri are the directives
// that actually close the clickjacking / injection holes flagged by the scan.
export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${GTM} ${FB_SCRIPT} ${VERCEL_INSIGHTS} ${VERCEL_TOOLBAR}`,
  `style-src 'self' 'unsafe-inline' ${GOOGLE_FONTS_CSS}`,
  `font-src 'self' data: ${GOOGLE_FONTS_FILES}`,
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${GTM} ${GA} ${FB_TRACK} ${VERCEL_INSIGHTS} ${VERCEL_TOOLBAR}`,
  `frame-src ${VERCEL_TOOLBAR}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];
