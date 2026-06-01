import Link from 'next/link'
import type { Metadata } from 'next'
import { getListedArtifacts } from './_lib/artifacts'
import { KnowledgeGallery } from './_components/knowledge-gallery'

export const metadata: Metadata = {
  title: 'Knowledge',
  description: "Arno's interactive knowledge base — visual guides, demos, and living documents built with HTML and JSX.",
  alternates: {
    canonical: '/knowledge',
  },
  openGraph: {
    title: 'Knowledge | Arno',
    description: 'Interactive knowledge base — visual guides, demos, and living documents.',
    url: 'https://arno.surfacew.com/knowledge',
    siteName: 'Arno',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge | Arno',
    description: 'Interactive knowledge base — visual guides, demos, and living documents.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KnowledgeDashboard() {
  const artifacts = getListedArtifacts()

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0e0e0e] overflow-hidden"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
    >
      <div className="flex items-center justify-between px-5 h-10 border-b border-white/[0.06] shrink-0">
        <h1 className="text-[11px] text-white/40 tracking-widest uppercase font-normal m-0">Knowledge</h1>
        <Link
          href="/knowledge/playground"
          className="text-[11px] text-white/20 hover:text-white/45 transition-colors"
        >
          playground →
        </Link>
      </div>

      <KnowledgeGallery artifacts={artifacts} />
    </div>
  )
}
