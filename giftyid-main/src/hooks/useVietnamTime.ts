import { useState, useEffect, useCallback, useRef } from 'react';

// Optimized Vietnam time functions with caching
const createVietnamTimeManager = () => {
  let lastCalculatedTime = 0;
  let cachedVietnamTime: Date;
  const formatCache = new Map<string, string>();
  const MAX_FORMAT_CACHE_SIZE = 100;

  const getVietnamTime = (): Date => {
    const now = Date.now();
    
    // Cache time calculation for 1 second to reduce CPU usage
    if (now - lastCalculatedTime < 1000 && cachedVietnamTime) {
      return new Date(cachedVietnamTime.getTime() + (now - lastCalculatedTime));
    }
    
    try {
      const currentTime = new Date();
      const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
      cachedVietnamTime = new Date(utc + (7 * 3600000)); // Vietnam is UTC+7
      lastCalculatedTime = now;
      
      if (isNaN(cachedVietnamTime.getTime())) {
        cachedVietnamTime = currentTime;
      }
      
      return cachedVietnamTime;
    } catch (error) {
      console.error('Error getting Vietnam time:', error);
      cachedVietnamTime = new Date();
      lastCalculatedTime = now;
      return cachedVietnamTime;
    }
  };

  const formatVietnamTime = (date: Date): string => {
    if (!date || isNaN(date.getTime())) {
      date = getVietnamTime();
    }
    
    const timeKey = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    // Check cache first
    if (formatCache.has(timeKey)) {
      return formatCache.get(timeKey)!;
    }
    
    try {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formatted = `${hours}:${minutes}:${seconds}`;
      
      // Manage cache size
      if (formatCache.size >= MAX_FORMAT_CACHE_SIZE) {
        const firstKey = formatCache.keys().next().value;
        if (firstKey) {
          formatCache.delete(firstKey);
        }
      }
      
      formatCache.set(timeKey, formatted);
      return formatted;
    } catch (error) {
      console.error('Error formatting Vietnam time:', error);
      return '00:00:00';
    }
  };

  const formatVietnamDate = (date: Date): string => {
    if (!date || isNaN(date.getTime())) {
      date = getVietnamTime();
    }
    
    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formatting Vietnam date:', error);
      return '01/01/2024';
    }
  };

  const formatVietnamDateTime = (date: Date): string => {
    return `${formatVietnamDate(date)} ${formatVietnamTime(date)}`;
  };

  const clearFormatCache = () => {
    formatCache.clear();
  };

  return {
    getVietnamTime,
    formatVietnamTime,
    formatVietnamDate,
    formatVietnamDateTime,
    clearFormatCache
  };
};

// Global instance to share across components
const vietnamTimeManager = createVietnamTimeManager();

export function useVietnamTime(updateInterval = 1000) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Initialize client-side time
  useEffect(() => {
    setIsClient(true);
    
    try {
      const initialTime = vietnamTimeManager.getVietnamTime();
      if (mountedRef.current) {
        setCurrentTime(initialTime);
      }
    } catch (error) {
      console.error('Error setting initial Vietnam time:', error);
      if (mountedRef.current) {
        setCurrentTime(new Date());
      }
    }
  }, []);

  // Update time at specified interval
  useEffect(() => {
    if (!isClient) return;
    
    const updateTime = () => {
      try {
        const newTime = vietnamTimeManager.getVietnamTime();
        if (mountedRef.current) {
          setCurrentTime(newTime);
        }
      } catch (error) {
        console.error('Error updating Vietnam time:', error);
      }
    };

    intervalRef.current = setInterval(updateTime, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isClient, updateInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Memoized formatted time strings
  const formattedTime = useCallback(() => {
    return currentTime ? vietnamTimeManager.formatVietnamTime(currentTime) : 'Đang tải...';
  }, [currentTime]);

  const formattedDate = useCallback(() => {
    return currentTime ? vietnamTimeManager.formatVietnamDate(currentTime) : 'Đang tải...';
  }, [currentTime]);

  const formattedDateTime = useCallback(() => {
    return currentTime ? vietnamTimeManager.formatVietnamDateTime(currentTime) : 'Đang tải...';
  }, [currentTime]);

  // Utility functions
  const getVietnamTime = useCallback(() => {
    return vietnamTimeManager.getVietnamTime();
  }, []);

  const formatTime = useCallback((date: Date) => {
    return vietnamTimeManager.formatVietnamTime(date);
  }, []);

  const formatDate = useCallback((date: Date) => {
    return vietnamTimeManager.formatVietnamDate(date);
  }, []);

  const formatDateTime = useCallback((date: Date) => {
    return vietnamTimeManager.formatVietnamDateTime(date);
  }, []);

  const isWorkingHours = useCallback((time?: Date) => {
    const checkTime = time || currentTime;
    if (!checkTime) return false;
    
    const hours = checkTime.getHours();
    return hours >= 8 && hours < 18; // 8 AM to 6 PM
  }, [currentTime]);

  const getWorkingHoursStatus = useCallback((time?: Date) => {
    const checkTime = time || currentTime;
    if (!checkTime) return { isWorking: false, message: 'Không xác định được thời gian' };
    
    const hours = checkTime.getHours();
    const minutes = checkTime.getMinutes();
    
    if (hours < 8) {
      const minutesUntilWork = (8 - hours - 1) * 60 + (60 - minutes);
      return { 
        isWorking: false, 
        message: `Chưa đến giờ làm việc (còn ${Math.floor(minutesUntilWork / 60)}h ${minutesUntilWork % 60}p)` 
      };
    } else if (hours >= 18) {
      return { 
        isWorking: false, 
        message: 'Đã hết giờ làm việc' 
      };
    } else {
      return { 
        isWorking: true, 
        message: 'Trong giờ làm việc' 
      };
    }
  }, [currentTime]);

  return {
    currentTime,
    isClient,
    formattedTime,
    formattedDate,
    formattedDateTime,
    getVietnamTime,
    formatTime,
    formatDate,
    formatDateTime,
    isWorkingHours,
    getWorkingHoursStatus
  };
} 