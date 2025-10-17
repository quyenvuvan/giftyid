"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
// import Image from "next/image";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
// import ReCaptcha from "@/components/ui/ReCaptcha";
import { useConfetti } from "@/hooks/useConfetti";

const plans = [
  {
    name: "Cơ Bản",
    price: "200.000",
    subtitle: "Gói khởi đầu cho SME",
    setup: "2.000.000 VNĐ",
          features: [
        "📝 Gian hàng chuyên nghiệp (Tính năng Bài viết)",
        "🌟 Hiển thị gian hàng, sản phẩm trên GiftyID",
        "📱 Truy cập QR Code & Link duy nhất",
        "📝 Form tư vấn & khảo sát khách hàng",
        "📊 Báo cáo hiệu quả kinh doanh cơ bản",
        "🤝 Chương trình MGM marketing",
        "💬 Liên kết Zalo OA & Diễn đàn CSKH",
        "🎮 Mini Game tăng tương tác"
      ],
    button: { label: "Bắt Đầu Ngay", href: "#signup", variant: "primary" },
    highlight: false,
          limit: "Hiển thị cơ bản trên GiftyID",
    color: "blue",
    badge: "TIẾT KIỆM 70%"
  },
  {
    name: "Tăng Trưởng",
    price: "500.000",
    subtitle: "Mở rộng quy mô kinh doanh",
    setup: "3.000.000 VNĐ",
          features: [
        "✅ Tất cả tính năng Gói Cơ bản",
        "📅 Tính năng Đặt lịch chuyên nghiệp",
        "🌟 Ưu tiên hiển thị trên GiftyID",
        "🎯 Công cụ Flash Sale & Voucher cao cấp",
        "⭐ Hệ thống Khách hàng thân thiết & Tích điểm",
        "💳 Tích hợp đa dạng ví điện tử & thanh toán",
        "🌟 Đánh giá & Review từ khách hàng",
        "📈 Báo cáo phân tích nâng cao"
      ],
    button: { label: "Nâng Cấp Ngay", href: "#signup", variant: "primary" },
    highlight: true,
          limit: "Ưu tiên hiển thị trên GiftyID",
    color: "blue",
    badge: "PHỔ BIẾN NHẤT"
  },
  {
    name: "Doanh Nghiệp",
    price: "Chỉ từ 500.000",
    subtitle: "Giải pháp toàn diện & độc quyền",
    setup: "5.000.000 VNĐ",
          features: [
        "✅ Tất cả tính năng Gói Tăng Trưởng",
        "🛒 Tính năng Đặt hàng & E-commerce đầy đủ",
        "⭐ Hiển thị Shop Mall trên GiftyID",
        "🚚 Tích hợp vận chuyển VNPost",
        "🔗 Public API & Webhook không giới hạn",
        "🎨 Thiết kế giao diện theo yêu cầu",
        "🤖 Automation Marketing (Zalo, Email)",
        "⚙️ Tích hợp CRM/POS/ERP theo nhu cầu",
        "👨‍💼 Account Manager chuyên biệt 24/7"
      ],
    button: { label: "Tư Vấn Chuyên Sâu", href: "#enterprise", variant: "outline" },
    highlight: false,
          limit: "Ưu tiên hiển thị cao nhất trên GiftyID",
    color: "purple",
    badge: "ĐỐI TÁC CHIẾN LƯỢC"
  }
];

const stats = [
  { number: "75M+", label: "Người dùng Zalo tiếp cận được", icon: "👥" },
  { number: "68%", label: "Tiết kiệm chi phí vận hành", icon: "💰" },
  { number: "93%", label: "Khách hàng hài lòng", icon: "⭐" },
  { number: "40%", label: "Tăng hiệu quả lịch hẹn", icon: "📈" }
];

