import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "firebasestorage.googleapis.com"
    }, {
      hostname: "placehold.co"
    }]
  }
};

export default nextConfig;
