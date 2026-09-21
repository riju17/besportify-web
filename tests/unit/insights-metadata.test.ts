import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/editorial', () => {
  return {
    loadInsightsPageData: vi.fn(async () => ({
      siteSettings: {
        seo: {
          noIndex: false,
        },
      },
      categories: [],
      authors: [],
      insights: [
        {
          _id: 'insight-1',
          title: 'What the numbers say about preparation',
          slug: { current: 'what-the-numbers-say-about-preparation' },
        },
        {
          _id: 'insight-2',
          title: 'Reading the match context',
          slug: { current: 'reading-the-match-context' },
        },
        {
          _id: 'insight-3',
          title: 'Explaining role value',
          slug: { current: 'explaining-role-value' },
        },
      ],
    })),
  };
});

import { generateMetadata } from '@/app/(site)/insights/page';

describe('Insights metadata', () => {
  it('uses the approved route metadata and remains indexable once content exists', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toEqual({
      absolute: 'Insights | BeSportify',
    });
    expect(metadata.description).toBe(
      'Read BeSportify perspectives on cricket analytics, player evaluation, match preparation, sports technology, and data quality.',
    );
    expect(metadata.alternates).toEqual({
      canonical: '/insights',
    });
    expect(metadata.robots).toBeUndefined();
  });
});
