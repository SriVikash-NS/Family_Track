'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ActiveJourneyModal } from '@/components/ActiveJourneyModal';
import { Navigation, Bell, ShieldCheck, Search, Activity } from 'lucide-react';
import Link from 'next/link';
import { CURRENT_USER } from '@/lib/mock-data';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleJourneySaved = (title: string) => {
    setToastMessage(`Journey "${title}" successfully recorded!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
        <ActiveJourneyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onJourneySaved={handleJourneySaved}
        />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex selection:bg-emerald-500 selection:text-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar onStartJourneyClick={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-8">
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-20 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Brand Title */}
            <Link href="/" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-emerald-400 transform -rotate-45" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Family<span className="text-emerald-400">Track</span>
              </span>
            </Link>

            {/* Quick Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Shield Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 w-64">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search journeys, places, family..."
                className="bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs"
              />
            </div>

            {/* Start Journey Header CTA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Start Journey</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => {
                setToastMessage('No new unread family alerts');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {/* User Avatar */}
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
          </div>
        </header>

        {/* Global Toast Banner if triggered */}
        {toastMessage && (
          <div className="mx-4 sm:mx-8 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Main Content Container */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav onStartJourneyClick={() => setIsModalOpen(true)} />

      {/* Active Journey Tracker Drawer / Modal */}
      <ActiveJourneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJourneySaved={handleJourneySaved}
      />
    </div>
  );
};
