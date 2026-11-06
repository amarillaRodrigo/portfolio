#!/usr/bin/env node
/**
 * Builds the project thumbnails.
 *
 * They are authored, not photographed and not screenshotted. A screenshot of a
 * demo that no longer exists is a credibility trap pointed at exactly the
 * audience this site filters: the Journal API was torn down on 2026-11-06,
 * so there is no interface to capture. An abstract geometric mark drawn in
 * the design system's own vocabulary is honest and looks deliberate.
 *
 * Each thumbnail is a different structural figure in the same grammar: the
 * 24px grid, hairline strokes, flat black ground, and exactly one accent.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "thumbs");

const W = 640;
const H = 400;

const PAPER = "#0a0a0a";
const INK = "#fafafa";
const ACCENT = "#fdff00";

const grid = `<defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0 L0 0 0 24" fill="none" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>`;

/** A hairline rule: the margin of the sheet. */
const margin = `<line x1="48" y1="40" x2="48" y2="360" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>`;

/**
 * Each figure is a different structure of the same kind: nodes and the lines
 * between them, one of them marked.
 */
const figures = {
  /** Journal API: the cloud topology, one node deployed and one torn down. */
  "journal-api": `
    <g stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" fill="none">
      <line x1="176" y1="120" x2="296" y2="120"/>
      <line x1="336" y1="120" x2="456" y2="120"/>
      <line x1="296" y1="164" x2="296" y2="256"/>
      <line x1="296" y1="256" x2="176" y2="256"/>
      <line x1="336" y1="256" x2="456" y2="256"/>
      <line x1="456" y1="144" x2="456" y2="232"/>
    </g>
    <g fill="none" stroke="#ffffff" stroke-opacity="0.30" stroke-width="1">
      <rect x="136" y="96" width="40" height="48" rx="3"/>
      <rect x="296" y="96" width="40" height="48" rx="3"/>
      <rect x="456" y="96" width="40" height="48" rx="3"/>
      <rect x="136" y="232" width="40" height="48" rx="3"/>
      <rect x="296" y="232" width="40" height="48" rx="3"/>
      <rect x="456" y="296" width="40" height="48" rx="3"/>
    </g>
    <rect x="416" y="232" width="40" height="48" rx="3" fill="none" stroke="${ACCENT}" stroke-opacity="0.9" stroke-width="1.5"/>
    <line x1="456" y1="280" x2="456" y2="296" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="3 3"/>`,

  /** PostulaDo: a pipeline of stages, one marked as the validated output. */
  "postulado": `
    <g stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" fill="none">
      <line x1="176" y1="200" x2="216" y2="200"/>
      <line x1="288" y1="200" x2="328" y2="200"/>
      <line x1="400" y1="200" x2="440" y2="200"/>
    </g>
    <g fill="none" stroke="#ffffff" stroke-opacity="0.30" stroke-width="1">
      <rect x="136" y="176" width="40" height="48" rx="3"/>
      <rect x="216" y="176" width="72" height="48" rx="3"/>
      <rect x="328" y="176" width="72" height="48" rx="3"/>
      <rect x="440" y="176" width="40" height="48" rx="3"/>
    </g>
    <rect x="328" y="176" width="72" height="48" rx="3" fill="none" stroke="${ACCENT}" stroke-opacity="0.9" stroke-width="1.5"/>
    <line x1="152" y1="284" x2="464" y2="284" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>
    <line x1="152" y1="284" x2="152" y2="256" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>`,

  /** Task Tracker: a monorepo, three applications sharing one contract. */
  "task-tracker": `
    <g fill="none" stroke="#ffffff" stroke-opacity="0.30" stroke-width="1">
      <rect x="264" y="96" width="112" height="48" rx="3"/>
      <rect x="136" y="216" width="112" height="48" rx="3"/>
      <rect x="264" y="216" width="112" height="48" rx="3"/>
      <rect x="392" y="216" width="112" height="48" rx="3"/>
    </g>
    <g stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" fill="none">
      <line x1="320" y1="144" x2="320" y2="176"/>
      <line x1="192" y1="176" x2="448" y2="176"/>
      <line x1="192" y1="176" x2="192" y2="216"/>
      <line x1="320" y1="176" x2="320" y2="216"/>
      <line x1="448" y1="176" x2="448" y2="216"/>
    </g>
    <rect x="264" y="96" width="112" height="48" rx="3" fill="none" stroke="${ACCENT}" stroke-opacity="0.9" stroke-width="1.5"/>`,
};

mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, figure] of Object.entries(figures)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${grid}
  ${margin}
  ${figure}
</svg>`;

  const svgPath = join(OUT_DIR, `${slug}.svg`);
  writeFileSync(svgPath, svg, "utf8");

  const pngPath = join(OUT_DIR, `${slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);

  console.log(`  ${slug} -> ${pngPath}`);
}

console.log("\n  thumbnails: generated\n");
