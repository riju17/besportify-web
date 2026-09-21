import { createClient } from 'next-sanity';
import { getAppEnv } from '@/lib/env';

const env =
  process.env.NODE_ENV === 'production'
    ? getAppEnv()
    : {
        NEXT_PUBLIC_SANITY_PROJECT_ID:
          process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'local-dev',
        NEXT_PUBLIC_SANITY_DATASET:
          process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
        NEXT_PUBLIC_SANITY_STUDIO_URL:
          process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? '/studio',
      };

export const apiVersion = '2026-03-01';

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? '/studio',
  },
});
