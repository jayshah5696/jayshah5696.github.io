import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../consts';

export const GET: APIRoute = async () => {
  const reads = (await getCollection('reads'))
    .filter((r) => !r.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  let content = `# Reading List & Research Notes — Jay Shah

> Canonical URL: ${SITE_URL}/reads/

Curated machine learning research papers, systems articles, and technical books read and annotated by Jay Shah.

`;

  for (const read of reads) {
    content += `## [${read.data.title}](${read.data.url})
- **Date**: ${read.data.date.toISOString().split('T')[0]}
- **Tags**: ${read.data.tags.join(', ')}
- **External URL**: ${read.data.url}

${read.body ? `**Notes**:\n${read.body}\n` : ''}
---

`;
  }

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
