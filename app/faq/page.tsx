import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { routes, contactWithContext } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { FaqList } from "@/components/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about system design, rebates, warranties, timelines and monitoring.",
  alternates: { canonical: routes.faq },
};

const faqs = [
  {
    question: "How long does an installation take?",
    answer:
      "From site assessment to switch-on is typically five weeks. Two of those are approvals, which are outside our control but which we lodge and track for you.",
  },
  {
    question: "Do you handle rebates and paperwork?",
    answer:
      "Yes. Solar Victoria and federal certificate paperwork is prepared and lodged by us, and the rebate is applied to your quoted figure rather than claimed back later.",
  },
  {
    question: "What happens if something fails after handover?",
    answer:
      "The same team that installed the system services it. Monitoring usually tells us before you notice, and warranty is a single relationship with us rather than with each manufacturer.",
  },
  {
    question: "Can I add a battery or EV charger later?",
    answer:
      "Systems are sized so that storage and charging can be added without replacing the inverter or reworking the switchboard. That headroom is part of the original design.",
  },
  {
    question: "Are your figures quotes or estimates?",
    answer:
      "Ranges shown on this site are indicative and labelled as such. A firm figure follows the site assessment, because roof, switchboard and network conditions all change the answer.",
  },
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="interior-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="FAQ"
        title="The questions we are actually asked."
        lead="If yours is not here, an engineer will answer it directly."
        index="07 / Answers"

      />

      <Section surface="tint" data-treatment="C" label="Questions">
        <div className="faq-layout"><div><p className="section-kicker">Good questions. Clear answers.</p><h2>Before you<br />get started.</h2><p>From the first site visit to life after installation.</p></div><FaqList faqs={faqs} /></div>
      </Section>

      <Section surface="dark" data-treatment="F" label="Start a consultation" className="interior-cta">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-hairline pt-12 lg:flex-row lg:items-end">
          <h2 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-semibold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance max-w-[18ch] text-display-3">Ask us directly.</h2>
          <ButtonLink href={contactWithContext("faq")} size="lg">
            {site.consultationCta}
          </ButtonLink>
        </div>
      </Section>
    </div>
  );
}
