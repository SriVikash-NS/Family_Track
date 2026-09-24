'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Navigation,
  Sun,
  Users,
  Settings,
  Play,
} from 'lucide-react';

interface MobileBottomNavProps {
  onStartJourneyClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onStartJourneyClick,
}) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Journeys', href: '/journeys', icon: Navigation },
    { name: 'My Day', href: '/my-day', icon: Sun },
    { name: 'Family', href: '/family', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 safe-bottom">
      <div className="flex items-center justify-around relative">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.name}</span>
            </Link>
          );
        })}

        {/* Center Prominent Start Journey Button */}
        <button
          onClick={onStartJourneyClick}
          className="flex flex-col items-center justify-center -mt-6 group focus:outline-none"
          title="Start New Journey"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/40 group-active:scale-95 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-emerald-400 fill-emerald-400 ml-0.5" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 mt-1">Start</span>
        </button>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
