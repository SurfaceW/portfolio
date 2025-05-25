import React from 'react';

interface AvatarCardProps {
  imageUrl: string;
  name: string;
  title: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ imageUrl, name, title }) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 
                 h-full flex flex-col items-center justify-center text-center 
                 p-4 sm:p-6" // Base padding for mobile, larger for sm+
    >
      {imageUrl === "[wip]" ? (
        <div 
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-200/30 dark:bg-slate-700/30 
                     flex items-center justify-center text-slate-500 dark:text-slate-400 
                     mb-3 sm:mb-4 text-xs sm:text-sm"
        >
          [wip]
        </div>
      ) : (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover 
                     mb-3 sm:mb-4 border-2 border-white/30 shadow-md"
        />
      )}
      <h2 
        className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-1"
      >
        {name}
      </h2>
      <p 
        className="text-sm sm:text-base text-slate-600 dark:text-slate-300"
      >
        {title}
      </p>
    </div>
  );
};

export default AvatarCard;
