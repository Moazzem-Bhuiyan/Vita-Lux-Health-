'use client';

import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/* ─── Input ─────────────────────────────────────────── */
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, type, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] tracking-[0.18em] text-white/45 uppercase font-medium">
          {label}
        </label>
        <div className="relative group">
          <input
            ref={ref}
            type={isPassword && show ? 'text' : type}
            className={cn(
              'w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-black text-sm placeholder-black/30',
              'focus:outline-none focus:border-[#c9a96e]/60 focus:bg-white/6',
              'hover:border-white/20 transition-all duration-200',
              error && 'border-red-500/50 focus:border-red-500/70',
              isPassword && 'pr-12',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              tabIndex={-1}
            >
              {show ? (
                <EyeOff color="#000000" size={20} className="pointer-events-none" />
              ) : (
                <Eye color="#000000" size={20} className="pointer-events-none" />
              )}
            </button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400/80 text-xs"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
AuthInput.displayName = 'AuthInput';

/* ─── Primary Button ─────────────────────────────────── */
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function AuthButton({ loading, children, className, ...props }: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'w-full bg-[#f2e8d9] text-[#1a1008] font-semibold text-sm rounded-xl py-4',
        'hover:bg-[#e8d9c0] transition-colors duration-200',
        'flex items-center justify-center gap-2 tracking-wide',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...(props as any)}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        children
      )}
    </motion.button>
  );
}

/* ─── Ghost Button ───────────────────────────────────── */
export function AuthGhostButton({ children, className, ...props }: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'w-full border border-white/12 text-white/60 font-medium text-sm rounded-xl py-3.5',
        'hover:border-white/25 hover:text-white/90 hover:bg-white/4 transition-all duration-200',
        'flex items-center justify-center gap-2',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}

/* ─── Divider ─────────────────────────────────────────── */
export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-1">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-white/25 text-xs">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

/* ─── Card wrapper ───────────────────────────────────── */
export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      key="auth-card"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(' !w-full max-w-[900px]', className)}
    >
      {children}
    </motion.div>
  );
}

/* ─── Form heading ───────────────────────────────────── */
export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-white font-serif text-4xl font-bold mb-2">{title}</h2>
      <p className="text-white/40 text-sm">{subtitle}</p>
    </div>
  );
}

/* ─── OTP single digit input ─────────────────────────── */
interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (val: string[]) => void;
}

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...value];
    next[i] = v;
    onChange(next);
    if (v && i < length - 1) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      const el = document.getElementById(`otp-${i - 1}`);
      el?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const next = Array(length).fill('');
    pasted.split('').forEach((c, i) => {
      next[i] = c;
    });
    onChange(next);
    const lastIdx = Math.min(pasted.length, length - 1);
    document.getElementById(`otp-${lastIdx}`)?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <motion.input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className={cn(
            'w-11 h-14 text-center text-black text-xl font-semibold',
            'bg-white/4 border border-white/10 rounded-xl',
            'focus:outline-none focus:border-[#c9a96e]/60 focus:bg-white/7',
            'hover:border-white/20 transition-all duration-200 caret-transparent'
          )}
        />
      ))}
    </div>
  );
}
