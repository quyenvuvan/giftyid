"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCheck, FaChevronDown, FaChevronUp,
  FaCreditCard, FaTruck, FaGamepad, FaCogs, FaEnvelope, FaPalette,
  FaStore, FaQrcode, FaFileAlt, FaChartBar, FaComments, FaUsers,
  FaBolt, FaStar, FaGift, FaShieldAlt, FaRocket, FaHeadset, FaSync,
  FaExclamationTriangle, FaArrowLeft, FaArrowRight, FaCheckCircle
} from "react-icons/fa";
import { useConfetti } from "@/hooks/useConfetti";

interface ServiceFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  enabled: boolean;
  lastUpdated: string;
  highlight?: boolean;
  included?: boolean;
  details?: string[];
}

const basePrice = 200000; // 200.000 VNĐ - Gói khởi điểm

// Tính năng cốt lõi - hardcoded (không đổi)
const coreFeatures: ServiceFeature[] = [
  {
    id: "gian-hang",
    name: "Tạo và Quản lý Gian hàng",
    description: "Gian hàng chuyên nghiệp trên Zalo Mini App với đầy đủ tính năng",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "Gian hàng chuyên nghiệp với giao diện đẹp",
      "Hiển thị bài đăng, hình ảnh, video, thông tin sản phẩm",
      "Quản lý chi tiết bài đăng đầy đủ",
    ]
  },
  {
    id: "hien-thi-giftyid",
    name: "Hiển thị Gian hàng trên GiftyID",
    description: "Gắn nhãn Shop Mall - Ưu tiên hiển thị cao nhất trên GiftyID",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    highlight: true,
    details: [
      "Hiển thị ưu tiên cao nhất trên GiftyID",
      "Gắn nhãn Shop Mall độc quyền",
      "Tiếp cận 75+ triệu người dùng Zalo",
      "Tăng khả năng hiển thị và tương tác"
    ]
  },
  {
    id: "qr-link",
    name: "Truy cập Gian hàng qua QR & Link",
    description: "QR Code và link duy nhất cho gian hàng và sản phẩm",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "QR Code duy nhất cho gian hàng",
      "Link chia sẻ cho từng bài đăng/sản phẩm/dịch vụ",
      "Dễ dàng in ấn và chia sẻ",
      "Tích hợp với marketing offline"
    ]
  },
  {
    id: "form-tu-van",
    name: "Biểu mẫu Tương tác (Form)",
    description: "Form tư vấn và khảo sát khách hàng chuyên nghiệp",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "Form tư vấn khách hàng",
      "Khảo sát nhu cầu",
      "Đăng ký nhận tin khuyến mãi",
      "Thu thập feedback khách hàng"
    ]
  },
  {
    id: "bao-cao",
    name: "Báo cáo & Thống kê Hiệu quả",
    description: "Báo cáo phân tích nâng cao về hiệu quả kinh doanh",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "Báo cáo hiệu quả hoạt động gian hàng",
      "Thống kê lượt truy cập, tương tác",
      "Dashboard quản lý gian hàng real-time"
    ]
  },
  {
    id: "ctv-mgm",
    name: "Chương trình MGM",
    description: "Khách hàng giới thiệu khách hàng",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    highlight: true,
    details: [
      "Tham gia chương trình Giới thiệu bạn bè",
      "Khách hàng nhận mã QR giới thiệu cá nhân",
      "Chia sẻ mã giới thiệu với bạn bè",
      "Tặng voucher/giảm giá cho người nhập mã giới thiệu và người giới thiệu",
    ]
  },
  {
    id: "dien-dan",
    name: "Diễn đàn CSKH & Hỏi đáp",
    description: "Kênh giao tiếp hai chiều với khách hàng",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "Diễn đàn hỏi đáp khách hàng",
      "Hỗ trợ khách hàng 24/7",
      "Xây dựng cộng đồng trung thành",
      "Quản lý feedback tập trung"
    ]
  },

  {
    id: "zalo-oa",
    name: "Kết nối Zalo Official Account (OA)",
    description: "Đồng bộ thông tin và gửi tin nhắn chăm sóc qua ZNS",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    details: [
      "Đồng bộ dữ liệu khách hàng",
      "Gửi tin nhắn ZNS tự động",
      "Chiến dịch marketing trực tiếp",
      "Chăm sóc khách hàng tự động"
    ]
  },
  {
    id: "account-manager",
    name: "Tổng đài chăm sóc khách hàng",
    description: "Hỗ trợ chuyên biệt và tư vấn 24/7",
    price: 0,
    included: true,
    category: "Tính năng cốt lõi",
    enabled: true,
    lastUpdated: "",
    highlight: true,
    details: [
      "Chatbot AI tự động trả lời các câu hỏi thường gặp",
      "Hỗ trợ kỹ thuật 24/7",
      "Tư vấn chiến lược kinh doanh",
      "Đào tạo và hướng dẫn sử dụng"
    ]
  }
];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  // Tính năng cốt lõi
  "gian-hang": FaStore,
  "hien-thi-giftyid": FaRocket,
  "qr-link": FaQrcode,
  "form-tu-van": FaFileAlt,
  "bao-cao": FaChartBar,
  "dien-dan": FaComments,
  "ctv-mgm": FaUsers,
  "zalo-oa": FaBolt,
  "account-manager": FaHeadset,

  // Tính năng mở rộng (từ Google Sheets)
  "minigame": FaGamepad,
  "flash-sale": FaGift,
  "khach-hang-than-thiet": FaStar,
  "danh-gia": FaStar,
  "vi-dien-tu": FaCreditCard,
  "van-chuyen": FaTruck,
  "crm-pos-erp": FaCogs,
  "crm-pos-erp-custom": FaCogs,
  "marketing-auto": FaEnvelope,
  "thiet-ke-giao-dien": FaPalette,
  "api-webhook": FaShieldAlt,
  "blockchain-integration": FaShieldAlt,
  "ai-chatbot": FaComments,
  "api-integration": FaShieldAlt,
  "dat-lich": FaCheck,
  "dat-hang": FaStore,
};



