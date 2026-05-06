import { MetadataRoute } from 'next';

// `lastModified` intentionally omitted — Google handles its absence fine,
// and reporting "modified today" on every build (which `new Date()` did)
// is a false freshness signal that dilutes the field's credibility.
// When pages have meaningful per-page last-changed dates (e.g., from a CMS
// or git history), wire them in here per URL — not as a single new Date().

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://street.london';

  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/waitlist`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/retailers`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rider`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/doers`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/join`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact-us`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/user-terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
