import { categories } from "./categories";

export type Industry =
  | "Residential"
  | "Manufacturing"
  | "Commercial"
  | "Community"
  | "Government"
  | "Agriculture";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  industry: Industry;
  suburb: string;
  year: number;
  categorySlugs: string[];
  solutionSlugs: string[];
  metrics: [ProjectMetric, ProjectMetric, ProjectMetric];
  featured: boolean;
  hasBeforeAfter: boolean;
}

export const projects: Project[] = [
  {
    slug: "norwood-manufacturing",
    name: "Norwood Manufacturing",
    industry: "Manufacturing",
    suburb: "Norwood",
    year: 2025,
    categorySlugs: ["renewable-energy", "energy-efficiency"],
    solutionSlugs: ["commercial-solar", "battery-storage", "energy-optimisation"],
    metrics: [
      { value: "99.8", label: "kWp array" },
      { value: "120", label: "kWh storage" },
      { value: "62%", label: "less grid draw" },
    ],
    featured: true,
    hasBeforeAfter: true,
  },
  {
    slug: "brighton-residence",
    name: "Brighton Residence",
    industry: "Residential",
    suburb: "Brighton",
    year: 2026,
    categorySlugs: ["renewable-energy", "electric-mobility"],
    solutionSlugs: ["residential-solar", "battery-storage", "home-ev-charging"],
    metrics: [
      { value: "13.4", label: "kWp array" },
      { value: "27", label: "kWh storage" },
      { value: "91%", label: "self-sufficiency" },
    ],
    featured: true,
    hasBeforeAfter: true,
  },
  {
    slug: "geelong-fleet-depot",
    name: "Geelong Fleet Depot",
    industry: "Commercial",
    suburb: "Geelong",
    year: 2025,
    categorySlugs: ["electric-mobility"],
    solutionSlugs: ["fleet-infrastructure", "commercial-ev-charging"],
    metrics: [
      { value: "12", label: "× 150 kW" },
      { value: "180", label: "commissioned" },
      { value: "99.4%", label: "uptime" },
    ],
    featured: false,
    hasBeforeAfter: false,
  },
  {
    slug: "bendigo-community-battery",
    name: "Bendigo Community Battery",
    industry: "Community",
    suburb: "Bendigo",
    year: 2026,
    categorySlugs: ["community-energy", "renewable-energy"],
    solutionSlugs: ["community-batteries", "grid-integration-vpp"],
    metrics: [
      { value: "1.2", label: "MWh capacity" },
      { value: "340", label: "households" },
      { value: "18%", label: "bill reduction" },
    ],
    featured: false,
    hasBeforeAfter: true,
  },
  {
    slug: "kew-heritage-retrofit",
    name: "Kew Heritage Retrofit",
    industry: "Residential",
    suburb: "Kew",
    year: 2025,
    categorySlugs: ["renewable-energy", "energy-efficiency"],
    solutionSlugs: ["residential-solar", "heat-pumps-hot-water"],
    metrics: [
      { value: "8.8", label: "kWp array" },
      { value: "4.6", label: "COP heat pump" },
      { value: "54%", label: "less gas" },
    ],
    featured: false,
    hasBeforeAfter: true,
  },
  {
    slug: "ballarat-public-charging",
    name: "Ballarat Public Charging",
    industry: "Government",
    suburb: "Ballarat",
    year: 2026,
    categorySlugs: ["electric-mobility"],
    solutionSlugs: ["public-ev-charging"],
    metrics: [
      { value: "6", label: "× 50 kW" },
      { value: "24/7", label: "availability" },
      { value: "99.1%", label: "uptime" },
    ],
    featured: false,
    hasBeforeAfter: false,
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function projectsInCategory(categorySlug: string, limit = 3): Project[] {
  return projects
    .filter((project) => project.categorySlugs.includes(categorySlug))
    .slice(0, limit);
}

export function projectsForSolution(solutionSlug: string, limit = 3): Project[] {
  return projects
    .filter((project) => project.solutionSlugs.includes(solutionSlug))
    .slice(0, limit);
}

export function projectsInSuburb(suburb: string): Project[] {
  return projects.filter(
    (project) => project.suburb.toLowerCase() === suburb.toLowerCase(),
  );
}

export function projectFilters() {
  return {
    industries: [...new Set(projects.map((project) => project.industry))].sort(),
    categories: categories.map(({ slug, name }) => ({ slug, name })),
    locations: [...new Set(projects.map((project) => project.suburb))].sort(),
    years: [...new Set(projects.map((project) => project.year))].sort((a, b) => b - a),
  };
}
