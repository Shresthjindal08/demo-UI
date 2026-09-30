"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Section } from "@/components/ui/primitives";

const stages = [
  { label: "Design", title: ["Engineering-led", "design"], body: "Every system is designed around your building, usage pattern and future needs — no one-size-fits-all approach.", image: "/capabilities/energy-efficiency.png", features: ["Site assessment", "Custom system design", "Transparent proposal"] },
  { label: "Execute", title: ["One team,", "end to end"], body: "Our engineers, installers and project managers work together from design through installation and commissioning.", image: "/most-requested/battery-storage.png", features: ["Dedicated project team", "Professional installation", "Safety & quality checks"] },
  { label: "Optimise", title: ["Measured", "after handover"], body: "We monitor performance and fine-tune the system to keep it working as designed — beyond the initial installation.", image: null, features: ["Real-time monitoring", "Performance tuning", "Proactive support"] },
  { label: "Grow", title: ["Built to be", "added to"], body: "Start with what you need today. Add storage, EV charging or more panels as your energy needs grow.", image: "/capabilities/electric-mobility.png", features: ["Modular design", "Add storage or EV charging", "Ready for future upgrades"] },
];

export function HomeHowWeWork({ displayFont }: { displayFont: string }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });

  function scrollStages(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement;
    track.scrollBy({ left: direction * (card.offsetWidth + parseFloat(getComputedStyle(track).columnGap)), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <Section surface="light" label="How we work" className="overflow-hidden bg-white">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-center">
        <div>
          <p className="flex items-center gap-4 font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-accent"><span aria-hidden="true" className="h-px w-12 bg-accent/40" />How we work</p>
          <h2 className={`${displayFont} mt-6 text-display-2 font-medium leading-[1.04] tracking-[var(--tracking-display)] text-ink`}>Method,<br /><em className="text-accent">not salesmanship.</em></h2>
        </div>
        <div className="flex flex-wrap items-start gap-6 lg:pb-3">
          <p className="max-w-xs text-body text-body-sm">A clear, structured process from assessment to long-term support — built around real outcomes, not pushy promises.</p>
          <div className="flex shrink-0 gap-3 xl:hidden">
            <button type="button" aria-label="Previous stage" aria-controls="work-stages" disabled={position.start} onClick={() => scrollStages(-1)} className="grid size-11 place-items-center rounded-pill border border-accent bg-tint text-accent transition-colors hover:bg-accent hover:text-on-accent disabled:cursor-default disabled:border-hairline disabled:bg-white disabled:text-muted disabled:opacity-40">←</button>
            <button type="button" aria-label="Next stage" aria-controls="work-stages" disabled={position.end} onClick={() => scrollStages(1)} className="grid size-11 place-items-center rounded-pill border border-accent bg-tint text-accent transition-colors hover:bg-accent hover:text-on-accent disabled:cursor-default disabled:border-hairline disabled:bg-white disabled:text-muted disabled:opacity-40">→</button>
          </div>
        </div>
      </div>

      <div className="relative">

        <ol id="work-stages" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; setPosition({ start: track.scrollLeft <= 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 }); }} className="relative grid grid-rows-[repeat(6,auto)] auto-cols-[85%] grid-flow-col gap-x-8 gap-y-0 xl:gap-x-12 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] sm:auto-cols-[46%] xl:grid-cols-4 xl:auto-cols-auto xl:overflow-visible">
          {stages.map((stage, index) => (
            <li key={stage.label} className="relative row-span-6 grid min-w-0 snap-start grid-rows-subgrid">
              {index < stages.length - 1 && <svg aria-hidden="true" viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute left-[34px] top-[84px] hidden h-16 w-[calc(100%+3rem)] text-accent/25 xl:block"><path d="M0 0C35 40 65 40 100 0" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>}
              <div className="relative z-10 ml-5 flex h-24 w-7 flex-col items-center text-center">
                <span className="font-mono text-caption leading-5 text-accent">0{index + 1}</span>
                <span aria-hidden="true" className="mx-auto my-2 block h-8 w-px bg-accent/30" />
                <span aria-hidden="true" className="mx-auto grid size-6 place-items-center rounded-pill border border-accent/20 bg-white"><span className="size-2 rounded-pill bg-accent" /></span>
              </div>
              <div className="relative -mt-8 mb-6 h-[clamp(10rem,13vw,13rem)] overflow-hidden rounded-t-[50%] rounded-b-md bg-white">
                {stage.image ? <Image src={stage.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 480px) 50vw, 85vw" className="object-cover object-center" /> : (
                  <div className="absolute inset-x-3 bottom-1 top-5 flex flex-col justify-between rounded-md border border-hairline bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2"><span className="text-caption font-medium text-ink">Performance monitoring</span><span className="size-2 rounded-pill bg-accent" /></div>
                    <div aria-hidden="true" className="mt-3 flex min-h-0 flex-1 items-end gap-2 border-b border-hairline pb-2">{[18, 25, 23, 36, 43, 40, 55, 66, 72, 85, 96].map((height, bar) => <span key={bar} style={{ height: `${height}%` }} className="flex-1 rounded-t-sm bg-accent/80" />)}</div>
                    <p className="mt-2 text-caption text-muted">Measure. Adjust. Improve.</p>
                  </div>
                )}
              </div>
              <p className="font-mono text-kicker uppercase tracking-[var(--tracking-kicker)] text-accent">{stage.label}</p>
              <h3 className={`${displayFont} mt-3 text-[clamp(1.75rem,2.25vw,2.25rem)] font-medium leading-[1.08] tracking-[var(--tracking-display)] text-ink`}>{stage.title[0]}<br />{stage.title[1]}</h3>
              <p className="mt-4 mb-6 max-w-[30ch] text-body-sm leading-[1.5] text-body">{stage.body}</p>
              <ul className="space-y-4 border-t border-hairline pt-5">
                {stage.features.map((feature, featureIndex) => <li key={feature} className="flex items-center gap-3 text-body-sm text-body"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-accent">{featureIndex === 0 ? <><circle cx="12" cy="12" r="7" /><path d="m9 12 2 2 4-4" /></> : featureIndex === 1 ? <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /> : <><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h5" /></>}</svg>{feature}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
