import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BLOG_ID || process.env.GOOGLE_SHEETS_BLOG_SPREADSHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Find the row to delete
    const rowNumber = await findPostRow(id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete row from Google Sheets
    const sheets = await getGoogleSheetsClient();
    
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Assuming first sheet
                dimension: 'ROWS',
                startIndex: rowNumber - 1, // 0-based for API
                endIndex: rowNumber, // Exclusive end
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      deletedId: id,
      deletedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete blog post', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 