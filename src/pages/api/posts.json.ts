import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import readingTime from 'reading-time';
import { SITE_URL } from '../../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const data = posts.map((post) => {
    const stats = readingTime(post.body ?? '');
    return {
      title: post.data.title,
      slug: post.id,
      url: `${SITE_URL}/posts/${post.id}/`,
      markdownUrl: `${SITE_URL}/posts/${post.id}/index.md`,
      date: post.data.date.toISOString(),
      description: post.data.description,
      tags: post.data.tags,
      readingTime: stats.text,
      wordsCount: stats.words,
      series: post.data.series ?? null,
      seriesOrder: post.data.seriesOrder ?? null,
      interactive: post.data.interactive ?? false,
    };
  });

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
