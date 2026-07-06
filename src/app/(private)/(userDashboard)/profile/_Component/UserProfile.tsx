'use client';

import React, { useState } from 'react';
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
import { useGetMyProfileQuery } from '@/redux/api/authApi';
import { useGetUserQuery } from '@/redux/api/userApi';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Profile {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  email_verified_at?: string | null;
  phone_number_verified_at?: string | null;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  sex?: string;
  street_address?: string | null;
  city?: string | null;
  invite_client?: string;
  avatar?: string;
  membership_tier?: 'Silver' | 'Gold' | 'Platinum' | string;
  role?: string;
  intakeq_client_id?: string;
  created_at?: string;
  updated_at?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants & Helpers                                               */
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

const tierTheme: Record<string, any> = {
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

function fmtDate(d?: string | null): string {
  if (!d) return 'Not provided';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fmtMonthYear(d?: string | null): string {
  if (!d) return 'Unknown';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function initials(first?: string, last?: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Presentational Components                                         */
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

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-sm border backdrop-blur-sm"
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
  icon: React.ElementType;
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
        <p
          className={`text-[15px] break-words ${muted ? 'italic' : ''}`}
          style={{ color: muted ? C.stone500 : C.stone900 }}
        >
          {value}
        </p>
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
      <CheckCircle2 size={12} strokeWidth={2} /> Verified
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(217,119,6,0.1)', color: '#b45309' }}
    >
      <AlertCircle size={12} strokeWidth={2} /> Unverified
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Membership Card                                                   */
/* ------------------------------------------------------------------ */
function MembershipCard({ profile }: { profile: Profile }) {
  const tier = profile.membership_tier || 'Silver';
  const theme = tierTheme[tier] || tierTheme.Silver;
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    if (profile.intakeq_client_id) {
      navigator.clipboard.writeText(profile.intakeq_client_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md p-8 md:p-10"
      style={{ background: theme.card, boxShadow: '0 20px 45px -18px rgba(28,25,23,0.45)' }}
    >
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.18)', border: `1px solid ${theme.ring}55` }}
          >
            <span
              className="text-2xl"
              style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}
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
              {profile.first_name || 'User'}
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
            <Sparkles size={12} /> {theme.label} Tier
          </span>
          {profile.intakeq_client_id && (
            <button
              onClick={copyId}
              className="inline-flex items-center gap-1.5 text-xs opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: theme.text }}
            >
              Client ID #{profile.intakeq_client_id}
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Change Password Modal                                             */
/* ------------------------------------------------------------------ */
function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // ... (your existing modal code - keeping it as is for now)
  // You can keep your previous modal implementation here
  return null; // Replace with your full modal if needed
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export default function UserDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addressNote, setAddressNote] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: profileData, isLoading } = useGetUserQuery({});

  const profile = profileData?.data as Profile | undefined;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">Failed to load profile.</div>
    );
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="mb-8">
          <Eyebrow>My Account</Eyebrow>
          <h1
            className="text-4xl md:text-5xl"
            style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
          >
            Welcome back, {profile.first_name?.split(' ')[0] || 'User'}
          </h1>
        </div>

        <MembershipCard profile={profile} />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Personal Details */}
          <SectionCard>
            <div className="px-6 pt-5 pb-3">
              <h3
                className="text-xl"
                style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
              >
                Personal Details
              </h3>
            </div>
            <Field
              icon={UserIcon}
              label="Full name"
              value={profile.name || `${profile.first_name} ${profile.last_name}`.trim()}
            />
            <Field icon={Calendar} label="Date of birth" value={fmtDate(profile.date_of_birth)} />
            <Field icon={Sparkles} label="Gender" value={profile.gender || 'Not specified'} />
            <Field
              icon={MapPin}
              label="Address"
              value={
                profile.street_address || profile.city
                  ? `${profile.street_address || ''} ${profile.city || ''}`.trim()
                  : 'No address on file'
              }
            />
          </SectionCard>

          {/* Contact & Security */}
          <SectionCard>
            <div className="px-6 pt-5 pb-3">
              <h3
                className="text-xl"
                style={{ color: C.stone900, fontFamily: "'Cormorant Garamond', serif" }}
              >
                Contact & Security
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
            <Field icon={Shield} label="Role" value={profile.role || 'User'} />

            <div className="px-6 py-5 flex gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-sm transition-all hover:opacity-90"
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
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-sm transition-all hover:opacity-90"
                style={{ background: 'rgba(220,76,63,0.08)', color: '#b3392e' }}
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
