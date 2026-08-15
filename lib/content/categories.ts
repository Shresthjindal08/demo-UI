export type PriorityTier = "P1" | "P2" | "P3";

export type SolutionStatus = "live" | "soon" | "reserved";

export interface Solution {
  slug: string;
  name: string;
  tier: PriorityTier;
  status: SolutionStatus;
  spec: string | null;
  outcome: string;
  investment: string | null;
}

export interface Category {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  promise: string;
  facts: string[];
  solutions: Solution[];
}

export const categories: Category[] = [
  {
    slug: "renewable-energy",
    index: "01",
    name: "Renewable Energy",
    descriptor: "Generation and storage — the core of the business.",
    promise: "Generation and storage, designed as one system.",
    facts: ["4 solutions", "5–100 kWp range", "25-yr performance warranty"],
    solutions: [
      {
        slug: "residential-solar",
        name: "Residential Solar",
        tier: "P1",
        status: "live",
        spec: "5–20 kWp",
        outcome: "Sized to your load profile, not to a brochure.",
        investment: "$6,500 – $18,000",
      },
      {
        slug: "battery-storage",
        name: "Battery Storage",
        tier: "P1",
        status: "live",
        spec: "5–60 kWh · VPP-ready",
        outcome: "Power, held quietly — and released when it costs most.",
        investment: "$8,400 – $26,000",
      },
      {
        slug: "commercial-solar",
        name: "Commercial Solar",
        tier: "P2",
        status: "live",
        spec: "30–500 kWp",
        outcome: "Rooftop generation matched to a business load curve.",
        investment: "On application",
      },
      {
        slug: "off-grid-systems",
        name: "Off-grid Systems",
        tier: "P3",
        status: "live",
        spec: "Standalone",
        outcome: "Full independence where the network does not reach.",
        investment: null,
      },
    ],
  },
  {
    slug: "electric-mobility",
    index: "02",
    name: "Electric Mobility",
    descriptor: "Charging infrastructure from driveway to depot.",
    promise: "Charging, from driveway to depot.",
    facts: ["4 solutions", "7–350 kW range", "OCPP open protocol"],
    solutions: [
      {
        slug: "home-ev-charging",
        name: "Home EV Charging",
        tier: "P1",
        status: "live",
        spec: "7–22 kW · solar-aware",
        outcome: "Charges from your own roof before it draws from the grid.",
        investment: "$1,400 – $3,200",
      },
      {
        slug: "commercial-ev-charging",
        name: "Commercial EV Charging",
        tier: "P2",
        status: "live",
        spec: "22–150 kW",
        outcome: "Workplace and customer charging on one control layer.",
        investment: "On application",
      },
      {
        slug: "public-ev-charging",
        name: "Public EV Charging",
        tier: "P2",
        status: "live",
        spec: "50–350 kW",
        outcome: "Public-network charging with metered uptime.",
        investment: "On application",
      },
      {
        slug: "fleet-infrastructure",
        name: "Fleet Infrastructure",
        tier: "P3",
        status: "live",
        spec: "Depot scale",
        outcome: "Depot charging sequenced to shift patterns and tariffs.",
        investment: null,
      },
    ],
  },
  {
    slug: "energy-efficiency",
    index: "03",
    name: "Energy Efficiency",
    descriptor: "Using less, and using it at the right time.",
    promise: "Using less, and using it at the right time.",
    facts: ["4 solutions", "Measured after handover", "Tuned quarterly"],
    solutions: [
      {
        slug: "heat-pumps-hot-water",
        name: "Heat Pumps & Hot Water",
        tier: "P2",
        status: "live",
        spec: "COP 4.5+",
        outcome: "The largest remaining gas load, electrified.",
        investment: "$3,200 – $6,800",
      },
      {
        slug: "energy-optimisation",
        name: "Energy Optimisation",
        tier: "P2",
        status: "live",
        spec: "Tariff-aware",
        outcome: "Shifts consumption to the cheapest hour without you noticing.",
        investment: null,
      },
      {
        slug: "monitoring-analytics",
        name: "Monitoring & Analytics",
        tier: "P3",
        status: "live",
        spec: "Circuit level",
        outcome: "Performance is monitored and tuned, not assumed.",
        investment: null,
      },
      {
        slug: "solar-maintenance",
        name: "Solar Maintenance",
        tier: "P3",
        status: "live",
        spec: "Scheduled",
        outcome: "Cleaning, testing and inverter servicing on a fixed cycle.",
        investment: null,
      },
    ],
  },
  {
    slug: "community-energy",
    index: "04",
    name: "Community Energy",
    descriptor: "Shared infrastructure at precinct scale.",
    promise: "Shared infrastructure at precinct scale.",
    facts: ["3 solutions", "Precinct scale", "Grid-integrated"],
    solutions: [
      {
        slug: "community-batteries",
        name: "Community Batteries",
        tier: "P2",
        status: "live",
        spec: "100 kWh–5 MWh",
        outcome: "One asset, shared across a street or a precinct.",
        investment: "On application",
      },
      {
        slug: "microgrids-precincts",
        name: "Microgrids & Precincts",
        tier: "P3",
        status: "live",
        spec: "Islandable",
        outcome: "A precinct that keeps running when the network does not.",
        investment: null,
      },
      {
        slug: "grid-integration-vpp",
        name: "Grid Integration & VPP",
        tier: "P3",
        status: "live",
        spec: "AEMO-registered",
        outcome: "Aggregated storage that earns while it sits idle.",
        investment: null,
      },
    ],
  },
  {
    slug: "future-services",
    index: "05",
    name: "Future Services",
    descriptor: "The scalability slot — live from day one, filled over time.",
    promise: "What we are engineering next.",
    facts: ["Reserved", "CMS-driven", "No template work"],
    solutions: [
      {
        slug: "engineering-consulting",
        name: "Engineering Consulting",
        tier: "P3",
        status: "soon",
        spec: null,
        outcome: "Design review and grid-integration advice for other builders.",
        investment: null,
      },
      {
        slug: "new-renewable-tech",
        name: "New Renewable Tech",
        tier: "P3",
        status: "soon",
        spec: null,
        outcome: "Technologies we are testing before we sell them.",
        investment: null,
      },
    ],
  },
];

export interface SolutionWithCategory extends Solution {
  category: Category;
}

export function allSolutions(): SolutionWithCategory[] {
  return categories.flatMap((category) =>
    category.solutions.map((solution) => ({ ...solution, category })),
  );
}

export function liveSolutions(): SolutionWithCategory[] {
  return allSolutions().filter((solution) => solution.status === "live");
}

export function mostRequested(): SolutionWithCategory[] {
  return allSolutions().filter((solution) => solution.tier === "P1");
}

export function findCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function findSolution(
  categorySlug: string,
  solutionSlug: string,
): SolutionWithCategory | undefined {
  const category = findCategory(categorySlug);
  if (!category) return undefined;
  const solution = category.solutions.find((entry) => entry.slug === solutionSlug);
  return solution ? { ...solution, category } : undefined;
}

export function solutionsByTier(category: Category): Record<PriorityTier, Solution[]> {
  return {
    P1: category.solutions.filter((solution) => solution.tier === "P1"),
    P2: category.solutions.filter((solution) => solution.tier === "P2"),
    P3: category.solutions.filter((solution) => solution.tier === "P3"),
  };
}

export function exceedsGridCapacity(category: Category): boolean {
  return category.solutions.length > 12;
}
