import { surfaceStyles } from "@/lib/styles";
import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { PageMasthead } from "@/components/ui/page-masthead";
import { ShopRedirect } from "@/components/shop-redirect";

export const metadata: Metadata = {
  title: "Shop",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  return (
    <div data-surface="dark" className={`${surfaceStyles}`}>
      <PageMasthead
        kicker="Shop"
        title="You are leaving vagus.energy."
        lead="Our hardware store runs on a separate platform. Your account and checkout live there, not here. Nothing about your consultation is affected."
        index="08 / Hardware"
        imageLabel="Battery Storage"
      >
        <ShopRedirect url={site.shopUrl} />
      </PageMasthead>
    </div>
  );
}
