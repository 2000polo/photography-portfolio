import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 88],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
