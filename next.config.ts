import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 88, 90, 95],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" }
    ]
  }
};

export default nextConfig;
