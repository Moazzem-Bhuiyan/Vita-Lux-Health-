import { CheckCircle, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
import { THERAPISTS } from "@/lib/data/misc";
import { formatCurrency, formatDuration } from "@/lib/utils";

interface BookingState {
  serviceId: string;
  therapistId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

interface Props {
  booking: BookingState;
  onConfirm: () => void;
  confirmed: boolean;
}

export function ConfirmationStep({ booking, onConfirm, confirmed }: Props) {
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const therapist = THERAPISTS.find((t) => t.id === booking.therapistId);

  const formattedDate = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  if (confirmed) {
    return (
      <div className="text-center space-y-8 py-8">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={36} className="text-sage-600" />
        </div>
        <div className="space-y-3">
          <h2 className="font-serif text-3xl text-stone-900">Reservation Confirmed</h2>
          <p className="font-sans text-stone-500 font-light max-w-md mx-auto leading-relaxed">
            Your appointment has been confirmed. A detailed confirmation has been sent to{" "}
            <span className="text-stone-700">{booking.email}</span>.
          </p>
        </div>

        <div className="max-w-sm mx-auto border border-stone-200 p-6 space-y-3 text-left bg-white">
          <p className="eyebrow text-gold-600 text-center">Your Booking Summary</p>
          <div className="w-8 h-px bg-gold-500 mx-auto" />
          <div className="space-y-2 pt-2">
            {[
              { label: "Treatment", value: service?.name ?? "" },
              { label: "Date", value: formattedDate },
              { label: "Time", value: booking.time },
              { label: "Therapist", value: therapist?.name ?? "Best Available" },
              { label: "Total", value: formatCurrency(service?.price ?? 0) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="font-sans text-xs text-stone-400 uppercase tracking-wide">{label}</span>
                <span className="font-sans text-sm text-stone-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/services">
            <Button variant="secondary" size="md">
              Explore More Treatments
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 mb-1">Review & Confirm</h2>
        <p className="font-sans text-sm text-stone-400 font-light">
          Please review your booking details before confirming.
        </p>
      </div>

      {/* Summary card */}
      <div className="border border-stone-200 bg-white divide-y divide-stone-100">
        {/* Service */}
        {service && (
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-cream-200 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-gold-600" />
            </div>
            <div className="flex-1">
              <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Treatment</p>
              <p className="font-serif text-stone-900">{service.name}</p>
              <p className="font-sans text-xs text-stone-400">
                {formatDuration(service.duration)} · {formatCurrency(service.price)}
              </p>
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-cream-200 flex items-center justify-center flex-shrink-0">
            <Calendar size={16} className="text-gold-600" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Date & Time</p>
            <p className="font-serif text-stone-900">{formattedDate}</p>
            <p className="font-sans text-xs text-stone-400">{booking.time}</p>
          </div>
        </div>

        {/* Therapist */}
        <div className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-cream-200 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-gold-600" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Therapist</p>
            <p className="font-serif text-stone-900">
              {therapist ? therapist.name : "Best Available Specialist"}
            </p>
            {therapist && (
              <p className="font-sans text-xs text-stone-400">{therapist.title}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-cream-200 flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-gold-600" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Contact</p>
            <p className="font-serif text-stone-900">
              {booking.firstName} {booking.lastName}
            </p>
            <p className="font-sans text-xs text-stone-400">{booking.email}</p>
            {booking.phone && (
              <p className="font-sans text-xs text-stone-400">{booking.phone}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="p-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-1">Special Requests</p>
            <p className="font-sans text-sm text-stone-600 font-light">{booking.notes}</p>
          </div>
        )}

        {/* Price total */}
        <div className="p-5 bg-stone-50 flex items-center justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Total</p>
            <p className="font-sans text-xs text-stone-400 font-light">Payment collected at venue</p>
          </div>
          <p className="font-serif text-2xl text-stone-900">
            {formatCurrency(service?.price ?? 0)}
          </p>
        </div>
      </div>

      {/* Cancellation policy */}
      <div className="p-4 border-l-2 border-gold-500 bg-cream-100">
        <p className="font-sans text-[10px] uppercase tracking-widest text-gold-600 mb-1">Cancellation Policy</p>
        <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
          Cancellations made 24 hours or more before your appointment are fully refundable. 
          Late cancellations may incur a 50% service charge.
        </p>
      </div>

      <Button size="lg" fullWidth onClick={onConfirm}
        className="bg-stone-900 hover:bg-stone-800 text-cream-50"
      >
        <CheckCircle size={16} />
        Confirm My Reservation
      </Button>
    </div>
  );
}
