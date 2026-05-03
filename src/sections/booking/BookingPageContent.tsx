"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "./StepIndicator";
import { ServiceStep } from "./ServiceStep";
import { DateTimeStep } from "./DateTimeStep";
import { TherapistStep } from "./TherapistStep";
import { DetailsStep } from "./DetailsStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
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

const INITIAL_STATE: BookingState = {
  serviceId: "",
  therapistId: "any",
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

function canProceed(step: number, state: BookingState): boolean {
  if (step === 1) return !!state.serviceId;
  if (step === 2) return !!state.date && !!state.time;
  if (step === 3) return !!state.therapistId;
  if (step === 4) return !!state.firstName && !!state.lastName && !!state.email;
  return true;
}

export function BookingPageContent() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = SERVICES.find((s) => s.id === booking.serviceId);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const handleDetailsChange = (field: keyof BookingState, value: string) => {
    updateBooking({ [field]: value });
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <>
      {/* Page header */}
      <div className="bg-stone-900 pt-36 pb-12 text-center">
        <p className="eyebrow text-gold-500 mb-3">Reserve Your Experience</p>
        <h1 className="font-serif text-display-md text-cream-50 font-light">
          Book a Treatment
        </h1>
      </div>

      {/* Step indicator */}
      <div className="bg-cream-100 border-b border-stone-200 py-8">
        <div className="container-luxury max-w-3xl">
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Main content */}
      <div className="section-padding bg-cream-50 min-h-[60vh]">
        <div className="container-luxury max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Step content */}
            <div className="lg:col-span-8">
              {step === 1 && (
                <ServiceStep
                  selectedServiceId={booking.serviceId}
                  onSelect={(id) => updateBooking({ serviceId: id })}
                />
              )}
              {step === 2 && (
                <DateTimeStep
                  selectedDate={booking.date}
                  selectedTime={booking.time}
                  onDateSelect={(d) => updateBooking({ date: d, time: "" })}
                  onTimeSelect={(t) => updateBooking({ time: t })}
                />
              )}
              {step === 3 && (
                <TherapistStep
                  selectedTherapistId={booking.therapistId}
                  onSelect={(id) => updateBooking({ therapistId: id })}
                />
              )}
              {step === 4 && (
                <DetailsStep
                  details={{
                    firstName: booking.firstName,
                    lastName: booking.lastName,
                    email: booking.email,
                    phone: booking.phone,
                    notes: booking.notes,
                  }}
                  onChange={handleDetailsChange}
                />
              )}
              {step === 5 && (
                <ConfirmationStep
                  booking={booking}
                  onConfirm={() => setConfirmed(true)}
                  confirmed={confirmed}
                />
              )}

              {/* Navigation buttons */}
              {!confirmed && (
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-stone-200">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={back}
                    disabled={step === 1}
                    className="disabled:opacity-30"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </Button>

                  {step < 5 && (
                    <Button
                      size="md"
                      onClick={next}
                      disabled={!canProceed(step, booking)}
                      className="disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ArrowRight size={14} />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar: booking summary */}
            {!confirmed && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28 border border-stone-200 bg-white p-6 space-y-5">
                  <p className="eyebrow text-gold-600">Your Selection</p>
                  <div className="w-8 h-px bg-gold-500" />

                  {selectedService ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Treatment</p>
                        <p className="font-serif text-stone-900 mt-0.5">{selectedService.name}</p>
                        <p className="font-sans text-xs text-stone-400 mt-0.5">
                          {formatDuration(selectedService.duration)}
                        </p>
                      </div>

                      {booking.date && (
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400">Date</p>
                          <p className="font-sans text-sm text-stone-700 mt-0.5">
                            {new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                            {booking.time && ` · ${booking.time}`}
                          </p>
                        </div>
                      )}

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <p className="font-sans text-xs text-stone-400">Estimated Total</p>
                        <p className="font-serif text-xl text-stone-900">
                          {formatCurrency(selectedService.price)}
                        </p>
                      </div>

                      <p className="font-sans text-[10px] text-stone-400 leading-relaxed">
                        Payment is collected at the venue. No card required to reserve.
                      </p>
                    </div>
                  ) : (
                    <p className="font-sans text-sm text-stone-400 font-light">
                      Your booking summary will appear here as you make your selections.
                    </p>
                  )}

                  {/* Help */}
                  <div className="pt-4 border-t border-stone-100">
                    <p className="font-sans text-[10px] text-stone-400">
                      Need help?{" "}
                      <a href="tel:+12125550192" className="text-gold-600 hover:underline">
                        Call us
                      </a>
                      {" "}or{" "}
                      <a href="/contact" className="text-gold-600 hover:underline">
                        send a message
                      </a>
                    </p>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
