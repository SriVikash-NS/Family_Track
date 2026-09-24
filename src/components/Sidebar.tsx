'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Navigation,
  Sun,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  Play,
  Home,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { CURRENT_USER } from '@/lib/mock-data';

interface SidebarProps {
  onStartJourneyClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onStartJourneyClick }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Journeys', href: '/journeys', icon: Navigation },
    { name: 'My Day', href: '/my-day', icon: Sun },
    { name: 'Family', href: '/family', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80 h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 pb-4 border-b border-slate-800/60 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Navigation className="w-5 h-5 text-emerald-400 transform -rotate-45" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              Family<span className="text-emerald-400">Track</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">
              Privacy-First Journeys
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/15 to-transparent text-emerald-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full" />
                  )}
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-emerald-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Home Landing Link */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Public Site
          </div>
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Home className="w-4 h-4 text-slate-400" />
              <span>Landing Page</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Quick Action Start Journey Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-emerald-950/30 border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready to Move?</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Start manual GPS tracking for your upcoming journey.
          </p>
          <button
            onClick={onStartJourneyClick}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Start New Journey</span>
          </button>
        </div>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30 shrink-0"
            />
            <div className="truncate">
              <span className="block text-xs font-semibold text-white truncate">
                {CURRENT_USER.name}
              </span>
              <span className="block text-[10px] text-emerald-400 truncate">
                {CURRENT_USER.familyCircleName}
              </span>
            </div>
          </div>
          <Link
            href="/settings"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
            title="Account Settings"
          >
            <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-400" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
