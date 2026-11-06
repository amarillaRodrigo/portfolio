import { describe, expect, it } from "vitest";
import { profileInfoContent } from "../src/data/profileInfoContent";
import { site } from "../src/data/site";

/**
 * The content the visitor reads has to be defensible.
 *
 * This test used to require each "micro-logro" to contain a digit, which
 * forced three invented metrics ("40% menos tiempo de deploy", "28%
 * escaneabilidad", "2x features") to stay in the content. A number the site
 * cannot source is a liability in front of a hiring manager, not a
 * decoration, so the rule now runs the other way: any claim that carries a
 * number has to name its source.
 */
describe("contenido de perfil para Contacto", () => {
  it("expone un objeto completo sin placeholders", () => {
    expect(profileInfoContent).toMatchObject({
      resumen: expect.any(String),
      formaDeTrabajar: expect.any(Array),
      stackPrincipal: expect.any(Array),
      contacto: expect.objectContaining({
        email: expect.any(String),
        linkedin: expect.any(String),
        github: expect.any(String),
      }),
    });

    const serializado = JSON.stringify(profileInfoContent).toLowerCase();
    expect(serializado).not.toContain("placeholder");
    expect(serializado).not.toContain("example@email.com");
  });

  it("no publica métricas sin respaldo", () => {
    const serializado = JSON.stringify(profileInfoContent);

    // These three were invented. They are exactly what this test used to
    // enforce, so they get named here to make the reversal explicit.
    expect(serializado).not.toMatch(/40\s*%/);
    expect(serializado).not.toMatch(/28\s*%/);
    expect(serializado).not.toMatch(/2x/);
  });

  it("toda cifra que aparezca en el contenido es verificable", () => {
    /**
     * The only figures the site is allowed to publish, and where each comes
     * from. A number not on this list has no source and does not go out.
     */
    const medibles = [
      "79", // Terraform resources (journal-starter/terraform)
      "228", // commits (journal-starter)
      "99", // resources destroyed (journal-starter/docs/cleanup.md)
      "13", // AWS Config managed rules (terraform/config.tf)
      "15", // metric series (journal-starter/docs/observability.md)
      "3", // AWS Config findings closed (docs/evidence-security-incident-response.md)
      "9.66", // average across the three professional practice placements
      "8.6", // overall average, Técnico Superior
      "8.8", // average so far, BSc in Data Science
      "2", // page count of the published CV
    ];

    const cifras = profileInfoContent.resumen.match(/\d+(\.\d+)?/g) ?? [];
    for (const cifra of cifras) {
      expect(
        medibles,
        `la cifra "${cifra}" no tiene una fuente verificable detrás`,
      ).toContain(cifra);
    }
  });

  it("no dice 'Desarrollador de Software' ni 'Desarrollador Junior'", () => {
    const serializado = JSON.stringify(profileInfoContent);
    expect(serializado).not.toMatch(/Desarrollador de Software/);
    expect(serializado).not.toMatch(/Desarrollador Junior/);
    expect(serializado).not.toMatch(/Desarrollador Junior/i);
  });

  it("no presenta Buenos Aires como ubicación propia", () => {
    const serializado = JSON.stringify(profileInfoContent);
    expect(site.location).toBe("Formosa, Argentina");
    // Buenos Aires may appear only as a place to relocate to.
    expect(serializado).not.toMatch(/Buenos Aires, Argentina/);
  });

  it("prioriza email como canal principal de contacto", () => {
    expect(profileInfoContent.contacto).toMatchObject({
      primario: "email",
      email: expect.any(String),
      emailHref: expect.stringMatching(/^mailto:/),
    });
  });

  it("el email declarado coincide con el del sitio", () => {
    expect(profileInfoContent.contacto.email).toBe(site.email);
    expect(profileInfoContent.contacto.github).toBe(site.github);
    expect(profileInfoContent.contacto.linkedin).toBe(site.linkedin);
  });
});
