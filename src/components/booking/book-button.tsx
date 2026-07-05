'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import { useBooking } from './booking-context';
import { Button } from '../ui';
import { selectUser } from '@/redux/features/authSlice';
import { LoginAlertModal } from '../shared/LoginAlertModal';

interface BookButtonProps {
  children?: React.ReactNode;
  serviceId?: string;
  className?: string;
  [key: string]: any;
}

export function BookButton({ serviceId, children, className, ...props }: BookButtonProps) {
  const { open } = useBooking();
  const user = useSelector(selectUser);

  const router = useRouter();
  const pathname = usePathname();

  const [showModal, setShowModal] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) {
      setShowModal(true);
      return;
    }

    open(serviceId);
  };

  const handleGoToLogin = () => {
    setShowModal(false);
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  };

  return (
    <>
      <Button
        {...props}
        onClick={handleClick}
        className={`group h-12 rounded-full bg-white px-6 text-sm font-medium tracking-wide text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:text-white hover:shadow-xl ${
          className ?? ''
        }`}
      >
        {children ?? 'Book Consultation'}
      </Button>

      <LoginAlertModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={handleGoToLogin}
      />
    </>
  );
}
