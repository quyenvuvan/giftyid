/**
 * Shared Markdown Renderer Utility
 * Can be used in both MarkdownEditor preview and blog detail pages
 */

export const renderMarkdownToHTML = (markdown: string): string => {
  // First, extract and protect images to avoid them being affected by other replacements
  const imageMatches: Array<{match: string, placeholder: string}> = [];
  let imageCounter = 0;
  
  let html = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const placeholder = `__IMAGE_PLACEHOLDER_${imageCounter++}__`;
    imageMatches.push({
      match: `<img src="${src}" alt="${alt || 'Uploaded image'}" class="max-w-full h-auto rounded-md my-3 block" style="display: block !important; max-width: 100% !important; border: 1px solid #e5e5e5;" loading="lazy" onerror="this.style.border='1px solid red'; this.alt='❌ Không thể tải ảnh: ${src}';" />`,
      placeholder
    });
    return placeholder;
  });

  // Now process other markdown
  html = html
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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists
    .replace(/^\* (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
    
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-3">$1</blockquote>')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>');

  // Restore images
  imageMatches.forEach(({match, placeholder}) => {
    html = html.replace(placeholder, match);
  });

  // Wrap in paragraph tags
  html = '<p class="mb-3">' + html + '</p>';
  
  // Clean up empty paragraphs and fix image wrapping
  html = html
    .replace(/<p class="mb-3"><\/p>/g, '')
    .replace(/<p class="mb-3">(<img[^>]*>)<\/p>/g, '$1'); // Remove paragraph wrapping from images

  return html;
};

/**
 * Simple function to render markdown for React components using dangerouslySetInnerHTML
 * For use in React components - just use dangerouslySetInnerHTML with the HTML output
 */
export const renderMarkdownForReact = (markdown: string) => {
  return renderMarkdownToHTML(markdown);
}; 