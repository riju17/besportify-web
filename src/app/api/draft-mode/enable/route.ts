import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { withoutSecretSearchParams } from '@sanity/preview-url-secret/without-secret-search-params';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { getAppEnv } from '@/lib/env';

export async function GET(request: Request) {
  const env = getAppEnv();
  const token = env.SANITY_API_READ_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'Preview token is not configured.' },
      { status: 401 },
    );
  }

  const { isValid, redirectTo, studioPreviewPerspective } =
    await validatePreviewUrl(client.withConfig({ token }), request.url);

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid preview request.' },
      { status: 401 },
    );
  }

  const target = redirectTo
    ? withoutSecretSearchParams(new URL(redirectTo, request.url)).pathname
    : '/';
  const perspective = studioPreviewPerspective || 'drafts';

  const response = NextResponse.redirect(new URL(target, request.url), 307);
  response.cookies.set(perspectiveCookieName, perspective, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
