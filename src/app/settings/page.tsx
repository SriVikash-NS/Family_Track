'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { CURRENT_USER } from '@/lib/mock-data';
import {
  ShieldCheck,
  Lock,
  Bell,
  Trash2,
  Download,
  Eye,
  Smartphone,
  Save,
  User,
  Key,
  Database,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const [retentionDays, setRetentionDays] = useState('7');
  const [autoFuzzLocation, setAutoFuzzLocation] = useState(true);
  const [arrivalPings, setArrivalPings] = useState(true);
  const [tripStartAlerts, setTripStartAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleWipeData = () => {
    if (confirm('Are you sure you want to permanently delete all your journey logs? This action cannot be undone.')) {
      alert('All location logs purged from local storage!');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <PageHeader
        title="Settings & Privacy Controls"
        subtitle="Manage explicit tracking rules, data retention periods, circle permissions, and account preferences."
      >
        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Saved!' : 'Save Preferences'}</span>
        </button>
      </PageHeader>

      {/* 1. Core Privacy Controls */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Privacy & Consent Engine</h2>
            <p className="text-xs text-slate-400">
              Configure how your location data is captured and shared
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Fuzz Radius Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-white text-sm block">
                Fuzz Location Radius (100m Blur)
              </span>
              <span className="text-xs text-slate-400">
                Adds a random offset to your exact GPS coordinates when sharing with circle members.
              </span>
            </div>
            <button
              onClick={() => setAutoFuzzLocation(!autoFuzzLocation)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                autoFuzzLocation ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  autoFuzzLocation ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Data Retention Period */}
          <div>
            <label className="font-semibold text-white text-sm block mb-1">
              Ephemeral History Retention
            </label>
            <p className="text-xs text-slate-400 mb-3">
              Automatically delete completed journey logs after specified days.
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: '7 Days', value: '7' },
                { label: '30 Days', value: '30' },
                { label: '1 Year', value: '365' },
                { label: 'Keep Forever', value: '0' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRetentionDays(item.value)}
                  className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    retentionDays === item.value
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Notification Rules */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Notification Rules</h2>
            <p className="text-xs text-slate-400">
              Customize alerts for family journey events
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white text-sm block">
                Arrival & Departure Geofence Alerts
              </span>
              <span className="text-xs text-slate-400">
                Notify circle members when you enter or leave designated safe places.
              </span>
            </div>
            <button
              onClick={() => setArrivalPings(!arrivalPings)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                arrivalPings ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  arrivalPings ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white text-sm block">
                Trip Start Notifications
              </span>
              <span className="text-xs text-slate-400">
                Receive a subtle push notification when a family member manually starts a journey.
              </span>
            </div>
            <button
              onClick={() => setTripStartAlerts(!tripStartAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                tripStartAlerts ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  tripStartAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Account Profile */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Account & Family Profile</h2>
            <p className="text-xs text-slate-400">Your profile details in FamilyTrack</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={CURRENT_USER.name}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
            <input
              type="email"
              defaultValue={CURRENT_USER.email}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* 4. Danger Zone & Data Wipe */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-900/40 bg-rose-950/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-rose-400">Data Management & Complete Wipe</h3>
            <p className="text-xs text-slate-400">
              Permanently delete all your local GPS logs, location points, and cached journeys.
            </p>
          </div>

          <button
            onClick={handleWipeData}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-rose-600/20"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge Location Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
