'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { documents } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { presentation } from './sanity/presentation';
import { editorialTemplates } from './sanity/templates';
import { getAppEnv } from '@/lib/env';

const env = getAppEnv();

export default defineConfig({
  name: 'besportify',
  title: 'BeSportify Studio',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
  schema: {
    types: documents,
    templates: (prev) => [...prev, ...editorialTemplates],
  },
  plugins: [structureTool({ structure }), presentation],
});
