"use client";

import React from 'react';
import { FaGavel, FaHandshake, FaUsers, FaClipboardList, FaExclamationTriangle, FaPhoneAlt, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

export default function DisputePage() {
  return (
    <div className="bg-adaptive-light min-h-screen">
      {/* Header Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <FaGavel className="mr-2" />
              Chính sách giải quyết
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Chính sách Giải quyết
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Khiếu nại, Tranh chấp
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              GiftyID xây dựng cơ chế giải quyết khiếu nại, tranh chấp với mục tiêu bảo vệ quyền lợi hợp pháp của tất cả các bên
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 lg:p-12">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                  <p className="text-adaptive-gray leading-relaxed">
                    GiftyID xây dựng cơ chế giải quyết khiếu nại, tranh chấp với mục tiêu bảo vệ quyền lợi hợp pháp của Người Mua và Đối tác Bán hàng, trên tinh thần minh bạch, công bằng và tuân thủ pháp luật.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaHandshake className="mr-3 text-primary" />
                  1. Nguyên tắc chung
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                      <h3 className="font-semibold text-adaptive-heading mb-3 flex items-center">
                        <span className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                          🤝
                        </span>
                        Tự thương lượng
                      </h3>
                      <p className="text-adaptive-gray text-sm">
                        GiftyID đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy và mối quan hệ hợp tác lâu dài.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                      <h3 className="font-semibold text-adaptive-heading mb-3 flex items-center">
                        <span className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                          💙
                        </span>
                        Thiện chí
                      </h3>
                      <p className="text-adaptive-gray text-sm">
                        Mọi khiếu nại được giải quyết dựa trên sự thiện chí, tôn trọng lẫn nhau của các bên.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
                      <h3 className="font-semibold text-adaptive-heading mb-3 flex items-center">
                        <span className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                          ⚖️
                        </span>
                        Vai trò của GiftyID
                      </h3>
                      <p className="text-adaptive-gray text-sm">
                        GiftyID đóng vai trò là đơn vị trung gian, hỗ trợ các bên trong việc hòa giải và đưa ra phương án giải quyết dựa trên chính sách của nền tảng và thông tin thu thập được.
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-semibold text-adaptive-heading mb-3 flex items-center">
                        <span className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3">
                          📜
                        </span>
                        Tuân thủ pháp luật
                      </h3>
                      <p className="text-adaptive-gray text-sm">
                        Quy trình giải quyết tuân thủ các quy định của pháp luật Việt Nam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaClipboardList className="mr-3 text-primary" />
                  2. Quy trình tiếp nhận và giải quyết khiếu nại, tranh chấp
                </h2>
                <div className="space-y-8">
                  <p className="text-adaptive-gray leading-relaxed mb-6">
                    Quy trình bao gồm các bước cụ thể như sau:
                  </p>

                  {/* Step 1 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          Khiếu nại trực tiếp giữa Người Mua và Đối tác Bán hàng
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-adaptive-gray leading-relaxed">
                            Khi phát sinh vấn đề về chất lượng hàng hóa/dịch vụ, Người Mua sẽ liên hệ trực tiếp với Đối tác Bán hàng thông qua các công cụ trao đổi trên nền tảng GiftyID để yêu cầu giải quyết. Đối tác Bán hàng có trách nhiệm tiếp nhận và phản hồi Người Mua trong vòng <strong className="text-blue-600">48 giờ</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          Gửi yêu cầu hỗ trợ đến GiftyID
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-adaptive-gray leading-relaxed mb-3">
                            Nếu sau <strong className="text-green-600">03 ngày làm việc</strong> mà Đối tác Bán hàng không phản hồi hoặc hai bên không thể tự thỏa thuận, một trong hai bên có quyền gửi yêu cầu hỗ trợ giải quyết đến GiftyID qua các kênh chính thức.
                          </p>
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border-l-4 border-yellow-500">
                            <p className="text-sm font-medium text-adaptive-heading mb-2">📋 Thông tin cần cung cấp:</p>
                            <ul className="text-sm text-adaptive-gray space-y-1">
                              <li>• Mã đơn hàng</li>
                              <li>• Mô tả chi tiết vấn đề</li>
                              <li>• Các bằng chứng liên quan (hình ảnh, video, tin nhắn trao đổi...)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          GiftyID tiếp nhận và xác minh
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-adaptive-gray leading-relaxed">
                            Bộ phận Chăm sóc Khách hàng của GiftyID sẽ tiếp nhận yêu cầu và phản hồi cho người khiếu nại trong vòng <strong className="text-purple-600">24 giờ làm việc</strong>. GiftyID sẽ tiến hành xác minh thông tin, thu thập bằng chứng từ cả hai phía để có cái nhìn toàn diện về vụ việc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          4
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          GiftyID đưa ra phương án giải quyết
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-adaptive-gray leading-relaxed">
                            Dựa trên các thông tin đã xác minh, GiftyID sẽ đưa ra phương án giải quyết đề xuất (ví dụ: đổi/trả hàng, hoàn tiền, bồi thường...) trong vòng <strong className="text-orange-600">03-07 ngày làm việc</strong>. Phương án này được đưa ra dựa trên chính sách của GiftyID và mức độ lỗi của các bên.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          5
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          Thực thi và kết thúc khiếu nại
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-adaptive-gray leading-relaxed">
                            Các bên có trách nhiệm thực hiện theo phương án giải quyết đã được thống nhất. GiftyID sẽ giám sát quá trình này và đóng khiếu nại khi vấn đề được giải quyết hoàn toàn.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          6
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-adaptive-heading mb-3">
                          Đưa ra cơ quan pháp luật
                        </h3>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                          <p className="text-adaptive-gray leading-relaxed">
                            Trong trường hợp không đồng ý với phương án giải quyết của GiftyID, các bên có quyền đưa vụ việc ra giải quyết tại Tòa án hoặc các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật. GiftyID cam kết hợp tác và cung cấp thông tin khi có yêu cầu hợp pháp.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaExclamationTriangle className="mr-3 text-primary" />
                  3. Các biện pháp xử lý vi phạm
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p className="mb-6">
                    Đối với các Đối tác Bán hàng có hành vi vi phạm chính sách hoặc xâm phạm quyền lợi của Người Mua, tùy theo mức độ, GiftyID sẽ áp dụng các biện pháp xử lý sau:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">1</span>
                      </div>
                      <p>Nhắc nhở, yêu cầu khắc phục.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">2</span>
                      </div>
                      <p>Tạm khóa hoặc gỡ bỏ các sản phẩm vi phạm.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 dark:text-red-400 font-bold text-sm">3</span>
                      </div>
                      <p>Tạm khóa tài khoản gian hàng trong một khoảng thời gian nhất định.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-500">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 dark:text-gray-400 font-bold text-sm">4</span>
                      </div>
                      <p>Chấm dứt vĩnh viễn hoạt động của gian hàng trên nền tảng GiftyID.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">5</span>
                      </div>
                      <p>Yêu cầu bồi thường thiệt hại theo quy định.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaShieldAlt className="mr-3 text-primary" />
                  4. Đầu mối tiếp nhận và giải quyết khiếu nại
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <p className="text-adaptive-gray mb-6 leading-relaxed">
                    Mọi khiếu nại và yêu cầu hỗ trợ, vui lòng liên hệ qua:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-adaptive-heading">Email</p>
                        <p className="text-adaptive-gray">hotro.giftytech@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <FaPhoneAlt className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-adaptive-heading">Hotline</p>
                        <p className="text-adaptive-gray">0913332282</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUsers className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-adaptive-heading mb-2">Địa chỉ công ty</p>
                        <p className="text-adaptive-gray">
                          Số 1 ngõ 13 đường Hoàng Diệu, Khu 2, Phường Cẩm Thượng, Thành phố Hải Dương, Tỉnh Hải Dương, Việt Nam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-adaptive-heading mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                    ℹ️
                  </span>
                  Lưu ý quan trọng
                </h3>
                <p className="text-adaptive-gray leading-relaxed">
                  GiftyID cam kết xử lý mọi khiếu nại một cách công bằng, minh bạch và nhanh chóng. Chúng tôi khuyến khích các bên luôn duy trì tinh thần hợp tác và thiện chí trong quá trình giải quyết tranh chấp để đạt được kết quả tốt nhất cho tất cả.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 