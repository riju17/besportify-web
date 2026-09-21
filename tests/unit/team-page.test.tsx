import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/corporate-pages', () => {
  return {
    corporateDefaults: {
      teamBody:
        'We bring together perspectives from sport, analytics, product development, technology, and business.',
      teamTitle: 'The people behind BeSportify',
      teamCatalog: [
        {
          _id: 'default-team-rajesh-patidar',
          name: 'Rajesh Patidar',
          role: 'Founder',
          photo: null,
          profileLink: null,
        },
        {
          _id: 'default-team-hansraj',
          name: 'Hansraj',
          role: 'Analyst',
          photo: null,
          profileLink: null,
        },
        {
          _id: 'default-team-sunny',
          name: 'Sunny',
          role: 'Analyst',
          photo: null,
          profileLink: null,
        },
      ],
    },
    loadTeamPageData: vi.fn(async () => ({
      siteSettings: null,
      team: [],
    })),
    resolveCorporateLink: vi.fn(() => null),
  };
});

vi.mock('@/sanity/lib/image', () => {
  return {
    urlFor: vi.fn(() => ({
      width: () => ({
        quality: () => ({
          url: () => null,
        }),
      }),
    })),
  };
});

import TeamPage from '@/app/(site)/team/page';

describe('TeamPage', () => {
  it('shows the default team when no approved profiles are published', async () => {
    render(await TeamPage());

    expect(
      screen.getByRole('heading', { name: 'The people behind BeSportify' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Rajesh Patidar' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Hansraj' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sunny' })).toBeInTheDocument();
  });
});
