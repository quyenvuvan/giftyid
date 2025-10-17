import { NextResponse } from 'next/server';
import { sendPartnerRegisterEmail } from '@/lib/email';

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
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.email) {
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

    // Gửi email đăng ký đối tác
    const result = await sendPartnerRegisterEmail({
      businessName: formData.businessName,
      contactName: formData.contactName,
      phone: cleanPhone,
      email: formData.email,
      businessType: formData.businessType,
      currentSalesChannels: formData.currentSalesChannels,
      productCategories: formData.productCategories,
      expectedRevenue: formData.expectedRevenue,
      businessAddress: formData.businessAddress,
      websiteUrl: formData.websiteUrl,
      socialMedia: formData.socialMedia,
      experience: formData.experience,
      additionalInfo: formData.additionalInfo
    });

    if (result.success) {
      return NextResponse.json(
        { message: 'Đăng ký đối tác thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 3 ngày làm việc.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in partner register API:', error);
    return NextResponse.json(
      { error: 'Lỗi server. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
} 