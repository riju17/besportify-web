import { defineLocations, presentationTool } from 'sanity/presentation';

const previewUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? `${previewUrl}/studio`;

const locations = {
  homepage: defineLocations({
    message: 'Used on the public homepage',
    tone: 'caution',
    resolve: () => ({
      locations: [
        {
          title: 'Homepage',
          href: '/',
        },
      ],
    }),
  }),
  siteSettings: defineLocations({
    message: 'Used across the site',
    tone: 'caution',
  }),
  product: defineLocations({
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Product',
          href: doc?.slug ? `/products/${doc.slug}` : '/products',
        },
      ],
    }),
  }),
  service: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Service',
          href: doc?.slug ? `/services/${doc.slug}` : '/services',
        },
      ],
    }),
  }),
  caseStudy: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Case study',
          href: doc?.slug ? `/case-studies/${doc.slug}` : '/case-studies',
        },
      ],
    }),
  }),
  insight: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Insight',
          href: doc?.slug ? `/insights/${doc.slug}` : '/insights',
        },
      ],
    }),
  }),
  teamMember: defineLocations({
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Team member',
          href: doc?.slug ? `/team/${doc.slug}` : '/team',
        },
      ],
    }),
  }),
  career: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Career',
          href: doc?.slug ? `/careers/${doc.slug}` : '/careers',
        },
      ],
    }),
  }),
};

export const presentation = presentationTool({
  previewUrl: {
    initial: previewUrl,
    previewMode: {
      enable: '/api/draft-mode/enable',
      disable: '/api/draft-mode/disable',
    },
  },
  allowOrigins: [
    previewUrl,
    studioUrl,
    'http://localhost:3000',
    'http://localhost:3000/studio',
  ],
  resolve: {
    locations,
  },
  devMode: process.env.NODE_ENV !== 'production',
});
