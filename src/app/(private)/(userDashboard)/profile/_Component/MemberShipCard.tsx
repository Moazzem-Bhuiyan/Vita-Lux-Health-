/* ------------------------------------------------------------------ */
/*  Profile Header Card                                               */

import { useState } from 'react';
import { Profile } from './UserProfile';
import { useUploadAvatarMutation } from '@/redux/api/userApi';
import { toast } from 'sonner';
import Image from 'next/image';
import { Check, Copy, Edit } from 'lucide-react';

function fmtMonthYear(d?: string | null): string {
  if (!d) return 'Unknown';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function initials(first?: string, last?: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

export default function ProfileHeader({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);

  const avatarUrl = profile.avatar ? `http://103.186.20.110:9999/${profile.avatar}` : null;

  const [uploadAvatar] = useUploadAvatarMutation();

  const handleAvatarClick = () => {
    document.getElementById('avatar-upload')?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await uploadAvatar({ fileData: formData }).unwrap();
      toast.success('Profile picture updated successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md p-8 md:p-10 bg-white/70 border border-stone-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left Side - Avatar + Info */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div
              onClick={handleAvatarClick}
              className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 cursor-pointer overflow-hidden border-2 border-white hover:border-[#c9a96e] transition-all shadow-md"
              style={{
                background: avatarUrl ? 'transparent' : 'rgba(201, 169, 110, 0.1)',
              }}
            >
              {avatarUrl ? (
                <Image fill src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-light text-[#c9a96e]">
                  {initials(profile.first_name, profile.last_name)}
                </span>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1.5 shadow-lg hover:bg-stone-800 transition-all active:scale-95"
              disabled={uploading}
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <Edit size={16} strokeWidth={2.5} />
              )}
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-light tracking-tight text-stone-900">
              {profile.first_name || 'User'}
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Member since {fmtMonthYear(profile.created_at)}
            </p>
          </div>
        </div>

        {/* Right Side - Client ID */}
        {profile.intakeq_client_id && (
          <div className="flex flex-col items-start md:items-end">
            {/* <button
              onClick={copyId}
              className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              Client ID: #{profile.intakeq_client_id}
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button> */}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
