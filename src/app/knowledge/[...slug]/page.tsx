import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { scanArtifacts, resolveArtifact, readArtifact, readMetadata } from '../_lib/artifacts'
import ArtifactPreview from '../_components/artifact-preview'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return scanArtifacts()
}

export function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Metadata {
  const key = params.slug.join('/')
  const allMeta = readMetadata()
  const meta = allMeta[key]
  const title = meta?.title ?? params.slug.join(' / ')
  const description = meta?.desc ?? undefined

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Knowledge | Arno`,
      description,
      url: `https://arno.surfacew.com/knowledge/${key}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Knowledge | Arno`,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default function ArtifactPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const artifact = resolveArtifact(params.slug)
  if (!artifact) notFound()

  const code = readArtifact(artifact.filePath)

  return <ArtifactPreview code={code} mode={artifact.mode} slug={params.slug} />
}
