import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url), 307);
  response.cookies.set(perspectiveCookieName, '', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
