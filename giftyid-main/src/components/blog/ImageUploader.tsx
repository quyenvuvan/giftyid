'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaUpload, FaTrash, FaCopy, FaCheck, FaSpinner } from 'react-icons/fa';

interface ImageUploaderProps {
  type?: 'thumbnail' | 'content' | 'blog';
  onUploadSuccess?: (url: string) => void;
  maxSize?: number; // MB
  acceptedTypes?: string[];
}

export default function ImageUploader({ 
  type = 'blog', 
  onUploadSuccess,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Chỉ chấp nhận các định dạng: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Kích thước file không được vượt quá ${maxSize}MB`);
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadedUrl(result.url);
      onUploadSuccess?.(result.url);

    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi upload');
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const deleteImage = async () => {
    if (!uploadedUrl) return;

    try {
      const response = await fetch(`/api/upload?url=${encodeURIComponent(uploadedUrl)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadedUrl('');
        setPreview('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'thumbnail': return 'Ảnh thumbnail';
      case 'content': return 'Ảnh nội dung';
      default: return 'Ảnh blog';
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-adaptive-heading mb-4 flex items-center">
        <FaUpload className="mr-2 text-primary" />
        Upload {getTypeLabel()}
      </h3>

      {/* Upload Area */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${type}`}
        />
        
        <label
          htmlFor={`file-upload-${type}`}
          className={`block w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            uploading 
              ? 'border-primary bg-blue-50 dark:bg-blue-900/20' 
              : 'border-neutral-300 dark:border-neutral-600 hover:border-primary hover:bg-neutral-50 dark:hover:bg-neutral-700'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <FaSpinner className="text-3xl text-primary animate-spin mb-2" />
              <p className="text-adaptive-heading">Đang upload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaUpload className="text-3xl text-adaptive-gray mb-2" />
              <p className="text-adaptive-heading mb-1">Chọn ảnh để upload</p>
              <p className="text-sm text-adaptive-gray">
                Hỗ trợ: JPG, PNG, WebP, GIF (tối đa {maxSize}MB)
              </p>
            </div>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-adaptive-heading mb-2">Preview:</h4>
          <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Upload Result */}
      {uploadedUrl && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-adaptive-heading">✅ Upload thành công!</h4>
          
          {/* URL Display */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={uploadedUrl}
              readOnly
              className="form-input flex-1 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="btn-primary px-3 py-2 flex items-center gap-1"
              title="Copy URL"
            >
              {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
            </button>
            <button
              onClick={deleteImage}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1"
              title="Xóa ảnh"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>

          {/* Usage Instructions */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Cách sử dụng:</strong> Copy URL trên và paste vào Google Sheets trong cột {' '}
              {type === 'thumbnail' ? '"thumbnail"' : '"content"'} của bài viết blog.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 