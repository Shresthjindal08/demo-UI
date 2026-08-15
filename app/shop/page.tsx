import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { Container, Kicker } from "@/components/ui/primitives";
import { ShopRedirect } from "@/components/shop-redirect";

export const metadata: Metadata = {
  title: "Shop",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  return (
    <div data-surface="dark">
      <section className="section pt-[calc(var(--nav-height)+64px)]">
        <Container>
          <Kicker>Shop</Kicker>
          <h1 className="mt-8 max-w-[16ch] text-display-2">
            You are leaving vagus.energy.
          </h1>
          <p className="measure mt-8 text-lead">
            Our hardware store runs on a separate platform. Your account and checkout live
            there, not here. Nothing about your consultation is affected.
          </p>
          <ShopRedirect url={site.shopUrl} />
        </Container>
      </section>
    </div>
  );
}
