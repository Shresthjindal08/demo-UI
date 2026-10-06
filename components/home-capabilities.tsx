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
        {launchCategories.map((category) => (
          <li key={category.slug}>
            <Link href={routes.category(category.slug)} className="capabilities__card">
              <div className="capabilities__card-header">
                <h3>{category.name}</h3>
                <ul className="capabilities__facts">
                  {category.facts.slice(0, 2).map((fact, index) => <li key={fact}><span>{index === 0 ? "Solutions:" : "Scope:"}</span> {index === 0 ? fact.replace(" solutions", "") : fact}</li>)}
                </ul>
              </div>
              <div className="capabilities__image">
                <Image src={`/vagus%20images/${images[category.slug]}`} alt="" fill sizes="(max-width: 767px) 90vw, 45vw" className="object-contain" />
              </div>
              <div className="capabilities__card-footer">
                <p>{category.descriptor}</p>
                <span className="capabilities__arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
