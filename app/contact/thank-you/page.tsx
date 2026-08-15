import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Container, Kicker } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Received",
  robots: { index: false, follow: false },
};

const onward = [
  { label: "View recent projects →", href: routes.projects },
  { label: "How a system is designed →", href: routes.resources },
  { label: "What we do →", href: routes.whatWeDo },
];

export default function ThankYouPage() {
  return (
    <div data-surface="cream">
      <section className="section pt-[calc(var(--nav-height)+64px)]">
        <Container>
          <Kicker>Received</Kicker>
          <h1 className="mt-8 max-w-[16ch] text-display-2">
            An engineer has your details.
          </h1>
          <p className="measure mt-8 text-lead">
            One of our engineers reviews every enquiry personally and will call you back,
            usually within one business day. Not a salesperson.
          </p>

          <div className="mt-16 border-t border-hairline pt-10">
            <p className="kicker">While you wait</p>
            <ul className="mt-6 space-y-1">
              {onward.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-body-lg text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
