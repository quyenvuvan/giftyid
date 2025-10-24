import nodemailer from 'nodemailer';

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS  // App Password từ Google (không phải mật khẩu thường)
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendConsultationEmail = async (formData: {
  name: string;
  phone: string;
  email: string;
  package: string;
  company?: string;
  message?: string;
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_USER}`, // Gửi về email của bạn
    subject: '🔔 Đăng ký tư vấn mới từ PostGifty',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #1e40af; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🎯 PostGifty - Đăng ký tư vấn mới</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e40af; margin-top: 0;">Thông tin khách hàng:</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">👤 Họ và tên:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📞 Số điện thoại:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="tel:${formData.phone}" style="color: #1e40af; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📧 Email:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="mailto:${formData.email}" style="color: #1e40af; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📦 Gói quan tâm:</td>
              <td style="padding: 12px 0;">
                <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-weight: bold;">
                  ${formData.package}
                </span>
              </td>
            </tr>
            ${formData.company ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🏢 Công ty:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⏰ Thời gian:</td>
              <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>

          ${formData.message ? `
          <div style="margin: 30px 0;">
            <h3 style="color: #1e40af; margin-bottom: 15px; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
              📋 Chi tiết yêu cầu:
            </h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af;">
              <pre style="margin: 0; color: #1f2937; font-family: Arial, sans-serif; white-space: pre-wrap; line-height: 1.6;">${formData.message}</pre>
            </div>
          </div>
          ` : ''}
          
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-weight: 500;">
              💡 <strong>Lưu ý:</strong> Hãy liên hệ với khách hàng trong vòng 24 giờ để có tỷ lệ chuyển đổi cao nhất!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:${formData.phone}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px; display: inline-block;">
              📞 Gọi ngay
            </a>
            <a href="mailto:${formData.email}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              📧 Gửi email
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">Email được gửi tự động từ hệ thống PostGifty</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return { success: false, error };
  }
};

export const sendPartnerRegisterEmail = async (formData: {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  businessType?: string;
  currentSalesChannels?: string;
  productCategories?: string;
  expectedRevenue?: string;
  businessAddress?: string;
  websiteUrl?: string;
  socialMedia?: string;
  experience?: string;
  additionalInfo?: string;
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_USER}`,  // Gửi về email của bạn
    subject: '🤝 Đăng ký đối tác bán hàng mới từ PostGifty',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #7c3aed; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🤝 PostGifty - Đăng ký đối tác mới</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #7c3aed; margin-top: 0;">Thông tin đối tác:</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">🏢 Tên doanh nghiệp:</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold;">${formData.businessName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">👤 Người liên hệ:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📞 Số điện thoại:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="tel:${formData.phone}" style="color: #7c3aed; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📧 Email:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="mailto:${formData.email}" style="color: #7c3aed; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            ${formData.businessType ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🏪 Loại hình kinh doanh:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.businessType}</td>
            </tr>
            ` : ''}
            ${formData.currentSalesChannels ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🛒 Kênh bán hàng hiện tại:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.currentSalesChannels}</td>
            </tr>
            ` : ''}
            ${formData.productCategories ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📦 Danh mục sản phẩm:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.productCategories}</td>
            </tr>
            ` : ''}
            ${formData.expectedRevenue ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">💰 Doanh thu dự kiến:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.expectedRevenue}</td>
            </tr>
            ` : ''}
            ${formData.businessAddress ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📍 Địa chỉ kinh doanh:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.businessAddress}</td>
            </tr>
            ` : ''}
            ${formData.websiteUrl ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🌐 Website:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="${formData.websiteUrl}" target="_blank" style="color: #7c3aed; text-decoration: none;">${formData.websiteUrl}</a>
              </td>
            </tr>
            ` : ''}
            ${formData.socialMedia ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📱 Mạng xã hội:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.socialMedia}</td>
            </tr>
            ` : ''}
            ${formData.experience ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⭐ Kinh nghiệm:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.experience}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⏰ Thời gian đăng ký:</td>
              <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>
          
          ${formData.additionalInfo ? `
          <div style="background-color: #f3f4f6; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">💬 Thông tin bổ sung:</h3>
            <p style="margin: 0; color: #1f2937; line-height: 1.5;">${formData.additionalInfo}</p>
          </div>
          ` : ''}
          
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-weight: 500;">
              💡 <strong>Lưu ý:</strong> Hãy liên hệ với đối tác trong vòng 3 ngày làm việc để tối ưu hóa cơ hội hợp tác!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:${formData.phone}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px; display: inline-block;">
              📞 Gọi ngay
            </a>
            <a href="mailto:${formData.email}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              📧 Gửi email
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">Email được gửi tự động từ hệ thống PostGifty</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Lỗi gửi email đăng ký đối tác:', error);
    return { success: false, error };
  }
};

export const sendCollaboratorRegisterEmail = async (formData: {
  fullName: string;
  phone: string;
  email: string;
  age?: string;
  address?: string;
  occupation?: string;
  experience?: string;
  availableTime?: string;
  motivation?: string;
  referralCode?: string;
  bankName?: string;
  bankAccount?: string;
  accountHolder?: string;
  socialMedia?: string;
  additionalInfo?: string;
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_USER}`,  // Gửi về email của bạn
    subject: '👥 Đăng ký cộng tác viên mới từ PostGifty',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #059669; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">👥 PostGifty - Đăng ký CTV mới</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #059669; margin-top: 0;">Thông tin cộng tác viên:</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">👤 Họ và tên:</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold;">${formData.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📞 Số điện thoại:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="tel:${formData.phone}" style="color: #059669; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📧 Email:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="mailto:${formData.email}" style="color: #059669; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            ${formData.age ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🎂 Tuổi:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.age}</td>
            </tr>
            ` : ''}
            ${formData.address ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📍 Địa chỉ:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.address}</td>
            </tr>
            ` : ''}
            ${formData.occupation ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">💼 Nghề nghiệp:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.occupation}</td>
            </tr>
            ` : ''}
            ${formData.experience ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⭐ Kinh nghiệm bán hàng:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.experience}</td>
            </tr>
            ` : ''}
            ${formData.availableTime ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⏰ Thời gian có thể làm việc:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.availableTime}</td>
            </tr>
            ` : ''}
            ${formData.referralCode ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🔗 Mã giới thiệu:</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold;">${formData.referralCode}</td>
            </tr>
            ` : ''}
            ${formData.bankName ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">🏦 Ngân hàng:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.bankName}</td>
            </tr>
            ` : ''}
            ${formData.bankAccount ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">💳 Số tài khoản:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.bankAccount}</td>
            </tr>
            ` : ''}
            ${formData.accountHolder ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">👤 Chủ tài khoản:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.accountHolder}</td>
            </tr>
            ` : ''}
            ${formData.socialMedia ? `
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📱 Mạng xã hội:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.socialMedia}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⏰ Thời gian đăng ký:</td>
              <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>
          
          ${formData.motivation ? `
          <div style="background-color: #f3f4f6; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">💬 Động lực tham gia:</h3>
            <p style="margin: 0; color: #1f2937; line-height: 1.5;">${formData.motivation}</p>
          </div>
          ` : ''}
          
          ${formData.additionalInfo ? `
          <div style="background-color: #f3f4f6; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">📝 Thông tin bổ sung:</h3>
            <p style="margin: 0; color: #1f2937; line-height: 1.5;">${formData.additionalInfo}</p>
          </div>
          ` : ''}
          
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-weight: 500;">
              💡 <strong>Lưu ý:</strong> Hãy liên hệ với CTV trong vòng 2 ngày làm việc để hướng dẫn các bước tiếp theo!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:${formData.phone}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px; display: inline-block;">
              📞 Gọi ngay
            </a>
            <a href="mailto:${formData.email}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              📧 Gửi email
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">Email được gửi tự động từ hệ thống PostGifty</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Lỗi gửi email đăng ký cộng tác viên:', error);
    return { success: false, error };
  }
};

