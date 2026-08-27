import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

test.describe('100% Agent Readiness Verification Suite', () => {
  test.beforeAll(() => {
    execSync('node scripts/generate-markdown-variants.js', { cwd: process.cwd(), stdio: 'pipe' });
  });

  // 1. Agent-friendly 404s
  test('1. Agent-friendly 404: 404.html contains recovery markdown and canonical links', async () => {
    const filePath = path.join(DIST_DIR, '404.html');
    expect(fs.existsSync(filePath)).toBe(true);

    const html = fs.readFileSync(filePath, 'utf-8');
    expect(html).toContain('404');
    expect(html).toContain('Page Not Found');
    expect(html).toContain('/sitemap-index.xml');
    expect(html).toContain('/llms.txt');
    expect(html).toContain('/openapi.json');
    expect(html).toContain('/api/posts.json');
  });

  // 2. Content without JavaScript
  test('2. Content without JS: index.html has semantic H1/H2/H3 heading hierarchy and >1500 chars of raw content', async () => {
    const filePath = path.join(DIST_DIR, 'index.html');
    expect(fs.existsSync(filePath)).toBe(true);

    const html = fs.readFileSync(filePath, 'utf-8');
    // Heading hierarchy checks
    expect(html).toMatch(/<h1[^>]*>[\s\S]*?Jay Shah[\s\S]*?<\/h1>/i);
    expect(html).toMatch(/<h2[^>]*>[\s\S]*?Recent Research &amp; Technical Articles[\s\S]*?<\/h2>/i);
    expect(html).toMatch(/<h3[^>]*>[\s\S]*?<\/h3>/i);

    // Raw HTML text length check (stripping tags)
    const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                            .replace(/<style[\s\S]*?<\/style>/gi, '')
                            .replace(/<[^>]+>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
    expect(textContent.length).toBeGreaterThan(1500);
  });

  // 3. OpenAPI spec published
  test('3. OpenAPI spec: /openapi.json, /openapi.yaml, and /api/openapi.json exist and are valid OpenAPI 3.1', async () => {
    const jsonPath = path.join(DIST_DIR, 'openapi.json');
    const apiJsonPath = path.join(DIST_DIR, 'api', 'openapi.json');
    const yamlPath = path.join(DIST_DIR, 'openapi.yaml');
    const apiYamlPath = path.join(DIST_DIR, 'api', 'openapi.yaml');

    expect(fs.existsSync(jsonPath)).toBe(true);
    expect(fs.existsSync(apiJsonPath)).toBe(true);
    expect(fs.existsSync(yamlPath)).toBe(true);
    expect(fs.existsSync(apiYamlPath)).toBe(true);

    const spec = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    expect(spec.openapi).toBe('3.1.0');
    expect(spec.info.title).toContain('Jay Shah');
    expect(spec.paths['/api/posts.json']).toBeDefined();
    expect(spec.paths['/api/posts/{slug}.json']).toBeDefined();
    expect(spec.paths['/api/projects.json']).toBeDefined();
    expect(spec.paths['/api/profile.json']).toBeDefined();
  });

  // 4. JSON error responses
  test('4. JSON error responses: /api/404.json returns structured error schema with resolution hints', async () => {
    const filePath = path.join(DIST_DIR, 'api', '404.json');
    expect(fs.existsSync(filePath)).toBe(true);

    const errorData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(errorData.error).toBeDefined();
    expect(errorData.error).toBe('NOT_FOUND');
    expect(errorData.status).toBe(404);
    expect(errorData.message).toBeTruthy();
    expect(errorData.resolution).toContain('https://jayshah.dev');
    expect(errorData.documentation_url).toBeDefined();
  });

  // 5. Markdown content negotiation (acceptmarkdown.com)
  test('5. Markdown content negotiation: alternate links exist in head and static markdown files are published', async () => {
    const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    expect(indexHtml).toContain('rel="alternate" type="text/markdown"');
    expect(indexHtml).toContain('rel="service-desc"');
    expect(indexHtml).toContain('type="application/vnd.oai.openapi+json"');
    expect(indexHtml).toContain('href="/openapi.json"');

    // Check markdown alternates
    expect(fs.existsSync(path.join(DIST_DIR, 'index.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'about.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'projects.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'reads.md'))).toBe(true);

    const indexMd = fs.readFileSync(path.join(DIST_DIR, 'index.md'), 'utf-8');
    expect(indexMd).toContain('Jay Shah');

    // Check _headers file
    const headersPath = path.join(DIST_DIR, '_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headers = fs.readFileSync(headersPath, 'utf-8');
    expect(headers).toContain('Vary: Accept, Accept-Encoding');
  });

  // 6. Brand name discoverability
  test('6. Brand name discoverability: canonical URLs, OpenGraph, Twitter tags, and sameAs links claim brand entity', async () => {
    const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    expect(html).toContain('<title>Jay Shah</title>');
    expect(html).toContain('<meta property="og:site_name" content="Jay Shah"');
    expect(html).toContain('<link rel="canonical" href="https://jayshah.dev/"');
    expect(html).toContain('https://github.com/jayshah5696');
    expect(html).toContain('https://linkedin.com/in/jayshah5696');
    expect(html).toContain('https://twitter.com/jayjshah');
  });

  // 7. Agent instruction / when-to-use
  test('7. Agent instructions: /llms.txt and /.well-known/agent-instructions.md provide when-to-use guidance', async () => {
    const llmsTxtPath = path.join(DIST_DIR, 'llms.txt');
    expect(fs.existsSync(llmsTxtPath)).toBe(true);
    const llmsTxt = fs.readFileSync(llmsTxtPath, 'utf-8');
    expect(llmsTxt).toContain('## When to Use This Knowledge Base');
    expect(llmsTxt).toContain('## How an Agent Should Call and Cite This Site');
    expect(llmsTxt).toContain('Keyed Text Watermarking in LLMs');
    expect(llmsTxt).toContain('Semantic Entity Resolution & Dense Retrieval');

    const agentInstPath = path.join(DIST_DIR, '.well-known', 'agent-instructions.md');
    expect(fs.existsSync(agentInstPath)).toBe(true);
    const agentInst = fs.readFileSync(agentInstPath, 'utf-8');
    expect(agentInst).toContain('# Agent Instructions for jayshah.dev');
    expect(agentInst).toContain('## When to Use This Knowledge Base');
  });

  // 8. API schema complexity analysis
  test('8. API schema complexity: every OpenAPI operation has unique operationId, description, and typed schemas', async () => {
    const spec = JSON.parse(fs.readFileSync(path.join(DIST_DIR, 'openapi.json'), 'utf-8'));
    const operationIds = new Set<string>();

    for (const [pathKey, pathItem] of Object.entries<any>(spec.paths)) {
      for (const [method, op] of Object.entries<any>(pathItem)) {
        if (typeof op === 'object' && op.operationId) {
          expect(operationIds.has(op.operationId)).toBe(false); // Must be unique
          operationIds.add(op.operationId);
          expect(op.summary).toBeTruthy();
          expect(op.description).toBeTruthy();
          expect(op.responses['200']).toBeDefined();
        }
      }
    }

    expect(operationIds.has('listBlogPosts')).toBe(true);
    expect(operationIds.has('getBlogPostBySlug')).toBe(true);
    expect(operationIds.has('listProjects')).toBe(true);
    expect(operationIds.has('listReadingList')).toBe(true);
    expect(operationIds.has('getAuthorProfile')).toBe(true);
  });

  // 9. Function calling compatibility
  test('9. Function calling compatibility: /api/tools.json returns valid LLM function calling schemas', async () => {
    const filePath = path.join(DIST_DIR, 'api', 'tools.json');
    expect(fs.existsSync(filePath)).toBe(true);

    const toolsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(Array.isArray(toolsData.tools)).toBe(true);
    expect(toolsData.tools.length).toBeGreaterThan(0);

    for (const tool of toolsData.tools) {
      expect(tool.type).toBe('function');
      expect(tool.function.name).toBeTruthy();
      expect(tool.function.description).toBeTruthy();
      expect(tool.function.parameters).toBeDefined();
      expect(tool.function.parameters.type).toBe('object');
    }
  });

  // 10. Organization schema completeness
  test('10. Organization schema completeness: JSON-LD @graph contains Organization with contactPoint and PostalAddress', async () => {
    const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).toBeTruthy();

    const jsonLd = JSON.parse(jsonLdMatch![1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(Array.isArray(jsonLd['@graph'])).toBe(true);

    const org = jsonLd['@graph'].find((e: any) => e['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org.name).toBe('Jay Shah');
    expect(org.url).toBe('https://jayshah.dev');

    // ContactPoint check
    expect(org.contactPoint).toBeDefined();
    expect(org.contactPoint['@type']).toBe('ContactPoint');
    expect(org.contactPoint.email).toBe('contact@jayshah.dev');
    expect(org.contactPoint.contactType).toBeTruthy();

    // PostalAddress check
    expect(org.address).toBeDefined();
    expect(org.address['@type']).toBe('PostalAddress');
    expect(org.address.addressCountry).toBeTruthy();

    // Person & WebSite check
    const person = jsonLd['@graph'].find((e: any) => e['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person.sameAs).toBeDefined();
    expect(person.sameAs.length).toBeGreaterThan(0);

    const website = jsonLd['@graph'].find((e: any) => e['@type'] === 'WebSite');
    expect(website).toBeDefined();
  });
});
