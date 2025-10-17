'use client';

import { FaCheckCircle, FaTimes, FaClock } from 'react-icons/fa';

interface AttendanceChartProps {
  weeklyDetails: Record<string, { checkedIn: boolean; checkedOut: boolean }> | undefined;
  weekRange: { start: string; end: string } | undefined;
  attendedDays: number;
  totalWorkdays: number;
}

export default function AttendanceChart({ weeklyDetails, weekRange, attendedDays, totalWorkdays }: AttendanceChartProps) {
  // Get current week dates (Monday to Friday)
  const getWeekDates = () => {
    const startDate = new Date();
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(startDate.setDate(diff));
    
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const formatDateForComparison = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const weekDates = getWeekDates();
  const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];

  // Function to check if we should mark as absent (after work hours or end of day)
  const shouldMarkAsAbsent = (date: Date, currentTime: Date): boolean => {
    // If date is in the future, don't mark as absent
    if (date > currentTime) {
      return false;
    }
    
    // If date is today, only mark as absent after 18:00 (end of work day)
    if (date.toDateString() === currentTime.toDateString()) {
      const currentHour = currentTime.getHours();
      return currentHour >= 18; // After 6 PM
    }
    
    // If date is in the past, mark as absent
    return true;
  };

  const getStatusIcon = (date: Date) => {
    const dateStr = formatDateForComparison(date);
    const details = weeklyDetails?.[dateStr];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (details?.checkedIn && details?.checkedOut) {
      return <FaCheckCircle className="text-green-500 text-xl" />;
    } else if (details?.checkedIn) {
      return <FaClock className="text-yellow-500 text-xl" />;
    } else if (shouldMarkAsAbsent(date, today)) {
      return <FaTimes className="text-red-500 text-xl" />;
    } else if (isToday) {
      return <FaClock className="text-gray-400 text-xl" />;
    } else {
      return <div className="w-5 h-5 rounded-full bg-gray-200"></div>;
    }
  };

  const getStatusText = (date: Date) => {
    const dateStr = formatDateForComparison(date);
    const details = weeklyDetails?.[dateStr];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (details?.checkedIn && details?.checkedOut) {
      return 'Hoàn thành';
    } else if (details?.checkedIn) {
      return 'Đã vào';
    } else if (shouldMarkAsAbsent(date, today)) {
      return 'Vắng mặt';
    } else if (isToday) {
      return 'Hôm nay';
    } else {
      return 'Chưa đến';
    }
  };

  const getStatusColor = (date: Date) => {
    const dateStr = formatDateForComparison(date);
    const details = weeklyDetails?.[dateStr];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (details?.checkedIn && details?.checkedOut) {
      return 'bg-green-50 border-green-200 text-green-800';
    } else if (details?.checkedIn) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    } else if (shouldMarkAsAbsent(date, today)) {
      return 'bg-red-50 border-red-200 text-red-800';
    } else if (isToday) {
      return 'bg-blue-50 border-blue-200 text-blue-800';
    } else {
      return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Lịch chấm công tuần</h3>
        <div className="text-sm text-gray-500">
          {weekRange?.start || 'N/A'} - {weekRange?.end || 'N/A'}
        </div>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {weekDates.map((date, dayIndex) => (
          <div key={dayIndex} className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(date)}`}>
            <div className="text-center">
              <div className="text-xs font-medium mb-2">{dayNames[dayIndex]}</div>
              <div className="text-sm font-semibold mb-2">
                {date.getDate()}/{date.getMonth() + 1}
              </div>
              <div className="flex justify-center mb-2">
                {getStatusIcon(date)}
              </div>
              <div className="text-xs font-medium">
                {getStatusText(date)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Tiến độ tuần</span>
          <span className="text-sm font-semibold text-gray-800">
            {attendedDays}/{totalWorkdays} ngày
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              (attendedDays / totalWorkdays) >= 0.8 ? 'bg-green-500' :
              (attendedDays / totalWorkdays) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${(attendedDays / totalWorkdays) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span className="text-gray-600">Hoàn thành</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-yellow-500" />
            <span className="text-gray-600">Đã chấm công vào</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTimes className="text-red-500" />
            <span className="text-gray-600">Vắng mặt</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-gray-600">Chưa đến</span>
          </div>
        </div>
      </div>
    </div>
  );
} 