export const sendServicePricingEmail = async (formData: {
  name: string;
  phone: string;
  email: string;
  coreFeatures: { [key: string]: string };
  extensionFeatures: { [key: string]: string };
  otherFeatureRequirement: string;
}) => {
  // Format core features
  const coreFeaturesList = Object.entries(formData.coreFeatures)
    .filter(([, requirement]) => requirement.trim())
    .map(([feature, requirement]) => `<li><strong>${feature}:</strong> ${requirement}</li>`)
    .join('');

  // Format extension features
  const extensionFeaturesList = Object.entries(formData.extensionFeatures)
    .filter(([, requirement]) => requirement.trim())
    .map(([feature, requirement]) => `<li><strong>${feature}:</strong> ${requirement}</li>`)
    .join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_USER}`,
    subject: '💰 Yêu cầu tính phí dịch vụ mới từ PostGifty',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #f59e0b; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">💰 PostGifty - Yêu cầu tính phí dịch vụ</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #f59e0b; margin-top: 0;">Thông tin khách hàng:</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 30%;">👤 Họ và tên:</td>
              <td style="padding: 12px 0; color: #1f2937;">${formData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📞 Số điện thoại:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="tel:${formData.phone}" style="color: #f59e0b; text-decoration: none;">${formData.phone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">📧 Email:</td>
              <td style="padding: 12px 0; color: #1f2937;">
                <a href="mailto:${formData.email}" style="color: #f59e0b; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151;">⏰ Thời gian:</td>
              <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>

          ${coreFeaturesList ? `
          <div style="margin: 30px 0;">
            <h3 style="color: #1e40af; margin-bottom: 15px; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
              🎯 Tính năng cốt lõi:
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${coreFeaturesList}
            </ul>
          </div>
          ` : ''}

          ${extensionFeaturesList ? `
          <div style="margin: 30px 0;">
            <h3 style="color: #7c3aed; margin-bottom: 15px; border-bottom: 2px solid #ede9fe; padding-bottom: 8px;">
              🚀 Tính năng mở rộng:
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${extensionFeaturesList}
            </ul>
          </div>
          ` : ''}

          ${formData.otherFeatureRequirement ? `
          <div style="margin: 30px 0;">
            <h3 style="color: #8b5cf6; margin-bottom: 15px; border-bottom: 2px solid #f3e8ff; padding-bottom: 8px;">
              ✨ Tính năng khác:
            </h3>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #8b5cf6;">
              ${formData.otherFeatureRequirement}
            </div>
          </div>
          ` : ''}
          
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-weight: 500;">
              💡 <strong>Lưu ý:</strong> Hãy liên hệ với khách hàng trong vòng 24 giờ để báo giá chi tiết!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:${formData.phone}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px; display: inline-block;">
              📞 Gọi ngay
            </a>
            <a href="mailto:${formData.email}" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              📧 Gửi email
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">Email được gửi tự động từ hệ thống PostGifty</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return { success: false, error };
  }
}; 