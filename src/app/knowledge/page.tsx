import Link from 'next/link'
import type { Metadata } from 'next'
import { getArtifactsWithMeta } from './_lib/artifacts'

export const metadata: Metadata = {
  title: 'Knowledge',
  description: "Arno's interactive knowledge base — visual guides, demos, and living documents built with HTML and JSX.",
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
  const artifacts = getArtifactsWithMeta()

  const sections = new Map<string, typeof artifacts>()
  for (const artifact of artifacts) {
    const section = artifact.slug[0] ?? 'misc'
    if (!sections.has(section)) sections.set(section, [])
    sections.get(section)!.push(artifact)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0e0e0e] overflow-hidden"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
    >
      <div className="flex items-center justify-between px-5 h-10 border-b border-white/[0.06] shrink-0">
        <span className="text-[11px] text-white/40 tracking-widest uppercase">Knowledge</span>
        <Link
          href="/knowledge/playground"
          className="text-[11px] text-white/20 hover:text-white/45 transition-colors"
        >
          playground →
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {sections.size === 0 && (
          <p className="text-white/20 text-xs">No artifacts found.</p>
        )}

        {Array.from(sections.entries()).map(([section, items]) => (
          <section key={section} className="mb-8">
            <p className="text-[9px] uppercase tracking-widest text-white/20 mb-3">
              {section}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((item) => (
                <Link
                  key={item.key}
                  href={`/knowledge/${item.key}`}
                  className="group flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] px-4 py-3 transition-all"
                >
                  <span className="text-xl leading-none mt-0.5 shrink-0">{item.meta.emojiIcon}</span>
                  <div className="min-w-0">
                    <p className="text-[12px] text-white/60 group-hover:text-white/85 transition-colors truncate">
                      {item.meta.title}
                    </p>
                    {item.meta.desc && (
                      <p className="text-[11px] text-white/25 mt-0.5 leading-relaxed line-clamp-2">
                        {item.meta.desc}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
