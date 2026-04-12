import 'server-only'

import { transformJSXWithEsbuild } from './transform-core'

declare const globalThis: { __knowledgeEsbuildServerInitPromise?: Promise<void> }

async function initEsbuildOnServer() {
  if (!globalThis.__knowledgeEsbuildServerInitPromise) {
    globalThis.__knowledgeEsbuildServerInitPromise = import('esbuild-wasm').then(
      (esbuild) =>
        esbuild.initialize({
          worker: false
        })
    )
  }
  await globalThis.__knowledgeEsbuildServerInitPromise
}

export async function transformJSXAtBuild(rawCode: string): Promise<string> {
  await initEsbuildOnServer()
  const esbuild = await import('esbuild-wasm')
  return transformJSXWithEsbuild(esbuild, rawCode)
}
