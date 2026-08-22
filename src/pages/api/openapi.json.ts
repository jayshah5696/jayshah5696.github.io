import type { APIRoute } from 'astro';
import { SITE_URL } from '../../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Jay Shah Developer API & Data Resources',
      description: 'Machine-readable developer APIs and knowledge endpoints for Jay Shah\'s personal website, technical publications, open source engineering projects, and research notes.',
      version: '1.0.0',
      contact: {
        name: 'Jay Shah',
        url: 'https://jayshah.dev',
        email: 'contact@jayshah.dev',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: SITE_URL,
        description: 'Production website server',
      },
    ],
    paths: {
      '/api/posts.json': {
        get: {
          summary: 'List published articles and research posts',
          description: 'Returns an array of technical blog posts including title, slug, canonical URLs, publication date, description, tags, and reading time estimate.',
          operationId: 'getPosts',
          responses: {
            '200': {
              description: 'Successful retrieval of published articles',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Post',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/projects.json': {
        get: {
          summary: 'List open source engineering projects',
          description: 'Returns a curated list of open source software, agent extensions, and machine learning repositories.',
          operationId: 'getProjects',
          responses: {
            '200': {
              description: 'Successful retrieval of projects',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Project',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/reads.json': {
        get: {
          summary: 'List curated reading notes and bibliography',
          description: 'Returns bibliography entries for papers, articles, and research read and reviewed by Jay Shah.',
          operationId: 'getReads',
          responses: {
            '200': {
              description: 'Successful retrieval of reading list',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ReadItem',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/info.json': {
        get: {
          summary: 'Get site metadata, author profile, and resource endpoints',
          description: 'Returns site identity, research focus areas, social links, feeds, and discovery endpoints.',
          operationId: 'getSiteInfo',
          responses: {
            '200': {
              description: 'Successful retrieval of site info',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/SiteInfo',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            slug: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            markdownUrl: { type: 'string', format: 'uri' },
            date: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            readingTime: { type: 'string' },
            wordsCount: { type: 'integer' },
            series: { type: ['string', 'null'] },
            seriesOrder: { type: ['integer', 'null'] },
            interactive: { type: 'boolean' },
          },
          required: ['title', 'slug', 'url', 'date', 'description', 'tags'],
        },
        Project: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'description', 'url', 'tags'],
        },
        ReadItem: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            externalUrl: { type: 'string', format: 'uri' },
            date: { type: 'string', format: 'date-time' },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['id', 'title', 'externalUrl', 'date', 'tags'],
        },
        SiteInfo: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            title: { type: 'string' },
            tagline: { type: 'string' },
            description: { type: 'string' },
            siteUrl: { type: 'string', format: 'uri' },
            currentRole: { type: 'string' },
            researchFocus: { type: 'array', items: { type: 'string' } },
            social: { type: 'object' },
            developerResources: { type: 'object' },
            endpoints: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          description: 'RFC 7807 problem details error format for machine agents',
          properties: {
            type: { type: 'string', format: 'uri', example: 'https://jayshah.dev/api/errors/not-found' },
            title: { type: 'string', example: 'Not Found' },
            status: { type: 'integer', example: 404 },
            error: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'The requested API endpoint does not exist.' },
            resolution: { type: 'string', example: 'Check available endpoints at https://jayshah.dev/api/openapi.json or explore https://jayshah.dev/llms.txt.' },
            documentation_url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/api/openapi.json' },
          },
          required: ['type', 'title', 'status', 'error', 'message', 'resolution'],
        },
      },
    },
  };

  return new Response(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
