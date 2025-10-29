"use client";

import React from 'react';
import { FaFileContract, FaShieldAlt, FaUsers, FaGavel, FaCreditCard, FaLock, FaGlobe, FaExclamationTriangle, FaHandshake, FaClipboardList } from 'react-icons/fa';

export default function TermsPage() {
  return (
    <div className="bg-adaptive-light min-h-screen">
      {/* Header Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <FaFileContract className="mr-2" />
              Quy chế hoạt động
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Quy chế hoạt động Website/Ứng dụng
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Cung cấp dịch vụ TMĐT PostGifty
            </h2>
            <div className="text-lg text-blue-100">
              <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p>Độc lập – Tự do – Hạnh phúc</p>
              <p className="mt-2">Số: 002/GT</p>
              <p>Hải Dương, ngày 06 tháng 06 năm 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 lg:p-12">
              
              {/* Section I */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaShieldAlt className="mr-3 text-primary" />
                  I. Nguyên tắc chung
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• Nền tảng thương mại dịch vụ PostGifty (sau đây gọi là &quot;PostGifty&quot; hoặc &quot;Nền tảng&quot;) do Công ty Cổ phần Công nghệ Gifty Tech (&quot;Công ty&quot;) xây dựng và vận hành.</p>
                  <p>• PostGifty là một nền tảng thương mại dịch vụ đa tiện ích, hoạt động chủ yếu trên Zalo Mini App, nhằm mục đích kết nối ba bên: Người Mua, Đối tác Bán hàng (cung cấp sản phẩm và dịch vụ đặt lịch), và mạng lưới Cộng tác viên Bán hàng (CTVBH).</p>
                  <p>• Sứ mệnh của PostGifty là kết nối, đơn giản hóa và tối ưu hóa trải nghiệm mua sắm và dịch vụ thông qua sức mạnh của công nghệ, mang lại giá trị thiết thực cho người dùng và các đối tác tại thị trường Việt Nam, với trọng tâm ban đầu là tỉnh Hải Dương.</p>
                  <p>• Tổ chức, cá nhân tham gia giao dịch trên PostGifty phải tự do thỏa thuận trên cơ sở tôn trọng quyền và lợi ích hợp pháp của các bên, tuân thủ các quy định của pháp luật Việt Nam và quy chế này.</p>
                  <p>• Mọi hoạt động mua bán hàng hóa, cung cấp dịch vụ trên PostGifty phải được thực hiện công khai, minh bạch, đảm bảo quyền lợi của người tiêu dùng.</p>
                </div>
              </div>

              {/* Section II */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaUsers className="mr-3 text-primary" />
                  II. Quy định chung
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• <strong>Tên Nền tảng:</strong> Sàn giao dịch TMĐT PostGifty.</p>
                  <p>• <strong>Địa chỉ truy cập:</strong> Nền tảng hoạt động chủ yếu trên Zalo Mini App &quot;PostGifty&quot;.</p>
                  <p>• <strong>Định nghĩa:</strong></p>
                  <div className="ml-6 space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p><strong>Người Mua:</strong> Là các cá nhân, tổ chức có đăng ký tài khoản trên PostGifty để mua sắm sản phẩm hoặc sử dụng dịch vụ.</p>
                    <p><strong>Đối tác Bán hàng (Người Bán):</strong> Là các doanh nghiệp, hộ kinh doanh, cá nhân có đăng ký gian hàng trên PostGifty để cung cấp sản phẩm (hàng hóa) hoặc dịch vụ (dịch vụ đặt lịch).</p>
                    <p><strong>Cộng tác viên Bán hàng (CTVBH):</strong> Là các cá nhân đăng ký tham gia mạng lưới của PostGifty để thực hiện các hoạt động giới thiệu, quảng bá sản phẩm/dịch vụ và nhận hoa hồng.</p>
                    <p><strong>Hàng hóa/Dịch vụ:</strong> Là những sản phẩm, dịch vụ được kinh doanh hợp pháp, được Đối tác Bán hàng đăng tải trên PostGifty.</p>
                  </div>
                </div>
              </div>

              {/* Section III */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaGavel className="mr-3 text-primary" />
                  III. Quy trình giao dịch
                </h2>
                
                {/* Subsection 1 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-adaptive-heading mb-4">1. Quy trình dành cho người mua hàng/sử dụng dịch vụ</h3>
                  <div className="space-y-3 text-adaptive-gray leading-relaxed">
                    <p>• <strong>Bước 1:</strong> Người Mua truy cập PostGifty trên Zalo Mini App, tìm kiếm, tham khảo thông tin sản phẩm/dịch vụ.</p>
                    <p>• <strong>Bước 2:</strong> Người Mua lựa chọn sản phẩm/dịch vụ mong muốn, kiểm tra thông tin, giá cả và thêm vào giỏ hàng.</p>
                    <p>• <strong>Bước 3:</strong> Người Mua cung cấp thông tin nhận hàng, chọn phương thức vận chuyển và phương thức thanh toán.</p>
                    <p>• <strong>Bước 4:</strong> Người Mua xác nhận đơn hàng. Hệ thống sẽ gửi thông báo xác nhận đặt hàng thành công.</p>
                    <p>• <strong>Bước 5:</strong> Người Mua nhận hàng, kiểm tra và xác nhận đã nhận hàng trên ứng dụng.</p>
                  </div>
                </div>

                {/* Subsection 2 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-adaptive-heading mb-4">2. Quy trình dành cho đối tác (người bán hàng, nhà cung cấp...)</h3>
                  <div className="space-y-3 text-adaptive-gray leading-relaxed">
                    <p>• <strong>Bước 1:</strong> Đối tác liên hệ và đăng ký tài khoản với Ban Quản lý PostGifty.</p>
                    <p>• <strong>Bước 2:</strong> Sau khi được duyệt, Đối tác đăng nhập vào trang quản trị dành riêng cho mình.</p>
                    <p>• <strong>Bước 3:</strong> Đối tác đăng tải thông tin sản phẩm/dịch vụ, hình ảnh, mô tả và đề xuất giá niêm yết (dựa trên giá thị trường như Shopee, chênh lệch không quá 15%). PostGifty sẽ duyệt và niêm yết giá cố định.</p>
                    <p>• <strong>Bước 4:</strong> Khi có đơn hàng mới, hệ thống PostGifty sẽ thông báo cho Đối tác.</p>
                    <p>• <strong>Bước 5:</strong> Đối tác xác nhận đơn hàng, chuẩn bị và đóng gói sản phẩm.</p>
                    <p>• <strong>Bước 6:</strong> Đối tác bàn giao sản phẩm cho đơn vị vận chuyển (VNPost, GHN,...).</p>
                    <p>• <strong>Bước 7:</strong> PostGifty thực hiện đối soát và thanh toán cho Đối tác theo chu kỳ đã thỏa thuận sau khi trừ đi các khoản phí theo chính sách.</p>
                  </div>
                </div>

                {/* Subsection 3 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-adaptive-heading mb-4">3. Quy trình giao nhận vận chuyển</h3>
                  <div className="space-y-3 text-adaptive-gray leading-relaxed">
                    <p>• PostGifty hợp tác chiến lược với Bưu điện Việt Nam (VNPost) để thực hiện dịch vụ vận chuyển và giao nhận hàng hóa.</p>
                    <p>• <strong>Phân định trách nhiệm:</strong></p>
                    <div className="ml-6 space-y-2">
                      <p><strong>Đối tác Bán hàng:</strong> Chịu trách nhiệm cung cấp đầy đủ chứng từ, hóa đơn của hàng hóa; đóng gói sản phẩm đúng quy cách để đảm bảo an toàn trong quá trình vận chuyển.</p>
                      <p><strong>VNPost:</strong> Chịu trách nhiệm vận chuyển, giao hàng và thu hộ tiền (nếu có) theo hợp đồng với PostGifty.</p>
                      <p><strong>PostGifty:</strong> Là đơn vị trung gian, kết nối và cung cấp thông tin đơn hàng cho VNPost, theo dõi tình trạng vận chuyển và hỗ trợ giải quyết các vấn đề phát sinh.</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                      <p><strong>Chính sách phí vận chuyển (Áp dụng tại nội tỉnh Hải Dương, giao tận nhà qua Bưu Điện):</strong></p>
                      <p>• PostGifty không thu lợi nhuận từ phí vận chuyển tiêu chuẩn.</p>
                      <p>• Đối tác có thể tự nguyện tham gia chương trình &quot;Shop Ưu Đãi Vận Chuyển&quot; để hỗ trợ thêm chi phí vận chuyển cho Người Mua.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section IV */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaCreditCard className="mr-3 text-primary" />
                  IV. Quy trình thanh toán
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-adaptive-heading mb-4">1. Thanh toán giữa người mua – người bán</h3>
                  <div className="space-y-3 text-adaptive-gray leading-relaxed">
                    <p>• <strong>Thanh toán khi nhận hàng (COD):</strong> Người Mua thanh toán tiền mặt cho nhân viên của VNPost khi nhận hàng.</p>
                    <p>• <strong>Thanh toán trực tuyến:</strong> Người Mua có thể thanh toán qua các cổng thanh toán điện tử được tích hợp trên PostGifty.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-adaptive-heading mb-4">2. Thanh toán giữa đối tác và BQL PostGifty</h3>
                  <div className="space-y-3 text-adaptive-gray leading-relaxed">
                    <p>• PostGifty sẽ thu các khoản phí sau từ Đối tác Bán Hàng Hóa:</p>
                    <div className="ml-6 space-y-2 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <p><strong>Phí Nền tảng:</strong> 10% trên giá trị sản phẩm (sau khuyến mãi của Shop). Phí này đã bao gồm chi phí PostGifty trả cho cổng thanh toán. (một số ngành hàng áp dụng 2.5% như ngành hàng Điện tử giá trị cao).</p>
                      <p><strong>Phí Dịch vụ (tùy chọn):</strong> 10% trên phần Hoa hồng Vượt trội do Đối tác tự nguyện đóng góp thêm cho CTV.</p>
                    </div>
                    <p>• PostGifty sẽ tiến hành đối soát và chuyển khoản cho Đối tác sau khi trừ đi các khoản phí liên quan theo định kỳ (hàng tháng).</p>
                  </div>
                </div>
              </div>

              {/* Section V */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaLock className="mr-3 text-primary" />
                  V. Chính sách Bảo vệ thông tin cá nhân của người tiêu dùng
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• PostGifty sử dụng các giao thức bảo mật và mã hóa để bảo vệ thông tin của người dùng.</p>
                  <p>• Đối với giao dịch thanh toán trực tuyến, PostGifty hợp tác với các cổng thanh toán uy tín, đã được cấp phép hoạt động tại Việt Nam. Chúng tôi không lưu trữ thông tin thẻ thanh toán của khách hàng.</p>
                  <p>• Cơ chế xác thực thông tin Đối tác Bán hàng (xét duyệt đăng ký) giúp giảm thiểu rủi ro cho Người Mua.</p>
                  <p>• PostGifty có cơ chế xử lý khiếu nại và đền bù trong trường hợp thông tin thanh toán của khách hàng qua nền tảng bị chiếm đoạt gây thiệt hại, theo quy định của pháp luật và thỏa thuận với các bên liên quan.</p>
                  <p>• Chính sách bảo vệ thông tin cá nhân của PostGifty tuân thủ theo quy định tại Điều 68 đến Điều 73 Nghị định số 52/2013/NĐ-CP.</p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p><strong>Mục đích thu thập:</strong> Phục vụ cho việc quản lý, xác nhận đơn hàng, giao hàng, thanh toán và chăm sóc khách hàng.</p>
                    <p><strong>Phạm vi sử dụng:</strong> Thông tin chỉ được sử dụng trong nội bộ Công ty, cung cấp cho đơn vị vận chuyển (VNPost) và các cơ quan nhà nước có thẩm quyền khi có yêu cầu.</p>
                    <p><strong>Cam kết bảo mật:</strong> PostGifty cam kết không bán, không chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại.</p>
                  </div>
                </div>
              </div>

              {/* Section VI */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaGlobe className="mr-3 text-primary" />
                  VI. Quản lý thông tin trên website, ứng dụng
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• PostGifty thực hiện cơ chế kiểm duyệt thông tin Đối tác Bán hàng khi đăng ký và rà soát nội dung sản phẩm/dịch vụ đăng tải.</p>
                  <p>• Các hàng hóa, dịch vụ bị cấm kinh doanh theo quy định của pháp luật (Nghị định 59/2006/NĐ-CP) sẽ bị từ chối và gỡ bỏ.</p>
                  <p>• PostGifty có cơ chế tiếp nhận và xử lý các báo cáo về sản phẩm vi phạm quyền sở hữu trí tuệ.</p>
                  <p>• Thông tin về nhãn hàng hóa phải tuân thủ Nghị định 43/2017/NĐ-CP và các văn bản sửa đổi, bổ sung.</p>
                </div>
              </div>

              {/* Section VII */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaExclamationTriangle className="mr-3 text-primary" />
                  VII. Trách nhiệm trong trường hợp phát sinh lỗi kỹ thuật
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• Ban Quản lý PostGifty cam kết nỗ lực đảm bảo sự ổn định của hệ thống kỹ thuật.</p>
                  <p>• Trong trường hợp xảy ra lỗi kỹ thuật, lỗi đường truyền... ảnh hưởng đến quyền lợi của thành viên, Ban Quản lý sẽ ngay lập tức áp dụng các biện pháp cần thiết để khắc phục và thông báo cho các bên liên quan.</p>
                </div>
              </div>

              {/* Section VIII & IX */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaHandshake className="mr-3 text-primary" />
                  VIII. Quyền và trách nhiệm của BQL website TMĐT PostGifty
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-adaptive-heading mb-3">Quyền:</h3>
                    <div className="space-y-2 text-adaptive-gray">
                      <p>• Yêu cầu các thành viên cung cấp thông tin chính xác, trung thực.</p>
                      <p>• Từ chối, tạm ngừng hoặc chấm dứt cung cấp dịch vụ cho thành viên vi phạm quy chế.</p>
                      <p>• Thu các khoản phí theo chính sách đã công bố.</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-adaptive-heading mb-3">Trách nhiệm:</h3>
                    <div className="space-y-2 text-adaptive-gray">
                      <p>• Xây dựng và vận hành nền tảng ổn định, an toàn.</p>
                      <p>• Hỗ trợ, hướng dẫn các thành viên sử dụng nền tảng.</p>
                      <p>• Bảo mật thông tin và hỗ trợ giải quyết các tranh chấp phát sinh.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section X */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
                  <FaClipboardList className="mr-3 text-primary" />
                  X. Điều khoản áp dụng
                </h2>
                <div className="space-y-4 text-adaptive-gray leading-relaxed">
                  <p>• Quy chế này có hiệu lực kể từ ngày đăng tải trên nền tảng PostGifty.</p>
                  <p>• PostGifty có quyền sửa đổi, bổ sung Quy chế này và sẽ thông báo cho tất cả thành viên trước khi áp dụng.</p>
                  <p>• Tất cả các thành viên tham gia PostGifty đồng ý cam kết thực hiện đúng theo các điều khoản trong Quy chế này.</p>
                  <p>• Mọi hoạt động trên PostGifty phải tuân thủ các quy định của Nghị định 52/2013/NĐ-CP, Nghị định 85/2021/NĐ-CP và các quy định pháp luật liên quan khác của Việt Nam.</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-adaptive pt-8">
                <h2 className="text-2xl font-bold text-adaptive-heading mb-6">XI. Điều khoản cam kết</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-adaptive-heading mb-4">
                    Địa chỉ liên lạc chính thức của Website/ứng dụng cung cấp dịch vụ thương mại điện tử TMĐT PostGifty:
                  </h3>
                  <div className="space-y-2 text-adaptive-gray">
                    <p><strong>Công ty/Tổ chức:</strong> CÔNG TY CỔ PHẦN GIFTY TECH</p>
                    <p><strong>Địa chỉ:</strong> Số 1 ngõ 13 đường Hoàng Diệu, Khu 2, Phường Cẩm Thượng, Thành phố Hải Dương, Tỉnh Hải Dương, Việt Nam.</p>
                    <p><strong>Tel:</strong> 0913332282</p>
                    <p><strong>Email:</strong> hotro.giftytech@gmail.com</p>
                    <p><strong>Hotline:</strong> 0913332282</p>
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