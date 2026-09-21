import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/fetch';
import type { SanityImageValue } from '@/sanity/lib/types';
import {
  approvedProductQuery,
  approvedServicesPageQuery,
  approvedSiteSettingsQuery,
  approvedTeamPageQuery,
} from '@/sanity/lib/queries';
import { resolveLink } from '@/lib/homepage';

type LinkDoc = {
  label?: string | null;
  kind?: 'internal' | 'external' | null;
  internalRoute?: string | null;
  externalUrl?: string | null;
};

type SeoDoc = {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  noIndex?: boolean | null;
};

export type CorporateSiteSettings = {
  _id?: string | null;
  companyName?: string | null;
  description?: string | null;
  legalName?: string | null;
  businessAddress?: string | null;
  businessCountry?: string | null;
  privacyEmail?: string | null;
  registrationNumber?: string | null;
  grievanceContact?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  socialLinks?: LinkDoc[] | null;
  seo?: SeoDoc | null;
} | null;

export type CorporateProduct = {
  _id?: string | null;
  name?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  accent?: string | null;
  heroMedia?: SanityImageValue | null;
  cta?: {
    label?: string | null;
    supportingCopy?: string | null;
    placement?: string | null;
    approved?: boolean | null;
    link?: LinkDoc | null;
  } | null;
  seo?: SeoDoc | null;
} | null;

export type CorporateService = {
  _id?: string | null;
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  customer?: string | null;
  problem?: string | null;
  deliverable?: string | null;
  outcome?: string | null;
  order?: number | null;
} | null;

export type CorporateTeamMember = {
  _id?: string | null;
  name?: string | null;
  slug?: { current?: string | null } | null;
  role?: string | null;
  bio?: string | null;
  photo?: SanityImageValue | null;
  profileLink?: LinkDoc | null;
  consent?: boolean | null;
  displayOrder?: number | null;
} | null;

export type ProductsPageData = {
  siteSettings: CorporateSiteSettings;
  product: CorporateProduct;
  productImageSrc: string | null;
};

export type ServicesPageData = {
  siteSettings: CorporateSiteSettings;
  services: Array<Exclude<CorporateService, null>>;
};

export type AboutPageData = {
  siteSettings: CorporateSiteSettings;
};

export type TeamPageData = {
  siteSettings: CorporateSiteSettings;
  team: Array<Exclude<CorporateTeamMember, null>>;
};

export type ContactPageData = {
  siteSettings: CorporateSiteSettings;
};

const defaultServices: Array<Exclude<CorporateService, null>> = [
  {
    _id: 'default-service-sports-analytics-products',
    title: 'Sports Analytics Products',
    summary:
      'Purpose-built platforms such as StatStrike bring match data, performance metrics, comparisons, and actionable insights together in one intelligent system—making advanced analysis accessible, structured, and decision-ready.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 1,
  },
  {
    _id: 'default-service-personalised-performance-analysis',
    title: 'Personalised Performance Analysis',
    summary:
      'Individualised analysis for players and academies, built around performance data and match footage. We identify strengths, improvement areas, technical patterns, and development opportunities to support focused, measurable progress.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 2,
  },
  {
    _id: 'default-service-league-data-backend-support',
    title: 'League Data & Backend Support',
    summary:
      'Reliable backend support for leagues and tournaments, including data collection, validation, structuring, management, and system integration. We help ensure complex match data remains accurate, organised, and ready for analysis, reporting, and digital platforms.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 3,
  },
  {
    _id: 'default-service-team-intelligence-performance-insights',
    title: 'Team Intelligence & Performance Insights',
    summary:
      'Decision-ready intelligence for teams through predictive metrics, match projections, opposition analysis, performance videos, and tactical insights. Prepare smarter, identify patterns, and make informed decisions before, during, and after competitions.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 4,
  },
  {
    _id: 'default-service-on-demand-video-analysis',
    title: 'On-Demand Video Analysis',
    summary:
      'Contract-based video analysts for leagues, tournaments, teams, and sports organisations. From live coding and footage breakdown to post-match reports and performance reviews, analysts integrate directly into the competition workflow.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 5,
  },
  {
    _id: 'default-service-analyst-training-education',
    title: 'Analyst Training & Education',
    summary:
      'Practical training and educational resources for aspiring video analysts. The programme covers video analysis, data interpretation, analytical tools, performance reporting, and the application of insights in professional sporting environments.',
    slug: null,
    customer: null,
    problem: null,
    deliverable: null,
    outcome: null,
    order: 6,
  },
];

