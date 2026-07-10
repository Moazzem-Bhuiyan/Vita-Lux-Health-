// Updated BookingCard.tsx (only changed parts)
import { Calendar, CheckCircle2, Clock, Timer, XCircle, X, CalendarClock } from 'lucide-react';
import BookingDetailsModal from './BookingDetailsModal';
import { BookingRecord } from './MybookingsContainer';
import { useState } from 'react';
import RebookModal from './RebookModal';

type BookingStatus = 'completed' | 'upcoming' | 'cancelled' | 'pending';

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
    upcoming: { label: 'Upcoming', badgeClass: 'bg-blue-50 text-blue-600', icon: Timer },
    cancelled: { label: 'Cancelled', badgeClass: 'bg-red-50 text-red-600', icon: XCircle },
    pending: { label: 'Pending', badgeClass: 'bg-amber-50 text-amber-600', icon: Clock },
  };

  const meta = STATUS_META[booking.status] || STATUS_META.pending;
  const StatusIcon = meta.icon;

  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [rebookModalOpen, setRebookModalOpen] = useState(false); // ← Changed

  const canCancel = booking.status !== 'completed';

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

          {/* Rebook Button */}
          <button
            onClick={() => setRebookModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-medium text-violet-700 transition-all hover:bg-violet-100 hover:border-violet-300 active:scale-[0.985]"
          >
            <CalendarClock className="h-4 w-4" />
            Rebook
          </button>

          {canCancel && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to cancel this booking?')) {
                  console.log('Cancelling booking:', booking.booking_number);
                }
              }}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:border-red-300 active:scale-[0.985]"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </div>

      <BookingDetailsModal
        open={bookingDetailsOpen}
        setOpen={setBookingDetailsOpen}
        bookingNumber={booking.booking_number}
      />

      {/* Rebook Modal */}
      <RebookModal
        open={rebookModalOpen}
        setOpen={setRebookModalOpen}
        bookingNumber={booking.booking_number}
        serviceName={booking.serviceName}
      />
    </div>
  );
}
