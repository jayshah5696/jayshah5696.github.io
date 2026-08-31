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

// 2. Generate dist/index.md
const indexMd = fs.readFileSync(path.join(rootDir, 'public/llms.txt'), 'utf-8');
fs.writeFileSync(path.join(distDir, 'index.md'), indexMd, 'utf-8');

// 3. Generate dist/404.md
const notFoundMd = fs.readFileSync(path.join(rootDir, 'public/404.md'), 'utf-8');
fs.writeFileSync(path.join(distDir, '404.md'), notFoundMd, 'utf-8');

// 4. Generate dist/about/index.md and dist/about.md
const aboutMd = [
  `# Jay Shah — About & Research Background`,
  ``,
  `Senior Machine Learning Engineer at 6sense building production AI applications, foundational model systems, and agent evaluation frameworks.`,
  ``,
  `## Experience`,
  `- **6sense** (Current): Intent intelligence, foundational models with custom embeddings, explainability, knowledge graphs, and LLM agent evaluation systems.`,
  `- **Avathon**: RAG platforms, Model Context Protocol agent platforms, anomaly detection, and foundation-model operations.`,
  `- **Texas A&M University**: Graduate research focusing on predicting wind-energy failures and statistical ML.`,
  ``,
  `## Patents`,
  `- US20230213560A1: Calculating energy loss during an outage`,
  `- US20230214703A1: Predicting energy production for energy generating assets`,
  `- IN201721044402A: Dimension Measurement Using Image Processing`,
  ``,
  `## Links`,
  `- Website: https://jayshah.dev`,
  `- Resume: https://cv.jayshah.dev`,
  `- GitHub: https://github.com/jayshah5696`,
  `- LinkedIn: https://linkedin.com/in/jayshah5696`,
  `- Hugging Face: https://huggingface.co/jayshah5696`,
].join('\n');

const aboutDir = path.join(distDir, 'about');
fs.mkdirSync(aboutDir, { recursive: true });
fs.writeFileSync(path.join(aboutDir, 'index.md'), aboutMd, 'utf-8');
fs.writeFileSync(path.join(distDir, 'about.md'), aboutMd, 'utf-8');

// 5. Generate dist/projects/index.md and dist/projects.md
const projectsMd = [
  `# Jay Shah — Engineering Projects & Open Source Repositories`,
  ``,
  `Curated open source machine learning systems, agent extensions, and data engineering tools:`,
  ``,
  `- **Pi Agent Extensions**: Extensions and tools for Pi coding agent (https://github.com/jayshah5696/pi-agent-extensions)`,
  `- **Session Aggregator**: Sync and export AI coding sessions across tools (https://github.com/jayshah5696/session-aggregator)`,
  `- **Medha (मेधा) IDE**: Local-first SQL IDE with DuckDB & LangGraph (https://github.com/jayshah5696/medha)`,
  `- **Arka (अर्क)**: Config-driven fine-tuning data pipeline (https://github.com/jayshah5696/arka)`,
  `- **Humanizer-RL**: Reinforcement learning reward pipeline for Gemma (https://github.com/jayshah5696/humanize-rl)`,
  `- **Text Watermarking Lab**: Statistical text watermarking experiments (https://github.com/jayshah5696/text-watermarking-lab)`,
  `- **ER Metric & Model POC**: Entity resolution benchmarking with MRL & BM25 (https://github.com/jayshah5696/entity-resolution-poc)`,
  `- **Pravāha AI Search Engine**: Local search assistant (https://github.com/jayshah5696/pravah)`,
  `- **Gujarati Llama**: Bilingual English-Gujarati 7B LLM (https://huggingface.co/jayshah5696/Gujarati-Llama-7b-Base)`,
].join('\n');

const projectsDir = path.join(distDir, 'projects');
fs.mkdirSync(projectsDir, { recursive: true });
fs.writeFileSync(path.join(projectsDir, 'index.md'), projectsMd, 'utf-8');
fs.writeFileSync(path.join(distDir, 'projects.md'), projectsMd, 'utf-8');

console.log('✓ Generated static Markdown variants in dist/');
