import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx'
import { allBlogs } from 'contentlayer/generated'
import Balancer from 'react-wrap-balancer'
import { Suspense } from 'react'
import Script from 'next/script'
import { UVCardElaborationStudio } from '@/components/uv-card/uv-card'

export async function generateMetadata({
  params
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
    tags
  } = post
  const defaultImageUrl = 'https://6gflxwplhijgv9h7.public.blob.vercel-storage.com/20250526164830-wyxK0U7FPmPVfkNCdbXytJ2YOFTwnu.jpg'
  const ogImage = image ? image : defaultImageUrl

  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://arno.surfacew.com/posts/${slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return `${fullDate} (${formattedDate})`
}

export default async function BlogPost({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arno.surfacew.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Posts",
        "item": "https://arno.surfacew.com/posts/topics"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://arno.surfacew.com/posts/${post.slug}`
      }
    ]
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData)
        }}
      ></script>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body.code} />
      <br />
      <div className="arno-recommendation mt-8">
        <h2 className="pb-4">Arno Crafting Apps</h2>
        <UVCardElaborationStudio />
      </div>
      <div className="giscus">

      </div>
      <Script
        src="https://giscus.app/client.js"
        id="giscus-script"
        data-repo="SurfaceW/portfolio"
        data-repo-id="R_kgDOGun1sw"
        data-category="General"
        data-category-id="DIC_kwDOGun1s84CfMm1"
        data-mapping="title"
        data-strict="1"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async
      ></Script>
    </section>
  )
}
