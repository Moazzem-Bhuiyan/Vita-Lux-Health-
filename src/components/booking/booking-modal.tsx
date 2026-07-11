'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { BookingFormData, BookingStep, LocationOption, ServiceOption } from './booking-types';
import {
  mapBookingSettingsResponse,
  mapServiceListResponse,
  type RawBookingSettingsResponse,
  type RawServiceListResponse,
} from './BookingMappers';
import { Button, Textarea } from '../ui';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { useGetBookingSettingsQuery } from '@/redux/api/locationApi';
import { useSubmitBookingMutation } from '@/redux/api/bookingApi';
import { ModalHeading } from './ModalHeading';
import { StepIndicator } from './StepIndicator';
import { StepPersonal } from './StepPersonal';
import { StepService } from './StepService';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { ConfirmedState } from './ConfirmedState';
import { ReviewGroup, ReviewRow } from './ReviewRow';

const EMPTY_FORM: BookingFormData = {
  personal: { fullName: '', email: '', phone: '' },
  service: { serviceIds: [], locationId: '' },
  schedule: { date: undefined, time: '', note: '' },
};

// const STEPS: { n: BookingStep; label: string }[] = [
//   { n: 1, label: 'Personal Info' },
//   { n: 2, label: 'Service Info' },
//   { n: 3, label: 'Schedule' },
//   { n: 4, label: 'Review' },
// ];
export const TIME_SLOTS = [
  { label: '9:00 AM', value: '9:00 AM' },
  { label: '10:00 AM', value: '10:00 AM' },
  { label: '11:00 AM', value: '11:00 AM' },
  { label: '12:00 PM', value: '12:00 PM' },
  { label: '1:00 PM', value: '1:00 PM' },
  { label: '2:00 PM', value: '2:00 PM' },
  { label: '3:00 PM', value: '3:00 PM' },
  { label: '4:00 PM', value: '4:00 PM' },
  { label: '5:00 PM', value: '5:00 PM' },
  { label: '6:00 PM', value: '6:00 PM' },
];
interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Service to pre-select on step 2, e.g. passed from a service detail page's Book button. */
  defaultServiceId?: string;
  onTalkWithUs?: () => void;
}

