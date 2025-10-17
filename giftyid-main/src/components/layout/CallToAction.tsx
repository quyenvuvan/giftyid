'use client';

import { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { BsMessenger } from 'react-icons/bs';

export default function CallToAction() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <div className="fixed right-4 top-1/2 flex flex-col gap-4 z-40">
      {/* Zalo Button */}
      <a 
        href="https://zalo.me/3764960729900549475" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center"
        aria-label="Nhắn tin qua Zalo"
        onMouseEnter={() => setActiveButton('zalo')}
        onMouseLeave={() => setActiveButton(null)}
      >
        <div className={`flex h-12 items-center rounded-full hover:opacity-90 transition-all shadow-lg ${activeButton === 'zalo' ? 'bg-[#0180c7] pr-3' : ''}`}>
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg">
            <SiZalo className="text-[#0180c7] text-2xl" />
          </div>
          {activeButton === 'zalo' && (
            <span className="ml-2 font-medium text-sm text-white whitespace-nowrap">Nhắn Zalo</span>
          )}
        </div>
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+84913332282" 
        className="flex items-center justify-center"
        aria-label="Gọi điện thoại"
        onMouseEnter={() => setActiveButton('phone')}
        onMouseLeave={() => setActiveButton(null)}
      >
        <div className={`flex h-12 items-center rounded-full hover:opacity-90 transition-all shadow-lg ${activeButton === 'phone' ? 'bg-red-600 pr-3' : ''}`}>
          <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full shadow-lg">
            <FaPhone className="text-white text-lg" />
          </div>
          {activeButton === 'phone' && (
            <span className="ml-2 font-medium text-sm text-white whitespace-nowrap">Gọi ngay</span>
          )}
        </div>
      </a>

      {/* Facebook Messenger Button */}
      <a 
        href="https://www.facebook.com/giftytech" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center"
        aria-label="Chat qua Facebook Messenger"
        onMouseEnter={() => setActiveButton('messenger')}
        onMouseLeave={() => setActiveButton(null)}
      >
        <div className={`flex h-12 items-center rounded-full hover:opacity-90 transition-all shadow-lg ${activeButton === 'messenger' ? 'bg-gradient-to-r from-[#0695FF] to-[#AA39E7] pr-3' : ''}`}>
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#0695FF] to-[#AA39E7] rounded-full shadow-lg">
            <BsMessenger className="text-white text-xl" />
          </div>
          {activeButton === 'messenger' && (
            <span className="ml-2 font-medium text-sm text-white whitespace-nowrap">Chat Facebook</span>
          )}
        </div>
      </a>
    </div>
  );
} 