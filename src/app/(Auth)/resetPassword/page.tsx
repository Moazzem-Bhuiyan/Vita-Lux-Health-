import React from 'react';
import ResetPasswordForm from './_Component/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - Vita Lux Health',
  description: 'Reset your password to regain access to your Vita Lux Health account.',
};

export default function page() {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
}
