import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Use attendance-specific spreadsheet ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Function to get Google Sheets client
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Function to get Vietnam time
function getVietnamTime(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const vietnam = new Date(utc + (7 * 3600000)); // UTC+7
  return vietnam;
}

// Function to get start of current week (Monday)
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Function to check if we should mark as absent (after work hours or end of day)
function shouldMarkAsAbsent(date: Date, currentTime: Date): boolean {
  // If date is in the future, don't mark as absent
  if (date > currentTime) {
    return false;
  }
  
  // If date is today, only mark as absent after 18:00 (end of work day)
  if (date.toDateString() === currentTime.toDateString()) {
    const currentHour = currentTime.getHours();
    return currentHour >= 18; // After 6 PM
  }
  
  // If date is in the past, mark as absent
  return true;
}

// Function to format date for comparison
function formatDateForComparison(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');
    const weekStartDate = searchParams.get('weekStartDate');

    console.log('GET Attendance stats request for:', employeeId, 'Week start:', weekStartDate);

    if (!employeeId) {
      return NextResponse.json(
        { error: 'Mã nhân viên là bắt buộc' },
        { status: 400 }
      );
    }

    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.log('Missing Google Sheets configuration');
      return NextResponse.json({
        success: true,
        data: {
          currentWeek: {
            totalWorkdays: 5,
            attendedDays: 0,
            attendanceRate: 0,
            missingDays: [],
            weekRange: {
              start: 'N/A',
              end: 'N/A'
            }
          },
          today: {
            hasCheckedIn: false,
            hasCheckedOut: false,
            status: 'Chưa chấm công',
            date: 'N/A'
          },
          weeklyDetails: {}
        },
        warning: 'Google Sheets chưa được cấu hình'
      });
    }

    // Call the main processing function
    return await processAttendanceStats(employeeId, weekStartDate);

  } catch (error) {
    console.error('GET Attendance stats error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra'
    }, { status: 500 });
  }
}

