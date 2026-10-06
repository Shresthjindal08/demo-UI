import Link from "next/link";
import { routes } from "@/lib/routes";

const stages = [
  { label: "Design", title: ["Engineering-led", "design"], body: "Every system is designed around your building, usage pattern and future needs — no one-size-fits-all approach.", features: ["Site assessment", "Custom system design", "Transparent proposal"] },
  { label: "Execute", title: ["One team,", "end to end"], body: "Our engineers, installers and project managers work together from design through installation and commissioning.", features: ["Dedicated project team", "Professional installation", "Safety & quality checks"] },
  { label: "Optimise", title: ["Measured", "after handover"], body: "We monitor performance and fine-tune the system to keep it working as designed — beyond the initial installation.", features: ["Real-time monitoring", "Performance tuning", "Proactive support"] },
  { label: "Grow", title: ["Built to be", "added to"], body: "Start with what you need today. Add storage, EV charging or more panels as your energy needs grow.", features: ["Modular design", "Add storage or EV charging", "Ready for future upgrades"] },
];

export function HomeHowWeWork() {
  return (
    <section className="method" aria-labelledby="method-title">
      <div className="method__header">
        <div><p className="capabilities__eyebrow">How we work</p><h2 id="method-title">Engineering first.<br />At every stage.</h2></div>
        <p>A clear, structured process from assessment to long-term support — built around real outcomes, not pushy promises.</p>
      </div>
      <ol className="method__cards">
        {stages.map((stage, index) => (
          <li key={stage.label}>
            <div className="method__label"><span>0{index + 1}</span><span>{stage.label}</span></div>
            <h3>{stage.title.join(" ")}</h3>
            <p>{stage.body}</p>
            <ul>{stage.features.map((feature) => <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>)}</ul>
          </li>
        ))}
      </ol>
      <Link className="method__link" href={routes.contact}>Talk to our engineers <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
