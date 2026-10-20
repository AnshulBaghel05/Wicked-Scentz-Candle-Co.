/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const BrandStory: React.FC = () => {
  const { setCurrentPage, studioPickupAddress } = useStore();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with architectural border */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] overflow-hidden border border-[#262626]">
            <img
              src={IMAGES.candleStudioPouring}
              alt="Artisanal hand-pouring molten soy wax in Brooklyn candle studio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== '/images/products/studio-pouring.jpg') {
                  target.src = '/images/products/studio-pouring.jpg';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Studio Badge in bottom corner */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#2E2E2E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B8975A]" />
                <span className="text-xs text-[#FAF8F5] tracking-wide font-medium">Brooklyn Studio &amp; Atelier</span>
              </div>
              <span className="text-[11px] font-mono text-[#8A8A8A]">Est. 2024</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Values */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block">
            The Philosophy of The Dark Luxe
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] tracking-tight leading-[1.15]">
            Born from a desire to escape powdery clichés.
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light">
            Wicked Scentz was created for those who gravitate towards dusk, hearth smoke, blackened florals, and aged amber resin. We reject mass-market synthetic paraffin and artificial vanilla candles that trigger headaches.
          </p>

          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light">
            Every batch is measured, mixed, and hand-poured in our Brooklyn workshop. We test every formulation across 40+ hours of continuous test burns to guarantee full scent throw, an even melt pool, and clean combustion.
          </p>

          {/* 3 Pillars */}
          <div className="pt-4 space-y-4 border-t border-[#1F1F1F]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B8975A] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">100% Coconut-Soy Wax Blend</h4>
                <p className="text-xs text-[#7A7A7A] mt-0.5">Zero petroleum paraffin. Clean, low-temperature burn that releases pure fragrance oils without sooting.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B8975A] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">FSC-Certified Cherry Wood Wicks</h4>
                <p className="text-xs text-[#7A7A7A] mt-0.5">Sustainably harvested wood wicks providing an authentic fireside crackle and wide, soot-free melt pool.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B8975A] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Local Studio Pickup in Brooklyn</h4>
                <p className="text-xs text-[#7A7A7A] mt-0.5">Order online and pick up at our atelier ({studioPickupAddress}) within two hours.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FAF8F5] hover:text-[#B8975A] pb-1 border-b border-[#B8975A]/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
              <span>Read Our Full Story &amp; Studio Tour</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
