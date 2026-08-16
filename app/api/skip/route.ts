import { NextResponse } from 'next/server';
import { VISITED_COOKIE, visitedCookieOptions } from '@/lib/visited-cookie';

export function GET() {
  const response = NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_SITE_URL ?? 'https://street.london'),
  );
  response.cookies.set(VISITED_COOKIE, '1', visitedCookieOptions);
  return response;
}
