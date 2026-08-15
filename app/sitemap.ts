import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { indexableRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes().map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: priority >= 0.8 ? "weekly" : "monthly",
    priority,
  }));
}
