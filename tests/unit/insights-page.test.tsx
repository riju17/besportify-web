import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import {
  InsightPageContent,
  InsightsPageContent,
} from '@/components/sections/insights-page';
import type { InsightsPageData, InsightPageData } from '@/lib/editorial';
import type { PortableTextValue } from '@/components/content/portable-text';

const insightBody: PortableTextValue = [
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Approved insight body copy.' }],
  },
] as PortableTextValue;

const listData: InsightsPageData = {
  siteSettings: null,
  categories: [
    {
      _id: 'category-1',
      title: 'Match preparation',
      slug: { current: 'match-preparation' },
      description: null,
      displayOrder: 1,
      approval: { status: 'approved' },
    },
  ],
  authors: [
    {
      _id: 'author-1',
      name: 'Approved author',
      slug: { current: 'approved-author' },
      role: 'Analyst',
      bio: null,
      photo: null,
      profileLink: null,
      approval: { status: 'approved' },
    },
  ],
  insights: [
    {
      _id: 'insight-1',
      title: 'What the numbers say about preparation',
      slug: { current: 'what-the-numbers-say-about-preparation' },
      excerpt: 'A practical way to frame the question.',
      centralQuestion: 'How should preparation be structured?',
      keyTakeawaySummary: 'Prepare around the decision, not the dashboard.',
      author: {
        _id: 'author-1',
        name: 'Approved author',
        slug: { current: 'approved-author' },
        role: 'Analyst',
        bio: null,
        photo: null,
        profileLink: null,
        approval: { status: 'approved' },
      },
      category: {
        _id: 'category-1',
        title: 'Match preparation',
        slug: { current: 'match-preparation' },
        description: null,
        displayOrder: 1,
        approval: { status: 'approved' },
      },
      body: insightBody,
      heroImage: null,
      sourceNotes: 'Approved source notes.',
      limitations: 'Approved limitation note.',
      relatedProduct: null,
      relatedService: null,
      publishedAt: '2026-08-01T00:00:00.000Z',
      seo: null,
      approval: { status: 'approved' },
      _updatedAt: '2026-08-02T00:00:00.000Z',
    },
  ],
};

const detailData: InsightPageData = {
  siteSettings: null,
  categories: listData.categories,
  authors: listData.authors,
  relatedInsights: listData.insights,
  insight: {
    _id: 'insight-1',
    title: 'What the numbers say about preparation',
    slug: { current: 'what-the-numbers-say-about-preparation' },
    excerpt: 'A practical way to frame the question.',
    centralQuestion: 'How should preparation be structured?',
    keyTakeawaySummary: 'Prepare around the decision, not the dashboard.',
    author: listData.authors[0],
    category: listData.categories[0],
    body: insightBody,
    heroImage: null,
    sourceNotes: 'Approved source notes.',
    limitations: 'Approved limitation note.',
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
    publishedAt: '2026-08-01T00:00:00.000Z',
    seo: null,
    approval: { status: 'approved' },
    _updatedAt: '2026-08-02T00:00:00.000Z',
  },
};

describe('InsightsPageContent', () => {
  it('renders the public listing and approved insight cards', () => {
    render(createElement(InsightsPageContent, { data: listData }));

    expect(
      screen.getByRole('heading', { name: 'Thinking beyond the scorecard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'What the numbers say about preparation',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Approved author')).toBeInTheDocument();
    expect(screen.getAllByText('Match preparation').length).toBeGreaterThan(0);
  });
});

describe('InsightPageContent', () => {
  it('renders the approved insight structure and related links', () => {
    render(createElement(InsightPageContent, { data: detailData }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'What the numbers say about preparation',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'How should preparation be structured?',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Prepare around the decision, not the dashboard.')
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getByText('Approved insight body copy.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'StatStrike' })).toHaveAttribute(
      'href',
      '/products/statstrike',
    );
    expect(
      screen.getByRole('link', { name: 'Performance analytics' }),
    ).toHaveAttribute('href', '/services/performance-analytics');
  });
});
