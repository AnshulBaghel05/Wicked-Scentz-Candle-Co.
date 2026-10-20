/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from './Hero';
import { CategoryTiles } from './CategoryTiles';
import { BrandStory } from './BrandStory';
import { ScentMoodBlock } from './ScentMoodBlock';
import { ReviewsProof } from './ReviewsProof';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateToShop } = useStore();

  const bestSellers = PRODUCTS.filter((p) => p.bestseller || p.featured).slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Full-Bleed Dark Campaign Hero */}
      <Hero />

      {/* 2. 5 Curated Candle & Home Fragrance Category Tiles */}
      <CategoryTiles />

      {/* 3. Featured Bestsellers Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-[#1A1A1A]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
                Atelier Bestsellers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] tracking-tight">
                Our Most Coveted Pours
              </h2>
            </div>

            <button
              onClick={() => navigateToShop('all')}
              className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] hover:text-[#B8975A] transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Explore All 12 Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Story Split Section */}
      <BrandStory />

      {/* 5. Olfactory Scent Mood Block */}
      <ScentMoodBlock />

      {/* 6. Customer Reviews & Social Proof */}
      <ReviewsProof />
    </div>
  );
};
