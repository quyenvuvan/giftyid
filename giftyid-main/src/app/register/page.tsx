import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-10 bg-adaptive-light min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-sm text-adaptive-gray hover:text-adaptive-heading">
          Trang chủ
        </Link>
        <span className="mx-2 text-neutral-400 dark:text-neutral-500">/</span>
        <span className="text-sm text-adaptive-heading">Đăng ký</span>
      </div>

      <div className="max-w-2xl mx-auto card-elevated p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-adaptive-heading">Tạo tài khoản</h1>
        
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">
              1
            </div>
            <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-600 mx-2"></div>
            <div className="flex items-center justify-center w-8 h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full text-sm font-medium">
              2
            </div>
            <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-600 mx-2"></div>
            <div className="flex items-center justify-center w-8 h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full text-sm font-medium">
              3
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="phone" className="form-label">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="Nhập số điện thoại của bạn"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Gửi mã xác thực
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-adaptive-gray">
            Bạn đã có tài khoản? {' '}
            <Link href="/login" className="text-primary hover:underline">
              Đăng nhập ngay!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 