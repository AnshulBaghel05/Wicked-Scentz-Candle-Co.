/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface CategoryTileItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  count: number;
}

const CATEGORY_TILES: CategoryTileItem[] = [
  {
    id: 'scented-candles',
    name: 'Scented Candles',
    subtitle: 'Crackling wood wicks & smoked accords',
    image: IMAGES.candleObsidianRose,
    count: 5
  },
  {
    id: 'luxury-3wick',
    name: 'Grande 3-Wick',
    subtitle: 'Architectural ceramic 100-hour vessels',
    image: IMAGES.candleGrande3Wick,
    count: 1
  },
  {
    id: 'wax-melts',
    name: 'Botanical Wax Melts',
    subtitle: 'Flame-free 24k gold leaf soy snap bars',
    image: IMAGES.waxMeltsBourbonSmoke,
    count: 2
  },
  {
    id: 'room-sprays',
    name: 'Atmosphere Mists',
    subtitle: 'Organic cane alcohol room sprays',
    image: IMAGES.roomSpraySantol,
    count: 2
  },
  {
    id: 'gift-sets',
    name: 'Gift Sets & Care',
    subtitle: 'Luxury boxed gifts & forged brass tools',
    image: IMAGES.candleGiftSetBox,
    count: 2
  }
];

export const CategoryTiles: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0E] border-b border-[#1A1A1A]">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
              Curated Mediums
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] tracking-tight">
              Five Expressions of Flame &amp; Fragrance
            </h2>
          </div>
          <button
            onClick={() => navigateToShop('all')}
            className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] hover:text-[#B8975A] transition-colors flex items-center gap-1 self-start md:self-auto"
          >
            <span>Explore All 12 Formulations</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5-Column Grid with 0-2px architectural corners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToShop(cat.id)}
              className="group cursor-pointer relative flex flex-col bg-[#141414] border border-[#222222] hover:border-[#B8975A]/60 transition-all duration-300 overflow-hidden"
            >
              {/* Category Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== '/images/products/fallback-candle.jpg') {
                      target.src = '/images/products/fallback-candle.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-3 right-3 text-[10px] font-mono tabular-nums text-[#8A8A8A] px-1.5 py-0.5 bg-black/70 border border-[#2E2E2E]">
                  {cat.count} items
                </span>
              </div>

              {/* Title & Gold Underline on Hover */}
              <div className="p-4 flex flex-col justify-between flex-1 bg-[#0F0F0F]">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#FAF8F5] group-hover:text-[#B8975A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#7A7A7A] mt-1 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-2 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8A8A8A] group-hover:text-[#FAF8F5] transition-colors flex items-center gap-1">
                    Shop Collection
                    <ArrowUpRight className="w-3 h-3 text-[#B8975A]" />
                  </span>
                  {/* Subtle 1px gold hairline that expands */}
                  <span className="h-[1px] w-6 bg-[#2E2E2E] group-hover:w-12 group-hover:bg-[#B8975A] transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
