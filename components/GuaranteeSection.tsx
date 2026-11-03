'use client';

import React from 'react';
import { ShieldCheck, Zap, Scale, DollarSign, FileCheck, RefreshCw } from 'lucide-react';
import Logo from './Logo';

export default function GuaranteeSection() {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6 text-[#d8ee8e]" />,
      title: 'Algorithmic VPP Arbitrage',
      tag: 'Neural Edge Sync',
      description:
        'The Synapse Controller continuously monitors wholesale grid locational marginal pricing (LMP). By dispatching stored energy at peak rate events ($1.80–$3.20/kWh) and storing when power is free or negative, it generates surplus utility credits that neutralize fixed meter connection fees.',
    },
    {
      icon: <Scale className="w-6 h-6 text-[#d8ee8e]" />,
      title: '125% Architectural Over-Index',
      tag: 'Hardware Baseline',
      description:
        'Unlike conventional solar contractors who undersize arrays to win on bids, Synapse systems are engineered with high-efficiency N-Type TOPCon bifacial glass modules calibrated to produce 125% of your historic 36-month baseline consumption.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d8ee8e]" />,
      title: 'Performance Bonded Escrow',
      tag: 'Lloyd\'s of London Underwritten',
      description:
        'Every installation is legally backed by an independent third-party performance surety bond. If an abnormal polar vortex or utility tariff restructuring causes your annual net bill to rise above $0.00, our automated escrow pays the statement immediately.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#d8ee8e]" />,
      title: '84 Consecutive Billing Cycles',
      tag: '7-Year Term',
      description:
        'Covering 84 monthly utility statements across spring blooms, 100°F heatwaves, and sub-zero winter freezes. If you relocate before the 7-year term completes, the guarantee and bond transfer seamlessly to the next homeowner as an appraised equity asset.',
    },
  ];

  return (
    <section id="guarantee" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d8ee8e]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d8ee8e]/10 border border-[#d8ee8e]/20 text-[#d8ee8e] text-xs font-semibold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-4 h-4" />
            Legally Binding Guarantee
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Why We Guarantee <span className="text-[#d8ee8e]">$0 Electricity Bills</span> for 7 Years
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Most solar companies sell raw kilowatt hours and leave you exposed to NEM 3.0 export penalties,
            fixed monthly grid fees, and seasonal deficits. Synapse Roof is an end-to-end intelligent energy utility on your roof.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-8 hover:border-[#d8ee8e]/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#d8ee8e]/10 group-hover:border-[#d8ee8e]/20 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#d8ee8e] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contractual Transparency Banner */}
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d8ee8e] mb-3">
                <FileCheck className="w-4 h-4" /> Contractual Covenant
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                Section 4.2 Performance Escrow & True-Up Settlement
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                “Synapse Technologies Inc. warrants that the Net Operating Utility Balance for the customer premise shall not exceed $0.00 USD across any rolling 12-month settlement epoch throughout the initial 84 months of operation. In the event of any verified utility balance greater than $0.00, the Synapse Liquidity Escrow shall disburse direct electronic settlement within 14 business days.”
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Underwritten by Munich Re & Lloyd’s
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Fully Transferable on Sale
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Zero Deductible Claim Process
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div className="text-5xl font-medium text-white tracking-tight mb-1">$0.00</div>
              <div className="text-xs uppercase tracking-wider text-[#d8ee8e] font-semibold mb-3">
                Max Allowed Annual Bill
              </div>
              <div className="text-xs text-slate-400 leading-normal max-w-xs">
                Guaranteed in writing across weather anomalies, utility tariff revisions, and winter months.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

