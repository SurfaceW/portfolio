import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  // const allViews = await getViewsCount();

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">read my blog</h1>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post: any) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/posts/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
              {/* <ViewCounter
                allViews={allViews}
                slug={post.slug}
                trackView={false}
              /> */}
            </div>
          </Link>
        ))}
    </section>
  );
}
