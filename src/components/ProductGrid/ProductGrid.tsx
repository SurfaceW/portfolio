import { portfolioProducts } from '@/data/products';
import WorkCard from '@/components/WorkCard/WorkCard';

const cardShellClass =
  'col-span-1 row-span-1 rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg border border-white/50 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] bg-gradient-to-br';

export function ProductGrid() {
  return (
    <>
      <div className="col-span-1 sm:col-span-2 md:col-span-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 px-1">
          Products
        </h2>
      </div>
      {portfolioProducts.map((product) => (
        <div
          key={product.title}
          className={`${cardShellClass} ${product.gradient} hover:bg-gradient-to-br ${product.hoverGradient}`}
        >
          <WorkCard
            accent={product.accent}
            description={product.description}
            icon={product.icon}
            iconUrl={product.iconUrl}
            link={product.link}
            title={product.title}
          />
        </div>
      ))}
    </>
  );
}
