const photo = {
  solarFarm: "photo-1509391366360-2e959784a276",
  panelArrayBlueSky: "photo-1508514177221-188b1cf16e9d",
  panelsAerial: "photo-1497440001374-f26997328c1b",
  panelsGreenField: "photo-1558449028-b53a39d100fc",
  rooftopArraySunset: "photo-1613665813446-82a78c468a1d",
  roofInstallHands: "photo-1559302504-64aae6ca6b6d",
  electricianSwitchboard: "photo-1621905251189-08b45d6a269e",
  constructionSite: "photo-1504307651254-35680f356dfd",
  siteCrewAerial: "photo-1541888946425-d81bb19240f5",
  evPlug: "photo-1593941707882-a5bba14938c7",
  evChargerCarpark: "photo-1617886322207-6f504e7472c5",
  circuitBoard: "photo-1562408590-e32931084e23",
  engineerWorkshop: "photo-1581091226825-a6a2a5aee158",
  transmissionLines: "photo-1473341304170-971dccb5ac1e",
  windTurbinesSunset: "photo-1466611653911-95081537e5b7",
  insulationRetrofit: "photo-1607400201515-c2c41c07d307",
  warmInterior: "photo-1615874959474-d609969a20ed",
  monitoringScreens: "photo-1581094794329-c8112a89af12",
  schematicDesk: "photo-1581092160562-40aa08e78837",
  clientMeeting: "photo-1517048676732-d65bc937f952",
  planningDesk: "photo-1454165804606-c3d57bc86b40",
  officeDesk: "photo-1520607162513-77705c0f0d4a",
  founderPortrait: "photo-1605980776566-0486c3ac7617",
  modernHouseDusk: "photo-1494526585095-c41746248156",
  houseKeys: "photo-1560518883-ce09059eeffa",
  commercialBuilding: "photo-1487958449943-2429e8be8625",
  seedlingHands: "photo-1542601906990-b4d3fb778b09",
  worldMap: "photo-1524661135-423995f22d0b",
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

  return `https://images.unsplash.com/${pool[hash % pool.length]}?auto=format&fit=crop&w=1600&q=80`;
}
