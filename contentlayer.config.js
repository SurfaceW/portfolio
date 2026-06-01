import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import GithubSlugger from 'github-slugger'

// Strip inline markdown so heading text reads cleanly in the outline.
function stripInlineMarkdown(text) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images → alt
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → label
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/~~(.*?)~~/g, '$1') // strikethrough
    .trim()
}

// Extract h2/h3 headings with slugs that match rehype-slug's generated ids.
// Every heading (h1–h6) is fed through one slugger in document order so the
// dedupe counter advances identically to rehype-slug.
function extractHeadings(raw) {
  const slugger = new GithubSlugger()
  const headings = []
  let inFence = false
  let fenceMarker = ''

  for (const line of raw.split('\n')) {
    const fence = line.match(/^\s*(```|~~~)/)
    if (fence) {
      if (!inFence) {
        inFence = true
        fenceMarker = fence[1]
      } else if (line.trimStart().startsWith(fenceMarker)) {
        inFence = false
      }
      continue
    }
    if (inFence) continue

    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*$/)
    if (!match) continue

    const level = match[1].length
    const text = stripInlineMarkdown(match[2])
    const slug = slugger.slug(text)
    if (level >= 2 && level <= 3) {
      headings.push({ level, text, slug })
    }
  }

  return headings
}

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  headings: {
    type: 'json',
    resolve: (doc) => extractHeadings(doc.body.raw)
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath
  },
  tweetIds: {
    type: 'list',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || []
    }
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      tags: doc.tags,
      image: doc.image
        ? `${doc.image}`
        : `https://arno.surfacew.com/posts/${doc.title}`,
      url: `https://arno.surfacew.com/posts/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Arno',
        url: 'https://arno.surfacew.com',
        sameAs: [
          'https://x.com/yeqingnan',
          'https://github.com/SurfaceW',
          'https://jike.city/arno'
        ]
      }
    })
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    publishedAt: {
      type: 'string',
      required: true
    },
    summary: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'list',
      of: {
        type: 'string'
      },
      required: false,
    },
    image: {
      type: 'string'
    }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
})
