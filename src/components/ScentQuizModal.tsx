/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, Product } from '../data/products';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  sub: string;
  options: {
    label: string;
    description: string;
    categoryMatch?: string;
    familyMatch?: string;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'What atmosphere do you wish to command?',
    sub: 'Select the sensory energy of the space you are curating.',
    options: [
      { label: 'Seductive & Twilight', description: 'Dark velvet damask rose, magnetic amber, and evening embers.', familyMatch: 'Dark Velvet & Rose' },
      { label: 'Smoky Fireside', description: 'Birch tar, charred cedarwood, and quiet contemplation.', familyMatch: 'Sensual & Smoky' },
      { label: 'Warm & Decadent', description: 'Bourbon barrels, melted amber resin, and toasted tonka bean.', familyMatch: 'Warm Gourmand' },
      { label: 'Meditative Sanctuary', description: 'Cooling white sage, wild eucalyptus, and clean cashmere.', familyMatch: 'Crisp & Clean' }
    ]
  },
  {
    question: 'How do you prefer to experience fragrance?',
    sub: 'Choose your desired ritual format.',
    options: [
      { label: 'Fireside Candlelight', description: 'Crackling FSC cherry wood wick with slow 65+ hour burn.', categoryMatch: 'scented-candles' },
      { label: 'Grande 3-Wick Basin', description: 'Room-filling hearth candle in architectural ceramic.', categoryMatch: 'luxury-3wick' },
      { label: 'Flame-Free Soy Wax Melts', description: 'Artisanal breakable snap bars studded with 24k gold leaf.', categoryMatch: 'wax-melts' },
      { label: 'Instant Atmosphere Mist', description: 'Organic cane alcohol room and linen spray.', categoryMatch: 'room-sprays' }
    ]
  }
];

export const ScentQuizModal: React.FC = () => {
  const { isScentQuizOpen, setIsScentQuizOpen, addToCart, navigateToProduct } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFamily, setSelectedFamily] = useState<string>('Dark Velvet & Rose');
  const [selectedCategory, setSelectedCategory] = useState<string>('scented-candles');
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  if (!isScentQuizOpen) return null;

  const handleSelectOption = (opt: QuizQuestion['options'][0]) => {
    if (opt.familyMatch) setSelectedFamily(opt.familyMatch);
    if (opt.categoryMatch) setSelectedCategory(opt.categoryMatch);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Find matching product
      const familyTarget = opt.familyMatch || selectedFamily;
      const categoryTarget = opt.categoryMatch || selectedCategory;

      let match = PRODUCTS.find((p) => p.category === categoryTarget && p.scentFamily === familyTarget);
      if (!match) {
        match = PRODUCTS.find((p) => p.scentFamily === familyTarget) || PRODUCTS[0];
      }
      setRecommendedProduct(match);
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setRecommendedProduct(null);
  };

  const handleClose = () => {
    setIsScentQuizOpen(false);
    handleReset();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#0D0D0D] border border-[#2E2E2E] text-[#FAF8F5] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#8A8A8A] hover:text-[#FAF8F5]"
          aria-label="Close scent quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {recommendedProduct ? (
          /* Recommendation Result */
          <div className="text-center space-y-6 pt-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Your Tailored Scent Match
            </span>

            <h2 className="text-3xl font-serif text-[#FAF8F5]">
              {recommendedProduct.title}
            </h2>

            <div className="relative aspect-[4/5] max-w-xs mx-auto overflow-hidden border border-[#2A2A2A] bg-[#141414]">
              <img
                src={recommendedProduct.images[0] || '/images/products/fallback-candle.jpg'}
                alt={recommendedProduct.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== '/images/products/fallback-candle.jpg') {
                    target.src = '/images/products/fallback-candle.jpg';
                  }
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
              &ldquo;{recommendedProduct.scentPyramid.description}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  addToCart(recommendedProduct);
                  handleClose();
                }}
                className="px-6 py-3.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Add Match to Bag &middot; ${recommendedProduct.price}
              </button>
              <button
                onClick={() => {
                  handleClose();
                  navigateToProduct(recommendedProduct.slug);
                }}
                className="px-6 py-3.5 bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] text-xs uppercase tracking-[0.2em] text-[#FAF8F5]"
              >
                View Scent Details
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-[#8A8A8A] hover:text-[#B8975A] flex items-center gap-1.5 mx-auto pt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Scent Quiz</span>
            </button>
          </div>
        ) : (
          /* Question View */
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between text-xs text-[#8A8A8A] border-b border-[#1F1F1F] pb-3">
              <span className="uppercase tracking-[0.2em] text-[#B8975A]">Scent Match Quiz</span>
              <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-[#FAF8F5]">
                {QUESTIONS[currentStep].question}
              </h3>
              <p className="text-xs text-[#8A8A8A] mt-1 font-light">
                {QUESTIONS[currentStep].sub}
              </p>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full p-4 bg-[#141414] hover:bg-[#1A1A1A] border border-[#242424] hover:border-[#B8975A] text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-sm font-medium text-[#FAF8F5] group-hover:text-[#B8975A] transition-colors">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">{opt.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#444444] group-hover:text-[#B8975A] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
