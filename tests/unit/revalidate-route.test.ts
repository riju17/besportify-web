import { describe, expect, it, vi } from 'vitest';

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath,
  revalidateTag,
}));

import { POST } from '@/app/api/revalidate/route';

describe('revalidate route', () => {
  it('rejects requests with the wrong secret', async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'project';
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
    process.env.SANITY_REVALIDATE_SECRET = 'expected';

    const response = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ secret: 'wrong' }),
      }),
    );

    expect(response.status).toBe(401);
  });

  it('revalidates requested tags and paths when the secret matches', async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'project';
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
    process.env.SANITY_REVALIDATE_SECRET = 'expected';

    const response = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          secret: 'expected',
          tags: ['homepage', 'product-statstrike'],
          paths: ['/', '/products/statstrike'],
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('homepage', 'max');
    expect(revalidateTag).toHaveBeenCalledWith('product-statstrike', 'max');
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(revalidatePath).toHaveBeenCalledWith('/products/statstrike');
  });
});
