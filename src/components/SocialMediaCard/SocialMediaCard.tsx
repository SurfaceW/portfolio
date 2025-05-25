import React from 'react';

interface SocialMediaLink {
  name: string;
  url: string;
  // Optional: iconClass for a font icon, or component for SVG icon
  // icon?: string | React.ReactElement;
}

interface SocialMediaCardProps {
  socialLinks: SocialMediaLink[];
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ socialLinks }) => {
  return (
    <div className="h-full flex flex-col justify-center p-4">
      {/* Header with emoji icon */}
      <div className="flex items-center justify-center mb-3">
        <div className="text-2xl">🔗</div>
      </div>
      
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
        Connect with Me
      </h3>
      
      {/* Links with orbital dots styling */}
      <div className="relative flex-1 flex justify-center items-center">
        {/* Background decorative element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-emerald-400/10 dark:bg-emerald-300/5 animate-pulse"></div>
        </div>
        
        <ul className="relative z-10 flex flex-wrap justify-center gap-2">
          {socialLinks.map((link, index) => (
            <li key={index} className="relative">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-white/10 dark:bg-slate-800/30 hover:bg-white/20 dark:hover:bg-slate-700/50
                           border border-emerald-300/20 dark:border-emerald-500/20
                           text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200
                           font-medium text-sm 
                           py-2 px-3 rounded-lg 
                           transition-all duration-200 ease-in-out transform hover:scale-105 hover:translate-x-1"
              >
                {link.name}
                
                {/* Decorative dot */}
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500 rounded-full"></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialMediaCard;
