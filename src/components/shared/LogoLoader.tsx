import React from 'react';
import Image from 'next/image';

import Logo from '@/assets/Logo/Logo.png';

export default function LogoLoader() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with Animation */}
        <div className="relative">
          <Image
            src={Logo}
            alt="Loading"
            width={50}
            height={50}
            className="animate-spin-slow drop-shadow-sm"
            priority
          />

          {/* Subtle outer ring */}
          <div className="absolute -inset-4 rounded-full border-4 border-[#C9A96E]/20 animate-pulse"></div>
        </div>

        {/* Simple Text */}
        <p className="text-stone-500 text-sm font-medium tracking-wider">Loading...</p>
      </div>
    </div>
  );
}
