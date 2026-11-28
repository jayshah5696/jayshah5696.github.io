import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const blogDir = path.resolve(rootDir, 'src/content/blog');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: content };
  const yaml = match[1];
  const body = content.slice(match[0].length).trim();
  const meta = {};

  let currentKey = null;
  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentKey) {
      if (!Array.isArray(meta[currentKey])) {
        meta[currentKey] = [];
      }
      meta[currentKey].push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      currentKey = key;
      if (val) {
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        meta[key] = val;
      }
    }
  }
  return { meta, body };
}

// 1. Generate Markdown for all blog posts
if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    const mdContent = [
      `# ${meta.title || slug}`,
      ``,
      `> ${meta.description || ''}`,
      ``,
      `- **Date:** ${meta.date || ''}`,
      `- **Author:** Jay Shah (https://jayshah.dev)`,
      `- **Tags:** ${Array.isArray(meta.tags) ? meta.tags.join(', ') : meta.tags || ''}`,
      `- **Canonical URL:** https://jayshah.dev/posts/${slug}/`,
      ``,
      `---`,
      ``,
      body,
    ].join('\n');

    const postDir = path.join(distDir, 'posts', slug);
    fs.mkdirSync(postDir, { recursive: true });
    fs.writeFileSync(path.join(postDir, 'index.md'), mdContent, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'posts', `${slug}.md`), mdContent, 'utf-8');
  }
}

// 2. Keep Astro-generated dist/index.md as the single source of truth (from src/pages/index.md.ts)
if (!fs.existsSync(path.join(distDir, 'index.md')) && fs.existsSync(path.join(distDir, 'llms.txt'))) {
  fs.copyFileSync(path.join(distDir, 'llms.txt'), path.join(distDir, 'index.md'));
}

// 3. Copy dist/404.md from public/404.md if present
const publicNotFoundMd = path.join(rootDir, 'public/404.md');
if (fs.existsSync(publicNotFoundMd)) {
  fs.copyFileSync(publicNotFoundMd, path.join(distDir, '404.md'));
}

// 4. Mirror Astro-generated root Markdown routes into directory index.md alternates
for (const section of ['about', 'projects', 'reads']) {
  const srcMd = path.join(distDir, `${section}.md`);
  if (fs.existsSync(srcMd)) {
    const targetDir = path.join(distDir, section);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(srcMd, path.join(targetDir, 'index.md'));
  }
}

console.log('✓ Generated static Markdown variants in dist/');
