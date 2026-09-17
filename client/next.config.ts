import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-urls";

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
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
