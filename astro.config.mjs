import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mermaid from 'astro-mermaid';

// Wrap Markdown tables in a horizontal scroll box so wide tables scroll
// inside the article instead of widening the whole page on mobile.
function rehypeScrollTables() {
  const wrap = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      wrap(child);
      if (child.type !== 'element' || child.tagName !== 'table') return child;
      return { type: 'element', tagName: 'div', properties: { className: ['table-scroll'] }, children: [child] };
    });
  };
  return wrap;
}

export default defineConfig({
  site: 'https://jayshah.dev',
  trailingSlash: 'always',
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
      rehypeScrollTables,
    ],
  },
});
