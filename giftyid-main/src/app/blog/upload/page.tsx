'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '@/components/blog/ImageUploader';
import { FaArrowLeft, FaImages, FaFileImage, FaCamera, FaLock } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function BlogUploadPage() {
  const { employee, loading } = useAuth();
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<{
    thumbnails: string[];
    content: string[];
    general: string[];
  }>({
    thumbnails: [],
    content: [],
    general: []
  });

  // Redirect if not employee
  useEffect(() => {
    if (!loading && !employee) {
      router.push('/login?redirect=/blog/upload');
    }
  }, [employee, loading, router]);

  const handleUploadSuccess = (url: string, type: 'thumbnail' | 'content' | 'blog') => {
    setUploadedImages(prev => ({
      ...prev,
      [type === 'thumbnail' ? 'thumbnails' : type === 'content' ? 'content' : 'general']: [
        ...prev[type === 'thumbnail' ? 'thumbnails' : type === 'content' ? 'content' : 'general'],
        url
      ]
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-adaptive-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-adaptive-gray">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!employee) {
    return (
      <div className="min-h-screen bg-adaptive-light flex items-center justify-center">
        <div className="text-center card p-8 max-w-md mx-4">
          <FaLock className="text-6xl text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-adaptive-heading mb-4">Truy cập bị hạn chế</h1>
          <p className="text-adaptive-gray mb-6">
            Trang này chỉ dành cho nhân viên. Vui lòng đăng nhập để tiếp tục.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?redirect=/blog/upload"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Đăng nhập
            </Link>
            <Link
              href="/blog"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Quay lại Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-adaptive-light font-inter text-vietnamese">
      {/* Header */}
      <div className="gradient-primary text-white shadow-adaptive">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <nav className="text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Upload Images</span>
          </nav>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaImages className="text-3xl md:text-4xl" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Quản lý ảnh Blog
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-3">
              Upload và quản lý ảnh thumbnail, ảnh nội dung cho bài viết blog
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Xin chào, {employee?.name || 'Nhân viên'}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FaArrowLeft />
            Quay lại Blog
          </Link>
        </div>

        {/* Instructions */}
        <div className="card-elevated p-6 mb-8">
          <h2 className="text-2xl font-bold text-adaptive-heading mb-4 flex items-center">
            <FaFileImage className="mr-3 text-primary" />
            Hướng dẫn sử dụng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-adaptive-heading mb-2">Upload ảnh</h3>
              <p className="text-adaptive-gray text-sm">
                Chọn loại ảnh và upload file từ máy tính của bạn
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="font-semibold text-adaptive-heading mb-2">Copy URL</h3>
              <p className="text-adaptive-gray text-sm">
                Sau khi upload thành công, copy URL ảnh được tạo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold text-adaptive-heading mb-2">Paste vào Sheets</h3>
              <p className="text-adaptive-gray text-sm">
                Dán URL vào Google Sheets trong cột tương ứng
              </p>
            </div>
          </div>
        </div>

        {/* Upload Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Thumbnail Uploader */}
          <div>
            <ImageUploader
              type="thumbnail"
              onUploadSuccess={(url) => handleUploadSuccess(url, 'thumbnail')}
              maxSize={2}
            />
          </div>

          {/* Content Image Uploader */}
          <div>
            <ImageUploader
              type="content"
              onUploadSuccess={(url) => handleUploadSuccess(url, 'content')}
              maxSize={5}
            />
          </div>

          {/* General Blog Image Uploader */}
          <div>
            <ImageUploader
              type="blog"
              onUploadSuccess={(url) => handleUploadSuccess(url, 'blog')}
              maxSize={3}
            />
          </div>
        </div>

        {/* Google Sheets Integration Guide */}
        <div className="mt-12">
          <div className="card-elevated p-6">
            <h2 className="text-2xl font-bold text-adaptive-heading mb-6 flex items-center">
              <FaCamera className="mr-3 text-secondary" />
              Cấu trúc Google Sheets cho Blog
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-adaptive">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800">
                    <th className="border border-adaptive p-3 text-left text-adaptive-heading font-semibold">Cột</th>
                    <th className="border border-adaptive p-3 text-left text-adaptive-heading font-semibold">Mô tả</th>
                    <th className="border border-adaptive p-3 text-left text-adaptive-heading font-semibold">Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-adaptive p-3 font-mono text-sm bg-blue-50 dark:bg-blue-900/20">thumbnail</td>
                    <td className="border border-adaptive p-3 text-adaptive-gray">URL ảnh thumbnail (ảnh đại diện)</td>
                    <td className="border border-adaptive p-3 text-xs text-adaptive-gray">https://blob.vercel-storage.com/blog/thumbnail/...</td>
                  </tr>
                  <tr>
                    <td className="border border-adaptive p-3 font-mono text-sm bg-green-50 dark:bg-green-900/20">content</td>
                    <td className="border border-adaptive p-3 text-adaptive-gray">Nội dung bài viết (có thể chứa URL ảnh)</td>
                    <td className="border border-adaptive p-3 text-xs text-adaptive-gray">Nội dung bài viết...<br/>![Ảnh](https://blob.vercel-storage.com/blog/content/...)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Mẹo sử dụng:</h3>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• <strong>Thumbnail:</strong> Nên sử dụng ảnh có tỷ lệ 16:9 hoặc 4:3, kích thước tối thiểu 800x450px</li>
                <li>• <strong>Content:</strong> Có thể chèn nhiều ảnh trong nội dung bằng markdown: ![Alt text](URL)</li>
                <li>• <strong>Tối ưu:</strong> Nén ảnh trước khi upload để tăng tốc độ tải trang</li>
                <li>• <strong>SEO:</strong> Đặt tên file ảnh có ý nghĩa trước khi upload</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Uploads Summary */}
        {(uploadedImages.thumbnails.length > 0 || uploadedImages.content.length > 0 || uploadedImages.general.length > 0) && (
          <div className="mt-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-adaptive-heading mb-4">📊 Thống kê upload trong phiên này</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {uploadedImages.thumbnails.length}
                  </div>
                  <div className="text-sm text-adaptive-gray">Ảnh thumbnail</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {uploadedImages.content.length}
                  </div>
                  <div className="text-sm text-adaptive-gray">Ảnh nội dung</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {uploadedImages.general.length}
                  </div>
                  <div className="text-sm text-adaptive-gray">Ảnh blog khác</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 