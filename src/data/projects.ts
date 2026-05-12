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
  {
    id: 'p-002',
    name: 'Minimal Portfolio',
    year: '2023',
    tags: ['Astro', 'Tailwind'],
    desc: 'Un portfolio minimalista con foco en claridad y accesibilidad.',
    href: '/work/minimal-portfolio',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'p-003',
    name: 'Type & Rhythm',
    year: '2022',
    tags: ['Typography', 'UX'],
    desc: 'Sistema tipográfico con ritmo vertical y componentes reutilizables.',
    href: '/work/type-and-rhythm',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'p-004',
    name: 'Pattern Library',
    year: '2021',
    tags: ['Design System', 'Docs'],
    desc: 'Biblioteca de patrones con documentación y ejemplos interactivos.',
    href: '/work/pattern-library',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'p-005',
    name: 'Motion Basics',
    year: '2020',
    tags: ['Animation', 'CSS'],
    desc: 'Transiciones sutiles, estados de foco y aparición con IntersectionObserver.',
    href: '/work/motion-basics',
    thumb: '/thumbs/placeholder.svg',
  },
  {
    id: 'p-006',
    name: 'Index Archive',
    year: '2019',
    tags: ['Archive', 'Table'],
    desc: 'Listado tipo índice con año, nombre, tags y enlaces.',
    href: '/work/index-archive',
    thumb: '/thumbs/placeholder.svg',
  },
];
