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

<!-- e-studio-agentic-rules:start -->
## E-Studio Managed Rules

This section is managed by E-Studio Copilot. Edit rule selections in the Agentic Capability Manager instead of editing these blocks by hand.

### coding/se.bp.mdc

Source: `/Users/ArnoYe/.agentic-arno/rules/coding/se.bp.mdc`
Source hash: `2792d1dba27b0501a9af226ca41c3578b806270bf30dd75d9211fe1083c2134f`

# SE Best Practices

## Philosophy

1. **Simplicity first** — clarity over cleverness; readability over abstraction
2. **Explicit over implicit**
3. **Single responsibility** — one component, one purpose
4. **Composition over inheritance** — reusable, composable components
5. **Colocation** — logic lives where it's used; minimize prop drilling
6. **Plugin architecture** — self-contained features, registration-only contracts
7. **Clean code, no patches** — no backward-compat baggage (mono-repo); refactor, don't hack
8. **Error boundaries** — graceful handling in both data and UI layers

## Patterns (priority order by context)

| Pattern              | Meaning                                     |
| -------------------- | ------------------------------------------- |
| **First Principles** | Core requirements & system boundaries       |
| **YAGNI**            | Build only what's needed now                |
| **KISS**             | Simplest viable design                      |
| **SOLID**            | SRP, OCP, etc. for modular design           |
| **DRY**              | Extract common logic, eliminate duplication |

Priority rotation:

- **Kickoff / architecture**: First Principles → YAGNI → KISS → SOLID → DRY
- **Feature iteration**: YAGNI → KISS → SOLID → DRY → First Principles
- **Utilities / libraries**: KISS → DRY → YAGNI → SOLID → First Principles
- **Complex domain modeling**: First Principles → SOLID → YAGNI → KISS → DRY

## Implementation

- Low-level code: _testable_ and _reusable_
- High-level code: clean `interfaces` and `APIs`
- Design for _performance_
- Max **600 lines** per file (VibeCoding complexity cap)
<!-- e-studio-agentic-rules:end -->
