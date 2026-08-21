/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        base: '16px', // Slightly larger base for better readability
      },
      fontFamily: {
        display: ['Outfit Variable', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['Outfit Variable', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Menlo', 'monospace'],
      },
      colors: {
        // Light mode surface — neutral white canvas + alpha-black rungs
        cream: {
          50: '#ffffff',
          100: 'rgb(0 0 0 / 4%)',
          200: 'rgb(0 0 0 / 10%)',
          300: 'rgb(0 0 0 / 18%)',
          400: 'rgb(0 0 0 / 44%)',
          500: 'rgb(0 0 0 / 64%)',
        },
        // Dark mode surface — near-black canvas + alpha-white rungs
        night: {
          700: 'rgb(255 255 255 / 12%)',
          800: 'rgb(255 255 255 / 9%)',
          900: '#0a0a0a',
          950: '#000000',
        },
        // Single permitted brand accent
        terra: {
          DEFAULT: '#c4623a',
          light: '#e07a4f',
          dark: '#a34e2d',
        },
        // Neutralized former decorative accents (kept for token compatibility)
        gold: {
          DEFAULT: 'rgb(0 0 0 / 56%)',
          light: 'rgb(0 0 0 / 44%)',
          dark: 'rgb(255 255 255 / 56%)',
        },
        kumkum: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
        },
        mor: {
          DEFAULT: 'rgb(0 0 0 / 56%)',
          light: 'rgb(0 0 0 / 44%)',
        },
        // Text — light mode ink ladder
        ink: {
          DEFAULT: '#000000',
          light: 'rgb(0 0 0 / 64%)',
          muted: 'rgb(0 0 0 / 56%)',
          faint: 'rgb(0 0 0 / 44%)',
        },
        // Dark mode text ladder
        silk: {
          DEFAULT: '#ffffff',
          muted: 'rgb(255 255 255 / 56%)',
          faint: 'rgb(255 255 255 / 46%)',
        },
      },
      typography: (theme) => ({
        kolam: {
          css: {
            '--tw-prose-body': '#000000',
            '--tw-prose-headings': '#000000',
            '--tw-prose-lead': 'rgb(0 0 0 / 64%)',
            '--tw-prose-links': '#c4623a',
            '--tw-prose-bold': '#000000',
            '--tw-prose-counters': 'rgb(0 0 0 / 56%)',
            '--tw-prose-bullets': 'rgb(0 0 0 / 40%)',
            '--tw-prose-hr': 'rgb(0 0 0 / 10%)',
            '--tw-prose-quotes': 'rgb(0 0 0 / 64%)',
            '--tw-prose-quote-borders': 'rgb(0 0 0 / 20%)',
            '--tw-prose-captions': 'rgb(0 0 0 / 56%)',
            '--tw-prose-code': '#000000',
            '--tw-prose-pre-code': '#e8e0d4',
            '--tw-prose-pre-bg': '#161616',
            '--tw-prose-th-borders': 'rgb(0 0 0 / 10%)',
            '--tw-prose-td-borders': 'rgb(0 0 0 / 6%)',
            '--tw-prose-invert-body': '#ffffff',
            '--tw-prose-invert-headings': '#ffffff',
            '--tw-prose-invert-lead': 'rgb(255 255 255 / 56%)',
            '--tw-prose-invert-links': '#e07a4f',
            '--tw-prose-invert-bold': '#ffffff',
            '--tw-prose-invert-counters': 'rgb(255 255 255 / 56%)',
            '--tw-prose-invert-bullets': 'rgb(255 255 255 / 40%)',
            '--tw-prose-invert-hr': 'rgb(255 255 255 / 12%)',
            '--tw-prose-invert-quotes': 'rgb(255 255 255 / 56%)',
            '--tw-prose-invert-quote-borders': 'rgb(255 255 255 / 24%)',
            '--tw-prose-invert-captions': 'rgb(255 255 255 / 56%)',
            '--tw-prose-invert-code': '#ffffff',
            '--tw-prose-invert-pre-code': '#e8e0d4',
            '--tw-prose-invert-pre-bg': '#000000',
            '--tw-prose-invert-th-borders': 'rgb(255 255 255 / 12%)',
            '--tw-prose-invert-td-borders': 'rgb(255 255 255 / 8%)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
