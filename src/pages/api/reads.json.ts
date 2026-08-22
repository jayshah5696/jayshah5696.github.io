import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const reads = (await getCollection('reads'))
    .filter((read) => !read.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const data = reads.map((item) => ({
    id: item.id,
    title: item.data.title,
    externalUrl: item.data.url,
    date: item.data.date.toISOString(),
    tags: item.data.tags,
  }));

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
