import AvatarCard from '../components/AvatarCard/AvatarCard';
import ManifestoCard from '../components/ManifestoCard/ManifestoCard';
import WorkCard from '../components/WorkCard/WorkCard';
import CareerCard from '../components/CareerCard/CareerCard';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import SocialMediaCard from '../components/SocialMediaCard/SocialMediaCard';
// Removed: import styles from './home.module.css';

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
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                 gap-4 sm:gap-6 p-4 sm:p-6 
                 bg-gradient-to-br from-slate-400 via-cyan-600 to-blue-700 
                 min-h-screen box-border"
    >
      {/* Grid items no longer need a specific className if components handle their own styling */}
      <div> 
        <AvatarCard
          imageUrl="[wip]" 
          name="Arno"
          title="AI Developer, Engineer, Product Designer"
        />
      </div>

      <div> 
        <ManifestoCard manifestoItems={["ETIWTT", "ORDERIFY", "3E (Efficiency, Effectiveness, Elegance)"]} />
      </div>

      <div> 
        <WorkCard
          icon="✨"
          title="e-studio.ai"
          description="AI-powered creative suite."
          link="https://e-studio.ai"
        />
      </div>
      <div> 
        <WorkCard
          icon="🚀"
          title="horizon.ai"
          description="Next-gen AI planning tool."
          link="https://horizon.e-studio.ai"
        />
      </div>
      <div> 
        <WorkCard
          icon="💡"
          title="Arno Prompts"
          description="Collection of AI prompts."
          link="https://github.com/SurfaceW/arno-prompts"
        />
      </div>

      <div> 
        <CareerCard careerSteps={["Alibaba EI team", "Alibaba DingTalk x Yida"]} />
      </div>

      {blogPosts.map((post, i) => (
        <div key={`blog-${i}`}> 
          <BlogPostCard
            title={post.title}
            description={post.description}
            slug={post.slug}
          />
        </div>
      ))}

      <div> 
        <SocialMediaCard
          socialLinks={[
            { name: 'X / Twitter', url: 'https://x.com/yeqingnan' },
            { name: 'Github', url: 'https://github.com/SurfaceW' },
            { name: 'Jike', url: 'https://jike.city/arno' },
          ]}
        />
      </div>
    </div>
  );
}
