import Link from 'next/link'
import type { Metadata } from 'next'
import { getArtifactsWithMeta } from './_lib/artifacts'

export const metadata: Metadata = {
  title: 'Knowledge',
  description: "Arno's interactive knowledge base — visual guides, demos, and living documents built with HTML and JSX.",
  openGraph: {
    title: 'Knowledge | Arno',
    description: "Interactive knowledge base — visual guides, demos, and living documents.",
    url: 'https://arno.surfacew.com/knowledge',
    siteName: 'Arno',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge | Arno',
    description: "Interactive knowledge base — visual guides, demos, and living documents.",
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
    <div className="min-h-screen">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Knowledge</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Interactive visual guides, demos, and living documents.
          </p>
        </div>
        <Link
          href="/knowledge/playground"
          className="text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-1.5 transition-colors shrink-0 mt-1"
        >
          Playground →
        </Link>
      </div>

      {sections.size === 0 && (
        <p className="text-neutral-400 text-sm">No artifacts found.</p>
      )}

      {Array.from(sections.entries()).map(([section, items]) => (
        <section key={section} className="mb-10">
          <h2 className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 font-medium">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <Link
                key={item.key}
                href={`/knowledge/${item.key}`}
                className="group flex items-start gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3.5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                <span className="text-2xl leading-none mt-0.5 shrink-0">{item.meta.emojiIcon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                    {item.meta.title}
                  </p>
                  {item.meta.desc && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed line-clamp-2">
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
  )
}
