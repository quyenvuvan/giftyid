'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import EmployeeProtectedRoute from '@/components/EmployeeProtectedRoute';
import AttendanceChart from '@/components/AttendanceChart';
import { FaClock, FaBlog, FaUser, FaCheckCircle, FaExclamationTriangle, FaTimes, FaSync } from 'react-icons/fa';
import { useEffect, useState, useCallback } from 'react';

interface AttendanceStats {
  currentWeek: {
    totalWorkdays: number;
    attendedDays: number;
    attendanceRate: number;
    missingDays: Array<{
      date: string;
      dayName: string;
    }>;
    weekRange: {
      start: string;
      end: string;
    };
  };
  today: {
    hasCheckedIn: boolean;
    hasCheckedOut: boolean;
    status: string;
    date: string;
  };
  weeklyDetails: Record<string, { checkedIn: boolean; checkedOut: boolean }>;
}

export default function DashboardPage() {
  const { employee } = useAuth();
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());


  const [error, setError] = useState<string | null>(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch attendance statistics
  const fetchAttendanceData = useCallback(async (weekStart?: string) => {
    if (!employee?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        employeeId: employee.id
      });
      
      if (weekStart) {
        params.append('weekStartDate', weekStart);
      }
      
      const response = await fetch(`/api/attendance-stats?${params}`);
      const result = await response.json();
      
      console.log('API Response:', result);
      
      if (result.success) {
        setAttendanceStats(result.data);
      } else {
        throw new Error(result.error || 'Không thể lấy dữ liệu chấm công');
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }, [employee?.id]);

  // Fetch attendance statistics
  useEffect(() => {
    if (employee?.id) {
      fetchAttendanceData();
    }
  }, [employee?.id, fetchAttendanceData]);

  // Manual refresh function
  const refreshAttendanceStats = async (weekStart?: string) => {
    if (!employee?.id) return;

    setLoading(true);
    try {
      console.log('Manual refresh for:', employee.id, 'Week:', weekStart || 'current');
      const response = await fetch('/api/attendance-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          employeeId: employee.id,
          ...(weekStart && { weekStartDate: weekStart })
        }),
      });

      const result = await response.json();
      console.log('Manual refresh result:', result);
      
      if (result.success) {
        setAttendanceStats(result.data);
      }
    } catch (error) {
      console.error('Error refreshing attendance stats:', error);
    } finally {
      setLoading(false);
    }
  };



  const menuItems = [
    {
      title: 'Chấm công',
      description: 'Chấm công vào/ra, xem lịch sử chấm công',
      icon: FaClock,
      href: '/cham-cong',
      color: 'bg-blue-500 hover:bg-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Quản lý Blog',
      description: 'Tạo, chỉnh sửa và quản lý bài viết blog',
      icon: FaBlog,
      href: '/blog',
      color: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-green-500'
    }
  ];

  const getAttendanceStatusColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceStatusBg = (rate: number) => {
    if (rate >= 80) return 'bg-green-50 border-green-200';
    if (rate >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const formatVietnamTime = (date: Date) => {
    return date.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <EmployeeProtectedRoute showMessage={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Xin chào, {employee?.name}!
                  </h1>
                  <p className="text-gray-600">
                    Mã nhân viên: <span className="font-medium">{employee?.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                      Hệ thống quản lý nhân viên Gifty Technology
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Thời gian hiện tại</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatVietnamTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-red-500" />
                <span className="text-red-700 font-medium">Lỗi:</span>
              </div>
              <p className="text-red-600 mt-1">{error}</p>

            </div>
          )}

          {/* Attendance Statistics */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Thống kê chấm công tuần này</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchAttendanceData()}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                >
                  <FaSync className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                

              </div>
            </div>
            
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="grid grid-cols-5 gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ) : attendanceStats && attendanceStats.currentWeek && attendanceStats.currentWeek.weekRange ? (
              <div className="space-y-6">
                {/* Attendance Chart */}
                <AttendanceChart 
                  weeklyDetails={attendanceStats.weeklyDetails || {}}
                  weekRange={attendanceStats.currentWeek.weekRange}
                  attendedDays={attendanceStats.currentWeek.attendedDays || 0}
                  totalWorkdays={attendanceStats.currentWeek.totalWorkdays || 5}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Weekly Overview */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Tổng quan tuần</h3>
                      <span className="text-sm text-gray-500">
                        {attendanceStats.currentWeek.weekRange?.start || 'N/A'} - {attendanceStats.currentWeek.weekRange?.end || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {attendanceStats.currentWeek.attendedDays || 0}/{attendanceStats.currentWeek.totalWorkdays || 5}
                        </p>
                        <p className="text-sm text-gray-600">Ngày đi làm</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${getAttendanceStatusColor(attendanceStats.currentWeek.attendanceRate || 0)}`}>
                          {attendanceStats.currentWeek.attendanceRate || 0}%
                        </p>
                        <p className="text-sm text-gray-600">Tỷ lệ chấm công</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Tiến độ tuần</span>
                        <span>{attendanceStats.currentWeek.attendedDays || 0}/{attendanceStats.currentWeek.totalWorkdays || 5} ngày</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            (attendanceStats.currentWeek.attendanceRate || 0) >= 80 ? 'bg-green-500' :
                            (attendanceStats.currentWeek.attendanceRate || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${attendanceStats.currentWeek.attendanceRate || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Missing Days Alert */}
                    {attendanceStats.currentWeek.missingDays && attendanceStats.currentWeek.missingDays.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FaExclamationTriangle className="text-red-500 mr-2" />
                          <span className="font-medium text-red-800">Ngày chưa chấm công:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {attendanceStats.currentWeek.missingDays.map((day, index) => (
                            <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                              {day.dayName} ({day.date})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Today's Status */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Hôm nay</h3>
                    
                    <div className={`p-4 rounded-lg border ${getAttendanceStatusBg(
                      (attendanceStats.today?.hasCheckedIn && attendanceStats.today?.hasCheckedOut) ? 100 : 
                      attendanceStats.today?.hasCheckedIn ? 50 : 0
                    )} mb-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium dark:text-black">Trạng thái:</span>
                        {(attendanceStats.today?.hasCheckedIn && attendanceStats.today?.hasCheckedOut) ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : attendanceStats.today?.hasCheckedIn ? (
                          <FaClock className="text-yellow-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium dark:text-black">{attendanceStats.today?.status || 'Chưa có thông tin'}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Chấm công vào:</span>
                        {attendanceStats.today?.hasCheckedIn ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-400" />
                        )}
                      </div>
                <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Chấm công ra:</span>
                        {attendanceStats.today?.hasCheckedOut ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center py-8">
                  <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Không thể tải thống kê chấm công
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Đang kiểm tra kết nối và dữ liệu...
                  </p>
                  
                  {/* Debug info */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Thông tin debug:</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Employee ID: {employee?.id || 'N/A'}</p>
                      <p>• Employee Name: {employee?.name || 'N/A'}</p>
                      <p>• Thời gian: {formatVietnamTime(currentTime)}</p>
                      <p>• Trạng thái: {attendanceStats ? 'Có data nhưng không đầy đủ' : 'Không có data'}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => refreshAttendanceStats()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Menu */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu chính</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gray-100 group-hover:bg-gray-200 p-3 rounded-full transition-colors">
                        <item.icon className={`text-2xl ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Nhấn để truy cập</span>
                      <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/cham-cong"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl text-center transition-colors group"
            >
              <FaClock className="text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-lg">Chấm công ngay</p>
              <p className="text-sm opacity-90 mt-1">
                {attendanceStats?.today?.hasCheckedIn ? 'Chấm công ra' : 'Chấm công vào'}
              </p>
            </Link>
            <Link
              href="/blog/create"
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl text-center transition-colors group"
            >
              <FaBlog className="text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-lg">Tạo bài viết mới</p>
              <p className="text-sm opacity-90 mt-1">Viết blog cho công ty</p>
            </Link>
          </div>
        </div>
      </div>
    </EmployeeProtectedRoute>
  );
} 