import Link from "next/link";
import { footerModel } from "@/lib/content/navigation";

const model = footerModel();

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto" data-surface="dark">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__lead">
            <p>
              See how we can help your business grow.
              <br />
              Get in touch today.
            </p>

            <Link href="/contact" className="site-footer__cta">
              Let&apos;s Talk <span>↗</span>
            </Link>

            <div className="site-footer__legal-row">
              <span>© 2026 Vagus Energy · Digital Infrastructure Agency</span>
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
              123 Energy Lane
              <br />
              Melbourne, VIC 3000
              <br />
              Australia
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

        <div className="site-footer__wordmark" aria-label="Vagus logo text">
          VAGUS
        </div>
      </div>
    </footer>
  );
}
