'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

export default function LogoutButton() {
  const { user, employee, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show login link if not authenticated
  if (!user) {
    return (
      <Link href="/login" className="flex items-center text-sm text-adaptive-heading">
        <FiUser className="text-primary" />
        <span className="ml-1 hidden md:inline">Đăng nhập</span>
      </Link>
    );
  }

  // Show user info and logout button if authenticated
  return (
    <div className="flex items-center space-x-2">
      {employee && (
        <span className="text-sm text-adaptive-heading hidden md:inline">
          Xin chào, <strong>{employee.name}</strong>
        </span>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 px-2 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
        title="Đăng xuất"
      >
        <FiLogOut className="w-4 h-4" />
        <span className="hidden md:inline">Đăng xuất</span>
      </button>
    </div>
  );
} 