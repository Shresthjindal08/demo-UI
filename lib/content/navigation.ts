import { categories, launchCategories, mostRequested } from "./categories";
import { featuredProjects } from "./projects";
import { routes } from "../routes";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  hasPanel?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Solutions", href: routes.whatWeDo, hasPanel: true },
  { label: "Projects", href: routes.projects },
  { label: "Our approach", href: routes.vision },
  { label: "About", href: routes.about },
  { label: "Insights", href: routes.resources },
];

export function megaMenuModel() {
  return {
    columns: launchCategories.map((category) => ({
      index: category.index,
      name: category.name,
      href: routes.category(category.slug),
      descriptor: category.descriptor,
      solutions: category.solutions.map((solution) => ({
        name: solution.name,
        href: routes.solution(category.slug, solution.slug),
        tier: solution.tier,
        status: solution.status,
        spec: solution.spec,
      })),
    })),
    pinned: mostRequested().map((solution) => ({
      name: solution.name,
      href: routes.solution(solution.category.slug, solution.slug),
      tier: solution.tier,
      spec: solution.spec,
    })),
    featured: featuredProjects()[0],
  };
}

export function footerModel() {
  const [renewable, mobility, efficiency, community] = categories;

  return {
    categoryColumns: [
      { title: "Renewable", category: renewable },
      { title: "Mobility", category: mobility },
      { title: "Efficiency & Community", category: efficiency, extra: community },
    ],
    company: [
      { label: "About", href: routes.about },
      { label: "Our approach", href: routes.vision },
      { label: "Projects", href: routes.projects },
      { label: "Careers", href: routes.careers },
      { label: "Insights", href: routes.resources },
      { label: "FAQ", href: routes.faq },
      { label: "Contact", href: routes.contact },
      { label: "Shop", href: routes.shop, external: true },
    ],
  };
}
