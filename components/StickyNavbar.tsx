'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface StickyNavbarProps {
  onOpenQuote: () => void;
}

export default function StickyNavbar({ onOpenQuote }: StickyNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 pointer-events-none ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between shadow-2xl pointer-events-auto border border-white/10">
        <a href="#" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo size={28} wordmarkClassName="text-lg text-white" sunColor="#d8ee8e" />
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#guarantee" className="hover:text-white transition-colors">
            Zero-Bill Guarantee
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            Calculator
          </a>
          <a href="#cases" className="hover:text-white transition-colors">
            Cases
          </a>
          <a href="#specs" className="hover:text-white transition-colors">
            Specs
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            7-Year $0 Bill Bonded
          </div>
          <button
            onClick={onOpenQuote}
            className="px-4 py-2 rounded-full bg-[#d8ee8e] hover:bg-[#c6df77] text-[#0b1426] text-xs font-semibold tracking-tight transition-all transform hover:scale-[1.02] shadow-sm"
          >
            Get Instant Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

