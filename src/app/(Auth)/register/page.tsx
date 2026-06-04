import React from 'react';
import SignupForm from './_Component/SignupForm';
export const metadata = {
  title: 'Sign Up - Vita Lux Health',
  description:
    'Create a new account to access personalized health insights and wellness resources with Vita Lux Health.',
};

export default function page() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}
