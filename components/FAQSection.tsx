'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is a guaranteed $0 electricity bill legally possible under NEM 3.0 and fixed grid charges?',
      a: 'Under NEM 3.0 and modern time-of-use (TOU) tariffs, utilities slash the value of daytime solar exports to ~$0.05/kWh while charging upwards of $0.65/kWh during evening peak hours. Synapse eliminates this vulnerability entirely. The Neural Edge Controller stores 100% of your daytime solar in the Synapse Vault battery, completely powering your home through expensive peak hours. Furthermore, during regional grid stress events, Synapse dispatches high-value power through our Virtual Power Plant (VPP) network at rates up to $3.50/kWh. These credits automatically offset all baseline meter and connection charges, keeping your net invoice at $0.00.',
    },
    {
      q: 'What happens during prolonged winter snowstorms or heavy morning fog?',
      a: 'Synapse systems are engineered specifically for cold and variable micro-climates. Our N-Type TOPCon modules feature bifacial rear glass, allowing them to absorb ambient ground-scattered albedo light reflected off snow and fog even when the top surface is partially covered. Additionally, the Synapse Controller monitors weather satellite feeds 48 hours in advance: when a major blizzard or prolonged storm front is detected, it pre-charges your battery bank to 100% capacity from clean energy and puts non-critical circuits into conservation mode.',
    },
    {
      q: 'What is the performance bond, and how does the true-up reimbursement work?',
      a: 'Every Synapse Roof agreement includes an independently underwritten surety covenant backed by institutional partners including Lloyd’s of London and Munich Re. We connect directly to your utility portal via secure API. If your annual reconciliation statement indicates any net balance above $0.00 USD, our liquidity escrow automatically issues a direct ACH reimbursement to your bank account within 14 business days—no deductibles, no complicated claim paperwork.',
    },
    {
      q: 'Does Synapse Roof replace my existing roof or install over it?',
      a: 'We offer two architectural implementations. For homes with intact existing roofs (metal standing seam, slate, architectural tile, or composite shingle), our Architectural Flush-Mount brackets sit just 1.2 inches above the decking with patented dual-flashing watertight seals. For new construction or roof replacements, we offer the Synapse Integrated Solar Tile, which functions as the primary weather-tight roof membrane with Class A fire rating and Class 4 hail certification.',
    },
    {
      q: 'What happens if I sell my home before the 7-year guarantee period ends?',
      a: 'The 7-Year Zero-Bill Guarantee and the remaining term of the 25-year hardware and waterproofing warranties are 100% transferable to the new homeowner with zero transfer fees or administrative penalties. Independent appraisals show that guaranteed $0 energy operating costs increase residential property value by 4.2% to 6.8% over comparable market listings.',
    },
    {
      q: 'Why does Synapse use Lithium Iron Phosphate (LFP) instead of standard lithium-ion?',
      a: 'Conventional home batteries (NMC / Nickel Manganese Cobalt) are chemically volatile, degrade rapidly when charged to 100%, and pose thermal runaway fire risks. Synapse Vault uses commercial-grade Lithium Iron Phosphate (LiFePO4) with active closed-loop liquid glycol thermal regulation. LFP is non-combustible, contains zero cobalt, operates safely from -20°F to 135°F, and is rated for over 10,000 full daily cycles—more than 27 years of daily operation.',
    },
  ];

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b1426] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <HelpCircle className="w-4 h-4 text-[#d8ee8e]" />
            Frequently Answered Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6">
            Clear Answers. <span className="text-[#d8ee8e]">Zero Ambiguity.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Everything you need to know about our legal guarantee, equipment durability, and financial protection.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-medium text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-none transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#d8ee8e]/20 text-[#d8ee8e]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

