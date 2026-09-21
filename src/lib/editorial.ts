import { draftMode } from 'next/headers';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/fetch';
import type { PortableTextValue } from '@/components/content/portable-text';
import type { SanityImageValue } from '@/sanity/lib/types';
import type { CorporateSiteSettings } from '@/lib/corporate-pages';
import {
  caseStudyQuery,
  caseStudiesPageQuery,
  insightQuery,
  insightsPageQuery,
} from '@/sanity/lib/queries';
import {
  getDevelopmentCaseStudyPageData,
  getDevelopmentCaseStudiesPageData,
  getDevelopmentInsightPageData,
  getDevelopmentInsightsPageData,
} from '@/lib/editorial-seed';

type EditorialLink = {
  label?: string | null;
  kind?: 'internal' | 'external' | null;
  internalRoute?: string | null;
  externalUrl?: string | null;
} | null;

type EditorialSeo = {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  noIndex?: boolean | null;
  socialImage?: {
    alt?: string | null;
    asset?: unknown;
  } | null;
} | null;

export type EditorialTestimonial = {
  _id?: string | null;
  quote?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  organisation?: string | null;
  displayOrder?: number | null;
  approval?: { status?: string | null } | null;
} | null;

export type EditorialProduct = {
  _id?: string | null;
  name?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  accent?: string | null;
} | null;

export type EditorialService = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  customer?: string | null;
} | null;

export type EditorialAuthor = {
  _id?: string | null;
  name?: string | null;
  slug?: { current?: string | null } | null;
  role?: string | null;
  bio?: string | null;
  photo?: SanityImageValue | null;
  profileLink?: EditorialLink;
  approval?: { status?: string | null } | null;
} | null;

export type EditorialCategory = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  description?: string | null;
  displayOrder?: number | null;
  approval?: { status?: string | null } | null;
} | null;

export type EditorialCaseStudy = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  client?: string | null;
  relationship?: string | null;
  competitionContext?: string | null;
  challenge?: string | null;
  whyItMattered?: string | null;
  approach?: string | null;
  dataAndScope?: string | null;
  intelligenceDelivered?: string | null;
  application?: string | null;
  outcome?: string | null;
  limitations?: string | null;
  approvedTestimonial?: EditorialTestimonial;
  relatedProduct?: EditorialProduct;
  relatedService?: EditorialService;
  media?: Array<SanityImageValue & { _key?: string | null }> | null;
  publishedAt?: string | null;
  seo?: EditorialSeo;
  order?: number | null;
  approval?: { status?: string | null } | null;
} | null;

export type EditorialInsight = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  excerpt?: string | null;
  centralQuestion?: string | null;
  keyTakeawaySummary?: string | null;
  author?: EditorialAuthor;
  category?: EditorialCategory;
  body?: PortableTextValue | null;
  heroImage?: SanityImageValue | null;
  sourceNotes?: string | null;
  limitations?: string | null;
  relatedProduct?: EditorialProduct;
  relatedService?: EditorialService;
  publishedAt?: string | null;
  seo?: EditorialSeo;
  approval?: { status?: string | null } | null;
  _updatedAt?: string | null;
} | null;

export type CaseStudiesPageData = {
  siteSettings: CorporateSiteSettings;
  caseStudies: Array<Exclude<EditorialCaseStudy, null>>;
};

export type InsightsPageData = {
  siteSettings: CorporateSiteSettings;
  insights: Array<Exclude<EditorialInsight, null>>;
  categories: Array<Exclude<EditorialCategory, null>>;
  authors: Array<Exclude<EditorialAuthor, null>>;
};

export type CaseStudyPageData = {
  siteSettings: CorporateSiteSettings;
  caseStudy: EditorialCaseStudy;
  relatedCaseStudies: Array<Exclude<EditorialCaseStudy, null>>;
};

export type InsightPageData = {
  siteSettings: CorporateSiteSettings;
  insight: EditorialInsight;
  relatedInsights: Array<Exclude<EditorialInsight, null>>;
  categories: Array<Exclude<EditorialCategory, null>>;
  authors: Array<Exclude<EditorialAuthor, null>>;
};

