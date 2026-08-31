import { defineMiddleware } from 'astro:middleware';
import { getCollection, getEntry } from 'astro:content';
import { projects } from './data/projects';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from './consts';

const PRODUCES = ['text/html', 'text/markdown', 'application/json', 'application/problem+json'];

type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw) => {
      const parts = raw.trim().split(';').map((s) => s.trim());
      const type = parts[0].toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split('=').map((s) => s.trim());
        if (name === 'q') {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

function preferredType(header: string | null): string | null {
  if (!header) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let best: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    const matchedQ: number = matched.q;
    if (matchedQ <= 0) continue; // explicit rejection

    if (matchedQ > bestQ || (matchedQ === bestQ && matchedPosition < bestPosition)) {
      bestQ = matchedQ;
      bestPosition = matchedPosition;
      best = candidate;
    }
  }

  return best;
}

function appendVaryAccept(headers: Headers): void {
  const existing = headers.get('Vary');
  if (!existing) {
    headers.set('Vary', 'Accept, Accept-Encoding');
    return;
  }
  const tokens = existing.split(',').map((s) => s.trim().toLowerCase());
  if (!tokens.includes('accept')) {
    headers.set('Vary', `${existing}, Accept`);
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  // During static prerendering at build time, request headers are not available.
  if (ctx.isPrerendered) {
    const response = await next();
    appendVaryAccept(response.headers);
    return response;
  }

  let acceptHeader: string | null = null;
  try {
    if (ctx.request && ctx.request.headers) {
      acceptHeader = ctx.request.headers.get('accept');
    }
  } catch {
    acceptHeader = null;
  }
  const chosen = preferredType(acceptHeader);
  const pathname = ctx.url.pathname.replace(/\/$/, '') || '/';

  // If client specifies an accept header but no supported type can match (or q=0 for all supported)
  if (acceptHeader && chosen === null) {
    return new Response('406 Not Acceptable: Supported types are text/html, text/markdown, application/json\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Vary': 'Accept, Accept-Encoding',
      },
    });
  }

  // Handle Accept: text/markdown negotiation
  if (chosen === 'text/markdown') {
    // 1. Post pages: /posts/[slug]
    const postMatch = pathname.match(/^\/posts\/([^/]+)$/);
    if (postMatch) {
      const slug = postMatch[1];
      const post = await getEntry('blog', slug);
      if (post && !post.data.draft) {
        const mdBody = [
          `# ${post.data.title}`,
          ``,
          `> ${post.data.description}`,
          ``,
          `- **Date:** ${post.data.date.toISOString().split('T')[0]}`,
          `- **Author:** Jay Shah (https://jayshah.dev)`,
          `- **Tags:** ${post.data.tags.join(', ')}`,
          `- **Canonical URL:** ${SITE_URL}/posts/${slug}/`,
          ``,
          `---`,
          ``,
          post.body ?? '',
        ].join('\n');

        return new Response(mdBody, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept, Accept-Encoding',
          },
        });
      }
    }

    // 2. Homepage: /
    if (pathname === '/') {
      const posts = (await getCollection('blog'))
        .filter((p) => !p.data.draft)
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

      const mdHome = [
        `# Jay Shah — AI Systems, Research & Engineering`,
        ``,
        `> Senior Machine Learning Engineer at 6sense specializing in LLM systems, RAG architectures, agent evaluations, and foundational models.`,
        ``,
        `Personal website and research publications: ${SITE_URL}`,
        ``,
        `## Recent Writings & Research`,
        ``,
        ...posts.map((p) => `- [${p.data.title}](${SITE_URL}/posts/${p.id}/) (${p.data.date.toISOString().split('T')[0]}): ${p.data.description}`),
        ``,
        `## Selected Projects`,
        ``,
        ...projects.slice(0, 5).map((pr) => `- [${pr.title}](${pr.url}): ${pr.description} [${pr.tags.join(', ')}]`),
        ``,
        `## Developer Resources & Discovery`,
        `- LLMs Index: ${SITE_URL}/llms.txt`,
        `- Full LLMs Digest: ${SITE_URL}/llms-full.txt`,
        `- OpenAPI 3.1 Spec: ${SITE_URL}/api/openapi.json`,
        `- JSON Feed: ${SITE_URL}/api/posts.json`,
        `- Sitemap: ${SITE_URL}/sitemap-index.xml`,
      ].join('\n');

      return new Response(mdHome, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding',
        },
      });
    }

    // 3. Projects: /projects
    if (pathname === '/projects') {
      const mdProjects = [
        `# Jay Shah — Engineering Projects & Open Source Tools`,
        ``,
        `Curated open source machine learning systems, agent tooling, and data engineering projects.`,
        ``,
        ...projects.map((pr) => `### [${pr.title}](${pr.url})\n${pr.description}\n- Tags: ${pr.tags.join(', ')}\n`),
      ].join('\n');

      return new Response(mdProjects, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding',
        },
      });
    }

    // 4. About: /about
    if (pathname === '/about') {
      const mdAbout = [
        `# Jay Shah — About & Background`,
        ``,
        `Senior Machine Learning Engineer at 6sense. Focus areas include intent intelligence, foundational models with custom embeddings, explainability, knowledge graphs, and agent evaluation systems.`,
        ``,
        `## Experience`,
        `- **6sense** (Current): Foundational models, embeddings, contextual knowledge graphs, LLM agent evaluations.`,
        `- **Avathon**: RAG systems, MCP agent platform, anomaly detection, foundation-model operations.`,
        `- **Texas A&M University**: Master's research in predicting wind-energy failures and time-series ML.`,
        ``,
        `## Patents`,
        `- US20230213560A1: Calculating energy loss during an outage`,
        `- US20230214703A1: Predicting energy production for energy generating assets`,
        `- IN201721044402A: Dimension Measurement Using Image Processing`,
        ``,
        `## Contact & Links`,
        `- Website: ${SITE_URL}`,
        `- GitHub: https://github.com/jayshah5696`,
        `- LinkedIn: https://linkedin.com/in/jayshah5696`,
        `- Resume: https://cv.jayshah.dev`,
      ].join('\n');

      return new Response(mdAbout, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding',
        },
      });
    }

    // 5. 404 Recovery in Markdown
    if (pathname === '/404') {
      const md404 = [
        `# 404 Not Found`,
        ``,
        `The requested URL was not found on https://jayshah.dev.`,
        ``,
        `## Where to Look Next (Site Navigation & Recovery)`,
        `- [Jay Shah Home & Latest Writings](https://jayshah.dev/)`,
        `- [LLMs Summary Index](https://jayshah.dev/llms.txt)`,
        `- [Full LLMs Context Digest](https://jayshah.dev/llms-full.txt)`,
        `- [XML Sitemap](https://jayshah.dev/sitemap-index.xml)`,
        `- [About Jay Shah](https://jayshah.dev/about/)`,
        `- [Engineering Projects](https://jayshah.dev/projects/)`,
        `- [Article Archives](https://jayshah.dev/archives/)`,
        `- [Developer API & OpenAPI Spec](https://jayshah.dev/api/openapi.json)`,
      ].join('\n');

      return new Response(md404, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding',
        },
      });
    }
  }

  const response = await next();
  appendVaryAccept(response.headers);
  return response;
});
