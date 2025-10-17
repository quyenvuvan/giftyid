'use client';

import { useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// import { BlogPost } from '@/types/blog'; // Removed unused import
import { FaCalendarAlt, FaUser, FaEye, FaStar, FaArrowLeft, FaShare, FaTags, FaEdit } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useStaticPostCache } from '@/hooks/useStaticPostCache';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { renderMarkdownToHTML } from '@/utils/markdownRenderer';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { employee } = useAuth();
  const renderCountRef = useRef(0);
  
  // Debug: Track re-renders
  useEffect(() => {
    renderCountRef.current += 1;
    console.log(`🔄 BlogPostPage render #${renderCountRef.current} for slug: ${slug}`);
  });
  
  // Sử dụng static cache hook cho single post - KHÔNG BAO GIỜ GỌI API LIÊN TỤC
  const { data: postData, loading, error } = useStaticPostCache(slug);
  
  // Memoize post data để tránh re-render
  const memoizedPost = useMemo(() => {
    const post = postData?.post;
    if (post) {
      console.log(`📋 Post data memoized for ${slug}: ${post.title}`);
    }
    return post;
  }, [postData?.post, slug]);

  // Memoize formatDate function
  const formatDate = useMemo(() => (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Memoize formatContent function to render markdown
  const FormatContent = useMemo(() => {
    const Component = ({ content }: { content: string }) => {
      // Use shared markdown renderer to convert markdown to HTML
      const html = renderMarkdownToHTML(content);
      return (
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            /* Ensure images display properly */
            lineHeight: '1.6'
          }}
        />
      );
    };
    Component.displayName = 'FormatContent';
    return Component;
  }, []);

  // Memoize loading component
  const loadingComponent = useMemo(() => (
    <div className="min-h-screen bg-adaptive-light">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-neutral-300 dark:bg-neutral-600 rounded mb-6"></div>
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ), []);

  // Memoize error component
  const errorComponent = useMemo(() => (
    <div className="min-h-screen bg-adaptive-light flex items-center justify-center">
      <div className="text-center card p-8 max-w-md mx-4">
        <div className="text-6xl text-neutral-300 dark:text-neutral-600 mb-4">😔</div>
        <h1 className="text-3xl md:text-4xl font-bold text-adaptive-heading mb-4">404</h1>
        <p className="text-adaptive-gray mb-6">{error || 'Bài viết không tồn tại'}</p>
        <Link
          href="/blog"
          className="btn-primary inline-flex items-center gap-2"
        >
          <FaArrowLeft />
          Quay lại Blog
        </Link>
      </div>
    </div>
  ), [error]);

  if (loading) {
    console.log(`⏳ Loading post for slug: ${slug}`);
    return loadingComponent;
  }

  if (error || !memoizedPost) {
    console.log(`❌ Error or no post for slug: ${slug}, error: ${error}`);
    return errorComponent;
  }

  const post = memoizedPost;
  console.log(`✅ Rendering post: ${post.title}`);

  return (
    <div className="min-h-screen bg-adaptive-light font-inter text-vietnamese">
      {/* Breadcrumb */}
      <div className="bg-adaptive shadow-adaptive">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <nav className="text-xs md:text-sm text-adaptive-gray flex items-center gap-1 md:gap-2 overflow-hidden">
            <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">Trang chủ</Link>
            <span className="flex-shrink-0">/</span>
            <Link href="/blog" className="hover:text-primary transition-colors flex-shrink-0">Blog</Link>
            <span className="flex-shrink-0">/</span>
            <span className="text-adaptive-heading truncate min-w-0" title={post.title}>
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Main Content - full width, better layout */}
        <div className="max-w-4xl mx-auto">
          <article className="w-full">
            <div className="card-elevated overflow-hidden bg-white dark:bg-neutral-800">
              {/* Post Header */}
              <div className="relative">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                    <span className="bg-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-red-500 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1">
                        <FaStar className="text-xs" />
                        Nổi bật
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-white/90">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-xs" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-xs" />
                      {post.views} lượt xem
                    </span>
                  </div>
                </div>
              </div>

              {/* Share & Edit Actions - moved up */}
              <div className="px-4 md:px-6 lg:px-8 py-4 border-b border-adaptive bg-neutral-50 dark:bg-neutral-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <FaShare className="text-primary" />
                    <span className="text-sm font-medium text-adaptive-heading">Chia sẻ bài viết</span>
                  </div>
                  
                  {employee && (
                    <Link
                      href={`/blog/edit/${post.slug}`}
                      className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-lg hover:shadow-md transition-all"
                    >
                      <FaEdit />
                      Chỉnh sửa bài viết
                    </Link>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 lg:p-8">
                {/* Description */}
                {post.description && (
                  <div className="text-lg md:text-xl text-adaptive-gray italic mb-6 md:mb-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-l-4 border-primary">
                    {post.description}
                  </div>
                )}

                {/* Main Content */}
                <div className="prose prose-lg max-w-none text-adaptive-gray prose-headings:text-adaptive-heading prose-a:text-primary prose-strong:text-adaptive-heading prose-code:bg-neutral-100 prose-code:text-adaptive-heading prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-700 prose-blockquote:border-primary">
                  <FormatContent content={post.content} />
                </div>

                {/* Tags */}
                {post.tags && (
                  <div className="mt-8 pt-6 border-t border-adaptive">
                    <div className="flex items-center gap-2 flex-wrap">
                      <FaTags className="text-adaptive-gray" />
                      <span className="text-sm font-medium text-adaptive-heading">Tags:</span>
                      {post.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          </article>
        </div>

        {/* Related Posts - moved to bottom */}
        <div className="mt-8 lg:mt-12">
          <div className="max-w-4xl mx-auto">
            <RelatedPosts currentSlug={post.slug} />
          </div>
        </div>
      </div>
    </div>
  );
} 