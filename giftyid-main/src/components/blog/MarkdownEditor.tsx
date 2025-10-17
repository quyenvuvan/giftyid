'use client';

import { useState, useRef } from 'react';
import { FaEye, FaEdit, FaExpand, FaCompress, FaPaste, FaSpinner } from 'react-icons/fa';
import { renderMarkdownToHTML } from '@/utils/markdownRenderer';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Nhập nội dung markdown...",
  height = "400px"
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [isProcessingHtml, setIsProcessingHtml] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Convert HTML to Markdown
  // Upload image from URL to Vercel Blob
  const uploadImageFromUrl = async (imageUrl: string): Promise<string> => {
    try {
      console.log('🔄 Downloading image from:', imageUrl);
      
      // Use proxy to avoid CORS issues
      const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      
      const imageBlob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      const fileName = `html-image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${imageBlob.type.split('/')[1] || 'jpg'}`;
      formData.append('file', imageBlob, fileName);
      
      console.log('⬆️ Uploading to Vercel Blob:', fileName);
      
      // Upload to Vercel Blob
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }
      
      const result = await uploadResponse.json();
      console.log('✅ Image uploaded successfully:', result.url);
      return result.url;
      
    } catch (error) {
      console.error('❌ Error uploading image from URL:', error);
      // Return original URL if upload fails
      return imageUrl;
    }
  };

  // Convert HTML to Markdown with image upload
  const htmlToMarkdownWithImageUpload = async (html: string): Promise<string> => {
    console.log('🔄 Converting HTML to Markdown with image upload...');
    
    // Extract all image URLs from HTML
    const imageRegex = /<img[^>]*src=['"]([^'"]*)['"][^>]*(?:alt=['"]([^'"]*)['"])?[^>]*\/?>/gi;
    const images: {url: string, alt: string, fullMatch: string}[] = [];
    let match;
    
    while ((match = imageRegex.exec(html)) !== null) {
      images.push({
        url: match[1],
        alt: match[2] || '',
        fullMatch: match[0]
      });
    }
    
    console.log(`🖼️ Found ${images.length} images to process`);
    
    // Upload images to Vercel Blob
    const uploadPromises = images.map(async (img) => {
      // Skip if already a Vercel Blob URL
      if (img.url.includes('blob.vercel-storage.com')) {
        return { ...img, newUrl: img.url };
      }
      
      // Skip data URLs for now (base64 images)
      if (img.url.startsWith('data:')) {
        return { ...img, newUrl: img.url };
      }
      
      // Upload external images
      const newUrl = await uploadImageFromUrl(img.url);
      return { ...img, newUrl };
    });
    
    const uploadedImages = await Promise.all(uploadPromises);
    
    // Replace image URLs in HTML
    let updatedHtml = html;
    uploadedImages.forEach(({ url, newUrl, fullMatch }) => {
      if (url !== newUrl) {
        const newImg = fullMatch.replace(url, newUrl);
        updatedHtml = updatedHtml.replace(fullMatch, newImg);
        console.log(`🔄 Replaced ${url} with ${newUrl}`);
      }
    });
    
    // Now convert to markdown
    const markdown = updatedHtml
      // Remove script and style tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      
      // Convert headers
      .replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (match, level, text) => {
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        return '\n' + '#'.repeat(parseInt(level)) + ' ' + cleanText + '\n\n';
      })
      
      // Convert strong/bold
      .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
      
      // Convert emphasis/italic
      .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
      
      // Convert code blocks
      .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      
      // Convert links
      .replace(/<a[^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      
      // Convert images (with new URLs)
      .replace(/<img[^>]*src=['"]([^'"]*)['"][^>]*alt=['"]([^'"]*)['"][^>]*\/?>/gi, '![$2]($1)')
      .replace(/<img[^>]*alt=['"]([^'"]*)['"][^>]*src=['"]([^'"]*)['"][^>]*\/?>/gi, '![$1]($2)')
      .replace(/<img[^>]*src=['"]([^'"]*)['"][^>]*\/?>/gi, '![]($1)')
      
      // Convert lists
      .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
      })
      .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
        let counter = 1;
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`);
      })
      
      // Convert blockquotes
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
        const cleanContent = content.replace(/<[^>]*>/g, '').trim();
        return '> ' + cleanContent + '\n\n';
      })
      
      // Convert line breaks
      .replace(/<br\s*\/?>/gi, '\n')
      
      // Convert paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      
      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, '')
      
      // Clean up whitespace
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      
      // Decode HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    console.log('✅ HTML to Markdown conversion completed');
    return markdown;
  };

  // Legacy function for backwards compatibility
  const htmlToMarkdown = (html: string): string => {
    return html
      // Basic conversion without image upload
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (match, level, text) => {
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        return '\n' + '#'.repeat(parseInt(level)) + ' ' + cleanText + '\n\n';
      })
      .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
      .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
      .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<a[^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<img[^>]*src=['"]([^'"]*)['"][^>]*alt=['"]([^'"]*)['"][^>]*\/?>/gi, '![$2]($1)')
      .replace(/<img[^>]*alt=['"]([^'"]*)['"][^>]*src=['"]([^'"]*)['"][^>]*\/?>/gi, '![$1]($2)')
      .replace(/<img[^>]*src=['"]([^'"]*)['"][^>]*\/?>/gi, '![]($1)')
      .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
      })
      .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
        let counter = 1;
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`);
      })
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
        const cleanContent = content.replace(/<[^>]*>/g, '').trim();
        return '> ' + cleanContent + '\n\n';
      })
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<[^>]*>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  };

  // Handle paste from clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      
      for (const clipboardItem of clipboardItems) {
        // Try to get HTML first
        if (clipboardItem.types.includes('text/html')) {
          const htmlBlob = await clipboardItem.getType('text/html');
          const htmlText = await htmlBlob.text();
          setHtmlContent(htmlText);
          setShowPasteModal(true);
          return;
        }
        
        // Fall back to plain text
        if (clipboardItem.types.includes('text/plain')) {
          const textBlob = await clipboardItem.getType('text/plain');
          const text = await textBlob.text();
          insertText(text);
          return;
        }
        
        // Handle images
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const imageBlob = await clipboardItem.getType(type);
            await handleImagePaste(imageBlob);
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error accessing clipboard:', error);
      // Fallback to legacy clipboard API
      try {
        const text = await navigator.clipboard.readText();
        insertText(text);
      } catch (legacyError) {
        console.error('Legacy clipboard access failed:', legacyError);
      }
    }
  };

  // Handle image paste
  const handleImagePaste = async (imageBlob: Blob) => {
    try {
      const formData = new FormData();
      const fileName = `pasted-image-${Date.now()}.png`;
      formData.append('file', imageBlob, fileName);

      console.log('🖼️ Uploading pasted image to Vercel Blob...');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const imageMarkdown = `![Pasted Image](${result.url})`;
        insertText(imageMarkdown);
        console.log('✅ Image uploaded successfully:', result.url);
      } else {
        const error = await response.json();
        console.error('❌ Failed to upload image:', error);
        alert('Lỗi upload ảnh: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error uploading pasted image:', error);
      alert('Lỗi upload ảnh: ' + error);
    }
  };

  // Insert text at cursor position
  const insertText = (text: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newValue = value.substring(0, start) + text + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // Convert and insert HTML with image upload
  const handleHtmlConvert = async () => {
    const originalHtml = htmlContent;
    try {
      setIsProcessingHtml(true);
      setHtmlContent('⏳ Đang xử lý và upload ảnh...');
      
      // Convert HTML to Markdown with image upload
      const markdown = await htmlToMarkdownWithImageUpload(originalHtml);
      insertText(markdown);
      setShowPasteModal(false);
      setHtmlContent('');
      
      console.log('✅ HTML conversion completed successfully');
    } catch (error) {
      console.error('❌ Error converting HTML:', error);
      
      // Fallback to basic conversion
      const markdown = htmlToMarkdown(originalHtml);
      insertText(markdown);
      setShowPasteModal(false);
      setHtmlContent('');
      
      alert('Có lỗi khi upload ảnh, đã chuyển đổi HTML cơ bản. Kiểm tra console để biết chi tiết.');
    } finally {
      setIsProcessingHtml(false);
    }
  };

    const renderMarkdown = (markdown: string) => {
    return renderMarkdownToHTML(markdown);
  };

  const insertMarkdown = (before: string, after: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'v':
          e.preventDefault();
          handlePasteFromClipboard();
          break;
        case 'b':
          e.preventDefault();
          insertMarkdown('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', '*');
          break;
      }
    }
  };

  const toolbarButtons = [
    { label: 'Bold (Ctrl+B)', action: () => insertMarkdown('**', '**'), icon: 'B' },
    { label: 'Italic (Ctrl+I)', action: () => insertMarkdown('*', '*'), icon: 'I' },
    { label: 'Code', action: () => insertMarkdown('`', '`'), icon: '</>' },
    { label: 'Link', action: () => insertMarkdown('[', '](url)'), icon: '🔗' },
    { label: 'Image', action: () => insertMarkdown('![alt](', ')'), icon: '🖼️' },
    { label: 'Header 1', action: () => insertMarkdown('# '), icon: 'H1' },
    { label: 'Header 2', action: () => insertMarkdown('## '), icon: 'H2' },
    { label: 'Header 3', action: () => insertMarkdown('### '), icon: 'H3' },
    { label: 'List', action: () => insertMarkdown('- '), icon: '•' },
    { label: 'Quote', action: () => insertMarkdown('> '), icon: '"' },
  ];

  return (
    <>
      <div className={`border rounded-lg ${isFullscreen ? 'fixed inset-4 z-50 bg-white shadow-2xl' : ''}`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b p-2 bg-gray-50">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-100 transition-colors dark:text-black"
                title={button.label}
              >
                {button.icon}
              </button>
            ))}
            
            <div className="border-l mx-2 h-6"></div>
            
            {/* Paste HTML Button */}
            <button
              onClick={handlePasteFromClipboard}
              className="px-3 py-1 text-xs bg-blue-500 text-white border rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
              title="Paste HTML/Image (Ctrl+V)"
            >
              <FaPaste className="text-xs" />
              <span>Paste HTML</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Tab switcher */}
            <div className="flex bg-white border rounded">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 text-sm flex items-center space-x-1 ${
                  activeTab === 'edit' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaEdit className="text-xs" />
                <span>Chỉnh sửa</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 dark:text-black py-1 text-sm flex items-center space-x-1 ${
                  activeTab === 'preview' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaEye className="text-xs" />
                <span>Xem trước</span>
              </button>
            </div>
            
            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-gray-200 rounded dark:text-black"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}>
          {activeTab === 'edit' ? (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm dark:text-black"
              style={{ minHeight: height }}
            />
          ) : (
            <div 
              className="h-full p-4 overflow-y-auto max-w-none"
              style={{
                /* Override any CSS that might hide images */
                lineHeight: '1.6'
              }}
            >
              <div 
                className="prose prose-sm max-w-none"
                style={{
                  /* Ensure images are visible */
                  '--tw-prose-body': 'inherit',
                  '--tw-prose-headings': 'inherit'
                } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
              />
            </div>
          )}
        </div>

        {/* Markdown help */}
        {activeTab === 'edit' && (
          <div className="border-t p-2 bg-gray-50 text-xs text-gray-600">
            <details>
              <summary className="cursor-pointer hover:text-gray-800">Hướng dẫn Markdown</summary>
              <div className="mt-2 space-y-1">
                <div><code># Tiêu đề 1</code> - Tiêu đề lớn</div>
                <div><code>## Tiêu đề 2</code> - Tiêu đề vừa</div>
                <div><code>**in đậm**</code> - <strong>in đậm</strong></div>
                <div><code>*in nghiêng*</code> - <em>in nghiêng</em></div>
                <div><code>`code`</code> - <code>code</code></div>
                <div><code>[link](url)</code> - tạo liên kết</div>
                <div><code>![alt](image-url)</code> - chèn ảnh</div>
                <div><code>- item</code> - danh sách</div>
                <div><code>&gt; quote</code> - trích dẫn</div>
                <div><strong>Paste HTML:</strong> Ctrl+V để dán HTML và tự động chuyển đổi</div>
              </div>
            </details>
          </div>
        )}
      </div>

      {/* HTML Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold dark:text-black flex items-center gap-2">
                <FaPaste />
                Chuyển đổi HTML sang Markdown
              </h2>
              <button
                onClick={() => setShowPasteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML đã paste:
                </label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-32 p-3 border rounded-md font-mono text-sm dark:text-black"
                  placeholder="HTML content sẽ hiển thị ở đây..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Markdown sau chuyển đổi:
                </label>
                <div className="w-full h-32 p-3 border rounded-md bg-gray-50 overflow-y-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap dark:text-black">{htmlToMarkdown(htmlContent)}</pre>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPasteModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  disabled={isProcessingHtml}
                >
                  Hủy
                </button>
                <button
                  onClick={handleHtmlConvert}
                  disabled={isProcessingHtml}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingHtml ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Đang upload ảnh...</span>
                    </>
                  ) : (
                    <>
                      <FaEdit />
                      <span>Chèn Markdown</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 