'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FamilyMemberCard } from '@/components/FamilyMemberCard';
import { MOCK_FAMILY_MEMBERS, MOCK_GEOFENCE_PLACES } from '@/lib/mock-data';
import { FamilyMember } from '@/types';
import {
  Users,
  UserPlus,
  ShieldCheck,
  MapPin,
  Home,
  Briefcase,
  GraduationCap,
  Dumbbell,
  Check,
  Bell,
  X,
  Copy,
} from 'lucide-react';

export default function FamilyPage() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [places, setPlaces] = useState(MOCK_GEOFENCE_PLACES);

  const inviteCode = 'FAMILY-TRK-8921';

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const getPlaceIcon = (category: string) => {
    switch (category) {
      case 'home':
        return <Home className="w-5 h-5 text-emerald-400" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case 'school':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'gym':
        return <Dumbbell className="w-5 h-5 text-amber-400" />;
      default:
        return <MapPin className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        title="Family Circle"
        subtitle="Manage connected family members, journey sharing permissions, and geofenced safe zones."
        badge="Rivera Family Circle"
      >
        <button
          onClick={() => setIsInviteOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </PageHeader>

      {/* 1. Family Members Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Circle Members ({MOCK_FAMILY_MEMBERS.length})
          </h2>
          <span className="text-xs text-slate-400">All members opted into journey sharing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_FAMILY_MEMBERS.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onPing={(m) => alert(`Sent ping to ${m.name}`)}
            />
          ))}
        </div>
      </div>

      {/* 2. Geofence Places & Safe Zones */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Geofenced Places & Safe Zones
            </h2>
            <p className="text-xs text-slate-400">
              Receive automatic arrival pings when family members enter these designated zones during an active journey.
            </p>
          </div>

          <button
            onClick={() => alert('Add place form would open here')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            + Add New Place
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {places.map((place) => (
            <div
              key={place.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getPlaceIcon(place.category)}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {place.radiusMeters}m Zone
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-1">{place.name}</h3>
                <p className="text-xs text-slate-400 truncate mb-3">{place.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" /> Arrival alerts ON
                </span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Family Privacy Commitment Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Family Consent Rules</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Mutual Respect & Privacy Guarantee
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All members of the Rivera Circle have agreed to manual journey-based location sharing. No 24/7 background location tracking or unannounced monitoring is permitted.
          </p>
        </div>

        <button
          onClick={() => alert('Circle permissions setting panel opened')}
          className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors shrink-0"
        >
          Manage Circle Rules
        </button>
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel rounded-3xl w-full max-w-md overflow-hidden border border-slate-700/80 shadow-2xl relative p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-lg">Invite Family Member</h3>
              </div>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Share this secure circle code with family members. They can enter it during app setup to join the Rivera Circle.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                Invite Code
              </span>
              <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-widest">
                {inviteCode}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Code Copied to Clipboard!' : 'Copy Invite Code'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
