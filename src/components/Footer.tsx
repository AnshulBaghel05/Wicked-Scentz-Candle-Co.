/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Flame, ArrowRight, Check, MapPin, Clock } from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, studioPickupAddress, studioPickupHours, showToast, applyDiscountCode } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    applyDiscountCode('WICKED15');
    showToast('Welcome to The Inner Circle. Code WICKED15 applied for 15% off.');
  };

  const navTo = (page: PageView, category?: string) => {
    if (category) setSelectedCategory(category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] text-[#8A8A8A] text-xs">
      {/* Newsletter Incentive Banner */}
      <div className="border-b border-[#1A1A1A] py-14 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
              The Inner Circle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight mb-2">
              Receive 15% off your first candle ritual and seasonal pour notices.
            </h2>
            <p className="text-sm text-[#8A8A8A] max-w-xl font-light">
              Subscribers receive private early access to small-batch pourings, limited holiday releases, and studio events. Never spam, only scent.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 border border-[#B8975A]/40 bg-[#141414] text-[#FAF8F5] flex items-center gap-3">
                <Check className="w-4 h-4 text-[#B8975A] shrink-0" />
                <div>
                  <p className="text-xs font-medium text-[#B8975A]">Welcome to The Inner Circle</p>
                  <p className="text-xs text-[#FAF8F5]">Use promo code <span className="font-mono text-[#B8975A] font-semibold">WICKED15</span> at checkout for 15% off.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#FAF8F5] text-xs placeholder-[#5A5A5A] focus:outline-none focus:border-[#B8975A] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B8975A] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#5A5A5A] mt-2">
              By subscribing, you agree to receive sensory communications. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Studio Info */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Studio Location */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif tracking-[0.18em] uppercase text-[#FAF8F5]">
              WICKED SCENTZ
            </span>
          </div>
          <p className="text-xs text-[#8A8A8A] leading-relaxed max-w-sm">
            Hand-poured luxury scented candles and home fragrances. Formulated in micro-batches with crackling FSC-certified cherry wood wicks, 100% soy-coconut wax, and complex dark accords.
          </p>

          <div className="pt-2 border-t border-[#1A1A1A] space-y-1">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#FAF8F5] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B8975A]" />
              Brooklyn Atelier &amp; Studio Pickup:
            </p>
            <p className="text-xs text-[#8A8A8A]">{studioPickupAddress}</p>
            <p className="text-[11px] text-[#666666] flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3 h-3 text-[#B8975A]" />
              {studioPickupHours}
            </p>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium">Collections</p>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navTo('shop', 'all')} className="hover:text-[#FAF8F5] transition-colors">
                Shop All Fragrances
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shop', 'scented-candles')} className="hover:text-[#FAF8F5] transition-colors">
                Scented Candles
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shop', 'luxury-3wick')} className="hover:text-[#FAF8F5] transition-colors">
                Grande 3-Wick Vessels
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shop', 'wax-melts')} className="hover:text-[#FAF8F5] transition-colors">
                Botanical Soy Wax Melts
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shop', 'room-sprays')} className="hover:text-[#FAF8F5] transition-colors">
                Atmosphere Room Mists
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shop', 'gift-sets')} className="hover:text-[#FAF8F5] transition-colors">
                Gift Sets &amp; Care Tools
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium">Customer Care</p>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navTo('faq')} className="hover:text-[#FAF8F5] transition-colors">
                Candle Care Ritual &amp; FAQ
              </button>
            </li>
            <li>
              <button onClick={() => navTo('contact')} className="hover:text-[#FAF8F5] transition-colors">
                Local Studio Pickup Info
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shipping-policy')} className="hover:text-[#FAF8F5] transition-colors">
                Shipping &amp; Delivery Policy
              </button>
            </li>
            <li>
              <button onClick={() => navTo('shipping-policy')} className="hover:text-[#FAF8F5] transition-colors">
                Returns &amp; Exchanges
              </button>
            </li>
            <li>
              <button onClick={() => navTo('privacy-policy')} className="hover:text-[#FAF8F5] transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => navTo('terms')} className="hover:text-[#FAF8F5] transition-colors">
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        {/* Atelier Craft & Standards */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium">Atelier Standards</p>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Flame className="w-3.5 h-3.5 text-[#B8975A] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FAF8F5] font-medium">100% Non-Toxic &amp; Clean Wax</p>
                <p className="text-[11px] text-[#7A7A7A]">Natural coconut-soy wax, zero petroleum paraffin.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8975A] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FAF8F5] font-medium">Secure Encrypted Checkout</p>
                <p className="text-[11px] text-[#7A7A7A]">Shop Pay, Apple Pay, Google Pay, and major cards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-[#1A1A1A] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5A5A5A]">
          <p>&copy; {new Date().getFullYear()} Wicked Scentz Candle Co. Handcrafted in Brooklyn, New York. All rights reserved.</p>
          
          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Shop Pay</span>
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Apple Pay</span>
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Google Pay</span>
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Visa</span>
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Mastercard</span>
            <span className="px-2 py-0.5 border border-[#222222] text-[#8A8A8A] font-mono text-[10px]">Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
