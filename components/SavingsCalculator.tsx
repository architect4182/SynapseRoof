'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, DollarSign, CheckCircle2, Sparkles } from 'lucide-react';

interface SavingsCalculatorProps {
  onOpenQuote?: (prefillData?: any) => void;
}

export default function SavingsCalculator({ onOpenQuote }: SavingsCalculatorProps) {
  const [monthlyBill, setMonthlyBill] = useState<number>(340);
  const [homeSqFt, setHomeSqFt] = useState<number>(3200);
  const [sunExposure, setSunExposure] = useState<'high' | 'moderate' | 'variable'>('moderate');
  const [backupNeed, setBackupNeed] = useState<'essential' | 'whole-home' | 'off-grid'>('whole-home');

  // Realistic Calculations based on 6.2% average annual utility rate escalation over 7 years
  const calculations = useMemo(() => {
    // 7-year cumulative cost with 6.2% annual compounded rate hikes
    let cumulative7YearBill = 0;
    let currentAnnual = monthlyBill * 12;
    for (let yr = 0; yr < 7; yr++) {
      cumulative7YearBill += currentAnnual;
      currentAnnual *= 1.062;
    }

    const guaranteedCost = 0;
    const totalSavings = cumulative7YearBill;

    // Sizing recommendations
    const solarKw = (monthlyBill / 26) * (sunExposure === 'high' ? 0.9 : sunExposure === 'moderate' ? 1.05 : 1.25);
    const storageKwh = backupNeed === 'essential' ? 15 : backupNeed === 'whole-home' ? 30 : 45;

    // Estimated system gross investment and 30% Federal Tax Credit
    const estimatedGross = Math.round(solarKw * 2200 + storageKwh * 850);
    const federalTaxCredit = Math.round(estimatedGross * 0.3);
    const netEquipmentCost = estimatedGross - federalTaxCredit;

    return {
      cumulative7YearBill: Math.round(cumulative7YearBill),
      guaranteedCost: 0,
      totalSavings: Math.round(totalSavings),
      solarKw: Math.round(solarKw * 10) / 10,
      storageKwh,
      estimatedGross,
      federalTaxCredit,
      netEquipmentCost,
    };
  }, [monthlyBill, sunExposure, backupNeed]);

  return (
    <section id="calculator" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Calculator className="w-4 h-4 text-[#d8ee8e]" />
            7-Year Economics Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Calculate Your <span className="text-[#d8ee8e]">$0 Bill Net Savings</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See the exact capital you divert from monopoly utility rate hikes directly into your personal balance sheet.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 space-y-8">
            {/* Control 1: Monthly Bill */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white">Average Monthly Electric Bill</label>
                <span className="text-2xl font-mono font-medium text-[#d8ee8e]">${monthlyBill} / mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="10"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-[#d8ee8e]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>$100/mo</span>
                <span>$600/mo</span>
                <span>$1,200/mo</span>
              </div>
            </div>

            {/* Control 2: Home Square Footage */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white">Home Living Area</label>
                <span className="text-base font-mono text-slate-200">{homeSqFt.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min="1200"
                max="8000"
                step="100"
                value={homeSqFt}
                onChange={(e) => setHomeSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-[#d8ee8e]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>1,200 sq ft</span>
                <span>4,500 sq ft</span>
                <span>8,000 sq ft</span>
              </div>
            </div>

            {/* Control 3: Solar Irradiance Profile */}
            <div>
              <label className="text-sm font-medium text-white block mb-3">Regional Sun & Climate Exposure</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'high', label: 'High Sun', desc: 'Southwest / Sunbelt' },
                  { id: 'moderate', label: 'Moderate', desc: 'Midwest / Mid-Atlantic' },
                  { id: 'variable', label: 'Variable / Fog', desc: 'Pacific NW / Northeast' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSunExposure(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      sunExposure === item.id
                        ? 'bg-white/10 border-[#d8ee8e] text-white shadow-md'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-400 truncate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Resilience Tier */}
            <div>
              <label className="text-sm font-medium text-white block mb-3">Battery Storage Architecture</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'essential', label: 'Essential Circuits', val: '15 kWh Vault' },
                  { id: 'whole-home', label: 'Whole Home 24/7', val: '30 kWh Dual Vault' },
                  { id: 'off-grid', label: 'Extended Autonomy', val: '45 kWh Triple Vault' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBackupNeed(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      backupNeed === item.id
                        ? 'bg-white/10 border-[#d8ee8e] text-white shadow-md'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[11px] text-[#d8ee8e] font-mono">{item.val}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Card (5 Cols) */}
          <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                7-Year Certified Assessment
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Sparkles className="w-3.5 h-3.5" /> Guarantee Active
              </span>
            </div>

            {/* Big Headline Stat */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-mono uppercase">Guaranteed 7-Year Electricity Bill</div>
              <div className="text-5xl font-mono font-medium text-white tracking-tight flex items-baseline gap-2">
                $0.00
                <span className="text-xs font-normal text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Zero Due
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 flex items-center justify-between border border-white/5">
                <span className="text-slate-400">Projected 7-Yr Utility Baseline (No Solar)</span>
                <span className="text-red-400 font-medium">
                  -${calculations.cumulative7YearBill.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center justify-between border border-white/5">
                <span className="text-slate-400">Total 7-Year Retained Capital</span>
                <span className="text-[#d8ee8e] font-bold text-sm">
                  +${calculations.totalSavings.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center justify-between border border-white/5">
                <span className="text-slate-400">30% Federal ITC Tax Credit (Sec 25D)</span>
                <span className="text-white font-medium">
                  ${calculations.federalTaxCredit.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center justify-between border border-white/5">
                <span className="text-slate-400">Engineered Array Sizing</span>
                <span className="text-white font-medium">
                  {calculations.solarKw} kW DC / {calculations.storageKwh} kWh
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                onOpenQuote?.({
                  monthlyBill,
                  homeSqFt,
                  sunExposure,
                  backupNeed,
                  solarKw: calculations.solarKw,
                  storageKwh: calculations.storageKwh,
                  totalSavings: calculations.totalSavings,
                })
              }
              className="w-full py-4 rounded-full bg-[#d8ee8e] hover:bg-[#cbe27a] text-[#0b1426] font-semibold text-sm transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Lock In My 7-Year $0 Bill Guarantee</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 text-center font-mono">
              Backed by third-party escrow • No hidden true-up reconciliations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

