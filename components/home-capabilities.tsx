"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { launchCategories } from "@/lib/content/categories";
import { routes } from "@/lib/routes";

const images: Record<string, string> = {
  "renewable-energy": "residential-solar-cutout.png",
  "electric-mobility": "home-ev-charging-cutout.png",
  "energy-efficiency": "energy-efficiency-cutout.png",
  "community-energy": "community-energy-cutout.png",
};

export function HomeCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="solutions" className="capabilities" aria-labelledby="capabilities-title">
      <div className="capabilities__header">
        <div>
          <p className="capabilities__eyebrow">Our capabilities</p>
          <h2 id="capabilities-title">Four capabilities.<br />One complete system.</h2>
        </div>
        <Link href={routes.whatWeDo} className="capabilities__cta">
          Explore all capabilities
        </Link>
      </div>
      <ul className="capabilities__grid" aria-label="Service capabilities">
        {launchCategories.map((category, position) => (
          <li key={category.slug} className={position === activeIndex ? "is-active" : undefined}>
            <button
              type="button"
              className="capabilities__strip"
              aria-expanded={position === activeIndex}
              aria-controls={`capability-${category.slug}`}
              onClick={() => setActiveIndex(position)}
              onMouseEnter={() => setActiveIndex(position)}
            >
              <span className="capabilities__strip-index">.{category.index}</span>
              <span className="capabilities__strip-name">{category.name}</span>
            </button>
            <Link id={`capability-${category.slug}`} href={routes.category(category.slug)} className="capabilities__card" tabIndex={position === activeIndex ? undefined : -1} aria-hidden={position !== activeIndex}>
              <div className="capabilities__card-header">
                <span className="capabilities__index">.{category.index}</span>
                <h3>{category.name}</h3>
                <p className="capabilities__promise">{category.promise}</p>
                <ul className="capabilities__facts">
                  {category.facts.slice(0, 2).map((fact, index) => <li key={fact}><span>{index === 0 ? "Solutions" : "Scope"}</span> {index === 0 ? fact.replace(" solutions", "") : fact}</li>)}
                </ul>
                <p className="capabilities__descriptor">{category.descriptor}</p>
              </div>
              <div className="capabilities__image">
                <Image src={`/vagus%20images/${images[category.slug]}`} alt="" fill sizes="(max-width: 767px) 90vw, 60vw" className="object-contain" />
                <span className="capabilities__explore">Explore capability <span className="capabilities__arrow" aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
