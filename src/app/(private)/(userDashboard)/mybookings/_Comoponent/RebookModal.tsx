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
import { useRebookingServiceMutation } from '@/redux/api/bookingApi';
import { toast } from 'sonner';
import { Button } from '@/components/ui';

interface RebookModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  serviceName: string;
  bookingId: string | number;
}

interface ScheduleState {
  date: Date | undefined;
  time: string;
  note: string;
}

// 30-minute slots: 9:00 AM – 6:00 PM
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

export default function RebookModal({ open, setOpen, serviceName, bookingId }: RebookModalProps) {
  const [schedule, setSchedule] = useState<ScheduleState>({
    date: undefined,
    time: '',
    note: '',
  });

  const [rebook, { isLoading: isRebooking }] = useRebookingServiceMutation();

  const handleSubmit = async () => {
    if (!schedule.date || !schedule.time) {
      toast.error('Please select both date and time');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('appointment_date', format(schedule.date, 'yyyy-MM-dd'));
      formData.append('appointment_time', schedule.time);

      const res = await rebook({ id: bookingId, payload: formData }).unwrap();

      // Success handling
      toast.success('Rebooking request submitted successfully!', {
        description: 'You will be redirected or notified shortly.',
      });

      setOpen(false);

      // Reset form after successful submission
      setSchedule({
        date: undefined,
        time: '',
        note: '',
      });

      // Optional: redirect if checkout URL is returned
      if (res?.data?.checkout_url) {
        setTimeout(() => {
          window.location.href = res.data.checkout_url;
        }, 1500);
      }
    } catch (error: any) {
      // Exact error message handling
      const errorMessage =
        error?.data?.message || error?.message || 'Failed to rebook appointment. Please try again.';

      toast.error(errorMessage, {
        description: 'If the problem persists, please contact support.',
      });

      console.error('Rebooking error:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setSchedule({
      date: undefined,
      time: '',
      note: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-w-3xl p-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] text-white shadow-2xl">
        {/* Header */}
        <DialogHeader className="border-b border-white/10 bg-gradient-to-r from-black via-[#111111] to-[#1A1A1A] px-8 py-7">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
              <CalendarClock className="h-7 w-7 text-violet-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-semibold">Rebook Appointment</DialogTitle>
              <DialogDescription className="text-zinc-400 mt-1">{serviceName}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Time Slots */}
          <div>
            <Label className="mb-3 block text-sm font-medium text-white">Preferred Time</Label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isActive = schedule.time === slot.value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => setSchedule((prev) => ({ ...prev, time: slot.value }))}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-white bg-white text-black shadow-md'
                        : 'border-white/15 bg-[#18181B] hover:border-white/30 hover:bg-[#27272A]'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <Label className="mb-3 block text-sm font-medium text-white">Preferred Date</Label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  className="w-full justify-between border-white/15 bg-[#18181B] hover:bg-[#27272A] hover:text-white text-white h-12"
                >
                  {schedule.date ? format(schedule.date, 'PPP') : 'Select date'}
                  <CalendarIcon className="h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-[#111111] border-white/15 p-0" align="start">
                <Calendar
                  mode="single"
                  selected={schedule.date}
                  onSelect={(date) => setSchedule((prev) => ({ ...prev, date }))}
                  disabled={(date) => date < new Date(new Date().toDateString())}
                  className="p-3 text-white"
                  classNames={{
                    day: 'h-9 w-9 rounded-full text-zinc-200 hover:bg-white/10 aria-selected:bg-white aria-selected:text-black',
                    caption_label: 'text-white font-medium',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-white/10 bg-black p-6 gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-white/20 hover:bg-white/10 hover:text-white h-12"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isRebooking || !schedule.date || !schedule.time}
            className="flex-1 bg-white text-black font-semibold hover:bg-zinc-100 h-12 disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {isRebooking ? 'Submitting...' : 'Confirm Rebooking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
