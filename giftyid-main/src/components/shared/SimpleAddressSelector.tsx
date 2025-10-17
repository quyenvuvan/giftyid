"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaTimes, FaSearch } from 'react-icons/fa';

// Danh sách các tỉnh thành phố lớn của Việt Nam
const VIETNAM_CITIES = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Tĩnh',
  'Hải Dương',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
  'TP. Hải Dương'
];

// Các địa chỉ phổ biến
const POPULAR_ADDRESSES = [
  'Hà Nội', 
  'TP. Hải Dương', 
];

type SimpleAddressSelectorProps = {
  initialAddress?: string;
  onAddressChange: (address: string) => void;
};

const SimpleAddressSelector: React.FC<SimpleAddressSelectorProps> = ({ 
  initialAddress = '', 
  onAddressChange 
}) => {
  // Use useRef to track if the component has mounted
  const hasMounted = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [address, setAddress] = useState(initialAddress);
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>(VIETNAM_CITIES);

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
    hasMounted.current = true;
  }, []);

  // Only load from localStorage after initial render
  useEffect(() => {
    if (hasMounted.current) {
      const savedAddress = localStorage.getItem('deliveryAddress');
      if (savedAddress) {
        setAddress(savedAddress);
        // Only call onAddressChange if the address actually changed
        if (savedAddress !== initialAddress) {
          onAddressChange(savedAddress);
        }
      }
    }
  }, [initialAddress, onAddressChange]);

  // Filter addresses based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAddresses(VIETNAM_CITIES);
    } else {
      const filtered = VIETNAM_CITIES.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAddresses(filtered);
    }
  }, [searchTerm]);

  const handleSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    onAddressChange(selectedAddress);
    setShowSelector(false);
    setSearchTerm('');
  };

  const handleClose = () => {
    setShowSelector(false);
    setSearchTerm('');
  };

  // Display the server-provided initialAddress until client-side code runs
  // This prevents the hydration mismatch
  const displayAddress = isClient ? address : initialAddress;

  return (
    <div className="relative">
      {/* Current Address Display */}
      <div 
        className="flex items-center text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
        onClick={() => setShowSelector(true)}
      >
        <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 mr-1" />
        <span className="mr-1">Giao đến:</span>
        <span className="font-medium text-gray-700 dark:text-gray-200">{displayAddress || 'Chọn địa chỉ'}</span>
      </div>

      {/* Address Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" onClick={handleClose}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-[1001]">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chọn địa chỉ giao hàng</h3>
                  <button 
                    onClick={handleClose}
                    className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none z-[1002]"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                {/* Search input */}
                <div className="relative mb-4 z-[1002]">
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 pl-10 bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                    placeholder="Tìm kiếm địa chỉ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
                      onClick={() => setSearchTerm('')}
                    >
                      <FaTimes size={14} />
                    </button>
                  )}
                </div>
                
                {/* Common addresses */}
                <div className="mb-4 z-[1002] relative">
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Địa chỉ phổ biến</p>
                  <div className="space-y-2">
                    {POPULAR_ADDRESSES.map((city, idx) => (
                      <div 
                        key={idx} 
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 active:bg-blue-100 transition-colors"
                        onClick={() => handleSelect(city)}
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1003 }}
                      >
                        <div className="flex items-center text-gray-700 dark:text-gray-200">
                          <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{city}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address list */}
                <div className="max-h-60 overflow-y-auto z-[1002] relative">
                  {filteredAddresses.length > 0 ? (
                    filteredAddresses.map((city, idx) => (
                      <div 
                        key={idx}
                        className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                        onClick={() => handleSelect(city)}
                      >
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">{city}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded z-[1002] relative">
                      Không tìm thấy địa chỉ phù hợp
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleAddressSelector; 