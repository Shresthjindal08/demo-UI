import { surfaceStyles } from "@/lib/styles";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/content/site";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Renewable infrastructure engineering`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      data-surface="light"
      suppressHydrationWarning
      className={`[color-scheme:var(--base-scheme)] [-webkit-text-size-adjust:100%] scroll-smooth [@media(max-width:_1279px)]:[--container-margin:40px] [@media(max-width:_767px)]:[--container-margin:20px] [@media(max-width:_767px)]:[--gutter:16px] motion-reduce:scroll-auto [&_*:focus-visible]:[outline:2px_solid_var(--v-accent)] [&_*:focus-visible]:[outline-offset:3px] [&_*:focus-visible]:rounded-sm selection:bg-accent selection:text-on-accent [&_*]:motion-reduce:[animation-duration:0.01ms]! [&_*]:motion-reduce:[animation-iteration-count:1]! [&_*]:motion-reduce:[transition-duration:0.01ms]! [&_*]:motion-reduce:scroll-auto! [&_*::before]:motion-reduce:[animation-duration:0.01ms]! [&_*::before]:motion-reduce:[animation-iteration-count:1]! [&_*::before]:motion-reduce:[transition-duration:0.01ms]! [&_*::before]:motion-reduce:scroll-auto! [&_*::after]:motion-reduce:[animation-duration:0.01ms]! [&_*::after]:motion-reduce:[animation-iteration-count:1]! [&_*::after]:motion-reduce:[transition-duration:0.01ms]! [&_*::after]:motion-reduce:scroll-auto! ${surfaceStyles} ${jakarta.variable} ${inter.variable} ${plexMono.variable} h-full`}
    >
      <body className="bg-bg text-body font-sans text-[length:var(--text-body)] leading-[var(--leading-body)] antialiased flex min-h-full flex-col overflow-x-clip">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
