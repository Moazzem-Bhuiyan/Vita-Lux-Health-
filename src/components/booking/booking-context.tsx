'use client';

import * as React from 'react';
import { BookingModal } from './booking-modal';
import type { BookingFormData } from './booking-types';

interface BookingContextValue {
  isOpen: boolean;
  open: (serviceId?: string) => void;
  close: () => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

interface BookingProviderProps {
  children: React.ReactNode;
  /** Called when someone taps "Talk with us" inside the modal. */
  onTalkWithUs?: () => void;
  /** Called with the completed form when the user confirms step 3. */
  onSubmit?: (data: BookingFormData) => void | Promise<void>;
}

/**
 * Mount this once near the root of your app (e.g. in app/layout.tsx).
 * Every <BookButton /> anywhere on the site shares this single modal
 * instance instead of each rendering its own dialog.
 */
export function BookingProvider({ children, onTalkWithUs, onSubmit }: BookingProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [defaultServiceId, setDefaultServiceId] = React.useState<string | undefined>(undefined);

  const open = React.useCallback((serviceId?: string) => {
    setDefaultServiceId(serviceId);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, open, close }}>
      {children}
      <BookingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultServiceId={defaultServiceId}
        onTalkWithUs={onTalkWithUs}
      />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = React.useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a <BookingProvider>');
  }
  return ctx;
}
