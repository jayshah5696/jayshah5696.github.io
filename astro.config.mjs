import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
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
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    mermaid(),
    {
      name: 'custom-esbuild-target',
      hooks: {
        'astro:config:setup'({ updateConfig }) {
          updateConfig({
            vite: {
              plugins: [
                {
                  name: 'override-target-plugin',
                  config(config) {
                    config.build = config.build || {};
                    config.build.target = 'es2022';
                    config.esbuild = config.esbuild || {};
                    config.esbuild.supported = config.esbuild.supported || {};
                    config.esbuild.supported.destructuring = true;
                    config.optimizeDeps = config.optimizeDeps || {};
                    config.optimizeDeps.esbuildOptions = config.optimizeDeps.esbuildOptions || {};
                    config.optimizeDeps.esbuildOptions.target = 'es2022';
                    config.optimizeDeps.esbuildOptions.supported = config.optimizeDeps.esbuildOptions.supported || {};
                    config.optimizeDeps.esbuildOptions.supported.destructuring = true;
                  },
                  configResolved(resolvedConfig) {
                    resolvedConfig.build.target = 'es2022';
                    resolvedConfig.esbuild = resolvedConfig.esbuild || {};
                    resolvedConfig.esbuild.supported = resolvedConfig.esbuild.supported || {};
                    resolvedConfig.esbuild.supported.destructuring = true;
                    resolvedConfig.optimizeDeps = resolvedConfig.optimizeDeps || {};
                    resolvedConfig.optimizeDeps.esbuildOptions = resolvedConfig.optimizeDeps.esbuildOptions || {};
                    resolvedConfig.optimizeDeps.esbuildOptions.target = 'es2022';
                    resolvedConfig.optimizeDeps.esbuildOptions.supported = resolvedConfig.optimizeDeps.esbuildOptions.supported || {};
                    resolvedConfig.optimizeDeps.esbuildOptions.supported.destructuring = true;
                  }
                }
              ]
            }
          });
        }
      }
    }
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
