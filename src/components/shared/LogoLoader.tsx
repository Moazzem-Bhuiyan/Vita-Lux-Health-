import React from 'react';
import Image from 'next/image';
import Logo from '@/assets/Logo/Logo.png';

export default function LogoLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#140d04] via-[#1c140b] to-[#140d04]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#c9a96e_0.8px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>

      <div className="flex flex-col items-center gap-10 relative z-10">
        {/* Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Perfect Round Outer Rings */}

          {/* Logo with gentle animation */}
          <div className="relative">
            <Image
              src={Logo}
              alt="Aurum Health"
              width={120}
              height={120}
              className="drop-shadow-2xl animate-[gentle-float_3.5s_ease-in-out_infinite]"
              priority
            />

            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-[#c9a96e]/30 rounded-full blur-2xl -z-10 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-[#c9a96e]/70 to-transparent"></div>
            <p className="text-[#c9a96e] text-sm font-medium tracking-[4px] uppercase">
              Preparing Experience
            </p>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-[#c9a96e]/70 to-transparent"></div>
          </div>

          <p className="text-stone-400 text-xs tracking-[2px] font-light">
            WELCOME TO AURUM HEALTH
          </p>
        </div>
      </div>
    </div>
  );
}
