# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: a recruiter or talent screener with 30 seconds.** They arrive from an ATS, Get on Board, LinkedIn, or a direct link in an application, and they are validating fit against a job description. They are not a developer browsing code, and they are not a curious visitor. They need to reach a decision: is this a backend/cloud candidate worth a screen, and how do I reach him. They read the link preview before they decide to open the page.

**Secondary: a developer who opens GitHub.** They arrive after the recruiter or on their own, and they judge the code. For them the repositories, the commit history and the project documentation are the portfolio, not the site.

## Product Purpose

The portfolio exists to turn a screen into a contact. Rodrigo Amarilla is a backend engineer with a cloud focus, and the site's job is to make a 30-second recruiter decide that he is worth contacting, and to make contacting him a single click. Secondary success: a developer who lands on the site finds the repository and the technical depth and forms a higher opinion than they would have from a résumé alone.

The site is the public surface of a job search, not a side project. It is reviewed alongside the CV, the GitHub profile and the cover letters, and it has to be consistent with all of them.

## Positioning

**Backend Engineer with a cloud engineering focus.** Not a full-stack Node developer, not a junior generalist.

The stack is Java 25 / Spring Boot 3.5 · Node + TypeScript · Python + FastAPI · PostgreSQL · AWS (EC2, EKS, IAM, ECR, Secrets Manager, SSM, CloudWatch, X-Ray, CloudTrail, AWS Config) · Kubernetes · Terraform · CI/CD with GitHub OIDC.

The differentiator is that the backend work and the infrastructure work are the same body of work: REST APIs and microservices that were designed, deployed, observed and torn down, with infrastructure as code and short-lived credentials. The NÓRDICO role is the only proof of Java and of production work in a team; the Journal API is the proof of cloud. The site must lead with both.

**Availability signal:** the NÓRDICO engagement concluded on 2026-10-31, so the site says "available for new opportunities" because that is true and it works in his favour.

## Operating Context

- **The CV is a compiled LaTeX artifact, not a markdown file.** Source of truth lives in a separate repository: `D:\programacion\ai-job-search\cv\main_example.tex` (ES) and `main_example_en.tex` (EN). Compiled masters are `rodrigoMain.pdf` (ES, 2 pages) and `main_example_en.pdf` (EN, 2 pages). Compile with **lualatex, never pdflatex**; verify with `tools/verify_pdf.py --pages 2 --ascii-dates`. The published copies in `portfolio/public/cv/` are synchronized copies of those masters, not a second authoring surface.
- **A published PDF must be verifiable, not assumed.** A silent failure here is worse than no button: the recruiter believes they downloaded a CV and gets a home page instead.
- **The GitHub profile is a second surface with the same audience.** Repos without descriptions, topics or licences read as unfinished to a technical reader. `journal-starter` currently carries the upstream template description, which makes the strongest piece of work look like a course template.
- **The repository is public and is part of the portfolio.** It is not a scratchpad. Anything in it that contradicts the current positioning is a bug, not a harmless file.

## Capabilities and Constraints

### Bilingual routing (confirmed requirement)

- Every existing route exists in both languages. No half-translated pages.
- Real URL paths: `/es/...` and `/en/...`. A locale toggle is **not** an acceptable substitute — localStorage-based toggles break links, break sharing and break SEO.
- `<html lang>` follows the locale. It is currently hardcoded to `"es"` at `src/layouts/BaseLayout.astro:9`. Wrong `lang` makes screen readers read English with a Spanish voice and suppresses Chrome's auto-translate, which breaks the site for the English-speaking recruiters it is meant to reach.
- The locale switcher is one click away from any page and preserves the current path.
- The English copy is written in its own voice, following the English master CV. It is not a literal translation of a stale Spanish page.
- The CV button serves the PDF of the active language.
- `title`, `description` and Open Graph tags are per locale. Today they are `<title>Home</title>` and `description: "Portfolio editorial minimalista"` — that is exactly what a recruiter sees in the link preview on Get on Board, LinkedIn or an application form, and it does not get the link opened.

