import React from 'react';
import type { Photo } from '../../app/photography/page'; // Import the Photo interface

interface PhotoDetailModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ photo, isOpen, onClose }) => {
  if (!isOpen || !photo) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose} // Close modal if overlay is clicked
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent click through to overlay
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl leading-none focus:outline-none z-10"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-4">
          <div className="md:col-span-3 aspect-w-3 aspect-h-4 overflow-hidden rounded-lg max-h-[75vh]">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="object-contain w-full h-full" // Changed to object-contain to see full image
            />
          </div>
          <div className="md:col-span-2 flex flex-col pt-2">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">{photo.title}</h2>
            <dl className="space-y-2.5 text-sm">
              <div>
                <dt className="font-semibold text-gray-600">Author:</dt>
                <dd className="text-gray-800">{photo.author}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Date:</dt>
                <dd className="text-gray-800">{photo.date}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Location:</dt>
                <dd className="text-gray-800">{photo.location}</dd>
              </div>
              <div className="mt-2">
                <dt className="font-semibold text-gray-600">Description:</dt>
                <dd className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">{photo.description}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailModal;
