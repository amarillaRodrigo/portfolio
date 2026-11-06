---
name: Rodrigo Amarilla — Portfolio
description: Editorial technical document for a backend engineer with a cloud focus.
colors:
  paper: "#0a0a0a"
  paper-subtle: "#171717"
  base: "#fafafa"
  base-muted: "#a1a1a1"
  accent: "#fdff00"
  accent-dim: "#d6d800"
typography:
  display:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
  body:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.15em"
  micro:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.1em"
  small:
    fontFamily: "'Work Sans', ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  diagram:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  subtle: "8px"
spacing:
  hairline: "1px"
  micro: "0.25rem"
  tight: "0.5rem"
  snug: "0.75rem"
  base: "1rem"
  relaxed: "1.5rem"
  loose: "2rem"
  section: "3rem"
  block: "6rem"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.subtle}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  card-project:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.base}"
    rounded: "{rounded.subtle}"
    padding: "2rem"
  chip-tag:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.base-muted}"
    rounded: "{rounded.subtle}"
    padding: "0.25rem 0.5rem"
  link-nav:
    textColor: "{colors.base-muted}"
    typography: "{typography.label}"
---

# Design System: Rodrigo Amarilla — Portfolio

## Overview

**Creative North Star: "Documento Técnico"**

A technical document, printed on black paper, in which a single fluorescent ink marks what matters. The system is a sheet, not a dashboard: one surface (`paper`), one ink (`base`), one accent tint (`accent`), a hairline rule that behaves like a drafting guide, and margins that hold micro-labels in wide-tracked uppercase. Nothing competes for attention, because a technical sheet has one hierarchy — and the accent marks the one thing that matters at that moment.

The name is not decoration; it is already in the code. `global.css` labels its own base layer `/* Editorial baseline */`. The colour tokens are named for paper and ink: `paper` (`#0a0a0a`) is the sheet, `base` (`#fafafa`) is the ink, `base.muted` is the ink at the foot of the page, `paper.subtle` is the sheet under the sheet, and `accent` is the highlighter. The type scale is named `h1` / `h2` / `body` — document semantics, not terminal semantics. The 24px grid at 2% opacity is the drawing grid. There is no monospace in the system, no glow, no scanline, no bloom: the uppercase-with-wide-tracking micro-labels are Work Sans set editorial, not a terminal, and `boxShadow.subtle` (`0 1px 2px rgba(0,0,0,0.03)`) is the shadow of a lifted sheet, not an instrument light.

The decode/scramble effect is the system at its most characteristic: text emerging from noise, a metaphor for reading rather than for a machine. The `fade-in` on scroll is the document entering the reader's field.

Density is the discipline: **one idea per block**. If a block asks for two ideas, it is two blocks. The horizontal rail is the index of the file, its sheets ordered by weight; a work-experience entry is a sheet inside the document, not a project in the same tray, because real work does not compete with a portfolio piece.

**Key Characteristics:**
- One accent ink, used as a highlighter: at most one accented element per viewport.
- Flat surfaces separated by hairline rules, not shadows.
- Micro-labels in uppercase with wide tracking as the margin annotation.
- Generous real margins — `6rem` block gaps, `2rem`/`4rem` page padding, `62vh` hero.
- Motion is a single verb: the accent enters. Maximum 2px, and never on a button.

## Colors

The palette is one sheet of black paper, one ink, and one fluorescent tint — the role of an editorial accent ink on an otherwise monochrome sheet.

### Primary
- **Lemon Glacier** (`#fdff00`): the only chromatic value in the system. It marks structure and action, never content: the navbar's `{ }` delimiters, the project year, primary CTAs and links, focus rings, and hover washes. Its own name is already the repository's (`README.md`: "Lemon Glacier").

### Secondary
- None. A second tint does not exist in this system and introducing one is a defect, not an extension.

### Tertiary
- None.

