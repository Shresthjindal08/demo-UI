import Image from "next/image";
import { dummyImage } from "@/lib/content/media";
import Link from "next/link";
import { mostRequested } from "@/lib/content/categories";
import { routes } from "@/lib/routes";
import { Section } from "@/components/ui/primitives";

const details = [
  { description: "Clean, reliable power for your home.", cta: "Explore solar solutions", callout: "Turn sunlight into savings.", facts: [["5–20 kWp", "System size"], ["Rooftop / Ground", "Installation"], ["Lower bills", "Higher independence"]] },
  { description: "Power, held quietly — and released when it costs most.", cta: "Explore storage solutions", callout: "Store today for a brighter tomorrow.", facts: [["5–60 kWh", "Storage capacity"], ["VPP-ready", "Future ready"], ["Backup power", "During outages"]] },
  { description: "Convenient, fast and future-ready.", cta: "Explore EV charging solutions", callout: "Charge smarter with clean energy.", facts: [["7–22 kW", "Charging speed"], ["Solar-aware", "Smart charging"], ["Home & fleet", "Scalable solutions"]] },
];

const symbols = [
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  <><path d="M8 4V2h8v2m-10 0h12v18H6zM13 8l-3 5h4l-3 5" /></>,
  <path key="charging" d="m14 2-9 12h6l-1 8 9-12h-6z" />,
];

export function HomeMostRequested({ displayFont }: { displayFont: string }) {
  return (
    <Section surface="light" label="Most requested" className="bg-white">
      <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-4 font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-muted"><span aria-hidden="true" className="h-px w-12 bg-accent/50" />Most requested</p>
          <h2 className={`${displayFont} mt-5 text-display-2 font-medium leading-[1.04] tracking-[var(--tracking-display)] text-ink`}>The three systems<br /><em className="text-accent">people ask for first.</em></h2>
        </div>
        <div className="flex flex-wrap items-center gap-6 lg:pb-3">
          <p className="basis-56 grow text-body-sm text-body">From generating clean power to storing it and keeping you on the move — these are the solutions our customers choose most.</p>
          <Link href={routes.whatWeDo} className="inline-flex min-h-11 shrink-0 items-center gap-5 rounded-pill border border-accent px-5 py-3 text-body-sm text-accent transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">See all solutions <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <ol className="relative lg:before:absolute lg:before:inset-y-12 lg:before:left-1/2 lg:before:w-px lg:before:bg-accent/25">
        {mostRequested().map((solution, index) => {
          const detail = details[index];
          return (
            <li key={solution.slug} className="group/row relative grid items-center gap-7 border-b border-hairline-faint py-8 last:border-0 lg:grid-cols-2 lg:gap-20 lg:py-6">
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-hairline bg-white lg:flex"><span className="size-3 rounded-pill bg-accent" /></span>
              <div className={`relative ${index % 2 ? "lg:col-start-2 lg:row-start-1" : ""}`}>
                <span className="mb-3 flex items-center gap-5 font-mono text-caption text-muted">{String(index + 1).padStart(2, "0")}<span aria-hidden="true" className="h-px w-7 bg-accent/40" /></span>
                <div className="sm:pl-12">
                  <h3 className={`${displayFont} text-display-3 font-medium leading-tight text-ink`}>{solution.name}</h3>
                  <p className="mt-2 text-body-sm text-body">{detail.description}</p>
                  <ul className="my-6 grid gap-4 sm:grid-cols-3 sm:gap-3">
                    {detail.facts.map(([value, label], factIndex) => (
                      <li key={label} className="flex items-start gap-2 sm:border-r sm:border-hairline-faint sm:pr-2 sm:last:border-0">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0 text-accent">{symbols[(index + factIndex) % symbols.length]}</svg>
                        <div><span className="block text-body-sm font-medium text-ink">{value}</span><span className="mt-1 block text-caption text-muted">{label}</span></div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={routes.solution(solution.category.slug, solution.slug)} className="inline-flex min-h-11 items-center gap-4 border-b border-accent/50 text-body-sm font-medium text-accent transition-colors hover:border-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{detail.cta}<span aria-hidden="true">→</span></Link>
                    {solution.investment && <span className="text-caption text-muted">From {solution.investment.split("–")[0].trim()}</span>}
                  </div>
                </div>
              </div>
              <Link href={routes.solution(solution.category.slug, solution.slug)} aria-label={`Explore ${solution.name}`} className={`group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${index % 2 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="relative mr-5 aspect-[1.9] overflow-hidden rounded-t-[50%_85%] rounded-b-md bg-tint sm:mr-10">
                  <Image src={dummyImage(solution.name)} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-[var(--duration-base)] ease-brand group-hover:scale-105 motion-reduce:transform-none" />
                </div>
                <div className={`relative mt-3 flex w-full items-start gap-3 sm:absolute sm:mt-0 rounded-lg border border-hairline bg-white/95 p-4 text-body-sm text-body sm:bottom-8 sm:w-48 ${index % 2 ? "left-0 lg:-left-5" : "right-0"}`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0 rounded-pill bg-tint p-1 text-accent">{symbols[index]}</svg>
                  <div>{detail.callout}<span aria-hidden="true" className="ml-auto mt-2 grid size-7 place-items-center rounded-pill border border-hairline text-accent">→</span></div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
