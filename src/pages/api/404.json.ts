import type { APIRoute } from 'astro';
import { SITE_URL } from '../../consts';

export const GET: APIRoute = async () => {
  const errorPayload = {
    error: {
      code: 'NOT_FOUND',
      message: 'The requested API resource was not found.',
      status: 404,
      resolution:
        'Verify the path against the OpenAPI specification at https://jayshah.dev/openapi.json or consult the LLM index at https://jayshah.dev/llms.txt',
      available_endpoints: [
        `${SITE_URL}/api/posts.json`,
        `${SITE_URL}/api/projects.json`,
        `${SITE_URL}/api/reads.json`,
        `${SITE_URL}/api/profile.json`,
        `${SITE_URL}/api/tools.json`,
        `${SITE_URL}/openapi.json`,
      ],
      documentation_url: `${SITE_URL}/openapi.json`,
    },
  };

  return new Response(JSON.stringify(errorPayload, null, 2), {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
