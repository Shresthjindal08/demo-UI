"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/routes";

const stages = [
  { label: "Design", title: "Engineering-led design", body: "Every system is designed around your building, usage pattern and future needs — no one-size-fits-all approach.", features: ["Site assessment", "Custom system design", "Transparent proposal"], image: "/hero-solar-homes.png" },
  { label: "Execute", title: "One team, end to end", body: "Our engineers, installers and project managers work together from design through installation and commissioning.", features: ["Dedicated project team", "Professional installation", "Safety & quality checks"], image: "/hero-electrician.jpg" },
  { label: "Optimise", title: "Measured after handover", body: "We monitor performance and fine-tune the system to keep it working as designed — beyond the initial installation.", features: ["Real-time monitoring", "Performance tuning", "Proactive support"], image: "/hero-renewable.png" },
  { label: "Grow", title: "Built to be added to", body: "Start with what you need today. Add storage, EV charging or more panels as your energy needs grow.", features: ["Modular design", "Add storage or EV charging", "Ready for future upgrades"], image: "/vagus%20images/pexels-cristian-rojas-8853536.jpg" },
];

export function HomeHowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = stages[activeIndex];

  function moveStage(direction: number) {
    setActiveIndex((index) => (index + direction + stages.length) % stages.length);
  }

  return (
    <section className="method" aria-labelledby="method-title">
      <div className="method__header">
        <p className="capabilities__eyebrow">Our engineering principles</p>
        <h2 id="method-title">Engineering first.<br />At every stage.</h2>
        <p className="method__summary">Four principles behind every system: considered design, accountable delivery, measured performance and room to grow.</p>
      </div>
      <div className="method__showcase">
        <div className="method__media" aria-hidden="true">
          {stages.map((stage, index) => (
            <div key={stage.label} className={`method__image${index === activeIndex ? " is-active" : ""}`}>
              <Image src={stage.image} alt="" fill sizes="100vw" priority={index === 0} />
            </div>
          ))}
        </div>
        <div className="method__detail" aria-live="polite">
          <p className="method__count">0{activeIndex + 1} / 0{stages.length} — {activeStage.label}</p>
          <h3>{activeStage.title}</h3>
          <p className="method__description">{activeStage.body}</p>
          <ul>{activeStage.features.map((feature) => <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>)}</ul>
          <div className="method__controls">
            <button type="button" onClick={() => moveStage(-1)} aria-label="Previous principle">←</button>
            <button type="button" onClick={() => moveStage(1)} aria-label="Next principle">→</button>
            <Link className="method__link" href={routes.contact}>Request a quote <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <ol className="method__stages">
          {stages.map((stage, index) => (
            <li key={stage.label}>
              <button type="button" className={index === activeIndex ? "is-active" : undefined} aria-current={index === activeIndex} onClick={() => setActiveIndex(index)}>
                <span>0{index + 1}</span>{stage.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
