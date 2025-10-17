"use client";

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { FiFilter } from 'react-icons/fi';

export default function ProductsPage() {
  // Extract unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000000 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (could be by popularity or newest)
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, priceRange]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSortOption('default');
    setPriceRange({ min: 0, max: 3000000 });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-adaptive-light min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-adaptive-heading">Tất cả sản phẩm</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center justify-center gap-2 mb-4 card p-3 text-adaptive-heading"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter />
          {showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}
        </button>
        
        {/* Filters Sidebar - Desktop always visible, Mobile toggleable */}
        <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="card p-4 sticky top-4">
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-adaptive-heading">Danh mục</h3>
              <div className="space-y-2 text-adaptive-gray">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={selectedCategory === null}
                    onChange={() => handleCategoryChange(null)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="category-all" className="text-adaptive-heading">Tất cả</label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${category}`} className="text-adaptive-heading">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-adaptive-heading">Giá</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-all"
                    name="price"
                    checked={priceRange.min === 0 && priceRange.max === 3000000}
                    onChange={() => handlePriceChange(0, 3000000)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="price-all" className="text-adaptive-heading">Tất cả</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-1"
                    name="price"
                    checked={priceRange.min === 0 && priceRange.max === 100000}
                    onChange={() => handlePriceChange(0, 100000)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="price-1" className="text-adaptive-heading">Dưới 100.000₫</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-2"
                    name="price"
                    checked={priceRange.min === 100000 && priceRange.max === 500000}
                    onChange={() => handlePriceChange(100000, 500000)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="price-2" className="text-adaptive-heading">100.000₫ - 500.000₫</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-3"
                    name="price"
                    checked={priceRange.min === 500000 && priceRange.max === 1000000}
                    onChange={() => handlePriceChange(500000, 1000000)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="price-3" className="text-adaptive-heading">500.000₫ - 1.000.000₫</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-4"
                    name="price"
                    checked={priceRange.min === 1000000 && priceRange.max === 3000000}
                    onChange={() => handlePriceChange(1000000, 3000000)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="price-4" className="text-adaptive-heading">Trên 1.000.000₫</label>
                </div>
              </div>
            </div>
            
            <button 
              onClick={clearAllFilters}
              className="w-full py-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
        
        {/* Products Area */}
        <div className="flex-1">
          {/* Sorting Controls */}
          <div className="card p-4 mb-6 flex justify-between items-center">
            <div className="text-sm text-adaptive-gray">
              {filteredProducts.length} sản phẩm
            </div>
            <div className="flex items-center">
              <label htmlFor="sort-select" className="mr-2 text-sm text-adaptive-heading">Sắp xếp theo:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={handleSortChange}
                className="px-3 py-1 border border-adaptive rounded text-adaptive-heading bg-adaptive focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A đến Z</option>
                <option value="name-desc">Tên: Z đến A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid 
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
} 