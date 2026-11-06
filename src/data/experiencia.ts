import type { Localized } from "./types";

/**
 * Work experience.
 *
 * NÓRDICO is not a project: it is paid production work, it has no public
 * repository, and it has no thumbnail. It gets its own file for that reason.
 *
 * Nothing here may leak: no internal URLs, no real endpoints, no client data,
 * no screenshots, no detail of the client's own business rules.
 */
export type Experience = {
  slug: string;
  company: string;
  title: Localized<string>;
  period: string;
  location: Localized<string>;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  tech: string[];
  /** The repository is private. There is deliberately no link. */
  privateRepo: true;
};

export const experiences: Experience[] = [
  {
    slug: "nordico",
    company: "NÓRDICO",
    title: {
      es: "Backend Engineer",
      en: "Backend Engineer",
    },
    period: "2026-07 — 2026-10",
    location: {
      es: "Formosa, Argentina · Remoto",
      en: "Formosa, Argentina · Remote",
    },
    summary: {
      es: "Backend B2B para una empresa de distribución de hielo, en un monorepo de microservicios con un equipo de tres desarrolladores. Los módulos de backend que implementé quedaron desplegados en producción.",
      en: "B2B backend for an ice-distribution company, in a microservices monorepo run by a team of three developers. The backend modules I built were deployed to production.",
    },
    highlights: {
      es: [
        "Microservicio de autenticación en Java 25 y Spring Boot 3.5: login unificado que emite JWT HS256, rotación de refresh token, BCrypt con coste 12, soporte de resource server OAuth2, rate limiting y control de acceso por cinco roles.",
        "Modelé el esquema relacional en PostgreSQL 15 con migraciones versionadas en Flyway.",
        "Desplegué y mantuve APIs de pedidos, equipos, comodatos, visitas con evidencia fotográfica y agendas.",
        "Endurecí la API en producción: mapeé respuestas 4xx que devolvían 500, optimicé el listado de pedidos y corregí un fallo por `lower(bytea)` en PostgreSQL.",
        "Me encargué del camino de despliegue: imágenes Docker multi-stage, healthcheck contra el puerto que asigna la plataforma, CORS por entorno y manifiestos de despliegue.",
        "Adopción de Spec-Driven Development con OpenSpec: cada módulo abre con propuesta, especificación, diseño y desglose de tareas antes de escribir código.",
        "Calidad con TDD estricto: JUnit 5, Mockito, `@WebMvcTest`, tests de integración de seguridad y H2 en la suite.",
        "Documenté la API con OpenAPI 3.1, expuse actualizaciones en tiempo real con WebSocket y guardé la evidencia fotográfica con el AWS SDK v2 sobre almacenamiento S3-compatible.",
      ],
      en: [
        "Built the authentication microservice in Java 25 and Spring Boot 3.5: unified login issuing JWT (HS256), refresh-token rotation, BCrypt at cost 12, OAuth2 resource-server support, rate limiting, and role-based access control across five roles.",
        "Modelled the relational domain in PostgreSQL 15 with versioned Flyway migrations.",
        "Shipped and maintained the APIs for orders, equipment, rentals, visits with photographic evidence, and schedules.",
        "Hardened the live API: mapped 4xx responses that were surfacing as 500, cut the order listing's date filter and closed-history payload, and fixed a listing that crashed on `lower(bytea)` in PostgreSQL.",
        "Owned the deployment path: multi-stage Docker images, healthcheck against the platform-assigned port, per-environment CORS origins, and deployment manifests.",
        "Adopted Spec-Driven Development with OpenSpec: every module opens with a proposal, spec, design and task breakdown before code is written.",
        "Quality through strict TDD: JUnit 5, Mockito, `@WebMvcTest`, security integration tests, and H2 in the suite.",
        "Documented the API with OpenAPI 3.1, exposed realtime updates over WebSocket, and stored photographic evidence through the AWS SDK v2 against S3-compatible storage.",
      ],
    },
    tech: [
      "Java 25",
      "Spring Boot 3.5",
      "Spring Security",
      "PostgreSQL 15",
      "Flyway",
      "JUnit 5",
      "Mockito",
      "OpenAPI 3.1",
      "WebSocket",
      "AWS SDK v2",
      "Docker",
    ],
    privateRepo: true,
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
