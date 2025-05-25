import type { Metadata } from 'next';
import { PostListServer } from '@/components/posts/post-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function PostsListPageByTagServer({ params }: {
  params: {
    tag?: string;
  }
}) {
  return (
    <PostListServer params={params} />
  );
}
