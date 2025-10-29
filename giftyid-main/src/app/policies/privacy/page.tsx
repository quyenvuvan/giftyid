"use client";

import React from 'react';
import { FaShieldAlt, FaUserShield, FaDatabase, FaClock, FaMapMarkerAlt, FaEdit, FaLock, FaExclamationCircle } from 'react-icons/fa';

export default function PrivacyPage() {
  return (
    <div className="bg-adaptive-light min-h-screen">
      {/* Header Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Chính sách bảo mật
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Chính sách Bảo mật Thông tin
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Cá nhân Khách hàng
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Công ty Cổ phần Công nghệ Gifty Tech cam kết bảo vệ thông tin cá nhân của bạn với các biện pháp bảo mật tiên tiến nhất
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
                    Công ty Cổ phần Công nghệ Gifty Tech (&quot;PostGifty&quot;, &quot;chúng tôi&quot;) hiểu rằng sự riêng tư và bảo mật thông tin cá nhân là vô cùng quan trọng đối với người dùng. Vì vậy, chúng tôi cam kết nỗ lực tối đa để bảo vệ thông tin của bạn khi sử dụng nền tảng thương mại dịch vụ PostGifty.
                  </p>
                  <p className="text-adaptive-gray leading-relaxed mt-4">
                    Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn, tuân thủ theo các quy định của Nghị định 52/2013/NĐ-CP và các văn bản pháp luật liên quan về bảo vệ thông tin cá nhân.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaUserShield className="mr-3 text-primary" />
                  1. Mục đích thu thập thông tin cá nhân
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>Chúng tôi thu thập thông tin cá nhân của khách hàng nhằm các mục đích sau:</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">📦 Xử lý đơn hàng</h4>
                      <p className="text-sm">Xác nhận, xử lý và quản lý việc mua bán hàng hóa, đặt lịch dịch vụ.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">🚚 Giao hàng</h4>
                      <p className="text-sm">Cung cấp thông tin cần thiết cho Đối tác Bán hàng và đơn vị vận chuyển (VNPost) để thực hiện việc giao nhận.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">🎧 Hỗ trợ khách hàng</h4>
                      <p className="text-sm">Giải đáp thắc mắc, xử lý khiếu nại, tiếp nhận phản hồi và cung cấp các dịch vụ chăm sóc khách hàng khác.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">👤 Quản lý tài khoản</h4>
                      <p className="text-sm">Cung cấp cho bạn một tài khoản để quản lý các giao dịch và thông tin cá nhân trên PostGifty.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">🎯 Cá nhân hóa trải nghiệm</h4>
                      <p className="text-sm">Giới thiệu các sản phẩm, dịch vụ và chương trình khuyến mãi phù hợp với nhu cầu của bạn (khi có sự đồng ý).</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-adaptive-heading mb-2">🔒 An ninh</h4>
                      <p className="text-sm">Ngăn chặn các hoạt động phá hoại tài khoản người dùng hoặc các hoạt động giả mạo.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaDatabase className="mr-3 text-primary" />
                  2. Phạm vi thu thập thông tin
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>Để phục vụ các mục đích trên, PostGifty có thể thu thập các thông tin sau:</p>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p><strong>Thông tin định danh:</strong> Họ và tên, số điện thoại, địa chỉ email.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p><strong>Thông tin liên lạc:</strong> Địa chỉ nhận hàng.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p><strong>Thông tin giao dịch:</strong> Lịch sử mua hàng, giá trị giao dịch, phương thức vận chuyển và thanh toán.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaUserShield className="mr-3 text-primary" />
                  3. Phạm vi sử dụng thông tin
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>Thông tin của bạn được sử dụng trong phạm vi nội bộ của PostGifty và chỉ được chia sẻ cho các bên thứ ba khi thực sự cần thiết để thực hiện giao dịch, cụ thể:</p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">🏪 Đối tác Bán hàng</h4>
                      <p className="text-sm">Để xác nhận đơn hàng, chuẩn bị hàng hóa/dịch vụ và hỗ trợ sau bán hàng.</p>
                    </div>
                    <div className="border border-green-200 dark:border-green-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">📮 Đơn vị vận chuyển (VNPost)</h4>
                      <p className="text-sm">Để thực hiện việc giao nhận sản phẩm đến địa chỉ của bạn.</p>
                    </div>
                    <div className="border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">🏛️ Cơ quan nhà nước</h4>
                      <p className="text-sm">Khi có yêu cầu hợp pháp theo quy định của pháp luật.</p>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-6">
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      ⚠️ Cam kết quan trọng: Chúng tôi cam kết không bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào khác vì mục đích thương mại.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaClock className="mr-3 text-primary" />
                  4. Thời gian lưu trữ thông tin
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                    <p>Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ từ chính khách hàng hoặc khi tài khoản không hoạt động trong một thời gian dài theo quy định của PostGifty. Trong mọi trường hợp, thông tin sẽ được lưu trữ và bảo mật trên máy chủ của chúng tôi theo quy định của pháp luật.</p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-primary" />
                  5. Địa chỉ của đơn vị thu thập và quản lý thông tin
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <div className="space-y-2 text-adaptive-gray">
                    <p><strong>Công ty/Tổ chức:</strong> CÔNG TY CỔ PHẦN CÔNG NGHỆ GIFTY TECH</p>
                    <p><strong>Địa chỉ:</strong> Số 1 ngõ 13 đường Hoàng Diệu, Khu 2, Phường Cẩm Thượng, Thành phố Hải Dương, Tỉnh Hải Dương, Việt Nam.</p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaEdit className="mr-3 text-primary" />
                  6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>Người dùng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách:</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start space-x-3 p-4 border border-adaptive rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p>Đăng nhập vào tài khoản trên nền tảng PostGifty và chỉnh sửa thông tin.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border border-adaptive rounded-lg">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p>Liên hệ với bộ phận hỗ trợ khách hàng của PostGifty để được trợ giúp.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaLock className="mr-3 text-primary" />
                  7. Cam kết bảo mật thông tin cá nhân khách hàng
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>PostGifty cam kết bảo mật tuyệt đối thông tin cá nhân của bạn bằng các phương pháp kỹ thuật và tổ chức tiên tiến như mã hóa SSL, tường lửa và quy trình kiểm soát truy cập nghiêm ngặt.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Chỉ những nhân viên được ủy quyền mới có thể truy cập thông tin cá nhân để thực hiện các nhiệm vụ được giao.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu, PostGifty sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng để điều tra xử lý kịp thời và thông báo cho bạn được biết.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaExclamationCircle className="mr-3 text-primary" />
                  8. Cơ chế tiếp nhận và giải quyết khiếu nại
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p className="mb-4">Liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích:</p>
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                    <p>Khi phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích hoặc phạm vi, Người dùng có quyền gửi khiếu nại đến PostGifty qua các kênh liên lạc chính thức. PostGifty sẽ dùng mọi nguồn lực để xác minh và phản hồi trong thời gian sớm nhất, đồng thời có các biện pháp xử lý phù hợp.</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-adaptive pt-8">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6">Thông tin liên hệ</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <p className="text-adaptive-gray mb-4">
                    Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi:
                  </p>
                  <div className="space-y-2 text-adaptive-gray">
                    <p><strong>Email:</strong> hotro.giftytech@gmail.com</p>
                    <p><strong>Hotline:</strong> 0913332282</p>
                    <p><strong>Địa chỉ:</strong> Số 1 ngõ 13 đường Hoàng Diệu, Khu 2, Phường Cẩm Thượng, Thành phố Hải Dương, Tỉnh Hải Dương, Việt Nam.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 