const testimonials = [
  {
    quote: "Trước đây, việc quản lý lịch hẹn luôn khiến chúng tôi đau đầu với nhiều khách không đến. Với GiftyID, tỷ lệ này giảm 35% nhờ hệ thống nhắc nhở tự động qua Zalo.",
    author: "Nguyễn Văn A",
    position: "Quản lý Spa Beauty Garden",
    // image: "/img/testimonial1.jpg"
  },
  {
    quote: "GiftyID giúp chúng tôi tiết kiệm 5 giờ mỗi ngày cho việc quản lý lịch hẹn. Nhân viên không còn phải gọi điện xác nhận, tất cả được tự động hóa qua Zalo.",
    author: "Trần Thị B",
    position: "Chủ nhà hàng Sao Việt",
    // image: "/img/testimonial2.jpg"
  },
  {
    quote: "Khách hàng của chúng tôi rất thích sự tiện lợi khi đặt lịch qua Zalo, không cần cài thêm ứng dụng. Doanh thu tăng 22% chỉ sau 3 tháng triển khai.",
    author: "Lê Văn C",
    position: "Giám đốc Phòng khám Nha khoa Tươi Sáng",
    // image: "/img/testimonial3.jpg"
  }
];

const faqs = [
  {
    question: "GiftyID Mini App khác gì so với việc phát triển ứng dụng riêng?",
    answer: "Mini App chạy trên nền tảng Zalo, không cần cài đặt riêng, tiết kiệm chi phí phát triển đến 70% so với app riêng. Bạn được tiếp cận sẵn 75 triệu người dùng Zalo với chi phí marketing thấp hơn nhiều."
  },
  {
    question: "Tôi đã có website, tôi có cần sử dụng Mini App không?",
    answer: "Hoàn toàn có thể tích hợp! Hệ thống của chúng tôi cho phép đồng bộ dữ liệu giữa website và Mini App, giúp bạn quản lý tập trung mà vẫn tối ưu trải nghiệm đặt lịch trên cả hai nền tảng."
  },
  {
    question: "Tôi cần chuẩn bị gì để sử dụng dịch vụ đặt lịch của GiftyID?",
    answer: "Bạn chỉ cần cung cấp thông tin doanh nghiệp, danh sách dịch vụ và lịch làm việc. Đội ngũ của chúng tôi sẽ thiết lập toàn bộ hệ thống và hướng dẫn bạn sử dụng trong vòng 24-48 giờ."
  },
  {
    question: "Nếu tôi muốn thay đổi gói dịch vụ thì sao?",
    answer: "Bạn có thể nâng cấp gói dịch vụ bất kỳ lúc nào. Việc hạ cấp gói dịch vụ sẽ có hiệu lực từ kỳ thanh toán tiếp theo. Chúng tôi hỗ trợ chuyển đổi dữ liệu miễn phí giữa các gói."
  },
  {
    question: "Làm thế nào để tôi tích hợp GiftyID vào hệ thống quản lý hiện tại?",
    answer: "Chúng tôi cung cấp API đầy đủ và webhook cho phép tích hợp liền mạch với hầu hết các hệ thống quản lý phổ biến như POS, CRM, ERP. Đội ngũ kỹ thuật của chúng tôi sẽ hỗ trợ trong quá trình tích hợp."
  }
];

