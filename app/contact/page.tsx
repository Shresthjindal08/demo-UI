import { surfaceStyles } from "@/lib/styles";
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
    <div data-surface="cream" className={`${surfaceStyles} interior-page`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageMasthead
        kicker="Get started"
        title="An engineer will call you back."
        lead="Not a salesperson. Usually within one business day."
        index="09 / Contact"

      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">No obligation</li>
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">Free site assessment</li>
          <li className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">NETCC Approved Seller</li>
        </ul>
      </PageMasthead>

      <section className="contact-layout">
        <Container className="contact-layout__grid">
          <aside className="contact-details">
            <p className="section-kicker">Let’s talk energy</p>
            <h2>A good system starts with a conversation.</h2>
            <p>Tell us about your property and what you want to achieve. Our team will help you work out the next step.</p>
            <a href="tel:1300698248">1300 698 248 <span aria-hidden="true">↗</span></a>
            <a href="mailto:hello@vagus.energy">hello@vagus.energy <span aria-hidden="true">↗</span></a>
            <address>139 Cardigan Street<br />Carlton VIC 3053<br />Melbourne, Australia</address>
          </aside>
          <Suspense fallback={<div className="min-h-96" />}>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
    </div>
  );
}
