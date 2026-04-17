import type { Metadata } from 'next';
import { PostListServer } from '@/components/posts/post-list';

export function generateMetadata({ params }: {
  params: {
    tag?: string;
  }
}): Metadata {
  const decodedTag = params.tag ? decodeURIComponent(params.tag) : undefined;
  const title = decodedTag ? `Blog: ${decodedTag}` : 'Blog';
  const description = decodedTag
    ? `Read posts tagged "${decodedTag}" on software development, design, and more.`
    : 'Read my thoughts on software development, design, and more.';

  return {
    title,
    description,
    alternates: {
      canonical: decodedTag
        ? `/posts/topics/tag/${encodeURIComponent(decodedTag)}`
        : '/posts/topics',
    },
  };
}

export default async function PostsListPageByTagServer({ params }: {
  params: {
    tag?: string;
  }
}) {
  return (
    <PostListServer params={params} />
  );
}
