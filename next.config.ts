import type { NextConfig } from "next";
import { legacySolutionRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      ...legacySolutionRedirects(),
      {
        source: "/solutions",
        destination: "/what-we-do",
        permanent: true,
      },
      {
        source: "/solutions/:slug*",
        destination: "/what-we-do",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
