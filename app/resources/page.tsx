import Link from "next/link";
import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { Kicker, PageHeader, Section } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/media-slot";

export const metadata: Metadata = {
  title: "Resources & learn",
  description:
    "Guides, explainers and specifier documents — published as web pages and calculators rather than gated PDFs.",
  alternates: { canonical: routes.resources },
};

const learn = [
  { title: "Solar basics", body: "How an array is sized, and why orientation matters more than panel brand." },
  { title: "Battery sizing", body: "What actually determines how long your house stays on." },
  { title: "EV charging at home", body: "Switchboard limits, load control and charging from your own roof." },
  { title: "Community energy", body: "How a shared battery works and who it pays back." },
];

const documents = [
  { title: "Specification sheets", note: "PDF · ungated" },
  { title: "Architect guide", note: "PDF · ungated" },
  { title: "Warranty terms", note: "PDF · ungated" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        kicker="Resources & learn"
        title="Answers, not email gates."
        lead="The buying guidance that used to sit behind a download form is published here as pages and interactive tools. Documents remain only where a specifier genuinely needs one."
      />

      <Section surface="tint" data-treatment="A" label="Learn">
        <Kicker>Learn</Kicker>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {learn.map((item) => (
            <li key={item.title}>
              <article className="flex h-full flex-col border border-hairline p-6">
                <MediaSlot label={`Video — ${item.title}`} className="aspect-video" />
                <h2 className="mt-6 text-display-4">{item.title}</h2>
                <p className="mt-3 text-body-sm">{item.body}</p>
                <p className="mono-fact mt-auto pt-6">Filming scheduled</p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light" data-treatment="C" label="Specifier documents">
        <Kicker>For specifiers</Kicker>
        <h2 className="mt-6 max-w-[18ch] text-display-3">Ungated, always.</h2>
        <ul className="mt-10 border-t border-hairline">
          {documents.map((document) => (
            <li key={document.title} className="border-b border-hairline">
              <span className="flex min-h-14 flex-wrap items-center justify-between gap-4 py-4">
                <span className="text-body-lg text-ink">{document.title}</span>
                <span className="mono-fact">{document.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="dark" data-treatment="F" label="FAQ">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="max-w-[18ch] text-display-3">Still have a question?</h2>
          <Link href={routes.faq} className="text-body-lg text-accent">
            Read the FAQ →
          </Link>
        </div>
      </Section>
    </>
  );
}
