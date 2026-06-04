'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AuthCard, AuthHeading, AuthInput, AuthButton } from '@/components/shared/AuthPrimitives';

const strengthLevels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

function getStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const strength = getStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Required';
    else if (strength < 2) e.password = 'Password too weak';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!agreed) e.agreed = 'You must agree to continue';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    // router.push('/auth/verify-otp');
  };

  return (
    <AuthCard className="max-w-[640px]">
      <AuthHeading title="Create Account" subtitle="Join the Aurum Star wellness platform" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <AuthInput
            label="First Name"
            type="text"
            placeholder="Jane"
            value={form.firstName}
            onChange={set('firstName')}
            error={errors.firstName}
          />
          <AuthInput
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={form.lastName}
            onChange={set('lastName')}
            error={errors.lastName}
          />
        </div>

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@luxespa.com"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          autoComplete="email"
        />

        <div className="flex flex-col gap-1.5">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete="new-password"
          />
          {form.password && (
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className="h-0.5 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background:
                      strength >= lvl ? strengthColors[strength] : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
              <span
                className="text-[10px] ml-2 min-w-[34px]"
                style={{ color: strengthColors[strength] || 'transparent' }}
              >
                {strengthLevels[strength]}
              </span>
            </div>
          )}
        </div>

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={form.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
          autoComplete="new-password"
        />

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer mt-1">
          <div
            onClick={() => setAgreed((a) => !a)}
            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              agreed ? 'bg-[#c9a96e] border-[#c9a96e]' : 'border-white/20 hover:border-white/40'
            }`}
          >
            {agreed && <Check size={10} className="text-[#1a1008]" strokeWidth={3} />}
          </div>
          <span className="text-white/35 text-xs leading-relaxed">
            I agree to the{' '}
            <Link href="/terms" className="text-[#c9a96e] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#c9a96e] hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreed && <p className="text-red-400/80 text-xs -mt-2">{errors.agreed}</p>}

        <div className="mt-2">
          <AuthButton loading={loading} type="submit">
            Create Account <ArrowRight size={15} />
          </AuthButton>
        </div>
      </form>

      <p className="text-center text-white/35 text-sm mt-6">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-white font-semibold hover:text-[#c9a96e] transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
