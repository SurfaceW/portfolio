'use client'

import { transformJSXWithEsbuild } from './transform-core'

declare const globalThis: { __knowledgeEsbuildClientInitPromise?: Promise<void> }

async function initEsbuild() {
  if (!globalThis.__knowledgeEsbuildClientInitPromise) {
    globalThis.__knowledgeEsbuildClientInitPromise = import('esbuild-wasm').then(
      (esbuild) =>
        esbuild.initialize({
          wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.27.4/esbuild.wasm',
          worker: true
        })
    )
  }
  await globalThis.__knowledgeEsbuildClientInitPromise
}

export async function transformJSX(rawCode: string): Promise<string> {
  await initEsbuild()
  const esbuild = await import('esbuild-wasm')
  return transformJSXWithEsbuild(esbuild, rawCode)
}
