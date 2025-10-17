import Link from 'next/link';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-10 bg-adaptive-light min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-sm text-adaptive-gray hover:text-adaptive-heading">
          Trang chủ
        </Link>
        <span className="mx-2 text-neutral-400 dark:text-neutral-500">/</span>
        <Link href="/login" className="text-sm text-adaptive-gray hover:text-adaptive-heading">
          Đăng nhập
        </Link>
        <span className="mx-2 text-neutral-400 dark:text-neutral-500">/</span>
        <span className="text-sm text-adaptive-heading">Quên mật khẩu</span>
      </div>

      <ForgotPasswordForm />
    </div>
  );
} 