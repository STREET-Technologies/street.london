import { test } from "node:test";
import assert from "node:assert/strict";
import { contentSecurityPolicy, securityHeaders } from "./security-headers.ts";

const directive = (name: string) =>
  contentSecurityPolicy
    .split(";")
    .map((d) => d.trim())
    .find((d) => d.startsWith(`${name} `) || d === name);

test("CSP blocks framing, plugins and base hijacking", () => {
  assert.equal(directive("frame-ancestors"), "frame-ancestors 'none'");
  assert.equal(directive("object-src"), "object-src 'none'");
  assert.equal(directive("base-uri"), "base-uri 'self'");
});

test("CSP allows the analytics and font origins the site actually uses", () => {
  assert.match(directive("script-src")!, /googletagmanager\.com/);
  assert.match(directive("script-src")!, /connect\.facebook\.net/);
  assert.match(directive("style-src")!, /fonts\.googleapis\.com/);
  assert.match(directive("font-src")!, /fonts\.gstatic\.com/);
  assert.match(directive("connect-src")!, /google-analytics\.com/);
});

test("CSP never allows unsafe-eval or wildcard script sources", () => {
  assert.doesNotMatch(directive("script-src")!, /unsafe-eval|\*/);
});

test("all baseline headers are present exactly once", () => {
  const keys = securityHeaders.map((h) => h.key);
  for (const k of [
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ]) {
    assert.equal(keys.filter((x) => x === k).length, 1, k);
  }
  assert.equal(securityHeaders.find((h) => h.key === "X-Frame-Options")!.value, "DENY");
});
