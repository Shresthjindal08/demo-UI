import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";
import { Container } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/ui/page-masthead";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a consultation with a Vagus Energy engineer. No obligation, free site assessment, usually a call back within one business day.",
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}${routes.contact}`,
    description: site.positioning,
    areaServed: { "@type": "State", name: "Victoria, Australia" },
  };

  return (
    <div data-surface="cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="Get started"
        title="An engineer will call you back."
        lead="Not a salesperson. Usually within one business day."
        index="09 / Contact"
        imageLabel="Customer story"
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          <li className="mono-fact">No obligation</li>
          <li className="mono-fact">Free site assessment</li>
          <li className="mono-fact">NETCC Approved Seller</li>
        </ul>
      </PageMasthead>

      <section className="section">
        <Container>
          <Suspense fallback={<div className="min-h-96" />}>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
    </div>
  );
}
