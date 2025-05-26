import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://arno.surfacew.com/posts/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/posts/topics', '/rss', '/idea'].map(
    (route) => ({
      url: `https://arno.surfacew.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  const languageTags = new Set<string>();
  const contentTags = new Set<string>();

  allBlogs.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag === 'en' || tag === 'zh') {
          languageTags.add(tag);
        } else {
          contentTags.add(tag);
        }
      });
    }
  });

  const tagLangRoutes = [];
  contentTags.forEach(tag => {
    languageTags.forEach(lang => {
      const relevantPosts = allBlogs.filter(post =>
        post.tags && post.tags.includes(tag) && post.tags.includes(lang)
      );

      if (relevantPosts.length > 0) {
        relevantPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        tagLangRoutes.push({
          url: `https://arno.surfacew.com/posts/topics/${tag}/${lang}`,
          lastModified: relevantPosts[0].publishedAt,
        });
      }
    });
  });

  return [...routes, ...blogs, ...tagLangRoutes];
}
