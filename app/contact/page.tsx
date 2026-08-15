import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";
import { Container, Kicker } from "@/components/ui/primitives";
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

      <section className="section pt-[calc(var(--nav-height)+64px)]">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            <div>
              <Kicker>Get started</Kicker>
              <h1 className="mt-8 max-w-[12ch] text-display-2">
                An engineer will call you back.
              </h1>
              <p className="measure mt-8 text-lead">
                Not a salesperson. Usually within one business day.
              </p>
              <ul className="mt-12 space-y-4 border-t border-hairline pt-8">
                <li className="mono-fact">No obligation</li>
                <li className="mono-fact">Free site assessment</li>
                <li className="mono-fact">NETCC Approved Seller</li>
              </ul>
            </div>

            <Suspense fallback={<div className="min-h-96" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </div>
  );
}
