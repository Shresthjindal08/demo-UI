import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead } from "@/components/ui/page-masthead";
import { Section } from "@/components/ui/primitives";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Demo privacy information",
  description: "How simulated forms work in the Vagus Energy client preview.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="interior-page">
      <PageMasthead kicker="Client preview" title="Privacy in this demo" lead="This page explains the prototype’s form behavior. It is not the final production privacy policy." />
      <Section surface="light" label="Demo form information">
        <div className="max-w-3xl space-y-6 text-body leading-relaxed">
          <p>Enquiry forms simulate the customer journey. They do not send your form details to an inbox or CRM, and the confirmation screen does not create a booking. Please use sample details when reviewing the demo.</p>
          <p>Hosting may involve standard request logs. Links to external maps or shops open services with their own privacy practices.</p>
          <p>An approved privacy policy and the necessary data-handling controls must be in place before production integrations are enabled.</p>
          <Link href={routes.demoInfo} className="inline-flex min-h-11 items-center text-accent">Read the full demo scope →</Link>
        </div>
      </Section>
    </div>
  );
}
