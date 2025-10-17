'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaSave, FaTimes, FaEye, FaUpload, FaSpinner } from 'react-icons/fa';
import MarkdownEditor from '@/components/blog/MarkdownEditor';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import EmployeeProtectedRoute from '@/components/EmployeeProtectedRoute';
import { renderMarkdownToHTML } from '@/utils/markdownRenderer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  thumbnail: string;
  description: string;
  content: string;
  tags: string;
  views: number;
  featured: boolean;
}

const categories = [
  'Technology',
  'Business',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Education',
  'Entertainment',
  'Sports',
  'News'
];

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const { toasts, removeToast, success, error } = useToast();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        // Since we're coming from edit button with slug, try slug first
        let response = await fetch(`/api/blog?slug=${params.id}`);
        
        if (!response.ok) {
          // If slug fails, try as ID (for direct ID access)
          response = await fetch(`/api/blog?id=${params.id}`);
        }
        
        if (!response.ok) {
          throw new Error('Failed to load post');
        }
        
        const data = await response.json();
        
        if (data.post) {
          setPost(data.post);
        } else {
          throw new Error('Post not found');
        }
              } catch {
        error('Không thể tải bài viết');
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadPost();
    }
  }, [params.id]);

  const handleInputChange = (field: keyof BlogPost, value: string | boolean) => {
    if (!post) return;
    
    setPost(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      error('Vui lòng chọn file hình ảnh');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      error('Kích thước file không được vượt quá 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      handleInputChange('thumbnail', data.url);
      success('Tải ảnh lên thành công!');
    } catch {
      error('Lỗi khi tải ảnh lên');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!post) return;
    
    if (!post.title.trim() || !post.content.trim()) {
      error('Vui lòng nhập tiêu đề và nội dung');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/blog/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      success('Cập nhật bài viết thành công!');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/blog');
      }, 1500);
      
    } catch {
      error('Lỗi khi cập nhật bài viết');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy bài viết</p>
        </div>
      </div>
    );
  }

  return (
    <EmployeeProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Chỉnh sửa bài viết
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaEye className="mr-2" />
                Xem trước
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button
                onClick={() => router.push('/blog')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FaTimes className="mr-2" />
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                  placeholder="Nhập tiêu đề bài viết..."
                />
              </div>

              {/* Slug */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                  placeholder="url-bai-viet"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả ngắn
                </label>
                <textarea
                  value={post.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                  placeholder="Mô tả ngắn về bài viết..."
                />
              </div>

              {/* Content Editor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung *
                </label>
                <MarkdownEditor
                  value={post.content}
                  onChange={(value) => handleInputChange('content', value)}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ảnh đại diện</h3>
              
              {post.thumbnail && (
                <div className="mb-4">
                  <img
                    src={post.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                      <FaSpinner className="animate-spin text-2xl text-gray-400 mb-2" />
                    ) : (
                      <FaUpload className="text-2xl text-gray-400 mb-2" />
                    )}
                    <p className="text-sm text-gray-500">
                      {uploading ? 'Đang tải lên...' : 'Chọn ảnh mới'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Post Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cài đặt</h3>
              
              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={post.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tác giả
                </label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                />
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (phân cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={post.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={post.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Bài viết nổi bật
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold dark:text-black">Xem trước bài viết</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <article className="prose max-w-none dark:text-black">
                <h1>{post.title}</h1>
                {post.thumbnail && (
                  <img src={post.thumbnail} alt={post.title} className="w-full rounded-lg" />
                )}
                <p className="text-gray-600">{post.description}</p>
                <div 
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownToHTML(post.content) }}
                />
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
    </EmployeeProtectedRoute>
  );
} 