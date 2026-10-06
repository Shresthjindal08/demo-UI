import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

const reasons = [
  { title: "Engineered together", body: "Solar, storage and charging designed to work as one connected system." },
  { title: "One accountable team", body: "Engineers, installers and project managers working from design to commissioning." },
  { title: "Support beyond installation", body: "Performance monitoring and ongoing care to keep your system working as designed." },
];

export function HomeWhyChooseUs() {
  return (
    <section className="why-vagus" aria-labelledby="why-vagus-title">
      <Image src="/vagus%20images/pexels-cristian-rojas-8853536.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="why-vagus__header">
        <div><p>Why choose Vagus</p><h2 id="why-vagus-title">Built for performance.<br />Designed around you.</h2></div>
        <Link href={routes.contact}>Work with us <span aria-hidden="true">↗</span></Link>
      </div>
      <ol className="why-vagus__reasons">{reasons.map((reason, index) => <li key={reason.title}><span>0{index + 1}</span><h3>{reason.title}</h3><p>{reason.body}</p></li>)}</ol>
    </section>
  );
}