### Neutral
- **Paper** (`#0a0a0a`): the surface of the sheet. The page background, `theme-color`, and the `paper.subtle` neighbour.
- **Paper Subtle** (`#171717`): the sheet under the sheet — the fill of cards and containers, one step above `paper`.
- **Base** (`#fafafa`): the ink. Body text and headings on `paper`.
- **Base Muted** (`#a1a1a1`): the ink at the foot of the page. Secondary text, nav links at rest, card metadata.

**The One Voice Rule.** The accent appears on at most one element per viewport. Its rarity is what makes it work. Today the home shows the selected card's year plus the border of the card under the cursor, and that is the budget.

**The Accent Lives Only on Paper Rule.** `#fdff00` on `paper` measures 18.4:1 (AAA) and on `paper.subtle` 16.6:1 (AAA), but on `base` it is 1.03:1 — illegible. The accent therefore never appears as a background for text, and never appears over a light surface. This is a luminance constraint, not a preference: a high-luminance fluorescent ink produces halation and fatigue across a large area, but in a small mark it is vivid and perfectly legible.

**The Accent Never Means Alone Rule.** The accent never encodes meaning by itself. Every accented mark is accompanied by text or by a shape, because the accent is the system's only signalling ink and cannot carry two meanings at once.

**The Accent Never Grows Rule.** Accented text does not take a heavier weight or a larger size than the system already gives it. When accented text grows, it stops being a mark and becomes content.

**The Accent Has One Source Rule.** The accent is defined once. The incumbent code writes the same colour three ways — the `accent` token at `/5`, `/10`, `/40`, `/50`, `/60`; the literal `#fdff00`; and the literal `rgba(253, 255, 0, X)` with six invented opacities — and only about 7 of roughly 35 uses go through the token. All of them resolve to the token, and the surviving opacities are named by state, not by number:

| Token value | State | Use |
| --- | --- | --- |
| `accent` | mark | accent text, CTA, braces, year |
| `accent/60` | focus / active | focus ring, active border, selection ring |
| `accent/30` | resting | resting border of an accented element |
| `accent/10` | wash | hover wash, text selection |

## Typography

**Display Font:** Work Sans (with `ui-sans-serif, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`)
**Body Font:** Work Sans (same stack)
**Label/Mono Font:** None. The system has no monospace. The uppercase micro-labels are Work Sans set editorial with wide tracking; do not read them as terminal output and do not introduce a mono face.

**The One Exception.** The ASCII architecture diagrams in the case studies are set in the platform's monospace stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`). This is the one place a mono face appears, and it is functional rather than expressive: a box-drawing diagram only aligns in a fixed-pitch face. It is a diagram, not a typographic voice, and it never appears in a heading, a label or a piece of copy.

