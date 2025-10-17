import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration - Use blog-specific spreadsheet ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BLOG_SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

// Cache configuration
let blogCache: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes - tăng cache time

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

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Function to clean and validate thumbnail URLs
function cleanThumbnailUrl(url: string): string {
  if (!url) {
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format';
  }
  
  // Replace any default-blog.jpg references with placeholder
  if (url.includes('default-blog.jpg') || url.includes('/images/default-blog')) {
    console.log('🔧 Replacing invalid thumbnail URL:', url);
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format';
  }
  
  // Check if URL is valid (starts with http/https or is relative)
  if (!url.startsWith('http') && !url.startsWith('/')) {
    console.log('🔧 Fixing relative URL:', url);
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format';
  }
  
  return url;
}

async function fetchBlogData(): Promise<BlogPost[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A1:L1000', // Adjust range as needed
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    const [header, ...dataRows] = rows;
    
    // Validate header
    if (!header || header.length < 12) {
      console.error('Invalid header in Blog sheet. Expected 12 columns:', header);
      return [];
    }
    
    const blogPosts: BlogPost[] = dataRows
      .filter(row => row && row.length > 0 && row[1]) // Filter out empty rows and rows without title
      .map((row, index) => ({
        id: row[0] || `fallback-${Date.now()}-${index}`,
        title: row[1] || '',
        slug: row[2] || '',
        category: row[3] || 'Uncategorized',
        author: row[4] || 'Admin',
        date: row[5] || new Date().toISOString(),
        thumbnail: cleanThumbnailUrl(row[6] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format'),
        description: row[7] || '',
        content: row[8] || '',
        tags: row[9] || '',
        views: parseInt(row[10]) || 0,
        featured: row[11]?.toLowerCase() === 'true' || false,
      }));

    // Filter valid posts and ensure unique IDs
    const validPosts = blogPosts.filter(post => post.title && post.slug);
    const uniquePosts: BlogPost[] = [];
    const seenIds = new Set<string>();
    
          validPosts.forEach((post) => {
      let uniqueId = post.id;
      let counter = 1;
      
      // Make ID unique if duplicate
      while (seenIds.has(uniqueId)) {
        uniqueId = `${post.id}-dup-${counter}`;
        counter++;
      }
      
      seenIds.add(uniqueId);
      uniquePosts.push({ ...post, id: uniqueId });
    });

    return uniquePosts;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    // Check cache với force refresh option
    const forceRefresh = searchParams.get('_clearCache') === 'true';
    const now = Date.now();
    
    if (!blogCache || (now - cacheTimestamp) > CACHE_DURATION || forceRefresh) {
      console.log('Fetching fresh blog data from Google Sheets...');
      blogCache = await fetchBlogData();
      cacheTimestamp = now;
      console.log(`✅ Loaded ${blogCache.length} blog posts from Google Sheets`);
    } else {
      console.log(`📋 Using cached blog data (${blogCache.length} posts)`);
    }

    let posts = [...blogCache];

    // Filter by ID (single post)
    if (id) {
      const post = posts.find(p => p.id === id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    // Filter by slug (single post)
    if (slug) {
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    // Filter by category
    if (category) {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Get categories and tags for sidebar
    const categories = [...new Set(blogCache.map((p: BlogPost) => p.category))];
    const allTags = blogCache.flatMap((p: BlogPost) => p.tags.split(',').map(tag => tag.trim())).filter(Boolean);
    const tags = [...new Set(allTags)];

    // Get recent posts
    const recentPosts = blogCache
      .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Get featured posts
    const featuredPosts = blogCache.filter((p: BlogPost) => p.featured).slice(0, 3);

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(posts.length / limit),
        totalPosts: posts.length,
        hasNext: endIndex < posts.length,
        hasPrev: page > 1,
      },
      sidebar: {
        categories,
        tags,
        recentPosts,
        featuredPosts,
      },
      cache: {
        lastUpdated: new Date(cacheTimestamp).toISOString(),
        nextUpdate: new Date(cacheTimestamp + CACHE_DURATION).toISOString(),
      },

    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 