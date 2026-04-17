import fs from 'fs'
import path from 'path'

export type ArtifactMode = 'html' | 'jsx'

export type ArtifactMeta = {
  title: string
  emojiIcon: string
  desc: string
}

export type ArtifactEntry = {
  slug: string[]
  key: string
  meta: ArtifactMeta
}

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

export function readMetadata(): Record<string, ArtifactMeta> {
  const metaPath = path.join(ARTIFACTS_DIR, 'metadata.json')
  if (!fs.existsSync(metaPath)) return {}
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
  } catch {
    return {}
  }
}

export function getArtifactsWithMeta(): ArtifactEntry[] {
  const artifacts = scanArtifacts()
  const metadata = readMetadata()
  return artifacts.map(({ slug }) => {
    const key = slug.join('/')
    return {
      slug,
      key,
      meta: metadata[key] ?? {
        title: slug[slug.length - 1]
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        emojiIcon: '📄',
        desc: ''
      }
    }
  })
}

export function getArtifactLastModified(slug: string[]): string {
  const artifact = resolveArtifact(slug)
  const metaPath = path.join(ARTIFACTS_DIR, 'metadata.json')

  const timestamps: number[] = []
  if (artifact && fs.existsSync(artifact.filePath)) {
    timestamps.push(fs.statSync(artifact.filePath).mtimeMs)
  }
  if (fs.existsSync(metaPath)) {
    timestamps.push(fs.statSync(metaPath).mtimeMs)
  }

  const latest = timestamps.length > 0 ? Math.max(...timestamps) : Date.now()
  return new Date(latest).toISOString()
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
