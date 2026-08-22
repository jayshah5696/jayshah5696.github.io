import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { SITE_URL } from '../consts';

export const GET: APIRoute = async () => {
  let content = `# Open Source Projects & Research Codebases — Jay Shah

> Canonical URL: ${SITE_URL}/projects/

Selected open-source projects by Jay Shah — semantic search, foundational model applications, Gujarati NLP, and agent tooling.

`;

  for (const project of projects) {
    content += `## [${project.title}](${project.url})
- **Repository/Demo**: ${project.url}
- **Tags**: ${project.tags.join(', ')}
- **Description**: ${project.description}

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
