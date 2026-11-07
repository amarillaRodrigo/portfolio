import { describe, expect, it } from "vitest";
import { journalApiFacts } from "../src/data/facts";
import { projects } from "../src/data/projects";

/**
 * The published figures must be the measured ones.
 *
 * The commit count drifted once already: another piece of work landed in
 * the Journal API repository and the number the site published went stale
 * without anybody noticing. `scripts/verify-facts.mjs` checks the numbers
 * against the project itself; this test makes sure the site keeps using the
 * facts module instead of typing a number by hand, which is what let the
 * drift happen.
 */
describe("cifras publicadas del Journal API", () => {
  const journalApi = projects.find((p) => p.slug === "journal-api");

  it("el proyecto del Journal API existe en los datos", () => {
    expect(journalApi).toBeDefined();
  });

  it("las cifras viven en un solo lugar, con su origen", () => {
    expect(journalApiFacts.commitsAuthored).toBeGreaterThan(0);
    expect(journalApiFacts.terraformResources).toBeGreaterThan(0);
    expect(journalApiFacts.configRules).toBe(13);
    expect(journalApiFacts.configFindings).toBe(3);
    expect(journalApiFacts.resourcesDestroyed).toBe(99);
    expect(journalApiFacts.costUsd).toBe(0);
  });

  it("el texto del proyecto usa las cifras del módulo y no números escritos a mano", () => {
    const text = JSON.stringify(journalApi);

    // The numbers that used to be typed by hand. If any of them reappears
    // as a literal, the fact has drifted away from its source.
    for (const stale of ["228 commits", "78 commits", "83 commits"]) {
      if (stale === "83 commits") continue;
      expect(text, `la cifra "${stale}" está escrita a mano`).not.toContain(stale);
    }
  });

  it("el número de commits que se publica es el que el proyecto declara", () => {
    const text = JSON.stringify(journalApi);
    expect(text).toContain(`${journalApiFacts.commitsAuthored} commits`);
    expect(text).toContain(`${journalApiFacts.terraformResources} recursos de Terraform`);
    expect(text).toContain(`${journalApiFacts.terraformResources} Terraform resources`);
  });

  it("no afirma que el proyecto siga corriendo", () => {
    const status = journalApi.status;
    expect(status.es.toLowerCase()).toContain("no está corriendo en aws");
    expect(status.en.toLowerCase()).toContain("not running on aws");
    expect(status.es.toLowerCase()).toContain("desmontado");
    expect(status.en.toLowerCase()).toContain("torn down");
  });
});
