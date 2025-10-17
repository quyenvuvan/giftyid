'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Employee, getEmployeeByIdOrEmail } from '@/data/employees';

interface AuthContextType {
  user: User | null;
  employee: Employee | null;
  loading: boolean;
  login: (identifier: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase auth is not available, set loading to false and return
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      // Tìm thông tin nhân viên dựa trên email
      if (user?.email) {
        const emp = getEmployeeByIdOrEmail(user.email);
        setEmployee(emp || null);
      } else {
        setEmployee(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (identifier: string, password?: string) => {
    if (!auth) {
      throw new Error('Firebase authentication is not available');
    }

    try {
      // Tìm nhân viên bằng ID hoặc email
      const employee = getEmployeeByIdOrEmail(identifier);
      
      if (!employee) {
        throw new Error('Không tìm thấy nhân viên với ID/email này');
      }

      // Sử dụng password được cung cấp hoặc password mặc định
      const finalPassword = password || employee.defaultPassword;
      
      // Chỉ thử đăng nhập, không tự động tạo tài khoản mới
      await signInWithEmailAndPassword(auth, employee.email, finalPassword);
    } catch (error) {
      // Ném lỗi ra ngoài mà không tự động tạo tài khoản
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/invalid-credential') {
        throw new Error('Tài khoản chưa được tạo hoặc thông tin đăng nhập không chính xác. Vui lòng liên hệ quản trị viên để được hỗ trợ.');
      }
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase authentication is not available');
    }
    
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    employee,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 