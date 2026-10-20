/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES, SCENT_FAMILIES, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const [selectedFamily, setSelectedFamily] = useState<string>('All Families');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Active Category details
  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Scent family filter
      if (selectedFamily !== 'All Families' && product.scentFamily !== selectedFamily) {
        return false;
      }
      // Price range
      if (priceRange === 'under-35' && product.price >= 35) return false;
      if (priceRange === '35-50' && (product.price < 35 || product.price > 50)) return false;
      if (priceRange === 'over-50' && product.price <= 50) return false;
      // In stock
      if (inStockOnly) {
        const hasStock = product.variants.some((v) => v.inStock && v.stockCount > 0);
        if (!hasStock) return false;
      }
      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      // default: featured / bestsellers first
      return ((b.bestseller || b.featured) ? 1 : 0) - ((a.bestseller || a.featured) ? 1 : 0);
    });
  }, [selectedCategory, selectedFamily, priceRange, inStockOnly, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedFamily !== 'All Families' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedFamily('All Families');
    setPriceRange('all');
    setInStockOnly(false);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5]">
      {/* Category Header Hero */}
      <div className="border-b border-[#1F1F1F] bg-[#0E0E0E] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
              The Candle &amp; Home Fragrance Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] tracking-tight">
              {activeCategoryObj.label}
            </h1>
            <p className="text-sm text-[#8A8A8A] mt-2 font-light">
              {activeCategoryObj.subtitle}
            </p>
          </div>

          {/* Quick Category Bar */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'border-[#B8975A] text-[#B8975A] bg-[#141414]'
                    : 'border-[#222222] text-[#8A8A8A] hover:border-[#444444] hover:text-[#FAF8F5]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar: Results, Filters, Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#1A1A1A] gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3 py-2 bg-[#141414] border border-[#2E2E2E] text-xs uppercase tracking-[0.15em] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8975A]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="text-xs text-[#8A8A8A]">
              Showing <span className="font-mono text-[#FAF8F5]">{filteredProducts.length}</span> creations
            </span>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#B8975A] hover:underline flex items-center gap-1 ml-2"
              >
                <X className="w-3 h-3" />
                <span>Clear all filters</span>
              </button>
            )}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-[#8A8A8A] flex items-center gap-1 uppercase tracking-wider">
              <ArrowUpDown className="w-3 h-3 text-[#B8975A]" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141414] border border-[#262626] text-xs text-[#FAF8F5] px-3 py-2 focus:outline-none focus:border-[#B8975A]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-[#1A1A1A]">
            {/* Scent Family Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8975A] font-medium mb-3">
                Scent Family
              </h3>
              <div className="space-y-2">
                {SCENT_FAMILIES.map((fam) => (
                  <label
                    key={fam}
                    className="flex items-center gap-2.5 text-xs text-[#8A8A8A] hover:text-[#FAF8F5] cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="scentFamily"
                      checked={selectedFamily === fam}
                      onChange={() => setSelectedFamily(fam)}
                      className="accent-[#B8975A]"
                    />
                    <span>{fam}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8975A] font-medium mb-3">
                Price Range
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-35', label: 'Under $35' },
                  { id: '35-50', label: '$35 – $50' },
                  { id: 'over-50', label: 'Over $50' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-xs text-[#8A8A8A] hover:text-[#FAF8F5] cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="accent-[#B8975A]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-4 border-t border-[#1C1C1C]">
              <label className="flex items-center gap-2.5 text-xs text-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#B8975A]"
                />
                <span>In Stock &amp; Ready for Studio Pickup</span>
              </label>
            </div>
          </aside>

          {/* Mobile Filter Sheet */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-12 p-6 bg-[#121212] border border-[#2A2A2A] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
                <span className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-xs text-[#8A8A8A] hover:text-[#FAF8F5]"
                >
                  Close
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#B8975A] mb-2 font-medium">Scent Family</p>
                <div className="grid grid-cols-2 gap-2">
                  {SCENT_FAMILIES.map((fam) => (
                    <button
                      key={fam}
                      onClick={() => setSelectedFamily(fam)}
                      className={`p-2 text-left text-xs border ${
                        selectedFamily === fam
                          ? 'border-[#B8975A] text-[#B8975A] bg-[#1A1A1A]'
                          : 'border-[#222222] text-[#8A8A8A]'
                      }`}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#B8975A] mb-2 font-medium">Price Range</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'under-35', label: 'Under $35' },
                    { id: '35-50', label: '$35 – $50' },
                    { id: 'over-50', label: 'Over $50' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriceRange(p.id)}
                      className={`p-2 text-left text-xs border ${
                        priceRange === p.id
                          ? 'border-[#B8975A] text-[#B8975A] bg-[#1A1A1A]'
                          : 'border-[#222222] text-[#8A8A8A]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8A8A8A] hover:text-[#FAF8F5]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="px-6 py-2.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.15em] font-medium"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-[#1C1C1C] bg-[#0E0E0E] p-8">
                <p className="text-base font-serif text-[#FAF8F5] mb-2">No sensory creations found.</p>
                <p className="text-xs text-[#8A8A8A] mb-6">
                  Try adjusting or clearing your filters to explore our full small-batch catalog.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