const features = [
  // I. TÍNH NĂNG CỐT LÕI (CORE FEATURES)
  {
    name: "Tạo và Quản lý Gian hàng",
    description: "Cung cấp một không gian kinh doanh chuyên nghiệp trên Zalo Mini App. Gói Cơ Bản: Bài viết (Giới thiệu, Blog). Gói Tăng Trưởng: Bài viết + Đặt lịch. Gói Doanh Nghiệp: Bài viết + Đặt lịch + E-commerce.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: "Bài viết",
    advanced: "Bài viết + Đặt lịch",
    enterprise: "Tất cả tính năng",
    priority: "Nền tảng"
  },
  {
    name: "Hiển thị Gian hàng trên GiftyID",
    description: "🌟 ƯU ĐÃI ĐỘC QUYỀN: Gian hàng và sản phẩm được hiển thị trên nền tảng GiftyID để tiếp cận khách hàng rộng rãi.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: "Hiển thị cơ bản",
    advanced: "Ưu tiên hiển thị",
    enterprise: "Gắn nhãn Shop Mall",
    priority: "Độc quyền",
    highlight: true
  },
  {
    name: "Truy cập Gian hàng qua QR & Link",
    description: "Tạo mã QR và đường link duy nhất cho gian hàng hoặc từng sản phẩm/dịch vụ. Dễ dàng chia sẻ trên Zalo, Facebook, hoặc in ấn tại cửa hàng để khách hàng truy cập nhanh chóng.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Cơ bản"
  },
  {
    name: "Biểu mẫu Tương tác (Form)",
    description: "Tích hợp các form để thu thập thông tin tư vấn, thực hiện khảo sát khách hàng, hoặc đăng ký nhận tin. Giúp Đối tác hiểu rõ hơn về nhu cầu của khách hàng.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Cơ bản"
  },
  {
    name: "Báo cáo & Thống kê Hiệu quả",
    description: "Cung cấp các báo cáo trực quan về lượt truy cập, số lượng đơn hàng, doanh thu, hiệu quả của CTV... giúp Đối tác nắm bắt tình hình kinh doanh và ra quyết định tốt hơn.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Cơ bản"
  },
  {
    name: "Diễn đàn CSKH & Hỏi đáp",
    description: "Tạo một kênh giao tiếp hai chiều giữa Đối tác và khách hàng ngay trên GiftyID. Giúp giải đáp thắc mắc, xử lý vấn đề và xây dựng cộng đồng khách hàng trung thành.",
    category: "I. TÍNH NĂNG CỐT LỖI (CORE FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Cơ bản"
  },
  // II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)
  {
    name: "Tích hợp Mạng lưới CTV/MGM/Affiliate",
    description: "🔥 LỢI THẾ ĐỘC QUYỀN CỦA GIFTYID. Tự động tạo link affiliate cho từng CTV. Đối tác tiếp cận ngay lập tức mạng lưới hàng trăm CTV (đặc biệt là CTV Bưu điện) để quảng bá sản phẩm/dịch vụ của mình mà không cần tự xây dựng.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Ưu tiên cao nhất",
    highlight: true
  },
  {
    name: "Kết nối Zalo Official Account (OA)",
    description: "Đồng bộ thông tin khách hàng, gửi tin nhắn chăm sóc (ZNS) và triển khai các chiến dịch marketing trực tiếp đến những người đã quan tâm gian hàng của Đối tác trên Zalo.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: true,
    advanced: true,
    enterprise: true,
    priority: "Ưu tiên cao"
  },
  {
    name: "Tạo Mini Game Tương tác",
    description: "Vòng quay may mắn, đuổi hình bắt chữ, giải đố, và nhiều trò chơi khác ngay trên Zalo mini app để tăng tương tác, thu hút khách hàng mới và tri ân khách hàng cũ.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: "Cơ bản",
    advanced: "Nâng cao",
    enterprise: "Cao cấp",
    priority: "Ưu tiên cao"
  },
  {
    name: "Công cụ Khuyến mãi Đa dạng",
    description: "Tạo và quản lý các chương trình Flash sale, phát hành Voucher giảm giá (theo %, theo số tiền) để kích cầu mua sắm, đặc biệt trong các dịp lễ, tết.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: false,
    advanced: true,
    enterprise: true,
    priority: "Nâng cao"
  },
  {
    name: "Khách hàng Thân thiết & Tích điểm/đổi quà/voucher",
    description: "Xây dựng chương trình khách hàng thân thiết, tự động tích điểm cho khách sau mỗi lần mua hàng và cho phép họ đổi quà/voucher từ điểm tích lũy. Giữ chân khách hàng hiệu quả.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: false,
    advanced: true,
    enterprise: true,
    priority: "Nâng cao"
  },
  {
    name: "Đánh giá & Review Sản phẩm/Dịch vụ",
    description: "Cho phép khách hàng để lại đánh giá, bình luận và xếp hạng sao. Giúp tăng uy tín cho gian hàng và cung cấp thông tin tham khảo quý giá cho người mua mới.",
    category: "II. TÍNH NĂNG ĐỘC QUYỀN & TĂNG TRƯỞNG (EXCLUSIVE & GROWTH FEATURES)",
    free: false,
    basic: false,
    advanced: true,
    enterprise: true,
    priority: "Nâng cao"
  },
  // III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)
  {
    name: "Tích hợp Ví điện tử & Thanh toán",
    description: "Hỗ trợ nhiều phương thức thanh toán online phổ biến (ZaloPay, VNPay, chuyển khoản...), mang lại sự tiện lợi tối đa cho khách hàng và tối ưu hóa quy trình thanh toán.",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: false,
    advanced: true,
    enterprise: true,
    priority: "Nâng cao"
  },
  {
    name: "Tích hợp Vận chuyển (VNPost)",
    description: "🔥 ĐỐI TÁC CHIẾN LƯỢC. Kết nối trực tiếp với hệ thống của VNPost. Tự động tính phí vận chuyển đồng giá, tạo vận đơn và theo dõi hành trình đơn hàng ngay trên GiftyID. Đảm bảo quy trình giao nhận chuyên nghiệp, tin cậy.",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: false,
    advanced: false,
    enterprise: true,
    priority: "Doanh nghiệp",
    highlight: true
  },
  {
    name: "Tích hợp CRM/POS/ERP",
    description: "Khả năng kết nối GiftyID với các hệ thống quản lý khách hàng (CRM), quản lý bán hàng tại điểm bán (POS), hoặc quản lý tổng thể doanh nghiệp (ERP) mà Đối tác đang sử dụng. (Thực hiện theo yêu cầu riêng).",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: "Liên hệ",
    advanced: "Liên hệ",
    enterprise: "Liên hệ",
    priority: "Liên hệ"
  },
  {
    name: "Tự động hóa Marketing (Zalo, Email)",
    description: "Thiết lập các kịch bản chăm sóc khách hàng tự động: gửi tin nhắn cảm ơn sau khi mua hàng, nhắc nhở đặt lịch, thông báo khuyến mãi qua Zalo ZNS hoặc Email. (Thực hiện theo yêu cầu riêng).",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: "Liên hệ",
    advanced: "Liên hệ",
    enterprise: "Liên hệ",
    priority: "Liên hệ"
  },
  {
    name: "Thiết kế Giao diện Zalo Mini App Theo Yêu cầu",
    description: "Đối với các Đối tác Doanh nghiệp, GiftyID cung cấp dịch vụ thiết kế giao diện gian hàng độc quyền, mang đậm dấu ấn thương hiệu.",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: "Liên hệ",
    advanced: "Liên hệ",
    enterprise: "Liên hệ",
    priority: "Liên hệ"
  },
  {
    name: "Public API & Webhook",
    description: "Cung cấp API/Webhook để Đối tác có thể đồng bộ dữ liệu (đơn hàng, khách hàng...) với các hệ thống nội bộ khác một cách tự động và real-time.",
    category: "III. TÍNH NĂNG MỞ RỘNG & TÍCH HỢP NÂNG CAO (ADVANCED & INTEGRATION FEATURES)",
    free: false,
    basic: false,
    advanced: false,
    enterprise: true,
    priority: "Doanh nghiệp"
  }
];

