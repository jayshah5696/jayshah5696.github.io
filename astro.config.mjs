import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://jayshah.dev',
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap(),
    mermaid(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
