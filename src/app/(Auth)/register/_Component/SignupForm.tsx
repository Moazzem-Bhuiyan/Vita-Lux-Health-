'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { AuthCard, AuthHeading, AuthInput, AuthButton } from '@/components/shared/AuthPrimitives';
import { useSignUpMutation } from '@/redux/api/authApi';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';

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
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    date_of_birth: '',
    gender: '',
    sex: '',
    phone_number: '',
    invite_client: 'email',
  });

  const [date, setDate] = useState<Date | undefined>();
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const [signup, { isLoading }] = useSignUpMutation();

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Fixed: Handle null value from shadcn Select
  const handleSelectChange = (key: string) => (value: string | null) => {
    if (value) {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setForm((prev) => ({
        ...prev,
        date_of_birth: selectedDate.toISOString().split('T')[0],
      }));
    }
  };

  const strength = getStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.first_name.trim()) e.first_name = 'First name is required';
    if (!form.last_name.trim()) e.last_name = 'Last name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';

    if (!form.password) e.password = 'Password is required';
    else if (strength < 2) e.password = 'Password is too weak';

    if (form.password_confirmation !== form.password) {
      e.password_confirmation = 'Passwords do not match';
    }

    if (!form.date_of_birth) e.date_of_birth = 'Date of birth is required';
    if (!form.gender) e.gender = 'Gender is required';
    if (!form.sex) e.sex = 'Sex is required';
    if (!form.phone_number.trim()) e.phone_number = 'Phone number is required';
    if (!agreed) e.agreed = 'You must agree to the terms';

    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await signup(form).unwrap();
      router.push('/otpVarify?email=' + encodeURIComponent(form.email));
    } catch (err: any) {
      setErrors({ general: err?.data?.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <AuthCard className="max-w-[640px]">
      <AuthHeading title="Create Account" subtitle="Join the Aurum Star wellness platform" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <AuthInput
            label="First Name"
            type="text"
            placeholder="Jane"
            value={form.first_name}
            onChange={handleInputChange('first_name')}
            error={errors.first_name}
          />
          <AuthInput
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={form.last_name}
            onChange={handleInputChange('last_name')}
            error={errors.last_name}
          />
        </div>

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="jone@gmail.com"
          value={form.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="0188334215"
          value={form.phone_number}
          onChange={handleInputChange('phone_number')}
          error={errors.phone_number}
        />

        {/* Date Picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70">Date of Birth</label>
          <Popover>
            <PopoverTrigger>
              <button
                type="button"
                className={cn(
                  'w-full flex items-center justify-between rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-left font-normal text-white hover:bg-white/10 focus:outline-none focus:border-[#c9a96e]',
                  !date && 'text-white/50'
                )}
              >
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="h-4 w-4 opacity-70" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(d) => d > new Date() || d < new Date('1900-01-01')}
              />
            </PopoverContent>
          </Popover>
          {errors.date_of_birth && (
            <p className="text-red-400 text-xs mt-1">{errors.date_of_birth}</p>
          )}
        </div>

        {/* Gender & Sex */}
        {/* Gender & Sex - Consistent Design */}
        <div className="grid grid-cols-2 gap-3">
          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/70">Gender</label>
            <Select value={form.gender} onValueChange={handleSelectChange('gender')}>
              <SelectTrigger className="bg-white/5 border !w-full border-white/20 text-white hover:bg-white/10 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/50 h-11">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-white/20 text-white">
                <SelectItem value="Male" className="focus:bg-white/10">
                  Male
                </SelectItem>
                <SelectItem value="Female" className="focus:bg-white/10">
                  Female
                </SelectItem>
                <SelectItem value="Non-Binary" className="focus:bg-white/10">
                  Non-Binary
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Sex */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/70">Sex</label>
            <Select value={form.sex} onValueChange={handleSelectChange('sex')}>
              <SelectTrigger className="bg-white/5 border !w-full border-white/20 text-white hover:bg-white/10 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]/50 ">
                <SelectValue placeholder="Select Sex" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-white/20 text-white">
                <SelectItem value="Male" className="focus:bg-white/10">
                  Male
                </SelectItem>
                <SelectItem value="Female" className="focus:bg-white/10">
                  Female
                </SelectItem>
                <SelectItem value="Intersex" className="focus:bg-white/10">
                  Intersex
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && <p className="text-red-400 text-xs mt-1">{errors.sex}</p>}
          </div>
        </div>

        {/* Passwords */}
        <div className="flex flex-col gap-1.5">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleInputChange('password')}
            error={errors.password}
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
                style={{ color: strengthColors[strength] }}
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
          value={form.password_confirmation}
          onChange={handleInputChange('password_confirmation')}
          error={errors.password_confirmation}
        />

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer mt-2">
          <div
            onClick={() => setAgreed((a) => !a)}
            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
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
        {errors.agreed && <p className="text-red-400/80 text-xs -mt-1">{errors.agreed}</p>}

        {errors.general && <p className="text-red-400 text-sm text-center">{errors.general}</p>}

        <div className="mt-4">
          <AuthButton loading={isLoading} type="submit">
            Create Account <ArrowRight size={15} />
          </AuthButton>
        </div>
      </form>

      <p className="text-center text-white/35 text-sm mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-white font-semibold hover:text-[#c9a96e]">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
