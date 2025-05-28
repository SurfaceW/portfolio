import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotographyPage, { mockPhotos, Photo } from './page'; // Adjust path as necessary
import '@testing-library/jest-dom';

// Mock next/router for Link components if any; not strictly needed for current page.tsx but good practice
jest.mock('next/router', () => require('next-router-mock'));

// Mock the image component to avoid issues with external image loading in tests
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} />;
    },
  }));

describe('PhotographyPage', () => {
  it('renders the main heading', () => {
    render(<PhotographyPage />);
    // The <h1> on the page is "Photography Gallery"
    // The metadata title is "Photography Showcase Gallery"
    expect(screen.getByRole('heading', { name: /Photography Gallery/i })).toBeInTheDocument();
  });

  it('renders photo grid items based on mockPhotos', () => {
    render(<PhotographyPage />);
    
    mockPhotos.forEach(photo => {
      // Check for image alt text
      expect(screen.getByAltText(photo.title)).toBeInTheDocument();
      // Check for visible title (within the button/link context)
      // Use a more robust query if titles are complex or nested deeply
      expect(screen.getAllByText(photo.title).some(el => el.closest('button') !== null || el.closest('a') !== null )).toBeTruthy();
    });
    
    // Check that the number of items matches mockPhotos length
    // This can be done by counting images or specific elements.
    // For example, if each PhotoGridItem renders a button:
    const gridItems = screen.getAllByRole('button', { name: /.*/ }); // Get all buttons
    // Filter out the modal close button if it's always in the DOM vs conditionally rendered
    const photoButtons = gridItems.filter(button => !button.getAttribute('aria-label')?.includes('Close modal'));
    expect(photoButtons.length).toBe(mockPhotos.length);
  });

  it('modal opens with correct content when a photo is clicked and closes', async () => {
    render(<PhotographyPage />);
    
    // Get the first photo item based on its title (rendered as alt text for the image)
    const firstPhotoItem = screen.getByAltText(mockPhotos[0].title);
    fireEvent.click(firstPhotoItem); // Click the image, which is inside the button

    // Verify modal is open and displays correct photo title
    // The modal title is usually a heading role
    expect(await screen.findByRole('heading', { name: mockPhotos[0].title })).toBeVisible();
    
    // Verify modal displays correct photo description
    expect(screen.getByText(mockPhotos[0].description)).toBeVisible();
    
    // Find and click the close button
    // The close button might have an aria-label or specific text/role
    const closeButton = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeButton);
    
    // Verify the modal is closed
    // Check that the modal title is no longer visible
    // Use queryByRole for elements that might not be present, as it returns null instead of throwing an error
    expect(screen.queryByRole('heading', { name: mockPhotos[0].title })).not.toBeInTheDocument();
    expect(screen.queryByText(mockPhotos[0].description)).not.toBeInTheDocument();
  });
});
