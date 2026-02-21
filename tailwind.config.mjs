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
        // Light mode surface
        cream: {
          50: '#fefdfb',
          100: '#fdf9f1',
          200: '#f5edd8',
          300: '#e8dbc0',
          400: '#d4c4a0',
          500: '#b8a580',
        },
        // Dark mode surface
        night: {
          700: '#2a2438',
          800: '#1e1928',
          900: '#15111e',
          950: '#0d0a14',
        },
        // Terracotta — primary accent
        terra: {
          DEFAULT: '#c4623a',
          light: '#e07a4f',
          dark: '#a34e2d',
        },
        // Gold — secondary accent (haldi/turmeric)
        gold: {
          DEFAULT: '#d4a843',
          light: '#e8c462',
          dark: '#b08a2e',
        },
        // Deep red — rangoli accent
        kumkum: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
        },
        // Peacock teal — rangoli accent
        mor: {
          DEFAULT: '#1a8a7a',
          light: '#2ec4b6',
        },
        // Text
        ink: {
          DEFAULT: '#2c2416',
          light: '#5a4e3a',
          muted: '#8a7d68',
          faint: '#b8ad98',
        },
        // Dark mode text
        silk: {
          DEFAULT: '#e8e0d4',
          muted: '#a89e8e',
          faint: '#6a6058',
        },
      },
      typography: (theme) => ({
        kolam: {
          css: {
            '--tw-prose-body': '#2c2416',
            '--tw-prose-headings': '#1a1408',
            '--tw-prose-lead': '#5a4e3a',
            '--tw-prose-links': '#c4623a',
            '--tw-prose-bold': '#2c2416',
            '--tw-prose-counters': '#8a7d68',
            '--tw-prose-bullets': '#d4a843',
            '--tw-prose-hr': '#e8dbc0',
            '--tw-prose-quotes': '#5a4e3a',
            '--tw-prose-quote-borders': '#c4623a',
            '--tw-prose-captions': '#8a7d68',
            '--tw-prose-code': '#2c2416',
            '--tw-prose-pre-code': '#e8e0d4',
            '--tw-prose-pre-bg': '#1e1928',
            '--tw-prose-th-borders': '#e8dbc0',
            '--tw-prose-td-borders': '#f5edd8',
            '--tw-prose-invert-body': '#e8e0d4',
            '--tw-prose-invert-headings': '#fefdfb',
            '--tw-prose-invert-lead': '#a89e8e',
            '--tw-prose-invert-links': '#e07a4f',
            '--tw-prose-invert-bold': '#e8e0d4',
            '--tw-prose-invert-counters': '#a89e8e',
            '--tw-prose-invert-bullets': '#e8c462',
            '--tw-prose-invert-hr': '#2a2438',
            '--tw-prose-invert-quotes': '#a89e8e',
            '--tw-prose-invert-quote-borders': '#e07a4f',
            '--tw-prose-invert-captions': '#6a6058',
            '--tw-prose-invert-code': '#e8e0d4',
            '--tw-prose-invert-pre-code': '#e8e0d4',
            '--tw-prose-invert-pre-bg': '#0d0a14',
            '--tw-prose-invert-th-borders': '#2a2438',
            '--tw-prose-invert-td-borders': '#1e1928',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
