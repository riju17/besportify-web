import { defineField, defineType } from 'sanity';

const slugField = (source: string) =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source },
    validation: (Rule) => Rule.required(),
  });

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'legalName',
      title: 'Legal operator name',
      type: 'string',
    }),
    defineField({
      name: 'businessAddress',
      title: 'Public business address',
      type: 'string',
    }),
    defineField({
      name: 'businessCountry',
      title: 'Country and state of operation',
      type: 'string',
    }),
    defineField({
      name: 'privacyEmail',
      title: 'Privacy contact email',
      type: 'string',
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Registration number (if applicable)',
      type: 'string',
    }),
    defineField({
      name: 'grievanceContact',
      title: 'Grievance officer name and contact (if applicable)',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'approval',
      title: 'Approval',
      type: 'approval',
    }),
  ],
});

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero body',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero primary CTA',
      type: 'link',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero secondary CTA',
      type: 'link',
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Product philosophy title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'philosophyBody',
      title: 'Product philosophy body',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'approval',
      title: 'Approval',
      type: 'approval',
    }),
  ],
  initialValue: {
    heroEyebrow: 'The Intelligence Layer',
    heroTitle: 'Products built around sporting decisions',
    heroBody:
      'BeSportify develops technology that brings data, analysis, and sporting context into practical workflows. Our current flagship product is StatStrike.',
    heroPrimaryCta: {
      label: 'Request a Demo',
      kind: 'internal',
      internalRoute: '/contact',
    },
    heroSecondaryCta: {
      label: 'Explore StatStrike',
      kind: 'internal',
      internalRoute: '/products/statstrike',
    },
    philosophyTitle: 'Start with the decision, not the dashboard',
    philosophyBody:
      'A useful sports product should answer a real question, fit the way its users work, and make complex information easier to act upon. That principle guides how BeSportify designs products and analytical tools.',
    approval: {
      status: 'draft',
      owner: 'Product owner',
    },
  },
});

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('name'),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'string',
      options: {
        list: [
          { title: 'BeSportify blue/violet', value: 'beSportify' },
          { title: 'StatStrike green', value: 'statstrike' },
        ],
      },
      initialValue: 'beSportify',
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero media',
      type: 'approvedImage',
    }),
    defineField({
      name: 'cta',
      title: 'Primary CTA',
      type: 'cta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'approval',
      title: 'Approval',
      type: 'approval',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const productCapability = defineType({
  name: 'productCapability',
  title: 'Product capability',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'portableText',
    }),
    defineField({
      name: 'evidence',
      title: 'Evidence note',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Beta', value: 'beta' },
          { title: 'Planned', value: 'planned' },
          { title: 'Internal', value: 'internal' },
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approval',
      title: 'Approval',
      type: 'approval',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'problem', title: 'Problem', type: 'text', rows: 3 }),
    defineField({
      name: 'deliverable',
      title: 'Deliverable',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'text', rows: 3 }),
    defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'relationshipEvidence',
      title: 'Evidence and permission for the published relationship wording',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('name'),
    defineField({ name: 'logo', title: 'Logo', type: 'approvedImage' }),
    defineField({
      name: 'relationshipType',
      title: 'Relationship type',
      type: 'string',
      options: {
        list: [
          { title: 'Team', value: 'team' },
          { title: 'League', value: 'league' },
          { title: 'Academy', value: 'academy' },
          { title: 'Brand', value: 'brand' },
          { title: 'Technology', value: 'technology' },
        ],
      },
    }),
    defineField({
      name: 'relationshipWording',
      title: 'Relationship wording',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicVisible',
      title: 'Publicly visible',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({
      name: 'evidenceSource',
      title: 'Evidence for outcomes and client publication permission',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'competitionContext',
      title: 'Competition / date / context',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyItMattered',
      title: 'Why it mattered',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'approach', title: 'Approach', type: 'text', rows: 4 }),
    defineField({
      name: 'dataAndScope',
      title: 'Data and scope',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'intelligenceDelivered',
      title: 'Intelligence delivered',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'application',
      title: 'Application',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'text', rows: 4 }),
    defineField({
      name: 'limitations',
      title: 'Limitations / confidentiality',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'approvedTestimonial',
      title: 'Approved testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'relatedProduct',
      title: 'Relevant product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'relatedService',
      title: 'Relevant service',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'approvedImage' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('name'),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'photo', title: 'Photo', type: 'approvedImage' }),
    defineField({ name: 'profileLink', title: 'Profile link', type: 'link' }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
  ],
});

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
  ],
});

export const insight = defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'centralQuestion',
      title: 'Central question',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'keyTakeawaySummary',
      title: 'Key takeaway summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableText' }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'approvedImage',
    }),
    defineField({
      name: 'sourceNotes',
      title: 'Data / source notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'relatedProduct',
      title: 'Relevant product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'relatedService',
      title: 'Relevant service',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
  ],
});

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('name'),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'photo', title: 'Photo', type: 'approvedImage' }),
    defineField({ name: 'profileLink', title: 'Profile link', type: 'link' }),
    defineField({
      name: 'consent',
      title: 'Publication consent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const career = defineType({
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Paused', value: 'paused' },
          { title: 'Closed', value: 'closed' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'open',
    }),
    defineField({ name: 'closingDate', title: 'Closing date', type: 'date' }),
    defineField({ name: 'applyLink', title: 'Apply link', type: 'link' }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'verifiedExperience',
      title: 'Verified real experience (not fictional or AI-generated)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'source',
      title: 'Original quote evidence reference',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'permissionEvidence',
      title: 'Permission evidence reference',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'authorRole', title: 'Author role', type: 'string' }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
    }),
    defineField({
      name: 'permission',
      title: 'Permission',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'unit', title: 'Unit', type: 'string' }),
    defineField({
      name: 'evidenceNote',
      title: 'Evidence note',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({ name: 'validFrom', title: 'Valid from', type: 'date' }),
    defineField({ name: 'validTo', title: 'Valid to', type: 'date' }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'approval', title: 'Approval', type: 'approval' }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'supportingCopy',
      title: 'Supporting copy',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'link', title: 'Link', type: 'link' }),
    defineField({ name: 'placement', title: 'Placement', type: 'string' }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const documents = [
  siteSettings,
  homepage,
  product,
  productCapability,
  service,
  partner,
  caseStudy,
  insight,
  author,
  category,
  teamMember,
  career,
  testimonial,
  metric,
  callToAction,
];
