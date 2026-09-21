import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/statstrike', () => {
  return {
    statstrikeDefaults: {
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
    },
  };
});

import { StatStrikePageContent } from '@/components/sections/statstrike-page';
import type { StatStrikePageData } from '@/lib/statstrike';

const baseData: StatStrikePageData = {
  siteSettings: {
    companyName: 'BeSportify',
    contactEmail: null,
    contactPhone: null,
    description: null,
    seo: null,
    socialLinks: null,
  },
  product: {
    accent: 'statstrike',
    cta: null,
    heroMedia: null,
    name: 'StatStrike',
    seo: null,
    slug: { current: 'statstrike' },
    summary: null,
  },
  productImageSrc: null,
  capabilities: [
    {
      _id: 'capability-live',
      audience: 'Coaches',
      details: null,
      evidence: 'Approved for publication',
      order: 1,
      slug: { current: 'player-intelligence' },
      status: 'live',
      summary: 'Review player performance with context.',
      title: 'Player intelligence',
    },
    {
      _id: 'capability-beta',
      audience: 'Internal',
      details: null,
      evidence: null,
      order: 2,
      slug: { current: 'beta-only' },
      status: 'beta',
      summary: 'Should not render in the public page.',
      title: 'Beta capability',
    },
  ],
  metrics: [],
  testimonials: [],
  loginUrl: 'https://app.example.com/login',
};

describe('StatStrikePageContent', () => {
  it('renders the approved StatStrike content and filters out non-live capabilities', () => {
    render(createElement(StatStrikePageContent, { data: baseData }));

    expect(
      screen.getByRole('heading', {
        name: 'Cricket intelligence for better decisions',
      }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link', { name: 'Request a Demo' })
        .some((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(
      screen.getByRole('link', { name: 'StatStrike Login' }),
    ).toHaveAttribute('href', 'https://app.example.com/login');
    expect(screen.getByText('Player intelligence')).toBeInTheDocument();
    expect(screen.queryByText('Beta capability')).not.toBeInTheDocument();
    expect(
      screen.getByText(/no approved proof is published yet/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/approved ingestion and validation details/i),
    ).toBeInTheDocument();
  });
});
