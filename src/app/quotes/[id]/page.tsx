import { notFound } from 'next/navigation';
import { quotes } from '@/data/quotes';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';

// Import YouTubeEmbed dynamically with SSR disabled to avoid hydration issues
const YouTubeEmbed = dynamic(() => import('@/components/QuoteCard/YouTubeEmbed').then(mod => mod.YouTubeEmbed), {
  ssr: true,
});

interface QuotePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params
}: QuotePageProps): Promise<Metadata | undefined> {
  const quote = quotes.find((q) => q.id === params.id);
  if (!quote) {
    return;
  }

  const { text, author, image } = quote;
  const title = `${author ? `${author}: ` : ''}${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`;
  const description = text;
  const ogImage = image || 'https://arno.surfacew.com/og-image.jpg'; // Default OG image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://arno.surfacew.com/quotes/${params.id}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

// Generate a random gradient based on the quote ID
const getGradient = (id: string) => {
  const gradients = [
    'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
    'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    'from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-800/20',
    'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
  ];
  
  const gradientIndex = parseInt(id, 10) % gradients.length;
  return gradients[gradientIndex];
};

export default function QuotePage({ params }: QuotePageProps) {
  const quote = quotes.find((q) => q.id === params.id);
  
  if (!quote) {
    notFound();
  }

  const gradient = getGradient(params.id);

  return (
    <section className="max-w-3xl mx-auto px-4">
      <Link href="/quotes" className="text-sm text-blue-500 hover:text-blue-700 mb-6 block">
        ← Back to all quotes
      </Link>
      
      <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300`}>
        <div className="mb-6">
          <div className="text-4xl text-gray-400 dark:text-gray-500 mb-4">&ldquo;</div>
          <p className="text-gray-800 dark:text-gray-200 text-2xl font-medium leading-relaxed">
            {quote.text}
          </p>
          <div className="text-4xl text-gray-400 dark:text-gray-500 text-right mt-4">&rdquo;</div>
        </div>

        {quote.image && (
          <div className="my-8 rounded-lg overflow-hidden">
            <Image 
              src={quote.image} 
              alt="Quote image" 
              width={800} 
              height={500} 
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        )}

        {quote.youtubeUrl && (
          <div className="my-8">
            <YouTubeEmbed url={quote.youtubeUrl} />
          </div>
        )}

        <div className="mt-8 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
          {quote.author && (
            <p className="text-gray-700 dark:text-gray-300 font-medium text-xl">
              — {quote.author}
            </p>
          )}
          {quote.date && (
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              {new Date(quote.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 