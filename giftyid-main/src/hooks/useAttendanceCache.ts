import { useState, useCallback, useRef } from 'react';

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

interface CacheEntry {
  data: AttendanceData | null;
  timestamp: number;
}

// Global cache to persist across component re-renders
const globalAttendanceCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 50; // Limit cache size

export function useAttendanceCache() {
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Clean old cache entries
  const cleanCache = useCallback(() => {
    const now = Date.now();
    const entries = Array.from(globalAttendanceCache.entries());
    
    // Remove expired entries
    entries.forEach(([key, entry]) => {
      if (now - entry.timestamp > CACHE_DURATION) {
        globalAttendanceCache.delete(key);
      }
    });

    // If still too large, remove oldest entries
    if (globalAttendanceCache.size > MAX_CACHE_SIZE) {
      const sortedEntries = entries
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, globalAttendanceCache.size - MAX_CACHE_SIZE);
      
      sortedEntries.forEach(([key]) => {
        globalAttendanceCache.delete(key);
      });
    }
  }, []);

  const getCacheKey = useCallback((employeeId: string) => {
    return `${employeeId}-${new Date().toDateString()}`;
  }, []);

  const getFromCache = useCallback((employeeId: string): AttendanceData | null => {
    const cacheKey = getCacheKey(employeeId);
    const cached = globalAttendanceCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      return cached.data;
    }
    
    return null;
  }, [getCacheKey]);

  const setToCache = useCallback((employeeId: string, data: AttendanceData | null) => {
    cleanCache();
    const cacheKey = getCacheKey(employeeId);
    globalAttendanceCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }, [getCacheKey, cleanCache]);

  const fetchAttendanceStatus = useCallback(async (
    employeeId: string, 
    employeeName: string,
    forceRefresh = false
  ): Promise<{ data: AttendanceData | null; fromCache: boolean }> => {
    if (!employeeId) {
      return { data: null, fromCache: false };
    }

    // Check cache first
    if (!forceRefresh) {
      const cachedData = getFromCache(employeeId);
      if (cachedData !== null) {
        return { data: cachedData, fromCache: true };
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setLoading(true);
    
    try {
      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId }),
        signal: abortControllerRef.current.signal,
      });

      const result = await response.json();

      if (result.success) {
        const data = result.data;
        const attendanceInfo = (data.hasCheckedIn || data.hasCheckedOut) ? {
          employeeId,
          employeeName: employeeName || 'Nhân viên',
          hasCheckedIn: data.hasCheckedIn,
          hasCheckedOut: data.hasCheckedOut,
          checkInTime: data.checkInTime,
          checkOutTime: data.checkOutTime,
          lateInfo: data.lateInfo,
          earlyInfo: data.earlyInfo,
        } : null;
        
        // Update cache
        setToCache(employeeId, attendanceInfo);
        
        return { data: attendanceInfo, fromCache: false };
      }
      
      return { data: null, fromCache: false };
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error fetching attendance status:', error);
        throw error;
      }
      return { data: null, fromCache: false };
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [getFromCache, setToCache]);

  const updateCache = useCallback((employeeId: string, data: AttendanceData | null) => {
    setToCache(employeeId, data);
  }, [setToCache]);

  const clearCache = useCallback((employeeId?: string) => {
    if (employeeId) {
      const cacheKey = getCacheKey(employeeId);
      globalAttendanceCache.delete(cacheKey);
    } else {
      globalAttendanceCache.clear();
    }
  }, [getCacheKey]);

  const getCacheStats = useCallback(() => {
    return {
      size: globalAttendanceCache.size,
      keys: Array.from(globalAttendanceCache.keys()),
      oldestEntry: Math.min(...Array.from(globalAttendanceCache.values()).map(v => v.timestamp)),
      newestEntry: Math.max(...Array.from(globalAttendanceCache.values()).map(v => v.timestamp))
    };
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    loading,
    fetchAttendanceStatus,
    updateCache,
    clearCache,
    getCacheStats,
    cleanup
  };
} 