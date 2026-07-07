'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { CalendarCheck, Lock, LogOut, User, X } from 'lucide-react';
import { logout } from '@/redux/features/authSlice';
import { useState } from 'react';
import ChangePasswordModal from './profile/_Component/Changepassword';

const NAV_ITEMS = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'My Bookings', href: '/mybookings', icon: CalendarCheck },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-stone-200 bg-[#faf6ee] px-4 py-8">
      {/* Logo */}
      <div className="mb-10 px-2">
        <span
          className="text-2xl text-stone-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Aurum Star
        </span>
      </div>

      {/* Navigation + Action Buttons */}
      <nav className="flex flex-1 flex-col gap-1">
        {/* Main Navigation Links */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-stone-900 text-[#faf6ee] shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-stone-200" />

        {/* Change Password Button - Same Style */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all"
        >
          <Lock className="h-4 w-4" />
          Change Password
        </button>

        {/* Logout Button - Same Style with Danger Color */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </nav>

      {/* Change Password Modal */}
      <ChangePasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </aside>
  );
}
