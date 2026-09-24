'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import {
  Sun,
  ChevronLeft,
  ChevronRight,
  Clock,
  Navigation,
  MapPin,
  Car,
  Footprints,
  Coffee,
  CheckCircle2,
  Save,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function MyDayPage() {
  const [selectedDate, setSelectedDate] = useState('Today, Sep 24, 2026');
  const [dayNotes, setDayNotes] = useState('Smooth morning commute. Traffic cleared near the 4th street exit.');
  const [savedNotes, setSavedNotes] = useState(false);

  const timelineEvents = [
    {
      time: '07:45 AM',
      title: 'School Drop-off',
      type: 'journey',
      category: 'School Run',
      distance: '5.6 km',
      duration: '18 mins',
      icon: Navigation,
      color: 'emerald',
      detail: 'Left Evergreen Terrace → Lincoln Academy',
    },
    {
      time: '08:05 AM',
      title: 'Coffee Stop',
      type: 'stop',
      category: 'Stop',
      duration: '10 mins',
      icon: Coffee,
      color: 'amber',
      detail: 'Bean & Leaf Roasters (150m radius)',
    },
    {
      time: '08:15 AM',
      title: 'Morning Office Commute',
      type: 'journey',
      category: 'Commute',
      distance: '14.2 km',
      duration: '28 mins',
      icon: Car,
      color: 'cyan',
      detail: 'Highway 101 → Financial Hub',
    },
    {
      time: '12:30 PM',
      title: 'Lunch Break Walk',
      type: 'journey',
      category: 'Walking',
      distance: '1.8 km',
      duration: '15 mins',
      icon: Footprints,
      color: 'purple',
      detail: 'City Park Loop Walk',
    },
  ];

  const handleSaveNotes = () => {
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Date Selector */}
      <PageHeader
        title="My Day"
        subtitle="Hour-by-hour timeline of your movements, travel stops, and daily activity."
      >
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setSelectedDate('Yesterday, Sep 23')}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-white px-2">{selectedDate}</span>
          <button
            onClick={() => setSelectedDate('Tomorrow, Sep 25')}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Distance"
          value="21.6"
          unit="km"
          change="3 trips"
          icon={<Navigation className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          label="Active Travel Time"
          value="1h 01m"
          unit="active"
          change="2 stops"
          icon={<Clock className="w-5 h-5 text-cyan-400" />}
        />
        <StatCard
          label="Eco Rating"
          value="96%"
          change="Low Emissions"
          trend="up"
          icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        />
        <StatCard
          label="Privacy Rating"
          value="100%"
          unit="shield"
          subtext="Zero 24/7 background tracking"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
        />
      </div>

      {/* Main Content Split: Timeline & Daily Journal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              Daily Journey Timeline
            </h2>
            <span className="text-xs text-slate-400">4 Events Recorded</span>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 relative space-y-8">
            {/* Timeline Vertical Connecting Line */}
            <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500 hidden sm:block" />

            {timelineEvents.map((event, idx) => {
              const Icon = event.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
                  {/* Time badge */}
                  <div className="sm:w-20 text-xs font-bold text-emerald-400 shrink-0 pt-1">
                    {event.time}
                  </div>

                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>

                  {/* Event Detail Box */}
                  <div className="flex-1 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{event.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300">
                        {event.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-2">{event.detail}</p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                      {event.distance && <span>Dist: {event.distance}</span>}
                      <span>Duration: {event.duration}</span>
                      <span className="text-emerald-400">✓ Privacy Logged</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Journal & Notes Column */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Save className="w-5 h-5 text-emerald-400" />
            Daily Journal & Notes
          </h2>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
            <p className="text-xs text-slate-400">
              Add private notes about your travels today. Notes are stored locally and encrypted.
            </p>

            <textarea
              rows={6}
              value={dayNotes}
              onChange={(e) => setDayNotes(e.target.value)}
              placeholder="Record any traffic notes, highway conditions, or family memos..."
              className="w-full p-4 rounded-2xl bg-slate-950/60 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors resize-none"
            />

            <button
              onClick={handleSaveNotes}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{savedNotes ? 'Notes Saved!' : 'Save Daily Notes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
