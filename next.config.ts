import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Squarespace ghost URL — old site's default homepage path
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
