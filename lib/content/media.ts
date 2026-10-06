const photo = {
  solarFarm: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg",
  panelArrayBlueSky: "/vagus%20images/pexels-cristian-rojas-8853536.jpg",
  panelsAerial: "/vagus%20images/pexels-cristian-rojas-8853501.jpg",
  panelsGreenField: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432%201.jpg",
  rooftopArraySunset: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg",
  roofInstallHands: "/vagus%20images/pexels-cristian-rojas-8853536.jpg",
  electricianSwitchboard: "/vagus%20images/pexels-elite-power-group-661996115-39057093.jpg",
  constructionSite: "/vagus%20images/pexels-trinh-tr-n-191284110-11645013.jpg",
  siteCrewAerial: "/vagus%20images/pexels-cristian-rojas-8853501.jpg",
  evPlug: "/vagus%20images/pexels-kindelmedia-9799999.jpg",
  evChargerCarpark: "/vagus%20images/pexels-04iraq-1272398525-35736783.jpg",
  circuitBoard: "/vagus%20images/pexels-elite-power-group-661996115-38171183.jpg",
  engineerWorkshop: "/vagus%20images/pexels-bulat843-1243575272-34054464.jpg",
  transmissionLines: "/vagus%20images/pexels-trinh-tr-n-191284110-11645013.jpg",
  windTurbinesSunset: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432%201.jpg",
  insulationRetrofit: "/vagus%20images/pexels-readymade-3964602.jpg",
  warmInterior: "/vagus%20images/pexels-tu-nguyen-477344610-19016904.jpg",
  monitoringScreens: "/vagus%20images/pexels-brett-sayles-5408005.jpg",
  schematicDesk: "/vagus%20images/pexels-elite-power-group-661996115-38171183.jpg",
  clientMeeting: "/vagus%20images/pexels-seljansalim-34955548%201.jpg",
  planningDesk: "/vagus%20images/pexels-cristian-rojas-8853536.jpg",
  officeDesk: "/vagus%20images/pexels-elite-power-group-661996115-39057093.jpg",
  founderPortrait: "/vagus%20images/pexels-seljansalim-34955548.jpg",
  modernHouseDusk: "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg",
  houseKeys: "/vagus%20images/pexels-talharesitoglu-33020488.jpg",
  commercialBuilding: "/vagus%20images/pexels-tu-nguyen-477344610-19016904.jpg",
  seedlingHands: "/vagus%20images/pexels-rob-rafael-de-andrade-746893323-25961721.jpg",
  worldMap: "/vagus%20images/pexels-talharesitoglu-33020488.jpg",
};

const pools = {
  solar: [
    photo.rooftopArraySunset,
    photo.panelArrayBlueSky,
    photo.solarFarm,
    photo.panelsAerial,
    photo.panelsGreenField,
  ],
  install: [
    photo.roofInstallHands,
    photo.electricianSwitchboard,
    photo.constructionSite,
    photo.siteCrewAerial,
  ],
  ev: [photo.evChargerCarpark, photo.evPlug],
  storage: [photo.circuitBoard, photo.engineerWorkshop, photo.transmissionLines],
  efficiency: [photo.insulationRetrofit, photo.warmInterior],
  monitoring: [photo.monitoringScreens, photo.circuitBoard],
  engineering: [photo.schematicDesk, photo.engineerWorkshop, photo.circuitBoard],
  consultation: [photo.clientMeeting, photo.planningDesk, photo.officeDesk],
  portrait: [photo.founderPortrait],
  residential: [photo.modernHouseDusk, photo.warmInterior, photo.houseKeys],
  commercial: [photo.commercialBuilding, photo.rooftopArraySunset, photo.siteCrewAerial],
  community: [photo.seedlingHands, photo.windTurbinesSunset],
  map: [photo.worldMap],
  hero: [
    photo.windTurbinesSunset,
    photo.transmissionLines,
    photo.rooftopArraySunset,
    photo.panelArrayBlueSky,
  ],
};

const themes: [RegExp, keyof typeof pools][] = [
  [/\bmap\b|service area/, "map"],
  [/charging|\bev\b|fleet|mobility|vehicle/, "ev"],
  [/battery|batteries|storage|vpp|microgrid|off-grid|grid integration/, "storage"],
  [/heat pump|hot water|efficiency|optimisation|retrofit|insulat/, "efficiency"],
  [/monitoring|analytics/, "monitoring"],
  [/install|commissioning|switchboard|maintenance|before|after|on site/, "install"],
  [/solar|array|panel/, "solar"],
  [/founder|portrait/, "portrait"],
  [/diagram|svg|architecture|interconnect|future|consulting|practice/, "engineering"],
  [/communit/, "community"],
  [/residence|residential|\bhome/, "residential"],
  [/manufactur|commercial|business|depot|precinct|public|industr/, "commercial"],
  [/story|customer|video|journey|meeting|consult/, "consultation"],
];

export function dummyImage(label: string): string {
  const key = label.toLowerCase();
  const theme = themes.find(([pattern]) => pattern.test(key))?.[1] ?? "hero";
  const pool = pools[theme];

  let hash = 0;
  for (let index = 0; index < label.length; index += 1) {
    hash = (hash * 31 + label.charCodeAt(index)) >>> 0;
  }

  return pool[hash % pool.length];
}
