import 'nextra-theme-blog/style.css'
import Head from 'next/head';
import Script from 'next/script';

import '../styles/main.css'

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2SWQ9FNXGM"></Script>
      <Script dangerouslySetInnerHTML={{ __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2SWQ9FNXGM');      
`}}></Script>
    </>
  )
}
