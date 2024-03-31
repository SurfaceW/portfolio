import type { Metadata } from 'next'
import { PostListServer } from '@/components/posts/post-list'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.'
}

export default async function PostPageServer({
  params
}: {
  params: {
    tag?: string
    lang?: string
  }
}) {
  // const allViews = await getViewsCount();

  return (
    <>
      <PostListServer params={params} />
    </>
  )
}
