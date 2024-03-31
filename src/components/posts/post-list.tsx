import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { TaggedLink } from '@/components/link/category-link'

export async function PostListServer({
  params
}: {
  params: {
    tag?: string
    lang?: string
  }
}) {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-2 tracking-tighter">
        POSTS from ARNO
        {params?.tag && (
          <span className="text-gray-700 mt-2 text-lg block">#{params?.tag}</span>
        )}
      </h1>
      <div className='mb-6'>
        {params?.lang === 'en' ? (
          <Link className="hover:bg-gray-400 transition-all ease-in underline" href="/posts/cn">中文</Link>
        ) : (
          <Link className="hover:bg-gray-400 transition-all ease-in underline" href="/posts/en">English</Link>
        )}
      </div>
      {allBlogs
        .filter((post: any) => {
          if (params.lang) {
            // i18n tag
            return post.tags?.includes(params.lang)
          }
          return true
        
        })
        .filter((post: any) => {
          if (params.tag) {
            return post.tags?.includes(params.tag)
          }
          return true
        })
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post: any) => (
          <>
            <Link
              key={post.slug}
              className="flex flex-col space-y-1"
              href={`/posts/${params.lang || 'en'}/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <h4 className="text-neutral-900 dark:text-neutral-100 tracking-tight text-lg font-bold hover:text-blue-500 transition-all ease-in duration-200">
                  {post.title}
                </h4>
                <p className="text-sm pt-2">{post.summary}</p>
                <p className="text-sm pt-2 text-gray-600">{post.publishedAt}</p>
              </div>
            </Link>
            <p className='mb-6'>
              {(post.tags || []).map((tag: any) => (
                <TaggedLink lang={params.lang || 'en'} tag={tag} key={tag} />
              ))}
            </p>
          </>
        ))}
    </section>
  )
}
