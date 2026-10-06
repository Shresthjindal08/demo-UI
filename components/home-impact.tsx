import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { routes } from "@/lib/routes";

const metrics = [
  { value: "46.2", label: "MW installed", icon: "m14 2-9 12h6l-1 8 9-12h-6z" },
  { value: "2,500+", label: "Projects delivered", icon: "M5 4h14l2 13H3L5 4Zm7 0v13M8 4 7 17m9-13 1 13M4 9h16M3 13h18M12 17v4m-4 0h8" },
  { value: "99.4%", label: "Fleet uptime", icon: "M3 14h4v7H3zM10 9h4v12h-4zM17 3h4v18h-4z" },
  { value: "10+", label: "Years operating", icon: "M20 3C9 3 4 7 5 14c6 5 15 0 15-11ZM3 21 16 8" },
];

export function HomeImpact({ displayFont }: { displayFont: string }) {
  return (
    <Section surface="light" label="Impact in numbers" className="overflow-hidden bg-white pb-0">
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs><clipPath id="impact-landscape" clipPathUnits="objectBoundingBox"><path d="M0 .13Q0 .03 .04 .03C.27 .01 .23 .35 .49 .4C.63 .43 .73 .41 .79 .42C.86 .44 .83 .72 .92 .78L.98 .86Q1 .87 1 .94Q1 1 .96 1H.03Q0 1 0 .9Z" /></clipPath></defs>
      </svg>
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-4 font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-accent"><span aria-hidden="true" className="h-px w-12 bg-accent/40" />Impact in numbers</p>
          <h2 className={`${displayFont} mt-6 text-display-2 font-medium leading-[1.04] tracking-[var(--tracking-display)] text-ink`}>Powering a<br /><em className="text-accent">cleaner tomorrow.</em></h2>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xs text-body-sm leading-relaxed text-body">From rooftops to large-scale systems, our solutions are already generating clean energy for homes, businesses and communities.</p>
          <Link href={routes.projects} className="inline-flex min-h-12 items-center gap-6 rounded-pill border border-accent px-6 py-3 text-body-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Our impact <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <ul className="relative z-10 mt-10 grid grid-cols-2 gap-y-8 lg:ml-[28%] lg:mt-8 lg:grid-cols-4 xl:ml-[34%]">
        {metrics.map((metric) => (
          <li key={metric.label} className="flex flex-col items-start min-w-0 border-l border-hairline px-3 first:border-0 sm:px-5 lg:px-4 xl:px-7">
            <span className="mb-4 grid size-11 place-items-center rounded-pill bg-tint text-accent"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d={metric.icon} /></svg></span>
            <span className={`${displayFont} whitespace-nowrap text-[clamp(2rem,3.5vw,4rem)] font-medium leading-none text-ink`}>{metric.value}</span>
            <span className="mt-3 font-mono text-kicker uppercase leading-relaxed tracking-[var(--tracking-kicker)] text-muted">{metric.label}</span>
          </li>
        ))}
      </ul>
      <div className="relative mt-8 lg:-mt-28">
        <svg aria-hidden="true" viewBox="0 0 300 200" fill="none" className="pointer-events-none absolute right-0 bottom-0 hidden w-[20%] text-accent/30 lg:block"><path d="M5 100C100-40 235 0 295 190" stroke="currentColor" /><circle cx="220" cy="63" r="4" fill="currentColor" /></svg>
        <div className="relative h-64 overflow-hidden rounded-lg bg-tint lg:h-[clamp(22rem,30vw,32rem)] lg:rounded-none lg:[clip-path:url(#impact-landscape)]">
          <Image src="/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg" alt="Solar panels and wind turbines at sunset" fill sizes="100vw" className="object-cover object-center" />
        </div>
      </div>
    </Section>
  );
}
