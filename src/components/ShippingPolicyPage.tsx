/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, MapPin, RotateCcw, ShieldCheck, ArrowLeft } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  const { setCurrentPage, studioPickupAddress, studioPickupHours } = useStore();

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
            Client Care
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5]">
            Shipping &amp; Returns Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2 font-light">
            Transparent shipping rates, same-day Brooklyn studio pickup, and our 30-day satisfaction guarantee.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
        {/* Shipping Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-[#B8975A] text-sm uppercase tracking-wider font-semibold">
            <Truck className="w-4 h-4" />
            <h2>Domestic US Shipping</h2>
          </div>
          <p>
            Every Wicked Scentz candle is carefully wrapped in custom thermal-protective cushioning to prevent wax melting and vessel fracture during transit. We dispatch all orders Monday through Friday from our Brooklyn, New York atelier.
          </p>
          <div className="p-4 bg-[#111111] border border-[#222222] space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#1C1C1C]">
              <div>
                <p className="font-medium text-[#FAF8F5]">Orders $75.00 and above</p>
                <p className="text-[11px] text-[#7A7A7A]">Standard 2–4 Business Day Tracked Delivery</p>
              </div>
              <span className="font-mono text-[#B8975A] font-semibold text-sm">FREE</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-[#FAF8F5]">Orders under $75.00</p>
                <p className="text-[11px] text-[#7A7A7A]">Standard Flat Rate Delivery via USPS / UPS</p>
              </div>
              <span className="font-mono text-[#FAF8F5] text-sm">$7.50</span>
            </div>
          </div>
          <p className="text-[11px] text-[#8A8A8A]">
            *Orders are fulfilled within 24–48 hours of placement. You will receive an automated tracking link once your shipment leaves our facility.
          </p>
        </section>

        {/* Local Studio Pickup */}
        <section className="space-y-4 pt-6 border-t border-[#1C1C1C]">
          <div className="flex items-center gap-2.5 text-[#B8975A] text-sm uppercase tracking-wider font-semibold">
            <MapPin className="w-4 h-4" />
            <h2>Complimentary Local Studio Pickup</h2>
          </div>
          <p>
            Local customers in the New York metropolitan area may collect their orders directly from our Brooklyn studio with zero shipping fees.
          </p>
          <div className="p-5 bg-[#141414] border border-[#262626] space-y-2">
            <p className="font-medium text-[#FAF8F5]">Pickup Location:</p>
            <p className="text-xs text-[#B8975A] font-mono">{studioPickupAddress}</p>
            <p className="text-[11px] text-[#8A8A8A] pt-1">
              <strong>Turnaround Time:</strong> Orders are typically hand-packaged and ready for collection within <strong>2 hours</strong> during operating hours ({studioPickupHours}).
            </p>
            <p className="text-[11px] text-[#8A8A8A]">
              <strong>Instructions:</strong> Please bring your order confirmation email and a photo ID upon arrival. Ring the Studio B buzzer on the ground floor.
            </p>
          </div>
        </section>

        {/* Returns & Exchanges */}
        <section className="space-y-4 pt-6 border-t border-[#1C1C1C]">
          <div className="flex items-center gap-2.5 text-[#B8975A] text-sm uppercase tracking-wider font-semibold">
            <RotateCcw className="w-4 h-4" />
            <h2>30-Day Returns &amp; Exchanges</h2>
          </div>
          <p>
            We take tremendous pride in the olfactory quality and craftsmanship of our candles. If you are not completely enchanted by your unlit candle, we offer full returns or exchanges within 30 days of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#8A8A8A]">
            <li>Candles must be unlit, undamaged, and returned in their original packaging.</li>
            <li>Due to hygiene standards, body oils, lotions, and opened room sprays cannot be returned once the seal has been broken.</li>
            <li>If an item arrives damaged in transit, please send a photograph of the broken vessel to <span className="text-[#FAF8F5]">concierge@wickedscentz.com</span> within 48 hours for immediate replacement.</li>
          </ul>
        </section>

        {/* Safe Transit Guarantee */}
        <section className="p-5 bg-[#0E0E0E] border border-[#222222] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#FAF8F5]">Safe Arrival Guarantee</p>
            <p className="text-xs text-[#8A8A8A] mt-0.5">
              Every parcel is insured. If glass or ceramic breaks during transit, we replace your order immediately at zero cost to you.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
