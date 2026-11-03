'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import StickyNavbar from '@/components/StickyNavbar';
import GuaranteeSection from '@/components/GuaranteeSection';
import HowItWorks from '@/components/HowItWorks';
import TechArchitecture from '@/components/TechArchitecture';
import SavingsCalculator from '@/components/SavingsCalculator';
import CaseStudies from '@/components/CaseStudies';
import SpecsSection from '@/components/SpecsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<any>(null);

  const handleOpenQuote = (data?: any) => {
    if (data) {
      setQuotePrefill(data);
    }
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0b1426] text-[#f3f5f9] relative">
      {/* Floating Sticky Navigation when scrolled */}
      <StickyNavbar onOpenQuote={() => handleOpenQuote()} />

      {/* Interactive Morning/Night Hero with raw WebGL2 fog & house sink-rise */}
      <Hero onOpenQuote={() => handleOpenQuote()} />

      {/* 7-Year Zero-Bill Guarantee Deep Dive */}
      <GuaranteeSection />

      {/* How The Neural Controller Works */}
      <HowItWorks />

      {/* Hardware & Engineering Architecture */}
      <TechArchitecture />

      {/* Interactive 7-Year Savings & ROI Calculator */}
      <SavingsCalculator onOpenQuote={(data) => handleOpenQuote(data)} />

      {/* Verified Real-World Case Studies */}
      <CaseStudies />

      {/* Full Technical Specifications & Warranties */}
      <SpecsSection />

      {/* Frequently Answered Questions */}
      <FAQSection />

      {/* Accreditations & Footer */}
      <Footer />

      {/* Interactive Instant Quote / Architectural Reservation Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialData={quotePrefill}
      />
    </main>
  );
}

