'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Redirect to dashboard after successful login
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-adaptive-light min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-sm text-adaptive-gray hover:text-adaptive-heading">
          Trang chủ
        </Link>
        <span className="mx-2 text-neutral-400 dark:text-neutral-500">/</span>
        <span className="text-sm text-adaptive-heading">Đăng nhập</span>
      </div>

      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
} 