'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  AuthCard,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthDivider,
} from '@/components/shared/AuthPrimitives';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    // router.push('/dashboard');
  };

  return (
    <AuthCard>
      <AuthHeading title="Welcome Back" subtitle="Sign in to your admin dashboard" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@luxespa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => setRemember((r) => !r)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                remember
                  ? 'bg-[#c9a96e] border-[#c9a96e]'
                  : 'border-white/20 bg-transparent group-hover:border-white/40'
              }`}
            >
              {remember && (
                <svg
                  className="w-2.5 h-2.5 text-[#1a1008]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 12 12"
                >
                  <path d="M1.5 6l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-white/40 text-xs">Remember me</span>
          </label>

          <Link
            href="/forgetPassword"
            className="text-xs text-white/40 hover:text-[#c9a96e] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <div className="mt-3">
          <AuthButton loading={loading} type="submit">
            Sign In <ArrowRight size={15} />
          </AuthButton>
        </div>
      </form>

      <p className="text-center text-white/35 text-sm mt-7">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-white font-semibold hover:text-[#c9a96e] transition-colors"
        >
          Register now
        </Link>
      </p>
    </AuthCard>
  );
}
