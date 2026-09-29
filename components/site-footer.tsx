import { surfaceStyles } from "@/lib/styles";
import Link from "next/link";
import { footerModel } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";

const model = footerModel();

export function SiteFooter() {
  return (
    <footer className={`${surfaceStyles} bg-bg text-ink [border-top:1px_solid_var(--v-hairline)] mt-auto`} data-surface="light">
      <div className="max-w-420 [margin:0_auto] px-5 pt-9 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.8fr)_minmax(0,_0.8fr)_minmax(0,_0.9fr)] gap-12 items-start pt-4">
          <div className="max-w-152 [&_p]:m-0 [&_p]:text-ink [&_p]:text-[clamp(2.15rem,_2.2vw,_3.2rem)] [&_p]:leading-[1.08] [&_p]:tracking-[-0.05em] [&_p]:font-medium">
            <p className="text-pretty">
              Planning a solar, battery, EV or heat-pump project?
              <br />
              Talk to the engineers who design and commission it.
            </p>

            <Link href="/contact" className="inline-flex items-center gap-[0.65rem] mt-8 [padding:0.8rem_1.2rem_0.9rem] [border:1px_solid_var(--v-hairline-strong)] rounded-[0.75rem] bg-transparent text-ink text-[1.1rem] font-medium [transition:border-color_var(--duration-micro)_var(--ease),_background-color_var(--duration-micro)_var(--ease)] [&:hover]:[background:color-mix(in_srgb,_var(--v-accent)_10%,_transparent)] [&:hover]:[border-color:var(--v-accent)] [&_span]:text-[1.3rem] [&_span]:leading-none">
              {site.consultationCta} <span>↗</span>
            </Link>

            <div className="flex flex-wrap items-center gap-6 mt-12 text-muted text-[0.92rem] [&_a]:text-body [&_a]:no-underline">
              <span>© 2026 Vagus Energy — {site.positioning}</span>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>

          <nav className="pt-[0.2rem] [&_ul]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:grid [&_ul]:gap-[0.3rem]" aria-label="Footer links">
            <ul>
              {model.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink text-[clamp(1.15rem,_1.5vw,_1.9rem)] leading-[1.4] tracking-[-0.04em] no-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-[0.2rem] [&_p]:m-0 [&_p]:text-ink [&_p]:text-[clamp(1.9rem,_2vw,_2.5rem)] [&_p]:leading-[1.1] [&_p]:tracking-[-0.05em] [&_address]:mt-[0.9rem] [&_address]:text-body [&_address]:not-italic [&_address]:text-[1.08rem] [&_address]:leading-[1.5]">
            <p className="text-pretty">Connect</p>
            <address>
              Melbourne
              <br />
              Victoria, Australia
            </address>

            <div className="flex gap-[0.8rem] mt-[1.2rem]" aria-label="Social media links">
              <Link href="https://www.facebook.com" aria-label="Facebook" className="inline-flex items-center justify-center w-10 h-10 rounded-[999px] bg-tint text-ink text-[1.15rem] font-semibold no-underline [border:1px_solid_var(--v-hairline)]">
                f
              </Link>
              <Link href="https://www.instagram.com" aria-label="Instagram" className="inline-flex items-center justify-center w-10 h-10 rounded-[999px] bg-tint text-ink text-[1.15rem] font-semibold no-underline [border:1px_solid_var(--v-hairline)]">
                ◌
              </Link>
              <Link href="https://www.tiktok.com" aria-label="TikTok" className="inline-flex items-center justify-center w-10 h-10 rounded-[999px] bg-tint text-ink text-[1.15rem] font-semibold no-underline [border:1px_solid_var(--v-hairline)]">
                t
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.accreditations.map((item) => (
              <li key={item.label} className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">
                {item.label}
              </li>
            ))}
          </ul>
          {site.abn && !site.abn.startsWith("[") ? (
            <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">ABN {site.abn}</span>
          ) : null}
        </div>

        <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-10 text-body-sm text-muted">
          {site.acknowledgement}
        </p>

        <div className="overflow-hidden mt-4 [padding:1rem_0_0] [color:color-mix(in_srgb,_var(--v-ink)_14%,_transparent)] font-sans text-[clamp(8rem,_24vw,_30rem)] leading-[0.74] font-extrabold tracking-[-0.07em] uppercase text-center whitespace-nowrap" aria-label="Vagus logo text">
          VAGUS
        </div>
      </div>
    </footer>
  );
}
