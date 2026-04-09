import { NextResponse } from 'next/server';

export function GET() {
  const response = NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_SITE_URL ?? 'https://street.london'),
  );
  response.cookies.set('street_visited', '1', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    sameSite: 'lax',
  });
  return response;
}
