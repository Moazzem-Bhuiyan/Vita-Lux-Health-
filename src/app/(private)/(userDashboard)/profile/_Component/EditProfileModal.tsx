import { useUpdateProfileinfoMutation } from '@/redux/api/authApi';
import { useUpdateUserMutation } from '@/redux/api/userApi';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: {
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
  };
}

export default function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    street_address: '',
    city: '',
  });

  // Pre-fill form with existing data
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone_number: profile.phone_number || '',
        street_address: profile.street_address || '',
        city: profile.city || '',
      });
    }
  }, [profile]);

  const [updateProfileMutation, { isLoading }] = useUpdateUserMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading('Updating profile...');

    try {
      const res = await updateProfileMutation({ formData }).unwrap();

      if (res) {
        toast.success('Profile updated successfully', {
          id: toastId,
        });
        onClose();
      }
    } catch (error) {
      toast.error('Failed to update profile', {
        id: toastId,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b">
          <h2 className="text-2xl">Edit Profile</h2>
          <p className="text-sm text-stone-500">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-medium rounded-lg border border-stone-300 hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 py-3 text-sm font-medium rounded-lg text-white transition hover:opacity-90"
              style={{ background: '#000000' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
