import { Calendar, CheckCircle2, Clock, Timer, XCircle, CalendarClock } from 'lucide-react';
import BookingDetailsModal from './BookingDetailsModal';
import RebookModal from './RebookModal';
import CancleBooking from './CancleBooking';
import { BookingRecord } from './MybookingsContainer';
import { useState } from 'react';

type BookingStatus = 'completed' | 'confirmed' | 'cancelled';

export default function BookingCard({ booking }: { booking: BookingRecord }) {
  const STATUS_META: Record<
    BookingStatus,
    { label: string; badgeClass: string; icon: React.ElementType }
  > = {
    completed: {
      label: 'Completed',
      badgeClass: 'bg-emerald-50 text-emerald-600',
      icon: CheckCircle2,
    },
    confirmed: {
      label: 'Upcoming',
      badgeClass: 'bg-blue-50 text-blue-600',
      icon: Timer,
    },
    cancelled: {
      label: 'Cancelled',
      badgeClass: 'bg-red-50 text-red-600',
      icon: XCircle,
    },
  };

  // Safe fallback
  const meta = STATUS_META[booking.status as BookingStatus] || {
    label: booking.status || 'Unknown',
    badgeClass: 'bg-gray-100 text-gray-600',
    icon: Clock,
  };

  const StatusIcon = meta.icon;

  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [rebookModalOpen, setRebookModalOpen] = useState(false);

  // Conditions
  const isCompleted = booking.status === 'completed';
  const canCancel = booking.status === 'confirmed'; // Only confirmed bookings can be cancelled
  const canRebook = isCompleted || booking.status === 'cancelled';

  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
          {booking.serviceName}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.badgeClass}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {meta.label}
        </span>
      </div>

      <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
        {booking.description}
      </p>

      <div className="mt-4 flex items-center gap-5 text-sm text-stone-500">
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-stone-400" />
          {booking.date}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-stone-400" />
          {booking.time} · {booking.duration}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-2xl font-semibold text-stone-900">${booking.price}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookingDetailsOpen(true)}
            className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-stone-800 active:scale-[0.985]"
          >
            View Details
          </button>

          {/* Rebook Button - Hidden when status is Completed */}
          {canRebook && (
            <button
              onClick={() => setRebookModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-medium text-violet-700 transition-all hover:bg-violet-100 hover:border-violet-300 active:scale-[0.985]"
            >
              <CalendarClock className="h-4 w-4" />
              Rebook
            </button>
          )}

          {/* Cancel Button */}
          {canCancel && <CancleBooking bookingId={booking.id} serviceName={booking.serviceName} />}
        </div>
      </div>

      {/* Modals */}
      <BookingDetailsModal
        open={bookingDetailsOpen}
        setOpen={setBookingDetailsOpen}
        bookingNumber={booking.booking_number}
      />

      <RebookModal
        open={rebookModalOpen}
        setOpen={setRebookModalOpen}
        bookingId={booking.id}
        serviceName={booking.serviceName}
      />
    </div>
  );
}
