import type { APIRoute } from 'astro';
import { SITE_URL, SITE_TITLE, SITE_EMAIL } from '../consts';

export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: `${SITE_TITLE} AI Systems & Research API`,
    version: '1.0.0',
    description:
      'Self-describing programmatic API and LLM function calling surface for jayshah.dev. Access technical writings on LLM evaluations, entity resolution, keyed text watermarking, open-source projects, and research profiles.',
    contact: {
      name: SITE_TITLE,
      email: SITE_EMAIL,
      url: SITE_URL,
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: SITE_URL,
      description: 'Production Server',
    },
  ],
  paths: {
    '/api/posts.json': {
      get: {
        operationId: 'listBlogPosts',
        summary: 'List published blog posts',
        description:
          'Retrieve published articles with titles, summaries, tags, reading estimates, publication dates, and direct markdown links.',
        parameters: [
          {
            name: 'tag',
            in: 'query',
            required: false,
            description: 'Filter posts by topic tag (e.g., "ai-safety", "rag", "watermarking", "llm", "entity-resolution").',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Maximum number of items to return.',
            schema: {
              type: 'integer',
              default: 10,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successful list of blog posts',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostListResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/posts/{slug}.json': {
      get: {
        operationId: 'getBlogPostBySlug',
        summary: 'Get single blog post with markdown body',
        description:
          'Retrieve complete article details including full raw markdown content, outline headings, publication date, and tags for a given post slug.',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description:
              'The unique post slug (e.g. "how-text-watermarks-hide-in-plain-sight", "entity-resolution-dense-retrieval", "memory-architecture").',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Post details with markdown body',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostDetail',
                },
              },
            },
          },
          '404': {
            description: 'Post not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/projects.json': {
      get: {
        operationId: 'listProjects',
        summary: 'List open-source projects',
        description:
          'Retrieve open-source AI repositories, tools, and research codebases built by Jay Shah with descriptions, URLs, and tags.',
        responses: {
          '200': {
            description: 'List of open-source projects',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProjectListResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/reads.json': {
      get: {
        operationId: 'listReadingList',
        summary: 'List curated readings and research notes',
        description:
          'Retrieve curated research papers, books, and articles read by Jay Shah with notes, links, and tags.',
        responses: {
          '200': {
            description: 'List of curated reading items',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReadListResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/profile.json': {
      get: {
        operationId: 'getAuthorProfile',
        summary: 'Get author profile, patents, and contact',
        description:
          'Retrieve author career background, patents, honors, social links, contact information, and AI research focus areas.',
        responses: {
          '200': {
            description: 'Author profile information',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthorProfile',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/tools.json': {
      get: {
        operationId: 'listToolDefinitions',
        summary: 'List LLM tool calling declarations',
        description:
          'Retrieve function calling definitions formatted for OpenAI, Anthropic, and Gemini LLM agents.',
        responses: {
          '200': {
            description: 'Tool calling declarations',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    version: { type: 'string' },
                    description: { type: 'string' },
                    tools: { type: 'array', items: { type: 'object' } },
                  },
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
      PostSummary: {
        type: 'object',
        required: ['slug', 'title', 'description', 'date', 'tags', 'url', 'markdown_url'],
        properties: {
          slug: { type: 'string', example: 'how-text-watermarks-hide-in-plain-sight' },
          title: { type: 'string', example: 'How Text Watermarks Hide in Plain Sight' },
          description: { type: 'string', example: 'Statistical analysis of keyed LLM watermarking' },
          date: { type: 'string', format: 'date-time', example: '2026-08-16T00:00:00.000Z' },
          tags: { type: 'array', items: { type: 'string' }, example: ['ai-safety', 'watermarking', 'llm'] },
          reading_time: { type: 'string', example: '12 min read' },
          url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/posts/how-text-watermarks-hide-in-plain-sight/' },
          markdown_url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/posts/how-text-watermarks-hide-in-plain-sight.md' },
          json_url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/api/posts/how-text-watermarks-hide-in-plain-sight.json' },
          image: { type: 'string', format: 'uri' },
        },
      },
      PostDetail: {
        type: 'object',
        required: ['slug', 'title', 'description', 'date', 'tags', 'url', 'markdown_url', 'content_markdown'],
        properties: {
          slug: { type: 'string', example: 'how-text-watermarks-hide-in-plain-sight' },
          title: { type: 'string', example: 'How Text Watermarks Hide in Plain Sight' },
          description: { type: 'string', example: 'Statistical analysis of keyed LLM watermarking' },
          date: { type: 'string', format: 'date-time', example: '2026-08-16T00:00:00.000Z' },
          tags: { type: 'array', items: { type: 'string' }, example: ['ai-safety', 'watermarking', 'llm'] },
          reading_time: { type: 'string', example: '12 min read' },
          url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/posts/how-text-watermarks-hide-in-plain-sight/' },
          markdown_url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/posts/how-text-watermarks-hide-in-plain-sight.md' },
          image: { type: 'string', format: 'uri' },
          headings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                depth: { type: 'integer', example: 2 },
                text: { type: 'string', example: 'Statistical Detection' },
                slug: { type: 'string', example: 'statistical-detection' },
              },
            },
          },
          content_markdown: { type: 'string', description: 'Raw markdown body of the post' },
        },
      },
      Project: {
        type: 'object',
        required: ['title', 'description', 'url', 'tags'],
        properties: {
          title: { type: 'string', example: 'Pi Agent Extensions' },
          description: { type: 'string', example: 'A collection of extensions and themes for the Pi coding agent.' },
          url: { type: 'string', format: 'uri', example: 'https://github.com/jayshah5696/pi-agent-extensions' },
          tags: { type: 'array', items: { type: 'string' }, example: ['AI AGENTS', 'TYPESCRIPT'] },
        },
      },
      ReadItem: {
        type: 'object',
        required: ['slug', 'title', 'url', 'date', 'tags'],
        properties: {
          slug: { type: 'string', example: 'scaling-laws-carefully' },
          title: { type: 'string', example: 'Scaling Laws Carefully' },
          url: { type: 'string', format: 'uri', example: 'https://arxiv.org/abs/2401.00000' },
          date: { type: 'string', format: 'date-time', example: '2026-06-15T00:00:00.000Z' },
          tags: { type: 'array', items: { type: 'string' }, example: ['scaling-laws', 'llm'] },
          notes_markdown: { type: 'string' },
          site_url: { type: 'string', format: 'uri', example: 'https://jayshah.dev/reads/' },
        },
      },
      AuthorProfile: {
        type: 'object',
        required: ['name', 'headline', 'description', 'current_role', 'contact'],
        properties: {
          name: { type: 'string', example: 'Jay Shah' },
          headline: { type: 'string', example: 'Senior Data Scientist | AI Applications & Foundational Models' },
          description: { type: 'string' },
          current_role: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Senior Data Scientist' },
              organization: { type: 'string', example: '6sense' },
              url: { type: 'string', format: 'uri', example: 'https://6sense.com' },
              focus_areas: { type: 'array', items: { type: 'string' } },
            },
          },
          education: { type: 'array', items: { type: 'object' } },
          patents: { type: 'array', items: { type: 'object' } },
          honors: { type: 'array', items: { type: 'string' } },
          contact: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'contact@jayshah.dev' },
              contact_point_type: { type: 'string', example: 'technical support' },
              website: { type: 'string', format: 'uri', example: 'https://jayshah.dev' },
            },
          },
          social_profiles: { type: 'object' },
          same_as: { type: 'array', items: { type: 'string' } },
          agent_resources: { type: 'object' },
        },
      },
      ErrorResponse: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['code', 'message', 'status', 'resolution'],
            properties: {
              code: { type: 'string', example: 'NOT_FOUND' },
              message: { type: 'string', example: 'The requested API resource was not found.' },
              status: { type: 'integer', example: 404 },
              resolution: {
                type: 'string',
                example: 'Check available endpoints at https://jayshah.dev/openapi.json or consult https://jayshah.dev/llms.txt',
              },
              documentation_url: {
                type: 'string',
                format: 'uri',
                example: 'https://jayshah.dev/openapi.json',
              },
            },
          },
        },
      },
      PostListResponse: {
        type: 'object',
        required: ['total', 'posts'],
        properties: {
          total: { type: 'integer', example: 10 },
          posts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PostSummary',
            },
          },
        },
      },
      ProjectListResponse: {
        type: 'object',
        required: ['total', 'projects'],
        properties: {
          total: { type: 'integer', example: 14 },
          projects: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Project',
            },
          },
        },
      },
      ReadListResponse: {
        type: 'object',
        required: ['total', 'reads'],
        properties: {
          total: { type: 'integer', example: 25 },
          reads: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ReadItem',
            },
          },
        },
      },
    },
  },
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(openApiSpec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