// Main processing function
async function processAttendanceStats(employeeId: string, weekStartDate?: string | null) {
  try {

    console.log('Attendance stats request for:', employeeId, 'Week start:', weekStartDate);

    if (!employeeId) {
      return NextResponse.json(
        { error: 'Mã nhân viên là bắt buộc' },
        { status: 400 }
      );
    }

    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.log('Missing Google Sheets configuration');
      return NextResponse.json({
        success: true,
        data: {
          currentWeek: {
            totalWorkdays: 5,
            attendedDays: 0,
            attendanceRate: 0,
            missingDays: [],
            weekRange: {
              start: 'N/A',
              end: 'N/A'
            }
          },
          today: {
            hasCheckedIn: false,
            hasCheckedOut: false,
            status: 'Chưa chấm công',
            date: 'N/A'
          },
          weeklyDetails: {}
        },
        warning: 'Google Sheets chưa được cấu hình'
      });
    }

    try {
      const sheets = await getGoogleSheetsClient();
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Timesheet!A:I', // Sử dụng sheet name đúng
      });

      const rows = response.data.values || [];
      console.log('Total rows from Google Sheets:', rows.length);
      
      // Get current week dates (Monday to Friday)
      const vietnamNow = getVietnamTime();
      
      // If weekStartDate is provided, use it; otherwise use current week
      let baseDate = vietnamNow;
      if (weekStartDate) {
        // Parse the provided week start date
        const [day, month, year] = weekStartDate.split('/').map(Number);
        baseDate = new Date(year, month - 1, day);
        console.log('Using custom week start date:', baseDate.toISOString());
      }
      
      const startOfWeek = getStartOfWeek(new Date(baseDate));
      
      const weekdays = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekdays.push(date);
      }

      const weekRange = {
        start: formatDateForComparison(weekdays[0]),
        end: formatDateForComparison(weekdays[4])
      };

      console.log('=== DEBUG INFO ===');
      console.log('Vietnam current time:', vietnamNow.toISOString());
      console.log('Current week range:', weekRange);
      console.log('Week days with day names:');
      weekdays.forEach((day, index) => {
        console.log(`  ${index + 1}. ${formatDateForComparison(day)} (${day.toLocaleDateString('vi-VN', { weekday: 'long' })})`);
      });
      
      // Also check data for multiple weeks around current date
      const prevWeekStart = new Date(startOfWeek);
      prevWeekStart.setDate(startOfWeek.getDate() - 7);
      
      const nextWeekStart = new Date(startOfWeek);
      nextWeekStart.setDate(startOfWeek.getDate() + 7);
      
      console.log('Previous week would be:', formatDateForComparison(prevWeekStart), 'to', formatDateForComparison(new Date(prevWeekStart.getTime() + 4 * 24 * 60 * 60 * 1000)));
      console.log('Next week would be:', formatDateForComparison(nextWeekStart), 'to', formatDateForComparison(new Date(nextWeekStart.getTime() + 4 * 24 * 60 * 60 * 1000)));
      console.log('=================');

      // Today's info
      const today = formatDateForComparison(vietnamNow);
      let todayCheckedIn = false;
      let todayCheckedOut = false;

      // Track attendance for the week
      const attendedDays = new Set();
      const attendanceDetails = new Map();

      // Normalize date function
      const normalizeDate = (dateString: string) => {
        if (!dateString) return '';
        
        // Handle different date formats: dd/mm/yyyy, d/m/yyyy, dd/m/yyyy, d/mm/yyyy
        if (dateString.includes('/')) {
          const parts = dateString.split('/');
          if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
            const normalized = `${day}/${month}/${year}`;
            console.log(`Normalized date: "${dateString}" -> "${normalized}"`);
            return normalized;
          }
        }
        
        console.log(`Could not normalize date: "${dateString}"`);
        return dateString;
      };

      // Log all data structure first
      console.log('=== GOOGLE SHEETS DATA STRUCTURE ===');
      if (rows.length > 0) {
        console.log('Header row:', rows[0]);
        console.log('Sample data rows (first 5):');
        rows.slice(1, 6).forEach((row, index) => {
          console.log(`Row ${index + 2}:`, row);
        });
      }
      console.log('=====================================');

      // Process attendance records - check both column 0 and 1 for employee ID
      const employeeRows = rows.filter(row => 
        row[0] === employeeId || row[1] === employeeId
      );
      console.log(`Found ${employeeRows.length} rows for employee ${employeeId}`);
      
      // Log first few rows for debugging
      console.log('Sample employee rows:');
      employeeRows.slice(0, 5).forEach((row, index) => {
        console.log(`  Row ${index + 1}:`, {
          col0: row[0],
          col1: row[1], 
          col2: row[2],
          col3: row[3],
          col4: row[4],
          col5: row[5],
          col6: row[6],
          col7: row[7],
          col8: row[8]
        });
      });

      for (const row of employeeRows) {
        // Determine which column has employee ID
        const rowEmployeeId = row[0] === employeeId ? row[0] : row[1];
        
        // Try different column positions for date based on your data structure
        let rowDate = '';
        let rowCheckInTime = '';
        let rowCheckOutTime = '';
        
        // Based on actual data structure:
        // [0] Mã nhân viên, [1] Tên nhân viên, [2] Ngày, [3] Thời gian vào, [4] Loại, [5] IP, [6] Ghi chú, [7] Thời gian ra, [8] Báo cáo
        if (row[0] === employeeId) {
          rowDate = normalizeDate(row[2] || ''); // Ngày in column 2
          rowCheckInTime = row[3] || ''; // Thời gian vào in column 3
          rowCheckOutTime = row[7] || ''; // Thời gian ra in column 7
        }

        const rowType = row[4] || ''; // Loại chấm công
        
        console.log('Processing row:', {
          employeeId: rowEmployeeId,
          employeeName: row[1],
          originalDate: row[2],
          normalizedDate: rowDate,
          checkInTime: rowCheckInTime,
          type: rowType,
          checkOutTime: rowCheckOutTime,
          note: row[6],
          fullRow: row
        });

        if (!rowDate) {
          console.log('Skipping row - no valid date found');
          continue;
        }

        // Check today's attendance
        if (rowDate === today) {
          console.log(`Found today's attendance on ${rowDate} - Type: ${rowType}`);
          if (rowType === 'Chấm công vào' || rowCheckInTime) {
            todayCheckedIn = true;
            console.log(`  ✓ Today checked in at ${rowCheckInTime}`);
          }
          if (rowType === 'Chấm công ra' || rowCheckOutTime) {
            todayCheckedOut = true;
            console.log(`  ✓ Today checked out at ${rowCheckOutTime}`);
          }
        }

        // Check weekly attendance
        const weekDayFormats = weekdays.map(d => formatDateForComparison(d));
        
        if (weekDayFormats.includes(rowDate)) {
          console.log(`✓ Date ${rowDate} is in current week! Type: ${rowType}`);
          
          if (!attendanceDetails.has(rowDate)) {
            attendanceDetails.set(rowDate, { checkedIn: false, checkedOut: false });
          }
          
          // Process based on type or time presence
          if (rowType === 'Chấm công vào' || rowCheckInTime) {
            attendedDays.add(rowDate);
            attendanceDetails.get(rowDate)!.checkedIn = true;
            console.log(`  ✓ Marked ${rowDate} as checked in at ${rowCheckInTime}`);
          }
          if (rowType === 'Chấm công ra' || rowCheckOutTime) {
            attendanceDetails.get(rowDate)!.checkedOut = true;
            console.log(`  ✓ Marked ${rowDate} as checked out at ${rowCheckOutTime}`);
          }
        } else {
          console.log(`✗ Date ${rowDate} is NOT in current week`);
          console.log(`  Week formats: ${weekDayFormats.join(', ')}`);
        }
      }

      console.log('Attended days:', Array.from(attendedDays));
      console.log('Attendance details:', Object.fromEntries(attendanceDetails));

      // Calculate missing days (only mark as absent after work hours)
      const missingDays = weekdays
        .filter(date => {
          const dateStr = formatDateForComparison(date);
          return !attendedDays.has(dateStr) && shouldMarkAsAbsent(date, vietnamNow);
        })
        .map(date => ({
          date: formatDateForComparison(date),
          dayName: date.toLocaleDateString('vi-VN', { weekday: 'long' })
        }));

      // Calculate attendance rate
      const totalWorkdays = 5;
      const attendedCount = attendedDays.size;
      const attendanceRate = totalWorkdays > 0 ? (attendedCount / totalWorkdays) * 100 : 0;

      // Today's status
      let todayStatus = 'Chưa chấm công';
      if (todayCheckedIn && todayCheckedOut) {
        todayStatus = 'Đã hoàn thành';
      } else if (todayCheckedIn) {
        todayStatus = 'Đã chấm công vào';
      }

      console.log('Final stats:', {
        attendedCount,
        attendanceRate,
        todayStatus,
        missingDays: missingDays.length
      });

      return NextResponse.json({
        success: true,
        data: {
          currentWeek: {
            totalWorkdays,
            attendedDays: attendedCount,
            attendanceRate: Math.round(attendanceRate),
            missingDays,
            weekRange
          },
          today: {
            hasCheckedIn: todayCheckedIn,
            hasCheckedOut: todayCheckedOut,
            status: todayStatus,
            date: today
          },
          weeklyDetails: Object.fromEntries(attendanceDetails)
        }
      });

    } catch (error: unknown) {
      console.error('Google Sheets error:', error);
      
      return NextResponse.json({
        success: true,
        data: {
          currentWeek: {
            totalWorkdays: 5,
            attendedDays: 0,
            attendanceRate: 0,
            missingDays: [],
            weekRange: {
              start: 'N/A',
              end: 'N/A'
            }
          },
          today: {
            hasCheckedIn: false,
            hasCheckedOut: false,
            status: 'Không thể kiểm tra',
            date: 'N/A'
          },
          weeklyDetails: {}
        },
        warning: 'Không thể kết nối với Google Sheets'
      });
    }

  } catch (error) {
    console.error('Attendance stats error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy thống kê chấm công' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, weekStartDate } = body;

    console.log('POST Attendance stats request for:', employeeId, 'Week start:', weekStartDate);

    if (!employeeId) {
      return NextResponse.json(
        { error: 'Mã nhân viên là bắt buộc' },
        { status: 400 }
      );
    }

    // Call the main processing function
    return await processAttendanceStats(employeeId, weekStartDate);

  } catch (error) {
    console.error('POST Attendance stats error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra'
    }, { status: 500 });
  }
} 