const defaultTeam: Array<Exclude<CorporateTeamMember, null>> = [
  {
    _id: 'default-team-rajesh-patidar',
    name: 'Rajesh Patidar',
    slug: { current: 'rajesh-patidar' },
    role: 'Founder',
    bio: null,
    photo: null,
    profileLink: null,
    consent: true,
    displayOrder: 1,
  },
  {
    _id: 'default-team-hansraj',
    name: 'Hansraj',
    slug: { current: 'hansraj' },
    role: 'Analyst',
    bio: null,
    photo: null,
    profileLink: null,
    consent: true,
    displayOrder: 2,
  },
  {
    _id: 'default-team-sunny',
    name: 'Sunny',
    slug: { current: 'sunny' },
    role: 'Analyst',
    bio: null,
    photo: null,
    profileLink: null,
    consent: true,
    displayOrder: 3,
  },
];

export const corporateDefaults = {
  productTitle: 'Products built around sporting decisions',
  productBody:
    'BeSportify develops technology that brings data, analysis, and sporting context into practical workflows. Our current flagship product is StatStrike.',
  productPhilosophyTitle: 'Start with the decision, not the dashboard',
  productPhilosophyBody:
    'A useful sports product should answer a real question, fit the way its users work, and make complex information easier to act upon. That principle guides how BeSportify designs products and analytical tools.',
  servicesTitle: 'Technology and analysis shaped around the sporting problem',
  servicesBody:
    'From intelligent sports-tech products to hands-on performance analysis, BeSportify helps players, academies, teams, leagues, and analysts transform sporting data and video into meaningful decisions.',
  servicesCatalog: defaultServices,
  aboutTitle: 'Making sports intelligence useful at the point of decision',
  aboutBody:
    'Sport produces more data than ever, but data alone does not improve performance. BeSportify exists to turn complex information into clear products, workflows, and insights that sporting organisations can use.',
  aboutFocusBody:
    'Our current focus is cricket. Through StatStrike and our analytical services, we work on questions involving performance, preparation, player evaluation, tournaments, and decision support. Our wider ambition is to build technology that improves how modern sport is understood and managed.',
  aboutFoundingHeadline: 'Founding story pending approved inputs',
  aboutFoundingBody:
    'Approved founding details, milestones, and operating-model context have not been supplied yet. This section remains intentionally empty until those inputs are verified.',
  teamTitle: 'The people behind BeSportify',
  teamBody:
    'We bring together perspectives from sport, analytics, product development, technology, and business.',
  teamCatalog: defaultTeam,
  contactTitle: 'Start a conversation',
  contactBody:
    'Tell us about your organisation, competition, current workflow, and the decision or problem you are trying to address.',
} as const;

function resolveImageSrc(image?: SanityImageValue | null, width = 1600) {
  if (!image?.asset) {
    return null;
  }

  return urlFor(image)?.width(width).quality(85).url() ?? null;
}

async function fetchSiteSettings() {
  try {
    return await sanityFetch<CorporateSiteSettings>(
      approvedSiteSettingsQuery,
      {},
      {
        tags: ['site-settings'],
        revalidate: 60,
      },
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Corporate site settings fell back to defaults', error);
    }

    return null;
  }
}

export async function loadProductsPageData(): Promise<ProductsPageData> {
  try {
    const [siteSettings, product] = await Promise.all([
      fetchSiteSettings(),
      sanityFetch<CorporateProduct>(
        approvedProductQuery,
        {},
        { tags: ['product-statstrike'], revalidate: 60 },
      ),
    ]);

    return {
      siteSettings,
      product,
      productImageSrc: resolveImageSrc(product?.heroMedia),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Products page fell back to defaults', error);
    }

    return {
      siteSettings: null,
      product: null,
      productImageSrc: null,
    };
  }
}

export async function loadServicesPageData(): Promise<ServicesPageData> {
  try {
    const data = await sanityFetch<{
      siteSettings: CorporateSiteSettings;
      services: Array<Exclude<CorporateService, null>>;
    }>(
      approvedServicesPageQuery,
      {},
      { tags: ['site-settings', 'services'], revalidate: 60 },
    );

    return {
      siteSettings: data.siteSettings,
      services: data.services,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Services page fell back to defaults', error);
    }

    return {
      siteSettings: null,
      services: [],
    };
  }
}

export async function loadAboutPageData(): Promise<AboutPageData> {
  return {
    siteSettings: await fetchSiteSettings(),
  };
}

export async function loadTeamPageData(): Promise<TeamPageData> {
  try {
    const data = await sanityFetch<{
      siteSettings: CorporateSiteSettings;
      team: Array<Exclude<CorporateTeamMember, null>>;
    }>(
      approvedTeamPageQuery,
      {},
      { tags: ['site-settings', 'team'], revalidate: 60 },
    );

    return {
      siteSettings: data.siteSettings,
      team: data.team,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Team page fell back to defaults', error);
    }

    return {
      siteSettings: null,
      team: [],
    };
  }
}

export async function loadContactPageData(): Promise<ContactPageData> {
  return {
    siteSettings: await fetchSiteSettings(),
  };
}

export function resolveCorporateLink(link?: LinkDoc | null) {
  return resolveLink(link);
}
