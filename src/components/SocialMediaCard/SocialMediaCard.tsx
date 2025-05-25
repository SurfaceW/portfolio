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
    <div 
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 
                 h-full flex flex-col items-center justify-center 
                 p-4 sm:p-5" // Base padding mobile, larger for sm+
    >
      <ul 
        className="list-none p-0 m-0 flex flex-wrap justify-center 
                   gap-3 sm:gap-4" // Responsive gap for links
      >
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-white/5 dark:bg-slate-800/20 hover:bg-white/20 dark:hover:bg-slate-700/30 
                         border border-white/10 dark:border-slate-700/30 
                         text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white
                         font-medium text-sm sm:text-base 
                         py-2 px-3 sm:py-2 sm:px-4 rounded-lg 
                         transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              {/* Optional: Add icon here if needed */}
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaCard;
