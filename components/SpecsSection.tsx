'use client';

import React, { useState } from 'react';
import { Sliders, Check, ShieldAlert } from 'lucide-react';

export default function SpecsSection() {
  const [activeTab, setActiveTab] = useState<'pv' | 'storage' | 'grid' | 'warranties'>('pv');

  const specsData = {
    pv: [
      { param: 'Solar Cell Technology', spec: 'N-Type TOPCon 16BB Monocrystalline Bifacial', note: 'Higher electron mobility, zero LID' },
      { param: 'Module Nominal Efficiency', spec: '22.8% (STC Standard Test Conditions)', note: 'Industry leading photon-electron conversion' },
      { param: 'Bifaciality Factor', spec: '80% ± 5%', note: 'Rear-side power generation from roof albedo' },
      { param: 'Temperature Coefficient of Pmax', spec: '-0.29% / °C', note: 'Retains high power during 100°F+ heatwaves' },
      { param: 'Year 1 Degradation', spec: '< 1.0%', note: 'Linear degradation < 0.40% / year thereafter' },
      { param: 'Year 25 Guaranteed Output', spec: '89.4% of Initial Rated Capacity', note: 'Certified by TÜV Rheinland & DNV GL' },
      { param: 'Glass Construction', spec: '2.0mm + 2.0mm High-Transmission Anti-Reflective Glass', note: 'Dual-tempered architectural glazing' },
      { param: 'Impact & Hail Resistance', spec: 'ANSI FM 4473 Class 4 (1.75 inch steel ball at 90 mph)', note: 'Extreme storm resilience' },
    ],
    storage: [
      { param: 'Battery Chemistry', spec: 'Lithium Iron Phosphate (LiFePO4 / LFP)', note: 'Cobalt-free, zero risk of thermal runaway' },
      { param: 'Scalable Capacity Tiers', spec: '15 kWh / 30 kWh / 45 kWh / 60 kWh Usable', note: 'Modular stackable outdoor/indoor enclosure' },
      { param: 'Continuous Output Power', spec: '10.0 kW per 15 kWh block (up to 30 kW continuous)', note: 'Sustained whole-home inductive starting power' },
      { param: 'Peak Surge Output (10 sec)', spec: '16.0 kW per block', note: 'Easily starts dual 5-ton heat pumps' },
      { param: 'Round-Trip Efficiency', spec: '90.5% (AC to Battery to AC)', note: 'Ultra-low loss power electronics' },
      { param: 'Thermal Regulation System', spec: 'Closed-Loop Liquid Glycol Heat Pump System', note: 'Maintains optimal 22°C (72°F) core temperature' },
      { param: 'Operating Ambient Range', spec: '-20°F to 135°F (-29°C to 57°C)', note: 'Full power delivery without derating' },
      { param: 'Lifecycle Endurance', spec: '10,000 Complete Cycles to 80% Retained Capacity', note: 'Equivalent to 27+ years of daily cycling' },
    ],
    grid: [
      { param: 'Grid Disconnect Transfer Speed', spec: '< 15 Milliseconds (Sub-Cycle Transition)', note: 'Computers, Wi-Fi, and clocks remain uninterrupted' },
      { param: 'Service Entrance Rating', spec: '200A / 400A Dual Distribution Enclosure', note: 'Whole-home panel backup without sub-panels' },
      { param: 'Grid Compliance & Standards', spec: 'IEEE 1547-2018, UL 1741-SB, Rule 21 / HECO', note: 'Certified for all North American utilities' },
      { param: 'Safety & Rapid Shutdown', spec: 'NEC 2023 Article 690.12 Module-Level Shutdown', note: 'Roof drops to < 30V within 10 seconds of shutoff' },
      { param: 'Telemetry & Connectivity', spec: 'Dual Gigabit Ethernet + LTE Cat-M1 Failover', note: 'Runs full autonomous neural logic even offline' },
      { param: 'Bi-Directional EV Interface', spec: 'ISO 15118 Vehicle-to-Home (V2H) Ready', note: 'Supports bi-directional EV battery tie-in' },
    ],
    warranties: [
      { param: 'Zero-Bill Performance Guarantee', spec: '7 Years (84 Consecutive Billing Cycles)', note: 'Direct true-up financial reimbursement escrow' },
      { param: 'Surety Underwriting', spec: 'Lloyd’s of London / Munich Re Performance Bond', note: 'Independent insurance backing our corporate covenant' },
      { param: 'Solar Hardware & Power Output', spec: '25 Years Comprehensive', note: '100% parts, labor, and truck-roll included' },
      { param: 'Battery Storage Capacity Warranty', spec: '15 Years Unconditional', note: 'Guarantees minimum 75% retained capacity' },
      { param: 'Roof Waterproofing & Penetration', spec: '25 Years Complete Water-Tight Guarantee', note: 'Includes full structural deck remediation' },
      { param: 'Home Transferability', spec: '100% Free Transfer to Next Homebuyer', note: 'Transfers with home title, increasing appraisal equity' },
    ],
  };

  return (
    <section id="specs" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Sliders className="w-4 h-4 text-[#d8ee8e]" />
            Full Technical Datasheet
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Architectural & <span className="text-[#d8ee8e]">Electrical Specifications</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Transparent, uncompromised engineering metrics verified by independent third-party laboratories.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'pv', label: 'Photovoltaic Array' },
            { id: 'storage', label: 'Energy Storage (Vault)' },
            { id: 'grid', label: 'Grid Gateway & Inverters' },
            { id: 'warranties', label: 'Warranties & Guarantees' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#d8ee8e] text-[#0b1426] font-semibold shadow-md'
                  : 'glass-panel text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Spec Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-semibold">Parameter</th>
                  <th className="py-4 px-6 font-semibold">Specification</th>
                  <th className="py-4 px-6 font-semibold hidden md:table-cell">Engineering Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {specsData[activeTab].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-medium text-white">{row.param}</td>
                    <td className="py-4 px-6 text-[#d8ee8e] font-mono font-medium">{row.spec}</td>
                    <td className="py-4 px-6 text-slate-400 text-xs hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

