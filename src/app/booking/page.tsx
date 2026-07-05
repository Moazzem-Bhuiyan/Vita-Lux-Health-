import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Treatment',
  description:
    'Reserve your luxury spa treatment at Aurum Star Health. Choose your service, therapist, and preferred time.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-10">Book a Treatment</h1>
      {/* Booking form or component goes here */}
    </div>
  );
}
