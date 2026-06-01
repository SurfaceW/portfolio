'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { ArtifactEntry } from '../_lib/artifacts'

export function KnowledgeGallery({ artifacts }: { artifacts: ArtifactEntry[] }) {
  const [query, setQuery] = useState('')

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = q
      ? artifacts.filter((a) => a.meta.title.toLowerCase().includes(q))
      : artifacts

    const grouped = new Map<string, ArtifactEntry[]>()
    for (const artifact of filtered) {
      const section = artifact.slug[0] ?? 'misc'
      if (!grouped.has(section)) grouped.set(section, [])
      grouped.get(section)!.push(artifact)
    }
    return Array.from(grouped.entries())
  }, [artifacts, query])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-5 pt-5 pb-3 shrink-0">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title…"
          aria-label="Search artifacts by title"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[12px] text-white/70 placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {sections.length === 0 && (
          <p className="text-white/20 text-xs">
            {query.trim() ? 'No artifacts match your search.' : 'No artifacts found.'}
          </p>
        )}

        {sections.map(([section, items]) => (
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
