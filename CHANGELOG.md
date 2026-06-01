# Changelog

All notable changes to this project. Format roughly follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows
[Semantic Versioning](https://semver.org/).

User-facing changes go here. Internal refactors and doc-only edits are
optional — log them when they change how a contributor works.

## [Unreleased]

### Added
- `DEPLOYMENT.md` — formal deploy contract for Vercel.
- `ARCHITECTURE.md` — system blueprint for the portfolio + knowledge artifacts.
- `VERSION` + this `CHANGELOG.md` — release discipline scaffolding.

## [0.1.0] — 2026-06-01

Baseline release. Snapshot of the site as it shipped to `arno.surfacew.com`
before formal release docs existed. Highlights of work prior to this version:

### Added
- Blog at `/posts/[slug]` powered by Contentlayer + MDX, bilingual (en / zh).
- Knowledge gallery at `/knowledge` rendering standalone JSX/HTML artifacts
  via runtime esbuild-wasm transform.
- Topics index at `/posts/topics` with tag + language filtering.
- Image upload API at `/api/images` backed by Vercel Blob (sk-gated).
- Dynamic `sitemap.ts` covering posts, tag pages, and listed artifacts.
- RSS feed at `/posts/rss`.
- Google Analytics (G-2SWQ9FNXGM) and custom CSP / security headers.

### Notes
- Versions prior to 0.1.0 were not tagged. Git history (`git log`) is the
  reference for earlier work.
