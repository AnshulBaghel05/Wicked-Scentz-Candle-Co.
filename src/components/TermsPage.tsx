/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5]">
      {/* Header */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-b border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs text-[#8A8A8A] hover:text-[#FAF8F5] flex items-center gap-1.5 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
            Legal &amp; Trust
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5]">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2 font-light">
            Last updated: October 2026. Terms governing the purchase and safe burning of our hand-poured creations.
          </p>
        </div>
      </div>

      {/* Terms Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
        {/* Candle Burning Safety Agreement */}
        <section className="p-5 bg-[#14120D] border border-[#B8975A]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#B8975A] font-semibold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <h3>Candle Burning Safety Agreement</h3>
          </div>
          <p className="text-xs text-[#CCCCCC]">
            By purchasing and lighting a candle from Wicked Scentz Candle Co., you acknowledge that an open flame carries inherent risk. Customers agree to always trim wicks to 3/16 inch, burn only on heat-resistant surfaces, never leave a burning candle unattended, keep out of reach of children and pets, and extinguish the flame when 1/2 inch of wax remains.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">1. General Terms</h2>
          <p>
            By visiting our site or purchasing goods from Wicked Scentz Candle Co., you engage in our &quot;Service&quot; and agree to be bound by the following terms and conditions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">2. Product Descriptions &amp; Small Batches</h2>
          <p>
            Our creations are hand-poured in micro-batches in Brooklyn, NY. Due to the artisanal nature of small-batch pouring with natural coconut-soy waxes, minor surface variations, frosting, or slight color shifts are natural characteristics of botanical wax and do not affect scent throw.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">3. Pricing &amp; Modifications</h2>
          <p>
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any seasonal pouring without liability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">4. Governing Law</h2>
          <p>
            These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of the State of New York.
          </p>
        </section>
      </div>
    </div>
  );
};
