// CancelBooking.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useCancleBookingMutation } from '@/redux/api/bookingApi';
import { toast } from 'sonner';
import { Button, Textarea } from '@/components/ui';

interface CancelBookingProps {
  bookingId: string | number;
  serviceName?: string; // Optional for better UX
}

export default function CancelBooking({ bookingId, serviceName }: CancelBookingProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [cancelBooking, { isLoading }] = useCancleBookingMutation();

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    try {
      await cancelBooking({
        id: bookingId,
        payload: { reason: reason.trim() },
      }).unwrap();

      toast.success('Booking cancelled successfully');
      setOpen(false);
      setReason('');
    } catch (error: any) {
      const errorMsg = error?.data?.message || 'Failed to cancel booking. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <>
      {/* Cancel Button */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 h-11 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:border-red-300 active:scale-[0.985]"
      >
        <X className="h-4 w-4" />
        Cancel
      </Button>

      {/* Cancel Reason Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-md !max-w-lg rounded-3xl !bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Cancel Booking</DialogTitle>
            {serviceName && (
              <DialogDescription className="text-sm text-muted-foreground">
                {serviceName}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="reason" className="mb-2 block">
              Reason for cancellation <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please tell us why you want to cancel this booking..."
              value={reason}
              onChange={(e: any) => setReason(e.target.value)}
              className="min-h-[120px] resize-y"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              This will help us improve our service.
            </p>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setReason('');
              }}
              disabled={isLoading}
              className=" hover:bg-black/80 text-black hover:text-white h-11"
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isLoading || !reason.trim()}
              className="bg-black hover:bg-black/80 text-white h-11"
            >
              {isLoading ? 'Cancelling...' : 'Confirm Cancellation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