export function BookingModal({
  open,
  onOpenChange,
  defaultServiceId,
  onTalkWithUs,
}: BookingModalProps) {
  const [step, setStep] = React.useState<BookingStep>(1);
  const [form, setForm] = React.useState<BookingFormData>(EMPTY_FORM);
  const [error, setError] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const user = useSelector(selectUser);

  // Reset the wizard every time it opens, pre-selecting the service that
  // was passed in (e.g. from a specific service page's Book button).
  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setError('');
    setSubmitted(false);
    const defaultPersonal = {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone_number || user?.phone || '',
    };
    setForm({
      ...EMPTY_FORM,
      service: {
        ...EMPTY_FORM.service,
        serviceIds: defaultServiceId ? [defaultServiceId] : [],
      },
      personal: defaultPersonal,
    });
  }, [open, defaultServiceId, user]);

  // Services — from your existing services API.
  const { data: serviceData, isLoading: servicesLoading } = useGetServicesQuery(
    {},
    { skip: !open }
  ) as { data?: RawServiceListResponse; isLoading: boolean };
  const services = React.useMemo(() => mapServiceListResponse(serviceData), [serviceData]);

  // Locations + practitioner — from your backend's IntakeQ settings proxy.
  const { data: settingsData, isLoading: settingsLoading } = useGetBookingSettingsQuery(undefined, {
    skip: !open,
  }) as { data?: RawBookingSettingsResponse; isLoading: boolean };
  const { locations, practitioners } = React.useMemo(
    () => mapBookingSettingsResponse(settingsData),
    [settingsData]
  );
  // Only one practitioner is supported right now — it's sent along silently,
  // never shown as a field the user picks.
  const practitionerId = practitioners[0]?.id ?? '';

  const selectedServices = React.useMemo(
    () => services.filter((s) => form.service.serviceIds.includes(s.id)),
    [services, form.service.serviceIds]
  );
  const totalPrice = React.useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price, 0),
    [selectedServices]
  );

  const [submitAppointment, { isLoading: isSubmitting }] = useSubmitBookingMutation();

  const updatePersonal =
    (key: keyof BookingFormData['personal']) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, personal: { ...f.personal, [key]: e.target.value } }));

  const validateStep = (s: BookingStep): string => {
    if (s === 1) {
      const { fullName, email, phone } = form.personal;
      if (!fullName.trim()) return 'Please enter your full name.';
      if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
      if (!phone.trim()) return 'Please enter your phone number.';
    }
    if (s === 2) {
      if (form.service.serviceIds.length === 0) return 'Please select at least one service.';
      if (!form.service.locationId) return 'Please select a location.';
    }
    if (s === 3) {
      if (!form.schedule.date) return 'Please choose a preferred date.';
      if (!form.schedule.time) return 'Please choose a preferred time.';
    }
    return '';
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    if (step < 4) {
      setStep((s) => (s + 1) as BookingStep);
    } else {
      void handleConfirm();
    }
  };

  // Step circles only allow jumping *back* to an already-completed step —
  // moving forward again always goes through validation via "Next".
  const handleStepClick = (target: BookingStep) => {
    if (target < step) {
      setError('');
      setStep(target);
    }
  };

  const handleConfirm = async () => {
    setError('');
    const formData = new FormData();

    formData.append('name', form.personal.fullName);
    formData.append('email', form.personal.email);
    formData.append('phone_number', form.personal.phone);

    // Service IDs
    form.service.serviceIds.forEach((id, index) => {
      formData.append(`services[${index}][service_id]`, id);
    });

    formData.append('location_id', String(form.service.locationId));
    formData.append('practitioner_id', practitionerId);
    formData.append(
      'appointment_date',
      form.schedule.date ? format(form.schedule.date, 'yyyy-MM-dd') : ''
    );
    formData.append('appointment_time', form.schedule.time);
    formData.append('price', String(totalPrice));
    formData.append('note', form.schedule.note || '');
    try {
      const res = await submitAppointment(formData).unwrap();

      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setError('Something went wrong while booking. Please try again.');
    }
  };

  console.log('defaultServiceId:', defaultServiceId);
  console.log('selectedIds:', form.service.serviceIds);
  console.log('services:', services);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-lenis-prevent
        className="!w-[calc(100vw-2rem)] gap-0 overflow-hidden border-none bg-white p-0 sm:max-w-2xl max-h-[92vh] flex flex-col"
      >
        <div className="flex max-h-[92vh] flex-col overflow-hidden">
          {' '}
          {/* ← Important */}
          {submitted ? (
            <div className="p-8 sm:p-10">
              <ConfirmedState onClose={() => onOpenChange(false)} />
            </div>
          ) : (
            <>
              {/* Header - Fixed */}
              <div className="shrink-0 px-8 pt-10 sm:px-10">
                <ModalHeading />
                <StepIndicator step={step} onStepClick={handleStepClick} />
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-8 py-6 sm:px-10 custom-modal-scroll">
                {step === 1 && <StepPersonal form={form} onChange={updatePersonal} />}
                {step === 2 && (
                  <StepService
                    form={form}
                    services={services}
                    locations={locations}
                    loading={servicesLoading || settingsLoading}
                    onChange={(next) => setForm((f) => ({ ...f, service: next }))}
                  />
                )}
                {step === 3 && (
                  <StepSchedule
                    form={form}
                    onChange={(next) => setForm((f) => ({ ...f, schedule: next }))}
                  />
                )}
                {step === 4 && (
                  <StepReview
                    form={form}
                    selectedServices={selectedServices}
                    locations={locations}
                    totalPrice={totalPrice}
                  />
                )}
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                <div className="h-8" /> {/* Bottom padding */}
              </div>

              {/* Footer - Fixed */}
              <div className="shrink-0 border-t border-stone-100 px-8 py-5 sm:px-10 bg-white">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 rounded-md h-11 border"
                    onClick={onTalkWithUs}
                  >
                    Talk with us
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 rounded-md bg-stone-900 text-white hover:bg-stone-800 h-11"
                    disabled={isSubmitting}
                    onClick={handleNext}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : step < 4 ? (
                      'Next'
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StepSchedule({
  form,
  onChange,
}: {
  form: BookingFormData;
  onChange: (next: BookingFormData['schedule']) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label className="mb-1.5 block">Preferred Time</Label>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const active = form.schedule.time === slot.value;

            return (
              <button
                key={slot.value}
                type="button"
                onClick={() =>
                  onChange({
                    ...form.schedule,
                    time: slot.value,
                  })
                }
                className="rounded-md border px-2 py-2 text-xs font-medium shadow-sm transition-colors"
                style={{
                  borderColor: active ? '#1c1917' : '#e7e2d8',
                  background: active ? '#1c1917' : '#ffffff',
                  color: active ? '#ffffff' : '#57534e',
                }}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">Preferred Date</Label>
        <Popover>
          <PopoverTrigger>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between border-stone-200 bg-white font-normal shadow-sm"
            >
              {form.schedule.date ? format(form.schedule.date, 'PPP') : 'Choose date'}
              <CalendarIcon className="h-4 w-4 opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto rounded-md border border-stone-200 bg-white p-2 shadow-lg"
            align="start"
          >
            <Calendar
              mode="single"
              selected={form.schedule.date}
              onSelect={(date) => onChange({ ...form.schedule, date })}
              disabled={(date) => date < new Date(new Date().toDateString())}
              // initialFocus
              className="p-2"
              classNames={{
                months: 'flex flex-col sm:flex-row gap-2',
                month: 'flex flex-col gap-3',
                caption_label: 'text-sm font-semibold text-stone-900',

                // // // table: 'w-full border-collapse',
                // // head_cell: 'w-9 text-xs font-medium text-stone-400',
                // cell: 'relative p-0 text-center text-sm',
                day: 'h-9 w-9 rounded-full font-normal text-stone-700 hover:bg-stone-100 aria-selected:opacity-100',
                // day_selected:
                //   'rounded-full bg-stone-900 text-white hover:bg-stone-900 hover:text-white focus:bg-stone-900 focus:text-white',
                // // day_today: 'rounded-full border border-[#c9a96e] text-stone-900',
                // day_outside: 'text-stone-300',
                // day_disabled: 'text-stone-300 opacity-50',
                // nav_button:
                //   'h-7 w-7 rounded-md bg-transparent p-0 text-stone-500 hover:bg-stone-100 hover:text-stone-900',
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="booking-note" className="mb-1.5 block">
          Additional Notes <span className="font-normal text-stone-400">(optional)</span>
        </Label>
        <Textarea
          id="booking-note"
          placeholder="Anything we should know before your visit?"
          value={form.schedule.note}
          onChange={(e) => onChange({ ...form.schedule, note: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}

export function StepReview({
  form,
  selectedServices,
  locations,
  totalPrice,
}: {
  form: BookingFormData;
  selectedServices: ServiceOption[];
  locations: LocationOption[];
  totalPrice: number;
}) {
  const locationName = locations.find((l) => l.id === form.service.locationId)?.name ?? '—';

  const dateLabel = form.schedule.date ? format(new Date(form.schedule.date), 'PPP') : '—';

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <p className="text-sm text-stone-500">
        Please review your details before confirming. You can go back to any step to make changes.
      </p>

      <ReviewGroup title="Personal Info">
        <ReviewRow label="Full Name" value={form.personal.fullName || '—'} />
        <ReviewRow label="Email Address" value={form.personal.email || '—'} />
        <ReviewRow label="Phone Number" value={form.personal.phone || '—'} />
      </ReviewGroup>

      <ReviewGroup title="Service Info">
        {selectedServices.length === 0 ? (
          <ReviewRow label="Services" value="—" />
        ) : (
          selectedServices.map((s) => (
            <ReviewRow key={s.id} label={s.name} value={`$${s.price.toFixed(2)}`} />
          ))
        )}
        <ReviewRow label="Location" value={locationName} />
        <ReviewRow label="Total Price" value={`$${totalPrice.toFixed(2)}`} />
      </ReviewGroup>

      <ReviewGroup title="Schedule">
        <ReviewRow label="Date" value={dateLabel} />
        <ReviewRow label="Time" value={form.schedule.time || '—'} />
        {form.schedule.note && <ReviewRow label="Notes" value={form.schedule.note} />}
      </ReviewGroup>
    </div>
  );
}
