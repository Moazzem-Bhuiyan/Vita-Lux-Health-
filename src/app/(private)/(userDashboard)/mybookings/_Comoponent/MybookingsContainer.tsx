'use client';

import Link from 'next/link';
import { Calendar, CheckCircle2, Clock, Loader2, Timer, XCircle } from 'lucide-react';
import { useGetBookingsQuery } from '@/redux/api/bookingApi';
import BookingDetailsModal from './BookingDetailsModal';
import { useState } from 'react';

type BookingStatus = 'completed' | 'upcoming' | 'cancelled' | 'pending';

interface BookingRecord {
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

const STATUS_META: Record<
  BookingStatus,
  { label: string; badgeClass: string; icon: React.ElementType }
> = {
  completed: {
    label: 'Completed',
    badgeClass: 'bg-emerald-50 text-emerald-600',
    icon: CheckCircle2,
  },
  upcoming: { label: 'Upcoming', badgeClass: 'bg-blue-50 text-blue-600', icon: Timer },
  cancelled: { label: 'Cancelled', badgeClass: 'bg-red-50 text-red-600', icon: XCircle },
  pending: { label: 'Pending', badgeClass: 'bg-amber-50 text-amber-600', icon: Clock },
};

export default function MyBookingsPage() {
  const { data, isLoading, isError } = useGetBookingsQuery({});
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);

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
    upcoming: bookings.filter((b) => b.status === 'upcoming').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
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
        <StatCard label="Pending" value={stats.pending} tone="amber" />
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

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'blue' | 'red' | 'amber';
}) {
  const toneClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
  }[tone];

  return (
    <div className={`border shadow-sm rounded-lg px-5 py-4 ${toneClasses}`}>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-0.5 text-xs text-stone-500">{label}</p>
    </div>
  );
}

function BookingCard({ booking }: { booking: BookingRecord }) {
  const meta = STATUS_META[booking.status] || STATUS_META.pending;
  const StatusIcon = meta.icon;

  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);

  return (
    <div className="rounded-md border border-stone-100 bg-white p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-stone-900">{booking.serviceName}</h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${meta.badgeClass}`}
        >
          <StatusIcon className="h-3 w-3" />
          {meta.label}
        </span>
      </div>

      <p className="mt-1.5 text-sm text-stone-500 line-clamp-2">{booking.description}</p>

      <div className="mt-3 flex items-center gap-4 text-xs text-stone-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {booking.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {booking.time} · {booking.duration}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-semibold text-stone-900">${booking.price}</span>
        <button
          onClick={() => setBookingDetailsOpen(true)}
          className="rounded-md bg-stone-900 px-4 py-2 text-xs font-medium text-[#faf6ee] transition-colors hover:bg-stone-800"
        >
          View Details
        </button>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        open={bookingDetailsOpen}
        setOpen={setBookingDetailsOpen}
        bookingNumber={booking.booking_number}
      />
    </div>
  );
}

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
