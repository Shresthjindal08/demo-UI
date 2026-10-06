import type { NextConfig } from "next";
import { legacySolutionRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/vagus%20images/**", search: "" }],
    remotePatterns: [],
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
