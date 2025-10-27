"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    // Filter products by categorySlug
    const filtered = products.filter(product => product.categorySlug === slug);
    setFilteredProducts(filtered);

    // Get category name from the first product or define a mapping
    if (filtered.length > 0) {
      setCategoryName(filtered[0].category);
    } else {
      // Fallback: try to find from categories array or slug
      const categoryMap: { [key: string]: string } = {
        'trung-tam-anh-ngu': 'Trung tâm anh ngữ',
        'hoa-tuoi': 'Hoa tươi',
        'thoi-trang': 'Thời trang',
        'studio-chup-anh': 'Studio chụp ảnh',
        'gara-showroom': 'Gara/showroom'
      };
      setCategoryName(categoryMap[slug] || 'Danh mục không tồn tại');
    }
  }, [slug]);

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{categoryName}</h1>
          <p className="text-gray-600">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <ProductGrid
        products={filteredProducts}
        title={categoryName}
      />
    </div>
  );
}
