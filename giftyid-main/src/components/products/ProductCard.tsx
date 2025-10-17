import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  slug: string;
}

export default function ProductCard({ name, image, price, originalPrice, slug }: ProductCardProps) {
  // Format prices with Vietnamese currency
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
  const formattedOriginalPrice = originalPrice 
    ? new Intl.NumberFormat('vi-VN').format(originalPrice) 
    : null;
  
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="bg-adaptive rounded-md shadow-sm overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {originalPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-adaptive-heading text-sm font-medium line-clamp-2 min-h-[40px]">{name}</h3>
          <div className="mt-2">
            <div className="flex items-baseline">
              <span className="text-red-600 font-semibold">{formattedPrice} ₫</span>
              {formattedOriginalPrice && (
                <span className="text-adaptive-price ml-2 text-xs line-through">
                  {formattedOriginalPrice} ₫
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 