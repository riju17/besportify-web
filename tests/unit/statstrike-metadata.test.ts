import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/statstrike', () => {
  return {
    statstrikeDefaults: {
      body: 'Approved fallback body',
    },
    loadStatStrikePageData: vi.fn(async () => ({
      siteSettings: {
        seo: {
          noIndex: true,
        },
      },
      product: {
        seo: {
          description: 'Approved product description',
          noIndex: true,
          title: 'Custom StatStrike Title',
        },
      },
    })),
  };
});

import { generateMetadata } from '@/app/(site)/products/statstrike/page';

describe('StatStrike metadata', () => {
  it('uses approved product SEO and no-index metadata when configured', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toEqual({
      absolute: 'Custom StatStrike Title',
    });
    expect(metadata.description).toBe('Approved product description');
    expect(metadata.alternates).toEqual({
      canonical: '/products/statstrike',
    });
    expect(metadata.robots).toEqual({
      follow: false,
      index: false,
    });
  });
});
