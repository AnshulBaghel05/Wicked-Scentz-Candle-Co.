/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const Hero: React.FC = () => {
  const { navigateToShop, setIsScentQuizOpen } = useStore();

  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroCandle}
          alt="Atmospheric burning Wicked Scentz candle with wooden wick flame"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 animate-in fade-in duration-1000"
          loading="eager"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== '/images/hero/hero-wicked-candle.jpg') {
              target.src = '/images/hero/hero-wicked-candle.jpg';
            }
          }}
        />
        {/* Measured dark luxury scrim ensuring > 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        {/* Unboxed Kicker */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B8975A] font-medium mb-4">
          <span>Artisanal Small-Batch Fragrance</span>
          <span aria-hidden="true">&middot;</span>
          <span>Brooklyn Atelier</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#FAF8F5] tracking-tight leading-[1.05] max-w-4xl text-balance">
          Light Something Wicked.
        </h1>

        {/* Single-line Balanced Subhead */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#CCCCCC] font-light max-w-2xl text-balance leading-relaxed">
          Hand-poured in micro-batches with crackling cherry wooden wicks, 100% pure coconut-soy wax, and unapologetic dark accords.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigateToShop('all')}
            className="w-full sm:w-auto px-8 py-4 bg-[#B8975A] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 group"
          >
            <span>Shop The Candle Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsScentQuizOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-black/60 hover:bg-black/90 text-[#FAF8F5] hover:text-[#B8975A] border border-[#3E3E3E] hover:border-[#B8975A] text-xs uppercase tracking-[0.2em] transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#B8975A]" />
            <span>Find Your Scent Match</span>
          </button>
        </div>

        {/* Quiet Trust Points below CTA */}
        <div className="mt-14 pt-8 border-t border-white/10 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">100% Soy Wax</p>
            <p className="text-[11px] text-[#8A8A8A] mt-0.5">Zero toxic paraffin</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">FSC Wood Wicks</p>
            <p className="text-[11px] text-[#8A8A8A] mt-0.5">Gentle hearth crackle</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">65+ Hr Burn</p>
            <p className="text-[11px] text-[#8A8A8A] mt-0.5">Even slow melt pool</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Studio Pickup</p>
            <p className="text-[11px] text-[#8A8A8A] mt-0.5">Ready in 2 hrs</p>
          </div>
        </div>
      </div>
    </section>
  );
};
