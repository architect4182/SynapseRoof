'use client';

import React from 'react';
import { Layers, Shield, Cpu, Thermometer, Wind, Zap } from 'lucide-react';

export default function TechArchitecture() {
  const hardware = [
    {
      title: 'Architectural Ultra-Black N-Type Modules',
      badge: 'Bifacial TOPCon Cells',
      specs: [
        { label: 'Module Efficiency', val: '22.8%' },
        { label: 'Temperature Coefficient', val: '-0.29% / °C' },
        { label: 'Degradation', val: '< 0.4% / yr' },
        { label: 'Hail & Wind Rating', val: 'Class 4 Hail (1.75") / 160 mph' },
      ],
      description:
        'Engineered to harmonize seamlessly with charcoal, slate, and standing-seam architectural roofs. Bifacial rear-glass absorbs ambient albedo reflection from snow, gravel, and morning fog.',
    },
    {
      title: 'Synapse Core Microinverter Mesh',
      badge: 'Independent MPPT',
      specs: [
        { label: 'Peak CEC Efficiency', val: '97.8%' },
        { label: 'Voltage Range', val: '18V – 58V DC' },
        { label: 'Rapid Shutdown', val: 'NEC 2023 690.12' },
        { label: 'Sub-Cycle Redundancy', val: 'Zero single point of failure' },
      ],
      description:
        'Each roof plane operates on its own dedicated digital tracking kernel. Shadows cast by tree limbs, dormers, or chimneys will never compromise the generation output of adjacent modules.',
    },
    {
      title: 'Synapse Vault Liquid-Cooled LFP Battery',
      badge: '15 kWh – 60 kWh Modular',
      specs: [
        { label: 'Chemistry', val: 'Lithium Iron Phosphate (LiFePO4)' },
        { label: 'Thermal Loop', val: 'Automotive Glycol Closed-Loop' },
        { label: 'Operating Range', val: '-20°F to 135°F (-29°C to 57°C)' },
        { label: 'Cycle Warranty', val: '10,000 Full Cycles @ 80% Retained' },
      ],
      description:
        'Cobalt-free, non-combustible cell chemistry. The integrated closed-loop liquid thermal management system maintains internal cell temperatures at an ideal 72°F regardless of blizzard or heatwave.',
    },
    {
      title: 'Synapse Master Gateway & 15ms Transfer',
      badge: 'Whole-Home Islanding',
      specs: [
        { label: 'Transfer Speed', val: '< 15 milliseconds' },
        { label: 'Service Amperage', val: '200A / 400A Dual Enclosure' },
        { label: 'V2H Interface', val: 'Bi-Directional ISO 15118 Ready' },
        { label: 'Revenue Metering', val: 'ANSI C12.20 Class 0.2' },
      ],
      description:
        'Instantly decouples your home from the utility grid in under 15 milliseconds upon transmission collapse. Your smart home hubs, computers, and medical equipment stay powered without interruption.',
    },
  ];

  return (
    <section id="architecture" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Layers className="w-4 h-4 text-[#d8ee8e]" />
            Hardware Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Engineered For The <span className="text-[#d8ee8e]">Next Quarter Century</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every component in the Synapse Roof hardware stack is manufactured to marine and aerospace tolerances,
            rated for 25+ years of continuous outdoor exposure in alpine snow and coastal sea salt.
          </p>
        </div>

        {/* 2x2 Grid of Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {hardware.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-8 hover:border-[#d8ee8e]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#d8ee8e]/10 text-[#d8ee8e] border border-[#d8ee8e]/20 font-semibold">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">REF: HW-{idx + 1}00</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{item.description}</p>
              </div>

              {/* Spec list */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10 bg-black/20 p-4 rounded-xl">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-0.5">
                    <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">{spec.label}</div>
                    <div className="text-sm font-medium text-white">{spec.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resilience Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl text-center">
            <Shield className="w-6 h-6 text-[#d8ee8e] mx-auto mb-2" />
            <div className="text-white text-sm font-medium">UL 9540 Certified</div>
            <div className="text-slate-400 text-xs">Fire and thermal runaway safe</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center">
            <Wind className="w-6 h-6 text-[#d8ee8e] mx-auto mb-2" />
            <div className="text-white text-sm font-medium">160 MPH Wind Load</div>
            <div className="text-slate-400 text-xs">ASTM D3161 Class F rated</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center">
            <Thermometer className="w-6 h-6 text-[#d8ee8e] mx-auto mb-2" />
            <div className="text-white text-sm font-medium">-25°F to 135°F</div>
            <div className="text-slate-400 text-xs">Liquid climate regulated</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center">
            <Zap className="w-6 h-6 text-[#d8ee8e] mx-auto mb-2" />
            <div className="text-white text-sm font-medium">IEEE 1547-2018</div>
            <div className="text-slate-400 text-xs">Advanced grid interconnect</div>
          </div>
        </div>
      </div>
    </section>
  );
}

