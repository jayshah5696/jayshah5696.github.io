import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../../consts';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: any };

  let content = `---
title: "${post.data.title.replace(/"/g, '\\"')}"
date: "${post.data.date.toISOString()}"
description: "${post.data.description.replace(/"/g, '\\"')}"
tags: [${post.data.tags.map((t: string) => `"${t}"`).join(', ')}]
canonical_url: "${SITE_URL}/posts/${post.id}/"
---

# ${post.data.title}

> Published on ${post.data.date.toISOString().split('T')[0]} | [Canonical HTML](${SITE_URL}/posts/${post.id}/)
> Summary: ${post.data.description}

${post.body ?? ''}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
