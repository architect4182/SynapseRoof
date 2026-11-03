'use client';

import React, { useState } from 'react';
import { Cpu, Sun, BatteryCharging, Network, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Real-Time Edge Weather & Irradiance Sensing',
      subtitle: 'Predictive Solar Ingestion',
      icon: <Sun className="w-6 h-6 text-[#d8ee8e]" />,
      summary:
        'Every Synapse roof incorporates local multi-spectral irradiance sensors and sub-kilometer weather satellite feeds.',
      details: [
        'Forecasts morning fog dissipation and afternoon cloud cover 48 hours in advance.',
        'Calculates optimal thermal degradation curves for peak midday collection.',
        'Pre-chills or pre-heats home HVAC utilizing surplus midday solar before peak tariff windows trigger.',
      ],
      metric: '99.4% MPPT Efficiency',
      telemetry: 'Edge forecasting refreshed every 60 seconds',
    },
    {
      num: '02',
      title: 'Neural Energy Routing & Micro-Inverter Mesh',
      subtitle: 'Lossless Conversion',
      icon: <Cpu className="w-6 h-6 text-[#d8ee8e]" />,
      summary:
        'Instead of vulnerable central string inverters, each solar tile and module pair runs an individual Synapse Core microinverter.',
      details: [
        'Zero single points of failure: shade on one chimney never diminishes neighboring modules.',
        'Rapid 80V DC roof safety shutdown complying with NEC 2023 690.12 standards.',
        '97.8% round-trip conversion from photon absorption to AC distribution.',
      ],
      metric: '< 0.05% Failure Rate',
      telemetry: 'Individual module health monitored at 100 Hz',
    },
    {
      num: '03',
      title: 'Liquid-Cooled LFP Storage & Sub-Cycle Gateway',
      subtitle: '15ms Autonomous Islanding',
      icon: <BatteryCharging className="w-6 h-6 text-[#d8ee8e]" />,
      summary:
        'Cobalt-free Lithium Iron Phosphate (LiFePO4) storage units calibrated between 15 kWh and 60 kWh with automotive active thermal loops.',
      details: [
        '15 millisecond transfer switch: your clocks never reset and computers never reboot during a grid blackout.',
        'Sustained 10 kW continuous output capable of powering deep-well pumps, geothermal heating, and Level-2 EV charging simultaneously.',
        '10,000 full-depth cycle lifespan backed by an unconditional 15-year factory hardware warranty.',
      ],
      metric: '10,000 Cycle Life',
      telemetry: 'Battery core temperature held at 22°C nominal',
    },
    {
      num: '04',
      title: 'Virtual Power Plant (VPP) Wholesale Arbitrage',
      subtitle: 'Automated Bill Elimination',
      icon: <Network className="w-6 h-6 text-[#d8ee8e]" />,
      summary:
        'How does your bill stay at $0? When regional grids experience heat domes or sub-zero spikes, energy prices jump from $0.06 to $3.50/kWh.',
      details: [
        'The Synapse Controller safely discharges excess stored energy onto the regional high-voltage grid at peak pricing.',
        'Earns outsized credit balances that legally wipe out all base utility connection fees, meter fees, and winter heating draw.',
        'Protects the community grid from rolling brownouts while turning your rooftop into a revenue engine.',
      ],
      metric: '$3.50/kWh Peak Credit',
      telemetry: 'Autonomous bidding into ISO/RTO ancillary markets',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Activity className="w-4 h-4 text-[#d8ee8e]" />
            Engineering Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            How The <span className="text-[#d8ee8e]">Synapse Neural Controller</span> Operates
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Conventional solar systems are passive collectors that dump cheap electricity onto the grid and buy back expensive power at night.
            Synapse is an intelligent distributed microgrid that commands your home’s power flow every second.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                activeStep === idx
                  ? 'bg-white/10 border-[#d8ee8e] shadow-lg shadow-[#d8ee8e]/5'
                  : 'bg-white/[0.03] border-white/5 hover:border-white/20 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${activeStep === idx ? 'text-[#d8ee8e]' : 'text-slate-500'}`}>
                  STEP {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-current opacity-40" />
              </div>
              <div className={`text-sm font-medium line-clamp-1 ${activeStep === idx ? 'text-white' : 'text-slate-300'}`}>
                {step.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#d8ee8e]/10 border border-[#d8ee8e]/20 flex items-center justify-center">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#d8ee8e] uppercase tracking-wider block">
                    Step {steps[activeStep].num} • {steps[activeStep].subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-200 text-base leading-relaxed mb-6 font-normal">
                {steps[activeStep].summary}
              </p>

              <div className="space-y-3 mb-8">
                {steps[activeStep].details.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#d8ee8e]/10 text-[#d8ee8e] flex items-center justify-center flex-none mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300 leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-300">
                  <span className="text-slate-500">Benchmark: </span>
                  <span className="text-[#d8ee8e] font-semibold">{steps[activeStep].metric}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-400">
                  {steps[activeStep].telemetry}
                </div>
              </div>
            </div>

            {/* Right Interactive Diagram Simulation */}
            <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Synapse Neural Edge v4.8
                </span>
                <span>Sub-system telemetry</span>
              </div>

              {/* Dynamic Live telemetry display */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Solar Yield (Array DC)</span>
                  <span className="text-emerald-400 font-medium">14.62 kW [Optimal]</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Home Consumption</span>
                  <span className="text-sky-300 font-medium">2.84 kW [HVAC Low]</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Battery State of Charge</span>
                  <span className="text-[#d8ee8e] font-medium">94.2% [Liquid 22°C]</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Grid Interconnect Mode</span>
                  <span className="text-amber-400 font-medium">VPP Ready ($2.45/kWh export)</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between text-emerald-300">
                  <span>Net 30-Day True-Up Balance</span>
                  <span className="font-bold text-white">$0.00 (Guaranteed)</span>
                </div>
              </div>

              <div className="mt-5 text-[11px] text-slate-500 text-center font-mono">
                Encrypted with TLS 1.3 to local Synapse Gateway • Zero cloud dependency for islanding
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

