'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthCard, AuthHeading, AuthInput, AuthButton } from '@/components/shared/AuthPrimitives';
import { useSignInMutation } from '@/redux/api/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [login, { isLoading }] = useSignInMutation();

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const result = await login({ email, password }).unwrap();

      // Check based on your actual API response
      if (result?.status === 'success') {
        const user = result?.data?.user;
        const token = result?.data?.token;

        if (!user || !token) {
          throw new Error('Invalid response from server');
        }

        // Save user name for success modal
        setUserName(user?.first_name || user?.name || 'User');

        // Save to Redux
        dispatch(
          setUser({
            user,
            token,
          })
        );

        // Optional: localStorage backup
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Show success modal
        setShowSuccess(true);

        // Auto redirect after showing success
        setTimeout(() => {
          const redirectPath = searchParams.get('redirect') || '/';

          router.replace(redirectPath);
          router.refresh();
        }, 1800);
      } else {
        setErrors({ general: result?.message || 'Login failed. Please try again.' });
      }
    } catch (err: any) {
      console.error('Login Failed:', err);

      const errorMessage =
        err?.data?.message || err?.message || 'Invalid email or password. Please try again.';

      setErrors({ general: errorMessage });
    }
  };

  // Success Modal
  if (showSuccess) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full border-4 border-[#c9a96e]/30 bg-[#c9a96e]/10 flex items-center justify-center mb-8"
          >
            <CheckCircle className="text-[#c9a96e]" size={52} strokeWidth={2.5} />
          </motion.div>

          <h2 className="text-white font-serif text-4xl font-bold mb-3">Welcome Back!</h2>
          <p className="text-white/60 text-lg mb-2">Hello, {userName}</p>
          <p className="text-white/40 text-sm max-w-xs">
            You have successfully signed in. Redirecting to dashboard...
          </p>

          <div className="mt-10 w-full">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-full bg-[#c9a96e] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </AuthCard>
    );
  }

  // Login Form
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

        {errors.general && (
          <p className="text-red-400/80 text-xs text-center py-2">{errors.general}</p>
        )}

        <div className="mt-3">
          <AuthButton loading={isLoading} type="submit">
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
