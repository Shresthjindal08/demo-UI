import { demo } from "@/lib/content/demo";
import { site } from "@/lib/content/site";
import { routes } from "@/lib/routes";

export const dynamic = "force-static";

export function GET() {
  const content = [
    `# ${site.name} — UI demo`,
    `> ${demo.description}`,
    `## Demo context\n\n- [${demo.title}](${site.url}${routes.demoInfo}): Purpose, simulated functionality and content limitations.`,
    ...demo.sections.map((section) => `## ${section.title}\n\n${section.body}`),
    `## Website pages\n\n- [Homepage](${site.url})\n- [Services](${site.url}${routes.whatWeDo})\n- [Sitemap](${site.url}/sitemap.xml)`,
  ].join("\n\n");

  return new Response(`${content}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
