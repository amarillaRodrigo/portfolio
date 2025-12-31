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
    id: 'p-001',
    name: 'Editorial Grid Study',
    year: '2024',
    tags: ['UI', 'Editorial', 'CSS'],
    desc: 'Exploración de layouts editoriales con tipografías grandes y grid sutil.',
    href: '/work/editorial-grid-study',
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
