"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Product } from '@/data/products';

type FlashSaleProps = {
  products: Product[];
};

export default function FlashSale({ products }: FlashSaleProps) {
  // Initialize with fixed values to match server rendering
  const [timer, setTimer] = useState({
    hours: 3,
    minutes: 40,
    seconds: 44
  });
  const [isClient, setIsClient] = useState(false);
  
  // First useEffect only runs once on client to mark client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Countdown timer logic - only run on client side
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isClient]);
  
  // Scrolling logic for mobile
  const scrollContainer = (direction: 'left' | 'right'): void => {
    const container = document.getElementById('flash-sale-container');
    if (container) {
      const scrollAmount = 300; // adjust as needed
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="w-full bg-gradient-to-br from-red-300 to-orange-300 py-8 px-4 mb-8 rounded-2xl mx-auto my-4 shadow-sm">
        {/* Header with title, timer and view all link */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="relative">
              <h2 className="text-2xl font-bold mr-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Flash Sale</h2>
              <div className="absolute -right-1 -top-2 w-5 h-5">
                <div className="absolute animate-ping w-full h-full rounded-full bg-red-400 opacity-30"></div>
                <div className="absolute inset-1 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex items-center bg-white p-1.5 rounded-lg shadow-sm border border-red-100">
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-2.5 py-1 rounded-md mr-1">
                {timer.hours.toString().padStart(2, '0')}
              </div>
              <span className="text-red-500 mx-0.5 font-bold">:</span>
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-2.5 py-1 rounded-md mr-1">
                {timer.minutes.toString().padStart(2, '0')}
              </div>
              <span className="text-red-500 mx-0.5 font-bold">:</span>
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-2.5 py-1 rounded-md">
                {timer.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          <Link 
            href="/flash-sale" 
            className="text-white text-sm hover:underline flex items-center"
          >
            Xem tất cả 
            <FaChevronRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Products container */}
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={() => scrollContainer('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-red-300 transform hover:scale-105 border border-gray-100"
            aria-label="Previous products"
          >
            <FaChevronLeft className="text-red-500" />
          </button>
          
          <button 
            onClick={() => scrollContainer('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-red-300 transform hover:scale-105 border border-gray-100"
            aria-label="Next products"
          >
            <FaChevronRight className="text-red-500" />
          </button>
          
          {/* Products scroll container */}
          <div 
            id="flash-sale-container" 
            className="flex overflow-x-auto gap-6 pb-4 pt-2"
            style={{ 
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="flex-none w-[170px] md:w-[220px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  {/* Discount badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                  
                  {/* Product image */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="h-[170px] w-full relative bg-gradient-to-br from-red-50 to-orange-50 p-2">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-contain p-3 hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                </div>
                
                {/* Product info */}
                <div className="p-3">
                  {/* Product name */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xs text-gray-700 font-medium mb-2 line-clamp-2 min-h-[32px] hover:text-red-500 transition-colors">{product.name}</h3>
                  </Link>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <div className="text-red-500 font-bold">
                      {new Intl.NumberFormat('vi-VN').format(product.price)} ₫
                    </div>
                    {product.originalPrice && (
                      <div className="text-gray-500 text-xs line-through">
                        {new Intl.NumberFormat('vi-VN').format(product.originalPrice)} ₫
                      </div>
                    )}
                  </div>
                  
                  {/* Buy now button */}
                  <Link 
                    href={`/products/${product.slug}`} 
                    className="mt-3 block text-center bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-full py-1.5 hover:shadow-md transition-all hover:from-red-600 hover:to-red-700"
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        #flash-sale-container::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        #flash-sale-container > div {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 