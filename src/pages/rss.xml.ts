import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.published !== false;
  });

  const sortedPosts = posts.sort((a, b) =>
    b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'User Hat SEO Blog RSS Feed',
    description: 'A blog exploring my interest in Usability and Search Engine Visibility.',
    site: context.site || 'https://www.userhat.com',
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
    customData: '<language>en-au</language>',
  });
}
