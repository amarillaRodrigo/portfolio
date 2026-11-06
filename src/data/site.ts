import type { Locale } from "./types";

export const site = {
  name: "Rodrigo Amarilla",
  domain: "https://rodrigoamarilla.tech",
  email: "amarillarodrigo14@gmail.com",
  phone: "+54 9 370 4516054",
  linkedin: "https://www.linkedin.com/in/rodrigoamarilla/",
  github: "https://github.com/amarillaRodrigo",
  location: "Formosa, Argentina",
  /** The availability line. True since the NÓRDICO engagement ended 2026-10-31. */
  available: true,
} as const;

/**
 * Stack line, one per entry. Order is the reading order on the page.
 */
export const stack: { label: string; value: string }[] = [
  { label: "Lenguajes", value: "Java 25 · TypeScript · Python" },
  { label: "Frameworks", value: "Spring Boot · Node.js · FastAPI" },
  { label: "Datos", value: "PostgreSQL · Redis · MongoDB" },
  { label: "Cloud", value: "AWS · Kubernetes · Terraform" },
  { label: "Entrega", value: "Docker · GitHub Actions · OpenAPI" },
];

export const stackGroups: { label: string; items: string[] }[] = [
  {
    label: "Backend",
    items: [
      "Java 25",
      "Spring Boot 3.5",
      "Spring Security",
      "Node.js",
      "TypeScript",
      "NestJS",
      "Fastify",
      "Express",
      "FastAPI",
      "REST APIs",
      "OpenAPI 3.1",
      "WebSocket",
    ],
  },
  {
    label: "Cloud e infraestructura",
    items: [
      "AWS (EC2, EKS, IAM, ECR)",
      "Secrets Manager",
      "SSM",
      "CloudWatch",
      "X-Ray",
      "CloudTrail",
      "AWS Config",
      "Kubernetes",
      "k3s",
      "Terraform",
      "Docker",
      "Ansible",
      "Nginx",
    ],
  },
  {
    label: "Datos",
    items: [
      "PostgreSQL 15/16",
      "MySQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Flyway",
      "SQLAlchemy",
      "Supabase",
    ],
  },
  {
    label: "Calidad y herramientas",
    items: [
      "TDD (JUnit 5, Mockito, pytest)",
      "CodeQL",
      "gitleaks",
      "GitHub OIDC",
      "OpenTelemetry",
      "ADOT Collector",
      "OpenSpec",
      "Git",
      "Linux",
    ],
  },
];

/**
 * The email CTA. A `mailto:` with a prefilled subject and body, which is the
 * site's primary action.
 */
export function mailtoHref(locale: Locale): string {
  const subject =
    locale === "es"
      ? "Consulta sobre puesto Backend Engineer"
      : "Backend Engineer role — enquiry";
  const body =
    locale === "es"
      ? "Hola Rodrigo,\n\nVi tu portfolio y me interesa tu experiencia como Backend Engineer con foco en cloud.\n\nContexto de la búsqueda:\n\n[Empresa / puesto]\n\n[Qué te interesa de su stack o del proyecto]\n\nGracias,\n[Tu nombre]"
      : "Hi Rodrigo,\n\nI came across your portfolio and I'm interested in your backend and cloud engineering experience.\n\nContext for the role:\n\n[Company / role]\n\n[What caught your eye in their stack or the project]\n\nThanks,\n[Your name]";

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The CV button serves the PDF of the active language.
 */
export const cvPath: Record<Locale, string> = {
  es: "/cv/rodrigo-amarilla-cv-es.pdf",
  en: "/cv/rodrigo-amarilla-cv-en.pdf",
};
