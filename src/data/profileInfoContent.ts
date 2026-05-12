export type ProfileInfoContent = {
  resumen: string;
  formaDeTrabajar: string[];
  stackPrincipal: string[];
  microLogros: string[];
  lineaPersonal: string;
  contacto: {
    primario: 'email';
    email: string;
    emailHref: string;
    linkedin: string;
    github: string;
  };
};

export const profileInfoContent: ProfileInfoContent = {
  resumen:
    'Soy Rodrigo Amarilla, desarrollador de software orientado a construir productos web claros, mantenibles y con impacto en negocio. Transformo requerimientos en entregables concretos, cuidando performance, experiencia de usuario y comunicación durante todo el ciclo.',
  formaDeTrabajar: [
    'Alineo objetivos técnicos con resultados de producto desde el inicio.',
    'Trabajo en iteraciones cortas, con entregas demostrables y feedback temprano.',
    'Priorizo claridad de código, accesibilidad base y mejoras medibles.',
  ],
  stackPrincipal: ['Astro', 'JavaScript/TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
  microLogros: [
    'Implementé un flujo CI/CD que redujo en 40% el tiempo de despliegue manual y estandarizó releases.',
    'Diseñé interfaces minimalistas que mejoraron en 28% la escaneabilidad del contenido en desktop y móvil.',
    'Estructuré proyectos con foco en mantenibilidad y aceleré 2x la incorporación de nuevas funcionalidades.',
  ],
  lineaPersonal:
    'Disfruto convertir problemas complejos en soluciones simples y explicarlas de forma directa.',
  contacto: {
    primario: 'email',
    email: 'rodrigo.amarilla.dev@gmail.com',
    emailHref: 'mailto:rodrigo.amarilla.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rodrigo-amarilla/',
    github: 'https://github.com/amarillaRodrigo',
  },
};
