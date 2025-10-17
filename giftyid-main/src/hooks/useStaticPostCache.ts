import { useState, useEffect, useRef } from 'react';
import { SinglePostResponse } from '@/types/blog';
import { shouldAllowRequest } from '@/utils/apiRateLimit';

interface StaticPostCacheState {
  data: SinglePostResponse | null;
  loading: boolean;
  error: string | null;
  lastFetch: number;
}

// Static cache - không bao giờ clear trừ khi manual
const staticPostCache = new Map<string, StaticPostCacheState>();
const CACHE_TTL = 30 * 60 * 1000; // 30 phút - cache rất lâu

// Track đã fetch chưa để tránh duplicate calls
const fetchingPosts = new Set<string>();

export function useStaticPostCache(slug: string) {
  // Sử dụng function thay vì useCallback để tránh dependency issues
  const getInitialState = (): StaticPostCacheState => {
    const cached = staticPostCache.get(slug);
    if (cached) {
      const now = Date.now();
      const isStale = (now - cached.lastFetch) > CACHE_TTL;
      
      if (cached.data && !isStale) {
        console.log(`📋 Found fresh cached post for ${slug}`);
        return cached;
      } else if (cached.data && isStale) {
        console.log(`⏰ Found stale cached post for ${slug}, will refresh`);
        return {
          ...cached,
          loading: false // Vẫn hiển thị data cũ, không loading
        };
      }
    }
    
    return {
      data: null,
      loading: true,
      error: null,
      lastFetch: 0
    };
  };

  const [state, setState] = useState<StaticPostCacheState>(() => getInitialState());
  const mountedRef = useRef(true);
  const lastSlugRef = useRef<string>('');

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Nếu slug không thay đổi và đã từng fetch, không fetch lại
    if (!slug || slug === lastSlugRef.current) {
      return;
    }

    lastSlugRef.current = slug;

    // Check cache mới nhất
    const cached = staticPostCache.get(slug);
    const now = Date.now();
    
    if (cached && cached.data && (now - cached.lastFetch) < CACHE_TTL) {
      console.log(`📋 Using fresh static cache for ${slug}`);
      if (mountedRef.current) {
        setState(cached);
      }
      return;
    }

    // Nếu đang fetch thì chỉ cần đợi
    if (fetchingPosts.has(slug)) {
      console.log(`⏳ Already fetching ${slug}, skipping duplicate request`);
      // Nếu có cached data (dù stale) thì hiển thị, không loading
      if (cached && cached.data && mountedRef.current) {
        setState(prev => ({ ...prev, loading: false }));
      }
      return;
    }

    // Start fetching
    fetchingPosts.add(slug);

    const fetchPost = async () => {
      try {
        // Nếu có data cũ, không hiển thị loading
        if (cached && cached.data) {
          setState(prev => ({ ...prev, loading: false }));
        } else {
          setState(prev => ({ ...prev, loading: true, error: null }));
        }

        const endpoint = `/api/blog?slug=${slug}`;
        
        // Kiểm tra rate limit
        if (!shouldAllowRequest(endpoint)) {
          console.log(`🚫 Rate limited request for ${slug}`);
          return;
        }
        
        console.log(`🔄 Fetching static post data for ${slug}`);
        
        const response = await fetch(endpoint, {
          headers: {
            'Cache-Control': 'max-age=1800', // 30 minutes
          },
        });

        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Bài viết không tồn tại' : 'Lỗi tải bài viết');
        }

        const data: SinglePostResponse = await response.json();
        
        const newState: StaticPostCacheState = {
          data,
          loading: false,
          error: null,
          lastFetch: now
        };

        // Save to static cache
        staticPostCache.set(slug, newState);
        
        if (mountedRef.current && lastSlugRef.current === slug) {
          setState(newState);
          console.log(`✅ Static cached post ${slug}`);
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
        const errorState: StaticPostCacheState = {
          data: cached?.data || null, // Giữ lại data cũ nếu có
          loading: false,
          error: errorMessage,
          lastFetch: now
        };

        staticPostCache.set(slug, errorState);
        
        if (mountedRef.current && lastSlugRef.current === slug) {
          setState(errorState);
          console.error(`❌ Error fetching post ${slug}:`, error);
        }
      } finally {
        fetchingPosts.delete(slug);
      }
    };

    fetchPost();

  }, [slug]); // Chỉ phụ thuộc vào slug

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    isStale: state.lastFetch > 0 && (Date.now() - state.lastFetch) > CACHE_TTL
  };
}

// Utility functions
export function clearStaticPostCache(slug?: string) {
  if (slug) {
    staticPostCache.delete(slug);
    fetchingPosts.delete(slug);
    console.log(`🧹 Cleared static cache for ${slug}`);
  } else {
    staticPostCache.clear();
    fetchingPosts.clear();
    console.log('🧹 Cleared all static post cache');
  }
}

export function getStaticPostCacheStats() {
  const stats = {
    totalEntries: staticPostCache.size,
    entries: Array.from(staticPostCache.entries()).map(([slug, state]) => ({
      slug,
      hasData: !!state.data,
      lastFetch: new Date(state.lastFetch).toISOString(),
      isStale: (Date.now() - state.lastFetch) > CACHE_TTL
    }))
  };
  
  console.log('📊 Static post cache stats:', stats);
  return stats;
}

// Preload function với cải thiện
export function preloadStaticPost(slug: string) {
  const cached = staticPostCache.get(slug);
  const now = Date.now();
  
  // Chỉ preload nếu chưa có data hoặc data đã stale
  if (!cached || !cached.data || (now - cached.lastFetch) > CACHE_TTL) {
    // Không preload nếu đang fetch
    if (!fetchingPosts.has(slug)) {
      fetchingPosts.add(slug);
      
      fetch(`/api/blog?slug=${slug}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`HTTP ${response.status}`);
        })
        .then(data => {
          staticPostCache.set(slug, {
            data,
            loading: false,
            error: null,
            lastFetch: now
          });
          console.log(`🚀 Preloaded static post: ${slug}`);
        })
        .catch(error => {
          console.error(`❌ Failed to preload ${slug}:`, error);
        })
        .finally(() => {
          fetchingPosts.delete(slug);
        });
    }
  }
} 