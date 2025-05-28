import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { quotes } from '@/data/quotes';
import { QuoteCardProps } from '@/components/QuoteCard/QuoteCard';
import { useMemo } from 'react';

// Import QuoteCard dynamically with SSR disabled to avoid hydration issues
const QuoteCard = dynamic(() => import('@/components/QuoteCard/QuoteCard'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Quotes',
  description: 'A collection of inspiring and thought-provoking quotes.',
  openGraph: {
    title: 'Quotes | Arno',
    description: 'A collection of inspiring and thought-provoking quotes.',
    url: 'https://arno.surfacew.com/quotes',
    siteName: 'Arno',
    locale: 'en_US',
    type: 'website',
  },
};

// Layout types
type LayoutSize = 'small' | 'medium' | 'large';
type QuoteLayout = {
  size: LayoutSize;
  colSpan: string;
  rowSpan: string;
};

export default function QuotesPage() {
  // Create a structured grid layout that avoids gaps
  const structuredLayout = useMemo(() => {
    // Initialize grid structure (4 columns)
    const gridWidth = 4;
    const grid: boolean[][] = [];
    const result: { quote: QuoteCardProps; layout: QuoteLayout; gridPos: { col: number; row: number } }[] = [];
    
    // Process all quotes
    let currentQuotes = [...quotes];
    
    // First, identify quotes that should be large
    const largeQuotes: QuoteCardProps[] = [];
    const regularQuotes: QuoteCardProps[] = [];
    
    currentQuotes.forEach((quote, index) => {
      const hasMedia = !!quote.image || !!quote.youtubeUrl;
      const textLength = quote.text.length;
      
      // Criteria for large quotes (2x2)
      if ((hasMedia && textLength > 100) || index % 5 === 0) {
        largeQuotes.push(quote);
      } else {
        regularQuotes.push(quote);
      }
    });
    
    // Place large quotes first (they're harder to fit)
    largeQuotes.forEach(quote => {
      // Find a spot for a 2x2 quote
      let placed = false;
      let row = 0;
      
      while (!placed) {
        // Ensure grid has enough rows
        while (grid.length <= row + 1) {
          grid.push(Array(gridWidth).fill(false));
        }
        
        // Try to find a spot in this row
        for (let col = 0; col <= gridWidth - 2; col++) {
          // Check if a 2x2 area is available
          if (!grid[row][col] && !grid[row][col + 1] && 
              !grid[row + 1]?.[col] && !grid[row + 1]?.[col + 1]) {
            
            // Place the quote
            grid[row][col] = true;
            grid[row][col + 1] = true;
            grid[row + 1][col] = true;
            grid[row + 1][col + 1] = true;
            
            result.push({
              quote,
              layout: { 
                size: 'large', 
                colSpan: 'col-span-2', 
                rowSpan: 'row-span-2' 
              },
              gridPos: { col, row }
            });
            
            placed = true;
            break;
          }
        }
        
        if (!placed) row++;
      }
    });
    
    // Then place medium quotes (2x1)
    const mediumQuotes = regularQuotes.filter(quote => {
      const hasMedia = !!quote.image || !!quote.youtubeUrl;
      const textLength = quote.text.length;
      return hasMedia || textLength > 60;
    });
    
    mediumQuotes.forEach(quote => {
      // Find a spot for a 2x1 quote
      let placed = false;
      let row = 0;
      
      while (!placed) {
        // Ensure grid has enough rows
        while (grid.length <= row) {
          grid.push(Array(gridWidth).fill(false));
        }
        
        // Try to find a spot in this row
        for (let col = 0; col <= gridWidth - 2; col++) {
          // Check if a 2x1 area is available
          if (!grid[row][col] && !grid[row][col + 1]) {
            // Place the quote
            grid[row][col] = true;
            grid[row][col + 1] = true;
            
            result.push({
              quote,
              layout: { 
                size: 'medium', 
                colSpan: 'col-span-2', 
                rowSpan: 'row-span-1' 
              },
              gridPos: { col, row }
            });
            
            placed = true;
            break;
          }
        }
        
        if (!placed) row++;
      }
    });
    
    // Finally place small quotes (1x1)
    const smallQuotes = regularQuotes.filter(quote => {
      const hasMedia = !!quote.image || !!quote.youtubeUrl;
      const textLength = quote.text.length;
      return !hasMedia && textLength <= 60;
    });
    
    smallQuotes.forEach(quote => {
      // Find a spot for a 1x1 quote
      let placed = false;
      let row = 0;
      
      while (!placed) {
        // Ensure grid has enough rows
        while (grid.length <= row) {
          grid.push(Array(gridWidth).fill(false));
        }
        
        // Try to find a spot in this row
        for (let col = 0; col < gridWidth; col++) {
          // Check if spot is available
          if (!grid[row][col]) {
            // Place the quote
            grid[row][col] = true;
            
            result.push({
              quote,
              layout: { 
                size: 'small', 
                colSpan: 'col-span-1', 
                rowSpan: 'row-span-1' 
              },
              gridPos: { col, row }
            });
            
            placed = true;
            break;
          }
        }
        
        if (!placed) row++;
      }
    });
    
    // Sort by grid position for rendering
    return result.sort((a, b) => {
      if (a.gridPos.row !== b.gridPos.row) {
        return a.gridPos.row - b.gridPos.row;
      }
      return a.gridPos.col - b.gridPos.col;
    });
  }, []);
  
  return (
    <section className="max-w-7xl mx-auto px-2">
      <h1 className="font-bold text-2xl mb-3 tracking-tighter">QUOTES</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        {structuredLayout.map(({ quote, layout }) => {
          const isFeatured = layout.size !== 'small';
          const hasMedia = quote.image || quote.youtubeUrl;
          
          return (
            <div 
              key={quote.id} 
              className={`${layout.colSpan} ${layout.rowSpan}`}
              style={{ minHeight: layout.size === "small" ? "120px" : layout.size === "medium" ? "180px" : "240px" }}
            >
              <QuoteCard 
                {...quote} 
                isFeatured={isFeatured}
                variant={hasMedia ? 'media' : 'text'}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
} 