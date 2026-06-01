# Architecture

This document explains **why** Arno's portfolio (`arno.surfacew.com`) is built
the way it is.

## The core idea

The site is two things in one Next.js app: a **statically-generated MDX blog**
(slow-moving, long-form essays) and a **gallery of live interactive artifacts**
(fast-moving, one-file JSX/HTML "knowledge cards"). The trick is that both
content streams plug into the same App Router shell without coupling to each
other — adding a blog post never touches the artifact pipeline, and shipping a
new artifact never rebuilds the blog. Vercel handles all the operational
weight; the repo stays a content-first codebase.

```
                       ┌────────────────────────────────────────┐
                       │  Vercel (edge + serverless + blob)     │
                       └──────────┬─────────────────────────────┘
                                  │ auto-deploy on push to main
                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │                 Next.js 13 App Router (src/app)            │
   │                                                            │
   │   ┌─────────────────┐    ┌────────────────────────────┐    │
   │   │  Blog pipeline  │    │  Knowledge pipeline        │    │
   │   │  content/*.mdx  │    │  artifacts/<cat>/*.jsx|html│    │
   │   │       │         │    │       │                    │    │
   │   │  Contentlayer   │    │  metadata.json (index)     │    │
   │   │  (build-time)   │    │  esbuild-wasm (runtime)    │    │
   │   │       ▼         │    │       ▼                    │    │
   │   │  /posts/[slug]  │    │  /knowledge/[...slug]      │    │
   │   └─────────────────┘    └────────────────────────────┘    │
   │              \                /                            │
   │               ▼              ▼                             │
   │            sitemap.ts, RSS, home, sidebar (shared shell)   │
   │                                                            │
   │   API: /api/images  ──► Vercel Blob (sk-gated upload)      │
   └────────────────────────────────────────────────────────────┘
```

## System overview

A reader's browser hits Vercel; Vercel serves the prebuilt Next.js app. The
homepage, posts, knowledge index, and sitemap are statically generated at
build time. The blog reads from compiled Contentlayer output; the knowledge
gallery reads from the filesystem (`artifacts/`) at request/build time and
transforms `.jsx` artifacts in the browser using `esbuild-wasm`. The only
runtime write path is `/api/images`, which proxies authenticated uploads into
Vercel Blob.

External surfaces:

- **Vercel platform** — hosting, edge cache, preview deploys, Blob, Edge Config.
- **GitHub** — source of truth; push to `main` triggers a production deploy.
- **Google Analytics** — page-level traffic only.
- **CDN packages** — `esbuild-wasm`, `cdn.tailwindcss.com`, and unpkg-hosted
  React/framer-motion/lucide/recharts for runtime artifact rendering.

## Components and responsibilities

| Component | Lives in | Responsibility |
| --- | --- | --- |
| App shell | `src/app/layout.tsx`, `src/components/sidebar.tsx` | Global chrome, fonts, GA, sidebar nav |
| Home | `src/app/page.tsx` | Landing page composition (avatar, cards, manifesto, social) |
| Blog pipeline | `contentlayer.config.js`, `content/*.mdx`, `src/app/posts/**` | MDX → typed `Blog` documents → `/posts/[slug]` + `/posts/topics` |
| Knowledge pipeline | `artifacts/`, `src/app/knowledge/**` | File-scanned artifacts → listing + viewer + playground |
| Runtime transform | `src/app/knowledge/_lib/transform-core.ts` | Validate imports, compile JSX in the browser via `esbuild-wasm`, resolve a small allow-list of bare packages |
| Image upload API | `src/app/api/images/route.ts` | `POST /api/images?filename=...&sk=...` → Vercel Blob |
| Sitemap / RSS | `src/app/sitemap.ts`, `src/app/posts/rss/route.ts` | SEO surface |
| Build-time bridge | `next.config.js`, `withContentlayer` | Wraps Next with Contentlayer, installs CSP/security headers |

## Key design decisions

### One Next.js app, two content streams

Splitting blog and knowledge into separate repos was rejected. They share the
shell, the sitemap, and the deploy. The split is logical (filesystem + URL
namespace), not physical.

### MDX builds, JSX renders at runtime

Blog posts are MDX with frontmatter → typed at build by Contentlayer → static
pages. This optimizes for SEO, archive-ability, and zero runtime cost.

