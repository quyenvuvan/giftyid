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
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Function to get Vietnam time
function getVietnamTime(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (7 * 3600000)); // Vietnam is UTC+7
}

// Function to format date for comparison
function formatDateForComparison(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to normalize date string
function normalizeDate(dateString: string): string {
  if (!dateString) return '';
  
  // Handle different date formats
  const cleanDate = dateString.trim();
  
  // If already in DD/MM/YYYY format, return as is
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanDate)) {
    const [day, month, year] = cleanDate.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }
  
  return cleanDate;
}

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      const errorResponse = NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    const { employeeId } = body;

    if (!employeeId) {
      const errorResponse = NextResponse.json(
        { success: false, error: 'Mã nhân viên không được để trống' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    // Check Google Sheets configuration
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.log('Missing Google Sheets configuration');
      const response = NextResponse.json({
        success: false,
        error: 'Google Sheets chưa được cấu hình'
      }, { status: 500 });
      return addCorsHeaders(response);
    }

    try {
      const sheets = await getGoogleSheetsClient();
      
      // Get data from Google Sheets
      const sheetsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Timesheet!A:I', // Adjust range as needed
      });

      const rows = sheetsResponse.data.values || [];
      console.log(`Checking attendance for employee ${employeeId}, found ${rows.length} total rows`);
      
      // Get today's date in Vietnam timezone
      const today = formatDateForComparison(getVietnamTime());
      console.log('Today date:', today);

      // Initialize attendance data
      let hasCheckedIn = false;
      let hasCheckedOut = false;
      let checkInTime = null;
      let checkOutTime = null;
      let lateInfo = null;
      let earlyInfo = null;

      // Process attendance records - check both column 0 and 1 for employee ID
      const employeeRows = rows.filter(row => 
        row[0] === employeeId || row[1] === employeeId
      );
      console.log(`Found ${employeeRows.length} rows for employee ${employeeId}`);

      for (const row of employeeRows) {
        // Based on actual data structure:
        // [0] Mã nhân viên, [1] Tên nhân viên, [2] Ngày, [3] Thời gian vào, [4] Loại, [5] IP, [6] Ghi chú, [7] Thời gian ra, [8] Báo cáo
        const rowDate = normalizeDate(row[2] || ''); // Ngày in column 2
        const rowCheckInTime = row[3] || ''; // Thời gian vào in column 3
        const rowType = row[4] || ''; // Loại chấm công
        const rowCheckOutTime = row[7] || ''; // Thời gian ra in column 7

        console.log('Processing row:', {
          employeeId: row[0],
          employeeName: row[1],
          originalDate: row[2],
          normalizedDate: rowDate,
          checkInTime: rowCheckInTime,
          type: rowType,
          checkOutTime: rowCheckOutTime
        });

        if (!rowDate) {
          console.log('Skipping row - no valid date found');
          continue;
        }

        // Check today's attendance
        if (rowDate === today) {
          console.log(`Found today's attendance on ${rowDate} - Type: ${rowType}`);
          
          if (rowType === 'Chấm công vào' || rowCheckInTime) {
            hasCheckedIn = true;
            checkInTime = rowCheckInTime;
            console.log(`✓ Today checked in at ${rowCheckInTime}`);
            
            // Calculate late info
            if (rowCheckInTime) {
              const [hours, minutes] = rowCheckInTime.split(':').map(Number);
              const checkInDate = new Date();
              checkInDate.setHours(hours, minutes, 0, 0);
              
              const workStartTime = new Date();
              workStartTime.setHours(8, 0, 0, 0); // 8:00 AM
              
              if (checkInDate > workStartTime) {
                const lateMinutes = Math.floor((checkInDate.getTime() - workStartTime.getTime()) / (1000 * 60));
                lateInfo = {
                  isLate: true,
                  lateMinutes,
                  message: `Chấm công muộn ${lateMinutes} phút`
                };
              } else {
                lateInfo = {
                  isLate: false,
                  lateMinutes: 0,
                  message: 'Chấm công đúng giờ'
                };
              }
            }
          }
          
          if (rowType === 'Chấm công ra' || rowCheckOutTime) {
            hasCheckedOut = true;
            checkOutTime = rowCheckOutTime;
            console.log(`✓ Today checked out at ${rowCheckOutTime}`);
            
            // Calculate early info
            if (rowCheckOutTime) {
              const [hours, minutes] = rowCheckOutTime.split(':').map(Number);
              const checkOutDate = new Date();
              checkOutDate.setHours(hours, minutes, 0, 0);
              
              const workEndTime = new Date();
              workEndTime.setHours(18, 0, 0, 0); // 6:00 PM
              
              if (checkOutDate < workEndTime) {
                const earlyMinutes = Math.floor((workEndTime.getTime() - checkOutDate.getTime()) / (1000 * 60));
                earlyInfo = {
                  isEarly: true,
                  earlyMinutes,
                  message: `Chấm công ra sớm ${earlyMinutes} phút`
                };
              } else {
                earlyInfo = {
                  isEarly: false,
                  earlyMinutes: 0,
                  message: 'Chấm công ra đúng giờ'
                };
              }
            }
          }
        }
      }

      const attendanceData = {
        hasCheckedIn,
        hasCheckedOut,
        checkInTime,
        checkOutTime,
        lateInfo,
        earlyInfo
      };

      console.log('Final attendance data:', attendanceData);

      const successResponse = NextResponse.json({
        success: true,
        data: attendanceData
      });
      
      return addCorsHeaders(successResponse);

    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      const errorResponse = NextResponse.json({
        success: false,
        error: 'Không thể đọc dữ liệu từ Google Sheets'
      }, { status: 500 });
      return addCorsHeaders(errorResponse);
    }

      } catch (error) {
      console.error('Error in check-status API:', error);
    const errorResponse = NextResponse.json(
      { success: false, error: 'Lỗi server khi kiểm tra trạng thái chấm công' },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
} 