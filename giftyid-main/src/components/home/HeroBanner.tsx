"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Define types for banner content
type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: {
    right?: string;
    bottom?: string;
    top?: string;
    left?: string;
  };
};

type Banner = {
  id: number;
  symbol: string;
  symbolText: string;
  title: string;
  badge1: string;
  badge2: string;
  badge3?: string;
  bgColor: string;
  cta: string;
  ctaLink: string;
  productImages: ProductImage[];
};

// Banner data for carousel
const banners: Banner[] = [
  {
    id: 1,
    symbol: "TT",
    symbolText: "THỂ THAO\nDÃ NGOẠI",
    title: "Bùng nổ năng lượng\nĐột phá giới hạn",
    badge1: "Mua nhiều giảm sâu",
    badge2: "Chính hàng 100%",
    bgColor: "bg-gradient-to-r from-indigo-900 to-blue-700",
    cta: "Mua ngay",
    ctaLink: "/products/sports",
    productImages: [
    ]
  },
  {
    id: 2,
    symbol: "NT",
    symbolText: "NGÀY HỘI\nTIÊU DÙNG",
    title: "MUA HÀNG THIẾT YẾU\nGIÁ SIÊU ƯU ĐÃI",
    badge1: "COMBO 12% GIẢM THÊM",
    badge2: "HOT COUPON 120K",
    badge3: "PHI SHIP 0Đ",
    bgColor: "bg-gradient-to-r from-green-800 to-emerald-600",
    cta: "Mua ngay",
    ctaLink: "/products/daily",
    productImages: [
    ]
  }
];

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const banner = banners[currentBanner];
  
  return (
    <div className={`relative w-full ${banner.bgColor} overflow-hidden h-[400px] md:h-[480px] transition-all duration-500`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute opacity-20 -top-20 -left-20 w-64 h-64 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute opacity-20 bottom-10 right-10 w-96 h-96 rounded-full bg-white/20 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 h-full relative">
        <div className="flex h-full">
          {/* Left side - content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-8 md:pt-0">
            {/* Brand Symbol */}
            <div className="mb-5 flex items-start">
              <div className="w-12 h-12 bg-white text-current flex items-center justify-center mr-3 text-xl font-bold shadow-lg rounded">
                {banner.symbol}
              </div>
              <div className="text-white font-bold text-xl leading-tight whitespace-pre-line animate-fadeIn">
                {banner.symbolText}
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 whitespace-pre-line animate-slideInLeft">
              {banner.title}
            </h1>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fadeIn delay-100">
              <div className={`${currentBanner === 0 ? 'bg-white text-indigo-900' : 'bg-amber-800 text-white'} px-3 py-1.5 rounded shadow-md transform hover:scale-105 transition-transform duration-300`}>
                {banner.badge1}
              </div>
              <div className={`${currentBanner === 0 ? 'bg-white text-indigo-900' : 'bg-green-700 text-white'} px-3 py-1.5 rounded shadow-md transform hover:scale-105 transition-transform duration-300`}>
                {banner.badge2}
              </div>
              {banner.badge3 && (
                <div className="bg-red-600 text-white px-3 py-1.5 rounded shadow-md transform hover:scale-105 transition-transform duration-300">
                  {banner.badge3}
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Link 
              href={banner.ctaLink} 
              className="bg-white hover:bg-opacity-90 rounded-full px-6 py-3 font-medium inline-flex items-center w-fit shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn delay-200 text-black"
            >
              {banner.cta} <FaArrowRight className="ml-2 animate-bounce" />
            </Link>
          </div>
          
          {/* Right side - product images */}
          <div className="hidden md:block w-1/2 relative">
            {banner.productImages.map((img, index) => (
              <div 
                key={index} 
                className="absolute animate-fadeInUp" 
                style={{
                  ...img.style,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  width={img.width} 
                  height={img.height} 
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Banner navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${currentBanner === index ? 'bg-white scale-125' : 'bg-white/50'} transition-all duration-300 hover:scale-110`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
} 