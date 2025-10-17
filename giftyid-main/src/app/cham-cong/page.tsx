'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FiClock, FiUser, FiCheckCircle, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAttendanceCache } from '@/hooks/useAttendanceCache';
import { useVietnamTime } from '@/hooks/useVietnamTime';
import WorkingHoursStatus from '@/components/attendance/WorkingHoursStatus';

interface AttendanceData {
  employeeId: string;
  employeeName: string;
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  lateInfo?: {
    isLate: boolean;
    lateMinutes: number;
    message: string;
  };
  earlyInfo?: {
    isEarly: boolean;
    earlyMinutes: number;
    message: string;
    };
}

export default function AttendancePage() {
  const { employee } = useAuth();
  const { 
    isClient, 
    formattedTime, 
    formatTime
  } = useVietnamTime();
  const { 
    loading: cacheLoading, 
    fetchAttendanceStatus, 
    updateCache, 
    cleanup 
  } = useAttendanceCache();
  
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [note, setNote] = useState('');
  const [workReport, setWorkReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning'>('success');
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
  // Refs to prevent unnecessary re-renders and API calls
  const hasAutoLoadedRef = useRef(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastEmployeeIdRef = useRef<string>('');
  
  // Combined loading state
  const checkingStatus = cacheLoading;

  // Memoized values to prevent unnecessary re-calculations
  const isCheckInDisabled = useMemo(() => 
    loading || checkingStatus || attendanceData?.hasCheckedIn,
    [loading, checkingStatus, attendanceData?.hasCheckedIn]
  );

  const displayTime = useMemo(() => {
    return formattedTime();
  }, [formattedTime]);

  // Initialize employee data (optimized)
  useEffect(() => {
    // Auto-load employee data if available
    if (employee && !hasAutoLoadedRef.current) {
      setEmployeeId(employee.id);
      setEmployeeName(employee.name);
      hasAutoLoadedRef.current = true;
    }
  }, [employee]);

  // Optimized message display with cleanup
  const showMessage = useCallback((text: string, type: 'success' | 'error' | 'warning') => {
    setMessage(text);
    setMessageType(type);
    
    // Clear existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
      messageTimeoutRef.current = null;
    }, 8000);
  }, []);

  // Optimized attendance status check with caching and debouncing
  const checkAttendanceStatus = useCallback(async (forceRefresh = false) => {
    if (!employeeId) return;

    try {
      const result = await fetchAttendanceStatus(employeeId, employeeName, forceRefresh);
      setAttendanceData(result.data);
      if (!result.fromCache) {
        setLastSyncTime(new Date());
      }
    } catch {
      console.error('Error checking attendance status');
    }
  }, [employeeId, employeeName, fetchAttendanceStatus]);

  // Manual sync function with user feedback (optimized)
  const manualSyncData = useCallback(async () => {
    if (!employeeId) {
      showMessage('Vui lòng nhập mã nhân viên trước', 'error');
      return;
    }

    try {
      await checkAttendanceStatus(true); // Force refresh
      showMessage('Đồng bộ dữ liệu thành công', 'success');
    } catch {
      showMessage('Không thể đồng bộ dữ liệu từ Google Sheets', 'error');
    }
  }, [employeeId, checkAttendanceStatus, showMessage]);

  // Debounced effect for employee ID changes
  useEffect(() => {
    if (employeeId === lastEmployeeIdRef.current) return;
    lastEmployeeIdRef.current = employeeId;
    
    if (employeeId && employeeId.length >= 2) {
      const timeoutId = setTimeout(() => {
        checkAttendanceStatus();
      }, 500); // Debounce for 500ms
      
      return () => clearTimeout(timeoutId);
    } else {
      setAttendanceData(null);
    }
  }, [employeeId, checkAttendanceStatus]);

  // Optimized check-in handler
  const handleCheckIn = useCallback(async () => {
    if (!employeeId || !employeeName) {
      showMessage('Vui lòng nhập đầy đủ thông tin nhân viên', 'error');
      return;
    }

    if (attendanceData?.hasCheckedIn) {
      showMessage('Nhân viên này đã chấm công vào hôm nay rồi', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          employeeName,
          note,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const messageType = data.data.lateInfo?.isLate ? 'warning' : 'success';
        showMessage(data.message + (data.warning ? ` (${data.warning})` : ''), data.warning ? 'warning' : messageType);
        
        const newAttendanceData = {
          employeeId,
          employeeName,
          hasCheckedIn: true,
          hasCheckedOut: false,
          checkInTime: data.data.checkInTime,
          lateInfo: data.data.lateInfo,
        };
        
        setAttendanceData(newAttendanceData);
        
        // Update cache
        updateCache(employeeId, newAttendanceData);
        
        setNote('');
      } else {
        showMessage(data.error, 'error');
      }
    } catch {
      showMessage('Có lỗi xảy ra khi chấm công vào', 'error');
    } finally {
      setLoading(false);
    }
  }, [employeeId, employeeName, note, attendanceData?.hasCheckedIn, showMessage, updateCache]);

  // Optimized check-out handler
  const handleCheckOut = useCallback(async () => {
    if (!employeeId || !employeeName) {
      showMessage('Vui lòng nhập đầy đủ thông tin nhân viên', 'error');
      return;
    }

    if (!workReport.trim()) {
      showMessage('Vui lòng nhập báo cáo công việc trước khi chấm công ra', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/check-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          employeeName,
          note,
          workReport,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const messageType = data.data.earlyInfo?.isEarly ? 'warning' : 'success';
        showMessage(data.message + (data.warning ? ` (${data.warning})` : ''), data.warning ? 'warning' : messageType);
        
        setAttendanceData(prev => {
          const updated = prev ? {
            ...prev,
            hasCheckedOut: true,
            checkOutTime: data.data.checkOutTime,
            earlyInfo: data.data.earlyInfo,
          } : null;
          
          // Update cache
          if (updated) {
            updateCache(employeeId, updated);
          }
          
          return updated;
        });
        
        setNote('');
        setWorkReport('');
      } else {
        showMessage(data.error, 'error');
      }
    } catch {
      showMessage('Có lỗi xảy ra khi chấm công ra', 'error');
    } finally {
      setLoading(false);
    }
  }, [employeeId, employeeName, note, workReport, showMessage, updateCache]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      cleanup();
    };
  }, [cleanup]);

  // Don't render time-dependent content until client is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hệ thống chấm công
            </h1>
            <p className="text-gray-600">
              Đang tải...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hệ thống chấm công
          </h1>
          <p className="text-gray-600 mb-4">
            Thời gian hiện tại: {displayTime}
          </p>
          <WorkingHoursStatus className="max-w-md mx-auto" />
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : messageType === 'warning'
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {messageType === 'warning' && <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />}
            <span>{message}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Employee Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiUser className="mr-2 text-blue-600" />
              Thông tin nhân viên
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã nhân viên *
                </label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mã nhân viên"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên nhân viên *
                </label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên nhân viên"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ghi chú thêm (không bắt buộc)"
                />
              </div>
            </div>
          </div>

          {/* Attendance Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FiClock className="mr-2 text-green-600" />
                Chấm công
              </h2>
              <button
                onClick={manualSyncData}
                disabled={checkingStatus}
                className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                title="Đồng bộ dữ liệu"
              >
                <FiRefreshCw className={`mr-1 ${checkingStatus ? 'animate-spin' : ''}`} />
                Đồng bộ
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Check In Button */}
              <button
                onClick={handleCheckIn}
                disabled={isCheckInDisabled}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                  !isCheckInDisabled
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Đang xử lý...' : 
                 checkingStatus ? 'Đang kiểm tra...' :
                 attendanceData?.hasCheckedIn ? 'Đã chấm công vào' : 'Chấm công vào'}
              </button>

              {attendanceData?.hasCheckedIn && (
                <p className="text-sm text-green-600 text-center">
                  ✓ Đã chấm công vào hôm nay.
                </p>
              )}

              {/* Work Report for Check Out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Báo cáo công việc * <span className="text-red-500">(Bắt buộc)</span>
                </label>
                <textarea
                  value={workReport}
                  onChange={(e) => setWorkReport(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả ngắn gọn công việc đã thực hiện trong ngày..."
                  required
                />
              </div>

              {/* Check Out Button */}
              <button
                onClick={handleCheckOut}
                disabled={loading || checkingStatus}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                  !loading && !checkingStatus
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Đang xử lý...' : 
                 checkingStatus ? 'Đang kiểm tra...' : 'Chấm công ra'}
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Status */}
        {attendanceData && (attendanceData.hasCheckedIn || attendanceData.hasCheckedOut) && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FiCheckCircle className="mr-2 text-green-600" />
                Trạng thái chấm công hôm nay
              </h2>
              {lastSyncTime && (
                <p className="text-sm text-gray-500">
                  Đồng bộ lúc: {formatTime(lastSyncTime)}
                </p>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Check In Status */}
              <div className={`p-4 rounded-lg ${
                attendanceData.lateInfo?.isLate 
                  ? 'bg-orange-50 border border-orange-200' 
                  : 'bg-green-50'
              }`}>
                <h3 className={`font-semibold ${
                  attendanceData.lateInfo?.isLate 
                    ? 'text-orange-800' 
                    : 'text-green-800'
                }`}>
                  Chấm công vào
                </h3>
                <p className={`${
                  attendanceData.lateInfo?.isLate 
                    ? 'text-orange-600' 
                    : 'text-green-600'
                }`}>
                  {attendanceData.checkInTime || 'Chưa chấm công vào'}
                </p>
                {attendanceData.lateInfo && (
                  <p className={`text-sm mt-1 ${
                    attendanceData.lateInfo.isLate 
                      ? 'text-orange-600' 
                      : 'text-green-600'
                  }`}>
                    {attendanceData.lateInfo.message}
                  </p>
                )}
              </div>

              {/* Check Out Status */}
              <div className={`p-4 rounded-lg ${
                attendanceData.earlyInfo?.isEarly 
                  ? 'bg-orange-50 border border-orange-200' 
                  : 'bg-blue-50'
              }`}>
                <h3 className={`font-semibold ${
                  attendanceData.earlyInfo?.isEarly 
                    ? 'text-orange-800' 
                    : 'text-blue-800'
                }`}>
                  Chấm công ra
                </h3>
                <p className={`${
                  attendanceData.earlyInfo?.isEarly 
                    ? 'text-orange-600' 
                    : 'text-blue-600'
                }`}>
                  {attendanceData.checkOutTime || 'Chưa chấm công ra'}
                </p> 
                {attendanceData.earlyInfo && (
                  <p className={`text-sm mt-1 ${
                    attendanceData.earlyInfo.isEarly 
                      ? 'text-orange-600' 
                      : 'text-blue-600'
                  }`}>
                    {attendanceData.earlyInfo.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* No attendance data but employee logged in */}
        {!attendanceData && employeeId && employeeName && !checkingStatus && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center py-8">
              <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chưa có dữ liệu chấm công
              </h3>
              <p className="text-gray-500">
                Nhân viên {employeeName} chưa chấm công hôm nay
              </p>
            </div>
          </div>
        )}
      </div>
      </div>
    </ProtectedRoute>
  );
} 