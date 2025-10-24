"use client";

import React, { useEffect, useRef, useCallback } from 'react';

// Chart.js import for client-side rendering
declare global {
  interface Window {
    Chart: {
      new(ctx: HTMLCanvasElement, config: unknown): unknown;
    };
  }
}

export default function GiftyIDPage() {
  const digitalEconomyRef = useRef<HTMLCanvasElement>(null);
  const nationalEcommerceRef = useRef<HTMLCanvasElement>(null);
  const purchaseFactorsRef = useRef<HTMLCanvasElement>(null);
  const youthChannelsRef = useRef<HTMLCanvasElement>(null);
  const youthPaymentRef = useRef<HTMLCanvasElement>(null);
  const youthGenderRef = useRef<HTMLCanvasElement>(null);
  const youthAgeRef = useRef<HTMLCanvasElement>(null);
  const platformShareRef = useRef<HTMLCanvasElement>(null);

  const initializeCharts = useCallback(() => {
    if (!window.Chart) return;

    const commonChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            font: { size: 10 }
          }
        }
      }
    };

    const chartColors = {
      purple: '#3D2B56',
      blue: '#1E90FF',
      pink: '#FF69B4',
      yellow: '#FFDA63',
      green: '#90EE90',
      lightGray: '#D1D5DB'
    };

    // Digital Economy Chart
    if (digitalEconomyRef.current) {
      new window.Chart(digitalEconomyRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Kinh tế số hiện tại (17.5%)', 'Mục tiêu còn lại (2.5%)', 'Các ngành khác (80%)'],
          datasets: [{
            data: [17.5, 2.5, 80],
            backgroundColor: [chartColors.blue, chartColors.yellow, chartColors.lightGray],
          }]
        },
        options: commonChartOptions
      });
    }

    // National E-commerce Share Chart
    if (nationalEcommerceRef.current) {
      new window.Chart(nationalEcommerceRef.current, {
        type: 'pie',
        data: {
          labels: ['TMĐT (10%)', 'Bán lẻ truyền thống (90%)'],
          datasets: [{
            data: [10, 90],
            backgroundColor: [chartColors.pink, chartColors.lightGray],
          }]
        },
        options: commonChartOptions
      });
    }

    // Purchase Decision Factors Chart
    if (purchaseFactorsRef.current) {
      new window.Chart(purchaseFactorsRef.current, {
        type: 'bar',
        data: {
          labels: ['Niềm tin', 'Giá cả', 'Chất lượng', 'Dễ sử dụng', 'Tính hữu ích'],
          datasets: [{
            label: 'Mức độ ảnh hưởng',
            data: [0.306, 0.243, 0.208, 0.171, 0.116],
            backgroundColor: [chartColors.blue, chartColors.pink, chartColors.green, chartColors.yellow, chartColors.purple],
          }]
        },
        options: {
          ...commonChartOptions,
          indexAxis: 'y' as const,
          plugins: { ...commonChartOptions.plugins, legend: { display: false } }
        }
      });
    }

    // Youth Shopping Channels Chart
    if (youthChannelsRef.current) {
      new window.Chart(youthChannelsRef.current, {
        type: 'bar',
        data: {
          labels: ['Sàn TMĐT', 'Mạng xã hội', 'Website nhãn hàng'],
          datasets: [{
            data: [89.9, 47.4, 21.4],
            backgroundColor: [chartColors.blue, chartColors.pink, chartColors.yellow],
          }]
        },
        options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { display: false } } }
      });
    }

    // Youth Payment Methods Chart
    if (youthPaymentRef.current) {
      new window.Chart(youthPaymentRef.current, {
        type: 'bar',
        data: {
          labels: ['COD', 'Ví điện tử', 'Chuyển khoản'],
          datasets: [{
            data: [73.5, 44.6, 27.2],
            backgroundColor: [chartColors.green, chartColors.purple, chartColors.blue],
          }]
        },
        options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { display: false } } }
      });
    }

    // Youth Gender Chart
    if (youthGenderRef.current) {
      new window.Chart(youthGenderRef.current, {
        type: 'pie',
        data: {
          labels: ['Nữ (60%)', 'Nam (40%)'],
          datasets: [{
            data: [60, 40],
            backgroundColor: [chartColors.pink, chartColors.blue],
          }]
        },
        options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { position: 'bottom' as const } } }
      });
    }

    // Youth Age Group Chart
    if (youthAgeRef.current) {
      new window.Chart(youthAgeRef.current, {
        type: 'pie',
        data: {
          labels: ['25-34 (49%)', '18-24 (28%)', 'Khác (23%)'],
          datasets: [{
            data: [49, 28, 23],
            backgroundColor: [chartColors.yellow, chartColors.green, chartColors.lightGray],
          }]
        },
        options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { position: 'bottom' as const } } }
      });
    }

    // Platform Market Share Chart
    if (platformShareRef.current) {
      new window.Chart(platformShareRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Shopee (72%)', 'TikTok Shop (22%)', 'Lazada (6%)', 'Khác (<1%)'],
          datasets: [{
            data: [72, 22, 6, 1],
            backgroundColor: [chartColors.blue, chartColors.purple, chartColors.pink, chartColors.lightGray],
          }]
        },
        options: commonChartOptions
      });
    }
  }, [digitalEconomyRef, nationalEcommerceRef, purchaseFactorsRef, youthChannelsRef, youthPaymentRef, youthGenderRef, youthAgeRef, platformShareRef]);

  useEffect(() => {
    // Load Chart.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
    script.onload = () => {
      initializeCharts();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [initializeCharts]);

  return (
    <div className="bg-adaptive-light min-h-screen font-inter text-vietnamese"
      style={{
        backgroundColor: '#F4F6F8',
        color: '#333333'
      }}>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#3D2B56] to-[#1E90FF] text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Thị trường TMĐT Hải Dương, Gifty Tech &amp; Dự án PostGifty</h1>
        <p className="text-xl">Xu hướng, Phân tích, và Giới thiệu Giải pháp Công nghệ</p>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* Market Context Section */}
        <section id="market-context" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            I. Bối Cảnh Thị Trường TMĐT Hải Dương
          </h2>
          <p className="text-left mb-8 text-lg text-gray-700">
            Hải Dương đang chứng kiến sự tăng trưởng kinh tế mạnh mẽ, tạo đà cho thương mại điện tử phát triển.
            Tỉnh đặt mục tiêu kinh tế số chiếm 20% GRDP vào năm 2025, hiện tại (2023) ước đạt 17,5%.
            Nông nghiệp số là một điểm sáng với hơn 150.100 hộ sản xuất tham gia TMĐT.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3D2B56' }}>
                Tổng Bán Lẻ Hàng Hóa &amp; Dịch Vụ
              </h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#1E90FF' }}>
                101,934 <span className="text-2xl">tỷ VNĐ</span>
              </p>
              <p className="text-sm" style={{ color: '#3D2B56' }}>
                Năm 2024, tăng 14,2% so với 2023
              </p>
              <p className="text-sm text-gray-600 mt-2">
                4 tháng đầu năm 2025: 37,370 tỷ VNĐ (tăng 17,2%)
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3D2B56' }}>
                Giá Trị Nhập Khẩu
              </h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#1E90FF' }}>
                3,138 <span className="text-2xl">triệu USD</span>
              </p>
              <p className="text-sm" style={{ color: '#3D2B56' }}>
                4 tháng đầu năm 2025, tăng 27,7%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3D2B56' }}>
                Doanh Thu TMĐT Hải Dương
              </h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#1E90FF' }}>
                4,500 <span className="text-2xl">tỷ VNĐ</span>
              </p>
              <p className="text-sm" style={{ color: '#3D2B56' }}>
                Ước tính 11 tháng năm 2024
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Cho thấy dư địa phát triển lớn so với tổng mức bán lẻ.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: '#3D2B56' }}>
                Chuyển Đổi Số &amp; Kinh Tế Số
              </h3>
              <p className="text-gray-700 mb-4">
                Hải Dương đặt mục tiêu kinh tế số chiếm 20% GRDP vào năm 2025. Năm 2023, tỷ trọng này ước đạt 17,5%.
              </p>
              <div className="h-64 md:h-72">
                <canvas ref={digitalEconomyRef}></canvas>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Biểu đồ thể hiện tỷ trọng kinh tế số hiện tại và mục tiêu của Hải Dương.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: '#3D2B56' }}>
                Nông Nghiệp Số Phát Triển
              </h3>
              <p className="text-gray-700 mb-4">
                Ứng dụng công nghệ số đang thúc đẩy tiêu thụ nông sản và sản phẩm OCOP của tỉnh trên các sàn TMĐT.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">🧑‍🌾</span>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#1E90FF' }}>&gt;150,100</p>
                    <p className="text-sm" style={{ color: '#3D2B56' }}>
                      Hộ sản xuất nông nghiệp kinh doanh trên sàn TMĐT
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">🛍️</span>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#1E90FF' }}>&gt;1,160</p>
                    <p className="text-sm" style={{ color: '#3D2B56' }}>
                      Sản phẩm OCOP và nông sản Hải Dương trên các sàn
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">📈</span>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#1E90FF' }}>&gt;41,130</p>
                    <p className="text-sm" style={{ color: '#3D2B56' }}>
                      Giao dịch thành công (Xếp thứ 7 toàn quốc)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: '#3D2B56' }}>
              TMĐT Quốc Gia &amp; Hải Dương
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-2 text-center md:text-left">
                  Quy mô thị trường TMĐT bán lẻ Việt Nam năm 2023 đạt{' '}
                  <span className="text-2xl font-bold" style={{ color: '#1E90FF' }}>20,5 tỷ USD</span>{' '}
                  (tăng 25% so với 2022).
                </p>
                <p className="text-gray-700 mb-4 text-center md:text-left">
                  TMĐT chiếm khoảng <span className="font-bold">10%</span> tổng mức bán lẻ toàn quốc năm 2023.
                </p>
                <div className="h-56">
                  <canvas ref={nationalEcommerceRef}></canvas>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Tỷ trọng TMĐT trong tổng bán lẻ quốc gia (2023).
                </p>
              </div>
              <div>
                <p className="text-gray-700 mb-2 text-center md:text-left">
                  Doanh thu TMĐT Hải Dương (11 tháng 2024) ước tính{' '}
                  <span className="text-2xl font-bold" style={{ color: '#1E90FF' }}>4.500 tỷ đồng</span>.
                </p>
                <p className="text-gray-700 mb-4 text-center md:text-left">
                  Tỷ trọng TMĐT của Hải Dương còn thấp hơn mức trung bình quốc gia, cho thấy{' '}
                  <span className="font-bold">tiềm năng tăng trưởng lớn</span>.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-lg font-semibold text-blue-700">Dư địa phát triển TMĐT tại Hải Dương</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">Rất Lớn!</p>
                  <p className="text-sm text-gray-600 mt-1">So với tỷ trọng 10% của cả nước.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consumer Behavior Section */}
        <section id="consumer-behavior" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            II. Phân Tích Hành Vi Người Tiêu Dùng Trực Tuyến
          </h2>
          <p className="text-left mb-8 text-lg text-gray-700">
            Niềm tin là yếu tố hàng đầu (0.306) ảnh hưởng đến quyết định mua hàng trực tuyến tại TP. Hải Dương,
            theo sau là giá cả và chất lượng. Nông sản, thời trang, và đồ gia dụng là các mặt hàng phổ biến.
            Giới trẻ ưa chuộng sàn TMĐT và thanh toán COD.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3D2B56' }}>
                Yếu Tố Ảnh Hưởng Quyết Định Mua Hàng
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Nghiên cứu tại TP. Hải Dương (10-12/2024) cho thấy 5 yếu tố chính (sắp xếp theo mức độ ảnh hưởng giảm dần):
              </p>
              <div className="h-80 md:h-96">
                <canvas ref={purchaseFactorsRef}></canvas>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Niềm tin là yếu tố quan trọng nhất, tiếp theo là giá cả và chất lượng sản phẩm.
                Cần lưu ý sự khác biệt tiềm ẩn ở khu vực nông thôn.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3D2B56' }}>
                Hạng Mục Sản Phẩm/Dịch Vụ Phổ Biến
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-xl mr-2">🥕</span> Nông sản &amp; Thực phẩm OCOP (Vải thiều, Cà rốt)
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">👗</span> Thời trang &amp; Phụ kiện
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">💄</span> Làm đẹp &amp; Chăm sóc sức khỏe
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">📱</span> Điện tử &amp; Gia dụng
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🍔</span> Dịch vụ Ăn uống Trực tuyến (ShopeeFood mới có mặt)
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🛒</span> Hàng tiêu dùng thiết yếu &amp; Thực phẩm tươi sống
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                Nông sản địa phương và các mặt hàng thiết yếu ngày càng được ưa chuộng trực tuyến.
                Xu hướng chuộng hàng chính hãng và lo ngại về xuất xứ mập mờ là điểm cần lưu ý.
              </p>
            </div>
          </div>

        </section>

        {/* Competitive Landscape Section */}
        <section id="competitive-landscape" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            III. Phân Tích Cạnh Tranh Nền Tảng TMĐT
          </h2>
          <p className="text-left mb-8 text-lg text-gray-700">
            Shopee và TikTok Shop thống trị thị phần quốc gia. Các nền tảng địa phương như Postmart, Voso tập trung vào nông sản,
            trong khi Hdmart.vn là sàn của tỉnh cần định vị rõ hơn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3D2B56' }}>
                Thị Phần Các Sàn TMĐT Lớn (Toàn Quốc Q2/2024)
              </h3>
              <div className="h-80 md:h-96">
                <canvas ref={platformShareRef}></canvas>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Shopee và TikTok Shop đang chiếm ưu thế lớn về thị phần. Các nền tảng lớn này có lợi thế về marketing
                và logistics (kho SOC của Shopee tại Bắc Ninh, mạng lưới Lazada).
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3D2B56' }}>
                Điểm Nhấn Các Nền Tảng Địa Phương &amp; Niche
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-md">
                  <h4 className="font-semibold" style={{ color: '#90EE90' }}>Postmart.vn &amp; Voso.vn</h4>
                  <p className="text-sm text-gray-700">
                    Thế mạnh nông sản, OCOP, logistics sâu rộng đến nông thôn. &gt;108.000 hộ nông dân Hải Dương có tài khoản.
                    Tận dụng lợi thế &ldquo;phygital&rdquo;.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md">
                  <h4 className="font-semibold" style={{ color: '#FFDA63' }}>Sendo Farm</h4>
                  <p className="text-sm text-gray-700">
                    Chuyên thực phẩm tươi sống, hàng tạp hóa, hỗ trợ nông dân Hải Dương tiêu thụ nông sản (vải, dưa hấu).
                    Mô hình &ldquo;siêu thị online&rdquo;.
                  </p>
                </div>
                <div className="p-3 bg-pink-50 rounded-md">
                  <h4 className="font-semibold" style={{ color: '#FF69B4' }}>Hdmart.vn</h4>
                  <p className="text-sm text-gray-700">
                    Sàn TMĐT của tỉnh, đa ngành hàng, quảng bá sản phẩm OCOP.
                    Cần định vị độc đáo và đầu tư để cạnh tranh hiệu quả.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#3D2B56' }}>
              So Sánh Nhanh Các Nền Tảng Chính Tại Hải Dương
            </h3>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Nền tảng</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Trọng tâm</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Điểm mạnh tại Hải Dương</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-medium">Shopee</td>
                  <td className="px-4 py-2">Đa ngành, ShopeeFood</td>
                  <td className="px-4 py-2">Người dùng lớn, logistics mạnh, ShopeeFood, marketing rầm rộ.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Lazada</td>
                  <td className="px-4 py-2">Đa ngành</td>
                  <td className="px-4 py-2">Logistics quốc gia, khuyến mãi lớn, tập trung trải nghiệm.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">TikTok Shop</td>
                  <td className="px-4 py-2">Shoppertainment</td>
                  <td className="px-4 py-2">Sức hút giới trẻ, tăng trưởng nhanh, tích hợp video.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Postmart/Voso</td>
                  <td className="px-4 py-2">Nông sản, OCOP</td>
                  <td className="px-4 py-2">Logistics nông thôn, cộng đồng nông nghiệp tin dùng.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Sendo Farm</td>
                  <td className="px-4 py-2">Thực phẩm tươi sống</td>
                  <td className="px-4 py-2">Chuyên biệt nông sản, hỗ trợ nông dân, &ldquo;đi chợ hộ&rdquo;.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Hdmart.vn</td>
                  <td className="px-4 py-2">Sàn tỉnh, đa ngành</td>
                  <td className="px-4 py-2">Bảo trợ của tỉnh, quảng bá sản phẩm địa phương.</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">
              Sự chuyên môn hóa nền tảng đang nổi lên, đòi hỏi doanh nghiệp lựa chọn kênh phù hợp.
            </p>
          </div>
        </section>

        {/* Opportunities and Challenges Section */}
        <section id="opportunities-challenges" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            IV. Cơ Hội và Thách Thức
          </h2>
          <p className="text-center mb-8 text-lg text-gray-700">
            TMĐT Hải Dương có nhiều cơ hội từ sự hỗ trợ của chính quyền, tăng trưởng kinh tế, và thế mạnh nông sản,
            nhưng đối mặt thách thức về niềm tin, logistics, và cạnh tranh.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold mb-4 text-green-600">🚀 Cơ Hội</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex"><span className="mr-2">✅</span> Chính quyền hỗ trợ mạnh mẽ, mục tiêu chuyển đổi số rõ ràng.</li>
                <li className="flex"><span className="mr-2">📈</span> Thị trường bán lẻ tăng trưởng, sức mua tiêu dùng gia tăng.</li>
                <li className="flex"><span className="mr-2">🌾</span> Thế mạnh nông nghiệp, sản phẩm OCOP độc đáo.</li>
                <li className="flex"><span className="mr-2">💻</span> Hạ tầng số và trình độ dân trí số cải thiện.</li>
                <li className="flex"><span className="mr-2">👶</span> Phân khúc người tiêu dùng trẻ năng động.</li>
                <li className="flex"><span className="mr-2">💡</span> Dư địa tăng trưởng tỷ trọng TMĐT còn lớn.</li>
                <li className="flex"><span className="mr-2">🛵</span> Mở rộng các dịch vụ TMĐT mới (giao đồ ăn).</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">🚧 Thách Thức</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex"><span className="mr-2">🛡️</span> Xây dựng và duy trì niềm tin người tiêu dùng (chất lượng, nguồn gốc).</li>
                <li className="flex"><span className="mr-2">🚚</span> Logistics cho sản phẩm đa dạng, đặc biệt nông sản tươi.</li>
                <li className="flex"><span className="mr-2">⚔️</span> Cạnh tranh từ các nền tảng quốc gia thống trị.</li>
                <li className="flex"><span className="mr-2">🎓</span> Nâng cao năng lực số và kỹ năng TMĐT cho doanh nghiệp.</li>
                <li className="flex"><span className="mr-2">🏞️</span> Thu hẹp khoảng cách số giữa thành thị và nông thôn.</li>
                <li className="flex"><span className="mr-2">💵</span> Chuyển đổi thói quen thanh toán từ COD sang điện tử.</li>
                <li className="flex"><span className="mr-2">📊</span> Thiếu dữ liệu thị trường TMĐT chi tiết, địa phương hóa.</li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-6 text-gray-700">
            Cần xây dựng một &ldquo;Hệ sinh thái Số Hải Dương&rdquo; tích hợp và giải quyết vấn đề khoảng cách số để phát triển bền vững.
          </p>
        </section>

        {/* Gifty Tech Section */}
        <section id="gifty-tech" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            V. Giới thiệu Gifty Tech
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-gradient-to-r from-[#3D2B56] to-[#1E90FF] rounded-lg w-xs p-2 mx-auto mb-4">
              <span className="text-white font-bold text-lg">Nền tảng cho sự phát triển trong Kỷ Nguyên Số</span>
            </div>
            <p className="text-lg text-gray-700 mb-2 text-left">
              <strong style={{ color: '#1E90FF' }}>Tầm nhìn:</strong> Trở thành công ty công nghệ hàng đầu cung cấp các giải pháp tiện ích số thông minh,
              phục vụ cộng đồng và doanh nghiệp Địa Phương.
            </p>
            <p className="text-lg text-gray-700 text-left">
              <strong style={{ color: '#1E90FF' }}>Sứ mệnh:</strong> Kết nối, đơn giản hóa và tối ưu hóa trải nghiệm mua sắm,
              dịch vụ thông qua công nghệ, mang lại giá trị thiết thực cho người dùng và đối tác.
            </p>
          </div>
        </section>

        {/* GiftyID Project Section */}
        <section id="gifty-id" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#3D2B56' }}>
            VI. Dự án PostGifty
          </h2>
          <p className="text-left mb-4 text-lg text-gray-700">
            PostGifty là một nền tảng thương mại dịch vụ được tích hợp trên Zalo Mini App, với mục tiêu giúp các đối tác dễ dàng
            tiếp cận hàng triệu người dùng Zalo mà không cần khách hàng cài đặt thêm ứng dụng. Nền tảng tập trung vào trải nghiệm
            người dùng địa phương và kết nối cộng đồng, đặc biệt tại Hải Dương trong giai đoạn đầu.
          </p>

          {/* Differentiators */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#1E90FF' }}>Điểm khác biệt của PostGifty</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="flex items-center">
                  <span className="text-2xl mr-2">🌍</span>
                  <strong className="text-blue-700">Tập trung Chiến lược Địa phương &amp; Hợp tác sâu rộng với VNPost (Bưu điện tỉnh Hải Dương):</strong>
                </p>
                <ul className="list-disc list-inside ml-8 mt-1">
                  <li>Điểm khác biệt cốt lõi, tận dụng mạng lưới bưu cục và VHX làm hạ tầng giao nhận chính.</li>
                  <li>Chính sách vận chuyển cạnh tranh dựa trên biểu cước đã đàm phán với Bưu điện tỉnh.</li>
                  <li>Quy trình vận hành phối hợp chặt chẽ giữa PostGifty, Đối tác và Bưu điện.</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="flex items-center">
                  <span className="text-2xl mr-2">🧑‍🤝‍🧑</span>
                  <strong className="text-green-700">Mạng lưới Cộng tác viên Bưu điện Văn hóa Xã (CTV VHX):</strong>
                </p>
                <ul className="list-disc list-inside ml-8 mt-1">
                  <li>Lực lượng độc đáo, am hiểu địa bàn, có uy tín với người dân.</li>
                  <li>Vai trò: bán hàng, tư vấn, đại sứ thương hiệu, chăm sóc khách hàng, cầu nối thông tin thị trường.</li>
                  <li>Giúp Đối tác tăng độ phủ thị trường đến các khu vực khó tiếp cận.</li>
                </ul>
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="flex items-center">
                  <span className="text-2xl mr-2">💰</span>
                  <strong className="text-pink-700">Chính sách Phí Nền tảng và Vận chuyển Minh bạch, Cạnh tranh:</strong>
                </p>
                <ul className="list-disc list-inside ml-8 mt-1">
                  <li>Phí Nền tảng duy nhất (% giá trị sản phẩm), thấp hơn và đơn giản hơn nhiều sàn lớn.</li>
                  <li>Phí Vận chuyển: PostGifty không thu lợi nhuận từ phí vận chuyển tiêu chuẩn. Đối tác không trả thêm phí VC tiêu chuẩn.</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="flex items-center">
                  <span className="text-2xl mr-2">🔗</span>
                  <strong className="text-yellow-700">Định vị Chiến lược là &ldquo;Cầu nối&rdquo; trong Hệ sinh thái VNPT (Tầm nhìn Giai đoạn 2):</strong>
                </p>
                <p className="mt-1 ml-8">
                  Từ thành công với VNPost, PostGifty hướng tới tích hợp sâu hơn với các dịch vụ và nền tảng của Tập đoàn VNPT
                  (hạ tầng số, công nghệ lõi, giải pháp số).
                </p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#1E90FF' }}>
              Nơi kết nối dịch vụ đặt lịch, mua sắm tại địa phương
            </h3>
            <p className="text-sm text-gray-700 mb-2 flex items-start">
              <span className="text-2xl mt-1 mr-2">🛍️</span>
              <span>
                <strong>Mua sắm tại địa phương:</strong> PostGifty trở thành một nền tảng mua sắm hàng đầu tại địa phương,
                kết nối các Đối tác Bán hàng tại Hải Dương với Người mua tại Hải Dương.
                Các sản phẩm niêm yết đa dạng, bao gồm sản phẩm OCOP và đặc sản địa phương.
              </span>
            </p>
            <p className="text-sm text-gray-700 flex items-start">
              <span className="text-2xl mt-1 mr-2">🗓️</span>
              <span>
                <strong>Dịch vụ đặt lịch:</strong> Gifty Tech cung cấp các gói dịch vụ đặt lịch mạnh mẽ, linh hoạt và dễ sử dụng, giúp đối tác tối ưu vận hành, nâng cao trải nghiệm khách hàng và bứt phá doanh thu trên Nền Tảng Số.
              </span>
            </p>
          </div>

          {/* Phase 1 and 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: '#FFDA63' }}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1E90FF' }}>
                Giai đoạn 1: Hợp tác sâu rộng với Vietnam Post (VNPost)
              </h3>
              <p className="text-gray-700 mb-3">
                Tập trung tận dụng thế mạnh của VNPost để xây dựng nền tảng và thị trường ban đầu, đặc biệt tại Hải Dương.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong>Tối ưu Logistics:</strong> Mạng lưới bưu cục VNPost, Bưu điện Văn hóa Xã (VHX) làm hạ tầng giao nhận.
                  Chính sách vận chuyển cạnh tranh, đồng giá. PostGifty không thu lợi từ phí vận chuyển tiêu chuẩn.
                </li>
                <li className="text-center text-2xl">⬇️</li>
                <li className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong>Mạng lưới CTV Bán hàng (CTVBH):</strong> Ưu tiên nhân sự VNPost/VHX tại Hải Dương. Hoa hồng hấp dẫn.
                </li>
                <li className="text-center text-2xl">⬇️</li>
                <li className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong>Hỗ trợ VNPost Chuyển đổi số:</strong> Giúp VHX tăng nguồn thu, đóng góp vào CĐS.
                </li>
                <li className="text-center text-2xl">⬇️</li>
                <li className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong>Mở rộng Sản phẩm/Dịch vụ:</strong> Tìm nhà cung cấp uy tín qua VNPost, đặc biệt đặc sản, OCOP.
                </li>
              </ul>
              <h4 className="font-semibold mt-4 mb-2" style={{ color: '#1E90FF' }}>
                Mô hình hoạt động PostGifty (Giai đoạn 1):
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>1. Đối tác cung cấp sản phẩm → Gifty Tech tạo gian hàng.</p>
                <p>2. Khách hàng đặt hàng qua Zalo.</p>
                <p>3. CTV VHX &amp; Gifty Tech hỗ trợ bán hàng.</p>
                <p>4. Gifty Tech thông báo đơn → Đối tác chuẩn bị hàng.</p>
                <p>5. Giao nhận bởi VHX/đơn vị liên kết.</p>
                <p>6. Gifty Tech đối soát &amp; thanh toán cho Đối tác (sau trừ phí).</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-semibold mb-3" style={{ color: '#1E90FF' }}>
                Chính sách Phí &amp; Vận hành PostGifty (GĐ1)
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <strong style={{ color: '#FF69B4' }}>Phí Nền tảng:</strong> Tính theo % giá trị sản phẩm (sau KM).
                  <ul className="list-disc list-inside ml-4">
                    <li>Hầu hết ngành hàng: <span className="font-bold">10%</span></li>
                    <li>Một số ngành hàng trị cao: <span className="font-bold">2.5%</span></li>
                    <li>Ưu đãi: <span className="font-bold text-green-600">0% cho 100 đơn đầu tiên</span></li>
                  </ul>
                  <p className="text-xs">(Chưa bao gồm phí xử lý thanh toán qua ZaloPay, VNPay...)</p>
                </div>
                <div>
                  <strong style={{ color: '#FFDA63' }}>Đối soát &amp; Thanh toán:</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>2 lần/tháng.</li>
                    <li>Thanh toán trong 3-5 ngày làm việc sau đối soát.</li>
                    <li>Ngưỡng tối thiểu: 200.000 VNĐ/kỳ.</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#90EE90' }}>Trả hàng &amp; Hoàn tiền:</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Trong vòng 3 ngày sau giao hàng thành công (lỗi sản phẩm, sai mô tả, hư hỏng...).</li>
                    <li>Chi phí vận chuyển trả hàng: Đối tác chịu (nếu lỗi do Đối tác), PostGifty/Bưu điện chịu (nếu lỗi vận chuyển).</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#1E90FF' }}>Vận chuyển Nội tỉnh Hải Dương (VNPost - GĐ1):</strong>
                  <p className="text-xs mb-1">
                    PostGifty không thu lợi từ phí vận chuyển tiêu chuẩn. Đối tác không trả thêm phí VC tiêu chuẩn.
                  </p>
                  <table className="w-full text-xs border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2">Điều kiện</th>
                        <th className="border border-gray-300 p-2">Phí vận chuyển (Người mua trả)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          Trọng lượng &lt; 1kg <strong>HOẶC</strong><br />Giá trị đơn &lt; 300.000 VNĐ
                        </td>
                        <td className="border border-gray-300 p-2">
                          Theo cước thực tế của Bưu Điện (Đối tác cần khai báo chính xác trọng lượng)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          Trọng lượng 1kg - 2kg <strong>VÀ</strong><br />Giá trị đơn ≥ 300.000 VNĐ
                        </td>
                        <td className="border border-gray-300 p-2">
                          Đồng giá 22.000 VNĐ (PostGifty có thể hỗ trợ bù chênh lệch nhỏ nếu cước BĐ cao hơn trong ngưỡng này ở giai đoạn đầu)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          Trọng lượng &gt; 2kg <strong>VÀ</strong><br />Giá trị đơn ≥ 300.000 VNĐ
                        </td>
                        <td className="border border-gray-300 p-2">
                          Cần xây dựng bảng đồng giá theo kg và giá trị (Chưa có bảng cụ thể)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs mt-2">
                    <strong>Lưu ý:</strong> Đối tác chịu trách nhiệm cung cấp thông tin trọng lượng chính xác,
                    đóng gói cẩn thận và ghi Mã Vận Đơn của Bưu điện lên kiện hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border-l-4" style={{ borderColor: '#FFDA63' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1E90FF' }}>
              Giai đoạn 2: PostGifty - Cầu Nối Số Hóa Doanh Nghiệp Toàn Quốc &amp; Địa Phương
            </h3>
            <p className="text-gray-700 mb-3">
              Sau khi xây dựng nền tảng vững chắc với VNPost, PostGifty sẽ mở rộng vai trò, trở thành cầu nối trực tiếp hỗ trợ doanh nghiệp trên toàn quốc và thúc đẩy chuyển đổi số cho các doanh nghiệp địa phương một cách rộng rãi. VNPost tiếp tục là đối tác quan trọng trong mạng lưới bán hàng và vận chuyển.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
                <strong className="block text-base" style={{ color: '#8A2BE2' }}>🚚 VNPost - Đối tác Vận hành Chiến lược:</strong>
                <p className="mt-1">
                  VNPost tiếp tục đóng vai trò là đối tác chủ chốt trong việc cung cấp dịch vụ vận chuyển và hỗ trợ mạng lưới cộng tác viên bán hàng (CTVBH), đảm bảo hiệu quả hoạt động logistics cho PostGifty.
                </p>
              </div>
              <div className="bg-pink-50 border-l-4 border-pink-500 p-3">
                <strong className="block text-base" style={{ color: '#FF69B4' }}>🚀 Hỗ trợ Chuyển đổi số Toàn diện cho Doanh nghiệp Địa phương:</strong>
                <p className="mt-1">
                  Cung cấp các giải pháp và công cụ giúp doanh nghiệp địa phương (đặc biệt là SMEs) số hóa hoạt động kinh doanh, từ quản lý bán hàng, marketing trực tuyến đến chăm sóc khách hàng.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                <strong className="block text-base" style={{ color: '#1E90FF' }}>🌐 Mở rộng Kết nối Doanh nghiệp Toàn quốc:</strong>
                <p className="mt-1">
                  Chủ động thu hút và tích hợp các doanh nghiệp từ nhiều tỉnh thành trên cả nước vào nền tảng PostGifty, tạo ra một thị trường đa dạng và phong phú.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-3">
                <strong className="block text-base" style={{ color: '#90EE90' }}>🤝 Phát triển Hệ sinh thái Đối tác Công nghệ &amp; Dịch vụ:</strong>
                <p className="mt-1">
                  Hợp tác với các nhà cung cấp giải pháp công nghệ khác (thanh toán, quản lý kho, marketing số, v.v.) để mang lại bộ công cụ toàn diện và giá trị gia tăng cho đối tác bán hàng.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                <strong className="block text-base" style={{ color: '#FFDA63' }}>💡 Nâng cao Trải nghiệm Người dùng và Đối tác:</strong>
                <p className="mt-1">
                  Liên tục cải tiến nền tảng PostGifty trên Zalo Mini App với các tính năng mới, giao diện thân thiện hơn, dựa trên phản hồi và xu hướng thị trường, có thể ứng dụng AI để cá nhân hóa.
                </p>
              </div>
            </div>
            <p className="mt-4 text-center font-semibold text-gray-800">
              Với định hướng này, PostGifty không chỉ là một sàn TMĐT mà còn là một nền tảng hỗ trợ tăng trưởng và số hóa cho doanh nghiệp, với VNPost là một trụ cột vận hành quan trọng.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#3D2B56] text-white text-center p-6">
        <p>&copy; 2025 Nghiên cứu Thị trường TMĐT Hải Dương &amp; Giới thiệu PostGifty. Infographic được tạo dựa trên báo cáo tổng hợp.</p>
      </footer>
    </div>
  );
} 