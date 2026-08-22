import type { APIRoute } from 'astro';
import { projects } from '../../data/projects';

export const prerender = true;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(projects, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
