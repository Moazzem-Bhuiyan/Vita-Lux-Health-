import React from 'react';
import PaymentSuccessPage from './_Component/PaymentSuccessContainer';

export const metadata = {
  title: 'Payment Success - Vita Lux Health',
  description: 'Payment success page for Vita Lux Health',
};

export default function page() {
  return (
    <div>
      <PaymentSuccessPage />
    </div>
  );
}
