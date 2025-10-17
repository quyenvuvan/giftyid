'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getEmployeeByIdOrEmail } from '@/data/employees';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from 'react-icons/fi';

interface LoginFormProps {
  onSuccess?: () => void;
}

interface FirebaseError {
  code?: string;
  message: string;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [loginMethod, setLoginMethod] = useState<'employee-id' | 'email'>('employee-id');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { login } = useAuth();

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          return 'Không tìm thấy tài khoản với thông tin này';
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return 'Mật khẩu không đúng';
        case 'auth/email-already-in-use':
          return 'Email này đã được sử dụng';
        case 'auth/weak-password':
          return 'Mật khẩu phải có ít nhất 6 ký tự';
        case 'auth/invalid-email':
          return 'Email không hợp lệ';
        default:
          return firebaseError.message || 'Có lỗi xảy ra khi đăng nhập';
      }
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'Có lỗi xảy ra khi đăng nhập';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Kiểm tra xem identifier có hợp lệ không
      const employee = getEmployeeByIdOrEmail(identifier);
      if (!employee) {
        throw new Error('Không tìm thấy nhân viên với ID/email này');
      }

      setMessage('Đang đăng nhập...');
      
      // Đăng nhập với identifier và password (hoặc password mặc định)
      await login(identifier, password);
      
      setMessage('Đăng nhập thành công!');
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
      
    } catch (error: unknown) {
      console.error('Login error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Đăng nhập
        </h1>
      </div>

      {/* Login Method Toggle */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setLoginMethod('employee-id')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'employee-id'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Mã nhân viên
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'email'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Email
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {loginMethod === 'employee-id' ? 'Mã nhân viên' : 'Email'}
          </label>
          <div className="relative">
            {loginMethod === 'employee-id' ? (
              <FiUser className="absolute left-3 top-3 text-gray-400" />
            ) : (
              <FiMail className="absolute left-3 top-3 text-gray-400" />
            )}
            <input
              type={loginMethod === 'employee-id' ? 'text' : 'email'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
              placeholder={loginMethod === 'employee-id' ? 'Nhập mã nhân viên' : 'Nhập email'}
              required
            />
          </div>
          {loginMethod === 'employee-id'}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
            <span className="text-xs text-gray-500 ml-2">
              (Để trống để dùng mật khẩu mặc định)
            </span>
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
              placeholder="Mật khẩu (không bắt buộc)"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang đăng nhập...
            </div>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>

              <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

    </div>
  );
} 