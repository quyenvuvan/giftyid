import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-adaptive pt-12 pb-6 border-t border-adaptive">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Support & Help Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-adaptive-heading">Trợ giúp & Hỗ trợ</h3> 
            <div className="space-y-3">
              <div className="text-sm text-adaptive-heading uppercase font-semibold">
                Công ty cổ phần Gifty Tech
              </div>
              <div className="flex items-start space-x-2 text-sm text-adaptive-gray">
                <FaMapMarkerAlt className="mt-1 text-adaptive-price" />
                <span>Số 1 ngõ 13 đường Hoàng Diệu, Phường Cẩm Thượng, Tp Hải Dương, Tỉnh Hải Dương</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-adaptive-gray">
                <FaEnvelope className="text-adaptive-price" />
                <span>hotro.giftytech@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-adaptive-gray">
                <FaPhoneAlt className="text-adaptive-price" />
                <span>0913332282</span>
              </div>
            </div>
          </div>

          {/* Gifty Tech Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-adaptive-heading">Về Gifty Tech</h3>
            <ul className="space-y-2 text-sm text-adaptive-gray">
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  Giới thiệu về Gifty Tech
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-secondary transition-colors">
                  Bán hàng trên PostGifty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                Liên hệ truyền thông
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-secondary transition-colors">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/collaborator" className="hover:text-secondary transition-colors">
                  Chương trình CTV bán hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-adaptive-heading">Tài khoản</h3>
            <ul className="space-y-2 text-sm text-adaptive-gray">
              <li>
                <Link href="/register" className="hover:text-secondary transition-colors">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-secondary transition-colors">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/account/forgot-password" className="hover:text-secondary transition-colors">
                  Quên mật khẩu
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-secondary transition-colors">
                  Thông tin tài khoản
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-secondary transition-colors">
                  Theo dõi đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-adaptive-heading">Chính sách</h3>
            <ul className="space-y-2 text-sm text-adaptive-gray">
              <li>
                <Link href="/policies/terms" className="hover:text-secondary transition-colors">
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-secondary transition-colors">
                  Chính sách vận chuyển và giao nhận
                </Link>
              </li>
              <li>
                <Link href="/policies/transaction" className="hover:text-secondary transition-colors">
                  Quy định giao dịch chung
                </Link>
              </li>
              <li>
                <Link href="/policies/dispute" className="hover:text-secondary transition-colors">
                  Chính sách giải quyết khiếu nại
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-secondary transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* App Download Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-adaptive-heading">Tải ứng dụng</h3>
            <div className="flex flex-col space-y-3">
              <div className="mb-2">
                <Image 
                  src="/qrcode.png" 
                  alt="QR Code" 
                  width={120} 
                  height={120} 
                  className="border border-adaptive rounded-md"
                />
              </div>
              <Link href="https://apps.apple.com" className="mt-2">
                <Image 
                  src="/appstore.png" 
                  alt="App Store" 
                  width={120} 
                  height={24}
                  style={{ width: "auto" }}
                />
              </Link>
              <Link href="https://play.google.com">
                <Image 
                  src="/google-play.png" 
                  alt="Google Play" 
                  width={120} 
                  height={24}
                  style={{ width: "auto" }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="mt-10 flex justify-center">
          {/* <Image 
            src="/certification.png" 
            alt="Certification" 
            width={150} 
            height={50} 
          /> */}
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-adaptive-price space-y-1">
          <p>Mã số doanh nghiệp: 0801429270 - Nơi Cấp: Sở kế hoạch và Đầu tư Tỉnh Hải Dương cấp lần đầu ngày 24/09/2024. Thay đổi lần 1 ngày 18/04/2025</p>
          <p>Mã số thuế: 0801429270 - Địa chỉ: Số 1 ngõ 13 đường Hoàng Diệu, Phường Cẩm Thượng, Tp Hải Dương, Tỉnh Hải Dương - Số điện thoại: 0913332282 - Email: hotro.giftytech@gmail.com</p>
          <p>Bản quyền thuộc về <span className="text-primary">GIFTY TECH., JSC</span> © 2025. </p>
        </div>
      </div>
    </footer>
  );
} 