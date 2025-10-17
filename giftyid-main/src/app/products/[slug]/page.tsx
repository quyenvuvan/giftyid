"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { FiShoppingCart, FiShare2, FiHeart } from 'react-icons/fi';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  // Get params using useParams hook instead
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the product with the matching slug
    const foundProduct = products.find(p => p.slug === slug);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price);
  const formattedOriginalPrice = product.originalPrice 
    ? new Intl.NumberFormat('vi-VN').format(product.originalPrice) 
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset the "Added to cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-500 mt-1">Danh mục: {product.category}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-red-600">{formattedPrice} ₫</span>
                {formattedOriginalPrice && (
                  <span className="ml-2 text-gray-500 line-through">
                    {formattedOriginalPrice} ₫
                  </span>
                )}
              </div>
              <div className="mt-2">
                <span className={`px-2 py-1 text-sm rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6 flex items-center">
              <span className="mr-3 dark:text-black">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:text-black"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 dark:text-black">{quantity}</span>
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:text-black"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {addedToCart && (
              <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md">
                Đã thêm vào giỏ hàng!
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex items-center px-6 py-3 rounded-md ${
                  product.inStock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart className="mr-2" /> Thêm vào giỏ hàng
              </button>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-100 dark:text-black">
                <FiHeart className="mr-2 dark:text-black" /> Yêu thích
              </button>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-100 dark:text-black">
                <FiShare2 className="mr-2 dark:text-black" /> Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 dark:text-black">Chi tiết sản phẩm</h2>
          <div className="prose max-w-none dark:text-black">
            <p className="text-gray-700 dark:text-black">{product.description}</p>
            {/* Additional product details would go here */}
          </div>
        </div>
      </div>
    </div>
  );
} 