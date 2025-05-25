import AvatarCard from '../components/AvatarCard/AvatarCard';
import ManifestoCard from '../components/ManifestoCard/ManifestoCard';
import WorkCard from '../components/WorkCard/WorkCard';
import CareerCard from '../components/CareerCard/CareerCard';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import SocialMediaCard from '../components/SocialMediaCard/SocialMediaCard';
// For animations and effects (optional - can be implemented later)
// import { motion } from 'framer-motion';

export default function RootPage() {
  const blogPosts = [
    {
      title: "🪐 Next.js Full Stack App Architecture Guide",
      description: "Arno's Architecture Design for complex next.js driven web application.",
      slug: "/posts/nextjs-architecture",
    },
    {
      title: "✨ VibeCoding x Cursor Best Practice",
      description: "Arno's best practices for VibeCoding and Cursor.",
      slug: "/posts/cursor.bp",
    },
    {
      title: "🗺️ Arno AI Map",
      description: "Arno's AI Era's Best Practices Map.",
      slug: "/posts/arno-ai-map",
    },
    {
      title: "🆒 How to cooly setup a Mac for develop",
      description: "Keep involve the toolchains of Mac, for best development experience",
      slug: "/posts/mac-master",
    },
    {
      title: "📝 Explore React Project Best Practice",
      description: "Arnold's React Project Best Practice Guide",
      slug: "/posts/react-bp",
    },
  ];

  return (
    <main className="p-4 md:p-5 min-h-screen bg-[#f5f5f7] dark:bg-[#121212]">
      {/* Apple-inspired Bento Grid container */}
      <div className="w-full max-w-[800px] mx-auto">
        {/* Hero section with title */}
        <div className="mb-5">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Arno&apos;s Portfolio</h1>
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400">AI Developer, Engineer, Product Designer</p>
        </div>
        
        {/* Bento grid layout */}
        <div className="grid auto-rows-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* Profile Card - 1x1 */}
          <div className="row-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-800/30">
            <AvatarCard
              imageUrl="https://avatars.githubusercontent.com/u/5323168?v=4" 
              name="Arno"
              title="AI Developer, Engineer, Product Designer"
            />
          </div>

          {/* Manifesto Card - 2x1 spanning two columns */}
          <div className="col-span-2 sm:col-span-2 row-span-1 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-800/30">
            <ManifestoCard manifestoItems={["ETIWTT", "ORDERIFY", "3E (Efficiency, Effectiveness, Elegance)"]} />
          </div>
          
          {/* Career Journey and Social Media in one row */}
          <div className="row-span-1 col-span-2 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-800/30">
            <CareerCard careerSteps={["Baidu and Zhihu Intern.", "Alibaba EI team", "Alibaba DingTalk x Yida"]} />
          </div>
          

          
          {/* Social Media Hub - 1x1 */}
          <div className="row-span-1 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-emerald-100 hover:to-cyan-100 dark:hover:from-emerald-900/30 dark:hover:to-cyan-800/30">
            <SocialMediaCard
              socialLinks={[
                { name: 'X / Twitter', url: 'https://x.com/yeqingnan' },
                { name: 'Github', url: 'https://github.com/SurfaceW' },
                { name: 'Jike', url: 'https://jike.city/arno' },
              ]}
            />
          </div>
          
          {/* Featured Articles Section - spanning full width */}
          <div className="col-span-2 md:col-span-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-4 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-white hover:to-slate-100 dark:hover:from-gray-900/60 dark:hover:to-gray-800/60">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-gray-900 dark:text-gray-50">Featured Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogPosts.map((post, i) => (
                <div key={`blog-${i}`} className="group relative transition-all duration-300 hover:translate-y-[-2px]"> 
                  <BlogPostCard
                    title={post.title}
                    description={post.description}
                    slug={post.slug}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Work Cards - 1x1 each */}
          <div className="row-span-1 bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/30 dark:hover:to-pink-800/30"> 
            <WorkCard
              icon="✨"
              title="e-studio.ai"
              description="AI-powered elaborations platform to solve problems and elaborate your ideas."
              link="https://e-studio.ai"
            />
          </div>
          <div className="row-span-1 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-indigo-100 hover:to-violet-100 dark:hover:from-indigo-900/30 dark:hover:to-violet-800/30"> 
            <WorkCard
              icon="🚀"
              title="horizon.ai"
              description="AI powered RSS feeders, content curation."
              link="https://horizon.e-studio.ai"
            />
          </div>
          <div className="row-span-1 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-800/20 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:bg-gradient-to-br hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-800/30"> 
            <WorkCard
              icon="💡"
              title="Arno Prompts"
              description="Collection of AI prompts of Arno's daily works & life."
              link="https://github.com/SurfaceW/arno-prompts"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
