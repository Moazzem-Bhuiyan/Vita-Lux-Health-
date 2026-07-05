'use client';
import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  X,
  Sparkles,
  User as UserIcon,
  Loader2,
} from 'lucide-react';
import { logout } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Profile {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  phone_number_verified_at: string | null;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  sex: string;
  street_address: string | null;
  city: string | null;
  invite_client: string;
  avatar: string;
  membership_tier: 'Silver' | 'Gold' | 'Platinum' | string;
  role: string;
  intakeq_client_id: string;
  created_at: string;
  updated_at: string;
}

interface TierTheme {
  card: string;
  label: string;
  ring: string;
  text: string;
}

type PasswordFormState = {
  current: string;
  next: string;
  confirm: string;
};

type PasswordStatus = 'idle' | 'loading' | 'success';

/* ------------------------------------------------------------------ */
/*  Mock API payload (drop-in replace with your real fetch response)  */
/* ------------------------------------------------------------------ */
const PROFILE: Profile = {
  id: 5,
  name: 'Veniam lorem non di Ea in labore enim in',
  first_name: 'Veniam lorem non di',
  last_name: 'Ea in labore enim in',
  email: 'diyolis977@kinws.com',
  email_verified_at: '2026-07-05T04:55:01.000000Z',
  phone_number_verified_at: null,
  phone_number: '+1 (595) 561-9669',
  date_of_birth: '2026-06-27',
  gender: 'Male',
  sex: 'Male',
  street_address: null,
  city: null,
  invite_client: 'email',
  avatar: 'avatar/avatar.png',
  membership_tier: 'Silver',
  role: 'USER',
  intakeq_client_id: '13',
  created_at: '2026-07-05T04:54:33.000000Z',
  updated_at: '2026-07-05T04:55:04.000000Z',
};

/* ------------------------------------------------------------------ */
/*  Palette — lifted directly from the host app's globals.css tokens  */
/* ------------------------------------------------------------------ */
const C = {
  cream: '#FAF6EE',
  creamDeep: '#F3EEE1',
  stone900: '#1C1917',
  stone700: '#44403C',
  stone500: '#78716C',
  stone200: '#E7E2D8',
  stone100: '#F0ECE1',
  gold: '#C9A96E',
  goldDark: '#A07850',
  goldSoft: 'rgba(201,169,110,0.14)',
};

const tierTheme: Record<string, TierTheme> = {
  Silver: {
    card: 'linear-gradient(135deg,#6b7280 0%,#9ca3af 28%,#e5e7eb 50%,#9ca3af 72%,#4b5563 100%)',
    label: 'Silver',
    ring: '#c4c9d1',
    text: '#2b2b2b',
  },
  Gold: {
    card: 'linear-gradient(135deg,#8a6a2f 0%,#c9a96e 30%,#f2dfae 50%,#c9a96e 70%,#7a5a24 100%)',
    label: 'Gold',
    ring: '#c9a96e',
    text: '#2b2107',
  },
  Platinum: {
    card: 'linear-gradient(135deg,#0f0f10 0%,#2b2b2e 30%,#5a5a5e 50%,#2b2b2e 70%,#0f0f10 100%)',
    label: 'Platinum',
    ring: '#c9a96e',
    text: '#f5f2ea',
  },
};

function fmtDate(d: string | null): string | null {
  if (!d) return null;
  const date = new Date(d);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fmtMonthYear(d: string | null): string | null {
  if (!d) return null;
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function initials(first?: string, last?: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Small presentational atoms                                         */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ color: C.goldDark, letterSpacing: '0.22em' }}
      className="text-[11px] font-semibold uppercase mb-2"
    >
      {children}
    </p>
  );
}

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border backdrop-blur-sm transition-all duration-500 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.7)',
        borderColor: C.stone200,
        boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
      }}
    >
      {children}
    </div>
  );
}

interface FieldProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  trailing?: React.ReactNode;
  muted?: boolean;
}

