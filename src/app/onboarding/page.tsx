'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Navigation,
  ShieldCheck,
  Users,
  Home,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Plus,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [familyChoice, setFamilyChoice] = useState<'create' | 'join'>('create');
  const [familyName, setFamilyName] = useState('Rivera Family');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [homeAddress, setHomeAddress] = useState('742 Evergreen Terrace, Springfield');
  const [enableFamilySharing, setEnableFamilySharing] = useState(true);

  const nextStep = () => {
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleFinish = () => {
    // Will link to Supabase onboarding insert in Phase 2
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Navigation className="w-5 h-5 text-emerald-400 transform -rotate-45" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Family<span className="text-emerald-400">Track</span>
          </span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between px-2 text-xs font-semibold text-slate-400">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                s === step
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : s < step
                  ? 'bg-slate-800 text-emerald-400'
                  : 'bg-slate-900 text-slate-600'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            <span className={s === step ? 'text-white font-bold' : 'text-slate-500'}>
              {s === 1 ? 'Welcome' : s === 2 ? 'Family' : s === 3 ? 'Home Zone' : 'Privacy'}
            </span>
          </div>
        ))}
      </div>

      {/* Onboarding Box */}
      <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-slate-800/80 shadow-2xl relative z-10">
        {/* STEP 1: Welcome */}
        {step === 1 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Welcome to FamilyTrack
              </h1>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                The privacy-first family journey application built around explicit consent.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>No 24/7 background location surveillance.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Location recorded only while you manually run a journey.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Full control over who views each trip.</span>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Create or Join Family */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Create or Join a Family
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Connect with your loved ones to share explicit journey updates.
              </p>
            </div>

            {/* Choice toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFamilyChoice('create')}
                className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                  familyChoice === 'create'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <Plus className="w-4 h-4 text-emerald-400 mb-2" />
                <span className="font-bold block text-white">Create New Family</span>
                <span className="text-[11px] text-slate-400">Start a new family circle</span>
              </button>

              <button
                type="button"
                onClick={() => setFamilyChoice('join')}
                className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                  familyChoice === 'join'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <Users className="w-4 h-4 text-cyan-400 mb-2" />
                <span className="font-bold block text-white">Join Existing</span>
                <span className="text-[11px] text-slate-400">Enter invite code</span>
              </button>
            </div>

            {familyChoice === 'create' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Family Circle Name
                </label>
                <input
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="e.g. Rivera Family"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Invite Code
                </label>
                <input
                  type="text"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value)}
                  placeholder="FAMILY-TRK-8921"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/60 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors uppercase"
                />
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={prevStep}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Set Home Location */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Home className="w-5 h-5 text-emerald-400" />
                Set Home Location
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Designate your home zone for automatic arrival check-ins during active journeys.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Home Address or Coordinates
              </label>
              <input
                type="text"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                placeholder="742 Evergreen Terrace"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">Enable Family Visibility</span>
                <span className="text-[11px] text-slate-400">
                  Allow family members to see when your active journey ends at home.
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableFamilySharing}
                onChange={(e) => setEnableFamilySharing(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 bg-slate-950"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={prevStep}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Explain Privacy */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Our Core Privacy Promise
              </h2>
              <p className="text-sm text-slate-300 mt-2 font-semibold text-emerald-400">
                "Your location is recorded only while you have an active journey."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left space-y-3 text-xs text-slate-400">
              <p>
                When your journey ends, tracking stops immediately. You can stop tracking manually at any time during travel.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={prevStep}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 active:scale-95 transition-all"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
