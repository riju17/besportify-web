import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { client } from './client';
import { hasImageRights } from '@/lib/content-safety';

const { projectId, dataset } = client.config();

export function urlFor(source: SanityImageSource) {
  if (!projectId || !dataset || !hasImageRights(source)) {
    return null;
  }

  return createImageUrlBuilder({ projectId, dataset }).image(source);
}
