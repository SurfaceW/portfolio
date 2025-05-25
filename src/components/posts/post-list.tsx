import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { TaggedLink } from '@/components/link/category-link'

export async function PostListServer({
  params,
  listOnly,
}: {
  params: {
    tag?: string
    lang?: string
  },
  listOnly?: boolean
}) {

  if (!params.lang) {
    params.lang = 'en'
  }

  return (
    <section>
      <h1 hidden={!!listOnly} className="font-bold text-2xl mb-4 tracking-tighter">
        POSTS from ARNO
        {params?.tag && (
          <span className="text-gray-700 mt-4 text-lg block">#{params?.tag}</span>
        )}
      </h1>
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
              href={`/posts/${post.slug}`}
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
