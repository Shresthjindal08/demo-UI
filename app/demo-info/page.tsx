import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead } from "@/components/ui/page-masthead";
import { Section } from "@/components/ui/primitives";
import { demo } from "@/lib/content/demo";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
  alternates: { canonical: routes.demoInfo },
};

export default function DemoInfoPage() {
  return (
    <div className="interior-page">
      <PageMasthead
        kicker="Client preview"
        title={demo.title}
        lead={demo.description}
      />
      <Section surface="light" label="Demo scope and limitations">
        <div className="max-w-3xl space-y-10">
          {demo.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-display-4 text-ink">{section.title}</h2>
              <p className="mt-4 text-body leading-relaxed">{section.body}</p>
            </div>
          ))}
          <Link href={routes.home} className="inline-flex min-h-11 items-center text-accent">
            Back to the website →
          </Link>
        </div>
      </Section>
    </div>
  );
}
