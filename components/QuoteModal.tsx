'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Home, Zap, MapPin, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function QuoteModal({ isOpen, onClose, initialData }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '428 Meadow Lane',
    cityStateZip: 'Rhinebeck, NY 12572',
    utility: 'Central Hudson Electric',
    roofType: 'standing-seam',
    monthlyBill: initialData?.monthlyBill || 340,
    hasEV: true,
    hasHeatPump: true,
    fullName: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const estimatedKw = Math.round((formData.monthlyBill / 24) * 10) / 10;
  const estimatedStorage = formData.monthlyBill > 400 ? 45 : 30;
  const estimatedSavings = Math.round(formData.monthlyBill * 12 * 7 * 1.25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl bg-[#0b1426] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Logo size={24} showWordmark={false} sunColor="#d8ee8e" />
            <span className="text-xs font-mono text-[#d8ee8e] uppercase tracking-wider">
              Synapse Certified Architectural Sizing
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Reserve Your 7-Year $0 Bill Guarantee
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            Engineered specifically to eliminate 100% of your energy costs across all seasons.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-medium text-white">Your Guarantee Is Reserved</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have dispatched a LiDAR 3D solar irradiance survey for <span className="text-white font-medium">{formData.address || 'your property'}</span>. An architectural engineer will email your complete system schematic and Lloyd’s surety escrow documentation within 24 hours.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 max-w-sm mx-auto font-mono text-xs text-left space-y-1">
              <div className="text-slate-400">Reservation Ref: <span className="text-[#d8ee8e]">SYN-8492-ZERO</span></div>
              <div className="text-slate-400">Target System: <span className="text-white">{estimatedKw} kW DC / {estimatedStorage} kWh Vault</span></div>
              <div className="text-slate-400">Estimated 7-Year Savings: <span className="text-emerald-400 font-bold">${estimatedSavings.toLocaleString()}</span></div>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs font-mono">
              <span className={step >= 1 ? 'text-[#d8ee8e] font-semibold' : 'text-slate-500'}>
                1. Property & Utility
              </span>
              <span className="text-slate-600">→</span>
              <span className={step >= 2 ? 'text-[#d8ee8e] font-semibold' : 'text-slate-500'}>
                2. Energy Profile
              </span>
              <span className="text-slate-600">→</span>
              <span className={step >= 3 ? 'text-[#d8ee8e] font-semibold' : 'text-slate-500'}>
                3. Deliver Guarantee
              </span>
            </div>

            {/* Step 1: Address & Utility */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Property Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 104 Orchard Valley Rd"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">City, State, Zip</label>
                    <input
                      type="text"
                      value={formData.cityStateZip}
                      onChange={(e) => setFormData({ ...formData, cityStateZip: e.target.value })}
                      placeholder="e.g. Aspen, CO 81611"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Utility Provider</label>
                    <input
                      type="text"
                      value={formData.utility}
                      onChange={(e) => setFormData({ ...formData, utility: e.target.value })}
                      placeholder="e.g. PG&E, ConEd, Xcel"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-[#d8ee8e] hover:bg-[#c6df77] text-[#0b1426] font-semibold text-xs tracking-tight transition-all flex items-center gap-2"
                  >
                    <span>Next: Profile Your Energy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Roof & Loads */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Average Monthly Electric Bill (${formData.monthlyBill}/mo)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="20"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-[#d8ee8e]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Architectural Roof Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'standing-seam', label: 'Standing Seam Metal' },
                      { id: 'shingle', label: 'Architectural Shingle' },
                      { id: 'tile', label: 'Tile / Slate / Flat' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, roofType: r.id })}
                        className={`p-3 rounded-xl text-xs text-left border transition-all ${
                          formData.roofType === r.id
                            ? 'bg-white/10 border-[#d8ee8e] text-white'
                            : 'bg-white/[0.02] border-white/5 text-slate-400'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-2 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasEV}
                      onChange={(e) => setFormData({ ...formData, hasEV: e.target.checked })}
                      className="accent-[#d8ee8e] w-4 h-4 rounded"
                    />
                    <span className="text-xs text-slate-200">Electric Vehicle Charging</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasHeatPump}
                      onChange={(e) => setFormData({ ...formData, hasHeatPump: e.target.checked })}
                      className="accent-[#d8ee8e] w-4 h-4 rounded"
                    />
                    <span className="text-xs text-slate-200">Heat Pump / Geothermal</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full bg-[#d8ee8e] hover:bg-[#c6df77] text-[#0b1426] font-semibold text-xs tracking-tight transition-all flex items-center gap-2"
                  >
                    <span>Next: Instant System Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Confirm */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preliminary Sizing Badge */}
                <div className="p-4 rounded-2xl bg-black/40 border border-[#d8ee8e]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#d8ee8e] uppercase tracking-wider block">
                      Target System Sizing
                    </span>
                    <span className="text-lg font-medium text-white">
                      {estimatedKw} kW DC Array • {estimatedStorage} kWh Vault
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400 block">7-Yr Retained Capital</span>
                    <span className="text-base font-mono text-emerald-400 font-bold">
                      +${estimatedSavings.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Julian Vance"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 234-5678"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d8ee8e]"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-normal pt-1">
                  By clicking below, you request a custom architectural engineering solar layout and 7-year zero-bill performance bond guarantee quote for your residence. No spam, ever.
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full bg-[#d8ee8e] hover:bg-[#c6df77] text-[#0b1426] font-semibold text-xs tracking-tight transition-all flex items-center gap-2 shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Lock In My 7-Year $0 Bill Guarantee</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

