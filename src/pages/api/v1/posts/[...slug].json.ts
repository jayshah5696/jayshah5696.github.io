import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import readingTime from 'reading-time';
import { SITE_URL } from '../../../../consts';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: any };
  const { headings } = await render(post);
  const stats = readingTime(post.body ?? '');

  const data = {
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    date: post.data.date.toISOString(),
    tags: post.data.tags,
    reading_time: stats.text,
    url: `${SITE_URL}/posts/${post.id}/`,
    markdown_url: `${SITE_URL}/posts/${post.id}.md`,
    image: post.data.image ? `${SITE_URL}${post.data.image}` : undefined,
    headings: headings.map((h: any) => ({
      depth: h.depth,
      text: h.text,
      slug: h.slug,
    })),
    content_markdown: post.body ?? '',
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
