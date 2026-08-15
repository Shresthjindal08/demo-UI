"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { megaMenuModel, primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import { site } from "@/lib/content/site";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button";
import { TierBadge } from "@/components/ui/primitives";

const model = megaMenuModel();

export function MobileNav({
  open,
  onClose,
  sheetId,
}: {
  open: boolean;
  onClose: () => void;
  sheetId: string;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={sheetRef}
      id={sheetId}
      data-surface="dark"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain xl:hidden"
    >
      <div className="container-grid pt-[calc(var(--nav-height)+24px)] pb-16">
        <nav aria-label="Primary">
          <ul className="border-t border-hairline">
            {primaryNav
              .filter((item) => !item.hasPanel)
              .map((item) => (
                <li key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.href}
                    onClick={() => {
                      track("nav_click", { surface: "mobile_sheet", label: item.label });
                      onClose();
                    }}
                    className="flex min-h-14 items-center font-display text-display-4 text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <p className="kicker mt-10">What we do</p>
        <ul className="mt-4 border-t border-hairline">
          {model.columns.map((column) => {
            const isOpen = expanded === column.href;
            const panelId = `sheet-${column.href.replace(/\W+/g, "-")}`;

            return (
              <li key={column.href} className="border-b border-hairline">
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href={column.href}
                    onClick={() => {
                      track("category_click", {
                        category: column.name,
                        source_section: "mobile_sheet",
                      });
                      onClose();
                    }}
                    className="flex min-h-14 flex-1 items-center gap-3 text-body-lg text-ink"
                  >
                    <span className="kicker">{column.index}</span>
                    {column.name}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : column.href)}
                    className="grid size-11 shrink-0 place-items-center text-muted"
                  >
                    <span className="sr-only">
                      {isOpen ? "Collapse" : "Expand"} {column.name} solutions
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      className="size-4"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform var(--duration-micro) var(--ease)",
                      }}
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>

                <ul id={panelId} hidden={!isOpen} className="pb-4 pl-8">
                  {column.solutions.map((solution) => (
                    <li key={solution.href}>
                      {solution.status === "live" ? (
                        <Link
                          href={solution.href}
                          onClick={() => {
                            track("nav_click", {
                              surface: "mobile_sheet",
                              category: column.name,
                              solution: solution.name,
                              tier: solution.tier,
                            });
                            onClose();
                          }}
                          className="flex min-h-11 items-center gap-2 text-body-sm text-body"
                        >
                          {solution.name}
                          {solution.tier === "P1" ? <TierBadge tier="P1" /> : null}
                        </Link>
                      ) : (
                        <span className="flex min-h-11 items-center gap-2 text-body-sm text-muted">
                          {solution.name}
                          <span className="mono-fact">soon</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-3">
          <ButtonLink
            href={routes.contact}
            size="lg"
            onClick={() => {
              track("cta_click", { page: "mobile_sheet", label: site.consultationCta });
              onClose();
            }}
          >
            {site.consultationCta}
          </ButtonLink>
          <ButtonLink href={routes.shop} variant="secondary" size="lg" onClick={onClose}>
            Shop ↗
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
