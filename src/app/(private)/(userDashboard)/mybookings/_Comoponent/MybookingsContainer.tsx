'use client';

import { Calendar, Loader2, Timer, XCircle } from 'lucide-react';
import { useGetBookingsQuery } from '@/redux/api/bookingApi';
import { StatCard } from './StatCard';
import BookingCard from './Bookingcard';

type BookingStatus = 'completed' | 'confirmed' | 'cancelled' | 'pending';

export interface BookingRecord {
  id: string | number;
  serviceName: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  booking_number: string;
  status: BookingStatus;
}

export default function MyBookingsPage() {
  const { data, isLoading, isError } = useGetBookingsQuery({});

  // Extract bookings from API response
  const bookingsData = data?.data?.data || [];

  const bookings: BookingRecord[] = bookingsData.map((item: any) => ({
    id: item.id,
    serviceName: item.appointment?.name || 'Service Booking',
    description: item.appointment?.note || 'No description available',
    date: new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: new Date(item.created_at).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    duration: '60 min', // You can adjust this if duration is available in API
    price: parseFloat(item.total_amount || '0'),
    status: (item.status as BookingStatus) || 'pending',
    booking_number: item.booking_number,
  }));

  const stats = {
    completed: bookings.filter((b) => b.status === 'completed').length,
    upcoming: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-3xl text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
        Booking History
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Track all your past and upcoming service bookings
      </p>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Completed" value={stats.completed} tone="emerald" />
        <StatCard label="Upcoming" value={stats.upcoming} tone="blue" />
        <StatCard label="Cancelled" value={stats.cancelled} tone="red" />
      </div>

      {/* Bookings List */}
      <div className="mt-8">
        {isLoading && <StateMessage icon={Loader2} text="Loading your bookings…" spin />}

        {isError && (
          <StateMessage icon={XCircle} text="Couldn't load your bookings. Please try again." />
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <StateMessage icon={Calendar} text="You don't have any bookings yet." />
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================== Sub Components ====================== */

function StateMessage({
  icon: Icon,
  text,
  spin,
}: {
  icon: React.ElementType;
  text: string;
  spin?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-stone-200 py-16 text-stone-400">
      <Icon className={`h-8 w-8 ${spin ? 'animate-spin' : ''}`} />
      <p className="text-sm text-center max-w-xs">{text}</p>
    </div>
  );
}
