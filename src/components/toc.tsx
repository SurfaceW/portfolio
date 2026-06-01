'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

export type Heading = {
  level: number
  text: string
  slug: string
}

export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 1 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault()
    const el = document.getElementById(slug)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${slug}`)
    setActiveId(slug)
    // Collapse the mobile disclosure after navigating.
    event.currentTarget.closest('details')?.removeAttribute('open')
  }

  if (headings.length === 0) return null

  const list = (
    <ul className="space-y-1.5 border-l border-neutral-200 text-xs dark:border-neutral-800">
      {headings.map((heading) => {
        const isActive = activeId === heading.slug
        return (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              onClick={(event) => handleClick(event, heading.slug)}
              className={clsx(
                '-ml-px block border-l py-0.5 leading-snug transition-colors',
                isActive
                  ? 'border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              )}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75 + 0.75}rem` }}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {/* Desktop: fixed rail in the left gutter. Wider + larger on 2xl. */}
      <nav
        aria-label="Table of contents"
        className="fixed top-32 block max-h-[78vh] overflow-y-auto w-40 left-[max(1rem,calc(50%-39.5rem))]"
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          On this page
        </p>
        {list}
      </nav>

      {/* Mobile / tablet: collapsible disclosure above the article. */}
      <details className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900 xl:hidden">
        <summary className="cursor-pointer select-none list-none text-xs font-semibold uppercase tracking-wider text-neutral-500 marker:content-none dark:text-neutral-400">
          On this page
        </summary>
        <div className="mt-3 max-h-[50vh] overflow-y-auto">{list}</div>
      </details>
    </>
  )
}
