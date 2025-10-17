import { NextResponse } from 'next/server';
import { sendConsultationEmail } from '@/lib/email';

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

    // Validate phone number (Vietnamese format) - Support more flexible formats
    const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/[-().]/g, '');
    const phoneRegex = /^(0[235789])[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 02, 03, 05, 07, 08 hoặc 09' },
        { status: 400 }
      );
    }

    // Kiểm tra cấu hình email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ Email not configured, returning mock success for testing');
      console.log('📝 Form data would be sent:', {
        name: formData.name,
        phone: cleanPhone,
        email: formData.email,
        package: formData.package,
        company: formData.company,
        hasMessage: !!formData.message
      });
      
      return NextResponse.json(
        { 
          message: 'Đăng ký thành công! (Email chưa được cấu hình) Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.',
          success: true 
        },
        { status: 200 }
      );
    }

    // Gửi email với số điện thoại đã được làm sạch
    const result = await sendConsultationEmail({
      name: formData.name,
      phone: cleanPhone,
      email: formData.email,
      package: formData.package,
      company: formData.company,
      message: formData.message
    });

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.',
          success: true 
        },
        { status: 200 }
      );
    } else {
      console.error('❌ Email send failed:', result.error);
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