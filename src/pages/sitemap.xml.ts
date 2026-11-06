import type { APIRoute } from "astro";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { routes, projectRouteFor } from "../data/routes";
import { LOCALES } from "../data/types";

/**
 * The sitemap. Every page in every language, because the site is a
 * multi-page site in two languages and the crawler should see all of it.
 */
export const GET: APIRoute = () => {
  const paths: string[] = [];

  for (const locale of LOCALES) {
    paths.push(`/${locale}/`);
    paths.push(`/${locale}${routes.contacto[locale]}`);
    paths.push(`/${locale}${routes.experiencia[locale]}`);
    paths.push(`/${locale}${routes.proyectos[locale]}`);
    for (const project of projects) {
      paths.push(`/${locale}${projectRouteFor(project.slug, locale)}`);
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${site.domain}${p}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
