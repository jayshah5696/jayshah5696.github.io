import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const blogSrcDir = path.resolve(rootDir, 'src/content/blog');

test.describe('Agent Readiness Comprehensive Audit Suite (is-agentic & Ora)', () => {
  test.beforeAll(() => {
    execSync('node scripts/generate-markdown-variants.js', { cwd: rootDir, stdio: 'pipe' });
  });
  // 1. Agent-friendly 404s (Item 1)
  test('1. 404 response has agent-friendly navigation, recovery links, and markdown variant', () => {
    const html404Path = path.join(distDir, '404.html');
    const md404Path = path.join(distDir, '404.md');

    expect(fs.existsSync(html404Path)).toBe(true);
    expect(fs.existsSync(md404Path)).toBe(true);

    const html = fs.readFileSync(html404Path, 'utf-8');
    const md = fs.readFileSync(md404Path, 'utf-8');

    // Proper heading and title
    expect(html).toContain('Page Not Found');
    expect(html).toContain('404');
    expect(html).toMatch(/<h1[^>]*>[\s\S]*?Page Not Found[\s\S]*?<\/h1>/i);

    // Site recovery links
    expect(html).toContain('/sitemap-index.xml');
    expect(html).toContain('/llms.txt');
    expect(html).toContain('/llms-full.txt');
    expect(html).toContain('/api/openapi.json');
    expect(html).toContain('/about/');
    expect(html).toContain('/projects/');
    expect(html).toContain('/archives/');

    // Markdown companion has where to look next
    expect(md).toContain('# 404 Not Found');
    expect(md).toContain('https://jayshah.dev/llms.txt');
    expect(md).toContain('https://jayshah.dev/sitemap-index.xml');
    expect(md).toContain('https://jayshah.dev/api/openapi.json');
    expect(md).toContain('https://jayshah.dev/about/');
    expect(md).toContain('https://jayshah.dev/projects/');
  });

  // 2. Content without JavaScript & Heading Structure (Item 2)
  test('2. Homepage provides rich raw HTML (>500 text chars) with semantic h1 -> h2 -> h3 hierarchy', () => {
    const indexPath = path.join(distDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);

    const html = fs.readFileSync(indexPath, 'utf-8');

    // Check primary h1 inside main
    expect(html).toMatch(/<main[\s\S]*?<h1[^>]*>[\s\S]*?Jay Shah[\s\S]*?<\/h1>/i);

    // Check h2 section heading
    expect(html).toMatch(/<h2[^>]*>[\s\S]*?Recent Research &amp; Technical Articles[\s\S]*?<\/h2>/i);

    // Extract text content inside <main> to verify >500 characters
    const mainMatch = html.match(/<main id="main-content"[^>]*>([\s\S]*?)<\/main>/);
    expect(mainMatch).toBeTruthy();

    const mainHtml = mainMatch![1];
    const textOnly = mainHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    expect(textOnly.length).toBeGreaterThan(1500); // Substantially rich content

    // Ensure heading structure is orderly: exactly 1 h1 in main, followed by h2
    const h1Matches = (mainHtml.match(/<h1/g) || []).length;
    const h2Matches = (mainHtml.match(/<h2/g) || []).length;
    expect(h1Matches).toBe(1);
    expect(h2Matches).toBeGreaterThanOrEqual(1);
  });

  // 3. JSON Error Responses & API Feeds (Item 3)
  test('3. Structured JSON APIs and RFC 7807 JSON error responses are valid', () => {
    // API endpoints exist
    const postsJsonPath = path.join(distDir, 'api/posts.json');
    const projectsJsonPath = path.join(distDir, 'api/projects.json');
    const readsJsonPath = path.join(distDir, 'api/reads.json');
    const infoJsonPath = path.join(distDir, 'api/info.json');
    const openapiJsonPath = path.join(distDir, 'api/openapi.json');
    const error404JsonPath = path.join(distDir, 'api/404.json');

    expect(fs.existsSync(postsJsonPath)).toBe(true);
    expect(fs.existsSync(projectsJsonPath)).toBe(true);
    expect(fs.existsSync(readsJsonPath)).toBe(true);
    expect(fs.existsSync(infoJsonPath)).toBe(true);
    expect(fs.existsSync(openapiJsonPath)).toBe(true);
    expect(fs.existsSync(error404JsonPath)).toBe(true);

    // Validate posts.json schema
    const posts = JSON.parse(fs.readFileSync(postsJsonPath, 'utf-8'));
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
    expect(posts[0]).toHaveProperty('url');
    expect(posts[0]).toHaveProperty('markdownUrl');
    expect(posts[0]).toHaveProperty('date');
    expect(posts[0]).toHaveProperty('description');
    expect(posts[0]).toHaveProperty('tags');

    // Validate projects.json schema
    const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('title');
    expect(projects[0]).toHaveProperty('description');
    expect(projects[0]).toHaveProperty('url');
    expect(projects[0]).toHaveProperty('tags');

    // Validate reads.json schema
    const reads = JSON.parse(fs.readFileSync(readsJsonPath, 'utf-8'));
    expect(Array.isArray(reads)).toBe(true);
    expect(reads.length).toBeGreaterThan(0);
    expect(reads[0]).toHaveProperty('title');
    expect(reads[0]).toHaveProperty('externalUrl');
    expect(reads[0]).toHaveProperty('date');

    // Validate info.json
    const info = JSON.parse(fs.readFileSync(infoJsonPath, 'utf-8'));
    expect(info.name).toBe('Jay Shah');
    expect(info.developerResources).toBeDefined();
    expect(info.endpoints).toBeDefined();

    // Validate openapi.json
    const openapi = JSON.parse(fs.readFileSync(openapiJsonPath, 'utf-8'));
    expect(openapi.openapi).toBe('3.1.0');
    expect(openapi.info.title).toContain('Jay Shah');
    expect(openapi.paths['/api/posts.json']).toBeDefined();
    expect(openapi.paths['/api/projects.json']).toBeDefined();
    expect(openapi.paths['/api/reads.json']).toBeDefined();
    expect(openapi.paths['/api/info.json']).toBeDefined();

    // Validate RFC 7807 Problem Details 404.json
    const errorObj = JSON.parse(fs.readFileSync(error404JsonPath, 'utf-8'));
    expect(errorObj.status).toBe(404);
    expect(errorObj.error).toBe('NOT_FOUND');
    expect(errorObj.title).toBe('Not Found');
    expect(errorObj.type).toContain('https://jayshah.dev/api/errors/not-found');
    expect(errorObj.resolution).toBeDefined();
    expect(errorObj.documentation_url).toBeDefined();
    expect(Array.isArray(errorObj.available_endpoints)).toBe(true);
  });

  // 4. Markdown Content Negotiation & Link Alternates (Item 4)
  test('4. Markdown content alternate discovery and static variants exist for all routes', () => {
    const indexPath = path.join(distDir, 'index.html');
    const postPath = path.join(distDir, 'posts/how-text-watermarks-hide-in-plain-sight/index.html');
    const indexMdPath = path.join(distDir, 'index.md');

    // Check link alternate tags in HTML head
    const indexHtml = fs.readFileSync(indexPath, 'utf-8');
    expect(indexHtml).toMatch(/<link\s+[^>]*rel="alternate"[^>]*type="text\/markdown"[^>]*href="https:\/\/jayshah\.dev\/index\.md"[^>]*>/i);

    const postHtml = fs.readFileSync(postPath, 'utf-8');
    expect(postHtml).toMatch(/<link\s+[^>]*rel="alternate"[^>]*type="text\/markdown"[^>]*href="https:\/\/jayshah\.dev\/posts\/how-text-watermarks-hide-in-plain-sight\/index\.md"[^>]*>/i);

    // Check root and section static markdown files
    expect(fs.existsSync(indexMdPath)).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'about/index.md'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'about.md'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'projects/index.md'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'projects.md'))).toBe(true);

    // Verify every blog post has corresponding markdown files
    const blogFiles = fs.readdirSync(blogSrcDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    for (const file of blogFiles) {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const nestedMd = path.join(distDir, 'posts', slug, 'index.md');
      const flatMd = path.join(distDir, 'posts', `${slug}.md`);

      expect(fs.existsSync(nestedMd)).toBe(true);
      expect(fs.existsSync(flatMd)).toBe(true);

      const content = fs.readFileSync(nestedMd, 'utf-8');
      expect(content).toContain('**Author:** Jay Shah');
      expect(content).toContain(`**Canonical URL:** https://jayshah.dev/posts/${slug}/`);
    }
  });

  // 5. Developer Resource Discoverability (Item 5)
  test('5. Developer resources (llms.txt, llms-full.txt, MCP, OpenAPI, robots.txt, API docs) are discoverable by name', () => {
    const llmsPath = path.join(distDir, 'llms.txt');
    const llmsFullPath = path.join(distDir, 'llms-full.txt');
    const mcpPath = path.join(distDir, 'mcp.json');
    const wellKnownMcpPath = path.join(distDir, '.well-known/mcp.json');
    const robotsPath = path.join(distDir, 'robots.txt');
    const apiDocsPath = path.join(distDir, 'api/docs/index.html');

    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);
    expect(fs.existsSync(mcpPath)).toBe(true);
    expect(fs.existsSync(wellKnownMcpPath)).toBe(true);
    expect(fs.existsSync(robotsPath)).toBe(true);
    expect(fs.existsSync(apiDocsPath)).toBe(true);

    // Check llms.txt content
    const llms = fs.readFileSync(llmsPath, 'utf-8');
    expect(llms).toContain('# Jay Shah — Developer Resources & AI Systems Research');
    expect(llms).toContain('https://jayshah.dev/api/openapi.json');
    expect(llms).toContain('https://jayshah.dev/api/posts.json');
    expect(llms).toContain('https://jayshah.dev/sitemap-index.xml');

    // Check llms-full.txt content
    const llmsFull = fs.readFileSync(llmsFullPath, 'utf-8');
    expect(llmsFull).toContain('Author: Jay Shah');
    expect(llmsFull).toContain('How does a text watermark work?');
    expect(llmsFull).toContain('File-Based Memory Is a Terrible Idea That Somehow Works');

    // Check MCP manifest
    const mcp = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
    expect(mcp.name).toBe('jayshah-dev');
    expect(mcp.author.name).toBe('Jay Shah');
    expect(mcp.tools.some((t: { name: string }) => t.name === 'search_articles')).toBe(true);
    expect(mcp.tools.some((t: { name: string }) => t.name === 'get_post_content')).toBe(true);
    expect(mcp.tools.some((t: { name: string }) => t.name === 'list_projects')).toBe(true);
    expect(mcp.tools.some((t: { name: string }) => t.name === 'get_resume')).toBe(true);

    // Check robots.txt
    const robots = fs.readFileSync(robotsPath, 'utf-8');
    expect(robots).toContain('https://jayshah.dev/sitemap-index.xml');
    expect(robots).toContain('https://jayshah.dev/llms.txt');

    // Check page titles include "Jay Shah"
    const aboutHtml = fs.readFileSync(path.join(distDir, 'about/index.html'), 'utf-8');
    expect(aboutHtml).toContain('<title>About -- Jay Shah</title>');

    const projectsHtml = fs.readFileSync(path.join(distDir, 'projects/index.html'), 'utf-8');
    expect(projectsHtml).toContain('<title>Engineering Projects -- Jay Shah</title>');

    const archivesHtml = fs.readFileSync(path.join(distDir, 'archives/index.html'), 'utf-8');
    expect(archivesHtml).toContain('<title>Writing Archives -- Jay Shah</title>');

    const apiDocsHtml = fs.readFileSync(apiDocsPath, 'utf-8');
    expect(apiDocsHtml).toContain('Jay Shah &mdash; Developer API');
    expect(apiDocsHtml).toContain('OpenAPI 3.1.0 Specification');
  });
});
