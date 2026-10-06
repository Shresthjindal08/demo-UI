import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/lib/content/projects";
import { routes } from "@/lib/routes";
import { Section } from "@/components/ui/primitives";

const presentations = [
  { image: "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg", description: "Rooftop solar, battery storage and energy optimisation working together to reduce reliance on grid power.", note: "Clean energy powering operations" },
  { image: "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg", description: "Solar, battery storage and home EV charging, brought together for greater energy independence.", note: "Powering homes, brighter tomorrows" },
];

export function HomeProjects({ displayFont }: { displayFont: string }) {
  return (
    <Section surface="light" label="Selected work" className="overflow-hidden bg-white">
      <div className="mb-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-4 font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-accent"><span aria-hidden="true" className="h-px w-16 bg-accent/50" />Systems already running</p>
          <h2 className={`${displayFont} mt-6 text-display-2 font-medium leading-[1.04] tracking-[var(--tracking-display)] text-ink`}>Real projects.<br /><em className="text-accent">Real impact.</em></h2>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xs text-lead text-body">From homes to businesses, integrated energy systems designed around the way people live and work.</p>
          <Link href={routes.projects} className="inline-flex min-h-12 items-center gap-6 rounded-pill border border-accent px-6 py-3 text-body-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">All projects <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <ol className="space-y-16 lg:space-y-20">
        {featuredProjects().map((project, index) => {
          const presentation = presentations[index];
          return (
            <li key={project.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className={`grid grid-cols-[1fr] gap-6 sm:grid-cols-[5rem_1fr] sm:gap-6 ${index % 2 ? "lg:col-start-2 lg:row-start-1" : ""}`}>
                <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                  <span className="font-mono text-caption text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px w-12 bg-hairline sm:h-16 sm:w-px" />
                  <Link href={routes.project(project.slug)} aria-label={`View ${project.name}`} className="flex size-20 shrink-0 flex-col items-center justify-center rounded-pill bg-tint text-center text-body-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span>View<br />project</span><span aria-hidden="true" className="mt-1">↗</span></Link>
                </div>
                <div>
                  <p className="font-mono text-kicker uppercase leading-relaxed tracking-[var(--tracking-kicker)] text-accent">{project.industry} · {project.suburb} · {project.year}</p>
                  <h3 className={`${displayFont} mt-4 text-display-3 font-medium leading-[1.06] tracking-[var(--tracking-display)] text-ink`}>{project.name}</h3>
                  <p className="mt-5 max-w-md text-body text-lead">{presentation.description}</p>
                  <ul className="mt-8 grid grid-cols-3 divide-x divide-hairline">
                    {project.metrics.map((metric, metricIndex) => (
                      <li key={metric.label} className="px-3 first:pl-0 last:pr-0">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 size-6 text-accent">{metricIndex === 0 ? <><path d="m5 7-2 10h18L19 7ZM8 7l-1 10m9-10 1 10M4 12h16M12 17v4m-4 0h8M12 1v3M4 3l2 2m14-2-2 2" /></> : metricIndex === 1 ? <path d="M8 4V2h8v2M6 4h12v18H6zM13 8l-3 5h4l-3 5" /> : <path d="M20 3C9 3 4 7 5 14c6 5 15 0 15-11ZM3 21 16 8" />}</svg>
                        <span className="block text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-none text-ink">{metric.value}</span>
                        <span className="mt-2 block text-caption text-muted">{metric.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <figure className={`relative ${index % 2 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <Link href={routes.project(project.slug)} aria-label={`View ${project.name}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <div className={`relative aspect-[1.45] overflow-hidden bg-tint ${index % 2 ? "rounded-[24%_55%_5%_28%/38%_78%_8%_32%]" : "rounded-[38%_28%_5%_25%/48%_48%_8%_30%]"}`}>
                    <Image src={presentation.image} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-[var(--duration-base)] ease-brand group-hover:scale-105 motion-reduce:transform-none" />
                  </div>
                  <span className={`absolute top-7 flex max-w-48 items-center gap-3 rounded-lg border border-hairline bg-white/95 p-4 text-body-sm text-body ${index % 2 ? "left-0" : "right-0"}`}><span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-pill bg-tint text-xl text-accent">{index % 2 ? "⌂" : "ϟ"}</span>{presentation.note}</span>
                </Link>
                <figcaption className="mt-3 text-right text-caption text-muted">Illustrative imagery</figcaption>
              </figure>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
