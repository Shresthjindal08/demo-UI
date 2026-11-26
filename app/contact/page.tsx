import { surfaceStyles } from "@/lib/styles";
import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a consultation with a Vagus Energy engineer. No obligation, free site assessment, usually a call back within one business day.",
  alternates: { canonical: routes.contact },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const query = await searchParams;
  const context = typeof query.context === "string" ? query.context : null;
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

      <section className="contact-hq" aria-labelledby="contact-title">
        <div className="contact-hq__feature">
          <Image src="/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg" alt="" fill priority sizes="(max-width: 767px) 100vw, 90vw" />
          <div className="contact-hq__feature-copy">
            <p className="contact-hq__kicker">09 / Contact</p>
            <h1 id="contact-title">Find us at our<br />Melbourne base.</h1>
            <p>From our studio in Carlton, our engineers design and deliver solar, storage and EV charging systems for homes, businesses and communities across Victoria.</p>
          </div>
        </div>
        <div className="contact-hq__row">
          <div className="contact-hq__map">
            <iframe title="Map showing Vagus Energy at 139 Cardigan Street, Carlton" src="https://maps.google.com/maps?q=139%20Cardigan%20Street%2C%20Carlton%20VIC%203053&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="contact-hq__copy">
            <h2>Melbourne is where Victoria’s energy transition is being built.</h2>
            <p>We’re close to the homes and sites we work on, so assessments, installs and aftercare all come from the same local team.</p>
            <dl className="contact-hq__details">
              <div><dt>Visit</dt><dd>139 Cardigan Street<br />Carlton VIC 3053</dd></div>
              <div><dt>Call</dt><dd><a href="tel:1300698248">1300 698 248</a></dd></div>
              <div><dt>Email</dt><dd><a href="mailto:hello@vagus.energy">hello@vagus.energy</a></dd></div>
            </dl>
            <a className="contact-hq__link" href="https://www.google.com/maps/dir/?api=1&destination=139%20Cardigan%20Street%2C%20Carlton%20VIC%203053%2C%20Australia" target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="contact-hq contact-hq--talk" aria-labelledby="contact-talk-title">
        <div className="contact-hq__feature">
          <Image src="/vagus%20images/pexels-trinh-tr-n-191284110-11645013.jpg" alt="" fill sizes="(max-width: 767px) 100vw, 90vw" />
          <div className="contact-hq__feature-copy">
            <p className="contact-hq__kicker">Get started</p>
            <h2 id="contact-talk-title">An engineer will<br />call you back.</h2>
            <p>Not a salesperson. Usually within one business day.</p>
            <ul className="contact-hq__badges">
              <li>No obligation</li>
              <li>Free site assessment</li>
              <li>NETCC Approved Seller</li>
            </ul>
          </div>
        </div>
        <div className="contact-hq__row contact-hq__row--form">
          <div className="contact-hq__copy">
            <h2>A good system starts with a conversation.</h2>
            <p>Tell us about your property and what you want to achieve. Our team will help you work out the next step.</p>
          </div>
          <ContactForm context={context} />
        </div>
      </section>
    </div>
  );
}
