import type { APIRoute } from 'astro';
import { SITE_URL } from '../../consts';

export const GET: APIRoute = async () => {
  const tools = [
    {
      type: 'function',
      function: {
        name: 'listBlogPosts',
        description:
          'Retrieve published blog posts and technical articles by Jay Shah, including titles, slugs, summaries, publication dates, and tags.',
        parameters: {
          type: 'object',
          properties: {
            tag: {
              type: 'string',
              description: 'Optional filter by topic tag, e.g. "rag", "watermarking", "llm", "ai-agents", "entity-resolution".',
            },
            limit: {
              type: 'integer',
              description: 'Maximum number of items to return.',
              default: 10,
            },
          },
          required: [],
        },
        endpoint: `${SITE_URL}/api/posts.json`,
      },
    },
    {
      type: 'function',
      function: {
        name: 'getBlogPost',
        description:
          'Retrieve full markdown content, section headings, and metadata for a specific blog post by slug.',
        parameters: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The unique slug identifier for the post (e.g. "how-text-watermarks-hide-in-plain-sight", "entity-resolution-dense-retrieval", "memory-architecture").',
            },
          },
          required: ['slug'],
        },
        endpoint: `${SITE_URL}/api/posts/{slug}.json`,
      },
    },
    {
      type: 'function',
      function: {
        name: 'listProjects',
        description:
          'Retrieve open-source AI projects, codebases, and repositories built by Jay Shah with descriptions and links.',
        parameters: {
          type: 'object',
          properties: {},
          required: [],
        },
        endpoint: `${SITE_URL}/api/projects.json`,
      },
    },
    {
      type: 'function',
      function: {
        name: 'listReadingList',
        description:
          'Retrieve curated research papers, books, and articles read by Jay Shah with annotations and links.',
        parameters: {
          type: 'object',
          properties: {
            tag: {
              type: 'string',
              description: 'Optional tag filter.',
            },
          },
          required: [],
        },
        endpoint: `${SITE_URL}/api/reads.json`,
      },
    },
    {
      type: 'function',
      function: {
        name: 'getAuthorProfile',
        description:
          'Retrieve author profile, career background, patents, contact info, and areas of expertise for Jay Shah.',
        parameters: {
          type: 'object',
          properties: {},
          required: [],
        },
        endpoint: `${SITE_URL}/api/profile.json`,
      },
    },
  ];

  return new Response(
    JSON.stringify(
      {
        version: '1.0.0',
        description: 'LLM function-calling declarations for jayshah.dev API',
        tools,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Vary': 'Accept, Accept-Encoding',
      },
    }
  );
};
