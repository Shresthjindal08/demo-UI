import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

const metrics = [
  { value: "46.2", label: "MW installed", description: "Clean energy capacity across rooftop and large-scale systems." },
  { value: "2,500+", label: "Projects delivered", description: "Energy solutions for homes, businesses and communities." },
  { value: "99.4%", label: "Fleet uptime", description: "Reliable performance across our operating energy systems." },
  { value: "10+", label: "Years operating", description: "Engineering experience, from system design to commissioning." },
];

export function HomeImpact() {
  return (
    <section className="impact" aria-labelledby="impact-title">
      <div className="impact__image">
        <Image src="/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg" alt="Solar panels and wind turbines at sunset" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-center" />
      </div>
      <div className="impact__content">
        <div className="impact__intro">
          <p className="impact__eyebrow">Impact in numbers</p>
          <h2 id="impact-title">Powering a cleaner tomorrow.</h2>
          <p>From rooftops to large-scale systems, our solutions are already generating clean energy for homes, businesses and communities.</p>
        </div>
        <dl className="impact__metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="impact__metric">
              <dt><span>{metric.label}</span>{metric.description}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
        <Link href={routes.projects} className="impact__cta">Our impact <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
