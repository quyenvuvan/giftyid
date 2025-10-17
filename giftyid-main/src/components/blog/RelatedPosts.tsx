import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  currentSlug: string;
}

// Static cache cho related posts để tránh gọi API liên tục
let relatedPostsCache: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const RelatedPosts = memo(function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch related posts nếu cần thiết
  useEffect(() => {
    // Không fetch nếu không có slug
    if (!currentSlug) {
      return;
    }

    const fetchRelatedPosts = async () => {
      const now = Date.now();
      
      // Sử dụng cache nếu còn hợp lệ
      if (relatedPostsCache && (now - cacheTimestamp) < CACHE_TTL) {
        const filtered = relatedPostsCache
          .filter(p => p.slug !== currentSlug)
          .slice(0, 3);
        setRelatedPosts(filtered);
        return;
      }

      // Chỉ fetch nếu cache hết hạn hoặc chưa có cache và chưa loading
      if (!loading) {
        setLoading(true);
        try {
          const response = await fetch('/api/blog?limit=10', {
            headers: {
              'Cache-Control': 'max-age=600', // 10 minutes
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.posts) {
              relatedPostsCache = data.posts;
              cacheTimestamp = now;
              
              const filtered = data.posts
                .filter((p: BlogPost) => p.slug !== currentSlug)
                .slice(0, 3);
              setRelatedPosts(filtered);
            }
          }
        } catch (error) {
          console.error('Error fetching related posts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRelatedPosts();
  }, [currentSlug]); // Chỉ phụ thuộc vào currentSlug

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Không render nếu đang loading hoặc không có posts
  if (loading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Related Posts - Responsive */}
      <div className="card p-4 md:p-6 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-adaptive-heading mb-4">Bài viết liên quan</h3>
        
        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:block space-y-4">
          {relatedPosts.map((relatedPost: BlogPost) => (
            <Link 
              key={relatedPost.id} 
              href={`/blog/${relatedPost.slug}`} 
              className="flex gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 p-2 rounded transition-colors group"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src={relatedPost.thumbnail}
                  alt={relatedPost.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs md:text-sm font-medium text-adaptive-heading line-clamp-2 group-hover:text-primary transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-xs text-adaptive-gray mt-1">
                  {formatDate(relatedPost.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Layout - Grid */}
        <div className="sm:hidden grid grid-cols-1 gap-3">
          {relatedPosts.map((relatedPost: BlogPost) => (
            <Link 
              key={relatedPost.id} 
              href={`/blog/${relatedPost.slug}`} 
              className="block hover:bg-neutral-50 dark:hover:bg-neutral-700 p-3 rounded transition-colors group"
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-16 flex-shrink-0">
                  <Image
                    src={relatedPost.thumbnail}
                    alt={relatedPost.title}
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-adaptive-heading line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {relatedPost.title}
                  </h4>
                  <p className="text-xs text-adaptive-gray">
                    {formatDate(relatedPost.date)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
});

// Utility function để clear cache
export function clearRelatedPostsCache() {
  relatedPostsCache = null;
  cacheTimestamp = 0;
}

export default RelatedPosts; 