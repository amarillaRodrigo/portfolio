export type ProfileInfoContent = {
  resumen: string;
  formaDeTrabajar: string[];
  stackPrincipal: string[];
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
    'Backend Engineer con foco en cloud engineering. Diseño y mantengo APIs REST y microservicios en producción, y los despliego en AWS con Kubernetes, Terraform y CI/CD. Trabajo con Java y Spring Boot, Node.js y TypeScript, Python y FastAPI, PostgreSQL y Docker. Construyo backends que llegan a usuarios reales: modelado relacional con migraciones versionadas, autenticación y autorización, TDD estricto, infraestructura como código y observabilidad con trazas, métricas y alarmas.',
  formaDeTrabajar: [
    'Traduzco objetivos de negocio a entregables técnicos concretos y medibles.',
    'Trabajo en iteraciones cortas con feedback temprano para ajustar rápido sin perder calidad.',
    'Priorizo código mantenible, automatización de procesos (CI/CD) y una UX simple pero sólida.',
  ],
  stackPrincipal: [
    'Java 25',
    'Spring Boot 3.5',
    'Node.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Kubernetes',
    'Terraform',
    'AWS',
    'GitHub Actions',
    'Tailwind CSS',
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
