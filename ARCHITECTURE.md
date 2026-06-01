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
   │   │  (build-time)   │    │  esbuild-wasm (build-time) │    │
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
homepage, posts, knowledge index, sitemap, and artifact pages are all
statically generated at build time. The blog reads from compiled Contentlayer
output; the knowledge gallery reads `.jsx`/`.html` files from the filesystem
(`artifacts/`) and, for `.jsx`, compiles them to a self-contained HTML document
**at build time** on the server via `esbuild-wasm`. That prebuilt HTML is then
served inside a sandboxed `<iframe>`. The only runtime write path is
`/api/images`, which proxies authenticated uploads into Vercel Blob.

External surfaces:

- **Vercel platform** — hosting, edge cache, preview deploys, Blob, Edge Config.
- **GitHub** — source of truth; push to `main` triggers a production deploy.
- **Google Analytics** — page-level traffic only.
- **CDN packages (browser, inside artifact iframes)** — `cdn.tailwindcss.com`
  and unpkg-hosted React / ReactDOM, plus `esm.sh`-resolved
  framer-motion / lucide-react / recharts. `esbuild-wasm` itself runs at build
  time, not in the reader's browser (the only browser-side esbuild path is the
  live playground).

## Components and responsibilities

| Component | Lives in | Responsibility |
| --- | --- | --- |
| App shell | `src/app/layout.tsx`, `src/components/sidebar.tsx` | Global chrome, fonts, GA, sidebar nav |
| Home | `src/app/page.tsx` | Landing page composition (avatar, cards, manifesto, social) |
| Blog pipeline | `contentlayer.config.js`, `content/*.mdx`, `src/app/posts/**` | MDX → typed `Blog` documents → `/posts/[slug]` + `/posts/topics` |
| Knowledge pipeline | `artifacts/`, `src/app/knowledge/**` | File-scanned artifacts → listing + viewer + playground |
| JSX transform (shared core) | `src/app/knowledge/_lib/transform-core.ts` | Validate imports, compile JSX via `esbuild-wasm`, resolve a small allow-list of bare packages to CDN URLs |
| Build-time transform | `src/app/knowledge/_lib/transform-server.ts` | `transformJSXAtBuild` — runs the core on the server during static generation (esbuild `worker: false`) |
| Browser transform | `src/app/knowledge/_lib/transform.ts` | `transformJSX` — runs the core in the browser; used **only** by the playground editor |
| Doc builder | `src/app/knowledge/_lib/doc.ts` | Wraps compiled JS / raw HTML into a standalone iframe document (`buildJSXDoc` / `buildHTMLDoc`) |
| Image upload API | `src/app/api/images/route.ts` | `POST /api/images?filename=...&sk=...` → Vercel Blob |
| Sitemap / RSS | `src/app/sitemap.ts`, `src/app/posts/rss/route.ts` | SEO surface |
| Build-time bridge | `next.config.js`, `withContentlayer` | Wraps Next with Contentlayer, installs CSP/security headers |

## Key design decisions

### One Next.js app, two content streams

Splitting blog and knowledge into separate repos was rejected. They share the
shell, the sitemap, and the deploy. The split is logical (filesystem + URL
namespace), not physical.

### Both content streams compile at build time

Blog posts are MDX with frontmatter → typed at build by Contentlayer → static
pages. This optimizes for SEO, archive-ability, and zero runtime cost.

Knowledge artifacts are different by intent: each is an *interactive* page
(charts, animations, custom layouts). Forcing them through Contentlayer would
demand a unified component schema. Instead, each artifact is a self-contained
`.jsx` or `.html` file with its own imports. The artifact page is
`force-static`, so at build time the server compiles each `.jsx` with
`esbuild-wasm` (`transformJSXAtBuild`) and wraps the output in a standalone
HTML document (`buildJSXDoc`). That prebuilt document is served inside a
sandboxed `<iframe>` — the badge in the viewer literally reads `prebuilt`. The
reader's browser only runs the already-compiled JS plus React / Tailwind from
CDN; it never downloads or runs `esbuild-wasm`. Authoring stays dead simple:
"drop a file in `artifacts/<cat>/`, add a row to `metadata.json`, push."

The one place JSX is compiled in the browser is the live **playground**
(`/knowledge/playground`), which runs the same core via `transformJSX` so edits
preview instantly without a rebuild.

### Soft-private artifacts

Any `.jsx`/`.html` under `artifacts/` is reachable by URL, but only entries in
`artifacts/metadata.json` appear in the `/knowledge` index and the sitemap.
This gives drafts a hidden home without a separate auth model.

### Vercel as the platform contract

Edge Config, Blob, preview deploys, and the build pipeline are all Vercel
primitives. Portability is sacrificed for zero ops. If we ever leave Vercel,
`@vercel/blob` and `@vercel/edge-config` are the two coupling points to
replace.

### CSP is authored but not yet enforced

`next.config.js` defines a `securityHeaders` array — CSP with `unsafe-eval`,
X-Frame-Options DENY, HSTS, Referrer-Policy, Permissions-Policy. **It is not
wired:** there is no `headers()` export, so Next never emits these headers. In
production only Vercel's default HSTS is present; there is effectively no
app-level CSP today.

