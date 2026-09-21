import { draftMode } from 'next/headers';
import { client } from './client';

type QueryOptions = {
  tags?: string[];
  revalidate?: number;
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: QueryOptions,
) {
  const { isEnabled: draft } = await draftMode();

  return client.fetch<T>(query, params, {
    next: {
      tags: options?.tags,
      revalidate: draft ? 0 : (options?.revalidate ?? 60),
    },
    perspective: draft ? 'drafts' : 'published',
    useCdn: !draft,
  });
}
