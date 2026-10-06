import Link from "next/link";
import { footerModel } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";

const model = footerModel();

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__invitation">
        <div><p className="site-footer__label">Let’s build together</p><h2>Smarter energy.<br />Starts with a conversation.</h2></div>
        <Link href={routes.contact} className="site-footer__cta">{site.consultationCta}<span aria-hidden="true">↗</span></Link>
      </div>
      <div className="site-footer__top">
        <div className="site-footer__brand"><Link href={routes.home} aria-label="Vagus Energy home">VAGUS<span>ENERGY</span></Link><p>{site.positioning}</p></div>
        <nav aria-label="Footer links"><p className="site-footer__label">Explore</p><ul>{model.company.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <div className="site-footer__connect"><p className="site-footer__label">Find us</p><address>139 Cardigan Street<br />Carlton VIC 3053<br />Melbourne, Australia</address><a href="mailto:hello@vagus.energy">hello@vagus.energy ↗</a><a href="tel:1300698248">1300 698 248</a></div>
      </div>
      <ul className="site-footer__accreditations">{site.accreditations.map((item) => <li key={item.label}>{item.label}</li>)}</ul>
      <div className="site-footer__bottom"><p>© 2026 Vagus Energy</p><p className="site-footer__acknowledgement">{site.acknowledgement}</p><Link href="/privacy">Privacy Policy</Link></div>
    </footer>
  );
}