### Real 404

Cloudflare Pages currently serves the home page for every non-existent path: `https://rodrigoamarilla.tech/cv.pdf` returns **200 `text/html`**, not a PDF and not a 404. Consequences: the CV download fails silently, the recruiter believes they downloaded a CV, and the whole site reads to Google as a single page. A real `404.html` is required.

### SEO and machine readability

`sitemap.xml`, `robots.txt` and JSON-LD `Person` are required. The site must be discoverable as a multi-page site.

### Site structure (confirmed)

Five blocks on the home, in this order:

1. **HERO** — name, "Backend Engineer", stack on one line, the location line, email CTA, CV download, and the availability statement.
2. **EXPERIENCIA** — NÓRDICO as its own block, above projects, because it is paid production work and the only proof of Java.
3. **PROYECTOS DESTACADOS** — Journal API first, PostulaDo second.
4. **EN VIVO** — the one project with a live demo, as its own band rather than a grid cell: a recruiter clicks it and the thing works.
5. **STACK + CONTACTO** — closing.

**Excluded from the site, deliberately:** Prime State, SIGELED and Multi-Container App.

- **Prime State** stays a line in the Spanish CV only. The repository is private, has no README and no licence, and publishing it would mean reviewing seven internal documents. It would be a fourth AI project in a portfolio that differentiates itself on Java/Spring and AWS — and the English master CV already excludes it. The site is a curated showcase, not an inventory.
- **SIGELED** appears in neither master CV, and the site was the last place it was still alive — exactly the incoherence the single-profile-version rule forbids. Its only external link was a demo returning 503. It is a 2025 Prácticas Profesionales project already represented in the CV as "Desarrollador Backend (Prácticas Profesionales) — average 9.66", and does not need a project page of its own.
- **Multi-Container App** repeats the claim Journal API already makes better. Its whole stack — Docker, Terraform, CI/CD on GitHub Actions — is the same axis as the Journal API's, which does it with 79 Terraform resources, Kubernetes, OIDC and a documented teardown. A second project making the same claim at a fraction of the depth dilutes the one that makes it well. It stays in the CV, where a project list is expected to be complete, and it leaves the site, where it is not.

**Why PostulaDo stays.** NÓRDICO proves Java, not Node: the two do not overlap. PostulaDo is the only project on the site that carries the TypeScript backend (NestJS, BullMQ over Redis, Prisma), the AI layer as a first-class claim (SGLang with XGrammar, output validated against a schema), and a test suite that runs against real PostgreSQL and Redis in Docker Compose. It appears in 10 of the 11 CV tailorings — it is the project that has been carrying applications, not decoration. The site promises TypeScript and Node.js in its stack line, and PostulaDo is what makes that promise true.

### Link rules

Every external link on the site must return 200, and this is verified automatically by a test that walks the URLs declared in `src/data/projects.ts` and in the detail pages. It runs locally and in CI. The 503 on SIGELED's demo, the 404 on the private NÓRDICO repository and the 200-with-`text/html` on `/cv.pdf` are the same class of bug: links that worked when they were written and rotted unnoticed.

- The **repository is the primary link**; the **demo is secondary** and always verified. A live demo is real evidence a recruiter clicks in three seconds, but demos rot: a Render free tier sleeps, a Vercel project pauses, a Heroku app dies. The site must never depend on one. The only surviving live demo is `task-tracker-web-two.vercel.app`, verified 200.
- **A link to a destination that does not exist is worse than no link**, because it turns a cover letter into a list of broken promises.

**Location line:** `Formosa, Argentina` plus `Remote-first (LATAM + US-East overlap) · Open to relocate to Buenos Aires`. Never "Buenos Aires" as his own location — the CV, the candidate profile and the phone prefix all say Formosa. Never "remote global" — Argentina is UTC-3 all year, so it only covers one full US-East business day (10:00–19:00 ART).

