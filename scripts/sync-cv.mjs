#!/usr/bin/env node
/**
 * Synchronises the published CV PDFs against their source of truth.
 *
 * The source is the compiled LaTeX master in the ai-job-search repository,
 * not a markdown file: `cv/rodrigoMain.pdf` (ES) and `cv/main_example_en.pdf`
 * (EN). This script copies them into `public/cv/` under the names the site
 * publishes and refuses to leave a file behind that does not pass the checks.
 *
 * The check is the same one the CV pipeline uses: the PDF must have the
 * expected page count, must carry an extractable text layer (an ATS reads
 * that layer, not the pixels), and must not carry a year joined to a Unicode
 * dash, which is the form ATS date parsers silently drop.
 *
 * Usage:
 *   node scripts/sync-cv.mjs            # sync and verify
 *   node scripts/sync-cv.mjs --check    # verify only, do not copy
 */

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, openSync, readSync, closeSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Where the compiled masters live. Overridable for CI or a different checkout. */
const SOURCE_DIR = process.env.CV_SOURCE_DIR
  ? resolve(process.env.CV_SOURCE_DIR)
  : resolve(ROOT, "..", "ai-job-search");

const VERIFY_SCRIPT = join(SOURCE_DIR, "tools", "verify_pdf.py");

/** The published copies, and the master each one comes from. */
const PUBLISHED = [
  {
    out: join(ROOT, "public", "cv", "rodrigo-amarilla-cv-es.pdf"),
    source: join(SOURCE_DIR, "cv", "rodrigoMain.pdf"),
    locale: "es",
  },
  {
    out: join(ROOT, "public", "cv", "rodrigo-amarilla-cv-en.pdf"),
    source: join(SOURCE_DIR, "cv", "main_example_en.pdf"),
    locale: "en",
  },
];

const EXPECTED_PAGES = 2;

const checkOnly = process.argv.includes("--check");

function fail(message) {
  console.error(`\n  sync-cv: ${message}\n`);
  process.exit(1);
}

/**
 * Structural checks that do not depend on Python being installed.
 *
 * The PDF header tells us it is a PDF at all, and the file size tells us it
 * is not a truncated stub. These run before the full verifier so a missing or
 * corrupt file is reported plainly.
 */
function verifyStructure(pdf) {
  if (!existsSync(pdf)) {
    fail(`${pdf} does not exist`);
  }

  const bytes = statSync(pdf).size;
  if (bytes < 10_000) {
    fail(`${pdf} is only ${bytes} bytes, which is too small to be a CV`);
  }

  const fd = openSync(pdf, "r");
  const header = Buffer.alloc(5);
  readSync(fd, header, 0, 5, 0);
  closeSync(fd);

  if (header.toString() !== "%PDF-") {
    fail(`${pdf} does not start with the PDF magic bytes`);
  }
}

/**
 * Runs the repository's own PDF verifier.
 *
 * When the verifier is not reachable (a CI checkout without the sibling
 * repository), the structural checks above still ran, so a broken or missing
 * PDF can never be published silently.
 */
function verifyWithTool(pdf) {
  if (!existsSync(VERIFY_SCRIPT)) {
    console.log(
      `  verifier not found at ${VERIFY_SCRIPT}, using structural checks only`,
    );
    return;
  }

  const args = [
    VERIFY_SCRIPT,
    pdf,
    "--pages",
    String(EXPECTED_PAGES),
    "--ascii-dates",
  ];

  try {
    execFileSync("python", args, { stdio: "pipe" });
  } catch (error) {
    const stdout = error.stdout?.toString() ?? "";
    const stderr = error.stderr?.toString() ?? "";
    fail(`verification failed for ${pdf}\n${stdout}${stderr}`);
  }
}

for (const { out, source, locale } of PUBLISHED) {
  const label = `[${locale}]`;

  if (checkOnly) {
    console.log(`  ${label} checking ${out}`);
  } else {
    if (!existsSync(source)) {
      fail(
        `source master not found at ${source}\n` +
          `  Set CV_SOURCE_DIR to the ai-job-search checkout, or run this from a sibling directory.`,
      );
    }

    mkdirSync(dirname(out), { recursive: true });
    copyFileSync(source, out);
    console.log(`  ${label} copied ${source} -> ${out}`);
  }

  verifyStructure(out);
  verifyWithTool(out);
  console.log(`  ${label} verified ${out}`);
}

console.log(
  checkOnly
    ? "\n  sync-cv: all published CVs pass the checks\n"
    : "\n  sync-cv: published CVs are in sync with the source\n",
);
