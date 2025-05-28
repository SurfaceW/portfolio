import React from 'react';
import type { Photo } from '../../app/photography/page'; // Import the Photo interface

interface PhotoGridItemProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, onClick }) => {
  return (
    <button
      onClick={() => onClick(photo)}
      className="group block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-gray-800">{photo.title}</h3>
      </div>
    </button>
  );
};

export default PhotoGridItem;
