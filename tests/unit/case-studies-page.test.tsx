import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import {
  CaseStudyPageContent,
  CaseStudiesPageContent,
} from '@/components/sections/case-studies-page';
import type { CaseStudiesPageData, CaseStudyPageData } from '@/lib/editorial';

const listData: CaseStudiesPageData = {
  siteSettings: null,
  caseStudies: [
    {
      _id: 'case-study-1',
      title: 'Preparing for a tournament run',
      slug: { current: 'preparing-for-a-tournament-run' },
      client: 'Approved client',
      relationship: 'Consulting engagement',
      competitionContext: 'Domestic tournament 2026',
      challenge: 'The team needed a clearer way to prepare.',
      whyItMattered: 'The next fixtures carried qualification implications.',
      approach: 'Structured the available data around tactical questions.',
      dataAndScope: 'Match data, role trends, and venue context.',
      intelligenceDelivered: 'A focused preparation brief.',
      application: 'Coaches used the brief in selection discussions.',
      outcome: 'Approved outcome text.',
      limitations: 'Confidential details withheld.',
      approvedTestimonial: null,
      relatedProduct: null,
      relatedService: null,
      media: null,
      publishedAt: '2026-08-01T00:00:00.000Z',
      seo: null,
      order: 1,
      approval: { status: 'approved' },
    },
  ],
};

const detailData: CaseStudyPageData = {
  siteSettings: null,
  relatedCaseStudies: [
    {
      _id: 'case-study-2',
      title: 'Supporting a selection conversation',
      slug: { current: 'supporting-a-selection-conversation' },
      client: 'Another approved client',
      relationship: 'One-off advisory project',
      competitionContext: 'Regional tournament 2026',
      challenge: 'The staff needed a short briefing format.',
      whyItMattered: 'The decision had to be made quickly.',
      approach: 'Organised the notes into a focused summary.',
      dataAndScope: 'Recent matches and role observations.',
      intelligenceDelivered: 'A concise decision support note.',
      application: 'Used in coach and selector conversations.',
      outcome: 'Another approved outcome.',
      limitations: 'Confidential details withheld.',
      approvedTestimonial: null,
      relatedProduct: null,
      relatedService: null,
      media: null,
      publishedAt: '2026-08-02T00:00:00.000Z',
      seo: null,
      order: 2,
      approval: { status: 'approved' },
    },
  ],
  caseStudy: {
    _id: 'case-study-1',
    title: 'Preparing for a tournament run',
    slug: { current: 'preparing-for-a-tournament-run' },
    client: 'Approved client',
    relationship: 'Consulting engagement',
    competitionContext: 'Domestic tournament 2026',
    challenge: 'The team needed a clearer way to prepare.',
    whyItMattered: 'The next fixtures carried qualification implications.',
    approach: 'Structured the available data around tactical questions.',
    dataAndScope: 'Match data, role trends, and venue context.',
    intelligenceDelivered: 'A focused preparation brief.',
    application: 'Coaches used the brief in selection discussions.',
    outcome: 'Approved outcome text.',
    limitations: 'Confidential details withheld.',
    approvedTestimonial: {
      _id: 'testimonial-1',
      quote: 'The work made our preparation clearer.',
      authorName: 'Verified reviewer',
      authorRole: 'Head coach',
      organisation: 'Approved club',
      displayOrder: 1,
      approval: { status: 'approved' },
    },
    relatedProduct: {
      _id: 'product-1',
      name: 'StatStrike',
      slug: { current: 'statstrike' },
      summary: 'Product summary',
      accent: 'statstrike',
    },
    relatedService: {
      _id: 'service-1',
      title: 'Performance analytics',
      slug: { current: 'performance-analytics' },
      summary: 'Service summary',
      customer: 'Teams',
    },
    media: null,
    publishedAt: '2026-08-01T00:00:00.000Z',
    seo: null,
    order: 1,
    approval: { status: 'approved' },
  },
};

describe('CaseStudiesPageContent', () => {
  it('renders the public listing and approved case study cards', () => {
    render(createElement(CaseStudiesPageContent, { data: listData }));

    expect(
      screen.getByRole('heading', {
        name: 'Intelligence applied in the real world',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Read case study' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Approved client')).toBeInTheDocument();
  });
});

describe('CaseStudyPageContent', () => {
  it('renders the required case-study structure and related links', () => {
    render(createElement(CaseStudyPageContent, { data: detailData }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Preparing for a tournament run',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Approved client', { selector: 'p' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Consulting engagement', { selector: 'p' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('The team needed a clearer way to prepare.', {
        selector: 'article p',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The work made our preparation clearer\./),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'StatStrike' })).toHaveAttribute(
      'href',
      '/products/statstrike',
    );
    expect(
      screen.getByRole('link', { name: 'Performance analytics' }),
    ).toHaveAttribute('href', '/services/performance-analytics');
  });
});
