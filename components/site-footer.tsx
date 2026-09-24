import Link from "next/link";
import { footerModel } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";

const model = footerModel();

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto" data-surface="light">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__lead">
            <p>
              Planning a solar, battery, EV or heat-pump project?
              <br />
              Talk to the engineers who design and commission it.
            </p>

            <Link href="/contact" className="site-footer__cta">
              {site.consultationCta} <span>↗</span>
            </Link>

            <div className="site-footer__legal-row">
              <span>© 2026 Vagus Energy — {site.positioning}</span>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Footer links">
            <ul>
              {model.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-footer__nav-item">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <p>Connect</p>
            <address>
              Melbourne
              <br />
              Victoria, Australia
            </address>

            <div className="site-footer__socials" aria-label="Social media links">
              <Link href="https://www.facebook.com" aria-label="Facebook" className="site-footer__social">
                f
              </Link>
              <Link href="https://www.instagram.com" aria-label="Instagram" className="site-footer__social">
                ◌
              </Link>
              <Link href="https://www.tiktok.com" aria-label="TikTok" className="site-footer__social">
                t
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.accreditations.map((item) => (
              <li key={item.label} className="mono-fact">
                {item.label}
              </li>
            ))}
          </ul>
          {site.abn && !site.abn.startsWith("[") ? (
            <span className="mono-fact">ABN {site.abn}</span>
          ) : null}
        </div>

        <p className="measure mt-10 text-body-sm text-muted">
          {site.acknowledgement}
        </p>

        <div className="site-footer__wordmark" aria-label="Vagus logo text">
          VAGUS
        </div>
      </div>
    </footer>
  );
}
