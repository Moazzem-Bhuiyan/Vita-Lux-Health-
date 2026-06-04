'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthCard, AuthButton, OtpInput } from '@/components/shared/AuthPrimitives';
import { useRouter } from 'next/navigation';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function OtpVerificationForm({ email = 'you@luxespa.com' }: { email?: string }) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleResend = () => {
    setCountdown(RESEND_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    // Simulate wrong OTP
    if (code === '000000') {
      setError('Invalid code. Please try again.');
      setOtp(Array(OTP_LENGTH).fill(''));
      return;
    }
    setSuccess(true);
    router.push('/resetPassword');
  };

  if (success) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.1 }}
            className="w-20 h-20 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/8 flex items-center justify-center mb-7"
          >
            <ShieldCheck className="text-[#c9a96e]" size={32} />
          </motion.div>
          <h2 className="text-white font-serif text-3xl font-bold mb-3">Verified!</h2>
          <p className="text-white/40 text-sm mb-8">Your identity has been confirmed.</p>
          <Link
            href="/auth/reset-password"
            className="flex items-center gap-2 text-[#c9a96e] text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Set new password <ArrowRight size={14} />
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Back */}
      <Link
        href="/auth/forgot-password"
        className="flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors mb-8"
      >
        <ArrowLeft size={13} /> Back
      </Link>

      <div className="text-center mb-8">
        {/* Shield icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/6 flex items-center justify-center mx-auto mb-5"
        >
          <ShieldCheck className="text-[#c9a96e]" size={26} />
        </motion.div>
        <h2 className="text-white font-serif text-4xl font-bold mb-2">Verify OTP</h2>
        <p className="text-white/40 text-sm">We sent a 6-digit code to</p>
        <p className="text-[#c9a96e] text-sm font-medium mt-1">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400/80 text-xs text-center"
          >
            {error}
          </motion.p>
        )}

        <AuthButton loading={loading} type="submit">
          Verify Code <ArrowRight size={15} />
        </AuthButton>
      </form>

      {/* Resend */}
      <p className="text-center text-white/30 text-xs mt-7">
        Didn&apos;t receive the code?{' '}
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-[#c9a96e] font-medium hover:opacity-75 transition-opacity"
          >
            Resend OTP
          </button>
        ) : (
          <span className="text-white/45">
            Resend in{' '}
            <span className="text-[#c9a96e] tabular-nums">
              {String(Math.floor(countdown / 60)).padStart(2, '0')}:
              {String(countdown % 60).padStart(2, '0')}
            </span>
          </span>
        )}
      </p>
    </AuthCard>
  );
}
