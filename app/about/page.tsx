import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { MediaSlot } from "@/components/ui/media-slot";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vagus Energy is a renewable-infrastructure engineering company operating across Victoria since 2014. NETCC Approved Seller and Solar Victoria Approved Retailer.",
  alternates: { canonical: routes.about },
};

const timeline = [
  { year: "2014", event: "Founded in Victoria as an electrical engineering practice." },
  { year: "2017", event: "First commercial rooftop array above 100 kWp." },
  { year: "2020", event: "Storage and grid-integration division established." },
  { year: "2023", event: "EV charging infrastructure added from driveway to depot." },
  { year: "2026", event: "Community energy and precinct-scale projects." },
];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.positioning,
    areaServed: { "@type": "State", name: "Victoria, Australia" },
    hasCredential: site.accreditations.map((item) => item.label),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="About"
        title="An engineering company that installs."
        lead="Vagus Energy has designed and delivered renewable infrastructure across Victoria since 2014. We employ our own engineers and our own crews."
        index="02 / The practice"
        imageLabel="Consultation meeting with our engineers"
      />

      <Section surface="dark" data-treatment="B" label="Founder message">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MediaSlot label="Founder message — video, captioned" className="aspect-video" />
          <div>
            <Kicker>From the founder</Kicker>
            <blockquote className="mt-6">
              <p className="text-pretty text-display-4">
                “We started because too many systems were being sold before they were
                designed. That order is the whole problem.”
              </p>
              <footer className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-6">
                <cite className="not-italic">Founder, Vagus Energy</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section surface="tint" data-treatment="C" label="Accreditation">
        <Kicker>Accreditation</Kicker>
        <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-6 max-w-[18ch] text-display-3">Current, verifiable, listed.</h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {site.accreditations.map((item) => (
            <li key={item.label} className="border-t border-hairline pt-6">
              <span className="block text-body-lg text-ink">{item.label}</span>
              {item.number ? (
                <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-2 block">{item.number}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light" data-treatment="A" label="Timeline">
        <Kicker>Timeline</Kicker>
        <ol className="mt-12 border-t border-hairline">
          {timeline.map((entry) => (
            <li
              key={entry.year}
              className="flex flex-wrap gap-x-12 gap-y-2 border-b border-hairline py-6"
            >
              <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted w-16 shrink-0">{entry.year}</span>
              <span className="text-body-lg text-ink">{entry.event}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="dark" data-treatment="F" label="Start a consultation">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[16ch] text-display-3">Work with our engineers.</h2>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactWithContext("about")} size="lg">
              {site.consultationCta}
            </ButtonLink>
            <ButtonLink href={routes.careers} variant="secondary" size="lg">
              Careers
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
