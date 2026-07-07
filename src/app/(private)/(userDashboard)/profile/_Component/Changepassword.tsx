'use client';

import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';

const C = {
  cream: '#FAF6EE',
  stone900: '#1C1917',
  stone700: '#44403C',
  stone500: '#78716C',
  stone200: '#E7E2D8',
  goldDark: '#A07850',
};

type PasswordFormState = {
  current: string;
  next: string;
  confirm: string;
};

type PasswordStatus = 'idle' | 'loading' | 'success';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState<PasswordFormState>({
    current: '',
    next: '',
    confirm: '',
  });

  const [error, setError] = useState('');
  const [status, setStatus] = useState<PasswordStatus>('idle');

  if (!open) return null;

  const handleChange =
    (key: keyof PasswordFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setError('');
    };

  const strength = (() => {
    const v = form.next;
    if (!v) return 0;
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  })();

  const strengthLabel = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['#dc4c3f', '#dc4c3f', '#b45309', '#1f7a4d', '#1f7a4d'][strength];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!form.current) return setError('Enter your current password.');
    if (form.next.length < 8) return setError('New password must be at least 8 characters.');
    if (form.next !== form.confirm) return setError('New password and confirmation do not match.');

    setStatus('loading');

    // TODO: Replace with real API call later
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm({ current: '', next: '', confirm: '' });
        onClose();
      }, 1400);
    }, 1100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: C.cream }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b"
          style={{ borderColor: C.stone200 }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: C.goldDark }}
            >
              Account Security
            </p>
            <h2
              className="text-2xl mt-1"
              style={{ color: C.stone900, fontFamily: '"Playfair Display", serif' }}
            >
              Change Password
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} style={{ color: C.stone700 }} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-8 py-16 flex flex-col items-center text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,142,90,0.12)' }}
            >
              <CheckCircle2 size={32} style={{ color: '#1f7a4d' }} />
            </div>
            <h3 className="text-2xl" style={{ color: C.stone900 }}>
              Password Updated
            </h3>
            <p className="text-stone-600">Your account is now more secure.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-8 flex flex-col gap-6">
            <PasswordInput
              label="Current Password"
              value={form.current}
              onChange={handleChange('current')}
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
            />

            <div>
              <PasswordInput
                label="New Password"
                value={form.next}
                onChange={handleChange('next')}
                show={showNew}
                onToggle={() => setShowNew(!showNew)}
              />
              {form.next && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${(strength / 4) * 100}%`, background: strengthColor }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <PasswordInput
              label="Confirm New Password"
              value={form.confirm}
              onChange={handleChange('confirm')}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />

            {error && (
              <div
                className="flex items-center gap-2 text-sm px-4 py-3 rounded-lg"
                style={{ background: 'rgba(220,76,63,0.08)', color: '#b3392e' }}
              >
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{ color: C.stone700 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 py-3 text-sm font-medium rounded-lg text-white transition-all disabled:opacity-70"
                style={{ background: C.stone900 }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin inline mr-2" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
}

function PasswordInput({ label, value, onChange, show, onToggle }: PasswordInputProps) {
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-widest mb-1.5"
        style={{ color: C.stone500 }}
      >
        {label}
      </span>
      <div
        className="flex items-center gap-3 border rounded-xl px-4 py-3"
        style={{ borderColor: C.stone200 }}
      >
        <Lock size={18} style={{ color: C.goldDark }} />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-[15px]"
          style={{ color: C.stone900 }}
          placeholder="••••••••"
        />
        <button type="button" onClick={onToggle} className="text-stone-500 hover:text-stone-700">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}
