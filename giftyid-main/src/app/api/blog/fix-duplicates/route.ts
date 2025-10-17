import { NextResponse } from 'next/server';
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

export async function POST() {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // Get all data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog!A:L',
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const [, ...dataRows] = rows;
    
    // Find duplicates and fix them
    const seenIds = new Set<string>();
    const duplicates: Array<{ row: number; oldId: string; newId: string }> = [];
    const updates: Array<{ range: string; values: string[][] }> = [];

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header
      const id = row[0];
      
      if (!id || !row[1]) return; // Skip empty rows
      
      if (seenIds.has(id)) {
        // Generate new unique ID
        const newId = `post-${Date.now()}-${index}`;
        duplicates.push({
          row: rowNumber,
          oldId: id,
          newId: newId
        });
        
        // Prepare update
        updates.push({
          range: `Blog!A${rowNumber}`,
          values: [[newId]]
        });
        
        seenIds.add(newId);
      } else {
        seenIds.add(id);
      }
    });

    // Apply updates if any duplicates found
    if (updates.length > 0) {
      const batchUpdateRequest = {
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          valueInputOption: 'RAW',
          data: updates
        }
      };

      await sheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${duplicates.length} duplicate IDs`,
      duplicates: duplicates,
      totalRows: dataRows.length,
      fixedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fixing duplicates:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fix duplicates', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 