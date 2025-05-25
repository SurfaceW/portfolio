import React from 'react';

interface WorkCardProps {
  icon: string; // Emoji string
  title: string;
  description: string;
  link: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="h-full flex flex-col justify-center p-4">
      {/* Icon container with animated glow effect */}
      <div className="relative flex items-center justify-center mb-3">
        <div className="absolute w-12 h-12 bg-rose-400/10 dark:bg-rose-300/5 rounded-full animate-pulse"></div>
        <div className="text-3xl z-10">{icon}</div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
        {title}
      </h3>
      
      <div className="relative flex-1 flex flex-col">
        {/* Description with side accent */}
        <div className="pl-3 border-l-2 border-rose-400 dark:border-rose-600 mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        
        {/* Button with hover effect */}
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-auto relative group flex items-center justify-center
                    bg-gradient-to-r from-rose-500/70 to-red-600/70 
                    hover:from-rose-400/70 hover:to-red-500/70
                    dark:from-rose-500/50 dark:to-red-600/50
                    dark:hover:from-rose-400/50 dark:hover:to-red-500/50
                    text-white font-medium text-sm
                    py-1.5 px-3 rounded-lg transition-all duration-200"
        >
          <span>Visit Project</span>
          
          {/* Arrow indicator */}
          <svg 
            className="w-3.5 h-3.5 ml-1 transition-transform duration-200 transform group-hover:translate-x-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default WorkCard;
