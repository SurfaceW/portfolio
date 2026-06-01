import type { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import {
  getArtifactLastModified,
  getListedArtifacts
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

  const routes = [
    '',
    '/posts/topics',
    '/posts/rss',
    '/idea',
    '/knowledge',
    '/knowledge/playground'
  ].map((route) => ({
    url: withSiteUrl(route),
    lastModified: todayIso,
    changeFrequency:
      route === '/knowledge' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/knowledge' ? 0.9 : 0.6
  }))

  const knowledgeArtifacts = getListedArtifacts().map((artifact) => ({
    url: withSiteUrl(`/knowledge/${artifact.key}`),
    lastModified: getArtifactLastModified(artifact.slug),
    changeFrequency: 'monthly' as const,
    priority: artifact.meta.desc ? 0.85 : 0.75
  }))

  const contentTags = new Set<string>()
  allBlogs.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tag !== 'en' && tag !== 'zh') contentTags.add(tag)
      })
    }
  })

  const tagRoutes = Array.from(contentTags).flatMap((tag) => {
    const relevantPosts = allBlogs
      .filter((post) => post.tags?.includes(tag))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )

    if (relevantPosts.length === 0) return []

    return [
      {
        url: withSiteUrl(`/posts/topics/tag/${encodeURIComponent(tag)}`),
        lastModified: relevantPosts[0].publishedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }
    ]
  })

  return [
    ...routes,
    ...blogs,
    ...tagRoutes,
    ...knowledgeArtifacts
  ]
}
