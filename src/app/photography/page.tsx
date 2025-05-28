import React, { useState } from 'react';
import type { Metadata } from 'next';
import PhotoGridItem from '../../components/photography/PhotoGridItem';
import PhotoDetailModal from '../../components/photography/PhotoDetailModal';

// Define the Photo interface
export interface Photo {
  id: string;
  title: string;
  date: string;
  author: string;
  location: string;
  description: string;
  imageUrl: string;
}

// Create mock photo data
const mockPhotos: Photo[] = [
  {
    id: '1',
    title: 'Sunset Over the Mountains',
    date: '2023-03-15',
    author: 'Jane Doe',
    location: 'Rocky Mountains, Colorado',
    description: 'A breathtaking view of the sun setting behind the snow-capped peaks of the Rocky Mountains.',
    imageUrl: 'https://images.pexels.com/photos/123456/pexels-photo-123456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual placeholder
  },
  {
    id: '2',
    title: 'City Lights',
    date: '2023-05-20',
    author: 'John Smith',
    location: 'New York City, USA',
    description: 'A vibrant shot of the New York City skyline at night, showcasing the illuminated skyscrapers.',
    imageUrl: 'https://images.pexels.com/photos/234567/pexels-photo-234567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual placeholder
  },
  {
    id: '3',
    title: 'Forest Trail',
    date: '2023-07-10',
    author: 'Alice Green',
    location: 'Redwood National Park, California',
    description: 'A serene path winding through a lush green forest, with sunlight filtering through the trees.',
    imageUrl: 'https://images.pexels.com/photos/345678/pexels-photo-345678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual placeholder
  },
  {
    id: '4',
    title: 'Beach Paradise',
    date: '2023-09-02',
    author: 'Bob White',
    location: 'Maldives',
    description: 'Crystal clear turquoise waters and white sandy beaches of a tropical paradise.',
    imageUrl: 'https://images.pexels.com/photos/456789/pexels-photo-456789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual placeholder
  },
];

export const metadata: Metadata = {
  title: 'Photography Showcase Gallery',
  description: 'A curated collection of stunning photographs. Explore moments captured in time, showcasing diverse scenes and subjects.',
};

const PhotographyPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Photography Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockPhotos.map((photo) => (
          <PhotoGridItem key={photo.id} photo={photo} onClick={openModal} />
        ))}
      </div>

      <PhotoDetailModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default PhotographyPage;
