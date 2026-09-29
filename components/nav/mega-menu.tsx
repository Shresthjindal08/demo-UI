"use client";
import { surfaceStyles } from "@/lib/styles";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { megaMenuModel } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import { track } from "@/lib/analytics";
import { TierBadge } from "@/components/ui/primitives";

const model = megaMenuModel();

export function MegaMenu({
  open,
  onClose,
  panelId,
}: {
  open: boolean;
  onClose: () => void;
  panelId: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

      const headings = panelRef.current?.querySelectorAll<HTMLAnchorElement>(
        "[data-column-head]",
      );
      if (!headings?.length) return;

      const current = document.activeElement;
      const index = Array.from(headings).findIndex((node) => node === current);
      if (index === -1) return;

      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? (index + 1) % headings.length
          : (index - 1 + headings.length) % headings.length;
      headings[next].focus();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth < 1280) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const linkClick = (category: string, solution: string | null, tier: string | null) =>
    track("nav_click", { surface: "mega_menu", category, solution, tier });

  return (
    <div
      ref={panelRef}
      id={panelId}
      data-surface="base"
      hidden={!open}
      className={`${surfaceStyles} absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-height))] overflow-y-auto overscroll-contain hidden shadow-menu xl:block transition-[opacity,visibility] duration-400 ease-brand motion-reduce:transition-none data-[open=true]:visible data-[open=true]:opacity-100 data-[open=false]:invisible data-[open=false]:opacity-0`}
      data-open={open}
    >
      <div className="min-h-full flex flex-col border-t border-hairline">
        <div className="flex flex-1 flex-col w-full mx-auto px-[var(--container-margin)] py-6 2xl:py-8">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-hairline px-5 text-base font-medium text-ink transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Close menu <span aria-hidden="true" className="text-xl">×</span>
            </button>
          </div>
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(240px,0.95fr)] gap-6 2xl:gap-10">
            {model.columns.map((column) => (
              <div key={column.href}>
                <Link
                  href={column.href}
                  data-column-head
                  onClick={() => linkClick(column.name, null, null)}
                  className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                >
                  <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted block">{column.index}</span>
                  <span className="mt-3 block font-display text-[clamp(1.5rem,1.8vw,2.25rem)] leading-tight text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent">
                    {column.name}
                  </span>
                </Link>
                <ul className="mt-7 space-y-2">
                  {column.solutions.map((solution) => (
                    <li key={solution.href}>
                      {solution.status === "live" ? (
                        <Link
                          href={solution.href}
                          onClick={() =>
                            linkClick(column.name, solution.name, solution.tier)
                          }
                          className="group flex min-h-14 items-center gap-2 rounded-lg px-3 -mx-3 text-[clamp(1.0625rem,1.15vw,1.375rem)] font-medium leading-snug text-ink transition-[background-color,color,transform] duration-200 hover:bg-accent/10 hover:text-accent hover:translate-x-1 focus-visible:bg-accent/10 focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                        >
                          {solution.name}
                          {solution.tier === "P1" ? <TierBadge tier="P1" /> : null}
                          <span aria-hidden="true" className="ml-auto text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">↗</span>
                        </Link>
                      ) : (
                        <span className="flex min-h-14 items-center gap-2 text-[1.0625rem] text-muted">
                          {solution.name}
                          <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted">soon</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="border-l border-hairline pl-6">
              <p className="text-pretty font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">Most requested</p>
              <ul className="mt-5 space-y-3">
                {model.pinned.map((solution) => (
                  <li key={solution.href}>
                    <Link
                      href={solution.href}
                      onClick={() => {
                        track("popular_solution_click", {
                          solution: solution.name,
                          position: "mega_menu",
                          tier: solution.tier,
                        });
                      }}
                      className="block rounded-xl border border-hairline p-5 transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:bg-accent/10 hover:-translate-y-1 focus-visible:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="block text-lg font-medium text-ink">
                        {solution.name}
                      </span>
                      {solution.spec ? (
                        <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-1 block">{solution.spec}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              {model.featured ? (
                <Link
                  href={routes.project(model.featured.slug)}
                  onClick={() => linkClick("featured_project", model.featured.slug, null)}
                  className="mt-6 block rounded-lg border-t border-hairline pt-5 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">Featured project</span>
                  <span className="mt-2 block text-lg font-medium text-ink">
                    {model.featured.name}
                  </span>
                  <span className="font-mono text-[length:var(--text-caption)] tracking-[0.04em] text-muted mt-1 block">
                    {model.featured.metrics
                      .map((metric) => `${metric.value} ${metric.label}`)
                      .join(" · ")}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-auto pt-10">
            <Link
              href={routes.whatWeDo}
              onClick={() => linkClick("all", null, null)}
              className="inline-flex min-h-14 items-center rounded-full border border-accent px-7 text-lg font-medium text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See everything we do →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
