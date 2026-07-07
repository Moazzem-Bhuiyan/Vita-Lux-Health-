import React from 'react';
import MyBookingsPage from './_Comoponent/MybookingsContainer';
export const metadata = {
  title: 'My Bookings',
  description: 'Track all your past and upcoming service bookings',
};

export default function page() {
  return (
    <div>
      <MyBookingsPage />
    </div>
  );
}
