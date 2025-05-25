import React from 'react';

interface WorkCardProps {
  icon: string; // Emoji string
  title: string;
  description: string;
  link: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ icon, title, description, link }) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 
                 h-full flex flex-col 
                 p-4 sm:p-6" // Base padding mobile, larger for sm+
    >
      <div className="mb-3 sm:mb-4">
        <span 
          aria-hidden="true" 
          className="text-3xl sm:text-4xl" // Emoji icon size
        >
          {icon}
        </span>
      </div>
      <h2 
        className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 sm:mb-3"
      >
        {title}
      </h2>
      <p 
        className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 flex-grow"
      >
        {description}
      </p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-auto block w-full sm:w-auto text-center 
                   bg-blue-600/70 hover:bg-blue-500/70 dark:bg-blue-500/70 dark:hover:bg-blue-400/70 
                   text-white font-medium 
                   py-2 px-4 rounded-lg transition-colors duration-150"
      >
        Learn More
      </a>
    </div>
  );
};

export default WorkCard;
