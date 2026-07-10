'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User as UserIcon,
  Edit,
} from 'lucide-react';
import { useGetUserQuery } from '@/redux/api/userApi';

import EditProfileModal from './EditProfileModal';
import MembershipCard from './MemberShipCard';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface Profile {
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

function fmtDate(d?: string | null): string {
  if (!d) return 'Not provided';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  Skeleton Loader                                                   */
/* ------------------------------------------------------------------ */
function ProfileSkeleton() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-2">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-3 w-24 bg-stone-200 rounded mb-3" />
          <div className="h-10 w-80 bg-stone-200 rounded" />
        </div>

        {/* Two Column Skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-sm border backdrop-blur-sm overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.7)',
                borderColor: C.stone200,
              }}
            >
              <div className="px-6 pt-5 pb-3">
                <div className="h-7 w-48 bg-stone-200 rounded" />
              </div>
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 py-5 px-6 border-b last:border-b-0"
                  style={{ borderColor: C.stone100 }}
                >
                  <div className="w-9 h-9 rounded-full bg-stone-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-20 bg-stone-200 rounded" />
                    <div className="h-5 w-3/4 bg-stone-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="h-3 w-48 bg-stone-200 mx-auto mt-10 rounded" />
      </div>
    </div>
  );
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
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export default function UserDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: profileData, isLoading, isError } = useGetUserQuery({});

  const profile = profileData?.data as Profile | undefined;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !profile) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: C.cream }}
      >
        <div className="text-center">
          <p className="text-xl" style={{ color: C.stone700 }}>
            Failed to load profile
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2.5 text-sm font-medium rounded-sm hover:bg-stone-100 transition-colors"
            style={{ border: `1px solid ${C.stone200}` }}
          >
            Retry
          </button>
        </div>
      </div>
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

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-2">
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
                style={{ background: '#000000', color: '#ffffff' }}
              >
                <Edit size={16} strokeWidth={2} />
                Edit Profile
              </button>
            </div>
          </SectionCard>
        </div>

        <p className="text-center text-xs mt-10" style={{ color: C.stone500 }}>
          Account created {fmtDate(profile.created_at)}
        </p>
      </div>

      {/* Modal */}
      <EditProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} profile={profile} />
    </div>
  );
}
