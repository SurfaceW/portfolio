import type { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { quotes } from '@/data/quotes'
import {
  getArtifactLastModified,
  getArtifactsWithMeta
} from './knowledge/_lib/artifacts'

const SITE_URL = 'https://arno.surfacew.com'

function withSiteUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const todayIso = new Date().toISOString()

  const blogs = allBlogs.map((post) => ({
    url: withSiteUrl(`/posts/${post.slug}`),
    lastModified: post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  const quotePages = quotes.map((quote) => ({
    url: withSiteUrl(`/quotes/${quote.id}`),
    lastModified: quote.date || todayIso,
    changeFrequency: 'yearly' as const,
    priority: 0.5
  }))

  const routes = [
    '',
    '/posts/topics',
    '/rss',
    '/idea',
    '/about',
    '/quotes',
    '/knowledge',
    '/knowledge/playground'
  ].map((route) => ({
    url: withSiteUrl(route),
    lastModified: todayIso,
    changeFrequency:
      route === '/knowledge' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/knowledge' ? 0.9 : 0.6
  }))

  const knowledgeArtifacts = getArtifactsWithMeta().map((artifact) => ({
    url: withSiteUrl(`/knowledge/${artifact.key}`),
    lastModified: getArtifactLastModified(artifact.slug),
    changeFrequency: 'monthly' as const,
    priority: artifact.meta.desc ? 0.85 : 0.75
  }))

  const languageTags = new Set<string>()
  const contentTags = new Set<string>()

  allBlogs.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tag === 'en' || tag === 'zh') {
          languageTags.add(tag)
        } else {
          contentTags.add(tag)
        }
      })
    }
  })

  const tagLangRoutes = []
  contentTags.forEach((tag) => {
    languageTags.forEach((lang) => {
      const relevantPosts = allBlogs.filter(
        (post) =>
          post.tags && post.tags.includes(tag) && post.tags.includes(lang)
      )

      if (relevantPosts.length > 0) {
        relevantPosts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        tagLangRoutes.push({
          url: withSiteUrl(`/posts/topics/${tag}/${lang}`),
          lastModified: relevantPosts[0].publishedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.7
        })
      }
    })
  })

  return [
    ...routes,
    ...blogs,
    ...quotePages,
    ...tagLangRoutes,
    ...knowledgeArtifacts
  ]
}
