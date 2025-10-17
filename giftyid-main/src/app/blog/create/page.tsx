'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaSave, FaSpinner, FaEye, FaTags, FaUser, FaImage, FaList } from 'react-icons/fa';
import MarkdownEditor from '@/components/blog/MarkdownEditor';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import EmployeeProtectedRoute from '@/components/EmployeeProtectedRoute';

interface FormData {
  title: string;
  slug: string;
  category: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  tags: string;
  featured: boolean;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toasts, removeToast, success, error } = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    category: '',
    author: '',
    thumbnail: '',
    description: '',
    content: '',
    tags: '',
    featured: false,
  });

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[đĐ]/g, 'd') // Handle Vietnamese đ
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }, []);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      error('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error('File ảnh không được vượt quá 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        handleInputChange('thumbnail', result.url);
        success('Tải ảnh lên thành công!');
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload ảnh');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      error('Vui lòng nhập tiêu đề và nội dung bài viết');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Clear blog cache to show new post immediately
        try {
          await fetch('/api/blog/clear-cache', { method: 'POST' });
        } catch (error) {
          console.log('Cache clear failed:', error);
        }
        
        success('Tạo bài viết thành công!');
        
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push(`/blog/${result.post.slug}`);
        }, 1500);
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setIsLoading(false);
    }
  };

  const commonCategories = [
    'Công nghệ',
    'Lập trình',
    'Thiết kế',
    'Kinh doanh',
    'Giáo dục',
    'Sức khỏe',
    'Du lịch',
    'Ẩm thực',
    'Thể thao',
    'Giải trí'
  ];

  return (
    <EmployeeProtectedRoute>
      <div className="min-h-screen bg-adaptive-bg">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-adaptive-text hover:text-primary transition-colors"
            >
              <FaArrowLeft />
              <span>Quay lại Blog</span>
            </Link>
            <div className="h-6 w-px bg-adaptive-border"></div>
            <h1 className="text-2xl font-bold text-adaptive-heading">Tạo bài viết mới</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary flex items-center space-x-2"
            >
              <FaEye />
              <span>{showPreview ? 'Ẩn xem trước' : 'Xem trước'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="card p-6">
                <label className="block text-sm font-medium text-adaptive-text mb-2">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="form-input w-full text-lg"
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              {/* Slug */}
              <div className="card p-6">
                <label className="block text-sm font-medium text-adaptive-text mb-2">
                  URL slug
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-adaptive-text">/blog/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="form-input flex-1"
                    placeholder="url-slug"
                  />
                </div>
                <p className="text-xs text-adaptive-text mt-1">
                  URL sẽ được tự động tạo từ tiêu đề nếu để trống
                </p>
              </div>

              {/* Content Editor */}
              <div className="card p-6">
                <label className="block text-sm font-medium text-adaptive-text mb-4">
                  Nội dung bài viết *
                </label>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  height="500px"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4">Xuất bản</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="rounded border-adaptive-border"
                    />
                    <span className="text-sm text-adaptive-text">Bài viết nổi bật</span>
                  </label>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Đang tạo...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Tạo bài viết</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4 flex items-center">
                  <FaList className="mr-2" />
                  Danh mục
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="form-input w-full"
                    placeholder="Nhập danh mục..."
                    list="categories"
                  />
                  <datalist id="categories">
                    {commonCategories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {commonCategories.slice(0, 6).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleInputChange('category', cat)}
                        className="text-xs px-2 py-1 bg-adaptive-bg border border-adaptive-border rounded hover:bg-primary hover:text-white transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4 flex items-center">
                  <FaUser className="mr-2" />
                  Tác giả
                </h3>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="form-input w-full"
                  placeholder="Tên tác giả..."
                />
              </div>

              {/* Thumbnail */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4 flex items-center">
                  <FaImage className="mr-2" />
                  Ảnh đại diện
                </h3>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                    className="form-input w-full"
                    placeholder="URL ảnh đại diện..."
                  />
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="btn-secondary flex items-center space-x-2 cursor-pointer"
                    >
                      <FaImage />
                      <span>Upload ảnh</span>
                    </label>
                    {uploadingImage && (
                      <div className="flex items-center space-x-2 text-sm text-adaptive-text">
                        <FaSpinner className="animate-spin" />
                        <span>Đang upload...</span>
                      </div>
                    )}
                  </div>
                </div>
                {formData.thumbnail && (
                  <div className="mt-3 relative h-32 w-full">
                    <Image
                      src={formData.thumbnail}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                      onError={() => {
                        // Handle error if needed
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4">Mô tả ngắn</h3>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="form-input w-full h-24 resize-none dark:text-black "
                  placeholder="Mô tả ngắn về bài viết..."
                />
              </div>

              {/* Tags */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-adaptive-heading mb-4 flex items-center">
                  <FaTags className="mr-2" />
                  Tags
                </h3>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="form-input w-full"
                  placeholder="tag1, tag2, tag3..."
                />
                <p className="text-xs text-adaptive-text mt-1">
                  Phân cách các tag bằng dấu phẩy
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Preview Modal - Moved outside form */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold dark:text-black">Xem trước bài viết</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <article className="prose prose-lg max-w-none">
                  <h1>{formData.title || 'Tiêu đề bài viết'}</h1>
                  {formData.thumbnail && (
                    <div className="relative w-full h-64">
                      <Image 
                        src={formData.thumbnail} 
                        alt={formData.title} 
                        fill
                        className="object-cover rounded-lg" 
                      />
                    </div>
                  )}
                  {formData.description && (
                    <p className="text-lg text-gray-600 italic">{formData.description}</p>
                  )}
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content
                        // Headers
                        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
                        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-5">$1</h2>')
                        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
                        
                        // Bold and Italic
                        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        
                        // Code blocks
                        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-3"><code>$1</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                        
                        // Links
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                        
                        // Images
                        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-3" />')
                        
                        // Lists
                        .replace(/^\* (.+)$/gm, '<li class="ml-4">$1</li>')
                        .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
                        
                        // Blockquotes
                        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-3">$1</blockquote>')
                        
                        // Line breaks
                        .replace(/\n\n/g, '</p><p class="mb-3">')
                        .replace(/\n/g, '<br>')
                        .replace(/^(.*)$/, '<p class="mb-3">$1</p>')
                        .replace(/<p class="mb-3"><\/p>/g, '') // Clean up empty paragraphs
                    }}
                  />
                </article>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </EmployeeProtectedRoute>
  );
} 