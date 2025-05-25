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
      <a 
        className="block h-full text-slate-800 dark:text-slate-100 
                   hover:text-slate-900 dark:hover:text-white no-underline"
      >
        <div 
          className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 
                     h-full flex flex-col 
                     p-6
                     transition-all duration-300 ease-in-out 
                     hover:shadow-xl hover:-translate-y-1"
        >
          <h2 
            className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
          >
            {title}
          </h2>
          <p 
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 flex-grow"
          >
            {description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
