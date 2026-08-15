import { categories, allSolutions } from "./content/categories";
import { projects } from "./content/projects";
import { localPages } from "./content/suburbs";

export const routes = {
  home: "/",
  whatWeDo: "/what-we-do",
  category: (category: string) => `/what-we-do/${category}`,
  solution: (category: string, solution: string) =>
    `/what-we-do/${category}/${solution}`,
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  vision: "/vision",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  resources: "/resources",
  faq: "/faq",
  shop: "/shop",
  thankYou: "/contact/thank-you",
  local: (service: string, suburb: string) => `/${service}/${suburb}`,
} as const;

export function contactWithContext(context: string): string {
  return `${routes.contact}?context=${encodeURIComponent(context)}`;
}

export const noindexRoutes: string[] = [routes.shop, routes.thankYou];

export function indexableRoutes(): { path: string; priority: number }[] {
  return [
    { path: routes.home, priority: 1 },
    { path: routes.whatWeDo, priority: 0.9 },
    ...categories.map((category) => ({
      path: routes.category(category.slug),
      priority: 0.8,
    })),
    ...allSolutions()
      .filter((solution) => solution.status === "live")
      .map((solution) => ({
        path: routes.solution(solution.category.slug, solution.slug),
        priority: solution.tier === "P1" ? 0.8 : 0.7,
      })),
    { path: routes.projects, priority: 0.8 },
    ...projects.map((project) => ({
      path: routes.project(project.slug),
      priority: 0.6,
    })),
    { path: routes.vision, priority: 0.6 },
    { path: routes.about, priority: 0.6 },
    { path: routes.contact, priority: 0.9 },
    { path: routes.careers, priority: 0.5 },
    { path: routes.resources, priority: 0.6 },
    { path: routes.faq, priority: 0.5 },
    ...localPages().map(({ service, suburb }) => ({
      path: routes.local(service, suburb),
      priority: 0.6,
    })),
  ];
}

export function legacySolutionRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return allSolutions().map((solution) => ({
    source: `/solutions/${solution.slug}`,
    destination: routes.solution(solution.category.slug, solution.slug),
    permanent: true,
  }));
}
