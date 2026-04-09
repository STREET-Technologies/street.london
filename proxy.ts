import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const visited = request.cookies.get('street_visited');

  if (!visited) {
    const response = NextResponse.redirect(new URL('/join', request.url));
    response.cookies.set('street_visited', '1', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: '/',
};
