import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BLOG_ID || process.env.GOOGLE_SHEETS_BLOG_SPREADSHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

interface CreateBlogPost {
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

function generateSlug(title: string): string {
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
}

async function getNextId(): Promise<string> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A:A',
    });

    const rows = response.data.values || [];
    const ids = rows.slice(1) // Skip header
      .map(row => row[0])
      .filter(id => id && id.startsWith('post-'))
      .map(id => parseInt(id.replace('post-', '')))
      .filter(num => !isNaN(num));

    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return `post-${maxId + 1}`;
  } catch (error) {
    console.error('Error getting next ID:', error);
    return `post-${Date.now()}`;
  }
}

async function checkSlugExists(slug: string): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!C:C', // Column C contains slugs
    });

    const rows = response.data.values || [];
    const slugs = rows.slice(1).map(row => row[0]).filter(Boolean);
    
    return slugs.includes(slug);
  } catch (error) {
    console.error('Error checking slug:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBlogPost = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    let slug = body.slug || generateSlug(body.title);
    
    // Check if slug exists and make it unique
    const originalSlug = slug;
    let counter = 1;
    while (await checkSlugExists(slug)) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    // Generate ID
    const id = await getNextId();
    
    // Prepare data for Google Sheets
    const currentDate = new Date().toISOString();
    const rowData = [
      id,
      body.title,
      slug,
      body.category || 'Uncategorized',
      body.author || 'Admin',
      currentDate,
      body.thumbnail || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format',
      body.description || '',
      body.content,
      body.tags || '',
      0, // views
      body.featured ? 'true' : 'false'
    ];

    // Add to Google Sheets
    const sheets = await getGoogleSheetsClient();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A:L',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        id,
        title: body.title,
        slug,
        category: body.category || 'Uncategorized',
        author: body.author || 'Admin',
        date: currentDate,
        thumbnail: body.thumbnail || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format',
        description: body.description || '',
        content: body.content,
        tags: body.tags || '',
        views: 0,
        featured: body.featured || false,
      }
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create blog post', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 