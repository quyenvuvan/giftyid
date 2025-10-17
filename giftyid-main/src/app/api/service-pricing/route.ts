import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendServicePricingEmail } from '@/lib/email';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_PRICING_SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

// Cache configuration
let pricingCache: ServiceFeature[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ServiceFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  enabled: boolean;
  lastUpdated: string;
  highlight?: boolean;
  included?: boolean;
  details?: string[];
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

async function fetchPricingData(): Promise<ServiceFeature[]> {
  try {

    
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return [];
    }
    
    const sheets = await getGoogleSheetsClient();
    
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    const sheetsList = spreadsheet.data.sheets?.map(sheet => ({
      title: sheet.properties?.title,
      index: sheet.properties?.index
    })) || [];
    
    let dataSheet = sheetsList.find(sheet => sheet.index === 0);
    if (!dataSheet) {
      dataSheet = sheetsList.find(sheet => sheet.index === 1);
    }
    if (!dataSheet) {
      dataSheet = sheetsList.find(sheet => sheet.index === 2);
    }
    
    if (!dataSheet) {
      return [];
    }
    
    // Đọc dữ liệu từ sheet được chọn
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${dataSheet.title}'!A1:H1000`, // Thêm cột H cho details
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      console.log('❌ No data found in sheet');
      return [];
    }

    const [header, ...dataRows] = rows;
    
    if (!header || header.length < 6) {
      return [];
    }
    
    const features: ServiceFeature[] = dataRows
      .filter(row => row && row.length > 0 && row[0])
      .map((row) => {
        const feature: ServiceFeature = {
          id: row[0] || '',
          name: row[1] || '',
          description: row[2] || '',
          price: parseInt(row[3]) || 0,
          category: row[4] || '',
          enabled: row[5]?.toLowerCase() === 'true' || false,
          lastUpdated: row[6] || new Date().toISOString(),
        };
        
        if (row[7]) {
          try {
            feature.details = JSON.parse(row[7]);
          } catch {
            feature.details = row[7].split('|').map((item: string) => item.trim()).filter(Boolean);
          }
        }
        
        return feature;
      });

    const tab3Sheet = sheetsList.find(sheet => sheet.index === 2);
    if (tab3Sheet) {
      try {
        const summaryResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `'${tab3Sheet.title}'!A1:J1000`,
        });

        const summaryRows = summaryResponse.data.values || [];
        if (summaryRows.length > 1) {
          const [, ...summaryDataRows] = summaryRows;
          
          summaryDataRows.forEach(summaryRow => {
            if (summaryRow && summaryRow[0]) {
              const featureId = summaryRow[0];
              const feature = features.find(f => f.id === featureId);
              
              if (feature) {
                if (summaryRow[7]) feature.highlight = summaryRow[7]?.toLowerCase() === 'true';
                if (summaryRow[8]) feature.included = summaryRow[8]?.toLowerCase() === 'true';
                if (summaryRow[9]) {
                  try {
                    feature.details = JSON.parse(summaryRow[9]);
                  } catch {
                    feature.details = summaryRow[9].split('|').map((item: string) => item.trim()).filter(Boolean);
                  }
                }
              }
            }
          });
        }
      } catch {
        // Silent fail
      }
    }

    return features.filter(feature => feature.id && feature.name);
  } catch {
    return [];
  }
}

const FALLBACK_FEATURES: ServiceFeature[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('_clearCache') === 'true';
    const now = Date.now();
    
    if (!pricingCache || (now - cacheTimestamp) > CACHE_DURATION || forceRefresh) {
      const sheetsData = await fetchPricingData();
      
      if (sheetsData.length > 0) {
        pricingCache = sheetsData;
        cacheTimestamp = now;
        
        return NextResponse.json({ 
          success: true, 
          features: pricingCache,
          timestamp: cacheTimestamp,
          source: 'sheets'
        });
      } else {
        pricingCache = FALLBACK_FEATURES;
        cacheTimestamp = now;
        
        return NextResponse.json({ 
          success: true, 
          features: pricingCache,
          timestamp: cacheTimestamp,
          source: 'fallback'
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      features: pricingCache || FALLBACK_FEATURES,
      timestamp: cacheTimestamp,
      source: pricingCache === FALLBACK_FEATURES ? 'fallback' : 'sheets'
    });
  } catch {
    return NextResponse.json({ 
      success: true, 
      features: FALLBACK_FEATURES,
      timestamp: Date.now(),
      source: 'fallback'
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, price, enabled } = await request.json();

    if (!id || (!price && price !== 0 && enabled === undefined)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheetsClient();
    
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    const sheetsList = spreadsheet.data.sheets?.map(sheet => ({
      title: sheet.properties?.title,
      index: sheet.properties?.index
    })) || [];
    
    const dataSheet = sheetsList.find(sheet => sheet.index === 0) || sheetsList.find(sheet => sheet.index === 1);
    if (!dataSheet) {
      return NextResponse.json(
        { error: 'Data sheet not found' },
        { status: 404 }
      );
    }
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${dataSheet.title}'!A1:H1000`,
    });

    const rows = response.data.values || [];
    const dataRows = rows.slice(1);
    
    const rowIndex = dataRows.findIndex(row => row[0] === id);
    if (rowIndex === -1) {
      return NextResponse.json(
        { error: 'Service feature not found' },
        { status: 404 }
      );
    }

    const actualRowIndex = rowIndex + 2;
    const currentRow = dataRows[rowIndex];
    
    if (price !== undefined) {
      currentRow[3] = price.toString();
    }
    if (enabled !== undefined) {
      currentRow[5] = enabled.toString();
    }
    currentRow[6] = new Date().toISOString();

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${dataSheet.title}'!A${actualRowIndex}:H${actualRowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [currentRow],
      },
    });

    pricingCache = null;

    return NextResponse.json({ 
      success: true, 
      message: 'Pricing updated successfully' 
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update pricing' },
      { status: 500 }
    );
  }
}

// Function to verify reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('reCAPTCHA secret key not found');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validate dữ liệu cơ bản
    if (!formData.name || !formData.phone || !formData.email) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA - Skip for development
    if (!formData.recaptchaToken || formData.recaptchaToken === 'development-skip') {
      console.log('Skipping reCAPTCHA validation for development');
    } else {
      const isValidRecaptcha = await verifyRecaptcha(formData.recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'Xác thực reCAPTCHA thất bại. Vui lòng thử lại.' },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Email không đúng định dạng' },
        { status: 400 }
      );
    }

    // Validate phone number (Vietnamese format)
    const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/[-().]/g, '');
    const phoneRegex = /^(0[235789])[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 02, 03, 05, 07, 08 hoặc 09' },
        { status: 400 }
      );
    }

    // Gửi email
    const result = await sendServicePricingEmail({
      name: formData.name,
      phone: cleanPhone,
      email: formData.email,
      coreFeatures: formData.coreFeatures || {},
      extensionFeatures: formData.extensionFeatures || {},
      otherFeatureRequirement: formData.otherFeatureRequirement || ''
    });

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ và báo giá chi tiết trong vòng 24 giờ.',
          success: true 
        },
        { status: 200 }
      );
    } else {
      throw new Error('Lỗi gửi email');
    }
  } catch (error) {
    console.error('Lỗi xử lý form:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
} 