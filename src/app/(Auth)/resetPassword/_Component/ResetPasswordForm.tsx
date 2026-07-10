'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard, AuthHeading, AuthInput, AuthButton } from '@/components/shared/AuthPrimitives';
import { useResetPasswordMutation } from '@/redux/api/authApi';

const rules = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  const router = useRouter();
  const [resetPass] = useResetPasswordMutation();

  const allRulesPassed = rules.every((r) => r.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs: typeof errors = {};

    if (!allRulesPassed) {
      errs.password = 'Password does not meet all requirements';
    }
    if (password !== confirm) {
      errs.confirm = 'Passwords do not match';
    }
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = { password, password_confirmation: confirm };
      await resetPass(payload).unwrap();
      localStorage.removeItem('verifyEmail-token');
      setSuccess(true);
    } catch (err: any) {
      const message =
        err?.data?.message || err?.error || 'Failed to reset password. Please try again.';

      setErrors({ password: message });
    } finally {
      setLoading(false);
    }
  };

  // Auto-redirect after success (optional)
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center mb-7"
          >
            <Check className="text-[#c9a96e]" size={32} strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-white font-serif text-3xl font-bold mb-3">Password Reset!</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Your password has been updated successfully. You can now sign in with your new
            credentials.
          </p>
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 bg-[#f2e8d9] text-[#1a1008] font-semibold text-sm rounded-xl py-4 hover:bg-[#e8d9c0] transition-colors"
          >
            Sign In Now <ArrowRight size={15} />
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Back */}
      <Link
        href="/otpVerify"
        className="flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors mb-8"
      >
        <ArrowLeft size={13} /> Back
      </Link>

      <AuthHeading title="New Password" subtitle="Create a strong password for your account" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((er) => ({ ...er, password: '' }));
          }}
          error={errors.password}
          autoComplete="new-password"
        />

        {/* Password rules */}
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-0.5"
          >
            {rules.map((rule) => {
              const passed = rule.test(password);
              return (
                <div key={rule.label} className="flex items-center gap-1.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      passed ? 'bg-[#c9a96e]/20 border border-[#c9a96e]' : 'border border-white/15'
                    }`}
                  >
                    {passed && <Check size={8} className="text-[#c9a96e]" strokeWidth={3} />}
                  </div>
                  <span
                    className={`text-[10px] transition-colors duration-200 ${passed ? 'text-[#c9a96e]' : 'text-white/30'}`}
                  >
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Repeat new password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setErrors((er) => ({ ...er, confirm: '' }));
          }}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <div className="mt-3">
          <AuthButton loading={loading} type="submit">
            Set New Password <ArrowRight size={15} />
          </AuthButton>
        </div>
      </form>
    </AuthCard>
  );
}
