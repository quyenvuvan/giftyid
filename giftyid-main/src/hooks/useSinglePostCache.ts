import { useState, useEffect, useCallback, useRef } from 'react';
import { SinglePostResponse } from '@/types/blog';

interface SinglePostCacheState {
  data: SinglePostResponse | null;
  loading: boolean;
  error: string | null;
  lastFetch: number;
}

// Global cache cho single posts
const globalSinglePostCache = new Map<string, SinglePostCacheState>();
const CACHE_TTL = 15 * 60 * 1000; // 15 phút - cache lâu hơn cho single post

export function useSinglePostCache(slug: string) {
  const [state, setState] = useState<SinglePostCacheState>(() => {
    const cached = globalSinglePostCache.get(slug);
    return cached || {
      data: null,
      loading: true,
      error: null,
      lastFetch: 0
    };
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchedSlugsRef = useRef<Set<string>>(new Set());

  // Hàm refresh data
  const refreshPost = useCallback(() => {
    fetchedSlugsRef.current.delete(slug);
    setState(prev => ({ ...prev, loading: true, error: null }));
  }, [slug]);

  // Hàm clear cache cho post này
  const clearCache = useCallback(() => {
    globalSinglePostCache.delete(slug);
    fetchedSlugsRef.current.delete(slug);
    setState({
      data: null,
      loading: true,
      error: null,
      lastFetch: 0
    });
  }, [slug]);

  // Effect chính - chỉ chạy khi slug thay đổi
  useEffect(() => {
    if (!slug) return;

    // Kiểm tra đã fetch slug này chưa
    if (fetchedSlugsRef.current.has(slug)) {
      console.log(`🔄 Already fetched ${slug}, skipping...`);
      const cached = globalSinglePostCache.get(slug);
      if (cached) {
        setState(cached);
      }
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchPost = async () => {
      const now = Date.now();
      const cached = globalSinglePostCache.get(slug);
      
      // Kiểm tra cache còn hợp lệ không
      if (cached && cached.data && (now - cached.lastFetch) < CACHE_TTL) {
        console.log(`📋 Using cached post data for slug: ${slug}`);
        setState(cached);
        fetchedSlugsRef.current.add(slug);
        return;
      }

      // Tạo AbortController mới
      abortControllerRef.current = new AbortController();
      
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        console.log(`🔄 Fetching fresh post data for slug: ${slug}`);

        const response = await fetch(`/api/blog?slug=${slug}`, {
          signal: abortControllerRef.current.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Bài viết không tồn tại');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SinglePostResponse = await response.json();
        
        const newState: SinglePostCacheState = {
          data,
          loading: false,
          error: null,
          lastFetch: now
        };

        // Cập nhật global cache
        globalSinglePostCache.set(slug, newState);
        setState(newState);
        fetchedSlugsRef.current.add(slug);

        console.log(`✅ Post data cached for slug: ${slug}`);

      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Post fetch aborted');
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
        const errorState: SinglePostCacheState = {
          data: null,
          loading: false,
          error: errorMessage,
          lastFetch: now
        };

        globalSinglePostCache.set(slug, errorState);
        setState(errorState);
        fetchedSlugsRef.current.add(slug);
        console.error('❌ Post fetch error:', error);
      }
    };

    fetchPost();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [slug]); // CHỈ phụ thuộc vào slug

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refreshPost,
    clearCache,
    isStale: state.lastFetch > 0 && (Date.now() - state.lastFetch) > CACHE_TTL
  };
}

// Utility function để clear toàn bộ single post cache
export function clearAllSinglePostCache() {
  globalSinglePostCache.clear();
  console.log('🧹 All single post cache cleared');
}

// Utility function để get cache stats
export function getSinglePostCacheStats() {
  const stats = {
    totalEntries: globalSinglePostCache.size,
    entries: Array.from(globalSinglePostCache.entries()).map(([slug, state]) => ({
      slug,
      hasData: !!state.data,
      lastFetch: new Date(state.lastFetch).toISOString(),
      isStale: (Date.now() - state.lastFetch) > CACHE_TTL
    }))
  };
  
  console.log('📊 Single post cache stats:', stats);
  return stats;
}

// Utility function để preload một post
export function preloadPost(slug: string) {
  const cached = globalSinglePostCache.get(slug);
  const now = Date.now();
  
  if (!cached || (now - cached.lastFetch) > CACHE_TTL) {
    // Fetch in background
    fetch(`/api/blog?slug=${slug}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            console.warn(`⚠️ Post not found for preload: ${slug}`);
            // Cache the 404 error to prevent repeated requests
            globalSinglePostCache.set(slug, {
              data: null,
              loading: false,
              error: 'Bài viết không tồn tại',
              lastFetch: now
            });
            return null;
          }
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          globalSinglePostCache.set(slug, {
            data,
            loading: false,
            error: null,
            lastFetch: now
          });
          console.log(`🚀 Preloaded post: ${slug}`);
        }
      })
      .catch(error => {
        console.error(`❌ Failed to preload post ${slug}:`, error);
        // Cache the error to prevent repeated failed requests
        globalSinglePostCache.set(slug, {
          data: null,
          loading: false,
          error: error.message || 'Failed to load',
          lastFetch: now
        });
      });
  }
} 