import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { MediaSlot } from "@/components/ui/media-slot";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "The engineering philosophy behind Vagus Energy — why we design complete systems rather than sell individual products.",
  alternates: { canonical: "/vision" },
};

const principles = [
  {
    index: "01",
    title: "Design to the load, not the catalogue",
    body: "A system is drawn to a building's actual demand profile. The equipment list follows the design; it never leads it.",
  },
  {
    index: "02",
    title: "Accountability does not transfer",
    body: "The engineer who designs a system stays with it through commissioning and into monitoring.",
  },
  {
    index: "03",
    title: "Measure, then claim",
    body: "Performance figures on this site come from monitoring data on installed systems, not from modelling.",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageMasthead
        kicker="Vision"
        title="Infrastructure, not appliances."
        lead="Australia is rebuilding its energy system one building at a time. That work deserves engineering discipline, not a sales funnel."
        index="03 / Direction"
        imageLabel="Renewable Energy"
      />

      <Section surface="tint" data-treatment="C" label="Principles">
        <Kicker>Principles</Kicker>
        <ol className="mt-12 grid gap-12 lg:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.index}>
              <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">{principle.index}</span>
              <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-4 text-display-4">{principle.title}</h2>
              <p className="text-pretty mt-4 text-body-sm">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="dark" data-treatment="B" label="Engineering practice">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MediaSlot label="Engineering practice — real work, real sites" className="aspect-[4/3]" />
          <div>
            <Kicker>Practice</Kicker>
            <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[16ch] text-display-3">
              The whole system, or none of it.
            </h2>
            <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-6 text-body-lg">
              Generation, storage, charging and control interact. Designed separately they
              fight each other; designed together they compound. That is the entire
              argument for how this company is organised.
            </p>
          </div>
        </div>
      </Section>

      <Section surface="light" data-treatment="F" label="Start a consultation">
        <p className="text-pretty mx-auto max-w-[22ch] text-center font-display text-display-2 text-ink">
          Engineered for what&rsquo;s next.
        </p>
        <div className="mt-12 flex justify-center">
          <ButtonLink href={contactWithContext("vision")} size="lg">
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
