'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { MOCK_ANALYTICS } from '@/lib/mock-data';
import {
  BarChart3,
  TrendingUp,
  Leaf,
  Navigation,
  ShieldCheck,
  Award,
  Zap,
  Clock,
  Car,
  Bike,
  Footprints,
  Calendar,
} from 'lucide-react';

export default function AnalyticsPage() {
  const maxDistance = Math.max(...MOCK_ANALYTICS.weeklyDistance.map((d) => d.distance));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        title="Journey Analytics"
        subtitle="Insights across your family's movement history, travel habits, eco efficiency, and travel scores."
        badge="This Week"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Sep 18 - Sep 24, 2026</span>
        </div>
      </PageHeader>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Weekly Distance"
          value="174.3"
          unit="km"
          change="+18%"
          trend="up"
          subtext="20 completed trips"
          icon={<Navigation className="w-5 h-5 text-emerald-400" />}
          highlight
        />
        <StatCard
          label="Carbon Saved"
          value={MOCK_ANALYTICS.ecoSavingsKgCO2}
          unit="kg CO2"
          change="-2.4 kg"
          trend="up"
          subtext="Via carpooling & cycling"
          icon={<Leaf className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          label="Avg Trip Duration"
          value="24"
          unit="mins"
          change="-3 mins"
          trend="up"
          subtext="Optimal route choices"
          icon={<Clock className="w-5 h-5 text-cyan-400" />}
        />
        <StatCard
          label="Privacy Integrity"
          value="99.4%"
          subtext="Zero 24/7 background leaks"
          icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
        />
      </div>

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Distance Bar Chart (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Daily Distance Breakdown
              </h2>
              <p className="text-xs text-slate-400">Total distance logged per day (km)</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Avg 24.9 km / day
            </span>
          </div>

          {/* SVG Custom Bar Chart */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-800">
              {MOCK_ANALYTICS.weeklyDistance.map((item) => {
                const heightPercent = (item.distance / maxDistance) * 100;
                const isToday = item.day === 'Wed';

                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Hover tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-700 pointer-events-none whitespace-nowrap shadow-lg">
                      {item.distance} km ({item.trips} trips)
                    </div>

                    {/* Bar container */}
                    <div className="w-full max-w-[40px] bg-slate-900 rounded-t-xl overflow-hidden flex items-end h-full p-0.5">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${
                          isToday
                            ? 'bg-gradient-to-t from-emerald-500 to-cyan-400'
                            : 'bg-slate-700 group-hover:bg-emerald-500/60'
                        }`}
                      />
                    </div>

                    <span className={`text-xs font-medium ${isToday ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transport Mode Split (1 col) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Transport Mode Split
            </h2>
            <p className="text-xs text-slate-400">Share of travel modes this week</p>
          </div>

          <div className="space-y-4">
            {MOCK_ANALYTICS.transportSplit.map((mode) => (
              <div key={mode.mode} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">{mode.mode}</span>
                  <span className="text-white">{mode.percentage}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{
                      width: `${mode.percentage}%`,
                      backgroundColor: mode.color,
                    }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Eco Milestone Box */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Eco Milestone Reached!</span>
            </div>
            <p className="text-xs text-slate-300">
              Your family saved 14.8 kg CO2 emissions this week by walking & cycling for local trips under 3 km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
