// RebookModal.tsx
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarClock, Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui';

interface RebookModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookingNumber: string;
  serviceName: string;
}

interface ScheduleState {
  date: Date | undefined;
  time: string;
  note: string;
}

// 30-min slots, 9:00 AM – 6:00 PM
const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  const label = `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;

  const value = `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  return { label, value };
});

export default function RebookModal({
  open,
  setOpen,
  bookingNumber,
  serviceName,
}: RebookModalProps) {
  const [schedule, setSchedule] = useState<ScheduleState>({
    date: undefined,
    time: '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!schedule.date || !schedule.time) {
      alert('Please select both date and time');
      return;
    }

    setIsSubmitting(true);

    try {
      // Postman screenshot uses "form-data" body type, so we send FormData
      // (not URLSearchParams, which is for x-www-form-urlencoded).
      const formData = new FormData();

      formData.append('appointment_date', format(schedule.date, 'yyyy-MM-dd'));

      formData.append('appointment_time', schedule.time);
      console.log('🚀 ~ handleSubmit ~ formData:', formData);

      const res = await fetch(`/booking/rebooking/${bookingNumber}`, {
        method: 'POST',

        // Do NOT set Content-Type manually — the browser sets
        // multipart/form-data with the correct boundary automatically.
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      alert('Rebooking request submitted successfully! 🎉');

      setOpen(false);

      setSchedule({
        date: undefined,
        time: '',
        note: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to rebook. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          !max-w-xl !p-5 sm:max-w-5 overflow-hidden rounded-3xl border border-white/15
          bg-[#0A0A0A]  text-white
          shadow-[0_20px_80px_rgba(0,0,0,0.8)]
        "
      >
        {/* Header */}
        <DialogHeader
          className="
            border-b border-white/10 bg-gradient-to-r
            from-black via-[#111111] to-[#1A1A1A] px-6 py-6
          "
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
              <CalendarClock className="h-7 w-7 text-white" />
            </div>

            <div className="text-left">
              <DialogTitle className="text-2xl font-semibold text-white">
                Rebook Appointment
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm text-zinc-400">
                {serviceName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="flex flex-col gap-6 p-8">
          {/* Time slots grid */}
          <div>
            <Label className="mb-2 block text-white">Preferred Time</Label>

            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const active = schedule.time === slot.value;

                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() =>
                      setSchedule({
                        ...schedule,
                        time: slot.value,
                      })
                    }
                    className="
                      rounded-md border px-2 py-2 text-xs
                      font-medium shadow-sm transition-colors
                    "
                    style={{
                      borderColor: active ? '#FFFFFF' : 'rgba(255,255,255,0.15)',

                      background: active ? '#FFFFFF' : '#18181B',

                      color: active ? '#000000' : '#A1A1AA',
                    }}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date */}
          <div>
            <Label className="mb-2 block text-white">Preferred Date</Label>

            <Popover>
              <PopoverTrigger>
                <Button
                  type="button"
                  variant="outline"
                  className="
                    w-full justify-between border-white/15
                    bg-[#18181B] font-normal text-white
                    shadow-sm hover:bg-[#27272A]
                    hover:text-white
                  "
                >
                  {schedule.date ? (
                    format(schedule.date, 'PPP')
                  ) : (
                    <span className="text-zinc-500">Choose date</span>
                  )}

                  <CalendarIcon className="h-4 w-4 text-white opacity-70" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="
                  w-auto rounded-md border border-white/15
                  bg-[#111111] p-2 text-white shadow-lg
                "
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={schedule.date}
                  onSelect={(date) =>
                    setSchedule({
                      ...schedule,
                      date,
                    })
                  }
                  disabled={(date) => date < new Date(new Date().toDateString())}
                  className="p-2 text-white"
                  classNames={{
                    months: 'flex flex-col sm:flex-row gap-2',

                    month: 'flex flex-col gap-3',

                    caption_label: 'text-sm font-semibold text-white',

                    day: `
                      h-9 w-9 rounded-full font-normal
                      text-zinc-300 hover:bg-white/10
                      aria-selected:bg-white
                      aria-selected:text-black
                      aria-selected:opacity-100
                    `,
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Note */}
          <div></div>
        </div>

        {/* Footer */}
        <DialogFooter
          className="
            flex gap-4 border-t border-white/10
            bg-black p-6 sm:justify-start
          "
        >
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="
              flex-1 border-white/20 bg-transparent
              text-white hover:bg-white/10
              hover:text-white
              h-12
            "
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !schedule.date || !schedule.time}
            className="
              flex-1 bg-white font-semibold
              text-black shadow-lg shadow-white/10
              hover:bg-zinc-200
              disabled:bg-zinc-700
              disabled:text-zinc-400
              h-12
            "
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Rebooking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