**Primary action:** the visitor writes an email. The CTA is a `mailto:` with prefilled subject and body, above the fold, repeated at the end of every case study, with a single destination in the contact box. CV download is the supporting action, in both languages.

**Case study shape:** Problem → Approach → Architecture → Result → Known limits, following `documents/projects/postulado_case_study_es.md`. The known limits are load-bearing: a weakness explained with its reasoning reads as judgement to a hiring manager.

### Single source of truth for the profile

The portfolio repository must be reduced to one source of truth, and all public surfaces must state the same version of the profile: **November 2026**.

| Artifact | Lives in | Consumed by |
| --- | --- | --- |
| LaTeX source | `ai-job-search/cv/main_example.tex` + `main_example_en.tex` | `/apply`, `/setup` |
| Master PDF | `ai-job-search/cv/rodrigoMain.pdf` + `main_example_en.pdf` | `tools/verify_pdf.py` |
| Published PDF | `portfolio/public/cv/rodrigo-amarilla-cv-es.pdf` + `-en.pdf` | the download button (synchronized copy) |

`npm run sync-cv` synchronizes the published copies against the source and fails the build when the checks do not pass.

### Measured-numbers rule

Every number on the site must be measured. No invented metrics.

- The three current claims in `src/data/profileInfoContent.ts` — "40% menos tiempo de deploy", "28% escaneabilidad", "2x features" — have no support and must go. `tests/profile-info-content.test.js:24-31` currently *requires* each micro-logro to contain a digit via a regex, so that test has to be rewritten.
- Valid figures: 79 Terraform resources · 228 commits · 99 resources destroyed · USD 0.00 measured · 9.66 / 8.60 / 8.80 averages.

### Prohibited claims

- **Never GuardDuty.** It was never enabled: the account has no payment method and returns `SubscriptionRequiredException`. The real threat detection is **AWS Config** with 13 managed rules (8 conformity + 5 threat) and 3 real findings closed. The string "GuardDuty" appeared in 8 `.tex` files in `ai-job-search/cv/` and has been corrected to AWS Config.
- **Never "Presente" / "Present."** The NÓRDICO role ran 2026-07 to 2026-10.
- **Never claim the Journal API is running on AWS.** It was torn down on 2026-11-06: 99 resources destroyed, procedure documented in `docs/cleanup.md`.
- No metric that was not measured.

### What the build established

- **The CV is published as a compiled PDF, not generated from markdown.** `public/cv/rodrigo-amarilla-cv-es.pdf` and `-en.pdf` are synchronized copies of the compiled LaTeX masters. `npm run sync-cv` copies and verifies them; `npm run build` runs the verification first and fails the build when a PDF does not pass. A silent failure here is worse than no button, so the check is part of the build, not a manual step.
- **A real 404 exists.** Cloudflare Pages served the home page for every unmatched path, which made `/cv.pdf` return 200 with `text/html` instead of a PDF. The recruiter believed they had downloaded a CV and got the home page instead.
- **Every route exists in both languages at real URLs.** The locale switcher preserves the current path: `/es/proyectos/journal-api/` becomes `/en/work/journal-api/`.
- **The accent has a hard budget.** At most one accented element per viewport. The accent marks structure and action, never content, and never appears over a light surface. The hero's role line is muted ink so the CTA can hold the accent.
- **Nothing moves except cards.** The accent enters; the component stays. Buttons are 0px.

### Verified facts to publish (measured)

