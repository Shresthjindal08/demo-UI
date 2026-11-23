import type { NextConfig } from "next";
import { legacySolutionRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/brands/**", search: "" },
      { pathname: "/vagus%20images/**", search: "" },
      { pathname: "/logo-text-light.png", search: "" },
      { pathname: "/logo-text-transparent.png", search: "" },
      { pathname: "/hero-renewable.png", search: "" },
      { pathname: "/hero-electrician.jpg", search: "" },
      { pathname: "/hero-solar-homes.png", search: "" },
    ],
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
