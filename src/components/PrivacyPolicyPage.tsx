/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2 font-light">
            Last updated: October 2026. How Wicked Scentz Candle Co. protects your personal and payment data.
          </p>
        </div>
      </div>

      {/* Policy Text */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">1. Information We Collect</h2>
          <p>
            When you purchase candles or join our Inner Circle newsletter, we collect personal information you provide to us, including your name, shipping address, email address, phone number, and payment preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">2. Payment Processing &amp; Security</h2>
          <p>
            We do not store complete payment card numbers on our servers. All transactions are securely tokenized and processed through PCI-DSS Level 1 certified payment gateways (Shopify Payments, Shop Pay, Apple Pay, Google Pay, and Stripe).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">3. How We Use Your Data</h2>
          <p>
            We use your information exclusively to fulfill your orders, provide tracking and studio pickup alerts, and, if opted in, send occasional private batch notices. We will never sell, rent, or trade your personal information to third-party data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-serif text-[#FAF8F5]">4. Contact Our Privacy Officer</h2>
          <p>
            For questions regarding your data or to request data deletion, contact our privacy concierge at <span className="text-[#B8975A]">privacy@wickedscentz.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
