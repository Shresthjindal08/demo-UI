import Link from "next/link";
import { footerModel } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";

const model = footerModel();
const letterImages = ["/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg", "/vagus%20images/pexels-andersen-ev-1587213396-27355838.jpg", "/vagus%20images/pexels-04iraq-1272398525-35736783.jpg", "/vagus%20images/pexels-quang-nguyen-vinh-222549-35105432.jpg", "/vagus%20images/pexels-elite-power-group-661996115-39057093.jpg"];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__invitation">
          <p className="site-footer__label">Let’s build together</p>
          <h2>Planning a solar, battery, EV<br className="hidden xl:block" /> or heat-pump project?</h2>
          <p className="site-footer__lead">Talk to the engineers who design<br className="hidden xl:block" /> and commission it.</p>
          <Link href={routes.contact} className="site-footer__cta">{site.consultationCta}<span aria-hidden="true">→</span></Link>
        </div>
        <nav aria-label="Footer links">
          <ul>{model.company.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </nav>
        <div className="site-footer__connect">
          <p className="site-footer__label">Connect</p>
          <address>Melbourne<br />Victoria, Australia</address>
          <div className="site-footer__socials" aria-label="Social media links">
            <a href="https://www.facebook.com" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <ul className="site-footer__accreditations">{site.accreditations.map((item) => <li key={item.label}>{item.label}</li>)}</ul>
        <div className="site-footer__legal">
          <p>© 2026 Vagus Energy<br />{site.positioning}</p>
          <Link href="/privacy">Privacy Policy</Link>
          {site.abn && !site.abn.startsWith("[") ? <p>ABN {site.abn}</p> : null}
        </div>
        <p className="site-footer__acknowledgement">{site.acknowledgement}</p>
        <div className="site-footer__wordmark" aria-label="Vagus">
          {"VAGUS".split("").map((letter, index) => <span key={letter} style={{ backgroundImage: `url("${letterImages[index]}")` }} aria-hidden="true">{letter}</span>)}
        </div>
      </div>
      <svg className="site-footer__wave" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M-50 0C100 70 160 190 330 115S560 70 710 120S990 40 1100 105S1360 90 1490 40" stroke="#a6bba3" strokeWidth="1" /><circle cx="150" cy="114" r="4" fill="#728a65" /></svg>
    </footer>
  );
}
