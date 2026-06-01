# Deployment

Source of truth for how this site ships. The `deploy` and `ship` skills read
this file.

## Platform

- **Provider:** Vercel
- **Project type:** Next.js 13 App Router web app
- **Region:** Vercel default (global edge + serverless)

## URLs

- **Production:** https://arno.surfacew.com
- **Staging:** none — preview deploys are auto-created per pull request
- **Health check:** `GET https://arno.surfacew.com/` (expect HTTP 200, page
  renders with sidebar)

## Deploy Flow

- **Trigger:** Auto-deploy on push to `main` (Vercel Git integration)
- **Workflow:** No GitHub Actions deploy workflow — Vercel owns the pipeline
- **Build command:** `pnpm build` (runs `next build`, which runs Contentlayer)
- **Output:** Next.js standalone build, served by Vercel
- **Preview:** Every PR gets a preview URL from Vercel
- **Status command:** Poll production URL — Vercel CLI is not required
- **Merge method:** Squash (matches existing PR history)

## Pre/Post Hooks

- **Pre-merge:** `pnpm build` should pass locally; CI on Vercel runs the same
  build for the preview deploy
- **Post-merge:** Vercel picks up the push to `main` and ships within ~2 min
- **Post-deploy verify:** Curl the production URL, confirm 200 and that the
  page is not blank

## Credentials & Secrets

All set in Vercel Project Settings → Environment Variables. Never commit
values.

| Name | Required | Used by |
| --- | --- | --- |
| `IMAGE_UPLOAD_SK` | yes | `src/app/api/images/route.ts` — gates Vercel Blob writes |
| `BLOB_READ_WRITE_TOKEN` | yes | `@vercel/blob` SDK (auto-provided by Vercel Blob integration) |
| `EDGE_CONFIG` | optional | `@vercel/edge-config` — imported in `next.config.js` (legacy / future flag use) |

> `.env` in the repo holds local-only stubs. Production values live in Vercel.

## Local Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # full production build (Contentlayer + Next)
pnpm start    # serve the production build locally
```

Node version follows what Vercel ships for Next 13 — no `.nvmrc` enforced.

## Versioning

- Semver tracked in `VERSION` (single source of truth).
- `CHANGELOG.md` records user-visible changes per release.
- Tags follow `v<major>.<minor>.<patch>` — created by the `deploy` skill on
  release.

## Known Constraints

- **Contentlayer build step.** Build will fail if any MDX frontmatter is
  missing a required field (`title`, `publishedAt`, `summary`). Validate
  before pushing.
- **Custom CSP** in `next.config.js` allows `unsafe-eval` (needed by
  `esbuild-wasm` for runtime JSX artifacts) and `cdn.tailwindcss.com` (runtime
  Tailwind in artifacts). Tightening CSP requires updating the knowledge
  artifact pipeline first.
- **TypeScript / ESLint errors are ignored at build time** (`next.config.js`).
  Catch them locally — Vercel will not block on them.

## Rollback

Vercel's instant rollback is the fastest path:

```text
Vercel dashboard → Deployments → pick last green → Promote to Production
```

Git-level revert (creates an audit trail):

```bash
git checkout main && git pull
git revert <bad-merge-sha> --no-edit
git push origin main   # Vercel auto-deploys the revert
```
