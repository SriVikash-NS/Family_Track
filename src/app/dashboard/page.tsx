'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { JourneyCard } from '@/components/JourneyCard';
import { FamilyMemberCard } from '@/components/FamilyMemberCard';
import { ActiveJourneyModal } from '@/components/ActiveJourneyModal';
import {
  MOCK_JOURNEYS,
  MOCK_FAMILY_MEMBERS,
  TODAY_STATS,
  CURRENT_USER,
} from '@/lib/mock-data';
import { Journey, FamilyMember } from '@/types';
import {
  Play,
  Navigation,
  ShieldCheck,
  Clock,
  MapPin,
  Car,
  Footprints,
  Bike,
  Plus,
  ArrowRight,
  Activity,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [activeTracking, setActiveTracking] = useState(false);

  const handlePingMember = (member: FamilyMember) => {
    alert(`Sent location check-in request to ${member.name}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Greeting & Hero Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Surveillance Mode Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {CURRENT_USER.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              You have completed 3 journeys today with {CURRENT_USER.familyCircleName}. Your location is currently private.
            </p>
          </div>

          {/* Prominent Quick Start Banner */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all active:scale-95 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start New Journey</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Today's Key Stats Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {TODAY_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            change={stat.change}
            trend={stat.trend}
            subtext={stat.subtext}
            icon={
              stat.id === 'distance' ? (
                <Navigation className="w-5 h-5 text-emerald-400" />
              ) : stat.id === 'journeys' ? (
                <Car className="w-5 h-5 text-cyan-400" />
              ) : stat.id === 'travel_time' ? (
                <Clock className="w-5 h-5 text-purple-400" />
              ) : (
                <MapPin className="w-5 h-5 text-amber-400" />
              )
            }
          />
        ))}
      </div>

      {/* 3. Journey Status Card & Large "Start Journey" Button */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-emerald-950/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Navigation className="w-6 h-6 transform -rotate-45" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  Current Status
                </span>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {activeTracking ? 'Live Tracking Active' : 'Not Tracking — Standby'}
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeTracking ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                    }`}
                  />
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              FamilyTrack only monitors your GPS when you explicitly launch a journey. Select a route preset or start custom manual tracking below.
            </p>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 mr-2">Quick Presets:</span>
              {['Office Commute', 'School Drop-off', 'Evening Trail Run'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700/60 transition-colors"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* LARGE "Start Journey" Button */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-64 py-5 px-8 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-950/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
              </div>
              <span className="tracking-wide">START JOURNEY</span>
            </button>
            <span className="text-[11px] text-slate-400 font-medium mt-3 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Explicit Manual Consent Required
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Content Split: Recent Journeys & Family Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Journeys Section (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400" />
                Recent Journeys
              </h2>
              <p className="text-xs text-slate-400">
                Logged movements & travel history for today
              </p>
            </div>

            <Link
              href="/journeys"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {MOCK_JOURNEYS.slice(0, 3).map((journey) => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onSelect={(j) => setSelectedJourney(j)}
              />
            ))}
          </div>
        </div>

        {/* Family Activity Section (1 Col on lg) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Family Activity
              </h2>
              <p className="text-xs text-slate-400">
                {CURRENT_USER.familyCircleName} circle status
              </p>
            </div>

            <Link
              href="/family"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>Circle Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {MOCK_FAMILY_MEMBERS.map((member) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                onPing={handlePingMember}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Journey Tracker Modal */}
      <ActiveJourneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJourneySaved={(title) => {
          setActiveTracking(false);
        }}
      />
    </div>
  );
}
