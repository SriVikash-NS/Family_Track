'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Square,
  Pause,
  Navigation,
  ShieldCheck,
  MapPin,
  Clock,
  Car,
  Footprints,
  Bike,
  CheckCircle2,
  Users,
  EyeOff,
} from 'lucide-react';
import { CategoryType, PrivacyLevel } from '@/types';

interface ActiveJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJourneySaved?: (journeyTitle: string) => void;
}

export const ActiveJourneyModal: React.FC<ActiveJourneyModalProps> = ({
  isOpen,
  onClose,
  onJourneySaved,
}) => {
  const [trackingState, setTrackingState] = useState<'idle' | 'tracking' | 'paused' | 'saved'>('idle');
  const [tripTitle, setTripTitle] = useState('My Afternoon Commute');
  const [category, setCategory] = useState<CategoryType>('Commute');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('family');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [simulatedDistance, setSimulatedDistance] = useState(0.0);

  // Live timer effect when tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (trackingState === 'tracking') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
        setSimulatedDistance((prev) => parseFloat((prev + 0.04).toFixed(2)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [trackingState]);

  if (!isOpen) return null;

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTrackingState('tracking');
    setElapsedSeconds(0);
    setSimulatedDistance(0.0);
  };

  const handleStop = () => {
    setTrackingState('saved');
    setTimeout(() => {
      onJourneySaved?.(tripTitle);
      setTrackingState('idle');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel rounded-3xl w-full max-w-lg overflow-hidden border border-slate-700/80 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Navigation className="w-5 h-5 transform -rotate-45" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">
                {trackingState === 'idle'
                  ? 'Start New Journey'
                  : trackingState === 'saved'
                  ? 'Journey Completed!'
                  : 'Journey Tracking Active'}
              </h2>
              <p className="text-xs text-slate-400">
                Privacy mode: {privacy === 'family' ? 'Shared with Family Circle' : privacy === 'private' ? 'Private to You' : 'Family Circle'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {trackingState === 'saved' ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{tripTitle}</h3>
              <p className="text-sm text-slate-300">
                Logged {simulatedDistance} km in {formatTimer(elapsedSeconds)}
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                Saved securely to your family history log.
              </p>
            </div>
          ) : trackingState === 'idle' ? (
            <>
              {/* Trip Title Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Journey Name
                </label>
                <input
                  type="text"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  placeholder="e.g. Office Commute, Gym Trip"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Commute', icon: Car },
                    { label: 'School Run', icon: Navigation },
                    { label: 'Running', icon: Footprints },
                    { label: 'Cycling', icon: Bike },
                    { label: 'Personal', icon: MapPin },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSel = category === cat.label;
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => setCategory(cat.label as CategoryType)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          isSel
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Privacy & Sharing
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPrivacy('family')}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                      privacy === 'family'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Share with Family</span>
                      <span className="text-[10px] text-slate-400">
                        Visible to family circle during trip
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrivacy('private')}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                      privacy === 'private'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <EyeOff className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Keep Private</span>
                      <span className="text-[10px] text-slate-400">
                        Only saved in your local stats
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Start CTA Button */}
              <button
                type="button"
                onClick={handleStart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Start Tracking Now</span>
              </button>
            </>
          ) : (
            /* Live Tracking View */
            <div className="space-y-6">
              {/* Animated Radar Pulse */}
              <div className="flex flex-col items-center justify-center py-6 relative">
                <div className="w-32 h-32 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse-ring relative">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Navigation className="w-10 h-10 text-emerald-400 transform -rotate-45 animate-pulse" />
                  </div>
                </div>
                <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Recording GPS Coordinates
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Elapsed Time</span>
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {formatTimer(elapsedSeconds)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Distance Logged</span>
                  <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                    {simulatedDistance} <span className="text-sm font-normal text-slate-400">km</span>
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                {trackingState === 'tracking' ? (
                  <button
                    type="button"
                    onClick={() => setTrackingState('paused')}
                    className="flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700"
                  >
                    <Pause className="w-4 h-4 text-amber-400" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTrackingState('tracking')}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Resume</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleStop}
                  className="flex-1 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-600/20"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop & Save</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
