import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/editorial', () => {
  return {
    loadCaseStudiesPageData: vi.fn(async () => ({
      siteSettings: {
        seo: {
          noIndex: true,
        },
      },
      caseStudies: [
        {
          _id: 'case-study-1',
          title: 'Preparing for a tournament run',
          slug: { current: 'preparing-for-a-tournament-run' },
        },
      ],
    })),
  };
});

import { generateMetadata } from '@/app/(site)/case-studies/page';

describe('Case studies metadata', () => {
  it('uses the approved route metadata and preserves no-index controls', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toEqual({
      absolute: 'Case Studies | BeSportify',
    });
    expect(metadata.description).toBe(
      'See how BeSportify applies sports technology and analytics to real performance, preparation, tournament, and commercial questions.',
    );
    expect(metadata.alternates).toEqual({
      canonical: '/case-studies',
    });
    expect(metadata.robots).toEqual({
      follow: false,
      index: false,
    });
  });
});
