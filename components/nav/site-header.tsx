"use client";
import { surfaceStyles } from "@/lib/styles";

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

  return (
    <>
      <a href="#main" className="[color:inherit] no-underline absolute left-4 top-4 z-200 [transform:translateY(-250%)] bg-ink text-bg [padding:10px_16px] text-[length:var(--text-body-sm)] [transition:transform_var(--duration-micro)_var(--ease)] [&:focus-visible]:[transform:translateY(0)]">
        Skip to content
      </a>

      <header
        data-surface="base"
        data-home={pathname === routes.home}
        onPointerOver={(event) => {
          if (event.pointerType === "mouse" && (event.target as Element).closest("nav a, a[href='/'], a[href='/contact']")) {
            clearHoverTimer();
            closePanel();
          }
        }}
        onClick={(event) => {
          if ((event.target as Element).closest("a")) {
            clearHoverTimer();
            closePanel();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closePanel();
        }}
        onMouseLeave={() => {
          clearHoverTimer();
          closePanel();
        }}
        className={`site-header ${surfaceStyles} relative z-100 w-full bg-transparent data-[panel-open=true]:bg-white mb-[calc(-1*var(--nav-height))] shrink-0`}
        data-panel-open={panelOpen}
      >
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-margin)] flex h-[var(--nav-height)] items-center justify-between gap-6">
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
              loading="eager"
              className="h-auto w-[153px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex h-14 items-center gap-9">
              {primaryNav.map((item) =>
                item.hasPanel ? (
                  <li key={item.href}>
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={panelOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        clearHoverTimer();
                        setPanelOpen((value) => !value);
                      }}
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
                      className="flex min-h-11 items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 16 16"
                        className={`size-3 transition-transform duration-150 ease-brand ${panelOpen ? "rotate-180" : "rotate-0"}`}
                        aria-hidden="true"
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
                      className="flex min-h-11 items-center text-[0.95rem] font-medium text-ink transition-colors hover:text-accent"
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
              href={routes.contact}
              onClick={() =>
                track("cta_click", {
                  page: pathname,
                  section: "header",
                  label: "Get a quote",
                })
              }
              onPointerEnter={(event) => {
                const button = event.currentTarget;
                const bounds = button.getBoundingClientRect();
                button.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
                button.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
              }}
              className="group relative isolate hidden min-h-12 items-center gap-4 overflow-hidden rounded-full border border-[var(--palette-green-deep)] px-7 text-sm font-medium text-[var(--palette-forest)] transition-colors duration-250 hover:text-white focus-visible:text-white before:absolute before:inset-0 before:-z-10 before:bg-[var(--palette-green-deep)] before:[clip-path:circle(0%_at_var(--cursor-x,50%)_var(--cursor-y,50%))] before:transition-[clip-path] before:duration-550 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:[clip-path:circle(150%_at_var(--cursor-x,50%)_var(--cursor-y,50%))] focus-visible:before:[clip-path:circle(150%_at_var(--cursor-x,50%)_var(--cursor-y,50%))] motion-reduce:transition-none motion-reduce:before:transition-none sm:inline-flex"
            >
              Get a quote
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-0.5">
                →
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
