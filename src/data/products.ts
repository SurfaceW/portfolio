export type ProductAccent = 'sky' | 'amber' | 'violet' | 'rose' | 'indigo';

export type ProductItem = {
  accent: ProductAccent;
  description: string;
  gradient: string;
  hoverGradient: string;
  icon?: string;
  iconUrl?: string;
  link: string;
  title: string;
};

export const portfolioProducts: ProductItem[] = [
  {
    accent: 'sky',
    description:
      'First iOS product — native dots & collections across iPhone, iPad, and Mac.',
    gradient:
      'from-sky-50 to-blue-100 dark:from-sky-900/25 dark:to-blue-900/25',
    hoverGradient:
      'hover:from-sky-100 hover:to-indigo-100 dark:hover:from-sky-900/35 dark:hover:to-blue-900/35',
    iconUrl:
      'https://dots.e-studio.ai/_next/image?url=%2Fdots-icon.png&w=3840&q=75',
    link: 'https://dots.e-studio.ai/',
    title: 'eDots',
  },
  {
    accent: 'amber',
    description:
      'Track snapshots and cashflow — monthly and yearly assets, income, expenses, and portfolio TWR.',
    gradient:
      'from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-800/20',
    hoverGradient:
      'hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-800/30',
    iconUrl: '/products/ewealth-icon.png',
    link: 'https://www.e-studio.ai/products/e-wealth',
    title: 'eWealth',
  },
  {
    accent: 'violet',
    description:
      'Desktop hub for your AI building blocks — scan one shared root and project skills, agents, and rules across every coding tool.',
    gradient:
      'from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-800/20',
    hoverGradient:
      'hover:from-violet-100 hover:to-fuchsia-100 dark:hover:from-violet-900/30 dark:hover:to-fuchsia-800/30',
    iconUrl: '/products/ehub-logo.webp',
    link: 'https://hubs.e-studio.ai',
    title: 'eHub',
  },
  {
    accent: 'indigo',
    description:
      'AI-powered elaborations platform to solve problems and elaborate your ideas.',
    gradient:
      'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
    hoverGradient:
      'hover:from-indigo-100 hover:to-violet-100 dark:hover:from-indigo-900/30 dark:hover:to-violet-800/30',
    icon: '✨',
    link: 'https://e-studio.ai',
    title: 'e-studio.ai',
  },
];
