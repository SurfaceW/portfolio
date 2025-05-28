'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { YouTubeEmbed } from '@/components/QuoteCard/YouTubeEmbed';

export interface QuoteCardProps {
  id: string;
  text: string;
  author?: string;
  date?: string;
  image?: string;
  youtubeUrl?: string;
  link?: string;
  isFeatured?: boolean;
  variant?: 'text' | 'media';
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  id,
  text,
  author,
  date,
  image,
  youtubeUrl,
  link,
  isFeatured = false,
  variant = 'text'
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -3,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Generate a random gradient for the card
  const gradients = [
    'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-800/30',
    'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-800/30',
    'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-800/30',
    'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:from-green-100 hover:to-teal-100 dark:hover:from-green-900/30 dark:hover:to-teal-800/30',
    'from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-800/20 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/30 dark:hover:to-pink-800/30',
    'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 hover:from-indigo-100 hover:to-violet-100 dark:hover:from-indigo-900/30 dark:hover:to-violet-800/30',
  ];
  
  // Use the quote ID to consistently pick the same gradient for each quote
  const gradientIndex = parseInt(id, 10) % gradients.length;
  const gradient = gradients[gradientIndex];

  // Determine text length to display based on card size
  const getDisplayText = () => {
    if (isFeatured) return text.length > 100 ? `${text.substring(0, 100)}...` : text;
    return text.length < 60 ? text : `${text.substring(0, 60)}...`;
  };

  const CardContent = () => (
    <motion.div 
      className={`h-full rounded-xl bg-gradient-to-br ${gradient} border border-white/50 dark:border-white/10 overflow-hidden shadow-md dark:shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layoutId={`quote-card-${id}`}
    >
      <div className={`flex flex-col h-full ${isFeatured ? 'p-4' : 'p-3'}`}>
        {/* Quote text */}
        <div className="flex-grow">
          <div className={`text-gray-400 dark:text-gray-500 ${isFeatured ? 'text-2xl' : 'text-xl'} leading-none`}>&ldquo;</div>
          <p className={`text-gray-800 dark:text-gray-200 font-medium leading-tight ${isFeatured ? 'text-base' : 'text-sm'} mt-1`}>
            {getDisplayText()}
          </p>
          <div className={`text-gray-400 dark:text-gray-500 text-right ${isFeatured ? 'text-2xl' : 'text-xl'} leading-none`}>&rdquo;</div>
        </div>

        {/* Media content - only show if featured or explicitly media variant */}
        {image && (isFeatured || variant === 'media') && (
          <div className="rounded-lg overflow-hidden mt-2 mb-2">
            <Image 
              src={image} 
              alt="Quote image" 
              width={isFeatured ? 600 : 300} 
              height={isFeatured ? 300 : 150} 
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {youtubeUrl && (isFeatured || variant === 'media') && (
          <div className="rounded-lg overflow-hidden mt-2 mb-2">
            <YouTubeEmbed url={youtubeUrl} />
          </div>
        )}

        {/* Author and date */}
        <div className="mt-auto">
          {author && (
            <p className={`text-gray-600 dark:text-gray-400 font-medium ${isFeatured ? 'text-sm' : 'text-xs'}`}>
              — {author}
            </p>
          )}
          {date && (
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full no-underline">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default QuoteCard; 