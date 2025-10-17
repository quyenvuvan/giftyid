import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quy định giao dịch chung | GiftyID',
  description: 'Quy định giao dịch chung của GiftyID - Tạo môi trường mua sắm an toàn, minh bạch và bảo vệ quyền lợi hợp pháp của tất cả các bên.',
  keywords: 'quy định giao dịch, chính sách đổi trả, hoàn tiền, kiểm hàng, mua sắm an toàn',
};

export default function TransactionPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Quy định giao dịch chung
          </h1>
          <p className="text-xl opacity-90">
            Tạo môi trường mua sắm an toàn, minh bạch và bảo vệ quyền lợi hợp pháp
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12a11.955 11.955 0 01-1.382 5.618m0 0A11.955 11.955 0 0112 21a11.955 11.955 0 01-7.618-1.382m15.236 0A11.955 11.955 0 0112 3a11.955 11.955 0 017.618 1.382" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Giới thiệu</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Các điều kiện giao dịch chung này áp dụng cho tất cả các giao dịch được thực hiện trên nền tảng GiftyID, 
            nhằm tạo ra một môi trường mua sắm <span className="font-semibold text-green-600">an toàn, minh bạch</span> và 
            bảo vệ quyền lợi hợp pháp của tất cả các bên tham gia, bao gồm 
            <span className="font-semibold"> Người Mua, Đối tác Bán hàng và GiftyID</span>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Mọi chính sách đều tuân thủ các quy định tại 
            <span className="font-semibold text-blue-600"> Nghị định 52/2013/NĐ-CP</span> và các văn bản pháp luật liên quan.
          </p>
        </div>

        {/* General Principles */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">1. Nguyên tắc chung</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-700">
                Mọi giao dịch trên GiftyID được thực hiện dựa trên nguyên tắc 
                <span className="font-semibold text-blue-600"> tự nguyện, bình đẳng</span>, và tôn trọng quyền, lợi ích hợp pháp của các bên.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Hợp đồng mua bán hàng hóa/dịch vụ</span> là sự thỏa thuận trực tiếp giữa Người Mua và Đối tác Bán hàng.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-700">
                GiftyID đóng vai trò là <span className="font-semibold text-green-600">nền tảng trung gian</span>, cung cấp hạ tầng công nghệ, 
                dịch vụ thanh toán, và hỗ trợ giải quyết các vấn đề phát sinh.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <p className="text-gray-700">
                Mỗi Đối tác Bán hàng có thể có các chính sách riêng, nhưng không được trái với 
                <span className="font-semibold"> Quy định chung của GiftyID và pháp luật Việt Nam</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Inspection Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">2. Chính sách Kiểm hàng</h2>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <p className="text-orange-800 font-medium mb-4">
              Để đảm bảo quyền lợi cho Người Mua, GiftyID cho phép khách hàng kiểm tra sản phẩm cùng với nhân viên giao hàng 
              <span className="font-semibold"> (đồng kiểm)</span> tại thời điểm nhận hàng.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">📋 Phạm vi kiểm tra</h3>
              <p className="text-gray-700 mb-2">
                Người Mua được kiểm tra các yếu tố bên ngoài của sản phẩm như:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Tình trạng đóng gói</li>
                <li>Màu sắc</li>
                <li>Số lượng</li>
                <li>Chủng loại sản phẩm</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-700 font-medium">
                  ⚠️ Lưu ý: Không được tác động sâu vào sản phẩm (ví dụ: cắm điện, dùng thử...)
                </p>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🔧 Xử lý khi có vấn đề</h3>
              <p className="text-gray-700 mb-3">
                Nếu phát hiện sản phẩm bị hư hỏng, sai mẫu mã, hoặc không đủ số lượng:
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">1.</span>
                  <p className="text-gray-700">Người Mua có quyền từ chối nhận hàng</p>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">2.</span>
                  <p className="text-gray-700">Ghi chú lý do vào biên bản giao nhận</p>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">3.</span>
                  <p className="text-gray-700">Liên hệ ngay với bộ phận hỗ trợ của GiftyID để được xử lý kịp thời</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return/Exchange Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">3. Chính sách Đổi trả</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Chính sách này quy định các trường hợp Người Mua có thể yêu cầu đổi hoặc trả lại sản phẩm đã mua.
          </p>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Các trường hợp được chấp nhận đổi trả
              </h3>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sản phẩm bị lỗi kỹ thuật do nhà sản xuất
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sản phẩm bị hư hỏng, biến dạng trong quá trình vận chuyển
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Đối tác Bán hàng giao sai sản phẩm (sai mẫu mã, sai màu sắc, sai kích thước...)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sản phẩm đã hết hạn sử dụng trước hoặc vào ngày được giao cho Người Mua
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Điều kiện đổi trả
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <p>Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng, đầy đủ tem mác, bao bì, phụ kiện và quà tặng kèm theo (nếu có)</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <p>Người Mua phải cung cấp được mã đơn hàng để xác thực giao dịch</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <p>Yêu cầu đổi trả phải được thực hiện trong vòng <span className="font-semibold text-red-600">03-07 ngày</span> kể từ ngày nhận hàng (tùy theo quy định của từng Đối tác Bán hàng)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">4. Chính sách Hoàn tiền</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Các trường hợp hoàn tiền
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Người Mua đã thanh toán trước nhưng Đối tác Bán hàng hết hàng hoặc không thể giao hàng
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Người Mua đủ điều kiện đổi trả sản phẩm nhưng Đối tác Bán hàng không có sản phẩm tương tự để đổi
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Người Mua từ chối nhận hàng do sản phẩm bị lỗi, hư hỏng theo chính sách kiểm hàng
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Quy trình và phương thức hoàn tiền
              </h3>
              <div className="space-y-4 text-blue-700">
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                  <p>Việc hoàn tiền sẽ được GiftyID xử lý sau khi nhận được yêu cầu hợp lệ và/sau khi Đối tác Bán hàng đã nhận lại hàng trả về và xác nhận tình trạng sản phẩm</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                  <p>Thời gian xử lý hoàn tiền dự kiến từ <span className="font-semibold">03-07 ngày làm việc</span></p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                  <p>Số tiền sẽ được hoàn lại cho Người Mua qua phương thức thanh toán ban đầu (thẻ ngân hàng, ví điện tử...) hoặc theo thỏa thuận giữa các bên</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Cần hỗ trợ về giao dịch?</h2>
            <p className="text-lg opacity-90 mb-6">
              Liên hệ với chúng tôi để được hỗ trợ về các vấn đề giao dịch, đổi trả và hoàn tiền
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hotro.giftytec@gmail.com"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📧 hotro.giftytec@gmail.com
              </a>
              <a
                href="tel:+84913332282"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📞 +84 913 332 282
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
} 