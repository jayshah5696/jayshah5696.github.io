import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import readingTime from 'reading-time';
import { SITE_URL } from '../../consts';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = posts.map((post) => {
    const stats = readingTime(post.body ?? '');
    return {
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      date: post.data.date.toISOString(),
      tags: post.data.tags,
      reading_time: stats.text,
      url: `${SITE_URL}/posts/${post.id}/`,
      markdown_url: `${SITE_URL}/posts/${post.id}.md`,
      json_url: `${SITE_URL}/api/posts/${post.id}.json`,
      image: post.data.image ? `${SITE_URL}${post.data.image}` : undefined,
    };
  });

  return new Response(
    JSON.stringify(
      {
        total: items.length,
        posts: items,
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
