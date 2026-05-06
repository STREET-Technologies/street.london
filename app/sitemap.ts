import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://street.london';
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/waitlist`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/retailers`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rider`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/doers`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/join`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact-us`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/user-terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
