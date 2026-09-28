"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import { site } from "@/lib/content/site";
import { track } from "@/lib/analytics";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

const HOVER_INTENT = 150;

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const sheetId = useId();

  const [panelOpen, setPanelOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setPanelOpen(false);
    setSheetOpen(false);
  }

  const closePanel = useCallback(
    (returnFocus = false) => {
      setPanelOpen(false);
      if (returnFocus) triggerRef.current?.focus();
    },
    [],
  );

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  useEffect(() => clearHoverTimer, []);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 40);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header
        data-surface="base"
        onMouseLeave={() => {
          clearHoverTimer();
          closePanel();
        }}
        className="site-nav sticky top-0 z-[100] mb-[calc(-1*var(--nav-height))] shrink-0"
        data-scrolled={scrolled}
      >
        <div className="container-grid flex h-[var(--nav-height)] items-center justify-between gap-6">
          <Link
            href={routes.home}
            className="flex shrink-0 items-center"
            onClick={() => track("nav_click", { surface: "header", label: "wordmark" })}
          >
            <Image
              src="/logo-text-transparent.png"
              alt={site.name}
              width={153}
              height={47}
              className="h-auto w-[153px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex h-14 items-center gap-7">
              {primaryNav.map((item) =>
                item.hasPanel ? (
                  <li key={item.href}>
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={panelOpen}
                      aria-controls={panelId}
                      onClick={() => setPanelOpen((value) => !value)}
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "mouse") return;
                        clearHoverTimer();
                        hoverTimer.current = setTimeout(
                          () => setPanelOpen(true),
                          HOVER_INTENT,
                        );
                      }}
                      onPointerLeave={clearHoverTimer}
                      onKeyDown={(event) => {
                        if (event.key === "Escape" && panelOpen) {
                          event.preventDefault();
                          closePanel(true);
                        }
                      }}
                      className="flex min-h-11 items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3"
                        aria-hidden="true"
                        style={{
                          transform: panelOpen ? "rotate(180deg)" : "none",
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
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() =>
                        track("nav_click", { surface: "header", label: item.label })
                      }
                      className="flex min-h-11 items-center text-[0.7rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href={routes.shop}
              className="hidden min-h-11 items-center text-[0.7rem] uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent xl:flex"
            >
              Shop ↗
            </Link>
            <Link
              href={routes.contact}
              onClick={() =>
                track("cta_click", {
                  page: pathname,
                  section: "header",
                  label: site.consultationCta,
                })
              }
              className="group hidden min-h-11 items-center gap-4 rounded-md bg-[var(--v-accent)] px-5 text-[0.75rem] font-medium text-[var(--v-on-accent)] transition-colors hover:bg-[var(--v-accent-hover)] xl:inline-flex"
            >
              Start an energy consultation
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={sheetOpen}
              aria-controls={sheetId}
              onClick={() => setSheetOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-md border border-hairline text-ink xl:hidden"
            >
              <span className="sr-only">{sheetOpen ? "Close menu" : "Open menu"}</span>
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                {sheetOpen ? (
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                ) : (
                  <path
                    d="M3 7h18M3 17h18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <MegaMenu open={panelOpen} onClose={() => closePanel(true)} panelId={panelId} />
      </header>

      <MobileNav
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sheetId={sheetId}
      />
    </>
  );
}
