import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { getAppEnv } from '@/lib/env';

type RevalidateRequest = {
  secret?: string;
  tags?: string[];
  paths?: string[];
};

export async function POST(request: Request) {
  const env = getAppEnv();
  const body = (await request.json().catch(() => ({}))) as RevalidateRequest;

  if (
    !env.SANITY_REVALIDATE_SECRET ||
    body.secret !== env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json(
      { error: 'Invalid revalidation secret.' },
      { status: 401 },
    );
  }

  const tags = Array.isArray(body.tags) ? body.tags.filter(Boolean) : [];
  const paths = Array.isArray(body.paths) ? body.paths.filter(Boolean) : [];

  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
  });
}
