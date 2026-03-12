'use client'

import { useEffect, useState } from 'react'
import { transformJSX, buildHTMLDoc, buildJSXDoc } from '../_lib/transform'
import type { ArtifactMode } from '../_lib/artifacts'

interface Props {
  code: string
  mode: ArtifactMode
  slug: string[]
}

export default function ArtifactPreview({ code, mode, slug }: Props) {
  const [srcDoc, setSrcDoc] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function compile() {
      setLoading(true)
      setError(null)
      try {
        const doc =
          mode === 'html'
            ? buildHTMLDoc(code)
            : buildJSXDoc(await transformJSX(code))
        if (!cancelled) setSrcDoc(doc)
      } catch (e: any) {
        if (!cancelled)
          setError((e?.message ?? String(e)).replace(/\[esbuild-wasm\]?\s*/gi, '').trim())
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    compile()
    return () => {
      cancelled = true
    }
  }, [code, mode])

  const pathStr = slug.join('/')

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0e0e0e]"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
    >
      <div className="flex items-center gap-3 px-4 h-10 border-b border-white/[0.06] shrink-0">
        <a
          href="/knowledge"
          className="text-white/20 hover:text-white/45 text-[11px] transition-colors shrink-0"
        >
          ← knowledge
        </a>
        <div className="h-3.5 w-px bg-white/[0.06] shrink-0" />
        <span className="text-[11px] text-white/20 truncate min-w-0">
          artifacts/{pathStr}
        </span>
        <span
          className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest shrink-0 ${
            mode === 'jsx'
              ? 'text-sky-400/50 bg-sky-400/[0.06]'
              : 'text-amber-400/50 bg-amber-400/[0.06]'
          }`}
        >
          {mode}
        </span>
        <div className="ml-auto shrink-0">
          {loading && (
            <span className="text-[10px] text-white/15 tracking-widest uppercase">
              compiling
            </span>
          )}
          {!loading && error && (
            <span className="text-[11px] text-red-400/60 truncate max-w-xs">{error}</span>
          )}
          {!loading && !error && (
            <span className="text-[10px] text-emerald-500/30 tracking-widest uppercase">
              ready
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-white">
        {srcDoc ? (
          <iframe
            className="w-full h-full border-0"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            title={`artifacts/${pathStr}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-[#fafafa] text-slate-300 text-sm select-none">
            {loading ? 'compiling…' : error ? 'compile error' : 'empty'}
          </div>
        )}
      </div>
    </div>
  )
}
