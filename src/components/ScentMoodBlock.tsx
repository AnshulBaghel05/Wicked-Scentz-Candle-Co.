/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface MoodOption {
  id: string;
  family: 'Sensual & Smoky' | 'Dark Velvet & Rose' | 'Warm Gourmand' | 'Crisp & Clean';
  title: string;
  tagline: string;
  notes: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'mood-dark-rose',
    family: 'Dark Velvet & Rose',
    title: 'Seductive Dusk',
    tagline: 'Velvety crimson petals, smoked cedar, and hypnotic sillage.',
    notes: 'Damask Rose · Oud · Blackcurrant · Amber'
  },
  {
    id: 'mood-smoky',
    family: 'Sensual & Smoky',
    title: 'Hearth & Midnight',
    tagline: 'Crackling embers, birch tar, and quiet contemplative smoke.',
    notes: 'Smoked Cypress · Birch Tar · Bergamot · Leather'
  },
  {
    id: 'mood-gourmand',
    family: 'Warm Gourmand',
    title: 'Decadent Amber',
    tagline: 'Melted golden resins, toasted tonka, and aged whiskey warmth.',
    notes: 'Bourbon · Roasted Tonka · Almond · Vanilla'
  },
  {
    id: 'mood-crisp',
    family: 'Crisp & Clean',
    title: 'Meditative Sanctuary',
    tagline: 'Purifying wild herbs, cooling eucalyptus, and soft cashmere.',
    notes: 'White Sage · Eucalyptus · Spun Cashmere'
  }
];

export const ScentMoodBlock: React.FC = () => {
  const { navigateToShop } = useStore();
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);

  const activeMood = MOODS[activeMoodIndex];
  const matchingProducts = PRODUCTS.filter((p) => p.scentFamily === activeMood.family);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-b border-[#1A1A1A]">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
            Olfactory Mood Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] tracking-tight">
            Curate The Atmosphere You Desire
          </h2>
          <p className="text-sm text-[#8A8A8A] mt-3 font-light">
            Every fragrance triggers a distinct emotional cadence. Select a state of mind to discover its corresponding candle ritual.
          </p>
        </div>

        {/* Mood Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {MOODS.map((mood, idx) => {
            const isActive = idx === activeMoodIndex;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMoodIndex(idx)}
                className={`p-5 text-left border transition-all ${
                  isActive
                    ? 'bg-[#171717] border-[#B8975A] shadow-lg'
                    : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-[#B8975A]' : 'text-[#666666]'}`}>
                    Mood 0{idx + 1}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />}
                </div>
                <h3 className="text-base font-serif text-[#FAF8F5] mb-1">
                  {mood.title}
                </h3>
                <p className="text-xs text-[#8A8A8A] line-clamp-2 font-light">
                  {mood.tagline}
                </p>
                <p className="text-[10px] font-mono text-[#B8975A]/80 mt-3 pt-2 border-t border-[#222222] truncate">
                  {mood.notes}
                </p>
              </button>
            );
          })}
        </div>

        {/* Matching Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All in Mood */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateToShop('all')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FAF8F5] hover:text-[#B8975A] border-b border-[#B8975A] pb-1 transition-colors"
          >
            <span>Explore All {activeMood.family} Formulations</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8975A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
