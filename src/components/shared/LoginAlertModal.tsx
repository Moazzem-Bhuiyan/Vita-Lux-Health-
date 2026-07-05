'use client';

import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui';

interface LoginAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginAlertModal({ isOpen, onClose, onLogin }: LoginAlertModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden gap-0 bg-white">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Login Required</DialogTitle>

            {/* <DialogClose>
              <button className="rounded-full p-2 hover:bg-stone-100 transition-colors">
                <X className="h-5 w-5 text-stone-500" />
              </button>
            </DialogClose> */}
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-8 py-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100">
            <span className="text-4xl">🔐</span>
          </div>

          <h3 className="mb-3 text-2xl font-semibold text-stone-900">Please Login to Continue</h3>

          <DialogDescription className="text-[15px] leading-relaxed text-stone-600">
            You need to be logged in to book this service.
          </DialogDescription>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t p-6 sm:flex-row">
          <Button variant="outline" className="flex-1 h-12" onClick={onClose}>
            Cancel
          </Button>

          <Button className="flex-1 h-12 bg-[#1a1008] text-white hover:bg-black" onClick={onLogin}>
            Go to Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
