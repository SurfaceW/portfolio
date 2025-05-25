import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://arno.surfacew.com/posts/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/posts/topics/en', '/posts/topics/cn', '/rss', '/idea'].map(
    (route) => ({
      url: `https://arno.surfacew.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs];
}
