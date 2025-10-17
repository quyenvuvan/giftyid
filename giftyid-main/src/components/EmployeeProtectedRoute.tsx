'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface EmployeeProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showMessage?: boolean;
}

export default function EmployeeProtectedRoute({ 
  children, 
  redirectTo = '/login',
  showMessage = true 
}: EmployeeProtectedRouteProps) {
  const { user, employee, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !employee)) {
      router.push(redirectTo);
    }
  }, [user, employee, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-adaptive-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-adaptive-gray">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!user || !employee) {
    return null; // Will redirect to login
  }

  return (
    <div>
      {showMessage && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                 Xin chào <strong>{employee.name}</strong> ({employee.id})
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
} 