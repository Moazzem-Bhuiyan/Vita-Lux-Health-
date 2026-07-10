import type { ReactNode } from 'react';
import { DashboardSidebar } from './sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#faf6ee] max-w-[80%] mx-auto py-20">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
