import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { quotes } from '@/data/quotes';

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

export default function QuotesPage() {
  // Optimized layout for a dense, masonry-like grid with no gaps
  const quoteLayouts = {
    // First row
    "1": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    "2": { size: "large", colSpan: "col-span-2", rowSpan: "row-span-2" },
    "3": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    
    // Second row
    "4": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    "5": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    
    // Third row
    "6": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    "7": { size: "medium", colSpan: "col-span-2", rowSpan: "row-span-1" },
    "8": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    
    // Fourth row
    "9": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    "10": { size: "medium", colSpan: "col-span-2", rowSpan: "row-span-1" },
    "11": { size: "small", colSpan: "col-span-1", rowSpan: "row-span-1" },
    
    // Fifth row
    "12": { size: "medium", colSpan: "col-span-2", rowSpan: "row-span-1" },
  };
  
  // Reorder quotes to match the layout
  const orderedQuotes = [
    ...quotes.slice(0, 3),  // First row: 1, 2, 3
    ...quotes.slice(3, 5),  // Second row: 4, 5
    ...quotes.slice(5, 8),  // Third row: 6, 7, 8
    ...quotes.slice(8, 11), // Fourth row: 9, 10, 11
    ...quotes.slice(11),    // Fifth row: 12
  ];
  
  return (
    <section className="max-w-7xl mx-auto px-2">
      <h1 className="font-bold text-2xl mb-3 tracking-tighter">QUOTES</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 auto-rows-auto">
        {orderedQuotes.map((quote) => {
          const layout = quoteLayouts[quote.id as keyof typeof quoteLayouts];
          const isFeatured = layout.size !== "small";
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