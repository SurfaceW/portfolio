import React from 'react'

interface CareerCardProps {
  careerSteps: string[]
}

const CareerCard: React.FC<CareerCardProps> = ({ careerSteps }) => {
  return (
    <div className="h-full flex flex-col justify-center p-4">
      <div className="flex items-center justify-center mb-3">
        <div className="text-2xl">💼</div>
      </div>
      
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
        Career Journey
      </h3>
      
      <div className="relative flex-1">
        {/* Simplified timeline line */}
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500 rounded-full"></div>
        
        <div className="space-y-3">
          {careerSteps.map((step, index) => (
            <div
              key={index}
              className="relative pl-6 group transition-all duration-200 hover:translate-x-1"
            >
              {/* Enhanced timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-110 transition-transform duration-200">
                <div className="absolute inset-0.5 bg-white dark:bg-gray-800 rounded-full"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500 rounded-full"></div>
              </div>
              
              {/* Step content */}
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                {step}
              </div>
            </div>
          ))}
        </div>
        
        {/* Arrow indicating progression */}
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CareerCard