function Field({ icon: Icon, label, value, trailing, muted }: FieldProps) {
  return (
    <div
      className="flex items-start gap-4 py-4 px-6 border-b last:border-b-0"
      style={{ borderColor: C.stone100 }}
    >
      <div
        className="mt-0.5 w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: C.goldSoft }}
      >
        <Icon size={16} style={{ color: C.goldDark }} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-[0.14em] mb-1" style={{ color: C.stone500 }}>
          {label}
        </p>
        {muted ? (
          <p className="text-[15px] italic" style={{ color: C.stone500 }}>
            {value}
          </p>
        ) : (
          <p
            className="text-[15px] break-words"
            style={{ color: C.stone900, fontFamily: "'DM Sans', sans-serif" }}
          >
            {value}
          </p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

function VerifiedPill({ verified }: { verified: boolean }) {
  return verified ? (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(34,142,90,0.1)', color: '#1f7a4d' }}
    >
      <CheckCircle2 size={12} strokeWidth={2} />
      Verified
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(217,119,6,0.1)', color: '#b45309' }}
    >
      <AlertCircle size={12} strokeWidth={2} />
      Unverified
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Membership card — the signature element                            */
/* ------------------------------------------------------------------ */
function MembershipCard({ profile }: { profile: Profile }) {
  const theme = tierTheme[profile.membership_tier] ?? tierTheme.Silver;
  const [copied, setCopied] = useState<boolean>(false);

  const copyId = () => {
    try {
      navigator.clipboard?.writeText(profile.intakeq_client_id);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md p-8 md:p-10"
      style={{
        background: theme.card,
        boxShadow: '0 20px 45px -18px rgba(28,25,23,0.45)',
      }}
    >
      {/* engraved diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)',
        }}
      />
      <div
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: `1px solid ${theme.ring}55`,
            }}
          >
            <span
              className="text-xl md:text-2xl"
              style={{
                color: theme.text,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {initials(profile.first_name, profile.last_name)}
            </span>
          </div>
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.28em] mb-1 opacity-70"
              style={{ color: theme.text }}
            >
              Member Portal
            </p>
            <h1
              className="text-2xl md:text-3xl leading-tight"
              style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}
            >
              {profile.first_name}
            </h1>
            <p className="text-sm mt-1 opacity-80" style={{ color: theme.text }}>
              Member since {fmtMonthYear(profile.created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
            style={{
              background: 'rgba(255,255,255,0.22)',
              color: theme.text,
              border: `1px solid ${theme.ring}66`,
            }}
          >
            <Sparkles size={12} />
            {theme.label} Tier
          </span>
          <button
            onClick={copyId}
            className="inline-flex items-center gap-1.5 text-xs opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: theme.text }}
          >
            Client ID #{profile.intakeq_client_id}
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Change password modal                                              */
/* ------------------------------------------------------------------ */
function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [form, setForm] = useState<PasswordFormState>({
    current: '',
    next: '',
    confirm: '',
  });
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<PasswordStatus>('idle');

  if (!open) return null;

  const handleChange = (key: keyof PasswordFormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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

    if (!form.current) {
      setError('Enter your current password.');
      return;
    }
    if (form.next.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (form.next !== form.confirm) {
      setError('New password and confirmation do not match.');
      return;
    }

    setStatus('loading');
    // Simulated request — replace with your real endpoint call
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-sm overflow-hidden"
        style={{ background: C.cream, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)' }}
      >
        <div
          className="flex items-center justify-between px-7 py-5 border-b"
          style={{ borderColor: C.stone200 }}
        >
          <div>
            <Eyebrow>Account Security</Eyebrow>
            <h2
              className="text-2xl -mt-1"
              style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
            >
              Change Password
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Close"
          >
            <X size={18} style={{ color: C.stone700 }} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-7 py-14 flex flex-col items-center text-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,142,90,0.12)' }}
            >
              <CheckCircle2 size={26} style={{ color: '#1f7a4d' }} />
            </div>
            <p
              className="text-xl"
              style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
            >
              Password updated
            </p>
            <p className="text-sm" style={{ color: C.stone500 }}>
              Your account is now secured with the new password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-5">
            <PasswordInput
              label="Current password"
              value={form.current}
              onChange={handleChange('current')}
              show={showCurrent}
              onToggle={() => setShowCurrent((s) => !s)}
            />
            <div>
              <PasswordInput
                label="New password"
                value={form.next}
                onChange={handleChange('next')}
                show={showNew}
                onToggle={() => setShowNew((s) => !s)}
              />
              {form.next && (
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: C.stone200 }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${(strength / 4) * 100}%`,
                        background: strengthColor,
                      }}
                    />
                  </div>
                  <span className="text-[11px]" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>
            <PasswordInput
              label="Confirm new password"
              value={form.confirm}
              onChange={handleChange('confirm')}
              show={showConfirm}
              onToggle={() => setShowConfirm((s) => !s)}
            />

            {error && (
              <div
                className="flex items-center gap-2 text-sm px-3.5 py-2.5 rounded-sm"
                style={{ background: 'rgba(220,76,63,0.08)', color: '#b3392e' }}
              >
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm rounded-sm transition-colors"
                style={{ color: C.stone700 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-sm transition-all disabled:opacity-70"
                style={{ background: C.stone900, color: C.cream }}
              >
                {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
                {status === 'loading' ? 'Updating…' : 'Update password'}
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
        className="block text-[11px] uppercase tracking-[0.14em] mb-1.5"
        style={{ color: C.stone500 }}
      >
        {label}
      </span>
      <div
        className="flex items-center gap-2 border rounded-sm px-3.5 focus-within:ring-1"
        style={{ borderColor: C.stone200, background: 'rgba(255,255,255,0.6)' }}
      >
        <Lock size={14} style={{ color: C.goldDark }} />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-2.5 text-sm outline-none"
          style={{ color: C.stone900 }}
          placeholder="••••••••"
        />
        <button type="button" onClick={onToggle} className="shrink-0" tabIndex={-1}>
          {show ? (
            <EyeOff size={15} style={{ color: C.stone500 }} />
          ) : (
            <Eye size={15} style={{ color: C.stone500 }} />
          )}
        </button>
      </div>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Main dashboard                                                     */
/* ------------------------------------------------------------------ */
export default function UserDashboard() {
  const profile: Profile = PROFILE;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addressNote, setAddressNote] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
        {/* Page header */}
        <div className="mb-8">
          <Eyebrow>My Account</Eyebrow>
          <h1
            className="text-4xl md:text-5xl"
            style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
          >
            Welcome back, {profile.first_name.split(' ')[0]}
          </h1>
          <p className="mt-2 text-sm" style={{ color: C.stone500 }}>
            Here &quot;s an overview of your profile and account settings.
          </p>
        </div>

        {/* Signature membership card */}
        <MembershipCard profile={profile} />

        {/* Details grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Personal details */}
          <SectionCard>
            <div className="px-6 pt-5 pb-3">
              <h3
                className="text-xl"
                style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
              >
                Personal Details
              </h3>
            </div>
            <Field icon={UserIcon} label="Full name" value={profile.name} />
            <Field icon={Calendar} label="Date of birth" value={fmtDate(profile.date_of_birth)} />
            <Field icon={Sparkles} label="Gender" value={profile.gender} />
            <Field
              icon={MapPin}
              label="Address"
              muted={!profile.street_address && !profile.city}
              value={
                profile.street_address || profile.city
                  ? `${profile.street_address ?? ''} ${profile.city ?? ''}`.trim()
                  : addressNote
                    ? 'Reach out to support to add your address'
                    : 'No address on file'
              }
              trailing={
                !profile.street_address &&
                !profile.city && (
                  <button
                    onClick={() => setAddressNote(true)}
                    className="text-xs font-medium"
                    style={{ color: C.goldDark }}
                  >
                    + Add
                  </button>
                )
              }
            />
          </SectionCard>

          {/* Contact + security */}
          <SectionCard>
            <div className="px-6 pt-5 pb-3">
              <h3
                className="text-xl"
                style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
              >
                Contact &amp; Security
              </h3>
            </div>
            <Field
              icon={Mail}
              label="Email address"
              value={profile.email}
              trailing={<VerifiedPill verified={!!profile.email_verified_at} />}
            />
            <Field
              icon={Phone}
              label="Phone number"
              value={profile.phone_number}
              trailing={<VerifiedPill verified={!!profile.phone_number_verified_at} />}
            />
            <Field icon={Shield} label="Role" value={profile.role} />

            <div className="px-6 py-5 flex gap-5">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-sm transition-all hover:opacity-90"
                style={{ background: C.stone900, color: C.cream }}
              >
                <Lock size={15} />
                Change Password
              </button>
              <button
                onClick={() => {
                  dispatch(logout());
                  router.push('/');
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-sm transition-all hover:opacity-90"
                style={{
                  background: 'rgba(220,76,63,0.08)',
                  color: '#b3392e',
                }}
              >
                <X size={15} />
                Log Out
              </button>
            </div>
          </SectionCard>
        </div>

        <p className="text-center text-xs mt-10" style={{ color: C.stone500 }}>
          Account created {fmtDate(profile.created_at)}
        </p>
      </div>

      <ChangePasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
