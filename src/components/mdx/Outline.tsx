'use client';

import React, { useState, useEffect } from 'react';
import styles from './Outline.module.css'; // Import CSS Modules

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface OutlineProps {
  content: string; // This will be the MDX content string
}

const Outline: React.FC<OutlineProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings: Heading[] = [];
    const slugCounts: { [key: string]: number } = {};

    lines.forEach((line) => {
      const match = line.match(/^(#{1,4})\s+(.*)/); // Regex to find H1-H4
      if (match) {
        const level = match[1].length; // Number of '#' gives the level
        let text = match[2].trim();
        
        // Remove any markdown links from the text for cleaner display
        text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1');

        let slug = text
          .toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, ''); // Remove special characters

        // Ensure unique slugs
        if (slugCounts[slug]) {
          slugCounts[slug]++;
          slug = `${slug}-${slugCounts[slug]}`;
        } else {
          slugCounts[slug] = 1;
        }

        extractedHeadings.push({ id: slug, level, text });
      }
    });
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Logic to load visibility preference from localStorage
    const savedVisibility = localStorage.getItem('outlineVisible');
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility));
    }
  }, []);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('outlineVisible', JSON.stringify(newVisibility));
  };

  if (!headings.length) {
    return null; // Don't render anything if there are no headings
  }

  return (
    <div className={styles.outlineContainer}>
      <button
        onClick={toggleVisibility}
        className={styles.toggleButton}
        aria-expanded={isVisible} // Added aria-expanded
      >
        {isVisible ? 'Hide Outline' : 'Show Outline'}
      </button>
      {/* The nav is always rendered; visibility is controlled by CSS on the parent container */}
      <nav>
        <ul className={styles.headingList}>
          {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${styles.headingListItem} ${styles['level' + heading.level]}`}
              >
                <a href={`#${heading.id}`} className={styles.headingLink}>
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      {/* Removed the closing parenthesis and curly brace of the conditional render */}
    </div>
  );
};

export default Outline;
