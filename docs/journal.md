# Diario de desarrollo

## 2025-12-15
- Elegí Astro como framework para el portafolio porque está pensado para sitios que muestran contenido más que para aplicaciones web complejas. Se basa en cargar los recursos del lado del servidor y enviar HTML estático al cliente, lo que mejora la velocidad de carga y el SEO.
- Seguí el tutorial oficial para crear un proyecto básico con Astro.

## 2025-12-21
- Cambié la paleta de colores accent de verde lima a amarillo Lemon Glacier (#FDFF00) para darle un toque más vibrante y estético al portfolio. Actualicé todos los estados hover, focus y selección.
- Cambié la tipografía del proyecto a Work Sans, importándola desde Google Fonts.
- Implementé un efecto de "decodificación" en los enlaces del navbar: al pasar el mouse, el texto se codifica con caracteres aleatorios y luego se decodifica letra por letra. Añadí llaves `{}` amarillas que aparecen y se animan en hover/focus.
- Creé la página principal de Trabajos (`/trabajos`) con efecto de bienvenida: al cargar, aparece "BIENVENIDO" que se decodifica, hace una pausa y luego transiciona a "RODRIGO AMARILLA" con el mismo efecto.
- Diseñé el layout principal usando grid de 4 columnas: nombre (izquierda, font-weight 300, 5rem), título profesional, ubicación y hora en tiempo real. Las columnas de info están posicionadas a 18rem de margin-left con alineamiento vertical centrado.
- Añadí prop `noPadding` al BaseLayout para permitir control total del espacio horizontal en páginas específicas.
- Desactivé el riel lateral del nombre para mantener la vista limpia.
- Implementé diseño responsivo: en tablets (≤1024px) el layout cambia a columna única con nombre a 3.5rem, en móviles (≤640px) el nombre baja a 2.5rem y el texto de información a 0.65rem.
- Agregué una sección de proyectos tipo "tren" horizontal debajo del contenido principal con scroll horizontal. Los vagones son tarjetas de 350x240px alineadas desde la izquierda (padding 2rem) con hover effect que levanta la tarjeta y cambia el borde a amarillo.
- Ajusté el layout vertical para que todo quepa en una vista: min-height de 62vh en la sección principal y padding de 1.5rem en la sección de proyectos, posicionando las tarjetas exactamente en el límite del borde inferior sin cortarse.
- Configuré la ruta raíz (/) para redirigir a `/trabajos` y actualicé el navbar con los enlaces correctos (Trabajos, Info, Archive).

## 2026-11-06
### Reconstrucción del sitio como portfolio de un Backend Engineer con foco en cloud

El sitio estaba posicionado como el portfolio de un desarrollador full stack junior, y la información era de mayo. La fuente de verdad del perfil pasó a estar en `ai-job-search` (los dos CV maestros en LaTeX), y el sitio se reconstruyó para decir exactamente lo mismo.

**Por qué.** El visitante principal es un recruiter o talent screener con 30 segundos que llega desde un ATS o LinkedIn a validar fit contra una JD. El sitio hoy decía "Desarrollador de Software", mostraba "Buenos Aires" como ubicación, no tenía ninguna acción, no tenía inglés y no mencionaba los dos proyectos que diferencian el perfil. Eso es un problema de contenido y estructura, no de dirección visual: el sistema de diseño ya existía y es distintivo.

**Qué cambió.**

- **Posicionamiento.** El hero dice "Backend Engineer". La ubicación es "Formosa, Argentina" más "Remote-first (LATAM + US-East overlap) · Open to relocate to Buenos Aires". NÚRDICO aparece como bloque de Experiencia con fechas cerradas (2026-07 a 2026-10), nunca "Presente". Se agrega "Disponible para nuevas oportunidades" porque NÓRDICO terminó el 31/10/2026.
- **Cinco bloques en la home**, en este orden: hero, experiencia, proyectos destacados (Journal API, PostulaDo), otros proyectos (Task Tracker, Multi-Container App), stack y contacto. La acción principal es el email: un `mailto:` con subject y body prellenados, arriba del fold, repetido al final de cada caso de estudio.
- **Bilingüe con URLs reales.** ES en `/es/...` y EN en `/en/...`, cada ruta en los dos idiomas, `<html lang>` siguiendo al locale, y un conmutador a un click que conserva la ruta actual. Nada de toggle por localStorage: rompe los links compartidos y esconde el sitio de los buscadores. El inglés está escrito en voz propia siguiendo el CV maestro EN.
- **SEO.** `title`, `description` y Open Graph por locale — hoy eran `<title>Home</title>` y "Portfolio editorial minimalista", que es literalmente lo que un recruiter ve en el preview del link. Se agregaron `sitemap.xml`, `robots.txt`, JSON-LD `Person` y un `og.png` de 1200×630.
- **404 real.** Cloudflare Pages servía el home para toda ruta inexistente: `/cv.pdf` devolvía 200 con `text/html` en vez de un PDF, así que el click de descarga del CV fallaba en silencio. Ahora hay un `404.html` de verdad.
- **CV real.** Los CV se compilan desde LaTeX en `ai-job-search` y se publican como copias sincronizadas en `public/cv/`. `npm run sync-cv` los copia y verifica (2 páginas, capa de texto extraíble, fechas ASCII) y `npm run build` falla si no pasan los checks. Corregí "GuardDuty" por "AWS Config" en los 8 `.tex` donde aparecía: GuardDuty nunca se habilitó porque la cuenta no tiene método de pago, y el threat detection real es AWS Config con 13 reglas gestionadas y 3 hallazgos cerrados.
- **Números medidos.** Se sacaron las tres métricas inventadas de `profileInfoContent.ts` ("40% menos tiempo de deploy", "28% escaneabilidad", "2x features") y se reescribió el test que las exigía: ahora verifica que cualquier cifra publicada tenga fuente. El Journal API pasó de 205 a 228 commits y de ~60 a 79 recursos de Terraform.
- **Limpieza del repo público.** Se vació `CVS/` (el markdown de mayo decía "Desarrollador Junior" y el PDF era el título de carrera, no el CV), se sacó `.claude/settings.local.json` del repositorio, se reescribió el `README.md` y se borró `ENTREVISTA-ATS-PROYECTOS.md`, que era un fósil de mayo nunca versionado.
- **Duplicación resuelta.** `Hero.astro`, `ProjectStrip.astro` y el carrusel inline de `index.astro` eran tres implementaciones de lo mismo, y las cuatro páginas de proyecto repetían su markup. Ahora hay una sola fuente: `src/data/projects.ts` más `ProjectCard.astro` y una plantilla de detalle con `getStaticPaths`.
- **Links que no se pudren.** `tests/external-links.test.js` recorre las URLs declaradas y falla si alguna no resuelve. SIGELED salió del sitio entero: no está en ninguno de los dos CV maestros y su única demo devolvía 503.
- **GitHub como segunda superficie.** Descriptions y topics en los seis repos públicos, licencias MIT donde faltaban, y el README del perfil reescrito (se fue el link muerto al repo privado de NÓRDICO y entró Journal API).
