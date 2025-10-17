"use client";

import React, { useState, useRef } from "react";
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
// import ReCaptcha from "@/components/ui/ReCaptcha";
import { useConfetti } from "@/hooks/useConfetti";
import { FaUsers } from 'react-icons/fa';

export default function CollaboratorPage() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    address: '',
    occupation: '',
    experience: '',
    availableTime: '',
    motivation: '',
    referralCode: '',
    bankName: '',
    bankAccount: '',
    accountHolder: '',
    socialMedia: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState<{fullName: string, phone: string} | null>(null);
  
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
      
      // Tự động đóng thông báo sau 10 giây
      const autoCloseTimer = setTimeout(() => {
        setSubmitStatus('idle');
        setLastSubmittedData(null);
      }, 10000);
      
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
    } else if (name === 'age') {
      // Chỉ cho phép nhập số cho tuổi
      processedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'bankAccount') {
      // Chỉ cho phép nhập số cho tài khoản ngân hàng
      processedValue = value.replace(/[^0-9]/g, '');
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
    // setRecaptchaToken(token);
    // Reset error status khi user hoàn thành reCAPTCHA
    if (token && submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleRecaptchaExpired = () => {
    // setRecaptchaToken(null);
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Skip reCAPTCHA validation for development
            // Production: reCAPTCHA validation required

    try {
      const response = await fetch('/api/collaborator-register', {
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
        fullName: '',
        phone: '',
        email: '',
        age: '',
        address: '',
        occupation: '',
        experience: '',
        availableTime: '',
        motivation: '',
        referralCode: '',
        bankName: '',
        bankAccount: '',
        accountHolder: '',
        socialMedia: '',
        additionalInfo: ''
      });
      // setRecaptchaToken(null);
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setLastSubmittedData({fullName: formData.fullName, phone: formData.phone});
      
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
      // setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Phần Hero */}
      <div className="mb-12 p-8 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-center rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-5">GIA NHẬP ĐỘI NGŨ CTV GIFTYID</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed text-left">
          Cùng GiftyID lan tỏa những sản phẩm, dịch vụ chất lượng đến cộng 
          đồng và nhận về những phần thưởng xứng đáng. Cơ hội tăng thu 
          nhập không giới hạn ngay tại địa phương của bạn!
        </p>
        <button 
          onClick={() => document.getElementById('collaborator-register-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-block bg-white text-blue-600 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition duration-300 shadow-md"
        >
          ĐĂNG KÝ NGAY <span className="ml-1">→</span>
        </button>
      </div>

      {/* Tại sao nên trở thành CTV */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-10 text-gray-800 dark:text-white border-l-4 border-blue-500 pl-4">
          Tại Sao Nên Trở Thành CTV của GiftyID?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Thu Nhập Hấp Dẫn</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nhận hoa hồng cao từ mỗi đơn hàng thành công. Thu nhập bền vững từ việc giới thiệu sản phẩm và dịch vụ của GiftyID!
            </p>
          </div>
          
          {/* Box 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Sản Phẩm Đa Dạng</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Giới thiệu nhiều sản phẩm và dịch vụ chất lượng từ các đối tác uy tín của GiftyID.
            </p>
          </div>
          
          {/* Box 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Thời Gian Linh Hoạt</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Bạn hoàn toàn chủ động sắp xếp công việc, phù hợp với lịch trình cá nhân của mình.
            </p>
          </div>
          
          {/* Box 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Hỗ Trợ Tận Tâm</h3>
            <p className="text-gray-600 dark:text-gray-300">
              GiftyID luôn đồng hành cùng bạn với đầy đủ thông tin, công cụ và hỗ trợ trong suốt quá trình hoạt động.
            </p>
          </div>
          
          {/* Box 5 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Cơ Hội Phát Triển</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tham gia đào tạo, nâng cao kỹ năng và có cơ hội thăng tiến trở thành Trưởng Nhóm với nhiều đặc quyền.
            </p>
          </div>
          
          {/* Box 6 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Ưu Đãi Hoa Hồng Đặc Biệt</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cơ hội nhận mức hoa hồng cao hơn cho các sản phẩm nổi bật trong chương trình ưu đãi hàng tháng.
            </p>
          </div>
        </div>
      </div>

      {/* Làm CTV GiftyID - Đơn Giản Mà Hiệu Quả */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-10 text-gray-800 dark:text-white border-l-4 border-blue-500 pl-4">
          Làm CTV GiftyID - Đơn Giản & Hiệu Quả!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bước 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">1. Đăng Ký Dễ Dàng</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Chỉ mất vài phút để đăng ký và hoàn tất thông tin cá nhân, trở thành CTV chính thức.
            </p>
          </div>

          {/* Bước 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">2. Chia Sẻ Thông Minh</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sử dụng mã giới thiệu cá nhân để quảng bá những sản phẩm bạn tâm đắc đến người thân, bạn bè.
            </p>
          </div>

          {/* Bước 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">3. Nhận Hoa Hồng Hấp Dẫn</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Với mỗi đơn hàng thành công, hoa hồng sẽ được cộng vào tài khoản của bạn một cách nhanh chóng.
            </p>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p className="font-medium">Bạn được hưởng hoa hồng cho &quot;tất cả đơn hàng&quot; từ khách hàng do bạn giới thiệu!</p>
        </div>
      </div>

      {/* Thăng Tiến Cùng GiftyID */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-10 text-gray-800 dark:text-white border-l-4 border-blue-500 pl-4">
          Thăng Tiến Cùng GiftyID: Trở Thành Trưởng Nhóm CTV!
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center italic">
          GiftyID luôn tìm kiếm và bồi dưỡng những CTV xuất sắc để trở thành những nhà lãnh đạo tiên phong,
          dẫn dắt đội nhóm và gặt hái thành công lớn hơn!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quyền Lợi Vượt Trội */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Quyền Lợi Vượt Trội Của Trưởng Nhóm
            </h3>
            <ul className="list-disc pl-8 text-gray-600 dark:text-gray-300 space-y-3">
              <li>Nhận thêm hoa hồng đặc biệt từ doanh số của toàn đội nhóm</li>
              <li>Các khoản thưởng hấp dẫn khi nhóm đạt mục tiêu xuất sắc</li>
              <li>Được GiftyID đào tạo chuyên sâu về kỹ năng lãnh đạo và bán hàng</li>
              <li>Hỗ trợ ngân sách tổ chức các hoạt động team building, gắn kết đội nhóm</li>
              <li>Nhiều đặc quyền và cơ hội phát triển sự nghiệp khác</li>
            </ul>
          </div>

          {/* Vai Trò Đầu Tàu */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Vai Trò &quot;Đầu Tàu&quot; Của Bạn
            </h3>
            <ul className="list-disc pl-8 text-gray-600 dark:text-gray-300 space-y-3">
              <li>Xây dựng, quản lý và truyền cảm hứng cho đội nhóm của mình</li>
              <li>Chủ động tuyển dụng và đào tạo các thành viên mới</li>
              <li>Đồng hành cùng GiftyID trong các chiến dịch marketing và phát triển thị trường</li>
              <li>Là cầu nối quan trọng giữa GiftyID và các CTV trong nhóm</li>
              <li>Xây dựng chiến lược phát triển dài hạn cho đội nhóm của bạn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Minh Bạch Trong Thanh Toán */}
      <div className="mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-lg transition duration-300">
        <h2 className="flex items-center text-xl font-semibold mb-5 text-gray-800 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Minh Bạch Trong Thanh Toán
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          GiftyID cam kết quy trình đối soát và thanh toán hoa hồng rõ ràng, minh bạch. Hàng tháng, 
          bạn sẽ nhận được bảng tổng kết chi tiết và hoa hồng sẽ được chuyển thẳng vào tài khoản 
          ngân hàng mà bạn đã đăng ký.
        </p>
      </div>

      

      {/* Form Đăng Ký Cộng Tác Viên */}
      <div id="collaborator-register-form" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
          <div className="flex items-center justify-center">
            <FaUsers className="text-2xl mr-3 text-yellow-300" />
            <h2 className="text-2xl font-bold">Đăng Ký Trở Thành Cộng Tác Viên</h2>
          </div>
          <p className="text-center mt-2 text-emerald-100">
            Điền thông tin để chúng tôi liên hệ hướng dẫn chi tiết trong vòng 2 ngày làm việc
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
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">
                🎉 Đăng ký CTV thành công!
              </h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-emerald-700 text-lg leading-relaxed">
                  Chào mừng <strong className="text-blue-600">{lastSubmittedData?.fullName}</strong> gia nhập đội ngũ CTV GiftyID!
                </p>
                <p className="text-emerald-600 mt-2">
                  Số điện thoại: <strong>{lastSubmittedData?.phone}</strong>
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-medium mb-2">📞 Chúng tôi sẽ liên hệ hướng dẫn chi tiết trong vòng 2 ngày làm việc</p>
                <p className="text-blue-700 text-sm">
                  Đội ngũ hỗ trợ sẽ gửi thông tin đào tạo, tài liệu CTV và hướng dẫn bắt đầu kiếm thu nhập cùng GiftyID
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-medium mb-1">🎁 Quà tặng chào mừng</p>
                <p className="text-yellow-700 text-sm">
                  Bạn sẽ nhận được bộ tài liệu hướng dẫn và mã CTV để bắt đầu ngay lập tức!
                </p>
              </div>
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-emerald-600">
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

              {/* Form đăng ký cộng tác viên */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thông tin cơ bản */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      placeholder="Nguyễn Văn A"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tuổi</label>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="99"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nghề nghiệp hiện tại</label>
                    <input 
                      type="text" 
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      placeholder="VD: Nhân viên văn phòng, Học sinh, Freelancer..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinh nghiệm bán hàng</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Chọn kinh nghiệm</option>
                      <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                      <option value="Dưới 1 năm">Dưới 1 năm</option>
                      <option value="1-2 năm">1-2 năm</option>
                      <option value="2-5 năm">2-5 năm</option>
                      <option value="Trên 5 năm">Trên 5 năm</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Địa chỉ</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    placeholder="Địa chỉ hiện tại của bạn"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thời gian có thể làm việc</label>
                  <select 
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Chọn thời gian</option>
                    <option value="Toàn thời gian">Toàn thời gian (8h/ngày)</option>
                    <option value="Bán thời gian">Bán thời gian (4h/ngày)</option>
                    <option value="Cuối tuần">Chỉ cuối tuần</option>
                    <option value="Linh hoạt">Thời gian linh hoạt</option>
                    <option value="Tối sau 18h">Tối sau 18h</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Động lực tham gia</label>
                  <textarea 
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    placeholder="Tại sao bạn muốn trở thành CTV của GiftyID?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mã giới thiệu (nếu có)</label>
                  <input 
                    type="text" 
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    placeholder="Nhập mã giới thiệu từ CTV khác"
                  />
                </div>
                
                {/* Thông tin thanh toán */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">Thông tin thanh toán hoa hồng</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ngân hàng</label>
                      <input 
                        type="text" 
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="VD: Vietcombank, ACB..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số tài khoản</label>
                      <input 
                        type="text" 
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="1234567890"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chủ tài khoản</label>
                      <input 
                        type="text" 
                        name="accountHolder"
                        value={formData.accountHolder}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        placeholder="Tên trên thẻ ngân hàng"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mạng xã hội</label>
                  <input 
                    type="text" 
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    placeholder="VD: Facebook, Instagram, TikTok, Zalo..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thông tin bổ sung</label>
                  <textarea 
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    placeholder="Thông tin khác bạn muốn chia sẻ..."
                  />
                </div>
                
                {/* reCAPTCHA - Comment tạm thời để debug */}
                {/* <div className="flex justify-center">
                  <ReCaptcha
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
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200"
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
                    '👥 Đăng Ký Trở Thành CTV'
                  )}
                </button>
                
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Bằng việc đăng ký, bạn đồng ý với{' '}
                  <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
                    điều khoản dịch vụ
                  </Link>{' '}
                  và{' '}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                    chính sách bảo mật
                  </Link>{' '}
                  của GiftyID.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 