function resolveImageSrc(image?: SanityImageValue | null, width = 1600) {
  if (!image?.asset) {
    return null;
  }

  return urlFor(image)?.width(width).quality(85).url() ?? null;
}

async function safeFetch<T>(
  label: string,
  fetcher: () => Promise<T>,
  fallback: T,
) {
  try {
    return await fetcher();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Editorial ${label} fell back to defaults`, error);
    }

    return fallback;
  }
}

async function getDraftModeEnabled() {
  const { isEnabled } = await draftMode();
  return isEnabled;
}

export async function loadCaseStudiesPageData(): Promise<CaseStudiesPageData> {
  const draft = await getDraftModeEnabled();

  const data = await safeFetch<CaseStudiesPageData>(
    'case studies page',
    async () =>
      sanityFetch<CaseStudiesPageData>(
        caseStudiesPageQuery(draft),
        {},
        {
          tags: ['site-settings', 'case-studies'],
          revalidate: 60,
        },
      ),
    {
      siteSettings: null,
      caseStudies: [],
    },
  );

  if (process.env.NODE_ENV !== 'production' && !data.caseStudies.length) {
    return getDevelopmentCaseStudiesPageData();
  }

  return data;
}

export async function loadCaseStudyPageData(
  slug: string,
): Promise<CaseStudyPageData> {
  const draft = await getDraftModeEnabled();

  const [pageData, listData] = await Promise.all([
    safeFetch<CaseStudyPageData>(
      'case study',
      async () =>
        sanityFetch<CaseStudyPageData>(
          caseStudyQuery(draft),
          { slug },
          {
            tags: ['site-settings', 'case-studies'],
            revalidate: 60,
          },
        ),
      {
        siteSettings: null,
        caseStudy: null,
        relatedCaseStudies: [],
      },
    ),
    loadCaseStudiesPageData(),
  ]);

  const relatedCaseStudies = listData.caseStudies.filter(
    (caseStudy) => caseStudy.slug?.current !== slug,
  );

  if (process.env.NODE_ENV !== 'production' && !pageData.caseStudy) {
    return getDevelopmentCaseStudyPageData(slug);
  }

  return {
    ...pageData,
    relatedCaseStudies,
  };
}

export async function loadInsightsPageData(): Promise<InsightsPageData> {
  const draft = await getDraftModeEnabled();

  const data = await safeFetch<InsightsPageData>(
    'insights page',
    async () =>
      sanityFetch<InsightsPageData>(
        insightsPageQuery(draft),
        {},
        {
          tags: ['site-settings', 'insights'],
          revalidate: 60,
        },
      ),
    {
      siteSettings: null,
      insights: [],
      categories: [],
      authors: [],
    },
  );

  if (process.env.NODE_ENV !== 'production' && data.insights.length < 3) {
    return getDevelopmentInsightsPageData();
  }

  return data;
}

export async function loadInsightPageData(
  slug: string,
): Promise<InsightPageData> {
  const draft = await getDraftModeEnabled();

  const [pageData, listData] = await Promise.all([
    safeFetch<InsightPageData>(
      'insight',
      async () =>
        sanityFetch<InsightPageData>(
          insightQuery(draft),
          { slug },
          {
            tags: ['site-settings', 'insights'],
            revalidate: 60,
          },
        ),
      {
        siteSettings: null,
        insight: null,
        relatedInsights: [],
        categories: [],
        authors: [],
      },
    ),
    loadInsightsPageData(),
  ]);

  const relatedInsights = listData.insights.filter(
    (insight) => insight.slug?.current !== slug,
  );

  if (process.env.NODE_ENV !== 'production' && !pageData.insight) {
    return getDevelopmentInsightPageData(slug);
  }

  return {
    ...pageData,
    relatedInsights,
    categories: listData.categories,
    authors: listData.authors,
  };
}

export { resolveImageSrc as resolveEditorialImageSrc };
