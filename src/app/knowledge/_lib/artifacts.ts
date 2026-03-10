import fs from 'fs'
import path from 'path'

export type ArtifactMode = 'html' | 'jsx'

const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts')

export function scanArtifacts(): { slug: string[] }[] {
  if (!fs.existsSync(ARTIFACTS_DIR)) return []

  const results: { slug: string[] }[] = []

  function walk(dir: string, parts: string[]) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath, [...parts, entry.name])
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name)
        if (ext === '.html' || ext === '.jsx') {
          results.push({ slug: [...parts, path.basename(entry.name, ext)] })
        }
      }
    }
  }

  walk(ARTIFACTS_DIR, [])
  return results
}

export function resolveArtifact(
  slug: string[]
): { filePath: string; mode: ArtifactMode } | null {
  const base = path.join(ARTIFACTS_DIR, ...slug)

  for (const ext of ['.jsx', '.html'] as const) {
    const filePath = `${base}${ext}`
    if (fs.existsSync(filePath)) {
      return { filePath, mode: ext === '.html' ? 'html' : 'jsx' }
    }
  }

  return null
}

export function readArtifact(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}
