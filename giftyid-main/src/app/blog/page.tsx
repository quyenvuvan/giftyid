'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { FaSearch, FaCalendarAlt, FaUser, FaEye, FaStar, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import { useBlogCache } from '@/hooks/useBlogCache';
import { preloadPost } from '@/hooks/useSinglePostCache';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { toasts, removeToast, success, error } = useToast();
  const { employee } = useAuth();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: string;
    postTitle: string;
  }>({
    isOpen: false,
    postId: '',
    postTitle: ''
  });

  // Sử dụng cache hook với debouncing
  const { data: blogData, loading, refreshData } = useBlogCache({
    page: currentPage,
    limit: 9,
    category: selectedCategory,
    search: searchTerm
  });

  // Memoize các giá trị để tránh re-render không cần thiết
  const memoizedBlogData = useMemo(() => blogData, [blogData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // Hook sẽ tự động fetch với debouncing
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/blog/delete?id=${deleteModal.postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      success('Xóa bài viết thành công!');
      
      // Refresh the blog data
      refreshData();
      
      // Clear cache
      await fetch('/api/blog/clear-cache', { method: 'POST' });
      
    } catch {
      error('Lỗi khi xóa bài viết');
    } finally {
      setDeleteModal({ isOpen: false, postId: '', postTitle: '' });
    }
  };

  const openDeleteModal = (postId: string, postTitle: string) => {
    setDeleteModal({
      isOpen: true,
      postId,
      postTitle
    });
  };

  if (loading && !memoizedBlogData) {
    return (
      <div className="min-h-screen bg-adaptive-light">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded w-1/4 mb-8"></div>
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {/* Header với gradient như trang chủ */}
      <div className="gradient-primary text-white shadow-adaptive">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <nav className="text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Tin tức & Blog</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-6">
              Khám phá những bài viết hữu ích về công nghệ, kinh doanh và cuộc sống
            </p>
            {employee && (
              <Link
                href="/blog/create"
                className="inline-flex items-center space-x-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Tạo bài viết mới</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:w-2/3">
            {/* Search Bar & Upload Link */}
           {/* Quick Search */}
           <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold text-adaptive-heading mb-4 flex items-center">
                <FaSearch className="mr-2 text-primary" />
                Tìm kiếm bài viết
              </h3>
              <form onSubmit={handleSearch}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-4"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Featured Posts Banner */}
            {memoizedBlogData?.sidebar.featuredPosts && memoizedBlogData.sidebar.featuredPosts.length > 0 && (
              <div className="card-elevated overflow-hidden mb-8">
                <div className="gradient-secondary text-white py-4 px-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center">
                    <FaStar className="mr-2" /> Bài viết nổi bật
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {memoizedBlogData.sidebar.featuredPosts.slice(0, 3).map((post) => (
                      <Link 
                        key={post.id} 
                        href={`/blog/${post.slug}`} 
                        className="group"
                        onMouseEnter={() => preloadPost(post.slug)}
                      >
                        <div className="gradient-accent rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group-hover:scale-105">
                          <div className="relative h-32">
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
                            <h3 className="text-sm font-medium text-adaptive-heading line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

                        {/* Employee Actions */}
            {employee && (
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/blog/create"
                  className="btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  <FaPlus className="text-sm" />
                  Tạo bài viết mới
                </Link>
              </div>
            )}

            {/* Blog Posts Grid */}
            {memoizedBlogData?.posts && memoizedBlogData.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                  {memoizedBlogData.posts.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      onDelete={() => openDeleteModal(post.id, post.title)}
                      showActions={!!employee}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {memoizedBlogData.pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 card p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={!memoizedBlogData.pagination.hasPrev}
                        className="px-4 py-2 border-adaptive rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Trước
                      </button>
                      
                      <div className="flex gap-1">
                        {[...Array(Math.min(5, memoizedBlogData.pagination.totalPages))].map((_, i) => {
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
                        onClick={() => setCurrentPage(prev => Math.min(memoizedBlogData.pagination.totalPages, prev + 1))}
                        disabled={!memoizedBlogData.pagination.hasNext}
                        className="px-4 py-2 border-adaptive rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Tiếp
                      </button>
                    </div>
                    
                    <div className="text-sm text-adaptive-gray">
                      Trang {currentPage} / {memoizedBlogData.pagination.totalPages} 
                      ({memoizedBlogData.pagination.totalPosts} bài viết)
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card text-center py-12">
                <div className="text-6xl text-neutral-300 dark:text-neutral-600 mb-4">📝</div>
                <h3 className="text-xl font-semibold text-adaptive-heading mb-2">Không tìm thấy bài viết</h3>
                <p className="text-adaptive-gray mb-6">Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setCurrentPage(1);
                  }}
                  className="btn-primary"
                >
                  Xem tất cả bài viết
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:w-1/3">
            

            {/* Categories */}
            {memoizedBlogData?.sidebar.categories && (
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4">Chuyên mục</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === '' 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-adaptive-heading'
                      }`}
                    >
                      Tất cả
                    </button>
                  </li>
                  {memoizedBlogData.sidebar.categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-adaptive-heading'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Posts */}
            {memoizedBlogData?.sidebar.recentPosts && (
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4">Bài viết mới</h3>
                <div className="space-y-4">
                  {memoizedBlogData.sidebar.recentPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.slug}`} 
                      className="flex gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 p-2 rounded transition-colors group"
                      onMouseEnter={() => preloadPost(post.slug)}
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="rounded object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/64x64/e5e7eb/6b7280?text=No+Image';
                          }}
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

            {/* Tags */}
            {memoizedBlogData?.sidebar.tags && memoizedBlogData.sidebar.tags.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-adaptive-heading mb-4">Thẻ phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {memoizedBlogData.sidebar.tags.slice(0, 15).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchTerm(tag);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-adaptive-heading rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận xóa bài viết"
        message={`Bạn có chắc chắn muốn xóa bài viết "${deleteModal.postTitle}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa bài viết"
        cancelText="Hủy"
        onConfirm={handleDeletePost}
        onCancel={() => setDeleteModal({ isOpen: false, postId: '', postTitle: '' })}
        type="danger"
      />
    </div>
  );
}

function BlogCard({ 
  post, 
  onDelete,
  showActions = false
}: { 
  post: BlogPost;
  onDelete: () => void;
  showActions?: boolean;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <article className="card overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col relative group">
      {/* Action buttons - only show for employees */}
      {showActions && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-1">
            <Link
              href={`/blog/edit/${post.slug}`}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaEdit className="text-xl" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
      )}

      <Link 
        href={`/blog/${post.slug}`} 
        className="flex flex-col h-full"
        onMouseEnter={() => preloadPost(post.slug)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x300/e5e7eb/6b7280?text=No+Image';
            }}
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
      </Link>
    </article>
  );
} 