import React from 'react';

interface ManifestoCardProps {
  manifestoItems: string[];
}

const ManifestoCard: React.FC<ManifestoCardProps> = ({ manifestoItems }) => {
  return (
    <div className="h-full flex flex-col justify-center p-4">
      {/* Header with emoji icon */}
      <div className="flex items-center justify-center mb-3">
        <div className="text-2xl">📜</div>
      </div>
      
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
        My Manifesto
      </h3>
      
      <div className="relative flex-1">
        {/* Decorative side line */}
        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500 rounded-full"></div>
        
        {/* Manifesto items */}
        <ul className="list-none p-0 m-0 pl-4">
          {manifestoItems.map((item, index) => (
            <li 
              key={index} 
              className="relative pl-6 group transition-all duration-200 hover:translate-x-1 py-2 text-base sm:text-md text-slate-700 dark:text-slate-200"
            >
              {/* Enhanced dot marker */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500 rounded-full border border-white dark:border-gray-800 shadow-sm group-hover:scale-110 transition-transform duration-200">
                <div className="absolute inset-0.5 bg-white dark:bg-gray-800 rounded-full"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500 rounded-full"></div>
              </div>
              
              {/* Item content */}
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
        
        {/* Decorative flourish */}
        <div className="absolute right-0 bottom-0 text-purple-500/30 dark:text-purple-400/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ManifestoCard;
