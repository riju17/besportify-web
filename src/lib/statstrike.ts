import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/fetch';
import type { PortableTextValue } from '@/components/content/portable-text';
import type { SanityImageValue } from '@/sanity/lib/types';
import type {
  CorporateProduct,
  CorporateSiteSettings,
} from '@/lib/corporate-pages';
import { getStatStrikeAppUrl } from '@/lib/env';
import {
  approvedProductQuery,
  approvedSiteSettingsQuery,
  visibleCapabilitiesQuery,
  visibleMetricsQuery,
  visibleTestimonialQuery,
} from '@/sanity/lib/queries';

export type StatStrikeCapability = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  audience?: string | null;
  details?: PortableTextValue | null;
  evidence?: string | null;
  status?: 'live' | 'beta' | 'planned' | 'internal' | null;
  order?: number | null;
} | null;

export type StatStrikeMetric = {
  _id?: string | null;
  label?: string | null;
  value?: string | null;
  unit?: string | null;
  evidenceNote?: string | null;
  source?: string | null;
  validFrom?: string | null;
  validTo?: string | null;
  approved?: boolean | null;
  displayOrder?: number | null;
} | null;

export type StatStrikeTestimonial = {
  _id?: string | null;
  quote?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  organisation?: string | null;
  displayOrder?: number | null;
} | null;

export type StatStrikePageData = {
  siteSettings: CorporateSiteSettings;
  product: CorporateProduct;
  productImageSrc: string | null;
  capabilities: Array<Exclude<StatStrikeCapability, null>>;
  metrics: Array<Exclude<StatStrikeMetric, null>>;
  testimonials: Array<Exclude<StatStrikeTestimonial, null>>;
  loginUrl: string;
};

export const statstrikeDefaults = {
  eyebrow: 'StatStrike by BeSportify',
  title: 'Cricket intelligence for better decisions',
  body: 'StatStrike organises performance data into practical intelligence for player evaluation, match preparation, opposition analysis, scouting, and team decision-making.',
  problemTitle: 'Statistics are abundant. Useful answers are not.',
  problemBody:
    'Teams often work across scorecards, spreadsheets, video notes, and individual observations. StatStrike is designed to reduce that fragmentation and make important patterns easier to find, discuss, and apply.',
  audienceTitle: 'Built for the people making sporting decisions',
  audienceItems: [
    {
      title: 'Team management',
      body: 'Coordinate decisions with shared evidence and context.',
    },
    {
      title: 'Coaches',
      body: 'Use structured intelligence in planning and review.',
    },
    {
      title: 'Performance analysts',
      body: 'Spend less time assembling information and more time interpreting it.',
    },
    {
      title: 'Scouts and selectors',
      body: 'Review role-aware evidence for selection conversations.',
    },
    {
      title: 'Academies',
      body: 'Track development through consistent performance context.',
    },
    {
      title: 'Tournament stakeholders',
      body: 'Structure competition-wide data and reporting.',
    },
  ],
  capabilityTitle: 'Verified live capabilities',
  capabilityBody:
    'Every public feature maps to a verified live feature or qualified status.',
  workflowTitle: 'How StatStrike works',
  workflowSteps: [
    {
      title: 'Structure the data',
      body: 'Organise relevant match, player, team, and competition information.',
    },
    {
      title: 'Validate the information',
      body: 'Check quality and consistency before interpretation.',
    },
    {
      title: 'Identify useful patterns',
      body: 'Analyse questions that matter to the intended decision.',
    },
    {
      title: 'Deliver clear intelligence',
      body: 'Present findings through dashboards, comparisons, and reports.',
    },
  ],
  disclaimer:
    'StatStrike supports professional sporting judgement. It does not replace coaching, selection, scouting, medical, or performance expertise.',
  proofTitle: 'Approved proof',
  proofEmptyTitle: 'No approved proof is published yet',
  proofEmptyBody:
    'Approved screenshots, testimonials, metrics, and case studies are not yet ready to publish. The product page remains useful without inventing them.',
  faqTitle: 'Common questions',
  faqItems: [
    {
      question: 'Who is StatStrike designed for?',
      answer:
        'StatStrike is designed for teams, coaches, analysts, scouts, selectors, academies, and other cricket decision-makers. The exact setup depends on the organisation and competition.',
    },
    {
      question: 'Does StatStrike replace a performance analyst?',
      answer:
        'No. It is designed to support analysts and decision-makers by structuring information and making relevant patterns easier to examine.',
    },
    {
      question: 'Can StatStrike be configured for different tournaments?',
      answer:
        'StatStrike is being designed around tournament-specific data and access requirements. Available configuration should be confirmed during the demo.',
    },
    {
      question: 'How is data added to StatStrike?',
      answer:
        'Approved ingestion and validation details are not yet published. Confirm the live process during the demo.',
    },
    {
      question: 'How can a team request access?',
      answer:
        'Submit a demo request with your organisation, competition, and intended use. The BeSportify team will discuss suitability and next steps.',
    },
  ],
  ctaTitle: 'Request a demo to review StatStrike for your workflow',
  ctaBody:
    'Tell us about your organisation, competition, and intended use. We will confirm whether the current approved feature set fits the problem you are trying to solve.',
} as const;

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
      console.warn(`StatStrike ${label} fell back to defaults`, error);
    }

    return fallback;
  }
}

async function fetchApprovedSiteSettings() {
  return safeFetch<CorporateSiteSettings>(
    'site settings',
    async () =>
      sanityFetch<CorporateSiteSettings>(
        approvedSiteSettingsQuery,
        {},
        {
          tags: ['site-settings'],
          revalidate: 60,
        },
      ),
    null,
  );
}

export async function loadStatStrikePageData(): Promise<StatStrikePageData> {
  const [siteSettings, product, capabilities, metrics, testimonials] =
    await Promise.all([
      fetchApprovedSiteSettings(),
      safeFetch<CorporateProduct>(
        'product',
        async () =>
          sanityFetch<CorporateProduct>(
            approvedProductQuery,
            {},
            {
              tags: ['product-statstrike'],
              revalidate: 60,
            },
          ),
        null,
      ),
      safeFetch<Array<Exclude<StatStrikeCapability, null>>>(
        'capabilities',
        async () =>
          sanityFetch<Array<Exclude<StatStrikeCapability, null>>>(
            visibleCapabilitiesQuery,
            {},
            {
              tags: ['product-capabilities'],
              revalidate: 60,
            },
          ),
        [],
      ),
      safeFetch<Array<Exclude<StatStrikeMetric, null>>>(
        'metrics',
        async () =>
          sanityFetch<Array<Exclude<StatStrikeMetric, null>>>(
            visibleMetricsQuery,
            {},
            {
              tags: ['product-metrics'],
              revalidate: 60,
            },
          ),
        [],
      ),
      safeFetch<Array<Exclude<StatStrikeTestimonial, null>>>(
        'testimonials',
        async () =>
          sanityFetch<Array<Exclude<StatStrikeTestimonial, null>>>(
            visibleTestimonialQuery,
            {},
            {
              tags: ['product-testimonials'],
              revalidate: 60,
            },
          ),
        [],
      ),
    ]);

  return {
    siteSettings,
    product,
    productImageSrc: resolveImageSrc(product?.heroMedia),
    capabilities,
    metrics,
    testimonials,
    loginUrl: getStatStrikeAppUrl(),
  };
}
