/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const OurStoryPage: React.FC = () => {
  const { navigateToShop, setCurrentPage, studioPickupAddress } = useStore();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5]">
      {/* Hero Header */}
      <div className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-b border-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={IMAGES.heroCandle}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== '/images/hero/hero-wicked-candle.jpg') {
                target.src = '/images/hero/hero-wicked-candle.jpg';
              }
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-3">
            Origins &amp; Craftsmanship
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5] tracking-tight leading-tight">
            Sensual, Intoxicating &amp; Unapologetic.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#A0A0A0] font-light leading-relaxed">
            We build luxury candles and fragrances that linger in memory long after the flame is extinguished. Hand-poured in small batches in Brooklyn with crackling wooden wicks and complex botanical accords.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Narrative Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8975A]">The Rebellion Against the Ordinary</span>
            <h2 className="text-3xl font-serif text-[#FAF8F5] leading-snug">
              Why mass-market candles leave you wanting more.
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
              Mainstream candle houses cut corners with petroleum-derived paraffin wax, chemical stabilizers, and synthetic scents that produce immediate headaches. They charge triple-digit sums for mass-produced goods made on factory conveyor belts.
            </p>
            <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
              At Wicked Scentz, we took the opposite path. We pour every vessel by hand in small batches under 50 units. We use 100% natural soy and coconut waxes that burn slowly and cleanly, allowing high-concentration fragrance oils to blossom with true cold and hot throws.
            </p>
          </div>

          <div className="relative aspect-[4/5] border border-[#262626] overflow-hidden bg-[#141414]">
            <img
              src={IMAGES.candleStudioPouring}
              alt="Artisanal pouring process in Brooklyn studio"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== '/images/products/studio-pouring.jpg') {
                  target.src = '/images/products/studio-pouring.jpg';
                }
              }}
            />
          </div>
        </div>

        {/* The 3 Pillars of Wicked Scentz */}
        <div className="pt-10 border-t border-[#1C1C1C]">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8975A]">Formulation Standards</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] mt-1">
              Our Non-Negotiable Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] space-y-3">
              <Flame className="w-5 h-5 text-[#B8975A]" />
              <h4 className="text-sm font-medium uppercase tracking-wider text-[#FAF8F5]">FSC-Certified Cherry Wood Wicks</h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                Sustainably harvested in North America. Delivers a soft, soothing hearth crackle that releases zero toxic zinc or heavy metals.
              </p>
            </div>

            <div className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] space-y-3">
              <CheckCircle className="w-5 h-5 text-[#B8975A]" />
              <h4 className="text-sm font-medium uppercase tracking-wider text-[#FAF8F5]">100% Clean &amp; Vegan</h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                Every fragrance is blended with pure botanical waxes and certified phthalate-free fragrance oils. No parabens, no animal testing, ever.
              </p>
            </div>

            <div className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] space-y-3">
              <Sparkles className="w-5 h-5 text-[#B8975A]" />
              <h4 className="text-sm font-medium uppercase tracking-wider text-[#FAF8F5]">Reusable Ceramic Vessels</h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                Once burned, each weighted ceramic tumbler transforms into an espresso tumbler, brush holder, or succulent planter for your home.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier & Pickup CTA */}
        <div className="p-8 sm:p-12 bg-[#121212] border border-[#242424] text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A]">Studio Visits &amp; Pickup</span>
          <h3 className="text-3xl font-serif text-[#FAF8F5]">Visit Our Brooklyn Atelier</h3>
          <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-lg mx-auto">
            Located at {studioPickupAddress}. Experience our raw scent accords, observe test burns in progress, or collect your online order in person.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigateToShop('all')}
              className="px-8 py-3.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-medium"
            >
              Shop The Candle Collection
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] text-xs uppercase tracking-[0.2em] text-[#FAF8F5]"
            >
              Studio Directions &amp; Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
