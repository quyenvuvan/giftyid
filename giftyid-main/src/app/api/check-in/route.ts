import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Add CORS headers
function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 200 }));
}

// Function to get Google Sheets client
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Function to get Vietnam time
function getVietnamTime(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (7 * 3600000)); // Vietnam is UTC+7
}

// Function to format time as HH:MM:SS
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Function to format date as DD/MM/YYYY
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'Unknown';
}

// Function to check if late
function checkLateInfo(checkInTime: Date) {
  const workStartTime = new Date(checkInTime);
  workStartTime.setHours(8, 0, 0, 0); // 8:00 AM

  if (checkInTime > workStartTime) {
    const lateMinutes = Math.floor((checkInTime.getTime() - workStartTime.getTime()) / (1000 * 60));
    return {
      isLate: true,
      lateMinutes,
      message: `Chấm công muộn ${lateMinutes} phút`
    };
  }

  return {
    isLate: false,
    lateMinutes: 0,
    message: 'Chấm công đúng giờ'
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { employeeId, employeeName, note } = body;

    if (!employeeId || !employeeName) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập đầy đủ thông tin nhân viên' },
        { status: 400 }
      );
    }

    // Check Google Sheets configuration
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.log('Missing Google Sheets configuration');
      const errorResponse = NextResponse.json({
        success: false,
        error: 'Google Sheets chưa được cấu hình'
      }, { status: 500 });
      return addCorsHeaders(errorResponse);
    }

    const checkInTime = getVietnamTime();
    const formattedTime = formatTime(checkInTime);
    const formattedDate = formatDate(checkInTime);
    const lateInfo = checkLateInfo(checkInTime);
    const clientIP = getClientIP(request);

    try {
      const sheets = await getGoogleSheetsClient();
      
      // Prepare data to append to Google Sheets
      // [0] Mã nhân viên, [1] Tên nhân viên, [2] Ngày, [3] Thời gian vào, [4] Loại, [5] IP, [6] Ghi chú, [7] Thời gian ra, [8] Báo cáo
      const rowData = [
        employeeId,           // Mã nhân viên
        employeeName,         // Tên nhân viên  
        formattedDate,        // Ngày
        formattedTime,        // Thời gian vào
        'Chấm công vào',      // Loại
        clientIP,             // IP
        note || '',           // Ghi chú
        '',                   // Thời gian ra (empty for check-in)
        ''                    // Báo cáo (empty for check-in)
      ];

      // Append data to Google Sheets
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Timesheet!A:I',
        valueInputOption: 'RAW',
        requestBody: {
          values: [rowData]
        }
      });

      console.log(`Successfully recorded check-in for ${employeeId} at ${formattedTime}`);
      
      const responseData = {
        checkInTime: formattedTime,
        lateInfo
      };

      const message = lateInfo.isLate 
        ? `Chấm công vào thành công lúc ${formattedTime} (muộn ${lateInfo.lateMinutes} phút)`
        : `Chấm công vào thành công lúc ${formattedTime}`;

      const successResponse = NextResponse.json({
        success: true,
        message,
        data: responseData,
        warning: lateInfo.isLate ? `Bạn đã chấm công muộn ${lateInfo.lateMinutes} phút` : null
      });
      
      return addCorsHeaders(successResponse);

    } catch {
      console.error('Error writing to Google Sheets');
      const errorResponse = NextResponse.json({
        success: false,
        error: 'Không thể ghi dữ liệu vào Google Sheets'
      }, { status: 500 });
      return addCorsHeaders(errorResponse);
    }

      } catch {
      console.error('Error in check-in API');
    const errorResponse = NextResponse.json(
      { success: false, error: 'Lỗi server khi chấm công vào' },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
} 