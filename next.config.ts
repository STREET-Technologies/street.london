import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/join',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