Knowledge artifacts are different by intent: each is an *interactive* page
(charts, animations, custom layouts). Forcing them through Contentlayer would
demand a unified component schema. Instead, each artifact is a self-contained
`.jsx` or `.html` file with its own imports, compiled in the user's browser via
`esbuild-wasm`. The trade-off: each artifact incurs a one-time wasm + package
download in the browser, but authoring is dead simple ("drop a file in
`artifacts/<cat>/`, add a row to `metadata.json`, push").

### Soft-private artifacts

Any `.jsx`/`.html` under `artifacts/` is reachable by URL, but only entries in
`artifacts/metadata.json` appear in the `/knowledge` index and the sitemap.
This gives drafts a hidden home without a separate auth model.

### Vercel as the platform contract

Edge Config, Blob, preview deploys, and the build pipeline are all Vercel
primitives. Portability is sacrificed for zero ops. If we ever leave Vercel,
`@vercel/blob` and `@vercel/edge-config` are the two coupling points to
replace.

### CSP allows `unsafe-eval`

Required so the browser-side esbuild-wasm transform can execute compiled JSX.
This is a deliberate trade for the knowledge pipeline's authoring model. The
rest of the CSP stays tight (frame-ancestors none, X-Frame DENY, HSTS,
referrer policy).

### Auto-deploy on push to `main`

No staging branch, no CI gate. Preview deploys per PR are the safety net.
Solo author + small blast radius makes this the right cost/benefit. Bigger
team would need a `develop` branch and required CI.

## Stack decisions

### Next.js 13 App Router

Chosen for the file-based routing of `src/app/`, static + dynamic mixing,
first-class Vercel integration, and React Server Components for cheap
server-side data reads (filesystem scans for artifacts, no API layer needed).
Pinned to `13.5.5`; upgrading to 14 / 15 is deferred until there's a feature
that needs it — the current router is stable enough.

### Contentlayer

Turns MDX + frontmatter into a typed object graph at build time. Beats hand-
rolling `gray-matter` + glob + cache for ~30 posts. Risks: project is
sparsely maintained; `next-contentlayer` is pinned to `0.3.4`. Acceptable for
a personal site; the migration path (if needed) is Velite or MDX Bundler.

### Tailwind CSS

Pragmatic styling. Paired with `@tailwindcss/typography` for MDX prose.
`cdn.tailwindcss.com` is also loaded inside knowledge artifacts so each
artifact can use Tailwind without a build step.

### esbuild-wasm for runtime JSX

The knowledge gallery's defining choice. Lets a `.jsx` artifact ship as a
single readable source file, compiled on-demand in the browser. Limited to
an allow-list of bare imports (`react`, `react-dom`, `framer-motion`,
`lucide-react`, `recharts`) — see `transform-core.ts`. Adding to the list is
the explicit lever for what artifacts can express.

### Vercel Blob + Edge Config

- **Blob**: cheap public storage for uploaded images, gated by a single
  shared secret. Good enough for a personal use case; not a multi-tenant
  asset store.
- **Edge Config**: imported in `next.config.js` for future feature flags /
  per-route config. Currently unused at runtime — kept wired so the path is
  ready when needed.

## Key flows

### Read a blog post

```
GET /posts/<slug>
   │
   ▼
Next.js App Router → src/app/posts/[slug]/page.tsx
   │
   ▼
import { allBlogs } from "contentlayer/generated"   (built into the bundle)
   │
   ▼
Find post by slug → render MDX → ship cached HTML
```

Why: build-time generation means a post is free to serve and indexed cleanly.
Contentlayer's `structuredData` computed field is what gives each post its
schema.org BlogPosting payload.

### Render a knowledge artifact

```
GET /knowledge/<category>/<name>
   │
   ▼
src/app/knowledge/[...slug]/page.tsx   (Server Component)
   │
   ▼
resolveArtifact(slug)  →  fs reads .jsx or .html from artifacts/
   │
   ├── .html  → render inside an iframe / page shell
   └── .jsx   → ship source to ArtifactPreview client component
                    │
                    ▼
                esbuild-wasm compile (browser) → React component → mount
                bare imports resolved against esm.sh / unpkg pins
```

Why this flow: the server side stays trivial (read a file, hand it down).
The browser does the heavy lifting only when the user actually opens an
artifact, so the rest of the site pays no cost for the gallery.

### Build a sitemap

```
sitemap()  →  merges:
   • static routes (/, /knowledge, /idea, /posts/topics, /rss …)
   • allBlogs (from Contentlayer)
   • tag × language permutations (only when posts exist)
   • listed artifacts (metadata.json gated)
```

Why: keeps `/knowledge` discoverable while excluding unlisted drafts. Tag
pages only appear when there is at least one post backing them — no empty
landing pages.

### Upload an image

```
POST /api/images?filename=<name>&sk=<secret>
   │
   ▼
src/app/api/images/route.ts
   │
   ├── sk ≠ env.IMAGE_UPLOAD_SK  → 403
   ├── filename missing          → 400
   ▼
@vercel/blob `put(filename, body, { access: 'public' })`
   │
   ▼
Returns the public Blob URL
```

Why: single shared secret is the right primitive for a single-author tool.
The endpoint exists so a local script (or the `/internal/images` page) can
push images without leaving the editor.

## Data model

There is no database. Three "stores":

| Store | Shape | Lifecycle |
| --- | --- | --- |
| `content/*.mdx` | Frontmatter (`title`, `publishedAt`, `summary`, `tags`, `image`) + MDX body | Edited in repo, built by Contentlayer |
| `artifacts/<cat>/*.{jsx,html}` + `artifacts/metadata.json` | File on disk + `{ title, emojiIcon, desc }` per listed entry | Edited in repo, scanned at request/build time |
| Vercel Blob | Image URL list managed by Vercel | Written via `/api/images`, read by URL |

Access patterns:

- Blog: list by `publishedAt` desc; filter by tag + language.
- Knowledge: scan artifacts, join with metadata, group by category prefix
  (first slug segment).
- Sitemap: union of both, plus generated tag pages.

## Security model

- **Trust boundary:** anything in `content/` and `artifacts/` is fully trusted
  (Arno-authored, code-reviewed via git). Anything from the browser is
  untrusted.
- **AuthZ:** none for read paths. The only write path (`/api/images`) is
  gated by a single secret (`IMAGE_UPLOAD_SK`). Compromise rotates one env
  var.
- **Secrets:** managed in Vercel Project Settings. `.env` in the repo is
  development-only and contains no production credentials.
- **CSP:** custom in `next.config.js`. `unsafe-eval` is allowed (esbuild-wasm
  needs it). `frame-ancestors` is `DENY` via X-Frame-Options. Connect-src is
  `*` because artifacts may fetch arbitrary CDNs by design.
- **Artifact sandbox:** runtime artifacts execute in the user's browser with
  the site's origin. They cannot leak server secrets (none are sent to the
  client), but they can perform arbitrary network calls. Since every
  artifact is author-controlled and merged via PR, this is acceptable.

