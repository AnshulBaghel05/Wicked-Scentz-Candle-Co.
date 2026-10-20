/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, CheckCircle, Flame, Clock, Truck, Award } from 'lucide-react';

const FEATURED_REVIEWS = [
  {
    author: 'Elena V.',
    location: 'Brooklyn, NY',
    productTitle: 'Obsidian & Smoked Rose Candle',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    quote: 'This is not your standard floral candle. The hearth smoke and dark amber give it an intoxicating gothic quality that fills our entire loft within twenty minutes. The wooden wick crackle is pure ASMR.'
  },
  {
    author: 'Julian R.',
    location: 'SoHo, NY',
    productTitle: 'Avalon Grande 3-Wick Hearth Candle',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    quote: 'The three wooden wicks produce a wide, even wax pool that puts out fragrance for hours. It commands the room and looks like a bespoke piece of modern ceramic sculpture.'
  },
  {
    author: 'Claire B.',
    location: 'Manhattan, NY',
    productTitle: 'The Nocturne Candle & Trimmer Gift Set',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    quote: 'The gift presentation in the embossed black box with the solid brass trimmer is unmatched. Gave this for a housewarming and they were blown away by the craftsmanship.'
  }
];

export const ReviewsProof: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
              Customer Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] tracking-tight">
              Revered by Discerning Scent Collectors
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#111111] border border-[#222222] px-4 py-2.5">
            <div className="flex items-center text-[#B8975A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-mono text-[#FAF8F5]">4.94 / 5.0</span>
            <span className="text-xs text-[#8A8A8A]">based on 420+ verified burns</span>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#B8975A]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#666666]">{rev.date}</span>
                </div>

                <p className="text-sm text-[#CCCCCC] font-serif italic leading-relaxed mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-3 h-3 text-[#B8975A]" />
                    </h4>
                    <span className="text-[11px] text-[#7A7A7A]">{rev.location}</span>
                  </div>
                  <span className="text-[10px] text-[#8A8A8A] border-b border-[#2A2A2A] pb-0.5">
                    {rev.productTitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Trust Badges Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#1A1A1A]">
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">100% Pure Soy Wax</h4>
              <p className="text-[11px] text-[#7A7A7A] mt-0.5">Non-toxic botanical blend, clean burning and cruelty-free.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">2-Hour Studio Pickup</h4>
              <p className="text-[11px] text-[#7A7A7A] mt-0.5">Hand-packaged at our Brooklyn atelier, ready in 2 hours.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Free Shipping Over $75</h4>
              <p className="text-[11px] text-[#7A7A7A] mt-0.5">Carefully wrapped in luxury protective gift packaging.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Small-Batch Poured</h4>
              <p className="text-[11px] text-[#7A7A7A] mt-0.5">Poured in micro-batches under 50 units for quality control.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
