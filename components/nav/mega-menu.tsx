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

    const onScroll = () => onClose();

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
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
      className={`${surfaceStyles} absolute inset-x-0 top-full hidden shadow-menu xl:block transition-[opacity,visibility] duration-400 ease-brand data-[open=true]:visible data-[open=true]:opacity-100 data-[open=false]:invisible data-[open=false]:opacity-0`}
      data-open={open}
    >
      <div className="[border-top:1px_solid_var(--v-hairline)] border-t">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)] py-10">
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_320px] gap-6">
            {model.columns.map((column) => (
              <div key={column.href}>
                <Link
                  href={column.href}
                  data-column-head
                  onClick={() => linkClick(column.name, null, null)}
                  className="group block"
                >
                  <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted block">{column.index}</span>
                  <span className="mt-2 block font-display text-[1.375rem] text-ink group-hover:text-accent">
                    {column.name}
                  </span>
                </Link>
                <ul className="mt-5 space-y-1">
                  {column.solutions.map((solution) => (
                    <li key={solution.href}>
                      {solution.status === "live" ? (
                        <Link
                          href={solution.href}
                          onClick={() =>
                            linkClick(column.name, solution.name, solution.tier)
                          }
                          className="flex min-h-11 items-center gap-2 text-body-sm text-body transition-colors hover:text-ink"
                        >
                          {solution.name}
                          {solution.tier === "P1" ? <TierBadge tier="P1" /> : null}
                        </Link>
                      ) : (
                        <span className="flex min-h-11 items-center gap-2 text-body-sm text-muted">
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
                      className="block border border-hairline p-4 transition-colors hover:border-accent"
                    >
                      <span className="block text-body-sm text-ink">
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
                  className="mt-6 block border-t border-hairline pt-4"
                >
                  <span className="font-mono text-[length:var(--text-kicker)] leading-[1.2] tracking-[var(--tracking-kicker)] uppercase text-muted">Featured project</span>
                  <span className="mt-2 block text-body-sm text-ink">
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

          <div className="mt-10 border-t border-hairline pt-6">
            <Link
              href={routes.whatWeDo}
              onClick={() => linkClick("all", null, null)}
              className="text-body-sm text-accent"
            >
              See everything we do →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