export default function DichVuPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: 'Cơ Bản'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState<{name: string, phone: string} | null>(null);
  
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
      }, 30000);
      
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [submitStatus, fireSuccessConfetti]); */
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch('/api/consultation', {
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
        name: '',
        phone: '',
        email: '',
        package: 'Cơ Bản'
      });
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setLastSubmittedData({name: formData.name, phone: formData.phone});
      
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
      // setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-600 dark:bg-blue-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]"></div>
        </div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              🚀 Nền Tảng Gian Hàng Đa Năng Trên <span className="text-yellow-300 block sm:inline">Zalo Mini App</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              <strong>GiftyID</strong> - Giải pháp toàn diện giúp <span className="text-yellow-300 font-semibold">Đối tác Kinh doanh</span> xây dựng gian hàng chuyên nghiệp, quản lý bán hàng hiệu quả và mở rộng mạng lưới khách hàng trên hệ sinh thái <span className="text-yellow-300 font-semibold">75+ triệu người dùng Zalo</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
              <Link href="#pricing" className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition duration-300 text-base sm:text-lg w-full sm:w-auto">
                Xem Bảng Giá
              </Link>
              <Link href="#demo" className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition duration-300 text-base sm:text-lg w-full sm:w-auto">
                Yêu Cầu Demo
              </Link>
            </div>
            {/* <div className="text-center text-blue-200 text-sm">
              Được tin dùng bởi:
              <span className="mx-2 font-medium">Beauty Garden</span> • 
              <span className="mx-2 font-medium">Nha Khoa Tươi Sáng</span> • 
              <span className="mx-2 font-medium">Nhà Hàng Sao Việt</span>
            </div> */}
          </div>
        </div>
        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-current text-gray-50 dark:text-gray-900">
            <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-center transform transition duration-300 hover:-translate-y-1">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-4">{stat.icon}</div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="container mx-auto px-4 py-12 sm:py-16">
       
        
        {/* Pricing Cards */}
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 justify-center items-stretch mb-12 sm:mb-16">
          {plans.map((plan) => (
                          <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl sm:rounded-2xl shadow-lg flex-1 max-w-sm mx-auto xl:max-w-none xl:mx-0 ${
                  plan.highlight 
                  ? "bg-gray-900 border-2 border-blue-500 dark:bg-gray-900 z-10" 
                  : "bg-gray-900 border border-gray-700 dark:bg-gray-900"
                }`}
              >
                {(plan.highlight || plan.badge) && (
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' 
                      : plan.badge === 'ĐỐI TÁC CHIẾN LƯỢC'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  } text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full shadow-lg whitespace-nowrap`}>
                    {plan.badge || 'PHỔ BIẾN NHẤT'}
                  </div>
                )}
                
                <div className={`w-full bg-${plan.color}-500`}></div>
                
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <h2 className={`text0-${plan.color}-400 font-bold text-xl sm:text-2xl mb-1 text-center mt-2 sm:mt-3 text-white`}>
                    {plan.name.toUpperCase()}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm text-center mb-3 sm:mb-4">{plan.subtitle}</p>
                  
                  <div className="text-center mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-1 text-sm sm:text-base">VNĐ/tháng</span>
                  </div>
                  
                  <div className="text-center text-xs sm:text-sm text-gray-400 mb-2">
                    Phí Khởi Tạo: <span className="font-medium text-gray-300">{plan.setup}</span>
                  </div>
                  
                  <div className="text-center mb-4 sm:mb-6">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300 border border-gray-700 leading-tight">
                      {plan.limit}
                    </span>
                  </div>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className={`text-${plan.color}-500 flex-shrink-0 mt-1`}>•</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link
                      href={plan.button.href}
                      className={`block w-full text-center py-3 sm:py-4 rounded-lg font-bold text-white transition-colors duration-200 text-sm sm:text-base
                        ${plan.button.variant === "primary"
                          ? `bg-${plan.color}-600 hover:bg-${plan.color}-700`
                          : `bg-transparent border border-${plan.color}-600 text-${plan.color}-400 hover:bg-${plan.color}-900/20`}
                      `}
                    >
                      {plan.button.label}
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md overflow-hidden mb-12 sm:mb-16 lg:mb-20 border border-gray-200 dark:border-gray-800">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center px-2 sm:px-0">
              🎯 Bảng Tính Năng Hoàn Thiện & Độc Quyền Dành Cho Đối Tác GiftyID
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
              Được thiết kế để làm nổi bật các giá trị và quyền lợi mà <strong>Đối tác Bán hàng</strong> và <strong>Đối tác Dịch vụ Đặt lịch</strong> sẽ nhận được khi tham gia và phát triển cùng GiftyID, 
              đồng thời nhấn mạnh các <span className="text-blue-600 font-semibold">tính năng độc quyền</span> mà GiftyID cung cấp.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <th className="py-3 sm:py-4 px-2 sm:px-3 text-center text-gray-600 dark:text-gray-400 font-bold text-xs sm:text-sm">STT</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-600 dark:text-gray-400 font-bold text-xs sm:text-sm">Tính Năng của các gói</th>
                  <th className="py-3 sm:py-4 px-2 sm:px-6 text-center text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">Gói Cơ Bản</th>
                  <th className="py-3 sm:py-4 px-2 sm:px-6 text-center text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">Gói Tăng Trưởng</th>
                  <th className="py-3 sm:py-4 px-2 sm:px-6 text-center text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm">Gói Doanh Nghiệp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {(() => {
                  let currentCategory = '';
                  let counter = 0;
                  return features.map((feature, idx) => {
                    counter++;
                    const isNewCategory = feature.category !== currentCategory;
                    if (isNewCategory) {
                      currentCategory = feature.category;
                    }
                    
                    return (
                      <React.Fragment key={idx}>
                        {isNewCategory && (
                          <tr className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20">
                            <td colSpan={5} className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold text-gray-800 dark:text-white text-xs sm:text-sm uppercase tracking-wide border-t-2 border-blue-400">
                              {feature.category}
                            </td>
                          </tr>
                        )}
                        <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 ${feature.highlight ? 'bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10' : ''}`}>
                          <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-bold text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 text-sm">
                            {counter}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <div className="space-y-1">
                              <div className={`font-semibold text-gray-900 dark:text-white text-sm sm:text-base ${feature.highlight ? 'text-orange-700 dark:text-orange-400' : ''}`}>
                                {feature.name}
                                {feature.highlight && (
                                  <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                                    ĐỘC QUYỀN
                                  </span>
                                )}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                Mức độ: {feature.priority}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                            {feature.basic === true ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                                <FaCheck className="text-green-500 text-xs sm:text-sm" />
                              </span>
                            ) : feature.basic === false ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                                <FaTimes className="text-red-500 text-xs sm:text-sm" />
                              </span>
                            ) : (
                              <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                                {feature.basic}
                              </span>
                            )}
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                            {feature.advanced === true ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                                <FaCheck className="text-green-500 text-xs sm:text-sm" />
                              </span>
                            ) : feature.advanced === false ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                                <FaTimes className="text-red-500 text-xs sm:text-sm" />
                              </span>
                            ) : (
                              <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                                {feature.advanced}
                              </span>
                            )}
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                            {feature.enterprise === true ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                                <FaCheck className="text-green-500 text-xs sm:text-sm" />
                              </span>
                            ) : feature.enterprise === false ? (
                              <span className="inline-flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                                <FaTimes className="text-red-500 text-xs sm:text-sm" />
                              </span>
                            ) : (
                              <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">
                                {feature.enterprise}
                              </span>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
          
          {/* Legend and Partner Benefits */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Giải thích ký hiệu
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30">
                      <FaCheck className="text-green-500 text-sm" />
                    </span>
                    <span>Có tính năng thuộc gói</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30">
                      <FaTimes className="text-red-500 text-sm" />
                    </span>
                    <span>Không bao gồm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      Liên hệ
                    </span>
                    <span>Tính năng đặc biệt, vui lòng liên hệ để biết thêm chi tiết</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  🌟 Lợi thế độc quyền khi trở thành Đối tác GiftyID
                </h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">🚀</span>
                    <span><strong>Tiếp cận 75+ triệu</strong> người dùng Zalo ngay lập tức</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">💰</span>
                    <span><strong>Hoa hồng CTV cao nhất</strong> thị trường (lên tới 15%)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">🤝</span>
                    <span><strong>Mạng lưới CTV Bưu điện</strong> VHX sẵn có</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">📈</span>
                    <span><strong>Tích hợp VNPost</strong> - đối tác logistics chiến lược</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">🎓</span>
                    <span><strong>Đào tạo & hỗ trợ</strong> phát triển kinh doanh miễn phí</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 rounded-full mr-3 sm:mr-4 overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic text-sm sm:text-base leading-relaxed">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Tìm hiểu thêm về dịch vụ đặt lịch của GiftyID và cách nó có thể phục vụ nhu cầu doanh nghiệp của bạn
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-3 sm:mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-4 sm:p-5 text-left bg-white dark:bg-gray-800 touch-manipulation"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base pr-4">{faq.question}</span>
                <span className="bg-gray-100 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {openFaq === index ? (
                    <FaChevronUp className="text-blue-500 text-sm" />
                  ) : (
                    <FaChevronDown className="text-gray-500 dark:text-gray-400 text-sm" />
                  )}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div id="demo" className="container mx-auto px-4 py-12 sm:py-16">
        <div className="bg-blue-600 dark:bg-blue-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center px-4 sm:px-0">
              Sẵn Sàng Nâng Tầm Trải Nghiệm Đặt Lịch?
            </h2>
            <p className="text-blue-100 mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              Đăng ký ngay hôm nay để được tư vấn miễn phí và trải nghiệm demo đầy đủ tính năng. Đội ngũ chuyên gia của chúng tôi sẽ giúp bạn lựa chọn giải pháp phù hợp nhất.
            </p>
            
            <div id="free-signup" className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg sm:rounded-xl max-w-md mx-auto shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Đăng Ký Tư Vấn
              </h3>
              
              {/* Thông báo thành công - hiển thị thay thế form */}
              {submitStatus === 'success' ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setLastSubmittedData(null);
                    }}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 text-green-600 hover:text-green-800 transition-colors touch-manipulation"
                    title="Đóng thông báo"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-2">
                    🎉 Đăng ký thành công!
                  </h3>
                  <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                    Cảm ơn <strong>{lastSubmittedData?.name || 'bạn'}</strong> đã quan tâm đến dịch vụ của chúng tôi!<br />
                    Chúng tôi sẽ liên hệ với bạn qua <strong>{lastSubmittedData?.phone || 'số điện thoại đã đăng ký'}</strong> trong vòng 24 giờ tới.
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="hidden sm:inline">Thông báo tự động đóng sau 10 giây</span>
                    <span className="sm:hidden">Tự động đóng sau 10s</span>
                  </div>
                </div>
              ) : (
                /* Form đăng ký - chỉ hiển thị khi không thành công */
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base touch-manipulation" 
                      placeholder="Nhập họ tên của bạn"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base touch-manipulation" 
                      placeholder="Nhập số điện thoại"
                      pattern="^(0[235789])[0-9]{8}$"
                      title="Số điện thoại phải bắt đầu bằng 02, 03, 05, 07, 08 hoặc 09 và có 10 chữ số"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Nhập số điện thoại 10 chữ số (VD: 0987654321)
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base touch-manipulation" 
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gói dịch vụ quan tâm</label>
                    <select 
                      name="package"
                      value={formData.package}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base touch-manipulation"
                    >
                      <option>Cơ Bản</option>
                      <option>Tăng Trưởng</option>
                      <option>Doanh Nghiệp</option>
                    </select>
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
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 rounded-lg shadow-md transition duration-200 text-sm sm:text-base touch-manipulation"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="hidden sm:inline">Đang đăng ký...</span>
                        <span className="sm:hidden">Đang gửi...</span>
                      </span>
                    ) : (
                      'Đăng Ký Ngay'
                    )}
                  </button>

                  {/* Thông báo lỗi */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-red-800 font-medium">Có lỗi xảy ra</span>
                      </div>
                      <p className="text-red-700 text-sm">
                        {errorMessage || 'Vui lòng thử lại sau.'}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 