The `unsafe-eval` allowance exists in the authored policy because two
browser-side consumers need it: the Tailwind Play CDN (`cdn.tailwindcss.com`)
inside artifact iframes, and the live playground's `esbuild-wasm`. Published
artifacts run only precompiled JS but would inherit the parent CSP through the
`srcdoc` iframe, so the policy has to permit it. Activating the headers is a
tracked follow-up (see Open questions) — it must be verified against the
knowledge pipeline before shipping so artifacts don't break.

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

### esbuild-wasm for JSX compilation

The knowledge gallery's defining choice. Lets a `.jsx` artifact ship as a
single readable source file. The same compile core (`transform-core.ts`) runs
in two places: on the **server at build time** for published artifacts
(`transform-server.ts`, esbuild `worker: false`), and in the **browser** for
the live playground (`transform.ts`). Imports are limited to an allow-list of
bare packages (`react`, `react-dom`, `framer-motion`, `lucide-react`,
`recharts`); React/ReactDOM are shimmed to globals and the rest are rewritten
to `esm.sh` URLs. Adding to the list is the explicit lever for what artifacts
can express.

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
BUILD TIME  (force-static, runs on the server)
   src/app/knowledge/[...slug]/page.tsx
      │
      ▼
   resolveArtifact(slug) → fs reads .jsx or .html from artifacts/
      │
      ├── .html → buildHTMLDoc(code)
      └── .jsx  → transformJSXAtBuild(code)         server esbuild-wasm
                     │                                (worker: false)
                     ▼   bare imports → React/ReactDOM globals + esm.sh URLs
                  buildJSXDoc(compiledJS)            wraps in standalone HTML
                                                     (React + Tailwind via CDN)
      │
      ▼
   srcDoc string  →  prerendered into the static page

REQUEST TIME  (reader's browser)
   GET /knowledge/<category>/<name>
      │
      ▼
   ArtifactPreview renders the prebuilt srcDoc into
   <iframe sandbox="allow-scripts">  → browser runs precompiled JS,
   pulls React + Tailwind from CDN. No esbuild in the reader's browser.
```

Why this flow: compilation happens once at build time, so every reader gets a
static, cached page and the JSX toolchain never ships to the browser. The
sandboxed iframe isolates artifact code from the host page. (The live
playground is the exception — it compiles in the browser via `transformJSX` so
edits preview without a rebuild.)

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
| `artifacts/<cat>/*.{jsx,html}` + `artifacts/metadata.json` | File on disk + `{ title, emojiIcon, desc }` per listed entry | Edited in repo, scanned + compiled at build time (`force-static`) |
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
- **CSP / security headers:** authored in `next.config.js` but **not emitted**
  — there is no `headers()` export, so the CSP, X-Frame-Options, Referrer-
  Policy, and Permissions-Policy are inert. Production carries only Vercel's
  default HSTS. This is a known gap (see the CSP decision and Open questions),
  not an active control. The authored policy would allow `unsafe-eval`
  (Tailwind Play CDN + playground wasm) and `connect-src *` (artifacts fetch
  arbitrary CDNs by design).
- **Clickjacking:** the artifact iframe sandbox below is enforced (DOM
  attribute), but page-level frame protection (`X-Frame-Options` /
  `frame-ancestors`) is currently absent until the headers are wired.
- **Artifact sandbox:** artifacts execute inside an `<iframe
  sandbox="allow-scripts">`. Without `allow-same-origin`, the iframe runs in an
  opaque origin — it cannot read the host page's DOM, cookies, or storage. No
  server secrets reach the client. Artifacts can still make arbitrary network
  calls (connect-src is `*` by design). Since every artifact is
  author-controlled and merged via PR, this residual capability is acceptable.

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
| JSX build transform | Unsupported bare import or syntax error in `.jsx` | That one artifact page renders `compile error`; build still succeeds, rest of site fine | Fix the artifact or extend `SUPPORTED_BARE_IMPORTS` in `transform-core.ts` |
| Artifact runtime CDN | unpkg (React), `cdn.tailwindcss.com`, or `esm.sh` unreachable at request time | Affected `/knowledge/*` jsx artifacts render broken / unstyled | Wait for CDN; vendoring the deps into `public/` is the future hardening |
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

- **Security headers are dead code.** `securityHeaders` in `next.config.js` is
  defined but never exported via `headers()`, so CSP / X-Frame / Referrer /
  Permissions headers are not emitted. Wire an `async headers()` returning the
  array, then verify `/knowledge/*` artifacts still render under the CSP before
  shipping.
- **Edge Config currently unused.** Decide whether to wire it into a feature
  flag scheme or drop the dependency.
- **`scripts/gen-rss.js` is stale** (references `pages/posts`). The live RSS
  is at `src/app/posts/rss/route.ts`. Delete the legacy script in a future
  cleanup.
- **Knowledge artifact CDN coupling.** Published artifacts pull React,
  Tailwind, and `esm.sh` packages from third-party CDNs at request time.
  Long-term, vendoring these into `public/` would remove the runtime
  dependency and the need for `unsafe-eval` (Tailwind Play CDN).
