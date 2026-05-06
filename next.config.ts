import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Squarespace ghost URL — old site's default homepage path
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
