# Portfolio Personal - Rodrigo Amarilla

Portfolio profesional minimalista con efectos de decodificación y carrete horizontal de proyectos. Construido con Astro + Tailwind CSS.

## 🚀 Características

- Diseño minimalista con tipografía Work Sans
- Efecto de decodificación/scramble en navegación y hero
- Carrete horizontal de proyectos con scroll
- Reloj en tiempo real con zona horaria de Buenos Aires
- Diseño completamente responsive
- Colores de acento amarillo (#FDFF00)
- Páginas de detalle para cada proyecto

## 🛠️ Stack Tecnológico

- **Framework:** Astro 5.16.5
- **Estilos:** Tailwind CSS 3.4.19
- **Tipografía:** Work Sans (Google Fonts)
- **Animaciones:** JavaScript Vanilla
- **Deploy:** Cloudflare Pages

## 📦 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
  layouts/
    BaseLayout.astro          # Layout base con navbar y footer
  pages/
    index.astro               # Redirección a /trabajos
    trabajos.astro            # Página principal con carrete de proyectos
    info.astro                # Información personal
    archive.astro             # Archivo de proyectos
    proyectos/
      sigeled.astro           # Detalle del proyecto Sigeled
  components/
    Navbar.astro              # Navegación con efecto decode
    Footer.astro              # Footer del sitio
  data/
    projects.ts               # Datos de proyectos
  styles/
    global.css                # Estilos globales y tipografía
public/
  thumbs/                     # Thumbnails de proyectos
docs/
  journal.md                  # Diario de desarrollo
```

## 🎨 Personalización

### Agregar Proyectos

Edita `src/data/projects.ts`:

```ts
{
  id: 'proyecto-id',
  name: 'Nombre del Proyecto',
  year: '2024',
  tags: ['React', 'Node.js', 'PostgreSQL'],
  desc: 'Descripción breve del proyecto',
  href: '/proyectos/proyecto-id',
  thumb: '/thumbs/proyecto.svg',
}
```

Luego crea la página de detalle en `src/pages/proyectos/proyecto-id.astro`.

### Colores

Los colores principales se definen en `tailwind.config.mjs`:

```js
colors: {
  accent: {
    DEFAULT: '#fdff00',  // Lemon Glacier
    dim: '#d6d800',
  },
}
```

### Tipografía

La fuente Work Sans se importa en `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
```

## 🌐 Rutas

- `/` → Redirige a `/trabajos`
- `/trabajos` → Página principal con proyectos
- `/info` → Información personal
- `/archive` → Archivo de proyectos
- `/proyectos/[id]` → Detalle de proyecto específico

## ✨ Efectos Especiales

### Efecto Decode

Los enlaces del navbar y el texto del hero incluyen un efecto de "decodificación" que:
- Se activa en hover/focus
- Muestra caracteres aleatorios (A-Z, 0-9)
- Revela gradualmente el texto original
- Incluye decoraciones con llaves `{ }` en amarillo

### Carrete de Proyectos

Sección horizontal con scroll que muestra tarjetas de proyectos:
- Hover effect con elevación y borde amarillo
- Muestra nombre, año y tags de cada proyecto
- Links clicables a páginas de detalle
- Responsive en tablets y móviles

## 🔧 Configuración de Deploy

El proyecto está configurado para deploy en Cloudflare Pages:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** `master`

## 📝 Historial de Desarrollo

Ver `docs/journal.md` para un registro detallado de todas las decisiones de diseño y cambios realizados durante el desarrollo.

## 🎯 Próximos Pasos

- [ ] Agregar más proyectos al carrete
- [ ] Implementar sistema de filtrado por tags
- [ ] Agregar imágenes/capturas reales de proyectos
- [ ] Integrar analytics
- [ ] Agregar modo oscuro/claro

## 📄 Licencia

Este proyecto es de uso personal para Rodrigo Amarilla.

---

**Desarrollado por Rodrigo Amarilla** | Buenos Aires, Argentina | 2024-2025
