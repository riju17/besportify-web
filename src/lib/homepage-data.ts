import { draftMode } from 'next/headers';
import { homepageDataQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import type { HomepageData } from '@/lib/homepage';

export type HomepagePageData = HomepageData & {
  productImageSrc: string | null;
};

function resolveProductImageSrc(data: HomepageData) {
  const heroMedia = data.product?.heroMedia;

  if (!heroMedia?.asset) {
    return null;
  }

  return urlFor(heroMedia)?.width(1600).quality(85).url() ?? null;
}

export async function loadHomepageData(): Promise<HomepagePageData> {
  const { isEnabled: draft } = await draftMode();

  try {
    const data = await sanityFetch<HomepageData>(
      homepageDataQuery(draft),
      {},
      {
        tags: [
          'homepage',
          'site-settings',
          'product-statstrike',
          'partners',
          'metrics',
          'testimonials',
          'case-studies',
          'insights',
        ],
        revalidate: 60,
      },
    );

    return {
      ...data,
      productImageSrc: resolveProductImageSrc(data),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Homepage data fell back to local defaults', error);
    }

    return {
      siteSettings: null,
      homepage: null,
      product: null,
      partners: [],
      metrics: [],
      testimonial: null,
      caseStudies: [],
      insights: [],
      productImageSrc: null,
    };
  }
}
