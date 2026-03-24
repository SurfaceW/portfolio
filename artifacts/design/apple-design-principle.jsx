import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Minus, 
  Layers, 
  Target, 
  Sparkles, 
  Eye, 
  Zap, 
  BookOpen, 
  Heart, 
  Lock, 
  Users,
  AlertOctagon,
  X
} from 'lucide-react';

// --- Data Models (Translated from Chinese to English) ---

const corePrinciples = [
  {
    id: '01',
    title: 'Start with the Experience',
    subtitle: 'Work backward to the technology.',
    description: 'Define the problem before choosing the technology. Technology is an enabler, not the selling point.',
    icon: <ArrowLeft className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '02',
    title: 'Focus & Subtraction',
    subtitle: 'The power of saying "No".',
    description: 'The ability to say "no" determines product quality; subtract until you can\'t anymore, then subtract once more.',
    icon: <Minus className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '03',
    title: 'End-to-End Responsibility',
    subtitle: 'Integration across the board.',
    description: 'Take responsibility for the "entire experience": hardware, software, services, channels, after-sales, and privacy.',
    icon: <Layers className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '04',
    title: 'Taste & Opinion',
    subtitle: 'Products with a stance.',
    description: 'Make deliberate choices, trade-offs, and establish a style. Avoid compromises and feature checklists.',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '05',
    title: 'Simplicity is Not Absence',
    subtitle: 'It is the removal of complexity.',
    description: 'Complexity is borne by the team behind the scenes, so it is never inflicted on the user.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '06',
    title: 'Details are the Product',
    subtitle: 'Building trust through nuance.',
    description: 'Micro-interactions, animations, default values, empty states, and error copy build trust and a premium feel.',
    icon: <Eye className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '07',
    title: 'High Standards & Polish',
    subtitle: 'Never ship "crap".',
    description: 'It is better to delay a launch than to sacrifice the critical baseline of the user experience.',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '08',
    title: 'Narrative-Driven',
    subtitle: 'The power of storytelling.',
    description: 'A product must have a one-sentence value proposition, three major benefits, and an unforgettable metaphor.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '09',
    title: 'Technology & Liberal Arts',
    subtitle: 'The intersection of utility and emotion.',
    description: 'Function satisfies "utility," while aesthetics and emotion satisfy the human need for "love" and "identity."',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '10',
    title: 'Constraints Breed Creativity',
    subtitle: 'Using limits to innovate.',
    description: 'Hard constraints like battery life, physical size, cost, and privacy are triggers for design innovation.',
    icon: <Lock className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: '11',
    title: 'Small Teams & DRI',
    subtitle: 'Directly Responsible Individuals.',
    description: 'Maintain clear ownership and assign "total package responsibility" for the experience to specific individuals.',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
];

const antiPatterns = [
  "Substituting technological showboating for genuine user value.",
  "Pursuing 'many options' rather than focusing on 'good defaults'.",
  "Piling on features based on a roadmap while ignoring a clear value proposition.",
  "Using MVP (Minimum Viable Product) as an excuse to ignore quality. Always aim for MLP (Minimum Lovable Product)."
];

// --- Components ---

const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

const PrincipleCard = ({ principle }) => (
  <div className={`p-8 rounded-3xl ${principle.color} transition-all duration-300 hover:scale-[1.02] group flex flex-col justify-between h-full`}>
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
          {principle.icon}
        </div>
        <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500">{principle.id}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100 tracking-tight">
        {principle.title}
      </h3>
      <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-wider">
        {principle.subtitle}
      </h4>
    </div>
    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
      {principle.description}
    </p>
  </div>
);

// --- Main Application ---

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Hero Section */}
      <header className="relative px-6 py-24 md:py-40 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <FadeIn delay={100}>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-widest uppercase text-zinc-500">
            Design Philosophy
          </div>
        </FadeIn>
        
        <FadeIn delay={300}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-5xl leading-tight">
            Design is how <br className="hidden md:block"/> it works.
          </h1>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light">
            Core principles of product and design inspired by Steve Jobs. 
            A framework for building products that reside at the intersection of technology and liberal arts.
          </p>
        </FadeIn>
      </header>

      {/* Principles Grid */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <FadeIn delay={700}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePrinciples.map((principle, index) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Anti-Patterns Section */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <FadeIn delay={900}>
          <div className="p-8 md:p-12 rounded-3xl bg-red-50 dark:bg-[#1a0f0f] border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-3 mb-8">
              <AlertOctagon className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold tracking-tight text-red-950 dark:text-red-400">
                Anti-Patterns to Guard Against
              </h2>
            </div>
            
            <div className="space-y-4">
              {antiPatterns.map((pattern, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-red-100/50 dark:border-red-900/20">
                  <X className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-900 dark:text-red-300 font-medium leading-relaxed">
                    {pattern}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm font-medium text-zinc-400 dark:text-zinc-600">
        <FadeIn delay={1100}>
          <p>Stay hungry. Stay foolish.</p>
        </FadeIn>
      </footer>

    </div>
  );
}