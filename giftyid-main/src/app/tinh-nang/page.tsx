"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaRocket, 
  FaStore, 
  FaCalendarCheck, 
  FaUsers, 
  FaBell, 
  FaRobot, 
  FaGamepad, 
  FaHeadset, 
  FaTools, 
  FaCode,
  FaMobile,
  FaDatabase,
  FaShieldAlt,
  FaGlobe
} from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Định nghĩa types cho Chart.js sẽ được xử lý trực tiếp trong các hàm

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

export default function TinhNangPage() {
  // State để theo dõi dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Kiểm tra dark mode khi component mount và khi có thay đổi
  useEffect(() => {
    // Kiểm tra dark mode ban đầu
    const checkDarkMode = () => {
      const isDark = 
        document.documentElement.classList.contains('dark') || 
        document.body.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    // Kiểm tra ngay khi mount
    checkDarkMode();

    // Theo dõi thay đổi dark mode
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Theo dõi thay đổi từ media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => checkDarkMode();
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const doughnutData = {
    labels: [
      'Thương mại Điện tử',
      'Dịch vụ F&B',
      'Tiện ích & Đời sống',
      'Tài chính & Ngân hàng',
      'Giải trí & Game',
      'Giáo dục & Đào tạo',
    ],
    datasets: [
      {
        label: 'Phân bổ Mini App',
        data: [35, 25, 15, 10, 8, 7],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // blue-500 with opacity
          'rgba(16, 185, 129, 0.7)', // green-500 with opacity
          'rgba(245, 158, 11, 0.7)', // yellow-500 with opacity
          'rgba(239, 68, 68, 0.7)',  // red-500 with opacity
          'rgba(139, 92, 246, 0.7)', // purple-500 with opacity
          'rgba(249, 115, 22, 0.7)', // orange-500 with opacity
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#F97316',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#F97316',
        ],
        hoverBorderColor: '#FFFFFF',
        hoverBorderWidth: 3,
        hoverOffset: 8, // Tăng độ nổi khi hover
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          // Sử dụng state isDarkMode để thay đổi màu chữ
          color: isDarkMode ? '#FFFFFF' : '#374151',
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 25,
          usePointStyle: true,
          boxWidth: 15,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 16, family: "'Inter', sans-serif", weight: 'bold' as const },
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: function(context: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          },
          title: function() {
            return '';
          }
        }
      },
      datalabels: {
        display: true,
        color: (context: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          const bgColor = context.dataset.backgroundColor[context.dataIndex];
          if (bgColor.startsWith('rgba')) {
            const alpha = parseFloat(bgColor.split(',')[3]);
            return alpha > 0.6 ? '#FFFFFF' : '#000000';
          }
          return '#FFFFFF';
        },
        font: {
          size: 12,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        },
        formatter: (value: number) => {
          return value + '%';
        },
        anchor: 'center' as const, 
        align: 'center' as const,
        offset: 1,
        borderRadius: 4,
      }
    },
    cutout: '65%',
    elements: {
      arc: {}
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-800">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="text-yellow-300">Mini App</span> - Giải Pháp Toàn Diện Cho Doanh Nghiệp
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto text-left">
              Ứng dụng Zalo Mini App của Gifty Tech giúp doanh nghiệp đưa dịch vụ tới 75 triệu người dùng Zalo với chi phí tối ưu.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dich-vu#demo" className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300 text-lg">
                Xem Demo
              </Link>
              <Link href="#tinh-nang-doanh-nghiep" className="inline-block bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300 text-lg">
                Xem Tính Năng
              </Link>
            </div>
          </div>
        </div>
        <div className="h-16 bg-gradient-to-b from-indigo-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Phân Bổ Các Loại Mini App Phổ Biến */}
          <div className="my-5 md:my-5 bg-white dark:bg-gray-800 p-6 md:p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-4">
              Phân Bổ Các Loại Mini App Phổ Biến
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8 md:mb-12">
              Zalo Mini Apps đang được ứng dụng trong nhiều lĩnh vực khác nhau. Biểu đồ dưới đây minh họa về sự phân bổ các loại hình Mini App phổ biến, cho thấy sự đa dạng và tiềm năng phát triển.
            </p>
            <div className="relative h-120 md:h-100 w-full max-w-2xl mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8">
              Lưu ý: Đây là dữ liệu minh họa nhằm thể hiện sự đa dạng. Tỷ lệ thực tế có thể thay đổi.
            </p>
          </div>

        
          {/* Tính năng cho doanh nghiệp */}
          <div id="tinh-nang-doanh-nghiep" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block mb-3">
                Tính Năng Nổi Bật Cho Doanh Nghiệp
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Thương mại điện tử */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <FaStore className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Thương Mại Điện Tử</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Vận hành cửa hàng trực tuyến với đầy đủ tính năng: quản lý sản phẩm, đơn hàng và thanh toán. Tiếp cận 75 triệu người dùng Zalo mà không cần đầu tư ứng dụng riêng.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:underline">
                      <span>Chi tiết</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Đặt lịch & đặt chỗ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                      <FaCalendarCheck className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Đặt Lịch & Đặt Chỗ</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Hệ thống đặt lịch tự động với tính năng nhắc hẹn qua Zalo, giảm tỷ lệ khách không đến. Quản lý lịch hẹn dễ dàng, tối ưu thời gian phục vụ.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-green-600 dark:text-green-400 font-medium flex items-center hover:underline">
                      <span>Chi tiết</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Khách hàng thân thiết */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-4 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                      <FaUsers className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Khách Hàng Thân Thiết</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Tăng tỷ lệ khách quay lại với chương trình tích điểm, đổi quà và thẻ thành viên kỹ thuật số. Khách hàng dễ dàng tiếp cận mà không cần cài thêm ứng dụng.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-amber-600 dark:text-amber-400 font-medium flex items-center hover:underline">
                      <span>Chi tiết</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Thông báo & ZNS */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <FaBell className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Thông Báo & ZNS</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Gửi thông báo đẩy và tin nhắn ZNS có tỷ lệ mở cao hơn SMS. Lý tưởng cho xác thực, thông báo đơn hàng và nhắc hẹn với chi phí thấp hơn.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:underline">
                      <span>Chi tiết</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Marketing AI */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <FaRobot className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Marketing AI</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Tạo mẫu quảng cáo Zalo và nội dung khuyến mãi tự động bằng AI. Nhắm mục tiêu chính xác và tăng tỷ lệ chuyển đổi với chi phí tối ưu.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-red-600 dark:text-red-400 font-medium flex items-center hover:underline">
                      <span>Tạo nội dung</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Mini Games */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mr-4 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                      <FaGamepad className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Mini Games</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Thu hút khách hàng với trải nghiệm tương tác qua trò chơi mini. Thu thập dữ liệu người dùng để cá nhân hóa trải nghiệm và tối ưu chiến dịch.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-pink-600 dark:text-pink-400 font-medium flex items-center hover:underline">
                      <span>Ý tưởng game</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Chăm sóc khách hàng */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      <FaHeadset className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">CSKH Đa Kênh</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Chat trực tiếp, tin nhắn cá nhân hóa và hỗ trợ tự động qua Zalo. Quản lý tập trung mọi tương tác khách hàng trên một nền tảng duy nhất.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-teal-600 dark:text-teal-400 font-medium flex items-center hover:underline">
                      <span>Mẫu tin CSKH</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Công cụ phát triển */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <FaTools className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Công Cụ Phát Triển</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Rút ngắn thời gian phát triển với Zalo Mini App Studio và mẫu UI có sẵn. Chuyển đổi dễ dàng từ web app hiện có sang Mini App.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center hover:underline">
                      <span>Tư vấn phát triển</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Tích hợp API */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mr-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                      <FaCode className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tích Hợp API</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    Kết nối liền mạch với hệ thống nội bộ và dịch vụ bên thứ ba. Webhook giúp tự động hóa quy trình khi có sự kiện mới từ Zalo.
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link href="#" className="text-cyan-600 dark:text-cyan-400 font-medium flex items-center hover:underline">
                      <span>Tài liệu API</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lợi ích cho người dùng */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 inline-block mb-3">
                Lợi Ích Cho Người Dùng
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Không cần cài đặt */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <FaRocket className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Truy Cập Ngay</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Không cần tải về, cài đặt hay chờ đợi. Sử dụng dịch vụ ngay lập tức thông qua Zalo.
                </p>
              </div>
              
              {/* Tiết kiệm dung lượng */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <FaDatabase className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Nhẹ Và Tiết Kiệm</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Giải phóng bộ nhớ thiết bị, không còn lo lắng về việc điện thoại đầy bộ nhớ vì quá nhiều ứng dụng.
                </p>
              </div>
              
              {/* Đa dạng dịch vụ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <FaGlobe className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mọi Dịch Vụ Trong Zalo</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mua sắm, đặt đồ ăn, đặt lịch dịch vụ, giải trí - tất cả đều có thể trải nghiệm ngay trong Zalo.
                </p>
              </div>
              
              {/* Giao diện thân thiện */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <FaMobile className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Giao Diện Quen Thuộc</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Trải nghiệm mượt mà với giao diện đồng nhất, không cần học cách sử dụng mỗi ứng dụng mới.
                </p>
              </div>
              
              {/* Dễ dàng chia sẻ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Chia Sẻ Liền Mạch</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chia sẻ tức thì dịch vụ hoặc sản phẩm yêu thích cho bạn bè và gia đình chỉ với vài thao tác đơn giản.
                </p>
              </div>
              
              {/* An toàn & tin cậy */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full p-3 transform group-hover:rotate-6 transition-transform duration-300">
                  <FaShieldAlt className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">An Toàn & Bảo Mật</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mọi Mini App đều được Zalo kiểm duyệt nghiêm ngặt, đảm bảo an toàn thông tin và bảo vệ dữ liệu người dùng.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center shadow-2xl mb-12 animate-pulse-slow">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Sẵn Sàng <span className="text-yellow-300">Bứt Phá</span> với Mini App?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto">
              Đội ngũ phát triển chuyên nghiệp của Gifty Tech sẵn sàng biến ý tưởng của bạn thành ứng dụng Mini App hoạt động hoàn hảo trên Zalo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 text-lg">
                Liên Hệ Ngay
              </Link>
              <Link href="/portfolio" className="inline-block bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 text-lg">
                Xem Dự Án
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
} 