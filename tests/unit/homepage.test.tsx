import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { HomepageSlice } from '@/components/sections/homepage';

describe('HomepageSlice', () => {
  it('renders the approved homepage sections and safe media fallback', () => {
    render(
      createElement(HomepageSlice, {
        data: {
          siteSettings: {
            companyName: 'BeSportify',
            description:
              'BeSportify builds sports-technology products and analytical solutions.',
            seo: null,
          },
          productImageSrc: null,
          homepage: {
            heroEyebrow: 'The Intelligence Layer',
            heroTitle: 'Products built around sporting decisions',
            heroBody:
              'BeSportify develops technology that brings data, analysis, and sporting context into practical workflows.',
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
              'A useful sports product should answer a real question.',
            seo: null,
          },
          product: {
            name: 'StatStrike',
            summary:
              'A cricket-intelligence platform for performance analysis, opposition preparation, scouting, player comparison, and match review.',
            accent: 'statstrike',
            heroMedia: null,
            cta: null,
            seo: null,
            slug: {
              current: 'statstrike',
            },
          },
        },
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: 'Products built around sporting decisions',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: 'Request a Demo' }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: 'Explore StatStrike' }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('StatStrike').length).toBeGreaterThan(0);
    expect(
      screen.getByText(/contact us to discuss the product/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/structured intelligence/i)).toBeInTheDocument();
  });
});
