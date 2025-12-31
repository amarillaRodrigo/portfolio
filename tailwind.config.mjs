/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Work Sans"',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        base: {
          DEFAULT: '#fafafa',
          muted: '#a1a1a1',
        },
        paper: {
          DEFAULT: '#0a0a0a',
          subtle: '#171717',
        },
        accent: {
          DEFAULT: '#fdff00',
          dim: '#d6d800',
        },
      },
      borderRadius: {
        subtle: '8px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.03)',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
};
