import { z } from 'zod';

const baseEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_STATSTRIKE_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string().url().optional(),
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  SANITY_PREVIEW_SECRET: z.string().min(1).optional(),
  SANITY_REVALIDATE_SECRET: z.string().min(1).optional(),
});

export type AppEnv = z.infer<typeof baseEnvSchema>;

export function getAppEnv(): AppEnv {
  const parsed = baseEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment: ${parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')}`,
    );
  }

  return parsed.data;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export function getStatStrikeAppUrl() {
  return (
    process.env.NEXT_PUBLIC_STATSTRIKE_APP_URL ?? 'https://app.besportify.com'
  );
}
