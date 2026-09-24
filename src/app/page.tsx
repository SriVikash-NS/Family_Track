'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navigation,
  ShieldCheck,
  Lock,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle,
  EyeOff,
  Clock,
  MapPin,
  Car,
  BellRing,
  Heart,
  ChevronRight,
  Play,
} from 'lucide-react';
import { ActiveJourneyModal } from '@/components/ActiveJourneyModal';

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background radial glow gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Navigation className="w-5 h-5 text-emerald-400 transform -rotate-45" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Family<span className="text-emerald-400">Track</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#privacy" className="hover:text-emerald-400 transition-colors">
              Privacy First
            </a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">
              Trust & Safety
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-8 animate-float">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>The Zero-Surveillance Family App</span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Track the journey,{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            not the person.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Stay connected with your family while keeping everyday movement private.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Features</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden text-left border border-slate-700/80 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  Live Simulated Tracking
                </span>
                <h3 className="text-lg font-bold text-white">
                  Marcus Rivera • Morning School Bus Route
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Try Live Tracker Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">Distance Logged</span>
              <span className="text-2xl font-extrabold text-white">12.4 km</span>
              <span className="text-[11px] text-emerald-400 block mt-1">
                Active • 4 mins ago
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">Privacy Status</span>
              <span className="text-2xl font-extrabold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Shared
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Auto-deletes in 7 days
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">ETA & Arrival</span>
              <span className="text-2xl font-extrabold text-cyan-400">08:45 AM</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Lincoln High School
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Comparison Section */}
      <section id="privacy" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Why Journey-First Tracking?
          </h2>
          <p className="text-slate-400 text-base">
            Traditional tracking apps monitor every single step 24/7 without consent. FamilyTrack puts complete control back in your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional 24/7 Tracking */}
          <div className="glass-panel rounded-3xl p-8 border border-rose-900/30 bg-rose-950/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-6">
              <EyeOff className="w-4 h-4" /> Traditional Location Apps
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              24/7 Constant Surveillance
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 text-lg font-bold">✕</span>
                <span>Monitors location 24 hours a day, even when at home.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 text-lg font-bold">✕</span>
                <span>Drains phone battery constantly running in the background.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 text-lg font-bold">✕</span>
                <span>Creates uncomfortable feelings of being watched.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 text-lg font-bold">✕</span>
                <span>Stores location logs forever on centralized servers.</span>
              </li>
            </ul>
          </div>

          {/* FamilyTrack Philosophy */}
          <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-b from-slate-900/80 to-emerald-950/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" /> FamilyTrack Approach
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              Explicit Journey Tracking
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>You manually start tracking when a trip begins and stop when you arrive.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero background location polling when you are not on a journey.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fosters mutual trust, peace of mind, and respect for independence.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ephemeral history retention with one-click data wipe options.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Designed for Modern Family Safety
          </h2>
          <p className="text-slate-400 text-base">
            Everything you need for peace of mind during travel, without compromising personal boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'One-Tap Manual Start',
              desc: 'Tap Start Journey before commuting or walking home. Tracking stops automatically upon arrival.',
              icon: Navigation,
            },
            {
              title: 'Arrival & Departure Pings',
              desc: 'Family members get instant notifications when you reach school, office, or home.',
              icon: BellRing,
            },
            {
              title: 'Granular Privacy Rules',
              desc: 'Choose who sees each trip. Mark fitness runs private while sharing school drop-offs with family.',
              icon: Lock,
            },
            {
              title: 'Route & Travel Analytics',
              desc: 'View daily travel time, distances, carbon offset, and safety scores.',
              icon: Zap,
            },
            {
              title: 'Family Geofence Circles',
              desc: 'Set virtual boundaries for places like Home, School, and Gym for quick automated check-ins.',
              icon: MapPin,
            },
            {
              title: 'Battery-Efficient Design',
              desc: 'Conserves 85% more battery than background location-sharing apps.',
              icon: Heart,
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-slate-800/80 text-emerald-400 w-fit mb-4 border border-slate-700/60">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-emerald-950/40">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to experience privacy-first family tracking?
            </h2>
            <p className="text-slate-300 text-base">
              Try the interactive FamilyTrack dashboard today. No credit card or setup required.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all active:scale-95 gap-2"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-6 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-400 transform -rotate-45" />
            <span className="font-bold text-slate-300">FamilyTrack</span>
            <span>— Track the journey, not the person.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-emerald-400">
              Dashboard
            </Link>
            <Link href="/journeys" className="hover:text-emerald-400">
              Journeys
            </Link>
            <Link href="/settings" className="hover:text-emerald-400">
              Privacy Settings
            </Link>
          </div>
        </div>
      </footer>

      {/* Interactive Demo Modal Triggered from Landing */}
      <ActiveJourneyModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
