# portfolio

Arno's personal blog & portfolio site — **arno.surfacew.com**.

Built with Next.js 13 (App Router), Contentlayer, Tailwind CSS, and deployed on Vercel.

## Directory Map

| Directory | Purpose |
| ------------- | ---------------------------------------------------- |
| `content/` | MDX blog posts (processed by Contentlayer) |
| `src/app/` | Next.js App Router pages & API routes |
| `src/components/` | Shared React components |
| `src/data/` | Static data |
| `artifacts/` | Standalone JSX/HTML knowledge pages served at `/knowledge` |
| `public/` | Static assets (fonts, images, favicon) |
| `scripts/` | Build-time utilities (RSS generation) |
| `.context/` | Project manifest & commit instructions |

## Content Authoring

- Blog posts live in `content/*.mdx` with frontmatter: `title`, `publishedAt`, `summary`, `tags`, `image`.
- Artifacts are standalone `.jsx` or `.html` files in `artifacts/<category>/`, registered in `artifacts/metadata.json`.
- Artifacts render at `/knowledge` and `/knowledge/<category>/<name>`.

## Tech Stack

- **Runtime**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Content**: Contentlayer + MDX, remark-gfm, rehype-pretty-code (shiki)
- **Deploy**: Vercel (Edge Config, Blob storage)
- **Package manager**: pnpm

## Key Routes

| Route | Source |
| -------------------------------- | ------------------------------------ |
| `/` | `src/app/page.tsx` — homepage |
| `/posts/[slug]` | `src/app/posts/[slug]/page.tsx` |
| `/posts/topics` | Tag-based post listing |
| `/knowledge` | Artifact gallery |
| `/knowledge/[...slug]` | Single artifact viewer |
| `/idea` | Idea page |

## Requirements

- We **simplify**, we perfect. Simple and elegant words / output.
- Keep posts bilingual-friendly (English and Chinese).
- Preserve existing Contentlayer schema when adding new MDX fields.