**Journal API** — capstone de cloud engineering, own project. 228 commits. 79 Terraform resources. EC2 `t3.small` running k3s, and also EKS. GitHub OIDC, no permanent keys. Secrets Manager scoped to two exact ARNs. ADOT / X-Ray / CloudWatch with 15 metric series, dashboard and SNS alarms. AWS Config with 13 managed rules and 3 real findings closed. CodeQL + gitleaks. Cost **USD 0.00 measured**, with USD 25/month as the equivalent on-demand price. Torn down 2026-11-06, 99 resources destroyed, procedure in `docs/cleanup.md`. MIT licence, public repo.

**NÓRDICO** — Backend Engineer, 2026-07 to 2026-10. B2B backend for an ice-distribution company, monorepo, team of three developers. Java 25 + Spring Boot 3.5. JWT HS256 with refresh rotation and BCrypt cost 12, OAuth2 resource server, five roles. PostgreSQL 15 with Flyway migrations. OpenAPI 3.1, WebSocket, photographic evidence through AWS SDK v2 over S3. Strict TDD, OpenSpec. Multi-stage Docker, deployed to Railway and Render. **The repository is private and links to it must be removed from the public surfaces.** No internal URLs, no real endpoints, no client data, no screenshots, no reference to the Admin IT bootstrap rule.

**PostulaDo** — NestJS + Prisma + BullMQ/Redis + SGLang with XGrammar and schema-validated output + Cheerio, e2e against real PostgreSQL and Redis in Docker Compose.

**Prime State** — enters the site **only if published first**. The repo exists and is healthy (remote configured, on `main`, nothing unpushed, `.env` gitignored and untracked) but it is private, has no README and no licence, and `github.com/amarillaRodrigo/nutri-prime` returns 404. A project with neither repo nor demo is a claim without evidence.

**Task Tracker** — the "EN VIVO" band on the home, with its live demo and its repository both reachable in one click. Its demo at https://task-tracker-web-two.vercel.app is verified 200.

### Codebase cleanup (confirmed)

- `src/components/Hero.astro`, `ProjectCard.astro` and `ProjectStrip.astro` are dead — nothing imports them since commit `537d489`, and `ProjectStrip`'s script targets `#hero-title` / `#hero-cta`, which only exist in `Hero`.
- `src/pages/index.astro` duplicates the carousel inline with `projects.slice(0, 4)`, and every project page repeats its own inline markup.
- Consolidate on one source: `src/data/projects.ts` + revived `ProjectCard.astro` + a detail template with `getStaticPaths`. NÓRDICO goes in a separate `src/data/experiencia.ts` because it is not a project with a repo or thumbnail.
- The `thumb: '/thumbs/placeholder.svg'` placeholder shows on every card and reads as "unfinished". Either ship real thumbnails or remove the field.
- Empty the public `CVS/` directory. `backend_rodrigoAmarilla_spanish.md` is from May and says "Desarrollador Junior" and "Python (nivel académico)" with no Java, AWS, NÓRDICO or Journal API — it contradicts the current profile. `titulo_amarillaRodrigo.pdf` is the degree certificate, not a CV. A directory called `CVS/` holding a PDF that is not a CV is worse than no directory.
- Remove `.claude/settings.local.json` from the repository. It is committed and public.
- Rewrite `README.md`. It says "Buenos Aires" and documents the `/trabajos` and `/proyectos/[id]` routes that no longer exist (removed in commits `260c921` and `c0c263a`).
- `ENTREVISTA-ATS-PROYECTOS.md` is a May fossil that was never in the repository — it is in `.gitignore` and git log returns no commit for it. Its content was absorbed and superseded by `ai-job-search/.claude/skills/job-application-assistant/07-interview-prep.md`.
- `ai-job-search/.claude/skills/job-application-assistant/07-interview-prep.md` needs corrections: "60 recursos" → 79, "GuardDuty" → AWS Config, "USD 25/mes" → "USD 0,00 medidos" with the ~25 on-demand as the equivalent, a TAB character that broke the word "test" on line 21, plus the 2026-11-06 teardown block.

### GitHub as a second surface (confirmed)

