import './global.css';

import clsx from 'clsx';

import Sidebar from '@/components/sidebar';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://arno.surfacew.com'),
  title: {
    default: 'Arno',
    template: '%s | Arno',
  },
  description: 'Developer, designer, and creator.',
  openGraph: {
    title: 'Arno',
    description: 'Developer, designer, and creator.',
    url: 'https://arno.surfacew.com',
    siteName: 'Arno',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Arno',
    card: 'summary_large_image',
  },
  verification: {
    // google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    // yandex: '14d2e73487fa6c71',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Sidebar />
          {children}
        </main>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2SWQ9FNXGM"></Script>
        <Script id="google-analytics" dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2SWQ9FNXGM');      
`}}></Script>
      </body>
    </html>
  );
}
