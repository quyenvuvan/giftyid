"use client";

import React, { useState, useRef } from "react";
import Link from 'next/link';
import { FaStore, FaChartLine, FaHandshake, FaMoneyBillWave, FaTruck, FaShieldAlt } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";
// import ReCaptcha from "@/components/ui/ReCaptcha";
import { useConfetti } from "@/hooks/useConfetti";

export default function SellPage() {
  // Form state
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    businessType: '',
    currentSalesChannels: '',
    productCategories: '',
    expectedRevenue: '',
    businessAddress: '',
    websiteUrl: '',
    socialMedia: '',
    experience: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState<{businessName: string, contactName: string} | null>(null);
  
  // reCAPTCHA
  // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Confetti hook
  const { fireSuccessConfetti } = useConfetti();

  // Trigger confetti khi submit thành công - Comment để debug
  /* useEffect(() => {
    if (submitStatus === 'success') {
      // Delay một chút để user thấy được thông báo trước
      const confettiTimer = setTimeout(() => {
        fireSuccessConfetti();
      }, 300);
      
      // Tự động đóng thông báo sau 30 giây
      const autoCloseTimer = setTimeout(() => {
        setSubmitStatus('idle');
        setLastSubmittedData(null);
      }, 30000);
      
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [submitStatus, fireSuccessConfetti]); */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Xử lý đặc biệt cho số điện thoại
    let processedValue = value;
    if (name === 'phone') {
      // Chỉ cho phép nhập số và một số ký tự đặc biệt
      processedValue = value.replace(/[^0-9\s\-().]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Reset error status khi user thay đổi input
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  /* const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    // Reset error status khi user hoàn thành reCAPTCHA
    if (token && submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Skip reCAPTCHA validation for development
            // Production: reCAPTCHA validation required

    try {
      const response = await fetch('/api/partner-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: 'development-skip' // Placeholder token for development
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setSubmitStatus('success');
      setFormData({
        businessName: '',
        contactName: '',
        phone: '',
        email: '',
        businessType: '',
        currentSalesChannels: '',
        productCategories: '',
        expectedRevenue: '',
        businessAddress: '',
        websiteUrl: '',
        socialMedia: '',
        experience: '',
        additionalInfo: ''
      });
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setLastSubmittedData({businessName: formData.businessName, contactName: formData.contactName});
      
      // Fire confetti immediately
      setTimeout(() => {
        fireSuccessConfetti();
      }, 300);
      
      // Manual timer thay vì useEffect
      setTimeout(() => {
        setSubmitStatus('idle');
        setLastSubmittedData(null);
      }, 30000); // 30 giây
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra');
      console.error('Lỗi submit form:', error);
      // Reset reCAPTCHA khi có lỗi
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600">
        <div className="container mx-auto px-4 py-10 md:py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
             Mở Gian Hàng Zalo Chi Phí 0 Đồng - Chỉ Trả Phí Khi Bán Được Hàng!
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed text-left">
            🚀 Bạn muốn tiếp cận hàng triệu khách hàng trên Zalo mà không tốn chi phí cố định? PostGifty chính là giải pháp!
Với nền tảng hợp tác giữa Gifty Tech & Bưu điện TP. Hải Phòng, chúng tôi mang đến kênh bán hàng Zalo Mini App hiệu quả, tinh gọn và tối ưu cho các đối tác.
            </p>
            <button 
              onClick={() => document.getElementById('partner-register-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300 text-lg"
            >
              Đăng Ký Ngay
            </button>
          </div>
        </div>
        <div className="h-16 bg-gradient-to-b from-blue-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Lợi ích section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12 transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <FaChartLine className="text-3xl text-blue-600 dark:text-blue-400 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">✨ VÌ SAO NÊN CHỌN POSTGIFTY?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                    <p className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                      KHÔNG PHÍ DUY TRÌ: Chỉ phát sinh hoa hồng khi có đơn hàng thành công. Rủi ro bằng 0!
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                    <p className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                      TOÀN QUYỀN KIỂM SOÁT: Tự chủ 100% về giá bán, tồn kho, và các chương trình khuyến mại.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                    <p className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                      VẬN HÀNH TỰ ĐỘNG: Tích hợp sẵn VNPost giao hàng và thanh toán Online/COD tiện lợi.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                    <p className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                     CỘNG ĐỒNG VỮNG MẠNH: Cung cấp nhóm hỗ trợ, mẫu content, kịch bản CSKH để bạn ra đơn ngay. Đội ngũ CTV bán hàng phủ khắp toàn bộ địa bàn Hải Phòng
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                    <p className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                      MINH BẠCH DOANH THU: Dashboard theo dõi hiệu quả kinh doanh theo thời gian thực.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chính sách phí section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
              <div className="flex items-center">
                <FaMoneyBillWave className="text-2xl mr-3 text-yellow-300" />
                <h2 className="text-2xl font-bold">🎁 ƯU ĐÃI ĐỘC QUYỀN CHO ĐỐI TÁC MỚI (Đăng ký trước 30/10/2025)</h2>
              </div>
            </div>
            
            <div className="p-8">
              {/* <div className="mb-8 border-l-4 border-green-500 pl-5 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
                <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400 flex items-center">
                  <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 p-1 rounded mr-3">
                    <FaMoneyBillWave />
                  </span>
                  Phí Nền Tảng Hấp Dẫn
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded font-bold">0%</span> trong <span className="font-bold">2 tháng đầu</span> (hoặc 100 đơn hàng thành công đầu tiên), sau đó chỉ <span className="font-bold">10%</span> trên giá trị sản phẩm 
                  cho hầu hết ngành hàng (riêng ngành Điện tử giá trị cao chỉ <span className="font-bold">2.5%</span>)!
                </p>
              </div> */}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 p-1 rounded mr-3">
                    <FaStore />
                  </span>
                  Được chuyên viên Onboarding 1-1.
                </h3>
                {/* <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    Đối tác đề xuất giá bán dựa trên giá tham khảo từ Shopee (đảm bảo chênh lệch hợp lý, không quá 15%).
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Postgifty sẽ cùng đối tác thống nhất giá niêm yết cuối cùng, đảm bảo giá ổn định và hấp dẫn cho Người mua.
                  </p>
                </div> */}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 p-1 rounded mr-3">
                    <FaTruck />
                  </span>
                  Gói thiết kế miễn phí ảnh sản phẩm cho gian hàng lung linh
                </h3>
                {/* <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
                  <div className="border-l-4 border-blue-500 pl-4 mb-3">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Chính sách phí vận chuyển cho Người mua luôn rõ ràng và hấp dẫn
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 mb-3">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Postgifty hợp tác với Bưu Điện tỉnh Hải Dương, đảm bảo giao hàng tận nhà nhanh chóng, tin cậy.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Điều đặc biệt: Postgifty không thu lợi nhuận từ phí vận chuyển tiêu chuẩn. Toàn bộ phí Người mua trả sẽ được dùng để thanh toán cho Bưu Điện.
                    </p>
                  </div>
                </div> */}
              </div>
              
              <div className="mb-2">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 p-1 rounded mr-3">
                    <FaShieldAlt />
                  </span>
                  Voucher quảng bá chéo, tăng độ nhận diện và thu hút khách hàng mới.
                </h3>
                {/* <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Postgifty thực hiện đối soát và thanh toán doanh thu cho đối tác <span className="font-bold text-blue-600 dark:text-blue-400">02 LẦN MỖI THÁNG</span>, giúp bạn quản lý dòng tiền hiệu quả.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          
          {/* Quy trình section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex items-center">
                <FaHandshake className="text-2xl mr-3 text-yellow-300" />
                <h2 className="text-2xl font-bold">Quy Trình Hợp Tác Đơn Giản</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative rounded-2xl p-6 text-center bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-800 hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800/30">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">1</div>
                  <h3 className="font-bold mt-6 mb-4 text-indigo-700 dark:text-indigo-400 text-xl">Đăng Ký</h3>
                  <p className="text-gray-700 dark:text-gray-300">Điền thông tin đăng ký và gửi hồ sơ trực tuyến qua mẫu đơn giản</p>
                </div>
                
                <div className="relative rounded-2xl p-6 text-center bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-800 hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800/30">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">2</div>
                  <h3 className="font-bold mt-6 mb-4 text-indigo-700 dark:text-indigo-400 text-xl">Xét Duyệt</h3>
                  <p className="text-gray-700 dark:text-gray-300">Postgifty xem xét và liên hệ trong vòng 3 ngày làm việc để thảo luận chi tiết</p>
                </div>
                
                <div className="relative rounded-2xl p-6 text-center bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-800 hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800/30">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">3</div>
                  <h3 className="font-bold mt-6 mb-4 text-indigo-700 dark:text-indigo-400 text-xl">Kích Hoạt</h3>
                  <p className="text-gray-700 dark:text-gray-300">Thiết lập gian hàng và bắt đầu bán sản phẩm với sự hỗ trợ đầy đủ</p>
                </div>
              </div>
            </div>
          </div>
          


          {/* Form Đăng Ký Đối Tác */}
          <div id="partner-register-form" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-center">
                <FaHandshake className="text-2xl mr-3 text-yellow-300" />
                <h2 className="text-2xl font-bold">Đăng Ký Trở Thành Đối Tác</h2>
              </div>
              <p className="text-center mt-2 text-purple-100">
                Điền thông tin để chúng tôi liên hệ tư vấn chi tiết trong vòng 3 ngày làm việc
              </p>
            </div>
            
            <div className="p-8">
              {/* Thông báo thành công - hiển thị thay thế form */}
              {submitStatus === 'success' ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setLastSubmittedData(null);
                    }}
                    className="absolute top-4 right-4 text-green-600 hover:text-green-800 transition-colors"
                    title="Đóng thông báo"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">
                    🎉 Đăng ký đối tác thành công!
                  </h3>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-green-700 text-lg leading-relaxed">
                      Cảm ơn <strong className="text-purple-600">{lastSubmittedData?.businessName}</strong> đã đăng ký hợp tác với Postgifty!
                    </p>
                    <p className="text-green-600 mt-2">
                      Người liên hệ: <strong>{lastSubmittedData?.contactName}</strong>
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 font-medium mb-2">📞 Chúng tôi sẽ liên hệ tư vấn chi tiết trong vòng 3 ngày làm việc</p>
                    <p className="text-blue-700 text-sm">
                      Đội ngũ chuyên gia sẽ hỗ trợ bạn thiết lập gian hàng và triển khai bán hàng hiệu quả trên nền tảng Postgifty
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Thông báo tự động đóng sau 10 giây</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Thông báo lỗi */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Có lỗi xảy ra
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{errorMessage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form đăng ký đối tác */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Thông tin cơ bản */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tên doanh nghiệp/cửa hàng <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="VD: Cửa hàng ABC"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Người liên hệ <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="Họ và tên người đại diện"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="0987654321"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loại hình kinh doanh</label>
                        <select 
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Chọn loại hình</option>
                          <option value="Cửa hàng bán lẻ">Cửa hàng bán lẻ</option>
                          <option value="Cửa hàng online">Cửa hàng online</option>
                          <option value="Nhà phân phối">Nhà phân phối</option>
                          <option value="Sản xuất">Sản xuất</option>
                          <option value="Dịch vụ">Dịch vụ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doanh thu dự kiến</label>
                        <select 
                          name="expectedRevenue"
                          value={formData.expectedRevenue}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Chọn mức doanh thu</option>
                          <option value="Dưới 10 triệu/tháng">Dưới 10 triệu/tháng</option>
                          <option value="10-50 triệu/tháng">10-50 triệu/tháng</option>
                          <option value="50-100 triệu/tháng">50-100 triệu/tháng</option>
                          <option value="100-500 triệu/tháng">100-500 triệu/tháng</option>
                          <option value="Trên 500 triệu/tháng">Trên 500 triệu/tháng</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kênh bán hàng hiện tại</label>
                      <input 
                        type="text" 
                        name="currentSalesChannels"
                        value={formData.currentSalesChannels}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="VD: Shopee, Lazada, Facebook, cửa hàng trực tiếp..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Danh mục sản phẩm chính</label>
                      <input 
                        type="text" 
                        name="productCategories"
                        value={formData.productCategories}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="VD: Thời trang, Điện tử, Thực phẩm, Mỹ phẩm..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Địa chỉ kinh doanh</label>
                      <input 
                        type="text" 
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="Địa chỉ cửa hàng/kho hàng chính"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website (nếu có)</label>
                        <input 
                          type="url" 
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="https://website.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mạng xã hội</label>
                        <input 
                          type="text" 
                          name="socialMedia"
                          value={formData.socialMedia}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          placeholder="Facebook, Instagram, TikTok..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinh nghiệm bán hàng</label>
                      <select 
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Chọn kinh nghiệm</option>
                        <option value="Mới bắt đầu">Mới bắt đầu</option>
                        <option value="Dưới 1 năm">Dưới 1 năm</option>
                        <option value="1-3 năm">1-3 năm</option>
                        <option value="3-5 năm">3-5 năm</option>
                        <option value="Trên 5 năm">Trên 5 năm</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thông tin bổ sung</label>
                      <textarea 
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="Chia sẻ thêm về mong muốn hợp tác, câu hỏi hoặc yêu cầu đặc biệt..."
                      />
                    </div>
                    
                    {/* reCAPTCHA - Comment để debug */}
                    {/* <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        onChange={handleRecaptchaChange}
                        onExpired={handleRecaptchaExpired}
                        theme="light"
                        size="normal"
                      />
                    </div> */}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-purple-400 disabled:to-indigo-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang đăng ký...
                        </span>
                      ) : (
                        '🤝 Đăng Ký Trở Thành Đối Tác'
                      )}
                    </button>
                    
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Bằng việc đăng ký, bạn đồng ý với{' '}
                      <Link href="/terms" className="text-purple-600 hover:text-purple-700 underline">
                        điều khoản dịch vụ
                      </Link>{' '}
                      và{' '}
                      <Link href="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                        chính sách bảo mật
                      </Link>{' '}
                      của Postgifty.
                    </p>
                  </form>
                </>
              )}
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
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-2 text-center shadow-2xl mb-12 animate-pulse-slow">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Đưa Doanh Nghiệp Của Bạn <span className="text-yellow-300">Lên Tầm Cao Mới!</span>
        </h2>
        <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
          Hãy trở thành đối tác của Postgifty ngay hôm nay và cùng nhau tạo nên những thành công mới trong thời đại số!
        </p>
      </div>

        {/* Contact & Office Info Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 text-center mb-12 border border-blue-100 dark:border-blue-900">
          <h3 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center justify-center">
            👉 Đừng bỏ lỡ cơ hội bùng nổ doanh số!
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
            Liên hệ ngay để nhận tư vấn và chốt ưu đãi.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700 dark:text-blue-300">Hotline/Zalo:</span>
              <a href="tel:0913332282" className="text-blue-600 dark:text-blue-400 font-bold underline">0913 332 282</a>
              <span className="text-gray-500 text-sm">(T2–T7, 9:00–18:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700 dark:text-blue-300">Fanpage:</span>
              <a href="https://facebook.com/PostGifty" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline">Inbox Fanpage</a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 text-base">
            <span className="font-semibold text-blue-700 dark:text-blue-300">🏪 Văn phòng hỗ trợ:</span>
            <span>Tầng 3, Phòng dự án, Tòa nhà Bưu điện tỉnh Hải Dương (cũ)</span>
          </div>
        </div>
    </div>
  );
} 