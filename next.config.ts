import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "firebasestorage.googleapis.com"
    }]
  }
};

export default nextConfig;
