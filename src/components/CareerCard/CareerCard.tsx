import React from 'react';

interface CareerCardProps {
  careerSteps: string[];
}

const CareerCard: React.FC<CareerCardProps> = ({ careerSteps }) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 
                 h-full flex flex-col justify-center 
                 p-4 sm:p-6" // Base padding mobile, larger for sm+
    >
      <div className="relative">
        {/* Timeline vertical line */}
        <div 
          className="hidden sm:block absolute top-0 left-3 sm:left-4 w-0.5 h-full 
                     bg-blue-300/70 dark:bg-blue-500/70 rounded-full"
        ></div>
        <ul className="list-none m-0 p-0">
          {careerSteps.map((step, index) => (
            <li 
              key={index} 
              className="relative pl-8 sm:pl-10 mb-3 last:mb-0 
                         text-base sm:text-lg text-slate-700 dark:text-slate-200"
            >
              {/* Timeline marker dot */}
              <div 
                className="absolute top-1/2 left-0 sm:left-0.5 transform -translate-y-1/2 
                           w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 dark:bg-blue-300 rounded-full border-2 border-white/50 dark:border-slate-800/50"
              ></div>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CareerCard;
