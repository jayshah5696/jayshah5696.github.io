#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(`Usage: node scripts/publish-interactive.js <source-html-path> <slug> [tags-comma-separated] [date-yyyy-mm-dd]`);
  process.exit(1);
}

const [sourceHtmlPath, slug, customTags, customDate] = args;

if (!fs.existsSync(sourceHtmlPath)) {
  console.error(`Error: Source HTML file not found at: ${sourceHtmlPath}`);
  process.exit(1);
}

const rawHtml = fs.readFileSync(sourceHtmlPath, 'utf8');

// 1. Extract metadata
const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
let title = titleMatch ? titleMatch[1].trim() : 'Interactive Report';
title = title.replace(/\s+/g, ' ');

const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
const description = descMatch ? descMatch[1].trim() : 'A first-principles interactive report.';

const tags = customTags ? customTags.split(',').map(t => t.trim()) : ['ai-safety', 'llm', 'watermarking', 'gen-ai', 'research'];
const date = customDate ? customDate : '2026-08-16';

// 2. Extract premise strip and main content
const premiseMatch = rawHtml.match(/(<div class="premise-strip">[\s\S]*?<\/div>\s*<\/div>\s*<\/header>)/i);
const premiseHtml = premiseMatch ? premiseMatch[1].replace(/<\/div>\s*<\/header>/, '') : '';

const mainMatch = rawHtml.match(/<main class="article shell">([\s\S]*?)<\/main>/i);
let mainHtml = mainMatch ? mainMatch[1] : '';

// Remove duplicate h1 inside main
mainHtml = mainHtml.replace(/<h1>[\s\S]*?<\/h1>/i, '');
// Remove raw noscript banner if present
mainHtml = mainHtml.replace(/<aside class="noscript[\s\S]*?<\/aside>/i, '');

// Convert <h2> headings to standard markdown ## for clean TOC & scrollspy
mainHtml = mainHtml.replace(/<h2(?:\s+[^>]*)?>([\s\S]*?)<\/h2>/gi, (match, content) => {
  const textClean = content.replace(/<[^>]+>/g, '').trim();
  return `\n\n## ${textClean}\n\n`;
});

// Convert <h3> headings if any
mainHtml = mainHtml.replace(/<h3(?:\s+[^>]*)?>([\s\S]*?)<\/h3>/gi, (match, content) => {
  const textClean = content.replace(/<[^>]+>/g, '').trim();
  return `\n\n### ${textClean}\n\n`;
});

// 3. Extract JSON evidence and JS script
const jsonMatch = rawHtml.match(/(<script id="evidence" type="application\/json">[\s\S]*?<\/script>)/i);
const jsonHtml = jsonMatch ? jsonMatch[1] : '';

let jsContent = '';
const parts = rawHtml.split('<script id="evidence" type="application/json">');
if (parts[1]) {
  const scriptTagParts = parts[1].split('<script>');
  if (scriptTagParts[1]) {
    jsContent = scriptTagParts[1].split('</script>')[0];
  }
}

// 4. Generate markdown blog post
const targetMdPath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);

const markdownLines = [
  '---',
  `title: "${title.replace(/"/g, '\\"')}"`,
  `date: ${date}`,
  `description: "${description.replace(/"/g, '\\"')}"`,
  'tags:',
  ...tags.map(t => `  - ${t}`),
  'interactive: true',
  '---',
  '',
  premiseHtml,
  '',
  mainHtml,
  '',
  jsonHtml,
  '',
  '<script is:inline>',
  '(function() {',
  '  var initializedEvidence = null;',
  '  function initInteractiveSimulation() {',
  "    const evidenceEl = document.getElementById('evidence');",
  '    if (!evidenceEl || evidenceEl === initializedEvidence) return;',
  '    initializedEvidence = evidenceEl;',
  '',
  '    // Prevent duplicate button generation on repeat navigation',
  "    ['lengthButtons', 'distLengths', 'cutoffButtons', 'familyButtons', 'familyCards', 'contrastButtons', 'attackButtons', 'deltaButtons', 'methodButtons', 'proxyPlots'].forEach(id => {",
  '      const el = document.getElementById(id);',
  '      if (el) el.replaceChildren();',
  '    });',
  '',
  '    try {',
  jsContent,
  '    } catch (err) {',
  '      console.error("Vav interactive simulation error:", err);',
  '    }',
  '  }',
  "  document.addEventListener('astro:page-load', initInteractiveSimulation);",
  "  document.addEventListener('astro:before-swap', function() { initializedEvidence = null; });",
  '  initInteractiveSimulation();',
  '})();',
  '</script>',
  ''
];

fs.writeFileSync(targetMdPath, markdownLines.join('\n'));
console.log(`✓ Created interactive blog post at: ${targetMdPath}`);
