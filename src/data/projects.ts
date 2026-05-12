export type Project = {
  id: string;
  name: string;
  year: string;
  tags: string[];
  desc: string;
  href: string;
  thumb?: string;
};

export const projects: Project[] = [
  {
    id: 'multi-container-app',
    name: 'Multi-Container App',
    year: '2026',
    tags: ['Docker', 'Terraform', 'CI/CD'],
    desc: 'API de TODOs en Node.js dockerizada con CI/CD (GitHub Actions), infraestructura como código (Terraform, Ansible) y proxy Nginx.',
    href: '/proyectos/multi-container-app',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'sigeled',
    name: 'Sigeled',
    year: '2025',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    desc: 'Sistema de Gestión de Legajos Docentes. Plataforma integral para digitalizar y automatizar la administración documental del personal educativo.',
    href: '/proyectos/sigeled',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'task-tracker',
    name: 'Task Tracker',
    year: '2026',
    tags: ['Next.js', 'Fastify', 'PostgreSQL'],
    desc: 'A minimalist daily task tracker with a live countdown to end of day. Fullstack pnpm monorepo with REST API, CLI, and web frontend.',
    href: '/proyectos/task-tracker',
    thumb: '/thumbs/placeholder.svg',
  },
];
