import Script from 'next/script'

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2SWQ9FNXGM" strategy="afterInteractive" />
      <Script id="knowledge-ga" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2SWQ9FNXGM');
`,
      }} />
    </>
  )
}
