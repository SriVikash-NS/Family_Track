import React from 'react';
import { FamilyMember } from '@/types';
import {
  Battery,
  BatteryCharging,
  ShieldCheck,
  Navigation,
  MapPin,
  Bell,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onPing?: (member: FamilyMember) => void;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  onPing,
}) => {
  const getStatusBadge = () => {
    switch (member.status) {
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> In Transit
          </span>
        );
      case 'at_home':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> At Home
          </span>
        );
      case 'at_work':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400" /> At Work
          </span>
        );
      case 'at_school':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400" /> At School
          </span>
        );
      case 'offline':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-500" /> Standby
          </span>
        );
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Accent top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: member.color || '#10b981' }}
      />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-800"
              />
              <div
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900"
                style={{ backgroundColor: member.color || '#10b981' }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base leading-tight">
                {member.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>{member.role}</span>
                <span>•</span>
                <span className="text-slate-500">{member.lastActive}</span>
              </p>
            </div>
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Status detail box */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 mb-4">
          <p className="text-xs text-slate-300 font-medium flex items-center gap-2">
            {member.status === 'in_transit' ? (
              <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-bounce" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span className="truncate">{member.statusText}</span>
          </p>

          {member.activeJourneyTitle && (
            <p className="mt-1 text-[11px] text-cyan-400/90 pl-5 truncate">
              Active: {member.activeJourneyTitle}
            </p>
          )}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Battery className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-slate-300">{member.batteryLevel}%</span>
          <span className="text-slate-500 text-[11px] hidden xs:inline">
            • Journey sharing active
          </span>
        </div>

        <button
          onClick={() => onPing?.(member)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/60"
        >
          <Bell className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ping</span>
        </button>
      </div>
    </div>
  );
};
