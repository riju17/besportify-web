import type { SanityImageValue } from '@/sanity/lib/types';
import { isSafeHref } from '@/lib/content-safety';
import type {
  EditorialCaseStudy,
  EditorialInsight,
  EditorialTestimonial,
} from '@/lib/editorial';

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

type HomepageDoc = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroBody?: string | null;
  heroPrimaryCta?: LinkDoc | null;
  heroSecondaryCta?: LinkDoc | null;
  philosophyTitle?: string | null;
  philosophyBody?: string | null;
  seo?: SeoDoc | null;
};

type ProductDoc = {
  name?: string | null;
  slug?: {
    current?: string | null;
  } | null;
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
};

type SiteSettingsDoc = {
  companyName?: string | null;
  description?: string | null;
  seo?: SeoDoc | null;
};

export type HomepagePartner = {
  _id?: string | null;
  name?: string | null;
  relationshipWording?: string | null;
};

export type HomepageMetric = {
  _id?: string | null;
  label?: string | null;
  value?: string | null;
  unit?: string | null;
  evidenceNote?: string | null;
};

export type HomepageData = {
  siteSettings: SiteSettingsDoc | null;
  homepage: HomepageDoc | null;
  product: ProductDoc | null;
  partners?: HomepagePartner[];
  metrics?: HomepageMetric[];
  testimonial?: EditorialTestimonial;
  caseStudies?: Array<Exclude<EditorialCaseStudy, null>>;
  insights?: Array<Exclude<EditorialInsight, null>>;
};

export const homepageDefaults = {
  heroEyebrow: 'The Intelligence Layer',
  heroTitle: 'Products built around sporting decisions',
  heroBody:
    'BeSportify develops technology that brings data, analysis, and sporting context into practical workflows. Our current flagship product is StatStrike.',
  philosophyTitle: 'Start with the decision, not the dashboard',
  philosophyBody:
    'A useful sports product should answer a real question, fit the way its users work, and make complex information easier to act upon. That principle guides how BeSportify designs products and analytical tools.',
} as const;

export const statstrikeDefaults = {
  eyebrow: 'A BeSportify Product',
  title: 'StatStrike by BeSportify',
  summary:
    'A cricket-intelligence platform for performance analysis, opposition preparation, scouting, player comparison, and match review.',
  primaryCtaLabel: 'Explore StatStrike',
  primaryCtaHref: '/products/statstrike',
  secondaryCtaLabel: 'Request a Demo',
  secondaryCtaHref: '/contact',
} as const;

export function resolveLink(link?: LinkDoc | null) {
  if (!link) {
    return null;
  }

  if (
    link.kind === 'external' &&
    link.externalUrl &&
    isSafeHref(link.externalUrl)
  ) {
    return {
      href: link.externalUrl,
      external: true,
      label: link.label ?? '',
    };
  }

  if (
    link.kind === 'internal' &&
    link.internalRoute &&
    link.internalRoute.startsWith('/') &&
    isSafeHref(link.internalRoute)
  ) {
    return {
      href: link.internalRoute,
      external: false,
      label: link.label ?? '',
    };
  }

  return null;
}
