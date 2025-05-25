import React from 'react';
import Link from 'next/link';

interface BlogPostCardProps {
  title: string;
  description: string;
  slug: string; // Expects a full path like "/posts/my-post-slug"
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, description, slug }) => {
  return (
    <Link href={slug} passHref legacyBehavior>
      <a className="block h-full text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white no-underline">
        <div className="h-full p-4 group">
          {/* Extract emoji from title if it exists */}
          <div className="flex items-center mb-2">
            <div className="text-xl mr-2 group-hover:scale-110 transition-transform duration-200">
              {/* Show emoji icon if title starts with one, otherwise use 📝 as default */}
              {title.match(/^\p{Emoji}/u) ? title.match(/^\p{Emoji}/u)![0] : '📝'}
            </div>
            
            {/* Article title without the emoji */}
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {title.replace(/^\p{Emoji}\s*/u, '')}
            </h3>
          </div>
          
          <div className="relative pl-5">
            {/* Vertical line decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full group-hover:from-gray-400 group-hover:to-gray-500 dark:group-hover:from-gray-500 dark:group-hover:to-gray-600 transition-colors duration-200"></div>
            
            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
              {description}
            </p>
          </div>
          
          {/* Read indicator */}
          <div className="mt-3 flex justify-end">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
              Read more
              <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
