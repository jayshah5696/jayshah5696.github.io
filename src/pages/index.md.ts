import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_TAGLINE, SITE_URL } from '../consts';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  let content = `# ${SITE_TITLE} — AI Systems, Foundational Models & Research

> ${SITE_TAGLINE}
> Canonical URL: ${SITE_URL}/

I build machine learning systems, from model training and evaluation to applications people use.
I write about what I build, break, and learn along the way — focusing on intent intelligence,
retrieval-augmented generation (RAG), keyed text watermarking, and LLM agent evaluations.

## Recent Writings & Case Studies

`;

  for (const post of posts) {
    content += `### [${post.data.title}](${SITE_URL}/posts/${post.id}/)
- **Published**: ${post.data.date.toISOString().split('T')[0]}
- **Tags**: ${post.data.tags.join(', ')}
- **Markdown Version**: ${SITE_URL}/posts/${post.id}.md
- **Summary**: ${post.data.description}

`;
  }

  content += `## Navigation & Agent Resources
- [About Jay Shah](${SITE_URL}/about.md)
- [Open Source Projects](${SITE_URL}/projects.md)
- [Reading List](${SITE_URL}/reads.md)
- [OpenAPI 3.1 Specification](${SITE_URL}/openapi.json)
- [LLM Context Index](${SITE_URL}/llms.txt)
- [Full LLM Knowledge Dump](${SITE_URL}/llms-full.txt)
- [Agent Instructions](${SITE_URL}/.well-known/agent-instructions.md)
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
