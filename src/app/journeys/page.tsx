'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { JourneyCard } from '@/components/JourneyCard';
import { EmptyState } from '@/components/EmptyState';
import { MOCK_JOURNEYS } from '@/lib/mock-data';
import { Journey } from '@/types';
import {
  Navigation,
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  ShieldCheck,
  MapPin,
  X,
  Share2,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export default function JourneysPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  const categories = ['All', 'Commute', 'School Run', 'Running', 'Cycling', 'Personal'];

  const filteredJourneys = MOCK_JOURNEYS.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.endLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || j.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <PageHeader
        title="Journey History"
        subtitle="Explore recorded family trips, route stats, stop timelines, and privacy controls."
        badge={`${MOCK_JOURNEYS.length} Logged`}
      >
        <button
          onClick={() => alert('Manual trip log feature: Form would trigger here.')}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Log Manual Trip</span>
        </button>

        <button
          onClick={() => alert('Exporting all family journeys as GPX / GeoJSON files...')}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Export History</span>
        </button>
      </PageHeader>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800/80">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/60 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
          />
        </div>
      </div>

      {/* Journeys List Grid */}
      {filteredJourneys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJourneys.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              onSelect={(j) => setSelectedJourney(j)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No journeys found"
          description={`No recorded trips matching category "${selectedCategory}" or search query "${searchQuery}".`}
          icon={<Navigation className="w-7 h-7 text-emerald-400" />}
          action={{
            label: 'Clear Filters',
            onClick: () => {
              setSearchQuery('');
              setSelectedCategory('All');
            },
          }}
        />
      )}

      {/* Journey Detail Modal */}
      {selectedJourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel rounded-3xl w-full max-w-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  {selectedJourney.category} • {selectedJourney.date}
                </span>
                <h2 className="text-xl font-bold text-white">{selectedJourney.title}</h2>
              </div>

              <button
                onClick={() => setSelectedJourney(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Route Map Preview Canvas */}
              <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <Navigation className="w-8 h-8 text-emerald-400 transform -rotate-45 mb-2 animate-bounce" />
                <span className="text-xs font-semibold text-slate-300 relative z-10">
                  Interactive Route Map Render Preview
                </span>
                <span className="text-[11px] text-slate-500 relative z-10 mt-1">
                  GPS Waypoints recorded: 42 coordinates • Privacy fuzzing active
                </span>
              </div>

              {/* Quick stats banner */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Distance</span>
                  <span className="text-lg font-bold text-white">{selectedJourney.distanceKm} km</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Duration</span>
                  <span className="text-lg font-bold text-white">{selectedJourney.durationMins} mins</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Safety Score</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedJourney.safetyScore || 98}%</span>
                </div>
              </div>

              {/* Waypoint Timeline */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Journey Timeline & Stops
                </h4>
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Departed {selectedJourney.startLocation}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {selectedJourney.startTime} • Tracking initiated with consent
                      </span>
                    </div>
                  </div>

                  {selectedJourney.stopCount > 0 && (
                    <div className="flex items-start gap-3 pl-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1 ml-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-amber-300 block">
                          Recorded {selectedJourney.stopCount} brief stop(s)
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Total stop duration ~ 4 mins
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Arrived at {selectedJourney.endLocation}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {selectedJourney.endTime} • Family notified of arrival
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedJourney.notes && (
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-1">Notes:</span>
                  {selectedJourney.notes}
                </div>
              )}

              {/* Footer Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    alert('Journey privacy changed!');
                    setSelectedJourney(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>Change Sharing Permissions</span>
                </button>

                <button
                  onClick={() => {
                    alert('Exporting GPX file...');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download GPX</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
