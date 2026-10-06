import { surfaceStyles } from "@/lib/styles";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Container, Kicker } from "@/components/ui/primitives";

const recovery = [
  { label: "What we do →", href: routes.whatWeDo },
  { label: "View projects →", href: routes.projects },
  { label: "Go to homepage →", href: routes.home },
  { label: "Search the library →", href: routes.resources },
];

export default function NotFound() {
  return (
    <div data-surface="dark" className={`${surfaceStyles} interior-page`}>
      <section className="py-section pt-[calc(var(--nav-height)+64px)]">
        <Container>
          <Kicker>404</Kicker>
          <h1 className="[:where(&)]:text-ink [:where(&)]:font-display [:where(&)]:font-bold [:where(&)]:tracking-[var(--tracking-display)] [:where(&)]:leading-[var(--leading-heading)] [:where(&)]:text-balance mt-8 max-w-[16ch] text-display-2">
            This page is not where it was.
          </h1>
          <p className="text-pretty max-w-[min(var(--measure),_var(--measure-px))] mt-8 text-lead">
            The address is either out of date or slightly wrong. These four routes cover
            almost everything people are looking for.
          </p>
          <ul className="mt-16 border-t border-hairline">
            {recovery.map((item) => (
              <li key={item.href} className="border-b border-hairline">
                <Link
                  href={item.href}
                  className="flex min-h-16 items-center text-body-lg text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
