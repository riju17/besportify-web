import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { getAppEnv } from '@/lib/env';

const env = getAppEnv();

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: env.SANITY_API_READ_TOKEN ?? false,
  browserToken: false,
});
