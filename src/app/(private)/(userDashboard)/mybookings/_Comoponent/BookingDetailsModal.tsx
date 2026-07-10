'use client';
import { useGetBoookingDetailsbyBookingNumberQuery } from '@/redux/api/bookingApi';
import React from 'react';
import { Calendar, Clock, DollarSign, User, X, MapPin, CreditCard, Info } from 'lucide-react';

interface BookingDetailsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookingNumber: string;
}

export default function BookingDetailsModal({
  open,
  setOpen,
  bookingNumber,
}: BookingDetailsModalProps) {
  const { data, isLoading, isError } = useGetBoookingDetailsbyBookingNumberQuery(
    { BookingNumber: bookingNumber },
    { skip: !open || !bookingNumber }
  );

  const booking = data?.data?.[0];
  const detail = booking?.details?.[0];
  const service = detail?.service;

  if (!open) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-stone-50">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900  font-mono">Booking Details</h2>
            <p className="text-sm text-stone-500">{booking?.booking_number}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)] p-6 space-y-8">
          {isLoading && <div className="py-12 text-center">Loading...</div>}
          {isError && (
            <div className="py-12 text-center text-red-600">Failed to load booking details.</div>
          )}

          {booking && (
            <>
              {/* Status & Basic Info */}
              <div className="flex flex-wrap gap-4 justify-between items-start">
                <div>
                  <span className="text-sm text-stone-500">Status</span>
                  <span
                    className={`inline-block mt-1 px-5 py-2 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {booking.status?.toUpperCase()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-sm text-stone-500">Payment Status</span>
                  <p className="font-semibold text-emerald-600 capitalize">
                    {booking.payment_status}
                  </p>
                </div>
              </div>

              {/* Booking & Appointment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-stone-500 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Appointment Date
                    </p>
                    <p className="font-medium">
                      {detail?.appointment_date
                        ? new Date(detail.appointment_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500 mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Appointment Time
                    </p>
                    <p className="font-medium">{detail?.appointment_time || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500 mb-1">Booking Created</p>
                    <p className="font-medium">
                      {new Date(booking.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-stone-500 mb-1 flex items-center gap-2">
                      <User className="w-4 h-4" /> Practitioner ID
                    </p>
                    <p className="font-medium font-mono text-sm break-all">
                      {detail?.practitioner_id || 'N/A'}
                    </p>
                  </div>

                  {/* <div>
                    <p className="text-xs text-stone-500 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location ID
                    </p>
                    <p className="font-medium">{detail?.location_id || 'N/A'}</p>
                  </div> */}
                </div>
              </div>

              {/* Service Information */}
              <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" /> Service Details
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-stone-500">Service Name</p>
                    <p className="text-xl font-semibold">
                      {service?.service_name || detail?.service_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-stone-500">Price</p>
                      <p className="font-semibold text-lg">${detail?.price}</p>
                    </div>
                    <div>
                      <p className="text-stone-500">Duration</p>
                      <p className="font-semibold">{service?.duration} minutes</p>
                    </div>
                  </div>

                  {/* Full Service Description */}
                  {service?.service_details && (
                    <div>
                      <p className="text-sm text-stone-500 mb-2">Service Description</p>
                      <div className="prose prose-stone text-sm max-h-64 overflow-y-auto bg-white p-4 rounded-xl border">
                        {service.service_details}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {/* {service?.benefits_section && (
                    <div>
                      <p className="text-sm text-stone-500 mb-2">Benefits</p>
                      <div className="prose prose-stone text-sm max-h-48 overflow-y-auto bg-white p-4 rounded-xl border">
                        {service.benefits_section}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Information
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span>${booking.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Discount</span>
                    <span className="text-emerald-600">-${booking.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Tax</span>
                    <span>${booking.tax}</span>
                  </div>

                  <div className="border-t pt-3 mt-3 flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-emerald-700">${booking.total_amount}</span>
                  </div>

                  <div className="pt-4 text-xs text-stone-500">
                    Paid on: {new Date(booking.paid_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {booking.appointment?.note && (
                <div>
                  <p className="text-sm text-stone-500 mb-2">Customer Note</p>
                  <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl text-sm leading-relaxed">
                    {booking.appointment.note}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}
