import Image from "next/image";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import { surfaceStyles } from "@/lib/styles";

const mapWidth = 800;
const mapHeight = 700;
const photo = "/vagus%20images/sydney-harbour.png";
const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const australia = feature(topology, topology.objects.countries).features.find((country) => country.properties.name === "Australia")!;
const projection = geoMercator().fitExtent([[12, 12], [mapWidth - 12, mapHeight - 12]], australia);
const outline = geoPath(projection)(australia) ?? "";
const [pinX, pinY] = projection([144.966, -37.80368]) ?? [0, 0];
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("139 Cardigan Street, Carlton VIC 3053, Australia")}`;

export function HomeLocation() {
  return (
    <section className={`${surfaceStyles} location`} data-surface="light" aria-labelledby="location-title">
      <div className="location__backdrop" aria-hidden="true">
        <Image src={photo} alt="" fill sizes="100vw" />
      </div>
      <div className="location__heading">
        <p className="location__eyebrow"><span />Local expertise. Connected thinking.</p>
        <h2 id="location-title">Where we operate</h2>
        <p>Based in Melbourne. Powering homes, businesses and communities across Victoria.</p>
      </div>
      <div className="location__visual">
        <div className="location__map">
          <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-label="Map of Australia with Vagus Energy marked in Melbourne">
            <defs>
              <clipPath id="location-australia"><path d={outline} /></clipPath>
            </defs>
            <g clipPath="url(#location-australia)">
              <image href={photo} x="-60" y="-160" width="1150" height="754" preserveAspectRatio="xMidYMid slice" />
              <rect width={mapWidth} height={mapHeight} className="location__map-tint" />
            </g>
            <path d={outline} className="location__map-outline" />
          </svg>
          <div className="location__pin" style={{ left: `${(pinX / mapWidth) * 100}%`, top: `${(pinY / mapHeight) * 100}%` }}>
            <span className="location__pin-dot" aria-hidden="true" />
            <span className="location__pin-label">Vagus Energy<small>Melbourne, VIC</small></span>
          </div>
        </div>
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
