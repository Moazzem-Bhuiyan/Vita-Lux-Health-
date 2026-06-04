import React from 'react';
import ForgotPasswordForm from './_Component/ForgotPasswordForm';
export const metadata = {
  title: 'Forgot Password - Vita Lux Health',
  description:
    'Initiate the password reset process by entering your email address to receive instructions for regaining access to your Vita Lux Health account.',
};

export default function page() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
