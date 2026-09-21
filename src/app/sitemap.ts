import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';

const routes = [
  '/',
  '/products',
  '/products/statstrike',
  '/services',
  '/about',
  '/team',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/refunds',
  '/accessibility',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.6,
  }));
}
