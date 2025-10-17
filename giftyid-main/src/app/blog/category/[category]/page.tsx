'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import { FaCalendarAlt, FaUser, FaEye, FaStar, FaArrowLeft, FaFolder } from 'react-icons/fa';
import { useBlogCache } from '@/hooks/useBlogCache';

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  
  const [currentPage, setCurrentPage] = useState(1);

  // Sử dụng cache hook
  const { data: blogData, loading } = useBlogCache({
    category: category,
    page: currentPage,
    limit: 9
  });

  // Memoize data
  const memoizedBlogData = useMemo(() => blogData, [blogData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && !memoizedBlogData) {
    return (
      <div className="min-h-screen bg-adaptive-light">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card overflow-hidden">
                  <div className="h-48 bg-neutral-300 dark:bg-neutral-600"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-adaptive-light font-inter text-vietnamese">
      {/* Header với gradient như trang chủ */}
      <div className="gradient-primary text-white shadow-adaptive">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <nav className="text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category}</span>
          </nav>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFolder className="text-3xl md:text-4xl" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {category}
              </h1>
            </div>
            {blogData && (
              <p className="text-white/90 text-lg">
                {blogData.pagination.totalPosts} bài viết trong chuyên mục này
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:w-2/3">
            {/* Back to Blog Button */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="btn-outline inline-flex items-center gap-2"
              >
                <FaArrowLeft />
                Quay lại Blog
              </Link>
            </div>

            {blogData?.posts && blogData.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                  {blogData.posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {blogData.pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 card p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={!blogData.pagination.hasPrev}
                        className="px-4 py-2 border-adaptive rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Trước
                      </button>
                      
                      <div className="flex gap-1">
                        {[...Array(Math.min(5, blogData.pagination.totalPages))].map((_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-2 rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-primary text-white'
                                  : 'border-adaptive hover:bg-neutral-50 dark:hover:bg-neutral-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(blogData.pagination.totalPages, prev + 1))}
                        disabled={!blogData.pagination.hasNext}
                        className="px-4 py-2 border-adaptive rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Tiếp
                      </button>
                    </div>
                    
                    <div className="text-sm text-adaptive-gray">
                      Trang {currentPage} / {blogData.pagination.totalPages} 
                      ({blogData.pagination.totalPosts} bài viết)
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card text-center py-12">
                <div className="text-6xl text-neutral-300 dark:text-neutral-600 mb-4">📂</div>
                <h3 className="text-xl font-semibold text-adaptive-heading mb-2">
                  Chưa có bài viết nào
                </h3>
                                 <p className="text-adaptive-gray mb-6">
                   Chuyên mục &ldquo;{category}&rdquo; hiện chưa có bài viết nào.
                 </p>
                <Link
                  href="/blog"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Xem tất cả bài viết
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:w-1/3">
            {/* Current Category Info */}
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold text-adaptive-heading mb-4 flex items-center">
                <FaFolder className="mr-2 text-primary" />
                Chuyên mục hiện tại
              </h3>
              <div className="gradient-accent p-4 rounded-lg">
                <h4 className="font-semibold text-adaptive-heading text-lg mb-2">{category}</h4>
                {blogData && (
                  <p className="text-adaptive-gray text-sm">
                    {blogData.pagination.totalPosts} bài viết
                  </p>
                )}
              </div>
            </div>

            {/* Other Categories */}
            {blogData?.sidebar.categories && (
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4">Chuyên mục khác</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className="block px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-adaptive-heading transition-colors"
                    >
                      Tất cả
                    </Link>
                  </li>
                  {blogData.sidebar.categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blog/category/${encodeURIComponent(cat)}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          cat === category 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-adaptive-heading'
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Posts */}
            {blogData?.sidebar.recentPosts && (
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4">Bài viết mới</h3>
                <div className="space-y-4">
                  {blogData.sidebar.recentPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 p-2 rounded transition-colors group">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-adaptive-heading line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-adaptive-gray mt-1">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Posts */}
            {blogData?.sidebar.featuredPosts && blogData.sidebar.featuredPosts.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4 flex items-center">
                  <FaStar className="mr-2 text-yellow-500" />
                  Bài viết nổi bật
                </h3>
                <div className="space-y-4">
                  {blogData.sidebar.featuredPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                      <div className="gradient-accent rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group-hover:scale-105">
                        <div className="relative h-24">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            Nổi bật
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-medium text-adaptive-heading line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="card overflow-hidden hover:shadow-md transition-all duration-300 group-hover:scale-105 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
              {post.category}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <FaStar className="text-xs" />
                Nổi bật
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-adaptive-heading line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-adaptive-gray text-sm line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-adaptive-gray pt-3 border-t border-adaptive">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaUser className="text-xs" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-xs" />
                {formatDate(post.date)}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <FaEye className="text-xs" />
              {post.views}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
} 