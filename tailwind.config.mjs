/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Yeseva One', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Menlo', 'monospace'],
      },
      colors: {
        // Sandstone — the primary neutral scale (warm stone tones)
        sand: {
          50: '#faf8f4',
          100: '#f3efe6',
          200: '#e5dece',
          300: '#d2c7ad',
          400: '#bbab88',
          500: '#a3926a',
          600: '#8a7854',
          700: '#6e5f43',
          800: '#534738',
          900: '#3b3229',
          950: '#231e19',
        },
        // Deep carved shadow tones (for dark mode and depth)
        carved: {
          50: '#f5f3ef',
          100: '#e8e3da',
          200: '#cfc5b2',
          300: '#b5a68a',
          400: '#998765',
          500: '#7d6c4f',
          600: '#63553e',
          700: '#4a3f30',
          800: '#332b22',
          900: '#1e1a15',
          950: '#110f0c',
        },
        // Terracotta accent — temple red/orange
        terra: {
          DEFAULT: '#c4623a',
          light: '#d87a52',
          dark: '#a34e2d',
          muted: '#9e6b52',
        },
        // Indigo — secondary accent (from natural dye)
        neel: {
          DEFAULT: '#2d4a7a',
          light: '#4a6fa3',
          dark: '#1e3258',
        },
        // Stepwell water — used sparingly for highlights
        jal: {
          DEFAULT: '#3a8a7c',
          light: '#5aad9e',
          dark: '#2a6b5f',
        },
        // Turmeric — warm highlight
        haldi: {
          DEFAULT: '#d4a843',
          light: '#e4c46a',
          dark: '#b08a2e',
        },
        // Background surfaces
        paper: {
          DEFAULT: '#f8f5ee', // raw cotton / unbleached paper
          dark: '#15120e',   // deep carved shadow
        },
      },
      backgroundImage: {
        // Subtle kolam dot pattern (CSS-only, no images)
        'kolam-dots': 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)',
        // Stepwell depth layer
        'step-down': 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 100%)',
        'step-down-dark': 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.02) 100%)',
      },
      backgroundSize: {
        'kolam': '20px 20px',
      },
      typography: (theme) => ({
        sandstone: {
          css: {
            '--tw-prose-body': theme('colors.carved.800'),
            '--tw-prose-headings': theme('colors.carved.950'),
            '--tw-prose-lead': theme('colors.sand.600'),
            '--tw-prose-links': theme('colors.terra.DEFAULT'),
            '--tw-prose-bold': theme('colors.carved.900'),
            '--tw-prose-counters': theme('colors.sand.500'),
            '--tw-prose-bullets': theme('colors.sand.400'),
            '--tw-prose-hr': theme('colors.sand.300'),
            '--tw-prose-quotes': theme('colors.carved.700'),
            '--tw-prose-quote-borders': theme('colors.terra.DEFAULT'),
            '--tw-prose-captions': theme('colors.sand.500'),
            '--tw-prose-code': theme('colors.carved.900'),
            '--tw-prose-pre-code': theme('colors.sand.200'),
            '--tw-prose-pre-bg': theme('colors.carved.900'),
            '--tw-prose-th-borders': theme('colors.sand.300'),
            '--tw-prose-td-borders': theme('colors.sand.200'),
            '--tw-prose-invert-body': theme('colors.sand.200'),
            '--tw-prose-invert-headings': theme('colors.sand.50'),
            '--tw-prose-invert-lead': theme('colors.sand.400'),
            '--tw-prose-invert-links': theme('colors.terra.light'),
            '--tw-prose-invert-bold': theme('colors.sand.100'),
            '--tw-prose-invert-counters': theme('colors.sand.500'),
            '--tw-prose-invert-bullets': theme('colors.sand.500'),
            '--tw-prose-invert-hr': theme('colors.carved.700'),
            '--tw-prose-invert-quotes': theme('colors.sand.300'),
            '--tw-prose-invert-quote-borders': theme('colors.terra.DEFAULT'),
            '--tw-prose-invert-captions': theme('colors.sand.500'),
            '--tw-prose-invert-code': theme('colors.sand.100'),
            '--tw-prose-invert-pre-code': theme('colors.sand.200'),
            '--tw-prose-invert-pre-bg': theme('colors.carved.950'),
            '--tw-prose-invert-th-borders': theme('colors.carved.600'),
            '--tw-prose-invert-td-borders': theme('colors.carved.700'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
