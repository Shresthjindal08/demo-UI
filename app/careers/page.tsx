import type { Metadata } from "next";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Kicker, Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineering roles at Vagus Energy — design, commissioning and grid integration across Victoria.",
  alternates: { canonical: routes.careers },
};

const roles = [
  { title: "Electrical Engineer — Systems Design", location: "Melbourne", type: "Full time" },
  { title: "Commissioning Engineer", location: "Geelong", type: "Full time" },
  { title: "Apprentice Electrician", location: "Melbourne", type: "Apprenticeship" },
];

export default function CareersPage() {
  return (
    <>
      <PageMasthead
        kicker="Careers"
        title="Real problems, measured outcomes."
        lead="We hire engineers who want to see a system through from load profile to monitoring data — not to hand it over at the drawing stage."
        index="06 / Join us"
        imageLabel="Engineering Consulting"
      />

      <Section surface="tint" data-treatment="A" label="Open roles">
        <Kicker>Open roles</Kicker>
        <ul className="mt-10 border-t border-hairline">
          {roles.map((role) => (
            <li key={role.title} className="border-b border-hairline">
              <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-5">
                <span className="text-display-4 text-ink">{role.title}</span>
                <span className="flex items-center gap-6">
                  <span className="mono-fact">{role.location}</span>
                  <span className="mono-fact">{role.type}</span>
                  <ButtonLink href={contactWithContext(`careers-${role.title}`)} variant="secondary">
                    Apply
                  </ButtonLink>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="dark" data-treatment="F" label="Speculative applications">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[20ch] text-display-3">
            Nothing listed that fits? Tell us what you do.
          </h2>
          <ButtonLink href={contactWithContext("careers")} size="lg">
            Send an application
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
