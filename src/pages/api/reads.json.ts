import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const reads = (await getCollection('reads'))
    .filter((r) => !r.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return new Response(
    JSON.stringify(
      {
        total: reads.length,
        reads: reads.map((r) => ({
          id: r.id,
          slug: r.id,
          title: r.data.title,
          url: r.data.url,
          externalUrl: r.data.url,
          date: r.data.date.toISOString(),
          tags: r.data.tags,
          notes_markdown: r.body ?? '',
          site_url: `${SITE_URL}/reads/`,
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