export default function TinhPhiPage() {
  const [dynamicFeatures, setDynamicFeatures] = useState<ServiceFeature[]>([]); // Chỉ chứa extension features từ Google Sheets
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [, setLastUpdated] = useState<string>("");
  const [, setDataSource] = useState<'sheets' | 'fallback' | null>(null);
  const [activeTab, setActiveTab] = useState<'core' | 'extension' | 'consultation'>('core');
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());
  const [featureRequirements, setFeatureRequirements] = useState<Record<string, string>>({});
  const [otherFeatureRequirement, setOtherFeatureRequirement] = useState<string>('');

  // State cho custom modal
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationModalMessage, setValidationModalMessage] = useState<string[]>([]);

  // State cho popup thông báo
  const [showPopup, setShowPopup] = useState(false);
  const [popupConfig, setPopupConfig] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
    icon: React.ComponentType<{ className?: string }> | null;
  }>({
    type: 'success',
    title: '',
    message: '',
    icon: null
  });

  // Form state - cập nhật theo form trang dịch vụ
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: 'Doanh Nghiệp',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);
  const { fireSuccessConfetti } = useConfetti();

  const fetchPricingData = async (forceRefresh = false): Promise<void> => {
    try {
      setLoading(true);
      const url = forceRefresh
        ? '/api/service-pricing?_clearCache=true'
        : '/api/service-pricing';

      const response = await fetch(url);
      const data = await response.json();

      if (data.success && data.features) {
        // Chỉ lấy features thuộc category "Tính năng mở rộng"
        const extensionFeatures: ServiceFeature[] = data.features
          .filter((f: { category: string }) => f.category === 'Tính năng mở rộng')
          .filter((f: { id: string }, index: number, self: { id: string }[]) => 
            index === self.findIndex(feature => feature.id === f.id)
          ) // Lọc duplicate ngay từ source
          .map((f: { id: string; name: string; description: string; price: number; category: string; enabled: boolean; lastUpdated: string; highlight?: boolean; included?: boolean; details?: string[] }) => {
            // Tạo details chi tiết dựa trên feature id
            let details = [];
            switch (f.id) {
              case 'crm-pos-erp-custom':
                details = [
                  'Tích hợp với hệ thống CRM hiện tại',
                  'Đồng bộ dữ liệu POS real-time',
                  'Kết nối ERP doanh nghiệp',
                  'Tùy chỉnh theo quy trình riêng'
                ];
                break;
              case 'blockchain-integration':
                details = [
                  'Marketplace NFT tùy chỉnh',
                  'Smart contract tự động',
                  'Ví blockchain tích hợp',
                  'Bảo mật đa lớp blockchain'
                ];
                break;
              case 'ai-chatbot':
                details = [
                  'AI trả lời tự động 24/7',
                  'Học từ dữ liệu khách hàng',
                  'Tích hợp với Zalo OA',
                  'Dashboard quản lý hội thoại'
                ];
                break;
              case 'api-integration':
                details = [
                  'Tích hợp API bên thứ 3',
                  'Webhook tự động',
                  'Data mapping linh hoạt',
                  'Monitoring và logging'
                ];
                break;
              default:
                details = f.details || [
                  `Tính năng ${f.name}`,
                  'Tùy chỉnh kèm báo giá theo nhu cầu',
                  'Đào tạo sử dụng chi tiết',
                ];
            }

            return {
              ...f,
              icon: iconMap[f.id] || FaCogs,
              details,
              highlight: f.highlight || false,
              included: f.included || false
            };
          });
        setDynamicFeatures(extensionFeatures);
        setLastUpdated(new Date(data.timestamp).toLocaleString('vi-VN'));
        setDataSource(data.source || 'sheets');
        setError("");
        
        // Debug logging để kiểm tra duplicate
        console.log('Extension features loaded:', extensionFeatures.map(f => f.id));
        const duplicateIds = extensionFeatures
          .map(f => f.id)
          .filter((id, index, arr) => arr.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
          console.warn('Duplicate feature IDs found:', duplicateIds);
        }
      } else {
        setDynamicFeatures([]);
        setDataSource('fallback');
        setError("Không thể tải dữ liệu tính năng mở rộng từ Google Sheets");
      }
    } catch (error) {
      console.error('Error fetching extension features:', error);
      setError("Không thể tải dữ liệu tính năng mở rộng từ Google Sheets.");
      setDynamicFeatures([]);
      setDataSource('fallback');
    } finally {
      setLoading(false);
    }
  };

  const getAllFeatures = (): ServiceFeature[] => {
    const allFeatures = [...coreFeatures, ...dynamicFeatures]; // Kết hợp hardcoded + Google Sheets
    // Đảm bảo không có duplicate features dựa trên id
    const uniqueFeatures = allFeatures.filter((feature, index, self) => 
      index === self.findIndex(f => f.id === feature.id)
    );
    return uniqueFeatures;
  };

  const getCoreFeatures = (): ServiceFeature[] => {
    return coreFeatures; // Sử dụng hardcoded coreFeatures
  };

  const getExtensionFeatures = (): ServiceFeature[] => {
    // Đảm bảo không có duplicate features dựa trên id
    const uniqueFeatures = dynamicFeatures.filter((feature, index, self) => 
      index === self.findIndex(f => f.id === feature.id)
    );
    
    // Filter theo gói được chọn
    return uniqueFeatures.filter(feature => {
      // Gói Tăng Trưởng: Ẩn tính năng đặt hàng
      if (formData.package === 'Tăng Trưởng' && feature.id === 'dat-hang') {
        return false;
      }
      // Gói Doanh Nghiệp và các gói khác: Hiển thị tất cả
      return true;
    });
  };

  const calculateTotal = () => {
    const allFeatures = getAllFeatures();
    let uniqueSelectedFeatures = [...new Set(selectedFeatures)]; // Loại bỏ duplicate IDs
    
    // Gói Cơ Bản: Loại bỏ TẤT CẢ extension features từ selectedFeatures
    if (formData.package === 'Cơ Bản') {
      uniqueSelectedFeatures = []; // Chỉ có core features
    }
    // Gói Tăng Trưởng: Loại bỏ dat-hang
    else if (formData.package === 'Tăng Trưởng') {
      uniqueSelectedFeatures = uniqueSelectedFeatures.filter(id => id !== 'dat-hang');
    }
    
    const selectedServices = uniqueSelectedFeatures
      .map(id => allFeatures.find(f => f.id === id))
      .filter((f): f is ServiceFeature => !!f);

    // Phân chia dịch vụ có giá và báo giá riêng - loại bỏ duplicate
    const pricedServices = selectedServices
      .filter(f => !f.included && (f.price || 0) > 0)
      .filter((service, index, self) => index === self.findIndex(s => s.id === service.id));
    const customPriceServices = selectedServices
      .filter(f => !f.included && (f.price || 0) === 0)
      .filter((service, index, self) => index === self.findIndex(s => s.id === service.id));

    const monthlyTotal = basePrice + pricedServices.reduce((sum, f) => sum + (f.price || 0), 0);

    // Phí khởi tạo và ưu đãi theo gói
    let setupFee = 5000000; // Mặc định gói Doanh Nghiệp
    let yearlyDiscount = 3000000;

    switch (formData.package) {
      case 'Cơ Bản':
        setupFee = 2000000;
        yearlyDiscount = 1000000;
        break;
      case 'Tăng Trưởng':
        setupFee = 3000000;
        yearlyDiscount = 2000000;
        break;
      case 'Doanh Nghiệp':
      default:
        setupFee = 5000000;
        yearlyDiscount = 3000000;
        break;
    }

    const setupFeeWithYearlyDiscount = setupFee - yearlyDiscount;
    const annualMaintenanceFee = monthlyTotal * 12; // Tổng phí duy trì hằng năm

    return {
      monthlyTotal,
      setupFee,
      setupFeeWithYearlyDiscount,
      annualMaintenanceFee,
      yearlyDiscount,
      selectedServices,
      pricedServices,
      customPriceServices
    };
  };

  const toggleFeature = (featureId: string): void => {
    setSelectedFeatures(prev => {
      const newFeatures = prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId];
      
      // Đảm bảo không có duplicate
      return [...new Set(newFeatures)];
    });
  };



  const toggleFeatureExpansion = (featureId: string): void => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  // Handler cho mô tả chi tiết nhu cầu của tất cả features
  const handleFeatureRequirementChange = (featureId: string, requirement: string): void => {
    setFeatureRequirements(prev => ({
      ...prev,
      [featureId]: requirement
    }));


  };

  // Handler cho tính năng khác
  const handleOtherFeatureRequirementChange = (requirement: string): void => {
    setOtherFeatureRequirement(requirement);
  };

  // Functions cho popup
  const showSuccessPopup = (message: string): void => {
    setPopupConfig({
      type: 'success',
      title: 'Gửi yêu cầu thành công!',
      message: message,
      icon: FaCheckCircle
    });
    setShowPopup(true);
  };

  const showErrorPopup = (message: string): void => {
    setPopupConfig({
      type: 'error',
      title: 'Có lỗi xảy ra!',
      message: message,
      icon: FaExclamationTriangle
    });
    setShowPopup(true);
  };

  const closePopup = (): void => {
    setShowPopup(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    // Xử lý phone validation như trang dịch vụ
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9\s\-().]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Tự động chọn tính năng mặc định khi thay đổi gói
    if (name === 'package') {
      console.log(`🔄 Đang thay đổi gói từ "${formData.package}" sang "${processedValue}"`);
      
      setSelectedFeatures(prev => {
        console.log('🧹 Selected features trước khi thay đổi:', prev);
        
        // Gói Cơ Bản: Loại bỏ TẤT CẢ extension features (bao gồm cả tính năng mặc định)
        if (processedValue === 'Cơ Bản') {
          console.log('🧹 Gói Cơ Bản - Xóa TẤT CẢ extension features');
          return []; // Gói cơ bản chỉ có core features
        }
        
        // Loại bỏ TOÀN BỘ các tính năng mặc định cũ và tính năng không hợp lệ
        let newFeatures = prev.filter(id => id !== 'dat-lich' && id !== 'dat-hang');
        
        // Gói Tăng Trưởng: Loại bỏ dat-hang nếu có
        if (processedValue === 'Tăng Trưởng') {
          newFeatures = newFeatures.filter(id => id !== 'dat-hang');
          console.log('🧹 Gói Tăng Trưởng - Loại bỏ dat-hang:', newFeatures);
        }
        
        console.log('🧹 Sau khi loại bỏ tính năng không hợp lệ:', newFeatures);
        
        // Thêm tính năng mặc định theo gói (CHỈ gói Tăng Trưởng và Doanh Nghiệp)
        if (processedValue === 'Tăng Trưởng') {
          const updatedFeatures = [...newFeatures, 'dat-lich'];
          const result = [...new Set(updatedFeatures)];
          console.log('✅ Gói Tăng Trưởng - Thêm dat-lich:', result);
          return result;
        } else if (processedValue === 'Doanh Nghiệp') {
          const updatedFeatures = [...newFeatures, 'dat-hang'];
          const result = [...new Set(updatedFeatures)];
          console.log('✅ Gói Doanh Nghiệp - Thêm dat-hang:', result);
          return result;
        }
        
        // Gói khác - giữ nguyên những gì đã lọc
        const result = [...new Set(newFeatures)];
        console.log('✅ Gói khác - Giữ nguyên features đã lọc:', result);
        return result;
      });
    }

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitStatus('error');
      setErrorMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for the new API
      const coreFeatures: { [key: string]: string } = {};
      const extensionFeatures: { [key: string]: string } = {};

      // Collect core feature requirements
      getCoreFeatures().forEach(feature => {
        if (featureRequirements[feature.id]) {
          coreFeatures[feature.name] = featureRequirements[feature.id];
        }
      });

      // Collect extension feature requirements
      getExtensionFeatures()
        .filter(f => selectedFeatures.includes(f.id))
        .forEach(feature => {
          if (featureRequirements[feature.id]) {
            extensionFeatures[feature.name] = featureRequirements[feature.id];
          }
        });

      // Sử dụng API consultation như trước đây nhưng với dữ liệu mở rộng
      const { monthlyTotal, setupFee, setupFeeWithYearlyDiscount, annualMaintenanceFee, yearlyDiscount, pricedServices, customPriceServices } = calculateTotal();

      const requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        package: formData.package, // Sử dụng gói được chọn thực tế
        recaptchaToken: '', // TODO: Implement reCAPTCHA

        // Thêm thông tin chi tiết cho email
        company: formData.company || '',
        message: `
📋 YÊU CẦU TÍNH PHÍ DỊCH VỤ CHI TIẾT

📦 GÓI DỊCH VỤ QUAN TÂM: ${formData.package}

🎯 TÍNH NĂNG CỐT LỚI:
${Object.entries(coreFeatures).map(([feature, req]) => `• ${feature}: ${req}`).join('\n')}

🚀 TÍNH NĂNG MỞ RỘNG:
${Object.entries(extensionFeatures).map(([feature, req]) => `• ${feature}: ${req}`).join('\n')}

${otherFeatureRequirement ? `✨ TÍNH NĂNG KHÁC:\n${otherFeatureRequirement}` : ''}

💰 TỔNG CHI PHÍ DỰ KIẾN (GÓI ${formData.package.toUpperCase()}):
📦 Gói cơ bản: ${basePrice.toLocaleString('vi-VN')} VNĐ/tháng
${pricedServices.map(service => `• ${service.name}: +${service.price.toLocaleString('vi-VN')} VNĐ`).join('\n')}
${customPriceServices.map(service => `• ${service.name}: Báo giá riêng`).join('\n')}

💵 Phí hàng tháng: ${monthlyTotal.toLocaleString('vi-VN')} VNĐ
🏗️ Phí khởi tạo (1 lần): ${setupFee.toLocaleString('vi-VN')} VNĐ
📊 Tổng phí duy trì dự kiến hằng năm: ${annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ${customPriceServices.length > 0 ? ' + Phí tính năng báo giá riêng' : ''}

🎉 ƯU ĐÃI ĐĂNG KÝ NĂM (GÓI ${formData.package.toUpperCase()}):
• Phí khởi tạo thường: ${setupFee.toLocaleString('vi-VN')} VNĐ
• Giảm giá khi đăng ký năm: -${yearlyDiscount.toLocaleString('vi-VN')} VNĐ
• Phí khởi tạo ưu đãi: ${setupFeeWithYearlyDiscount.toLocaleString('vi-VN')} VNĐ

---
Gửi từ: Trang tính phí dịch vụ
Thời gian: ${new Date().toLocaleString('vi-VN')}
        `.trim()
      };

      console.log('Sending service pricing request via consultation API:', {
        name: requestData.name,
        phone: requestData.phone,
        email: requestData.email,
        package: requestData.package
      });

      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setLastSubmittedData(formData);
        setFormData({
          name: '',
          phone: '',
          email: '',
          package: 'Doanh Nghiệp',
          company: '',
          message: ''
        });
        setFeatureRequirements({});
        setOtherFeatureRequirement('');
        fireSuccessConfetti();

        // Show success popup
        showSuccessPopup(responseData.message || 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ và báo giá chi tiết trong vòng 24 giờ.');

        // Auto hide success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setLastSubmittedData(null);
        }, 10000);
      } else {
        throw new Error(responseData.error || 'Có lỗi xảy ra khi gửi yêu cầu');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus('error');

      const errorMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại sau';
      showErrorPopup(errorMsg);

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

  // Tự động chọn tính năng mặc định khi component khởi tạo - CHỈ một lần
  useEffect(() => {
    // Chỉ chạy logic này một lần khi component mount
    if (formData.package === 'Tăng Trưởng' && !selectedFeatures.includes('dat-lich')) {
      setSelectedFeatures(prev => [...new Set([...prev, 'dat-lich'])]);
    } else if (formData.package === 'Doanh Nghiệp' && !selectedFeatures.includes('dat-hang')) {
      setSelectedFeatures(prev => [...new Set([...prev, 'dat-hang'])]);
    }
    // Gói "Cơ Bản" không có tính năng mặc định - không cần xử lý gì
  }, [formData.package]); // Bỏ selectedFeatures để tránh infinite loop

  const { monthlyTotal, setupFee, setupFeeWithYearlyDiscount, annualMaintenanceFee, yearlyDiscount, pricedServices, customPriceServices } = calculateTotal();
  const coreFeaturesList = getCoreFeatures();
  const extensionFeatures = getExtensionFeatures();

  // Debug logging để kiểm tra duplicate trong sidebar
  React.useEffect(() => {
    const pricedIds = pricedServices.map(s => s.id);
    const customIds = customPriceServices.map(s => s.id);
    const allIds = [...pricedIds, ...customIds];
    const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);
    
    if (duplicates.length > 0) {
      console.error('Duplicate service IDs in sidebar:', duplicates);
      console.log('Priced services:', pricedServices);
      console.log('Custom price services:', customPriceServices);
      console.log('Selected features:', selectedFeatures);
    }
  }, [pricedServices, customPriceServices, selectedFeatures]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/dich-vu"
                className="p-2 hover:bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Bảng tính phí dịch vụ chi tiết
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Tùy chỉnh theo nhu cầu
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => fetchPricingData(true)}
                disabled={loading}
                className="p-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors disabled:opacity-50"
              >
                <FaSync className={`w-4 h-4 text-blue-600 dark:text-blue-400 ${loading ? 'animate-spin' : ''}`} />
              </button>

            </div>
          </div>

          {/* Progress Stepper */}
          <div className="mt-3 mx-2">
            <div className="flex items-center justify-between mb-2">
              {/* Step 1 */}
              <div className="flex items-center space-x-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${activeTab === 'core'
                    ? 'bg-blue-600 text-white'
                    : (activeTab === 'extension' || activeTab === 'consultation') ? 'bg-green-50 dark:bg-green-900/200 text-white' : 'bg-gray-300 text-gray-500 dark:text-gray-400'
                  }`}>
                  1
                </div>
                <span className={`text-xs font-medium ${activeTab === 'core' ? 'text-blue-600 dark:text-blue-400' : (activeTab === 'extension' || activeTab === 'consultation') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  Cốt lõi
                </span>
              </div>

              {/* Line 1 */}
              <div className={`flex-1 h-0.5 mx-1 ${activeTab === 'extension' || activeTab === 'consultation' ? 'bg-green-50 dark:bg-green-900/200' : 'bg-gray-300'
                }`}></div>

              {/* Step 2 */}
              <div className="flex items-center space-x-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${activeTab === 'extension'
                    ? 'bg-blue-600 text-white'
                    : activeTab === 'consultation' ? 'bg-green-50 dark:bg-green-900/200 text-white' : 'bg-gray-300 text-gray-500 dark:text-gray-400'
                  }`}>
                  2
                </div>
                <span className={`text-xs font-medium ${activeTab === 'extension' ? 'text-blue-600 dark:text-blue-400' : activeTab === 'consultation' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  Mở rộng
                </span>
              </div>

              {/* Line 2 */}
              <div className={`flex-1 h-0.5 mx-1 ${activeTab === 'consultation' ? 'bg-green-50 dark:bg-green-900/200' : 'bg-gray-300'
                }`}></div>

              {/* Step 3 */}
              <div className="flex items-center space-x-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${activeTab === 'consultation'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 dark:text-gray-400'
                  }`}>
                  3
                </div>
                <span className={`text-xs font-medium ${activeTab === 'consultation' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  Tư vấn
                </span>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <FaExclamationTriangle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Có lỗi xảy ra</h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}



              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Đang tải...</span>
                </div>
              ) : (
                <>
                  {/* Step Content */}
                  {activeTab === 'core' && (
                    /* Bước 1: Tính năng cốt lõi */
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1</span>
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              🔹 Tính năng cốt lõi
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Đã bao gồm trong gói cơ bản 200.000 VNĐ/tháng (Nhấn để xem chi tiết)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Package Selection */}
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          📦 Chọn gói dịch vụ quan tâm:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['Cơ Bản', 'Tăng Trưởng', 'Doanh Nghiệp'].map((pkg) => (
                            <button
                              key={pkg}
                              onClick={() => setFormData(prev => ({ ...prev, package: pkg }))}
                              className={`p-3 rounded-lg border-2 transition-all text-left ${formData.package === pkg
                                  ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500'
                                }`}
                            >
                              <div className="font-medium text-sm">{pkg}</div>
                              <div className="text-xs mt-1 opacity-75 space-y-1">
                                <div>
                                  {pkg === 'Cơ Bản' && 'Phí khởi tạo: 2.000.000 VNĐ'}
                                  {pkg === 'Tăng Trưởng' && 'Phí khởi tạo: 3.000.000 VNĐ'}
                                  {pkg === 'Doanh Nghiệp' && 'Phí khởi tạo: 5.000.000 VNĐ'}
                                </div>
                                {pkg === 'Cơ Bản' && (
                                  <div className="text-gray-600 dark:text-gray-400">Chỉ tính năng cốt lõi</div>
                                )}
                                {pkg === 'Tăng Trưởng' && (
                                  <div className="text-blue-600 dark:text-blue-400">+ Tính năng đặt lịch</div>
                                )}
                                {pkg === 'Doanh Nghiệp' && (
                                  <div className="text-blue-600 dark:text-blue-400">+ Tính năng đặt hàng</div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                          💡 <strong>Ưu đãi đăng ký năm:</strong> Giảm {
                            formData.package === 'Cơ Bản' ? '1.000.000' :
                              formData.package === 'Tăng Trưởng' ? '2.000.000' : '3.000.000'
                          } VNĐ phí khởi tạo
                        </div>
                      </div>
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {coreFeaturesList.map((feature: ServiceFeature) => {
                          const isExpanded = expandedFeatures.has(feature.id);

                          return (
                            <div key={feature.id} className="p-4">
                              <button
                                onClick={() => toggleFeatureExpansion(feature.id)}
                                className="w-full text-left hover:bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors p-2 -m-2"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      {(() => {
                                        const IconComponent = iconMap[feature.id] || FaCheck;
                                        return <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />;
                                      })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base text-left">
                                        {feature.name}
                                      </h3>
                                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 text-left">
                                        {feature.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-4">
                                    <span className="text-xs text-green-800 dark:text-gray-400 px-2 py-1 font-medium">
                                      Bao gồm
                                    </span>
                                    {isExpanded ? (
                                      <FaChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    ) : (
                                      <FaChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    )}
                                  </div>
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="mt-4 ml-13 pl-4 border-l-2 border-green-200 dark:border-green-800 animate-in slide-in-from-top-2 duration-200">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Chi tiết tính năng:</h4>
                                  <ul className="space-y-2 mb-4">
                                    {(feature.details || []).map((detail: string, index: number) => (
                                      <li key={index} className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                        <FaCheck className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  {/* Input cho yêu cầu tùy chỉnh nếu không có giá cụ thể */}
                                  {feature.price === 0 && (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                                      <label className="block text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                                        Mô tả chi tiết nhu cầu của bạn:
                                      </label>
                                      <textarea
                                        value={featureRequirements[feature.id] || ''}
                                        onChange={(e) => handleFeatureRequirementChange(feature.id, e.target.value)}
                                        placeholder={`VD: Cần tích hợp ${feature.name} với hệ thống hiện tại...`}
                                        className="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 text-xs resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        rows={2}
                                      />
                                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                        Mô tả chi tiết giúp chúng tôi hiểu rõ nhu cầu và triển khai tốt hơn
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Bước 1/3: Tính năng cốt lõi
                          </div>
                          <button
                            onClick={() => {
                              // Không cần kiểm tra core features nữa, chuyển thẳng sang extension
                              setActiveTab('extension');
                            }}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                          >
                            <span>Tiếp theo</span>
                            <FaArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'extension' && (
                    /* Bước 2: Tính năng mở rộng */
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">2</span>
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {formData.package === 'Cơ Bản' ? '🎯 Nhu cầu tính năng mở rộng' : '⚡ Tính năng mở rộng'}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formData.package === 'Cơ Bản' 
                                ? 'Mô tả nhu cầu để được tư vấn tính năng phù hợp'
                                : `Chọn tính năng bổ sung theo nhu cầu (${selectedFeatures.length} đã chọn)`
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {/* Thông báo đặc biệt cho gói Cơ Bản */}
                        {formData.package === 'Cơ Bản' && (
                          <div className="p-6 text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mx-4 my-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FaStore className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                              Gói Cơ Bản - Tập trung vào nền tảng
                            </h3>
                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                              Gói này bao gồm đầy đủ <strong>9 tính năng cốt lõi</strong>. 
                              Nếu cần thêm tính năng mở rộng, hãy mô tả chi tiết bên dưới để được tư vấn.
                            </p>
                            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
                              💡 <strong>Gợi ý nâng cấp:</strong> Gói Tăng Trưởng và Doanh Nghiệp có thêm nhiều tính năng mở rộng sẵn có
                            </div>
                          </div>
                        )}

                        {/* Thông báo cho gói Tăng Trưởng về tính năng đặt hàng */}
                        {formData.package === 'Tăng Trưởng' && (
                          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg mx-4 my-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaStore className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-amber-900 dark:text-amber-100 text-sm mb-1">
                                  💡 Tính năng đặt hàng
                                </h4>
                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                  Tính năng đặt hàng chỉ có sẵn trong gói <strong>Doanh Nghiệp</strong>. 
                                  Nếu bạn quan tâm, hãy mô tả trong phần &ldquo;Tính năng khác&rdquo; bên dưới.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Chỉ hiển thị extension features cho gói Tăng Trưởng và Doanh Nghiệp */}
                        {(() => {
                          console.log('🔍 Checking package for extension features:', formData.package);
                          console.log('🔍 Should show extension features:', formData.package !== 'Cơ Bản');
                          return formData.package !== 'Cơ Bản';
                        })() && (
                          <>
                            {extensionFeatures.length === 0 ? (
                              <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <FaSync className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                  Đang tải tính năng mở rộng
                                </h3>

                                <button
                                  onClick={() => fetchPricingData(true)}
                                  disabled={loading}
                                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                  <FaSync className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                  Tải lại
                                </button>
                              </div>
                            ) : (
                              extensionFeatures
                                .filter(feature => {
                                  // Gói Tăng Trưởng: Ẩn tính năng đặt hàng
                                  if (formData.package === 'Tăng Trưởng' && feature.id === 'dat-hang') {
                                    return false;
                                  }
                                  // Gói Doanh Nghiệp: Hiển thị tất cả
                                  return true;
                                })
                                .map((feature) => {
                            const isSelected = selectedFeatures.includes(feature.id);
                            const hasCustomPrice = feature.price === 0; // Không có giá cụ thể

                            return (
                              <div key={feature.id} className="p-4 hover:bg-gray-50 dark:bg-gray-900 transition-colors">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                                      ? 'bg-blue-100 text-blue-600 dark:text-blue-400'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                    }`}>
                                    {(() => {
                                      const IconComponent = iconMap[feature.id] || FaCogs;
                                      return <IconComponent className="w-5 h-5" />;
                                    })()}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                          {feature.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                          {feature.description}
                                        </p>

                                        {isSelected && (
                                          <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                                            <ul className="space-y-1 mb-3">
                                              {(feature.details || []).map((detail: string, index: number) => (
                                                <li key={index} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                                                  <FaCheck className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                  <span>{detail}</span>
                                                </li>
                                              ))}
                                            </ul>

                                            {/* Input cho yêu cầu tùy chỉnh nếu không có giá cụ thể */}
                                            {hasCustomPrice && (
                                              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                                                <label className="block text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                                                  💡 Mô tả chi tiết nhu cầu của bạn:
                                                </label>
                                                <textarea
                                                  value={featureRequirements[feature.id] || ''}
                                                  onChange={(e) => handleFeatureRequirementChange(feature.id, e.target.value)}
                                                  placeholder={`VD: Cần tích hợp ${feature.name} với hệ thống hiện tại...`}
                                                  className="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 text-xs resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                  rows={2}
                                                />
                                                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                                  Thông tin chi tiết này giúp chúng tôi hiểu rõ để thiết kế và báo giá chính xác
                                                </p>
                                              </div>
                                            )}

                                            {/* Input cho features có giá cụ thể - bắt buộc */}
                                            {!hasCustomPrice && (
                                              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                                <label className="block text-xs font-medium text-blue-800 dark:text-blue-200 mb-2">
                                                  💡 Mô tả chi tiết nhu cầu của bạn (bắt buộc):
                                                </label>
                                                <textarea
                                                  value={featureRequirements[feature.id] || ''}
                                                  onChange={(e) => handleFeatureRequirementChange(feature.id, e.target.value)}
                                                  placeholder={`VD: Cần ${feature.name} để...`}
                                                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-xs resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                  rows={2}
                                                  required
                                                />
                                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                                  Mô tả chi tiết giúp chúng tôi hiểu rõ nhu cầu và triển khai tốt hơn
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      <div className="ml-4 text-right">
                                        <div className="text-right mb-2">
                                          {hasCustomPrice ? (
                                            <div className="font-bold text-orange-600 dark:text-orange-400 text-sm">
                                              Tùy chỉnh
                                            </div>
                                          ) : (
                                            <>
                                              <div className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                                +{feature.price.toLocaleString('vi-VN')}
                                              </div>
                                              <div className="text-xs text-gray-500 dark:text-gray-400">VNĐ/tháng</div>
                                            </>
                                          )}
                                        </div>
                                        <button
                                          onClick={() => toggleFeature(feature.id)}
                                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all transform hover:scale-105 ${isSelected
                                              ? hasCustomPrice
                                                ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                            }`}
                                        >
                                          {isSelected ? (
                                            <>
                                              <FaCheck className="inline w-3 h-3 mr-1" />
                                              {hasCustomPrice ? 'Quan tâm' : 'Đã chọn'}
                                            </>
                                          ) : (
                                            hasCustomPrice ? 'Quan tâm' : 'Chọn'
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                          </>
                        )}
                      </div>

                      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/20">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaCogs className="w-5 h-5 text-purple-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-2">
                              🎯 Tính năng khác
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {formData.package === 'Cơ Bản' 
                                ? "Mô tả chi tiết nhu cầu tính năng mở rộng cho gói của bạn"
                                : "Mô tả chi tiết nhu cầu ngoài những tính năng mở rộng hiện có"
                              }
                            </p>

                            <div className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                              <label className="block text-xs font-medium text-purple-800 dark:text-purple-200 mb-2">
                                💡 Mô tả chi tiết tính năng bạn cần:
                              </label>
                              <textarea
                                value={otherFeatureRequirement}
                                onChange={(e) => handleOtherFeatureRequirementChange(e.target.value)}
                                placeholder="VD: Cần tích hợp với hệ thống quản lý kho, API thanh toán đặc biệt, báo cáo tùy chỉnh..."
                                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-xs resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                rows={3}
                              />
                              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                                Mô tả chi tiết giúp chúng tôi hiểu rõ nhu cầu và thiết kế tốt hơn
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => setActiveTab('core')}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-100 dark:bg-gray-700 transition-colors font-medium"
                          >
                            <FaArrowLeft className="w-4 h-4" />
                            <span>Quay lại</span>
                          </button>

                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Bước 2/3: Tính năng mở rộng
                          </div>

                          <button
                            onClick={() => {
                              // Gói Cơ Bản: Không cần kiểm tra extension features
                              if (formData.package === 'Cơ Bản') {
                                setActiveTab('consultation');
                                return;
                              }

                              // Kiểm tra mô tả chi tiết nhu cầu bắt buộc cho extension features có giá
                              // Chỉ kiểm tra những tính năng được hiển thị cho gói hiện tại
                              const visibleExtensionFeatures = getExtensionFeatures(); // Đã được filter theo gói
                              const selectedExtensionFeatures = visibleExtensionFeatures.filter(f => selectedFeatures.includes(f.id));
                              const missingExtensionDescriptions = selectedExtensionFeatures.filter(f =>
                                f.price > 0 && (!featureRequirements[f.id] || featureRequirements[f.id].trim() === '')
                              );

                              if (missingExtensionDescriptions.length > 0) {
                                setValidationModalMessage(missingExtensionDescriptions.map(f => f.name));
                                setShowValidationModal(true);
                                return;
                              }

                              setActiveTab('consultation');
                            }}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                          >
                            <span>Tiếp theo</span>
                            <FaArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'consultation' && (
                    /* Bước 3: Đăng ký tư vấn và FAQ */
                    <div className="space-y-6">
                      {/* Form đăng ký tư vấn */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">3</span>
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                📞 Đăng ký tư vấn miễn phí
                              </h2>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Liên hệ để được tư vấn chi tiết và báo giá chính xác
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          {/* Thông tin đã chọn */}
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                            <h3 className="font-medium text-blue-900 mb-2">📋 Thông tin gói đã chọn:</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Gói cơ bản:</span>
                                <span className="font-medium">200.000 VNĐ/tháng</span>
                              </div>
                              <div className="text-xs text-blue-700 dark:text-blue-300">
                                ✓ Bao gồm {coreFeaturesList.length} tính năng cốt lõi
                                {formData.package === 'Cơ Bản' && (
                                  <span className="block text-gray-600 dark:text-gray-400 mt-1">• Gói này chỉ bao gồm tính năng cốt lõi</span>
                                )}                  
                              </div>
                              {(() => {
                                // Filter selectedFeatures theo gói như trong calculateTotal()
                                let filteredSelectedFeatures = [...new Set(selectedFeatures)];
                                
                                if (formData.package === 'Cơ Bản') {
                                  filteredSelectedFeatures = []; // Gói cơ bản không có extension features
                                } else if (formData.package === 'Tăng Trưởng') {
                                  filteredSelectedFeatures = filteredSelectedFeatures.filter(id => id !== 'dat-hang');
                                }
                                
                                const displaySelectedFeatures = extensionFeatures.filter(f => filteredSelectedFeatures.includes(f.id));
                                
                                return displaySelectedFeatures.length > 0 && (
                                  <>
                                    <div className="border-t border-blue-200 dark:border-blue-800 pt-2">
                                      <div className="font-medium mb-2">Tính năng mở rộng đã chọn:</div>
                                      {displaySelectedFeatures.map(feature => (
                                        <div key={feature.id} className="mb-2">
                                          <div className="flex justify-between text-xs">
                                            <span>• {feature.name}</span>
                                            <span>
                                              {feature.price > 0
                                                ? `+${feature.price.toLocaleString('vi-VN')} VNĐ`
                                                : 'Báo giá riêng'
                                              }
                                            </span>
                                          </div>
                                          {/* Hiển thị yêu cầu tùy chỉnh nếu có */}
                                          {featureRequirements[feature.id] && (
                                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 pl-2 border-l-2 border-blue-300 dark:border-blue-600 italic">
                                              &ldquo;{featureRequirements[feature.id]}&rdquo;
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="border-t border-blue-200 dark:border-blue-800 pt-2 flex justify-between font-medium">
                                      <span>Tổng phí duy trì hằng năm:</span>
                                      <span className="text-blue-700 dark:text-blue-300">
                                        {displaySelectedFeatures.some(f => f.price === 0)
                                          ? `${calculateTotal().annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ + báo giá riêng`
                                          : `${calculateTotal().annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ`
                                        }
                                      </span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>

                          {/* Ưu đãi gói */}
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
                            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 text-sm">🎉 Ưu đãi gói {formData.package}: Giảm ngay {yearlyDiscount.toLocaleString('vi-VN')} VNĐ</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">Phí khởi tạo gói {formData.package}:</span>
                                  <span className="font-medium line-through text-gray-500 dark:text-gray-400">{setupFee.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <div className="flex justify-between font-bold text-green-600 dark:text-green-400">
                                  <span>Phí khởi tạo ưu đãi:</span>
                                  <span>{setupFeeWithYearlyDiscount.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">Phí hàng tháng:</span>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">{monthlyTotal.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <div className="flex justify-between font-bold text-green-600 dark:text-green-400 text-sm">
                                  <span>Tổng phí duy trì hằng năm:</span>
                                  <span>{annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                              </div>
                            </div>
                            {customPriceServices.length > 0 && (
                              <div className="mt-3 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 border border-orange-200 dark:border-orange-800">
                                💡 <strong>Lưu ý:</strong> Phí trên chưa bao gồm các tính năng báo giá riêng đã chọn
                              </div>
                            )}
                            <div className="mt-3 text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                              🎯 <strong>Ưu đãi đặc biệt:</strong> Đăng ký thanh toán 1 năm để nhận ưu đãi phí khởi tạo
                            </div>
                          </div>

                          {/* Thông báo thành công - hiển thị thay thế form */}
                          {submitStatus === 'success' ? (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 dark:border-green-800 rounded-lg p-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                              <button
                                onClick={() => {
                                  setSubmitStatus('idle');
                                  setLastSubmittedData(null);
                                }}
                                className="absolute top-2 right-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:text-green-200 transition-colors"
                                title="Đóng thông báo"
                              >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <div className="flex items-center justify-center mb-3">
                                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/200 rounded-full flex items-center justify-center animate-bounce">
                                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                </div>
                              </div>
                              <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                                🎉 Đăng ký thành công!
                              </h3>
                              <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed mb-3">
                                Cảm ơn <strong>{lastSubmittedData?.name || 'bạn'}</strong> đã quan tâm đến dịch vụ!<br />
                                Chúng tôi đã gửi thông tin chi tiết đến email <strong>{lastSubmittedData?.email}</strong><br />
                                và sẽ liên hệ qua số <strong>{lastSubmittedData?.phone}</strong> trong 24h tới.
                              </p>
                              <div className="bg-green-100 rounded-lg p-3 text-xs text-green-700 dark:text-green-300">
                                📧 Email xác nhận đã được gửi với thông tin:
                                <br />• Chi tiết gói {lastSubmittedData?.package}
                                <br />• Báo giá chính xác: {calculateTotal().annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ
                                <br />• Hướng dẫn triển khai
                              </div>
                              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-green-600 dark:text-green-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Thông báo tự động đóng sau 15 giây</span>
                              </div>
                            </div>
                          ) : (
                            /* Form đăng ký chi tiết */
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Họ và tên <span className="text-red-500 dark:text-red-400">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Nhập họ tên của bạn"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Số điện thoại <span className="text-red-500 dark:text-red-400">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="0987654321"
                                    pattern="^(0[235789])[0-9]{8}$"
                                    title="Số điện thoại 10 chữ số, bắt đầu 02,03,05,07,08,09"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Email <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                  placeholder="email@company.com"
                                  required
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  📧 Thông tin chi tiết sẽ được gửi đến email này
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Gói dịch vụ quan tâm
                                  </label>
                                  <div className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 flex items-center justify-between">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">{formData.package}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                      Đã chọn ở bước 1
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    💡 Gói này đã được chọn ở bước 1 và không thể thay đổi
                                  </p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tên công ty/tổ chức
                                  </label>
                                  <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Tên công ty (tùy chọn)"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Nhu cầu cụ thể (tùy chọn)
                                </label>
                                <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  rows={3}
                                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                  placeholder="Mô tả chi tiết nhu cầu của bạn để chúng tôi tư vấn tốt hơn..."
                                ></textarea>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  💡 Thông tin này giúp chúng tôi tư vấn chính xác hơn
                                </p>
                              </div>

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 text-sm"
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang gửi thông tin...
                                  </span>
                                ) : (
                                  '📧 Gửi thông tin & Nhận báo giá qua Email'
                                )}
                              </button>

                              {/* Thông báo lỗi */}
                              {submitStatus === 'error' && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6 text-red-500 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-red-800 dark:text-red-200 font-medium">Có lỗi xảy ra</span>
                                  </div>
                                  <p className="text-red-700 dark:text-red-300 text-sm">
                                    {errorMessage || 'Vui lòng thử lại sau.'}
                                  </p>
                                </div>
                              )}
                            </form>
                          )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => setActiveTab('extension')}
                              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-100 dark:bg-gray-700 transition-colors font-medium"
                            >
                              <FaArrowLeft className="w-4 h-4" />
                              <span>Quay lại</span>
                            </button>

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Bước 3/3: Đăng ký tư vấn
                            </div>

                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                              ✓ Hoàn thành
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar - Pricing Only */}
          <div className="lg:w-80 space-y-6">
            {/* Bảng tính phí - Ẩn khi ở tab consultation */}
            {activeTab !== 'consultation' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  💰 Tổng chi phí
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Gói đang chọn: <span className="font-medium text-blue-600 dark:text-blue-400">{formData.package}</span>
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Gói cơ bản:</span>
                  <span className="font-medium">{basePrice.toLocaleString('vi-VN')} VNĐ/tháng</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  ✓ Bao gồm {coreFeaturesList.length} tính năng cốt lõi
                  {formData.package === 'Cơ Bản' && (
                    <span className="block text-gray-600 dark:text-gray-400">• Chỉ tính năng cốt lõi</span>
                  )}
                  {formData.package === 'Tăng Trưởng' && (
                    <span className="block text-blue-600 dark:text-blue-400">+ Tính năng đặt lịch</span>
                  )}
                  {formData.package === 'Doanh Nghiệp' && (
                    <span className="block text-blue-600 dark:text-blue-400">+ Tính năng đặt hàng</span>
                  )}
                </div>

                {/* Tính năng có giá cụ thể */}
                {pricedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{service.name}:</span>
                    <span className="font-medium">+{(service.price || 0).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                ))}

                {/* Tính năng báo giá riêng */}
                {customPriceServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{service.name}:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">Báo giá riêng</span>
                  </div>
                ))}

                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Phí hàng tháng:</span>
                    <span className="text-blue-600 dark:text-blue-400">{monthlyTotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-green-600 dark:text-green-400">
                    <span>Tổng phí duy trì dự kiến hằng năm:</span>
                    <span>{annualMaintenanceFee.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  {customPriceServices.length > 0 && (
                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      + Phí tính năng báo giá riêng
                    </div>
                  )}
                </div>

                {/* Ưu đãi đăng ký năm */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-3 mt-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 text-sm">🎉 Ưu đãi gói {formData.package}: Giảm ngay {yearlyDiscount.toLocaleString('vi-VN')} VNĐ</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Phí khởi tạo gói {formData.package}:</span>
                      <span className="font-medium line-through text-gray-500 dark:text-gray-400">{setupFee.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-600 dark:text-green-400 text-lg">
                      <span>Phí khởi tạo ưu đãi:</span>
                      <span>{setupFeeWithYearlyDiscount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}

              </div>
            </div>
            )}


          </div>
        </div>
      </div>

      {/* Custom Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Thông tin chưa đầy đủ</h3>
                  <p className="text-orange-100 text-sm">Vui lòng hoàn thành các trường bắt buộc</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                Bạn cần điền <strong>mô tả chi tiết nhu cầu</strong> cho các tính năng sau:
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                <ul className="space-y-2">
                  {validationModalMessage.map((featureName, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">{featureName}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-blue-800 dark:text-blue-200 text-xs">
                  💡 <strong>Lưu ý:</strong> Mô tả chi tiết giúp chúng tôi hiểu rõ nhu cầu và tư vấn chính xác hơn cho bạn.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-b-2xl flex justify-end">
              <button
                onClick={() => {
                  setShowValidationModal(false);
                  setValidationModalMessage([]);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Tôi hiểu rồi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className={`text-white p-6 rounded-t-2xl ${popupConfig.type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 bg-opacity-20 rounded-full flex items-center justify-center">
                  {popupConfig.icon && <popupConfig.icon className="w-8 h-8 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{popupConfig.title}</h3>
                  <p className={`text-sm mt-1 ${popupConfig.type === 'success' ? 'text-green-100' : 'text-red-100'
                    }`}>
                    {popupConfig.type === 'success'
                      ? 'Yêu cầu của bạn đã được gửi thành công!'
                      : 'Đã xảy ra lỗi trong quá trình xử lý!'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className={`p-4 rounded-lg border-l-4 ${popupConfig.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}>
                <p className={`text-sm leading-relaxed ${popupConfig.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                  {popupConfig.message}
                </p>
              </div>

              {popupConfig.type === 'success' && (
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📞 Bước tiếp theo:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Chúng tôi sẽ liên hệ trong vòng 24 giờ</li>
                    <li>• Tư vấn chi tiết về giải pháp phù hợp</li>
                    <li>• Báo giá chính xác theo nhu cầu</li>
                    <li>• Hỗ trợ triển khai nhanh chóng</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-b-2xl flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${popupConfig.type === 'success'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  }`}
              >
                {popupConfig.type === 'success' ? '🎉 Tuyệt vời!' : '🔄 Thử lại'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 