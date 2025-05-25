import React from 'react';

interface ManifestoCardProps {
  manifestoItems: string[];
}

const ManifestoCard: React.FC<ManifestoCardProps> = ({ manifestoItems }) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 
                 h-full flex flex-col justify-center 
                 p-6" // Consistent padding with other cards
    >
      <ul className="list-none p-0 m-0">
        {manifestoItems.map((item, index) => (
          <li 
            key={index} 
            className="text-base sm:text-lg text-slate-700 dark:text-slate-200 
                       py-2 sm:py-1.5 border-b border-white/15 
                       last:border-b-0 flex items-center"
          >
            <span 
              aria-hidden="true" 
              className="mr-3 text-blue-400 dark:text-blue-300 text-xl sm:text-2xl" // Adjusted marker color & size
            >
              ❖
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManifestoCard;
