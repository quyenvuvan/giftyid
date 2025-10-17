import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
  titleClass?: string;
}

export default function ProductGrid({ products, title, viewAllLink, titleClass }: ProductGridProps) {
  return (
    <div className="my-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className={titleClass || "text-xl font-bold"}>{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm text-blue-600 hover:underline">
              Xem tất cả
            </a>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
} 