import { allBlogs } from 'contentlayer/generated';
import RSS from 'rss';

export const dynamic = 'force-static';

/**
 * RSS feeds generator
 * @doc https://blog.logrocket.com/adding-rss-feed-next-js-app/#using-rss-library
 */
export const GET = async (res: Request, { params }: { params: {
  lang?: string;
}}) => {
  const siteUrl = 'https://arno.surfacew.com';
  const lang = params?.lang || 'en';
  const feedOptions = {
    title: 'Arno Posts | RSS Feed',
    description: 'Welcome to Arno posts!',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    image_url: `${siteUrl}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Arno.`,
  };
  const feed = new RSS(feedOptions);
  allBlogs.filter(i => {
    return i?.tags?.includes(lang);
  }).forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/posts/${lang}/${post.slug}`,
      guid: post.slug,
      date: post.publishedAt,
    });
  });
  const xml = await feed.xml({ indent: true });
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}