import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects } from '../data/projects';
import { SITE_URL, SITE_TITLE, SITE_TAGLINE, SITE_EMAIL } from '../consts';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  let content = `# ${SITE_TITLE} — Full LLM Knowledge Base Dump

> ${SITE_TAGLINE}
> Website: ${SITE_URL} | Email: ${SITE_EMAIL}

This file provides the complete, consolidated text of all technical articles, research publications, and open-source project descriptions on ${SITE_URL}.

---

## Author Profile & Background

Jay Shah is a Senior Data Scientist at 6sense building intent intelligence systems, foundational models with custom embeddings, model explainability, contextual knowledge graphs, and evaluation systems for LLM agents.
Previously at Avathon, he developed retrieval-augmented generation systems, Model Context Protocol (MCP) agent platforms, and foundation-model operations supporting 20+ agent workflows.
Graduate research at Texas A&M University focused on wind-energy failure prediction.

### Patents
1. **Calculating energy loss during an outage** (US20230213560A1) — Filed Dec 30, 2021
2. **Predicting energy production for energy generating assets** (US20230214703A1) — Filed Dec 30, 2021
3. **Dimension Measurement Using Image Processing** (IN201721044402) — Filed Dec 11, 2017

---

## Open Source Projects

`;

  for (const project of projects) {
    content += `### ${project.title}
- **URL**: ${project.url}
- **Tags**: ${project.tags.join(', ')}
- **Description**: ${project.description}

`;
  }

  content += `\n---\n\n## Full Articles & Technical Writings\n\n`;

  for (const post of posts) {
    content += `### ${post.data.title}
- **URL**: ${SITE_URL}/posts/${post.id}/
- **Published**: ${post.data.date.toISOString().split('T')[0]}
- **Tags**: ${post.data.tags.join(', ')}
- **Description**: ${post.data.description}

${post.body ?? ''}

---

`;
  }

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
