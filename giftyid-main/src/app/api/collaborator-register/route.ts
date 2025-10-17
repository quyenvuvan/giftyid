import { NextResponse } from 'next/server';
import { sendCollaboratorRegisterEmail } from '@/lib/email';

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
    if (!formData.fullName || !formData.phone || !formData.email) {
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

    // Validate age
    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 99)) {
      return NextResponse.json(
        { error: 'Tuổi phải từ 18 đến 99' },
        { status: 400 }
      );
    }

    // Gửi email đăng ký cộng tác viên
    const result = await sendCollaboratorRegisterEmail({
      fullName: formData.fullName,
      phone: cleanPhone,
      email: formData.email,
      age: formData.age,
      address: formData.address,
      occupation: formData.occupation,
      experience: formData.experience,
      availableTime: formData.availableTime,
      motivation: formData.motivation,
      referralCode: formData.referralCode,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      accountHolder: formData.accountHolder,
      socialMedia: formData.socialMedia,
      additionalInfo: formData.additionalInfo
    });

    if (result.success) {
      return NextResponse.json(
        { message: 'Đăng ký cộng tác viên thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 2 ngày làm việc để hướng dẫn các bước tiếp theo.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in collaborator register API:', error);
    return NextResponse.json(
      { error: 'Lỗi server. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
} 