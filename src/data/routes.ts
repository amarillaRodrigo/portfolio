import { LOCALES, type Locale } from "./types";

/**
 * Every route the site publishes, in both languages.
 *
 * The locale switcher has to preserve the current route, so the path a visitor
 * is on must exist in the other language too. This table is the single source
 * of truth for that: `routeFor` maps a route key to the path for a locale, and
 * `matchRoute` maps a path back to its key.
 */
export const routes = {
  home: { es: "/", en: "/" },
  contacto: { es: "/contacto/", en: "/contact/" },
  experiencia: { es: "/experiencia/", en: "/experience/" },
  proyectos: { es: "/proyectos/", en: "/work/" },
} as const;

export type RouteKey = keyof typeof routes;

export function routeFor(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/**
 * The path of a project detail page in a locale.
 */
export function projectRouteFor(slug: string, locale: Locale): string {
  return locale === "es" ? `/proyectos/${slug}/` : `/work/${slug}/`;
}

/**
 * The equivalent of the current path in the other locale.
 *
 * This is what makes the switcher a single click that keeps the visitor on the
 * same page instead of dumping them on the home page.
 */
export function alternatePath(pathname: string, locale: Locale): string {
  const path = pathname.replace(/^\/(es|en)/, "") || "/";
  const other: Locale = locale === "es" ? "en" : "es";

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][locale] === path) {
      return `/${other}${routes[key][other]}`;
    }
  }

  // A project detail page: /proyectos/<slug>/ or /work/<slug>/
  const match = path.match(/^\/(proyectos|work)\/([^/]+)\/$/);
  if (match) {
    const slug = match[2];
    return `/${other}${projectRouteFor(slug, other)}`;
  }

  return `/${other}/`;
}

/**
 * The routes the static build has to generate, with the metadata each page
 * needs to pick its template.
 */
export type PageRoute = {
  locale: Locale;
  /** The path after the locale prefix. */
  path: string;
  kind: "home" | "contacto" | "experiencia" | "proyectos" | "proyecto";
  slug?: string;
};

export function allRoutes(projectSlugs: string[]): PageRoute[] {
  const out: PageRoute[] = [];

  for (const locale of LOCALES) {
    out.push({ locale, path: routes.home[locale], kind: "home" });
    out.push({ locale, path: routes.contacto[locale], kind: "contacto" });
    out.push({ locale, path: routes.experiencia[locale], kind: "experiencia" });
    out.push({ locale, path: routes.proyectos[locale], kind: "proyectos" });
    for (const slug of projectSlugs) {
      out.push({
        locale,
        path: projectRouteFor(slug, locale).replace(/^\//, "").replace(/\/$/, ""),
        kind: "proyecto",
        slug,
      });
    }
  }

  return out;
}
