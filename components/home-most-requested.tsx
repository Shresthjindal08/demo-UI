import Image from "next/image";
import Link from "next/link";
import { mostRequested } from "@/lib/content/categories";
import { routes } from "@/lib/routes";

const details = [
  { description: "Clean, reliable power for your home.", cta: "Explore solar solutions", facts: [["5–20 kWp", "System size"], ["Rooftop / Ground", "Installation"], ["Lower bills", "Higher independence"]] },
  { description: "Power, held quietly — and released when it costs most.", cta: "Explore storage solutions", facts: [["5–60 kWh", "Storage capacity"], ["VPP-ready", "Future ready"], ["Backup power", "During outages"]] },
  { description: "Convenient, fast and future-ready.", cta: "Explore EV charging solutions", facts: [["7–22 kW", "Charging speed"], ["Solar-aware", "Smart charging"], ["Home & fleet", "Scalable solutions"]] },
];


export function HomeMostRequested() {
  return (
    <section className="capabilities requested" aria-labelledby="requested-title">
      <div className="capabilities__header">
        <div>
          <p className="capabilities__eyebrow">Most requested</p>
          <h2 id="requested-title">The three systems<br />people ask for first.</h2>
        </div>
        <Link href={routes.whatWeDo} className="capabilities__cta">Explore all solutions</Link>
      </div>
      <ol className="requested__cards">
        {mostRequested().map((solution, index) => {
          const detail = details[index];
          const href = routes.solution(solution.category.slug, solution.slug);
          return (
            <li key={solution.slug} className="requested__card">
              <div className="capabilities__card-header">
                <div className="requested__title">
                  <span className="requested__number">{String(index + 1).padStart(2, "0")} / 03</span>
                  <h3><Link href={href}>{solution.name}</Link></h3>
                </div>
                <dl className="requested__facts">
                  {detail.facts.map(([value, label]) => <div key={label}><dt>{label}:</dt><dd>{value}</dd></div>)}
                </dl>
              </div>
              <Link href={href} className="requested__image" aria-label={`Explore ${solution.name}`}>
                <Image src={`/vagus%20images/${solution.slug}-cutout.png`} alt="" fill sizes="(max-width: 767px) 90vw, (max-width: 1279px) 85vw, 1100px" className="object-contain" />
              </Link>
              <div className="requested__footer">
                <div>
                  <p>{detail.description}</p>
                  {solution.investment && <span className="requested__price">From {solution.investment.split("–")[0].trim()}</span>}
                </div>
                <Link href={href} className="requested__link">{detail.cta}<span className="capabilities__arrow" aria-hidden="true">↗</span></Link>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
