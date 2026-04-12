'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { transformJSX } from '../_lib/transform'
import { buildHTMLDoc, buildJSXDoc } from '../_lib/doc'

type Mode = 'html' | 'jsx'

export default function PlaygroundEditor() {
  const [mode, setMode] = useState<Mode>('jsx')
  const [code, setCode] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [generation, setGeneration] = useState(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const modeRef = useRef(mode)
  modeRef.current = mode

  const compile = useCallback(async (value: string, currentMode: Mode) => {
    if (!value.trim()) {
      setSrcDoc('')
      setError(null)
      return
    }
    setError(null)
    setProcessing(true)
    try {
      const doc =
        currentMode === 'html'
          ? buildHTMLDoc(value)
          : buildJSXDoc(await transformJSX(value))
      setSrcDoc(doc)
      setGeneration((g) => g + 1)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      setError(msg.replace(/\[esbuild-wasm\]?\s*/gi, '').trim())
      setSrcDoc('')
    } finally {
      setProcessing(false)
    }
  }, [])

  const handleChange = useCallback(
    (value: string) => {
      setCode(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => compile(value, modeRef.current), 600)
    },
    [compile]
  )

  useEffect(() => {
    if (code.trim()) compile(code, mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

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
        <div className="h-3.5 w-px bg-white/[0.08]" />
        <div className="flex gap-0.5 rounded-md bg-white/[0.04] p-0.5">
          {(['html', 'jsx'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-0.5 text-xs rounded transition-all ${
                mode === m
                  ? 'bg-white/10 text-white'
                  : 'text-white/25 hover:text-white/45'
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="h-3.5 w-px bg-white/[0.08]" />

        {processing && (
          <span className="text-[10px] text-white/20 tracking-widest uppercase">
            compiling
          </span>
        )}
        {!processing && error && (
          <span className="text-[11px] text-red-400/70 truncate max-w-lg leading-tight">
            {error}
          </span>
        )}
        {!processing && !error && srcDoc && (
          <span className="text-[10px] text-emerald-500/40 tracking-widest uppercase">
            ready
          </span>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-white/[0.06]">
          <textarea
            className="flex-1 bg-transparent text-[12.5px] leading-relaxed text-white/50 p-4 resize-none focus:outline-none placeholder-white/[0.1]"
            placeholder={
              mode === 'html'
                ? 'Paste HTML here…'
                : 'Paste JSX here…\n\nexport default function App() {\n  return (\n    <div className="p-8">\n      <h1>Hello</h1>\n    </div>\n  )\n}'
            }
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="w-1/2 relative overflow-hidden bg-white">
          {srcDoc ? (
            <iframe
              key={generation}
              className="w-full h-full border-0"
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              title="preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-[#fafafa] text-slate-300 text-sm select-none">
              {mode === 'html' ? 'paste HTML to preview' : 'paste JSX to preview'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
