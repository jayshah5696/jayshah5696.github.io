import type { APIRoute } from 'astro';
import { projects } from '../../data/projects';

export const prerender = true;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify(
      {
        total: projects.length,
        projects: projects.map((p) => ({
          title: p.title,
          description: p.description,
          url: p.url,
          tags: p.tags,
        })),
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
