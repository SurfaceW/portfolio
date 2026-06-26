import React from 'react';

import type { ProductAccent } from '@/data/products';

interface WorkCardProps {
  accent?: ProductAccent;
  icon?: string;
  iconUrl?: string;
  title: string;
  description: string;
  link: string;
}

const accentStyles: Record<
  ProductAccent,
  {
    border: string;
    button: string;
    glow: string;
  }
> = {
  sky: {
    border: 'border-sky-400 dark:border-sky-500',
    button:
      'from-sky-500/70 to-blue-600/70 hover:from-sky-400/70 hover:to-blue-500/70 dark:from-sky-500/50 dark:to-blue-600/50 dark:hover:from-sky-400/50 dark:hover:to-blue-500/50',
    glow: 'bg-sky-400/10 dark:bg-sky-300/5',
  },
  amber: {
    border: 'border-amber-400 dark:border-amber-500',
    button:
      'from-amber-500/70 to-orange-600/70 hover:from-amber-400/70 hover:to-orange-500/70 dark:from-amber-500/50 dark:to-orange-600/50 dark:hover:from-amber-400/50 dark:hover:to-orange-500/50',
    glow: 'bg-amber-400/10 dark:bg-amber-300/5',
  },
  violet: {
    border: 'border-violet-400 dark:border-violet-500',
    button:
      'from-violet-500/70 to-purple-600/70 hover:from-violet-400/70 hover:to-purple-500/70 dark:from-violet-500/50 dark:to-purple-600/50 dark:hover:from-violet-400/50 dark:hover:to-purple-500/50',
    glow: 'bg-violet-400/10 dark:bg-violet-300/5',
  },
  rose: {
    border: 'border-rose-400 dark:border-rose-600',
    button:
      'from-rose-500/70 to-red-600/70 hover:from-rose-400/70 hover:to-red-500/70 dark:from-rose-500/50 dark:to-red-600/50 dark:hover:from-rose-400/50 dark:hover:to-red-500/50',
    glow: 'bg-rose-400/10 dark:bg-rose-300/5',
  },
  indigo: {
    border: 'border-indigo-400 dark:border-indigo-500',
    button:
      'from-indigo-500/70 to-violet-600/70 hover:from-indigo-400/70 hover:to-violet-500/70 dark:from-indigo-500/50 dark:to-violet-600/50 dark:hover:from-indigo-400/50 dark:hover:to-violet-500/50',
    glow: 'bg-indigo-400/10 dark:bg-indigo-300/5',
  },
};

const WorkCard: React.FC<WorkCardProps> = ({
  accent = 'rose',
  icon,
  iconUrl,
  title,
  description,
  link,
}) => {
  const styles = accentStyles[accent];

  return (
    <div className="h-full flex flex-col justify-center p-4">
      <div className="relative flex items-center justify-center mb-3">
        <div
          className={`absolute w-12 h-12 rounded-full animate-pulse ${styles.glow}`}
        />
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={`${title} app icon`}
            width={48}
            height={48}
            className="relative z-10 h-12 w-12 rounded-2xl object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
          />
        ) : (
          <div className="text-3xl z-10">{icon}</div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
        {title}
      </h3>

      <div className="relative flex-1 flex flex-col">
        <div className={`pl-3 border-l-2 mb-4 ${styles.border}`}>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto relative group flex items-center justify-center bg-gradient-to-r ${styles.button} text-white font-medium text-sm py-1.5 px-3 rounded-lg transition-all duration-200`}
        >
          <span>Visit Project</span>
          <svg
            className="w-3.5 h-3.5 ml-1 transition-transform duration-200 transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default WorkCard;
