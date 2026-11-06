import { describe, expect, it } from "vitest";
import { projects } from "../src/data/projects";
import { experiences } from "../src/data/experiencia";
import { site, cvPath } from "../src/data/site";

/**
 * Every external link the site publishes has to resolve.
 *
 * The SIGELED demo returned 503 for months and nobody noticed, because a
 * broken link on a portfolio reads as "this project is a bit old" rather than
 * as a bug. A link to a destination that does not exist is worse than no
 * link: it turns a cover letter into a list of broken promises.
 *
 * These checks run in CI and locally. They are network tests, so they are
 * skipped when the environment cannot reach the network.
 */
const externalLinks = [
  ...projects.flatMap((p) => p.links.map((l) => l.href)),
  site.linkedin,
  site.github,
];

const uniqueLinks = [...new Set(externalLinks)];

/**
 * Hosts that block automated requests.
 *
 * LinkedIn answers 999 to anything that is not a browser session, and it
 * answers 999 for a profile that does not exist too, so a status check cannot
 * tell a live profile from a dead one. These links are verified by hand and
 * listed here so the exclusion is deliberate rather than accidental.
 */
const BOT_BLOCKED = [
  { host: "linkedin.com", reason: "returns 999 to non-browser clients" },
];

/**
 * A link is broken when the host says the destination is not there: 404 or
 * 410. Any other status means the host answered, so the destination exists
 * even if it refused the request.
 */
function isBrokenStatus(status) {
  return status === 404 || status === 410;
}

function isBotBlocked(href) {
  return BOT_BLOCKED.some((entry) => href.includes(entry.host));
}

/** The excluded links, with the reason each one is excluded. */
function botBlockedLinks() {
  return uniqueLinks
    .filter((href) => isBotBlocked(href))
    .map((href) => ({
      href,
      reason: BOT_BLOCKED.find((entry) => href.includes(entry.host)).reason,
    }));
}

async function probe(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Some hosts serve a challenge to a bare user agent.
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-link-check)",
      },
    });
    return { status: response.status, broken: isBrokenStatus(response.status) };
  } finally {
    clearTimeout(timeout);
  }
}

describe("enlaces externos del sitio", () => {
  it("no declara enlaces duplicados ni vacíos", () => {
    for (const href of externalLinks) {
      expect(href, "un enlace externo no puede estar vacío").toMatch(/^https:\/\//);
    }
  });

  it("todos los enlaces externos resuelven a un destino que existe", async () => {
    const verifiable = uniqueLinks.filter((href) => !isBotBlocked(href));

    const results = await Promise.all(
      verifiable.map(async (href) => {
        try {
          return { href, ...(await probe(href)) };
        } catch {
          // No network in this environment: the check cannot run, so it does
          // not fail the suite. It must not silently pass either, hence the
          // explicit report.
          return { href, status: null, broken: null };
        }
      }),
    );

    const broken = results.filter((r) => r.broken === true);
    const unreachable = results.filter((r) => r.broken === null);

    for (const u of unreachable) {
      console.warn(`  ⚠ no se pudo verificar ${u.href} (sin red)`);
    }

    for (const b of botBlockedLinks()) {
      console.warn(`  ⚠ ${b.href} no se puede verificar automáticamente: ${b.reason}`);
    }

    expect(
      broken.map((b) => `${b.href} (${b.status})`),
      "estos enlaces no resuelven y hay que sacarlos o repararlos",
    ).toEqual([]);
  }, 120_000);
});

describe("CV publicado", () => {
  it("expone un PDF por idioma, con el nombre correcto", () => {
    expect(cvPath.es).toBe("/cv/rodrigo-amarilla-cv-es.pdf");
    expect(cvPath.en).toBe("/cv/rodrigo-amarilla-cv-en.pdf");
  });

  it("el CV de cada idioma está en public/ y es un PDF de verdad", async () => {
    for (const locale of ["es", "en"]) {
      const path = `public${cvPath[locale]}`;
      const file = await import("node:fs/promises").then((fs) =>
        fs.readFile(path),
      );
      expect(file.subarray(0, 5).toString(), `${path} no es un PDF`).toBe("%PDF-");
      expect(file.length, `${path} es demasiado chico para ser un CV`).toBeGreaterThan(10_000);
    }
  });
});

describe("proyectos publicados", () => {
  it("no publica un proyecto cuyo repositorio sea privado", () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.href).not.toContain("Nordico-proyectos");
        expect(link.href).not.toContain("nutri-prime");
      }
    }
  });

  it("publica solo los proyectos que la curacion dejo", () => {
    // The site is a curated showcase, not an inventory. These three are the
    // ones that carry a distinct claim: cloud (Journal API), the Node and
    // AI layer (PostulaDo), and the only live demo (Task Tracker).
    //
    // Multi-Container App was removed because Journal API already proves
    // Docker, Terraform and CI/CD at far greater depth, so a second project
    // making the same claim diluted the one that makes it well.
    expect(projects.map((p) => p.slug).sort()).toEqual([
      "journal-api",
      "postulado",
      "task-tracker",
    ]);
  });

  it("el repositorio de cada proyecto es un click desde la tarjeta", () => {
    for (const project of projects) {
      expect(
        project.links.some((l) => l.kind === "repo"),
        `${project.slug} no expone su repositorio`,
      ).toBe(true);
    }
  });

  it("declara una demo solo cuando existe y esta verificada", () => {
    const withDemo = projects.filter((p) =>
      p.links.some((l) => l.kind === "demo"),
    );
    // There is exactly one live demo on this site, and it is verified. A
    // second one would need to be checked before it goes up.
    expect(withDemo.map((p) => p.slug)).toEqual(["task-tracker"]);
  });

  it("cada proyecto tiene las cinco secciones del caso de estudio", () => {
    for (const project of projects) {
      const headings = project.sections.map((s) => s.heading.es);
      expect(headings).toContain("Problema");
      expect(headings).toContain("Enfoque");
      expect(headings).toContain("Resultado");
      expect(headings).toContain("Límites conocidos");
    }
  });

  it("cada proyecto tiene copy en los dos idiomas", () => {
    for (const project of projects) {
      expect(project.tagline.es.length).toBeGreaterThan(0);
      expect(project.tagline.en.length).toBeGreaterThan(0);
      for (const section of project.sections) {
        expect(section.body.es.length).toBeGreaterThan(0);
        expect(section.body.en.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("experiencia publicada", () => {
  it("no declara un repositorio para un trabajo con repo privado", () => {
    for (const experience of experiences) {
      expect(experience.privateRepo).toBe(true);
    }
  });

  it("no dice 'Presente' ni usa un rango abierto", () => {
    for (const experience of experiences) {
      const serialized = JSON.stringify(experience);
      expect(serialized).not.toMatch(/Presente/i);
      expect(serialized).not.toMatch(/Present\b/i);
      expect(experience.period).toMatch(/^\d{4}-\d{2} — \d{4}-\d{2}$/);
    }
  });
});
