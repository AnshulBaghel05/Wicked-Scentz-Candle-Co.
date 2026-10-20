/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp, Flame, Truck, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  category: 'care' | 'shipping' | 'ingredients';
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'care',
    question: 'How do I prevent candle tunneling on my first burn?',
    answer: 'Wax has a memory! The first time you light your Wicked Scentz candle, let it burn for 3 to 4 consecutive hours until the liquid wax pool reaches the outer edge of the ceramic vessel. This establishes the burn diameter and guarantees an even burn all the way down.'
  },
  {
    category: 'care',
    question: 'How do I care for crackling wooden wicks?',
    answer: 'Unlike cotton wicks, wooden wicks do not need scissors. Before every single relighting, simply use your fingers or a tissue to gently pinch off the charred brittle black ash at the top of the wick. Keep the wick trimmed to approximately 3/16 inch (4mm) for optimal flame size.'
  },
  {
    category: 'care',
    question: 'How do I repurpose the luxury ceramic tumbler after the candle is finished?',
    answer: 'When approximately 1/2 inch of wax remains at the bottom, stop burning. Pour boiling water into the vessel to melt remaining wax (it will float to the top and harden for easy removal). Wash with warm soapy water and use your heavy matte tumbler as a cocktail glass, pen holder, or succulent planter.'
  },
  {
    category: 'shipping',
    question: 'How does Local Studio Pickup work?',
    answer: 'Select "Local Studio Pickup" at checkout. Once placed, our team hand-packs your order at our Brooklyn atelier (144 Wickfield St, Studio B). Orders are usually ready within 2 hours. You will receive an SMS and email notification with your pickup barcode.'
  },
  {
    category: 'shipping',
    question: 'What is your shipping policy and delivery timeline?',
    answer: 'We offer Complimentary Standard Shipping on all US orders over $75. Standard shipping is a flat rate of $7.50 for smaller orders. We pack orders within 24 hours Monday through Friday using eco-conscious thermal protection.'
  },
  {
    category: 'shipping',
    question: 'What is your return and exchange policy?',
    answer: 'We want you to be completely intoxicated by your scent. We accept returns of unlit, undamaged creations within 30 days of receipt. Simply contact us with your order number for a prepaid return label.'
  },
  {
    category: 'ingredients',
    question: 'Are your candles and body care formulations non-toxic and vegan?',
    answer: 'Yes, 100%. All Wicked Scentz candles are poured with a proprietary blend of North American soy and coconut waxes with zero petroleum paraffin. Our fragrances are completely free of phthalates, parabens, carcinogens, and acute toxins [CONFIRM WITH CLIENT].'
  }
];

export const FAQPage: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'care' | 'shipping' | 'ingredients'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((f) => activeCategory === 'all' || f.category === activeCategory);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5]">
      {/* Header */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-b border-[#1A1A1A] text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
            Ritual Guidance & Care
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2 font-light">
            Everything you need to know regarding candle burn rituals, wood wick care, studio pickup, and formulation standards.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex justify-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Guidance' },
              { id: 'care', label: 'Candle Care & Ritual' },
              { id: 'shipping', label: 'Shipping & Studio Pickup' },
              { id: 'ingredients', label: 'Ingredients & Clean Standards' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all ${
                  activeCategory === tab.id
                    ? 'border-[#B8975A] text-[#B8975A] bg-[#141414]'
                    : 'border-[#222222] text-[#8A8A8A] hover:border-[#3E3E3E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#0E0E0E] border border-[#1E1E1E] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm sm:text-base font-serif text-[#FAF8F5]">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#B8975A] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8A8A8A] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#8A8A8A] leading-relaxed border-t border-[#181818] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {/* Still have questions */}
        <div className="p-8 bg-[#121212] border border-[#222222] text-center mt-12 space-y-3">
          <HelpCircle className="w-6 h-6 text-[#B8975A] mx-auto" />
          <h3 className="text-lg font-serif text-[#FAF8F5]">Have a custom question or event inquiry?</h3>
          <p className="text-xs text-[#8A8A8A] max-w-sm mx-auto">
            Our atelier specialists are available to guide you through scent selection, wedding gifting, or custom batch orders.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="mt-2 px-6 py-2.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.18em] font-medium"
          >
            Contact Atelier
          </button>
        </div>
      </div>
    </div>
  );
};
