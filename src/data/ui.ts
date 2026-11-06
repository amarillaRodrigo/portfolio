import type { Locale, Localized } from "./types";

/**
 * UI strings. Every label the visitor reads lives here, in both languages.
 * The English is written in its own voice, following the English master CV,
 * not a literal translation of a Spanish page.
 */
export const ui = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    experience: { es: "Experiencia", en: "Experience" },
    projects: { es: "Proyectos", en: "Work" },
    contact: { es: "Contacto", en: "Contact" },
    switchTo: { es: "English", en: "Español" },
    switchLabel: { es: "Cambiar a inglés", en: "Switch to Spanish" },
  },
  hero: {
    role: { es: "Backend Engineer", en: "Backend Engineer" },
    availability: {
      es: "Disponible para nuevas oportunidades",
      en: "Open to new opportunities",
    },
    remoteLine: {
      es: "Remote-first (LATAM + US-East overlap) · Open to relocate to Buenos Aires",
      en: "Remote-first (LATAM + US-East overlap) · Open to relocate to Buenos Aires",
    },
    cta: { es: "Escribirme", en: "Email me" },
    cv: { es: "Descargar CV", en: "Download CV" },
    scroll: { es: "Ver el trabajo", en: "See the work" },
  },
  sections: {
    experience: { es: "Experiencia", en: "Experience" },
    featured: { es: "Proyectos destacados", en: "Featured work" },
    others: { es: "Otros proyectos", en: "Other work" },
    stack: { es: "Stack", en: "Stack" },
    contact: { es: "Contacto", en: "Get in touch" },
    contactIntro: {
      es: "Si tenés una vacante backend o cloud y querés hablar con alguien que ya deploya en producción, escribime.",
      en: "If you have a backend or cloud role open and want to talk to someone who has already shipped to production, email me.",
    },
  },
  labels: {
    role: { es: "Rol", en: "Role" },
    period: { es: "Período", en: "Period" },
    status: { es: "Estado", en: "Status" },
    tech: { es: "Stack", en: "Stack" },
    links: { es: "Enlaces", en: "Links" },
    repo: { es: "Ver el repositorio", en: "View the repository" },
    demo: { es: "Ver la demo", en: "View the live demo" },
    pipeline: { es: "Ver el pipeline", en: "View the pipeline" },
    back: { es: "Volver", en: "Back" },
    caseStudy: { es: "Ver el caso completo", en: "Read the full case study" },
    talk: { es: "Hablemos", en: "Get in touch" },
  },
  case: {
    problem: { es: "Problema", en: "Problem" },
    approach: { es: "Enfoque", en: "Approach" },
    architecture: { es: "Arquitectura", en: "Architecture" },
    result: { es: "Resultado", en: "Result" },
    limits: { es: "Límites conocidos", en: "Known limits" },
    limitsIntro: {
      es: "Lo que quedó afuera, y por qué. Un límite explicado se lee como criterio ante quien evalúa.",
      en: "What was left out, and why. An explained limit reads as judgement to whoever is reviewing.",
    },
  },
  footer: {
    built: { es: "Hecho con Astro + Tailwind.", en: "Built with Astro + Tailwind." },
    location: { es: "Formosa, Argentina", en: "Formosa, Argentina" },
  },
  notFound: {
    title: { es: "Página no encontrada", en: "Page not found" },
    body: {
      es: "Esa dirección no existe. El sitio tiene cinco secciones: inicio, experiencia, proyectos destacados, otros proyectos y contacto.",
      en: "That address does not exist. The site has five sections: home, experience, featured work, other work and contact.",
    },
    cta: { es: "Ir al inicio", en: "Go home" },
  },
} as const satisfies Record<string, Record<string, Localized<unknown>>>;

/** Typed accessor: `t(ui.nav.home, locale)`. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
