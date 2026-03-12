import type { Metadata } from 'next'
import PlaygroundEditor from '../_components/playground-editor'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'A live HTML and JSX code playground — write and preview in real time.',
  openGraph: {
    title: 'Playground | Knowledge | Arno',
    description: 'A live HTML and JSX code playground — write and preview in real time.',
    url: 'https://arno.surfacew.com/knowledge/playground',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playground | Knowledge | Arno',
    description: 'A live HTML and JSX code playground — write and preview in real time.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PlaygroundPage() {
  return <PlaygroundEditor />
}
