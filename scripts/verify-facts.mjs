#!/usr/bin/env node
/**
 * Checks the published Journal API numbers against the project itself.
 *
 * The site publishes figures — 79 Terraform resources, 13 AWS Config rules,
 * 99 resources destroyed. They were correct when they were written, and one
 * of them (the commit count) silently drifted when other work landed in the
 * same repository. A number on a portfolio that no one re-checks is a
 * liability in front of a hiring manager, so the numbers live in
 * `src/data/facts.ts` and this script proves them.
 *
 * The project repository is not part of this one, so it is located rather
 * than assumed. When it is not reachable the script says so and exits 0:
 * the numbers cannot be disproved here, and a missing sibling checkout is
 * not a broken site.
 *
 * Usage:
 *   node scripts/verify-facts.mjs
 *   node scripts/verify-facts.mjs --repo <path-to-journal-starter>
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { journalApiFacts } from "../src/data/facts.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const explicitRepo = args.includes("--repo") ? args[args.indexOf("--repo") + 1] : null;

const CANDIDATES = [
  explicitRepo,
  process.env.JOURNAL_API_REPO,
  resolve(ROOT, "..", "pythonPracticas", "journal-starter"),
  resolve(ROOT, "..", "journal-starter"),
].filter(Boolean);

const repo = CANDIDATES.map((p) => resolve(p)).find((p) => existsSync(join(p, ".git")));

if (!repo) {
  console.log(
    "\n  verify-facts: el repositorio del Journal API no está disponible acá.\n" +
      "  Los números no se pueden comprobar en este entorno; se saltean.\n",
  );
  process.exit(0);
}

const git = (...gitArgs) =>
  execFileSync("git", ["-C", repo, ...gitArgs], { encoding: "utf8" });

const failures = [];

function check(label, expected, actual) {
  const ok = String(expected) === String(actual);
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}: ${actual}${ok ? "" : ` (esperado ${expected})`}`);
  if (!ok) failures.push(label);
}

// --- Commits -----------------------------------------------------------------

const total = Number(git("rev-list", "--count", "HEAD").trim());
check("commits en la rama", journalApiFacts.commitsInBranch, total);

const authors = git("log", "--format=%ae").split("\n");
const authored = authors.filter((a) => /amarilla/i.test(a)).length;
check("commits de Rodrigo", journalApiFacts.commitsAuthored, authored);

// --- Terraform ---------------------------------------------------------------

const tfFiles = git("ls-files", "terraform/*.tf").split("\n").filter(Boolean);
const resourceCount = tfFiles.reduce((sum, file) => {
  const content = readFileSync(join(repo, file), "utf8");
  return sum + (content.match(/^\s*resource\s+"/gm) ?? []).length;
}, 0);
check("recursos de Terraform", journalApiFacts.terraformResources, resourceCount);

// --- AWS Config rules --------------------------------------------------------

const configTf = readFileSync(join(repo, "terraform", "config.tf"), "utf8");
const conformityStart = configTf.indexOf("config_conformity_rules = {");
const threatStart = configTf.indexOf("config_threat_rules = {");
const concatStart = configTf.indexOf("config_rule_names = concat");

const conformity = (
  configTf.slice(conformityStart, threatStart).match(/source_identifier/g) ?? []
).length;
const threat = (
  configTf.slice(threatStart, concatStart).match(/source_identifier/g) ?? []
).length;
check(
  "reglas de AWS Config",
  journalApiFacts.configRules,
  conformity + threat,
);

// --- The teardown record -----------------------------------------------------

const cleanup = readFileSync(join(repo, "docs", "cleanup.md"), "utf8");
check(
  "recursos destruidos",
  journalApiFacts.resourcesDestroyed,
  cleanup.includes(`${journalApiFacts.resourcesDestroyed} recursos destruidos`) ? journalApiFacts.resourcesDestroyed : "no está en cleanup.md",
);
check(
  "versiones de S3 vaciadas",
  journalApiFacts.s3VersionsEmptied,
  cleanup.includes(`${journalApiFacts.s3VersionsEmptied} versiones`) ? journalApiFacts.s3VersionsEmptied : "no está en cleanup.md",
);
check(
  "imágenes de ECR borradas",
  journalApiFacts.ecrImagesDeleted,
  cleanup.includes(`${journalApiFacts.ecrImagesDeleted} im`) ? journalApiFacts.ecrImagesDeleted : "no está en cleanup.md",
);

if (failures.length > 0) {
  console.error(
    `\n  verify-facts: ${failures.length} número(s) del sitio no coinciden con el proyecto.\n` +
      `  Corregí src/data/facts.ts y el texto de src/data/projects.ts.\n`,
  );
  process.exit(1);
}

console.log("\n  verify-facts: todos los números publicados coinciden con el proyecto\n");
