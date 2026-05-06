import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Search engine crawlers, social card scrapers, and AI search bots.
// These see the canonical homepage instead of the first-visit /join redirect
// so the homepage's metadata, content, and structured data get indexed properly.
const BOT_UA_REGEX = /(googlebot|google-extended|bingbot|adidxbot|duckduckbot|slurp|baiduspider|yandexbot|applebot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|gptbot|chatgpt-user|claude-web|claudebot|claude-searchbot|perplexitybot|perplexity-user|ccbot|amazonbot|anthropic-ai|cohere-ai)/i;

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA_REGEX.test(ua)) {
    return NextResponse.next();
  }

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

export const config = {
  matcher: '/',
};
