import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.brainadz.marketing",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
};

export default nextConfig;
