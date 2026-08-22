import type { APIRoute } from 'astro';
import { SITE_URL } from '../../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const errorObj = {
    type: `${SITE_URL}/api/errors/not-found`,
    title: 'Not Found',
    status: 404,
    error: 'NOT_FOUND',
    code: 404,
    message: 'The requested API endpoint does not exist on this server.',
    resolution: `Check the available endpoints in the OpenAPI specification at ${SITE_URL}/api/openapi.json or consult ${SITE_URL}/llms.txt for machine-readable routes.`,
    documentation_url: `${SITE_URL}/api/openapi.json`,
    available_endpoints: [
      `${SITE_URL}/api/posts.json`,
      `${SITE_URL}/api/projects.json`,
      `${SITE_URL}/api/reads.json`,
      `${SITE_URL}/api/info.json`,
      `${SITE_URL}/api/openapi.json`,
    ],
  };

  return new Response(JSON.stringify(errorObj, null, 2), {
    status: 404,
    headers: {
      'Content-Type': 'application/problem+json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'no-cache',
    },
  });
};
