'use client';

import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';

const navItems = {
  '/': {
    name: 'ARNO',
  },
  '/posts': {
    name: 'POSTS',
  },
  '/idea': {
    name: 'IDEA',
  },
  '/quotes': {
    name: 'QUOTES',
  },
  '/posts/rss': {
    name: 'RSS',
    target: '_blank'
  }
};

export default function Navbar() {
  
  let pathname = usePathname() || '/';

  const { lang } = useParams<{ lang: string }>();

  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              {Object.entries(navItems).map(([path, { name }]) => {
                let isActive = path === pathname;
                if (path === '/posts') {
                  isActive = pathname.startsWith('/posts');
                }
                return (
                  <Link
                    key={path}
                    href={path}
                    target={navItems[path].target || '_self'}
                    className={clsx(
                      'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
                      {
                        'text-neutral-500': !isActive,
                      }
                    )}
                  >
                    <span className="relative py-1 px-2">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
