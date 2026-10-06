import Link from "next/link";
import { routes } from "@/lib/routes";

const steps = [
  { title: "Enquiry", body: "Tell us about your energy needs and goals." },
  { title: "Site assessment", body: "We evaluate your site for maximum potential." },
  { title: "Engineered design", body: "Custom designs for optimal performance and savings." },
  { title: "Approvals", body: "We manage all regulatory approvals for you." },
  { title: "Installation", body: "Professional, efficient and on-time installation." },
  { title: "Switch-on and monitoring", body: "We get you live and keep your system performing." },
];

export function HomeJourney() {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey__intro">
        <p className="capabilities__eyebrow">The journey</p>
        <h2 id="journey-title">Six steps.<br />One team.</h2>
        <p>From your first enquiry to long-term monitoring, we handle every step in-house — ensuring a reliable and transparent experience.</p>
        <Link href={routes.contact} className="capabilities__cta">Start your project <span aria-hidden="true">↗</span></Link>
      </div>
      <ol className="journey__steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="journey__number">0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.body}</p></div>
            <span className="journey__marker" aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
