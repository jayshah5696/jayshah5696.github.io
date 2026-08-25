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

I am a Senior Data Scientist at 6sense, where I build production AI applications, foundational model systems, custom embeddings, and agent evaluation frameworks. On this site, I write technical essays documenting what I build, break, and learn when turning raw machine learning research into working products, with a current focus on ai agent-based automation systems.

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
