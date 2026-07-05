'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';

import { useBooking } from './booking-context';
import { Button } from '../ui';

interface BookButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  serviceId?: string;
  [key: string]: any;
}

export function BookButton({ serviceId, children, onClick, className, ...props }: BookButtonProps) {
  const { open } = useBooking();

  return (
    <Button
      {...props}
      className={`group h-12 rounded-full bg-white px-6 text-sm font-medium tracking-wide text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl ${className ?? ''}`}
      onClick={(e) => {
        onClick?.(e);
        open(serviceId);
      }}
    >
      <span>{children ?? 'Book Consultation'}</span>

      {/* <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /> */}
    </Button>
  );
}