Only 1 of the repos carries a full description. `journal-starter` has the upstream description ("A starter project to help you practice Python + API skills"), which makes the strongest piece of work look like a course template. `journal-starter-pipeline` has its description in Spanish. `PostulaDo`, `task_tracker`, `multicontainer_todo`, `sigeled_own` and `portfolio` have no description, no topics and no licence. The GitHub profile README links the private NÓRDICO repository, which 404s. These are small, high-impact fixes.

### Teardown as interview material

The 2026-11-06 teardown is the best interview material available: build, validate and destroy with a documented procedure. Specifically that the destroy is not atomic because ECR has no `force_delete`, that a preview needs `terraform plan -destroy`, and that the budgets and SSM parameters lived outside Terraform.

## Brand Commitments

- **Name:** Rodrigo Amarilla (on academic documents: WALTER RODRIGO AMARILLA).
- **Voice:** direct, technical, business-outcome oriented. Spanish (Argentina) native, English B2 working proficiency.
- **Email is the primary contact channel.** It is declared as such in `src/data/profileInfoContent.ts` and in the candidate profile.
- **Language:** ES by default at `/es/...`, EN at `/en/...`.
- **The editorial minimal visual identity already exists** in the repo and is incumbent design authority: near-black paper `#0a0a0a`, lemon accent `#fdff00`, Work Sans, uppercase micro-labels with wide letter-spacing, a subtle grid background, and the decode/scramble effect in the navbar and hero. It is a deliberate identity, not an accident.

## Evidence on Hand

**Real, public, verified:**

- Journal API — public MIT repo, 228 commits, 79 Terraform resources. https://github.com/amarillaRodrigo/journal-starter
- Journal API CI/CD mirror — public. https://github.com/amarillaRodrigo/journal-starter-pipeline
- PostulaDo — public. https://github.com/amarillaRodrigo/PostulaDo
- Task Tracker — public, live demo at https://task-tracker-web-two.vercel.app
- Portfolio — public, live at https://rodrigoamarilla.tech
- Documented teardown procedure with execution record — `journal-starter/docs/cleanup.md`

**Real but private:**

- NÓRDICO `nordico-ms` — private client repository. The work is describable; the repository is not linkable.

**Evidence that must not be fabricated:**

- No testimonials, no client logos, no named references. References are available on request.
- No customer counts, no revenue figures, no adoption metrics.
- SIGELED's demo is down and the project left the site. Do not advertise it as live.
- The BSc in Data Science is **in progress**, never completed.
- The three `microLogros` metrics currently in `profileInfoContent.ts` are unsupported and must be removed, not reworded.

## Product Principles

1. **The recruiter decides in 30 seconds.** The email CTA is above the fold and the positioning is legible without scrolling. Nothing important is behind a click that reads as a navigation step.
2. **One profile, one version.** Everything public says the same thing: backend engineer, cloud focus, November 2026. A contradiction between the site, the CV and GitHub is a bug to be fixed, not a variant to be explained.
3. **Only measured numbers.** A number the site cannot source is a liability in front of a hiring manager, not a decoration.
4. **Proof over claim.** Journal API and NÓRDICO lead because they are the strongest evidence, and each case study ends with its known limits — showing judgement, not hiding weakness.
5. **The repository is a public surface.** It is reviewed by the same audience as the site and must be maintained to the same standard.

## Accessibility & Inclusion

- `<html lang>` must follow the locale: it drives screen-reader pronunciation and gates Chrome's auto-translate, which is a recruiter-facing accessibility and reachability issue, not a technicality.
- The site targets LATAM remote and US-East overlap (10:00–19:00 ART). US-East recruiters relying on Chrome's auto-translate must be able to reach the English pages from a shared link.
- Skip-to-content link exists in `BaseLayout.astro` and must survive the rebuild.
- Focus styles are defined globally (`outline: 2px solid accent`) and per component; they must be preserved across the new structure.
