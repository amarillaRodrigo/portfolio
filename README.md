# Portfolio — Rodrigo Amarilla

Portfolio profesional de **Rodrigo Amarilla**, Backend Engineer con foco en cloud engineering. Un sitio bilingüe (español e inglés) construido con Astro 5 y Tailwind CSS, desplegado en Cloudflare Pages.

- **Producción:** https://rodrigoamarilla.tech
- **CV (ES):** `/cv/rodrigo-amarilla-cv-es.pdf` · **CV (EN):** `/cv/rodrigo-amarilla-cv-en.pdf`

## Stack

- **Framework:** Astro 5.16 (output estático, `trailingSlash: "always"`)
- **Estilos:** Tailwind CSS 3.4
- **Tipografía:** Work Sans (Google Fonts)
- **Animaciones:** JavaScript vanilla — efecto de decodificación en el navbar y el conmutador de idioma, `fade-in` por `IntersectionObserver`
- **Deploy:** Cloudflare Pages (branch `master`, output `dist`)

## Rutas

Todo URL lleva su locale. No hay toggle por `localStorage`: las rutas son reales, compartibles y rastreables.

| Español | English | Contenido |
| --- | --- | --- |
| `/es/` | `/en/` | Home: hero, experiencia, destacados, en vivo, stack y contacto |
| `/es/experiencia/` | `/en/experience/` | NÓRDICO (el repo es privado: no hay link) |
| `/es/proyectos/` | `/en/work/` | Todos los proyectos |
| `/es/proyectos/journal-api/` | `/en/work/journal-api/` | Caso de estudio: Journal API |
| `/es/proyectos/postulado/` | `/en/work/postulado/` | Caso de estudio: PostulaDo |
| `/es/proyectos/task-tracker/` | `/en/work/task-tracker/` | Caso de estudio: Task Tracker |
| `/es/contacto/` | `/en/contact/` | Contacto |
| `/sitemap.xml` | | Todas las rutas en los dos idiomas |
| `/robots.txt` | | |
| `/404.html` | | 404 real (Cloudflare Pages sirve el home para rutas inexistentes si no existe) |

## Estructura

```
src/
  data/
    types.ts            Tipos compartidos: Locale, Localized, CaseStudy
    site.ts             Identidad, contacto, stack, el href del mailto, la ruta del CV
    ui.ts               Todos los textos de la interfaz, en los dos idiomas
    routes.ts           La tabla de rutas: la base del conmutador de idioma
    projects.ts         Los cuatro proyectos, con su caso de estudio en ES y EN
    experiencia.ts       NÓRDICO. Separate porque no es un proyecto con repo ni thumbnail
    profileInfoContent.ts  Contenido de "Sobre mí"
  components/
    Navbar.astro        Navegación con efecto de decodificación + conmutador de idioma
    Footer.astro
    ProjectCard.astro   La tarjeta del carril y del grid
    CaseStudy.astro     La plantilla de caso: Problema → Enfoque → Arquitectura → Resultado → Límites
    EmailCta.astro      El CTA principal: un mailto con subject y body prellenados
  layouts/
    BaseLayout.astro    lang por locale, title/description/OG por locale, hreflang, JSON-LD Person
  pages/
    [locale]/
      index.astro       La home de cinco bloques
      [...path].astro   Contacto, experiencia, índice de proyectos y casos de estudio
    404.astro
    sitemap.xml.ts
    robots.txt.ts
scripts/
  sync-cv.mjs           Sincroniza y verifica los CV publicados
tests/
  external-links.test.js    Todo enlace externo tiene que resolver
  profile-info-content.test.js  Ninguna cifra sin fuente
```

## Desarrollo

```bash
npm install
npm run dev          # servidor de desarrollo
npm run build        # verifica los CV y compila
npm run preview      # sirve el build
npm test             # vitest
```

## El CV no se genera desde markdown

Los CV se compilan desde LaTeX en el repositorio `ai-job-search` y se publican aquí como copias sincronizadas. El origen de verdad es:

| Artefacto | Dónde vive | Quién lo consume |
| --- | --- | --- |
| Fuente LaTeX | `ai-job-search/cv/main_example.tex` + `main_example_en.tex` | `/apply`, `/setup` |
| PDF maestro | `ai-job-search/cv/rodrigoMain.pdf` + `main_example_en.pdf` | `tools/verify_pdf.py` |
| PDF publicado | `portfolio/public/cv/rodrigo-amarilla-cv-es.pdf` + `-en.pdf` | el botón de descarga |

Para re-sincronizar:

```bash
npm run sync-cv            # copia desde la fuente y verifica
npm run sync-cv -- --check # sólo verifica, sin copiar
```

El script falla si el PDF no tiene 2 páginas, si no tiene capa de texto extraíble o si tiene un año unido a un guion Unicode. Si el repositorio hermano no está disponible, define `CV_SOURCE_DIR` con su ruta.

`npm run build` ejecuta `sync-cv --check` antes de compilar: un CV roto no llega a producción.

## Reglas del contenido

Estas reglas son la razón de que el repositorio sea legible por alguien que filtra:

- **Ningún número sin medir.** Si una cifra no sale de un repositorio, un log o un documento, no se publica.
- **Todo enlace externo tiene que resolver.** `tests/external-links.test.js` lo verifica en CI. Un enlace a un destino que no existe es peor que ningún enlace.
- **El repositorio es el enlace principal; la demo es secundaria y siempre verificada.** Las demos se pudren.
- **Una sola versión del perfil en todo lo público.** Si el sitio, el CV y GitHub se contradicen, es un bug.
- **Nada de "Presente".** Los rangos de fechas son cerrados.
- **La IA es una capa transversal, no una identidad.** El sitio se posiciona por Java, Spring Boot y AWS.

## Diseño

`DESIGN.md` documenta el sistema visual ("Documento Técnico") y `PRODUCT.md` el contexto del producto. Ambos son la autoridad: si el código y el documento se contradicen, el documento gana y el código se corrige.

## Licencia

Uso personal de Rodrigo Amarilla.
