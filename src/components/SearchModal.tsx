/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct } = useStore();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inSub = p.subtitle.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inCat = p.categoryLabel.toLowerCase().includes(q);
      const inNotes =
        p.scentPyramid.top.some((n) => n.toLowerCase().includes(q)) ||
        p.scentPyramid.heart.some((n) => n.toLowerCase().includes(q)) ||
        p.scentPyramid.base.some((n) => n.toLowerCase().includes(q));

      return inTitle || inSub || inDesc || inCat || inNotes;
    });
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-[#0D0D0D] border border-[#2A2A2A] text-[#FAF8F5] shadow-2xl overflow-hidden mt-12">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#222222] flex items-center gap-3 bg-[#0A0A0A]">
          <Search className="w-5 h-5 text-[#B8975A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candles by note (rose, amber, bourbon, cedar) or vessel..."
            className="w-full bg-transparent text-sm sm:text-base text-[#FAF8F5] placeholder-[#666666] focus:outline-none"
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setQuery('');
            }}
            className="p-1 text-[#8A8A8A] hover:text-[#FAF8F5]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#7A7A7A] space-y-2">
              <p className="uppercase tracking-wider">Suggested Searches:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Obsidian Rose', 'Grande 3-Wick', 'Ambre Woods', 'Smoked Bourbon', 'Wood Wick', 'Gift Set'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] text-[#FAF8F5] text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8A8A8A]">
              No candle creations found for &ldquo;{query}&rdquo;. Try searching for notes like &ldquo;amber&rdquo;, &ldquo;cedar&rdquo;, or &ldquo;vanilla&rdquo;.
            </div>
          ) : (
            <div className="divide-y divide-[#1C1C1C]">
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigateToProduct(p.slug);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="py-3 first:pt-0 flex items-center justify-between gap-4 hover:bg-[#141414] p-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0] || '/images/products/fallback-candle.jpg'}
                      alt=""
                      className="w-12 h-14 object-cover border border-[#262626]"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== '/images/products/fallback-candle.jpg') {
                          target.src = '/images/products/fallback-candle.jpg';
                        }
                      }}
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B8975A]">
                        {p.categoryLabel} &middot; {p.scentFamily}
                      </span>
                      <h4 className="text-sm font-medium text-[#FAF8F5]">{p.title}</h4>
                      <p className="text-[11px] text-[#7A7A7A] line-clamp-1">{p.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <span className="font-mono text-xs tabular-nums text-[#FAF8F5]">${p.price}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8A8A8A]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
