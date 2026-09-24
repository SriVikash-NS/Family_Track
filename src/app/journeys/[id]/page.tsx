'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { MOCK_JOURNEYS } from '@/lib/mock-data';
import {
  Navigation,
  ArrowLeft,
  Clock,
  MapPin,
  Download,
  ShieldCheck,
  Share2,
  Calendar,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function JourneyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const journeyId = resolvedParams.id;

  const journey = MOCK_JOURNEYS.find((j) => j.id === journeyId) || MOCK_JOURNEYS[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back button & PageHeader */}
      <div>
        <Link
          href="/journeys"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journey History</span>
        </Link>

        <PageHeader
          title={journey.title}
          subtitle={`Recorded on ${journey.date} • ${journey.startTime} - ${journey.endTime}`}
          badge={journey.category}
        >
          <button
            onClick={() => alert('Exporting GPX file...')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download GPX</span>
          </button>
        </PageHeader>
      </div>

      {/* Main Grid: Interactive Map & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Route Map Container */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-4 h-4 transform -rotate-45" />
                Route Polyline Preview
              </span>
              <span className="text-xs text-slate-400">Mapbox Token: Pending Phase 4</span>
            </div>

            {/* Canvas / Map View Placeholder */}
            <div className="w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Navigation className="w-7 h-7 transform -rotate-45 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-white relative z-10 mb-1">
                Interactive Journey Map Canvas
              </h3>
              <p className="text-xs text-slate-400 max-w-md relative z-10">
                Route polyline from {journey.startLocation} to {journey.endLocation}. (Mapbox interactive map layer activates in Phase 4).
              </p>
            </div>
          </div>

          {/* Timeline & Stops */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Journey Timeline & Stops
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Departed {journey.startLocation}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {journey.startTime} • Manual Start
                  </span>
                </div>
              </div>

              {journey.stopCount > 0 && (
                <div className="flex items-start gap-3 pl-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1 ml-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-amber-300 block">
                      {journey.stopCount} Stop(s) Recorded
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Stationary for &gt; 2 mins
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Arrived at {journey.endLocation}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {journey.endTime} • Manual Stop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Metrics & Privacy Rules */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Trip Metrics
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Distance</span>
                <span className="text-base font-extrabold text-white">{journey.distanceKm} km</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Duration</span>
                <span className="text-base font-extrabold text-white">{journey.durationMins} mins</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Avg Speed</span>
                <span className="text-base font-extrabold text-cyan-400">{journey.speedAvgKmH || 28.5} km/h</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Safety Score</span>
                <span className="text-base font-extrabold text-emerald-400">{journey.safetyScore || 98}%</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/20 bg-gradient-to-b from-slate-900 to-emerald-950/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacy Logged</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This journey was recorded explicitly during active travel. Zero background tracking occurred prior to departure or after arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
