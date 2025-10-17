import { useState, useEffect, useCallback, useRef } from 'react';
import { BlogResponse } from '@/types/blog';

interface BlogCacheOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

interface BlogCacheState {
  data: BlogResponse | null;
  loading: boolean;
  error: string | null;
  lastFetch: number;
}

// Global cache để share giữa các components
const globalBlogCache = new Map<string, BlogCacheState>();
const CACHE_TTL = 10 * 60 * 1000; // 10 phút - tăng cache time
const DEBOUNCE_DELAY = 800; // 800ms debounce - tăng debounce time

export function useBlogCache(options: BlogCacheOptions = {}) {
  const { page = 1, limit = 9, category = '', search = '' } = options;
  
  // Tạo cache key duy nhất
  const cacheKey = `blog-${page}-${limit}-${category}-${search}`;
  
  const [state, setState] = useState<BlogCacheState>(() => {
    const cached = globalBlogCache.get(cacheKey);
    return cached || {
      data: null,
      loading: true,
      error: null,
      lastFetch: 0
    };
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hàm fetch data với debouncing
  const fetchBlogData = useCallback(async (immediate = false) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const executeFetch = async () => {
      const now = Date.now();
      const cached = globalBlogCache.get(cacheKey);
      
      // Kiểm tra cache còn hợp lệ không
      if (cached && cached.data && (now - cached.lastFetch) < CACHE_TTL && !immediate) {
        setState(cached);
        return;
      }

      // Tạo AbortController mới
      abortControllerRef.current = new AbortController();
      
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (category) params.append('category', category);
        if (search) params.append('search', search);

        const response = await fetch(`/api/blog?${params}`, {
          signal: abortControllerRef.current.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogResponse = await response.json();
        
        const newState: BlogCacheState = {
          data,
          loading: false,
          error: null,
          lastFetch: now
        };

        // Cập nhật global cache
        globalBlogCache.set(cacheKey, newState);
        setState(newState);

        console.log(`✅ Blog data cached for key: ${cacheKey}`);

      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Blog fetch aborted');
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
        const errorState: BlogCacheState = {
          data: null,
          loading: false,
          error: errorMessage,
          lastFetch: now
        };

        globalBlogCache.set(cacheKey, errorState);
        setState(errorState);
        console.error('❌ Blog fetch error:', error);
      }
    };

    if (immediate) {
      await executeFetch();
    } else {
      // Debounce cho search và filter
      debounceTimerRef.current = setTimeout(executeFetch, DEBOUNCE_DELAY);
    }
  }, [cacheKey, page, limit, category, search]);

  // Hàm refresh data
  const refreshData = useCallback(() => {
    return fetchBlogData(true);
  }, [fetchBlogData]);

  // Hàm clear cache
  const clearCache = useCallback(() => {
    globalBlogCache.delete(cacheKey);
    setState({
      data: null,
      loading: true,
      error: null,
      lastFetch: 0
    });
  }, [cacheKey]);

  // Effect để fetch data khi options thay đổi
  useEffect(() => {
    fetchBlogData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [fetchBlogData]);

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refreshData,
    clearCache,
    isStale: state.lastFetch > 0 && (Date.now() - state.lastFetch) > CACHE_TTL
  };
}

// Utility function để clear toàn bộ blog cache
export function clearAllBlogCache() {
  globalBlogCache.clear();
  console.log('🧹 All blog cache cleared');
}

// Utility function để get cache stats
export function getBlogCacheStats() {
  const stats = {
    totalEntries: globalBlogCache.size,
    entries: Array.from(globalBlogCache.entries()).map(([key, state]) => ({
      key,
      hasData: !!state.data,
      lastFetch: new Date(state.lastFetch).toISOString(),
      isStale: (Date.now() - state.lastFetch) > CACHE_TTL
    }))
  };
  
  console.log('📊 Blog cache stats:', stats);
  return stats;
} 