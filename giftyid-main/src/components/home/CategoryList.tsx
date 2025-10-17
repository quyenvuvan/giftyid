"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  {
    id: 1,
    name: 'Túi Ví Nữ',
    slug: 'tui-vi-nu',
    image: '/categories/handbag.svg'
  },
  {
    id: 2,
    name: 'Mẹ & Bé',
    slug: 'me-va-be',
    image: '/categories/mother-baby.svg'
  },
  {
    id: 3,
    name: 'Thú cưng',
    slug: 'thu-cung',
    image: '/categories/pet.svg'
  },
  {
    id: 4,
    name: 'Nhà Sách Online',
    slug: 'nha-sach-online',
    image: '/categories/book.svg'
  },
  {
    id: 5,
    name: 'Thời trang trẻ em',
    slug: 'thoi-trang-tre-em',
    image: '/categories/kids-fashion.svg'
  },
  {
    id: 6,
    name: 'Điện Thoại và Phụ Kiện',
    slug: 'dien-thoai-va-phu-kien',
    image: '/categories/phone.svg'
  },
  {
    id: 7,
    name: 'Phụ Kiện & Trang Sức Nữ',
    slug: 'phu-kien-trang-suc-nu',
    image: '/categories/accessories.svg'
  },
  {
    id: 8,
    name: 'Đồng Hồ',
    slug: 'dong-ho',
    image: '/categories/watch.svg'
  },
  {
    id: 9,
    name: 'Thiết Bị Điện Tử',
    slug: 'thiet-bi-dien-tu',
    image: '/categories/electronics.svg'
  },
  {
    id: 10,
    name: 'Giày Dép Nam',
    slug: 'giay-dep-nam',
    image: '/categories/mens-shoes.svg'
  }
];

export default function CategoryList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="py-6 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
          <span className="mr-2">🛍️</span> Danh mục nổi bật
        </h2>
        
        <div className="relative px-2">
          <button 
            onClick={scrollLeft} 
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2.5 hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={22} className="text-gray-700" />
          </button>
          
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          >
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/products/category/${category.slug}`} 
                className="flex flex-col items-center justify-center min-w-[100px] group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 relative mb-3 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 border border-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <Image 
                    src={category.image} 
                    alt={category.name}
                    width={48}
                    height={48}
                    className="object-contain group-hover:scale-110 transition-transform duration-300 z-10 drop-shadow-sm"
                  />
                </div>
                <span className="text-center text-xs font-medium text-gray-700 line-clamp-2 max-w-[100px] group-hover:text-blue-600 transition-colors duration-300">{category.name}</span>
              </Link>
            ))}
          </div>
          
          <button 
            onClick={scrollRight} 
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2.5 hover:bg-gray-100 transition-colors hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Scroll right"
          >
            <FiChevronRight size={22} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
        
        .group {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 