"use client";

import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
}

const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>(
  ({ onChange, onExpired, onError, theme = 'light', size = 'normal' }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error('reCAPTCHA site key not found. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.');
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 text-sm">
            reCAPTCHA chưa được cấu hình. Vui lòng liên hệ quản trị viên.
          </p>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={ref}
          sitekey={siteKey}
          onChange={onChange}
          onExpired={onExpired}
          onError={onError}
          theme={theme}
          size={size}
        />
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha; 