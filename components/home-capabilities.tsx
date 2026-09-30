import Image from "next/image";
import Link from "next/link";
import { launchCategories } from "@/lib/content/categories";
import { routes } from "@/lib/routes";
import { Section } from "@/components/ui/primitives";

const capabilityIcons = [
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  <><path d="m3 13 2-6h11l3 6v6h-2m-12 0H3v-6h16M7 19h6M19 4h3v5h-3zM20 2v2m2-2v2M19 9v4" /><circle cx="7" cy="17" r="2" /><circle cx="15" cy="17" r="2" /></>,
  <><path d="M20 3C9 3 4 7 5 14c6 5 15 0 15-11ZM3 21 16 8M9 15V9m0 6h6" /></>,
  <><circle cx="12" cy="6" r="3" /><circle cx="4" cy="9" r="2" /><circle cx="20" cy="9" r="2" /><path d="M7 22v-5a5 5 0 0 1 10 0v5M1 20v-5a3 3 0 0 1 4-3m18 8v-5a3 3 0 0 0-4-3" /></>,
];

export function HomeCapabilities({ displayFont }: { displayFont: string }) {
  return (
    <Section id="solutions" surface="light" label="Our capabilities" className="bg-white">
      <div className="mb-12 grid gap-8 lg:mb-14 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="flex items-center gap-4 font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-accent">
            <span aria-hidden="true" className="h-px w-12 bg-accent" /> Our capabilities
          </p>
          <h2 className={`${displayFont} mt-6 text-display-2 font-medium leading-[1.04] tracking-[var(--tracking-display)] text-ink`}>
            Four capabilities.<br />
            <em className="text-accent">One complete system.</em>
          </h2>
        </div>
        <div className="max-w-sm lg:justify-self-end">
          <p className="text-lead text-body">Generation, charging, efficiency and shared energy — designed to work together for a cleaner, stronger tomorrow.</p>
          <Link href={routes.whatWeDo} className="mt-5 inline-flex min-h-11 items-center gap-6 rounded-pill bg-accent px-6 py-3 text-body-sm font-medium text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Explore all capabilities <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <ul className="grid gap-5 lg:grid-cols-2" aria-label="Service capabilities">
        {launchCategories.map((category, index) => (
          <li key={category.slug}>
            <Link href={routes.category(category.slug)} className="group relative isolate flex min-h-72 h-full overflow-hidden rounded-lg border border-hairline bg-white transition-colors duration-[var(--duration-base)] hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:min-h-80">
              <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-52 w-full sm:inset-y-0 sm:h-auto sm:w-[60%]">
                <Image src={`/capabilities/${category.slug}.png`} alt="" fill sizes="(max-width: 767px) 65vw, 35vw" className="object-contain object-right-bottom transition-transform duration-[var(--duration-base)] ease-brand group-hover:scale-105 motion-reduce:transform-none" />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/10 to-transparent" />
              </div>
              <div className="relative flex w-full flex-col items-start pt-6 pb-56 pl-5 pr-5 sm:w-[52%] sm:py-6 sm:pr-2 sm:pl-7 lg:py-8 lg:pl-8">
                <span className="mb-4 font-mono text-caption text-accent after:mt-1 after:block after:h-px after:w-4 after:bg-accent">{category.index}</span>
                <h3 className={`${displayFont} text-[clamp(1.875rem,2.8vw,2.75rem)] font-medium leading-[0.98] tracking-[var(--tracking-display)] text-ink`}>{category.name}</h3>
                <p className="mt-4 max-w-[23ch] text-body-sm leading-[1.45] text-body">{category.descriptor}</p>
                <span className="mt-auto pt-5 text-body-sm font-medium text-accent"><span className="inline-flex items-center gap-3 border-b border-accent/50 pb-1">Explore solutions <span aria-hidden="true">→</span></span></span>
              </div>
              <span aria-hidden="true" className="absolute right-3 top-3 grid size-12 place-items-center rounded-pill border border-hairline-faint bg-bg text-accent lg:size-14">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="size-6">{capabilityIcons[index]}</svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