**Character:** a single grotesk doing every job, separated by scale, weight and tracking rather than by family. The personality is editorial and technical at once: tight, confident headlines; body copy that reads as typeset prose; and small uppercase labels that behave like margin annotations on a drawing.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw, 5rem)`, 1.05): the hero's name. One per viewport.
- **Headline** (600, `clamp(1.75rem, 4vw, 2.75rem)`, 1.1): page and case-study titles, and section headings.
- **Title** (600, `1.25rem`, 1.2, `0.05em`): project names and card headings. Uppercase.
- **Body** (400, `1rem`, 1.7): running prose. Case studies read at 65–75ch.
- **Small** (400, `0.875rem`, 1.6): secondary prose — card taglines, button labels, nav links, link text.
- **Label** (600, `0.75rem`, `0.15em`, uppercase): the margin annotation — the location line, the availability line, section titles, the year, the status.
- **Micro** (400, `0.65rem`, `0.1em`, uppercase): tag chips and the smallest metadata.
- **Diagram** (mono, `0.75rem`, 1.6): the ASCII architecture blocks only. See the one exception below.

**The Uppercase Margin Rule.** Micro-labels are uppercase, tracked wide, `10–11px`, and muted. They are never accented — with two exceptions, the year and the status tag, because those are the two data points the reader looks for first.

**The No Second Voice Rule.** One family. The document does not gain a second typeface for emphasis; emphasis comes from weight, scale and tracking.

## Layout

A single-column reading sheet with a fixed maximum measure, and wide real margins. The page is `max-w-6xl` with `1rem` horizontal padding, except full-bleed surfaces that opt out via `noPadding`. Vertical rhythm is `6rem` between blocks, `3rem` between major sections, `2rem` inside cards and `1.5rem`/`1rem` for local spacing.

The hero is a grid of four columns — name at the left edge, title, location and time, then a spacer — collapsing to a single column at `1024px` and tightening type at `640px`. Its height is `62vh` so the rail below lands inside the first screen.

Project case studies are a reading column (`max-width: 900px`) with a metadata row at the top and sections separated by `3rem`. Paragraphs inside a case study are separated by explicit breaks rather than cramped leading, which is the document's reading rhythm.

The horizontal rail is a flex row of `350×240px` cards (widening to `280×220px` on mobile) with `2rem` gaps and `2rem`/`4rem` page-edge padding, scrolling horizontally with `overflow-x: auto`.

The 24px grid at 2% opacity sits under everything as the drawing grid — the faintest layer on the page.

## Elevation & Depth

This system has **no shadows** in its visible components. Depth is conveyed by tonal layering and by hairline rules: `paper` → `paper.subtle` for raised fills, `border-white/10` for the rule, and `border-white/20` for a stronger rule on chips. `boxShadow.subtle` (`0 1px 2px rgba(0,0,0,0.03)`) is reserved for the skip-to-content link, which genuinely floats above the page while focused, and for nothing else.

**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow appears only where something genuinely floats over the sheet — a popover, a menu — and nowhere else. The separation between two surfaces is a hairline, not a shadow.

## Shapes

Corners are uniformly soft and small: `8px` on cards, buttons, chips and containers, via the `rounded-subtle` token. A hardcoded `border-radius: 8px` in the case-study buttons becomes the token. There is no other radius in the system and no pill, no circle, no sharp corner.

Form language is rectilinear and drafting-like: hairline borders, grid-aligned blocks, generous rectangular margins, no clipping or masked silhouettes anywhere.

## Components

### Buttons
- **Shape:** softly rounded (8px, `rounded-subtle`).
- **Primary:** transparent background, `1px solid accent/30` resting border, accent text, `1rem 2rem` padding, uppercase 600 at `0.9rem` with `0.1em` tracking.
- **Hover / Focus:** the accent enters — `bg-accent/10` wash and the border to `accent/60`. The button does **not** move. A single focus ring, `outline: 2px solid accent` with `outline-offset: 2px`, and no radius on the outline, because the component already supplies it.
- **One primary button per site.** The incumbent has two for the same action — the hero's (`1px` hairline border, `0.75rem 1rem` padding) and the case studies' (`2px` border, `1rem 2rem` padding, pre-tinted background). One survives, and the others inherit it.
- **Secondary / Ghost:** a text link in `base-muted` that goes to `base` on hover, with an accent underline or an accent border on the target element. Never a filled second button.

### Chips (tags, stack items, metadata)
- **Style:** `rgba(255, 255, 255, 0.05)` fill, `base-muted` text, `1px solid rgba(255, 255, 255, 0.2)` border, 8px radius, `0.25rem 0.5rem` padding.
- **State:** at rest as above; the accented chip (the project year) uses accent text at `accent/60` opacity. Chips carry no accent background.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** `rgba(255, 255, 255, 0.05)` on `paper`, or `paper.subtle` for containers.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`.
- **Internal Padding:** `2rem` on rail cards and case-study cards, `0.75rem` on compact cards.

### Inputs / Fields
The incumbent has no form controls at all — no `input`, `textarea`, `select` or `form`. Contact is a `mailto:` with prefilled subject and body, and stays that way. If a field is ever added, it is defined from scratch on this grammar: `paper.subtle` background, `1px solid rgba(255, 255, 255, 0.1)` border, 8px radius, `base` text, `base-muted` placeholder, and the single accent focus ring. Error state always carries text as well as colour, because the accent is the only signalling ink and cannot mean two things at once.

