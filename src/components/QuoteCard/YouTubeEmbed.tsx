'use client';

import React from 'react';

interface YouTubeEmbedProps {
  url: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL</div>;
  }

  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}; 