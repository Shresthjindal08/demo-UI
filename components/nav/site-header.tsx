"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import { site } from "@/lib/content/site";
import { heroSurface } from "@/lib/nav-surface";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

const FROST_AT = 80;
const HIDE_AFTER = 600;
const HOVER_INTENT = 150;

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const sheetId = useId();

  const [frosted, setFrosted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setPanelOpen(false);
    setSheetOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setFrosted(y > FROST_AT);

      const scrollingDown = y > lastScrollY.current;
      setHidden(scrollingDown && y > HIDE_AFTER);
      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const surface = sheetOpen || panelOpen ? "base" : heroSurface();
  const isTransparent = !frosted && !panelOpen && !sheetOpen;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header
        data-surface={surface}
        onMouseLeave={() => {
          clearHoverTimer();
          closePanel();
        }}
        className="fixed inset-x-0 top-0 z-[100]"
        style={{
          transform: hidden && !panelOpen && !sheetOpen ? "translateY(-100%)" : "none",
          transition: `transform var(--duration-base) var(--ease), background-color var(--duration-base) var(--ease)`,
          backgroundColor: isTransparent ? "transparent" : "var(--v-nav-fill)",
          backdropFilter: isTransparent ? "none" : "saturate(180%) blur(20px)",
          WebkitBackdropFilter: isTransparent ? "none" : "saturate(180%) blur(20px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid var(--v-hairline)",
        }}
      >
        <div
          className="container-grid flex items-center justify-between gap-6"
          style={{
            height: frosted ? "var(--nav-height-scrolled)" : "var(--nav-height)",
            transition: "height var(--duration-base) var(--ease)",
          }}
        >
          <Link
            href={routes.home}
            className="wordmark text-body-lg"
            onClick={() => track("nav_click", { surface: "header", label: "wordmark" })}
          >
            {site.wordmark}
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-8">
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
                      className="flex min-h-11 items-center gap-1.5 text-body-sm text-ink"
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
                      className="flex min-h-11 items-center text-body-sm text-ink transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={routes.shop}
              className="hidden min-h-11 items-center text-body-sm text-muted transition-colors hover:text-ink xl:flex"
            >
              Shop ↗
            </Link>
            <ThemeToggle />
            <span className="hidden xl:block">
              <ButtonLink
                href={routes.contact}
                onClick={() =>
                  track("cta_click", {
                    page: pathname,
                    section: "header",
                    label: site.consultationCta,
                  })
                }
              >
                {site.consultationCta}
              </ButtonLink>
            </span>

            <button
              type="button"
              aria-expanded={sheetOpen}
              aria-controls={sheetId}
              onClick={() => setSheetOpen((value) => !value)}
              className="grid size-11 place-items-center text-ink xl:hidden"
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
