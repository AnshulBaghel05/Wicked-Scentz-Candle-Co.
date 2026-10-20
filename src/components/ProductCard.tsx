/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Plus, Check, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, addToCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const primaryImage = product.images[0] || '/images/products/fallback-candle.jpg';
  const secondaryImage = product.images[1] && product.images[1] !== primaryImage ? product.images[1] : null;
  const isLowStock = product.variants[0]?.stockCount <= 4 && product.variants[0]?.stockCount > 0;
  const isSoldOut = !product.variants.some((v) => v.inStock && v.stockCount > 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) {
      navigateToProduct(product.slug);
      return;
    }
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.slug)}
      className="group cursor-pointer flex flex-col bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#B8975A]/50 transition-all duration-300 ease-out"
    >
      {/* 4:5 Architectural Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141414]">
        {/* Subtle Background placeholder while network renders */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] -z-10" />

        {/* Primary Product Image - Always visible by default immediately on page load */}
        <img
          src={primaryImage}
          alt={product.title}
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

        {/* Optional Secondary Image on Hover - Soft dissolve overlay without hiding primary */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100 pointer-events-none"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {/* Subtle Tag (Maximum 1 text tag) */}
        {product.badge && !isSoldOut && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-black/85 text-[#B8975A] border border-[#B8975A]/30 font-medium">
              {product.badge}
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-black/90 text-[#8A8A8A] border border-[#333333]">
              Sold Out
            </span>
          </div>
        )}

        {isLowStock && !isSoldOut && !product.badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-[#1A140A] text-[#B8975A] border border-[#B8975A]/40 font-medium">
              Only {product.variants[0].stockCount} left
            </span>
          </div>
        )}

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            className={`w-full py-2.5 px-4 text-xs tracking-[0.18em] uppercase font-medium flex items-center justify-center gap-2 border transition-all ${
              justAdded
                ? 'bg-[#B8975A] text-black border-[#B8975A]'
                : isSoldOut
                ? 'bg-black/90 text-[#8A8A8A] border-[#333333] cursor-not-allowed'
                : 'bg-[#0A0A0A]/95 text-[#FAF8F5] hover:text-black hover:bg-[#B8975A] border-[#B8975A]/60'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : isSoldOut ? (
              <span>Waitlist</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add &middot; ${product.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Scent Family Line (unboxed text with separator) */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#8A8A8A] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-[#B8975A]/90 truncate">{product.scentFamily}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-serif text-[#FAF8F5] group-hover:text-[#B8975A] transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-[#7A7A7A] line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating Baselines */}
        <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono tabular-nums text-[#FAF8F5]">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-mono tabular-nums line-through text-[#666666]">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8A8A8A]">
            <Star className="w-3 h-3 fill-[#B8975A] text-[#B8975A]" />
            <span className="font-mono tabular-nums text-[#FAF8F5]">{product.rating.toFixed(1)}</span>
            <span className="text-[#666666]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
