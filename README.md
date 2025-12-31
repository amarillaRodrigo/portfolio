# Portfolio editorial con Astro + Tailwind

Un portfolio minimalista con estilo editorial: tipografía grande, grid de fondo sutil y un strip horizontal de proyectos que actualiza el hero.

## Correr el proyecto

```bash
npm install
npm run dev
```

## Estructura

```
src/
	layouts/
		BaseLayout.astro
	pages/
		index.astro
		info.astro
		archive.astro
	components/
		Navbar.astro
		Hero.astro
		ProjectStrip.astro
		ProjectCard.astro
		Footer.astro
	data/
		projects.ts
	styles/
		global.css
public/
	thumbs/
		placeholder.svg
```

## Editar proyectos

- Abre `src/data/projects.ts` y modifica/añade objetos con la forma:

```ts
{
	id: string,
	name: string,
	year: string,
	tags: string[],
	desc: string,
	href: string,
	thumb?: string
}
```

## Colores y tipografía

- Colores base y `accent` en `tailwind.config.mjs`.
- Tipografía usa system fonts (`fontFamily.sans`), ajustable en `tailwind.config.mjs`.
- Escalas (`.h1`, `.h2`, `.body`) en `src/styles/global.css`.
- Fondo con grid sutil definido en `body` dentro de `global.css`.

## Accesibilidad y performance

- Navegación con teclado, focus visible (`:focus-visible`).
- Imágenes con `loading="lazy"`.
- Sin librerías pesadas de animación; IntersectionObserver para aparición.

## Rutas

- `/` → Work
- `/info` → Info
- `/archive` → Archive
