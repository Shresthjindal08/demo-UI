import { surfaceStyles } from "@/lib/styles";
import land from "@/lib/content/globe-land.json";

const radians = Math.PI / 180;
const latitude = -25 * radians;
const office = { latitude: -37.80368, longitude: 144.966, address: "139 Cardigan Street, Carlton VIC 3053, Australia" };
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address)}`;

function project(longitude: number, degrees: number) {
  const phi = degrees * radians;
  const lambda = (longitude - 135) * radians;
  const depth = Math.sin(latitude) * Math.sin(phi) + Math.cos(latitude) * Math.cos(phi) * Math.cos(lambda);
  let x = Math.cos(phi) * Math.sin(lambda);
  let y = Math.cos(latitude) * Math.sin(phi) - Math.sin(latitude) * Math.cos(phi) * Math.cos(lambda);
  if (depth < 0) {
    const length = Math.hypot(x, y);
    x /= length;
    y /= length;
  }
  return { x: 550 + 475 * x, y: 505 - 475 * y, visible: depth >= 0 };
}

const continents = land.rings.filter((ring) => ring.some(([lon, lat]) => project(lon, lat).visible)).map((ring) => ring.map(([lon, lat], index) => {
  const point = project(lon, lat);
  return `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
}).join("") + "Z");
const grid = [
  ...Array.from({ length: 11 }, (_, index) => Array.from({ length: 181 }, (_, step) => [index * 30 - 150, step - 90])),
  ...Array.from({ length: 5 }, (_, index) => Array.from({ length: 361 }, (_, step) => [step - 180, index * 30 - 60])),
].map((line) => {
  let connected = false;
  return line.map(([lon, lat]) => {
    const point = project(lon, lat);
    if (!point.visible) { connected = false; return ""; }
    const command = connected ? "L" : "M";
    connected = true;
    return `${command}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join("");
});
const pin = project(office.longitude, office.latitude);

export function HomeLocation() {
  return (
    <section className={`${surfaceStyles} location`} data-surface="light" aria-labelledby="location-title">
      <div className="location__heading">
        <p className="location__eyebrow"><span />Local expertise. Connected thinking.</p>
        <h2 id="location-title">Where we operate</h2>
        <p>Based in Melbourne. Powering homes, businesses and communities across Victoria.</p>
      </div>
      <div className="location__visual">
        <svg className="location__globe" viewBox="0 0 1100 850" role="img" aria-label="Globe centered on Australia, marking the Vagus Energy office in Carlton, Melbourne">
          <defs>
            <radialGradient id="location-ocean" cx="65%" cy="25%" r="80%"><stop stopColor="var(--v-tint)" /><stop offset="1" stopColor="var(--v-bg)" /></radialGradient>
            <radialGradient id="location-shade" cx="70%" cy="30%" r="75%"><stop offset="0.35" stopColor="var(--v-bg)" stopOpacity="0" /><stop offset="1" stopColor="var(--v-bg)" stopOpacity="0.92" /></radialGradient>
            <clipPath id="location-sphere"><circle cx="550" cy="505" r="475" /></clipPath>
          </defs>
          <circle cx="550" cy="505" r="475" fill="url(#location-ocean)" stroke="var(--v-accent)" strokeOpacity="0.35" />
          <g clipPath="url(#location-sphere)">
            {continents.map((path, index) => <path key={index} d={path} fill="var(--v-accent)" fillOpacity="0.3" stroke="var(--v-accent)" strokeOpacity="0.45" strokeWidth="0.8" />)}
            {grid.map((path, index) => <path key={index} d={path} fill="none" stroke="var(--v-ink)" strokeOpacity="0.09" strokeWidth="0.7" />)}
            <circle cx="550" cy="505" r="475" fill="url(#location-shade)" />
          </g>
          <text x="475" y="480" className="location__map-label">AUSTRALIA</text>
          <path d={`M${pin.x},${pin.y} L${pin.x + 65},${pin.y - 70} H810`} fill="none" stroke="var(--v-accent)" strokeWidth="1.5" />
          <a href={directions} target="_blank" rel="noopener noreferrer" aria-label="Get directions to Vagus Energy, 139 Cardigan Street, Carlton">
            <circle cx={pin.x} cy={pin.y} r="24" fill="var(--v-accent)" fillOpacity="0.12" stroke="var(--v-accent)" strokeOpacity="0.5" />
            <circle cx={pin.x} cy={pin.y} r="7" fill="var(--v-accent)" stroke="var(--v-ink)" strokeWidth="2" />
            <text x={pin.x - 15} y={pin.y + 48} className="location__map-label">MELBOURNE</text>
          </a>
        </svg>
        <div className="location__card">
          <p className="location__eyebrow">Our office</p>
          <h3>Vagus Energy</h3>
          <address>139 Cardigan Street<br />Carlton VIC 3053<br />Melbourne, Australia</address>
          <p className="location__card-detail">Engineering solar, storage and smarter energy systems, from our Melbourne base.</p>
          <a href={directions} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
