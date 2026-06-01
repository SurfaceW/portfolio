# Changelog

All notable changes to this project. Format roughly follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows
[Semantic Versioning](https://semver.org/).

User-facing changes go here. Internal refactors and doc-only edits are
optional — log them when they change how a contributor works.

## [Unreleased]

### Added
- Knowledge search — a front-end, instant title filter on `/knowledge`. Type in
  the search box to narrow the artifact gallery by title; sections re-group live
  with no network round-trip.
- Post outlines — a responsive "On this page" table of contents on
  `/posts/[slug]`. Headings are extracted at build time (Contentlayer
  `headings` field, slugs matching `rehype-slug`). On wide screens it shows as
  a small-font fixed rail in the left gutter (wider on 2xl) with scroll-spy and
  smooth-scroll; below `xl` it collapses into a compact disclosure above the
  article so mobile reading flow stays clean.
- `DEPLOYMENT.md` — formal deploy contract for Vercel.
- `ARCHITECTURE.md` — system blueprint for the portfolio + knowledge artifacts.
- `VERSION` + this `CHANGELOG.md` — release discipline scaffolding.

### Fixed
- Article pages no longer scroll horizontally. `html` now uses `overflow-x: clip`
  (a hard guarantee that's safe with the sticky sidebar and fixed TOC since
  `clip` creates no scroll container), and `.prose` wraps long unbreakable
  tokens (`overflow-wrap: break-word`). Wide tables / code still scroll inside
  their own box.
- `ARCHITECTURE.md` — corrected the knowledge-artifact flow: published JSX is
  compiled **server-side at build time** (`force-static` →
  `transformJSXAtBuild` → `buildJSXDoc` → sandboxed iframe), not in the
  reader's browser. Browser-side `esbuild-wasm` runs only in the playground.
  Updated the diagram, system overview, components, flows, CSP rationale,
  security sandbox, and failure modes to match.
- `ARCHITECTURE.md` + `DEPLOYMENT.md` — corrected the security-headers claim:
  `securityHeaders` in `next.config.js` is defined but never wired via a
  `headers()` export, so no app-level CSP / X-Frame / Referrer / Permissions
  headers are emitted (production carries only Vercel's default HSTS).
  Documented as a known gap with a wiring follow-up.

### Removed
- The `/idea` page and its nav tab. The module was no longer useful; its route,
  sitemap entry, nav item, and the now-unused `UVCardPromptStudio` /
  `UVCardElaborationStudio` components were removed.

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
