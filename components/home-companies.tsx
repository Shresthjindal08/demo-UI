"use client";

import Image from "next/image";
import { useState } from "react";

const brands = [
  { name: "GoodWe", slug: "goodwe" },
  { name: "SolarEdge", slug: "solaredge" },
  { name: "Solis", slug: "solis" },
  { name: "Sungrow", slug: "sungrow" },
  { name: "Fronius", slug: "fronius" },
  { name: "Enphase", slug: "enphase" },
  { name: "SMA", slug: "sma" },
  { name: "Growatt", slug: "growatt" },
  { name: "SolaX Power", slug: "solax" },
  { name: "Fox ESS", slug: "fox-ess" },
];

export function HomeCompanies() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="companies" aria-labelledby="companies-title" data-paused={paused}>
      <div className="companies__header">
        <h2 id="companies-title">Solar inverter &amp; energy brands</h2>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Resume brand scrolling" : "Pause brand scrolling"}>{paused ? "Play" : "Pause"}</button>
      </div>
      <div className="companies__window">
        <div className="companies__track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <Image src={`/brands/${brand.slug}.png`} alt={copy === 0 ? brand.name : ""} width={160} height={64} className="companies__logo" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="companies__ruler" aria-hidden="true"><span>▲</span></div>
    </section>
  );
}
