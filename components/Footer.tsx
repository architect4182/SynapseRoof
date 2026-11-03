'use client';

import React from 'react';
import Logo from './Logo';
import { ShieldCheck, Zap, Award, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070d19] border-t border-white/10 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/5">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block">
              <Logo size={32} wordmarkClassName="text-xl text-white" sunColor="#d8ee8e" />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Synapse Roof is an autonomous architectural energy utility for modern residences.
              Combining high-efficiency TOPCon solar hardware, liquid-cooled LFP storage, and neural edge forecasting to guarantee $0 electricity bills for seven years.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Surety Escrow Active • Lloyd’s Underwritten</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">Technology</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Neural Controller</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Hardware Architecture</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Full Technical Datasheet</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Liquid-Cooled Vault</a></li>
            </ul>
          </div>

          {/* Guarantee & Economics */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">Guarantee & Proof</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#guarantee" className="hover:text-white transition-colors">7-Year Zero-Bill Guarantee</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Economics Calculator</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">Verified Customer Audits</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Answered Questions</a></li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">Accreditations</div>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#d8ee8e]" /> UL 9540 Safety</div>
              <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#d8ee8e]" /> IEEE 1547-2018</div>
              <div className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#d8ee8e]" /> NABCEP Certified</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#d8ee8e]" /> ASTM D3161 Wind</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Synapse Technologies Inc. All rights reserved. Synapse Roof™ and Synapse Vault™ are trademarks.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Warranty</a>
            <a href="#" className="hover:text-slate-300">Escrow Documentation</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors ml-2"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

