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
    'Soy Rodrigo Amarilla, desarrollador de software enfocado en construir productos web claros, mantenibles y orientados a resultados. Trabajo de punta a punta: desde la arquitectura y la implementación hasta el despliegue, cuidando rendimiento, experiencia de usuario y calidad técnica en cada entrega.',
  formaDeTrabajar: [
    'Traduzco objetivos de negocio a entregables técnicos concretos y medibles.',
    'Trabajo en iteraciones cortas con feedback temprano para ajustar rápido sin perder calidad.',
    'Priorizo código mantenible, automatización de procesos (CI/CD) y una UX simple pero sólida.',
  ],
  stackPrincipal: [
    'Astro',
    'JavaScript/TypeScript',
    'Node.js',
    'React',
    'Next.js',
    'Fastify',
    'PostgreSQL',
    'Docker',
    'Terraform',
    'Ansible',
    'Nginx',
    'GitHub Actions',
    'Tailwind CSS',
  ],
  microLogros: [
    'Implementé un flujo CI/CD que redujo en 40% el tiempo de despliegue manual y estandarizó releases.',
    'Diseñé interfaces minimalistas que mejoraron en 28% la escaneabilidad del contenido en desktop y móvil.',
    'Estructuré proyectos con foco en mantenibilidad y aceleré 2x la incorporación de nuevas funcionalidades.',
  ],
  lineaPersonal:
    'Disfruto convertir problemas complejos en soluciones simples y explicarlas de forma directa.',
  contacto: {
    primario: 'email',
    email: 'amarillarodrigo14@gmail.com',
    emailHref: 'mailto:amarillarodrigo14@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rodrigoamarilla/',
    github: 'https://github.com/amarillaRodrigo',
  },
};
