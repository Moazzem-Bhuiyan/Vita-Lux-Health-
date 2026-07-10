'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { AuthCard, AuthHeading, AuthInput, AuthButton } from '@/components/shared/AuthPrimitives';
import { useForgetPasswordMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const router = useRouter();
  const [forgotPass] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await forgotPass({ email }).unwrap();

      // Success → navigate to OTP verify with email + next path
      const nextPath = 'resetPassword'; // for forgot password flow

      if (response?.status === 'success') {
        toast.success(response?.message);
        setSent(true);
        router.push(`/otpVarify?email=${encodeURIComponent(email)}&next=${nextPath}`);
      }
    } catch (err: any) {
      const message = err?.data?.message || err?.error || 'Failed to send OTP. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Success screen (kept for cases where you want to show it before redirect)
  if (sent) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="w-20 h-20 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/8 flex items-center justify-center mb-7"
          >
            <Mail className="text-[#c9a96e]" size={30} />
          </motion.div>

          <h2 className="text-white font-serif text-3xl font-bold mb-3">Check Your Email</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            We&apos;ve sent a password reset OTP to
          </p>
          <p className="text-[#c9a96e] text-sm font-medium mb-8">{email}</p>

          <p className="text-white/30 text-xs mb-6">
            Didn&apos;t receive it?{' '}
            <button
              onClick={() => setSent(false)}
              className="text-white/55 hover:text-[#c9a96e] transition-colors underline"
            >
              Resend email
            </button>
          </p>

          <Link
            href="/login"
            className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Back link */}
      <Link
        href="/login"
        className="flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors mb-8"
      >
        <ArrowLeft size={13} /> Back to Sign In
      </Link>

      <AuthHeading
        title="Forgot Password?"
        subtitle="No worries — enter your email and we'll send an OTP to reset your password."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@luxespa.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          autoComplete="email"
        />

        <div className="mt-3">
          <AuthButton loading={loading} type="submit">
            Send OTP <ArrowRight size={15} />
          </AuthButton>
        </div>
      </form>
    </AuthCard>
  );
}
