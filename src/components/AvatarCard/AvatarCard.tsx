import React from 'react';
import Image from 'next/image';

interface AvatarCardProps {
  imageUrl: string;
  name: string;
  title: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ imageUrl, name, title }) => {
  return (
    <div className="h-full flex flex-col justify-center p-4">
      {/* Emoji icon above the avatar */}
      <div className="flex items-center justify-center mb-2">
        <div className="text-2xl">👨‍💻</div>
      </div>
      
      {/* Avatar image with pulsing glow effect */}
      <div className="relative flex items-center justify-center mb-3">
        {/* Decorative pulsing background */}
        <div className="absolute w-24 h-24 rounded-full bg-blue-400/10 dark:bg-blue-300/5 animate-pulse"></div>
        
        {imageUrl === "[wip]" ? (
          <div className="w-20 h-20 rounded-full bg-slate-200/30 dark:bg-slate-700/30 
                 flex items-center justify-center text-slate-500 dark:text-slate-400 
                 z-10 border-2 border-blue-300/30 dark:border-blue-500/30">
            [wip]
          </div>
        ) : (
          <div className="relative w-20 h-20 z-10 rounded-full overflow-hidden border-2 border-blue-300/50 dark:border-blue-500/30 shadow-md">
            <Image 
              src={imageUrl} 
              alt={name}
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>
        )}
      </div>
      
      {/* Name with decorative underline */}
      <div className="text-center mb-1">
        <h2 className="inline-block text-lg font-bold text-slate-800 dark:text-slate-100 
                      pb-1 border-b-2 border-blue-400/30 dark:border-blue-500/30">
          {name}
        </h2>
      </div>
      
      {/* Title with subtle styling */}
      <div className="text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300 
                    px-3 py-1 bg-blue-50/30 dark:bg-blue-900/10 rounded-full inline-block">
          {title}
        </p>
      </div>
      
      {/* Decorative dots in corners */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-blue-400/40 dark:bg-blue-500/40"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-blue-400/40 dark:bg-blue-500/40"></div>
    </div>
  );
};

export default AvatarCard;
