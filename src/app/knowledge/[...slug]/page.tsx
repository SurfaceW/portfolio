import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { scanArtifacts, resolveArtifact, readArtifact } from '../_lib/artifacts'
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
  return {
    title: params.slug.join(' / '),
    robots: { index: false, follow: false },
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
