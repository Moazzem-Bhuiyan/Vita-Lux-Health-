import React from 'react';
import OtpVerificationForm from './_Component/OtpVerificationForm';

export const metadata = {
  title: 'OTP Verification - Vita Lux Health',
  description:
    'Verify your account with a one-time password (OTP) sent to your email or phone number for secure access to Vita Lux Health.',
};

export default function page() {
  return (
    <div>
      <OtpVerificationForm />
    </div>
  );
}
