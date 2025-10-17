"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import Link from 'next/link';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = products.filter(
        product => 
          product.name.toLowerCase().includes(lowerCaseQuery) || 
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Kết quả tìm kiếm: {query}</h1>
        <p className="text-adaptive-gray mt-2">
          Tìm thấy {searchResults.length} sản phẩm
        </p>
      </div>
      
      {searchResults.length > 0 ? (
        <ProductGrid products={searchResults} />
      ) : (
        <div className="bg-adaptive rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiSearch size={64} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm nào</h2>
          <p className="text-adaptive-gray mb-6">
            Không tìm thấy sản phẩm phù hợp với từ khóa &quot;{query}&quot;. 
            Vui lòng thử lại với từ khóa khác.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" /> Xem tất cả sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
} 