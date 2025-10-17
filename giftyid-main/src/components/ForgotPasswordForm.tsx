'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getEmployeeByIdOrEmail } from '@/data/employees';
import { FiMail, FiArrowLeft, FiUser } from 'react-icons/fi';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Check if Firebase auth is available
      if (!auth) {
        throw new Error('Firebase authentication is not available');
      }

      // Kiểm tra xem identifier có hợp lệ không
      const employee = getEmployeeByIdOrEmail(identifier);
      if (!employee) {
        throw new Error('Không tìm thấy nhân viên với ID/email này');
      }

      // Kiểm tra email người dùng nhập có hợp lệ không
      if (!userEmail || !userEmail.includes('@')) {
        throw new Error('Vui lòng nhập địa chỉ email hợp lệ');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        throw new Error('Định dạng email không hợp lệ');
      }

      // Gửi email reset password đến email người dùng nhập
      await sendPasswordResetEmail(auth, userEmail);
      
      setEmailSent(true);
      setMessage(`Đã gửi link đặt lại mật khẩu tới email: ${userEmail}`);
      
    } catch (error: unknown) {
      console.error('Password reset error:', error);
      
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/user-not-found') {
        setError('Tài khoản chưa được tạo. Vui lòng đăng nhập lần đầu để tạo tài khoản.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Có lỗi xảy ra khi gửi email đặt lại mật khẩu');
      }
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Email đã được gửi!
          </h1>
          <p className="text-gray-600">
            Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
          >
            Quay lại đăng nhập
          </Link>
          
          <button
            onClick={() => {
              setEmailSent(false);
              setMessage('');
              setIdentifier('');
              setUserEmail('');
            }}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Gửi lại email
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">📧 Lưu ý:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Kiểm tra cả thư mục spam/junk nếu không thấy email</li>
            <li>• Link đặt lại mật khẩu có hiệu lực trong 1 giờ</li>
            <li>• Nếu không nhận được email, hãy thử gửi lại</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quên mật khẩu
          </h1>
          <p className="text-gray-600">
            Nhập thông tin nhân viên và email cá nhân để nhận link đặt lại mật khẩu
          </p>
        </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID nhân viên hoặc Email công ty
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập ID hoặc email công ty"
              required
            />
          </div>
        
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email cá nhân (Gmail) *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@gmail.com"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Link đặt lại mật khẩu sẽ được gửi tới email này
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang gửi email...
            </div>
          ) : (
            'Gửi link đặt lại mật khẩu'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <FiArrowLeft className="w-4 h-4 mr-1" />
          Quay lại đăng nhập
        </Link>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">💡 Hướng dẫn:</h3>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• Nhập ID nhân viên (VD: nmhung) hoặc email công ty (nmhung@giftytech.com)</li>
          <li>• Nhập email cá nhân (Gmail) của bạn để nhận link đặt lại mật khẩu</li>
          <li>• Hệ thống sẽ gửi link về email cá nhân bạn đã nhập</li>
          <li>• Chỉ nhân viên trong danh sách mới có thể đặt lại mật khẩu</li>
        </ul>
      </div>
    </div>
  );
} 