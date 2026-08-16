import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VISITED_COOKIE, visitedCookieOptions } from './lib/visited-cookie';

// Search engine crawlers, social card scrapers, and AI search bots.
// These see the canonical homepage instead of the first-visit /join redirect
// so the homepage's metadata, content, and structured data get indexed properly.
const BOT_UA_REGEX = /(googlebot|google-inspectiontool|googleother|google-extended|bingbot|adidxbot|duckduckbot|slurp|baiduspider|yandexbot|applebot|applebot-extended|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|gptbot|chatgpt-user|oai-searchbot|claude-web|claudebot|claude-searchbot|perplexitybot|perplexity-user|ccbot|amazonbot|anthropic-ai|cohere-ai|meta-externalagent|bytespider)/i;

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA_REGEX.test(ua)) {
    return NextResponse.next();
  }

  const visited = request.cookies.get(VISITED_COOKIE);
  if (!visited) {
    const response = NextResponse.redirect(new URL('/join', request.url));
    response.cookies.set(VISITED_COOKIE, '1', visitedCookieOptions);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
