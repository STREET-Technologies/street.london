// First-visit marker read by proxy.ts (server-side only) and set by proxy.ts
// and /api/skip. Single definition so the attributes cannot drift.
export const VISITED_COOKIE = "street_visited";

export const visitedCookieOptions = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
  sameSite: "lax" as const,
  httpOnly: true, // never read from client JS
  secure: process.env.NODE_ENV === "production", // Safari refuses Secure cookies on http://localhost
};