## Observability and operations

- **Logs / metrics:** Vercel platform logs (function invocations, builds,
  preview deploys). No custom telemetry beyond Google Analytics page views.
- **Alerts:** Vercel default email on failed deploys.
- **Build health:** local `pnpm build` is the regression check. Contentlayer
  catches malformed frontmatter; Next catches MDX syntax errors.
- **Deploy verification:** `DEPLOYMENT.md` defines the manual health check
  (curl prod URL). Good enough for a single-author site.

## Failure modes

| Component | Failure | Impact | Recovery |
| --- | --- | --- | --- |
| Contentlayer build | Missing frontmatter field in any MDX | Vercel build fails, prod unchanged | Fix the file, re-push. Preview deploy catches this before merge. |
| esbuild-wasm transform | Unsupported bare import in `.jsx` artifact | Artifact page shows error toast; site fine | Update artifact or extend `SUPPORTED_BARE_IMPORTS` in `transform-core.ts` |
| esbuild-wasm CDN | unpkg or wasm asset unreachable | All `/knowledge/*` jsx artifacts fail to render | Wait for CDN; pin local copies as a future hardening |
| Vercel Blob | Quota / API outage | `/api/images` returns 5xx; reads continue (URLs already public) | Wait, or fall back to local-only uploads |
| Vercel deploy | Bad merge breaks build | Auto-deploy fails, last good build remains live | Revert commit on `main`, or "Promote to Production" in Vercel UI |
| `IMAGE_UPLOAD_SK` leak | Anyone can write to Blob | Junk uploads; storage cost | Rotate env var in Vercel, redeploy |
| Tailwind CDN down | Knowledge artifacts unstyled | Cosmetic only on `/knowledge/*` | Wait; or migrate artifacts to local Tailwind build (high effort) |

## What's intentionally not here

- **No CMS.** Posts and artifacts are files under `git`. Versioning, review,
  and rollback come free.
- **No staging branch.** Per-PR preview deploys are the gate.
- **No database.** State that isn't a file isn't worth the operational cost
  for a single-author site.
- **No authentication.** Read-only public site. The single write endpoint
  uses a shared secret, not user accounts.
- **No GitHub Actions for deploy.** Vercel owns the pipeline end-to-end.
- **No analytics beyond GA.** Heatmaps, custom funnels, RUM — all rejected
  as overkill.
- **No internationalization framework.** Bilingual is handled by tagging
  posts (`en`, `zh`) and routing through `/posts/topics`. No `next-intl`,
  no `i18n.locales`.
- **No design system package.** Tailwind + a few hand-written cards in
  `src/components/`. Extraction happens when there's a third site to share
  with.

## Open questions

- **Edge Config currently unused.** Decide whether to wire it into a feature
  flag scheme or drop the dependency.
- **`scripts/gen-rss.js` is stale** (references `pages/posts`). The live RSS
  is at `src/app/posts/rss/route.ts`. Delete the legacy script in a future
  cleanup.
- **Knowledge artifact CDN coupling.** Long-term, we may want to vendor
  `esbuild-wasm` and the allow-listed packages into `public/` to remove the
  third-party CDN dependency.
