import type { Metadata } from 'next'
import { UVCardElaborationStudio, UVCardPromptStudio } from "@/components/uv-card/uv-card";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Arno's Ideas | Tech Explorations & Concepts";
  const description = "A curated collection of Arno's innovative ideas, fleeting thoughts, and explorations in the realm of technology, AI, and software development.";
  const keywords = ['ideas', 'tech concepts', 'innovation', 'Arno', 'AI ideas', 'software development ideas', 'technology brainstorming', 'explorations'];
  const ogImageUrl = 'https://6gflxwplhijgv9h7.public.blob.vercel-storage.com/20250526164830-wyxK0U7FPmPVfkNCdbXytJ2YOFTwnu.jpg';
  const siteUrl = 'https://arno.surfacew.com/idea';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: siteUrl,
      images: [ogImageUrl],
      type: 'website',
      siteName: "Arno's Portfolio & Blog",
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function Page() {
  return (
    <>
      <h1>idea that sparks ~ ✨</h1>
      <div>
        <h2 className="mb-4 mt-4">My Projects</h2>
        <UVCardPromptStudio />
        <br />
        <UVCardElaborationStudio />
      </div>
    </>
  );
}
