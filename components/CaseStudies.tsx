'use client';

import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      title: 'Hudson Valley Modern Farmhouse',
      location: 'Rhinebeck, New York',
      system: '16.4 kW Array • 30 kWh Vault LFP',
      climate: 'Heavy Snowpack & Valley Morning Fog',
      monthsZero: '48 Months',
      historicBill: '$485 / month',
      currentBill: '$0.00 / month',
      verifiedTrueUp: '+$218.40 Net Annual Surplus Credit',
      image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040211_c8fd4865-285e-4c1f-8a37-4bfe0771357b.png&w=2560&q=85',
      quote:
        'We went through three consecutive Northeast blizzards with temperatures down to -14°F. Our neighbors had power outages lasting three days; our heat pumps, well pump, and EV ran without a blip. Every bill has arrived at exactly $0.00.',
      owner: 'Julian & Elena Vance',
      details: [
        'Standing-seam charcoal roof with integrated flush-mount brackets',
        'Bifacial rear-absorption generates up to 14% extra yield from snow reflection',
        'Synapse VPP delivered $420 in summer demand-response grid credits',
      ],
    },
    {
      title: 'Pacific Northwest Alpine Retreat',
      location: 'Hood River, Oregon',
      system: '14.8 kW Array • 30 kWh Vault LFP',
      climate: 'Dense Coastal Fog & Dense Forest Canopy',
      monthsZero: '36 Months',
      historicBill: '$390 / month',
      currentBill: '$0.00 / month',
      verifiedTrueUp: '+$84.15 Net Annual Surplus Credit',
      image:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040259_1be34093-835e-4de4-b3a8-f875e6a74591.png&w=2560&q=85',
      quote:
        'Our property has towering Douglas firs that cast shifting shadows across the gables. Traditional solar companies told us our shade factor was too complex. Synapse’s micro-kernel architecture handled it effortlessly.',
      owner: 'Marcus Sterling, Architect',
      details: [
        'Architectural micro-inverter topology eliminates partial shading losses',
        'Multi-spectral weather sensor prepares battery state 48h before storm fronts arrive',
        'Zero roof penetration leaks verified through 75 inches of annual rain',
      ],
    },
    {
      title: 'High-Desert Net-Zero Ranch',
      location: 'Sedona, Arizona',
      system: '22.4 kW Array • 45 kWh Vault LFP',
      climate: '115°F Summer Peaks & Monsoonal Thunderstorms',
      monthsZero: '54 Months',
      historicBill: '$720 / month',
      currentBill: '$0.00 / month',
      verifiedTrueUp: '+$612.90 Net Annual Surplus Credit',
      image:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      quote:
        'In Arizona, APS utility rates during peak 4-7 PM summer cooling hours are predatory. Synapse completely isolates our AC units from the grid during peak hours, and exports excess battery power at top-tier rates.',
      owner: 'Dr. Aaron & Chloe Chen',
      details: [
        'Dual 5-ton variable speed geothermal heat pumps powered 100% off-grid',
        'Active liquid glycol loop keeps batteries under 78°F during 115°F ambient heat',
        'Over $28,000 in utility costs saved in under 5 years',
      ],
    },
  ];

  return (
    <section id="cases" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Award className="w-4 h-4 text-[#d8ee8e]" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Real Homes. <span className="text-[#d8ee8e]">Zero True-Up Invoices.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Examine certified production and utility reconciliation audits from homeowners living in extreme climates.
          </p>
        </div>

        {/* Case Study Switcher */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {cases.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCase(idx)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCase === idx
                  ? 'bg-white text-[#0b1426] font-semibold shadow-lg'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-white/30'
              }`}
            >
              {c.location}
            </button>
          ))}
        </div>

        {/* Active Case Card */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <img
                src={cases[selectedCase].image}
                alt={cases[selectedCase].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0b1426]" />

              <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full text-xs font-mono text-[#d8ee8e] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {cases[selectedCase].location}
              </div>

              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Audit Verification</div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {cases[selectedCase].monthsZero} of Verified $0 Statements
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#d8ee8e] uppercase tracking-wider block mb-1">
                  {cases[selectedCase].system}
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-white">
                  {cases[selectedCase].title}
                </h3>
              </div>

              <blockquote className="text-slate-300 text-sm sm:text-base italic leading-relaxed border-l-2 border-[#d8ee8e] pl-4">
                "{cases[selectedCase].quote}"
              </blockquote>

              <div className="text-xs font-medium text-white/80">
                — {cases[selectedCase].owner}
              </div>

              {/* Data Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Pre-Synapse Bill</div>
                  <div className="text-base font-mono text-red-400 font-medium">
                    {cases[selectedCase].historicBill}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Guaranteed Bill</div>
                  <div className="text-base font-mono text-emerald-400 font-bold">
                    {cases[selectedCase].currentBill}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Annual True-Up</div>
                  <div className="text-xs font-mono text-[#d8ee8e] font-semibold mt-0.5">
                    {cases[selectedCase].verifiedTrueUp}
                  </div>
                </div>
              </div>

              {/* Bullet points */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                {cases[selectedCase].details.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#d8ee8e] flex-none" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

