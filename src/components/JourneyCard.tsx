import React from 'react';
import { Journey } from '@/types';
import {
  Car,
  Bike,
  Footprints,
  Navigation,
  Clock,
  MapPin,
  ShieldCheck,
  EyeOff,
  Users,
  ChevronRight,
  MoreVertical,
  Activity,
} from 'lucide-react';

interface JourneyCardProps {
  journey: Journey;
  onSelect?: (journey: Journey) => void;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({
  journey,
  onSelect,
}) => {
  const getCategoryIcon = (category: Journey['category']) => {
    switch (category) {
      case 'Commute':
      case 'School Run':
        return <Car className="w-4 h-4 text-emerald-400" />;
      case 'Cycling':
        return <Bike className="w-4 h-4 text-cyan-400" />;
      case 'Running':
      case 'Recreation':
        return <Footprints className="w-4 h-4 text-purple-400" />;
      default:
        return <Navigation className="w-4 h-4 text-teal-400" />;
    }
  };

  const getPrivacyBadge = (level: Journey['privacyLevel']) => {
    switch (level) {
      case 'private':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
            <EyeOff className="w-3 h-3 text-slate-400" /> Private
          </span>
        );
      case 'circle':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Users className="w-3 h-3 text-cyan-400" /> Family Circle
          </span>
        );
      case 'family':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Shared with Family
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect?.(journey)}
      className="group glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 text-white group-hover:bg-emerald-950/40 group-hover:border-emerald-500/30 transition-colors">
            {getCategoryIcon(journey.category)}
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors text-base flex items-center gap-2">
              {journey.title}
              {journey.status === 'active' && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-normal animate-pulse">
                  <Activity className="w-3 h-3" /> Live
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {journey.date} • {journey.startTime} - {journey.endTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getPrivacyBadge(journey.privacyLevel)}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="More actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Start and End location timeline */}
      <div className="my-3 py-2 px-3 rounded-xl bg-slate-950/40 border border-slate-800/50 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-medium text-slate-200 truncate">
            {journey.startLocation}
          </span>
        </div>
        <div className="ml-1 pl-3 border-l border-dashed border-slate-700 text-[11px] text-slate-500">
          {journey.stopCount > 0 ? `${journey.stopCount} brief stop(s)` : 'Direct route'}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
          <span className="font-medium text-slate-200 truncate">
            {journey.endLocation}
          </span>
        </div>
      </div>

      {/* Journey Stats Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-white font-medium">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            {journey.distanceKm} km
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {journey.durationMins} mins
          </span>
          {journey.stopCount > 0 && (
            <span className="flex items-center gap-1 hidden sm:inline-flex">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {journey.stopCount} stops
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