### Navigation
- **Style:** a 56px-high bar, `max-w-6xl`, with links in `base-muted` at `text-sm`.
- **Signature:** the `{ }` braces. They are pure `::before`/`::after` pseudo-elements in accent, at `0.2` opacity at rest and `1` on hover, focus or current page, sliding 2px inward as they brighten. They are the markup delimiters of the document.
- **Signature:** the decode/scramble effect. On hover or focus the label's characters scramble through `A–Z0–9` and resolve left to right over 30ms per step, restoring the original text on leave.
- **States:** `base-muted` at rest, `base` on hover/focus/current, with `aria-current="page"` carrying the same treatment.

### The Rail Card
The project's signature component: a `350px` card in the horizontal index, showing an authored geometric thumbnail, the year, the name and up to four tags. On hover it lifts `2px` and its border takes the accent. Its internal language is the document's — the thumbnail is the sheet, the name is the title, the year is the only accented data point. The cards are `flex: 0 0 auto` so they keep their width and the rail scrolls rather than squashing them.

### The Email CTA
The site's one primary action: a `mailto:` with a prefilled subject and body. One variant carries the accent (transparent ground, `1px solid accent/30` border, accent text); the secondary variant is a hairline-bordered outline in muted ink for the repeated instances inside a case study. Neither moves. The accent-filled variant appears once per viewport.

### The Locale Switch
A link in the header that swaps the locale of the current page, preserving the route: `/es/proyectos/journal-api/` becomes `/en/work/journal-api/`. It carries `hreflang` and `lang` attributes, and it uses the same decode/scramble effect as the nav links, because it is the same kind of mark: a structural delimiter rather than content.

### The Fade-In
Content enters with `opacity: 0 → 1` and `translate-y: 2 → 0` over `500ms` with `ease-out`, triggered by an `IntersectionObserver` at `0.08` threshold, once per element. The class is only hidden when JavaScript is available (the `js` class on `<html>`), so content is never lost when the script fails.

## Do's and Don'ts

### Do:
- **Do** keep the accent to one element per viewport. That rarity is the system's entire visual argument.
- **Do** express the accent through the `accent` token with the four named state opacities (`accent`, `accent/60`, `accent/30`, `accent/10`), never as a literal hex or an invented `rgba()`.
- **Do** separate surfaces with a hairline border, and reserve `shadow-subtle` for something that genuinely floats.
- **Do** move elements at most `2px`, and only cards. Buttons do not move.
- **Do** transition colour and opacity in `150ms` and transforms in `200ms`, and name the properties.
- **Do** keep uppercase micro-labels at `10–11px`, `0.1em` tracking, muted — and accent only the year and the status tag.
- **Do** use the `rounded-subtle` token (8px) everywhere a radius appears.
- **Do** keep one idea per block; split the block rather than compressing two ideas into one.
- **Do** put the accent only on `paper` and `paper.subtle` surfaces, never over `base`.

### Don't:
- **Don't** introduce a second accent tint, a gradient, or a light surface. The sheet is black and the ink is one colour.
- **Don't** write `transition: all` — it animates layout properties and is how the incumbent ended up with four different hover durations.
- **Don't** let a button move, lift or scale. The accent enters; the component stays.
- **Don't** use the accent to encode meaning alone, and never to signal both state and content at once.
- **Don't** grow accented text. A larger or heavier accent is content, not a mark.
- **Don't** add a second focus-ring treatment. One ring, `2px solid accent`, `2px` offset, everywhere.
- **Don't** use `accent.dim` (`#d6d800`). It is defined and has zero uses; it duplicates the accent without adding anything. Remove it.
- **Don't** introduce a monospace face. The system has one family and the uppercase labels are not terminal output. The ASCII architecture diagrams are the single exception, and only because a box-drawing diagram does not align in a proportional face.
- **Don't** raise or add motion to a component that does not already move. The incumbent's interaction hierarchy is inverted — the most important element, the CTA, is the least tactile — and flattening that is the point, not adding to it.
