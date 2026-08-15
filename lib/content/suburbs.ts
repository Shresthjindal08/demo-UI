export interface LocalService {
  slug: string;
  name: string;
  categorySlug: string;
  solutionSlug: string;
}

export const localServices: LocalService[] = [
  {
    slug: "solar",
    name: "Residential solar",
    categorySlug: "renewable-energy",
    solutionSlug: "residential-solar",
  },
  {
    slug: "battery-storage",
    name: "Battery storage",
    categorySlug: "renewable-energy",
    solutionSlug: "battery-storage",
  },
  {
    slug: "ev-charging",
    name: "EV charger installation",
    categorySlug: "electric-mobility",
    solutionSlug: "home-ev-charging",
  },
];

export interface Suburb {
  slug: string;
  name: string;
  postcode: string;
  state: string;
  systemsInstalled: number;
  capacityInstalled: string;
  servingSince: number;
  nearby: string[];
}

export const suburbs: Suburb[] = [
  {
    slug: "brighton",
    name: "Brighton",
    postcode: "3186",
    state: "VIC",
    systemsInstalled: 14,
    capacityInstalled: "186 kW",
    servingSince: 2018,
    nearby: ["kew", "geelong"],
  },
  {
    slug: "kew",
    name: "Kew",
    postcode: "3101",
    state: "VIC",
    systemsInstalled: 22,
    capacityInstalled: "241 kW",
    servingSince: 2016,
    nearby: ["brighton", "bendigo"],
  },
  {
    slug: "geelong",
    name: "Geelong",
    postcode: "3220",
    state: "VIC",
    systemsInstalled: 31,
    capacityInstalled: "412 kW",
    servingSince: 2015,
    nearby: ["brighton", "bendigo"],
  },
  {
    slug: "bendigo",
    name: "Bendigo",
    postcode: "3550",
    state: "VIC",
    systemsInstalled: 18,
    capacityInstalled: "298 kW",
    servingSince: 2019,
    nearby: ["geelong", "kew"],
  },
];

export function findLocalService(slug: string): LocalService | undefined {
  return localServices.find((service) => service.slug === slug);
}

export function findSuburb(slug: string): Suburb | undefined {
  return suburbs.find((suburb) => suburb.slug === slug);
}

export function localPages(): { service: string; suburb: string }[] {
  return localServices.flatMap((service) =>
    suburbs.map((suburb) => ({ service: service.slug, suburb: suburb.slug })),
  );
}
