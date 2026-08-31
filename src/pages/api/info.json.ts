import type { APIRoute } from 'astro';
import { SITE_TITLE, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL, SOCIAL_LINKS } from '../../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const info = {
    name: 'Jay Shah',
    title: SITE_TITLE,
    tagline: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    siteUrl: SITE_URL,
    currentRole: 'Senior Machine Learning Engineer at 6sense',
    researchFocus: [
      'Large Language Models & Evaluators',
      'Retrieval-Augmented Generation (RAG)',
      'Model Context Protocol & Autonomous Agents',
      'Text Watermarking & AI Safety',
      'Matryoshka Representation Learning & Entity Resolution',
      'Indic NLP (Gujarati Llama)',
    ],
    social: SOCIAL_LINKS,
    developerResources: {
      openapi: `${SITE_URL}/api/openapi.json`,
      documentation: `${SITE_URL}/api/docs/`,
      llmsTxt: `${SITE_URL}/llms.txt`,
      llmsFullTxt: `${SITE_URL}/llms-full.txt`,
      mcpManifest: `${SITE_URL}/.well-known/mcp.json`,
      sitemap: `${SITE_URL}/sitemap-index.xml`,
      rss: `${SITE_URL}/rss.xml`,
    },
    endpoints: {
      posts: `${SITE_URL}/api/posts.json`,
      projects: `${SITE_URL}/api/projects.json`,
      reads: `${SITE_URL}/api/reads.json`,
      info: `${SITE_URL}/api/info.json`,
    },
  };

  return new Response(JSON.stringify(info, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
