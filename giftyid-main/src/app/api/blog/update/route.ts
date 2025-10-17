import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BLOG_ID || process.env.GOOGLE_SHEETS_BLOG_SPREADSHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

interface UpdateBlogPost {
  id: string;
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

async function findPostRow(id: string): Promise<number | null> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A:A',
    });

    const rows = response.data.values || [];
    
    for (let i = 1; i < rows.length; i++) { // Skip header row
      if (rows[i][0] === id) {
        return i + 1; // Return 1-based row number
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding post row:', error);
    return null;
  }
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

async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A:C', // ID and slug columns
    });

    const rows = response.data.values || [];
    
    for (let i = 1; i < rows.length; i++) { // Skip header
      const [id, , existingSlug] = rows[i];
      if (existingSlug === slug && id !== excludeId) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking slug:', error);
    return false;
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateBlogPost = await request.json();
    
    // Validate required fields
    if (!body.id || !body.title || !body.content) {
      return NextResponse.json(
        { error: 'ID, title and content are required' },
        { status: 400 }
      );
    }

    // Find the row to update
    const rowNumber = await findPostRow(body.id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate slug if not provided or make it unique
    let slug = body.slug || generateSlug(body.title);
    
    // Check if slug exists (excluding current post)
    const originalSlug = slug;
    let counter = 1;
    while (await checkSlugExists(slug, body.id)) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    // Prepare data for Google Sheets
    const rowData = [
      body.id, // Keep original ID
      body.title,
      slug,
      body.category || 'Uncategorized',
      body.author || 'Admin',
      new Date().toISOString(), // Update date
      body.thumbnail || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format',
      body.description || '',
      body.content,
      body.tags || '',
      0, // Reset views (or keep existing?)
      body.featured ? 'true' : 'false'
    ];

    // Update Google Sheets
    const sheets = await getGoogleSheetsClient();
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Blog!A${rowNumber}:L${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        id: body.id,
        title: body.title,
        slug,
        category: body.category || 'Uncategorized',
        author: body.author || 'Admin',
        date: new Date().toISOString(),
        thumbnail: body.thumbnail || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format',
        description: body.description || '',
        content: body.content,
        tags: body.tags || '',
        views: 0,
        featured: body.featured || false,
      }
    });

  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update blog post', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 