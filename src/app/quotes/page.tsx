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
  // Determine which quotes should be featured (larger)
  const featuredQuoteIds = ["2", "3", "7"]; // Quotes with images or videos are good candidates for featured spots
  
  return (
    <section className="max-w-7xl mx-auto px-4">
      <h1 className="font-bold text-2xl mb-6 tracking-tighter">QUOTES</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
        {quotes.map((quote) => {
          const isFeatured = featuredQuoteIds.includes(quote.id);
          const hasMedia = quote.image || quote.youtubeUrl;
          
          return (
            <div 
              key={quote.id} 
              className={`${isFeatured ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-1'} h-full`}
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