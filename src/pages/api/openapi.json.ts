import type { APIRoute } from 'astro';
import { openApiSpec } from '../openapi.json';

export const prerender = true;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(openApiSpec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
