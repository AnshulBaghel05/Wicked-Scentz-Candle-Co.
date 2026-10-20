/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, Gift, Tag, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    isFreeShipping,
    total,
    discountCode,
    discountAmount,
    applyDiscountCode,
    orderNote,
    setOrderNote,
    giftMessage,
    setGiftMessage,
    setIsCheckoutOpen,
    addToCart,
    navigateToProduct,
    navigateToShop
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showGiftMessage, setShowGiftMessage] = useState(Boolean(giftMessage));
  const [showOrderNote, setShowOrderNote] = useState(Boolean(orderNote));

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyDiscountCode(couponInput);
    if (!ok) {
      setCouponError('Invalid code. Try WICKED15 or FREESHIP');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Upsell suggestion: Atmosphere Mist or Brass Trimmer
  const upsellProduct = PRODUCTS.find((p) => p.id === 'prod-santol-mist') || PRODUCTS[4];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] border-l border-[#222222] text-[#FAF8F5] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#1C1C1C] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif tracking-[0.1em] uppercase text-[#FAF8F5]">
                Your Ritual Bag
              </h2>
              <span className="text-xs font-mono text-[#B8975A]">({cart.reduce((a, c) => a + c.quantity, 0)})</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#8A8A8A] hover:text-[#FAF8F5] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Threshold Progress Bar */}
          <div className="p-4 bg-[#121212] border-b border-[#1C1C1C]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="text-[#B8975A] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Complimentary Shipping Unlocked
                </span>
              ) : (
                <span className="text-[#8A8A8A]">
                  Add <span className="font-mono text-[#FAF8F5] font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more for Free US Shipping
                </span>
              )}
              <span className="text-[11px] font-mono text-[#8A8A8A]">{progressPercent.toFixed(0)}%</span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-1.5 bg-[#222222] overflow-hidden">
              <div
                className="h-full bg-[#B8975A] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#171717]">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="text-sm font-serif text-[#FAF8F5]">Your ritual bag is currently empty.</p>
                <p className="text-xs text-[#7A7A7A]">Explore our hand-poured candles and discover your evening scent.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToShop('all');
                  }}
                  className="px-6 py-3 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.image || '/images/products/fallback-candle.jpg'}
                    alt={item.product.title}
                    className="w-16 h-20 object-cover bg-[#141414] border border-[#222222] shrink-0"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src !== '/images/products/fallback-candle.jpg') {
                        target.src = '/images/products/fallback-candle.jpg';
                      }
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateToProduct(item.product.slug);
                          }}
                          className="text-xs uppercase tracking-wider font-medium text-[#FAF8F5] hover:text-[#B8975A] cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#666666] hover:text-red-400 p-1"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A7A7A] mt-0.5">{item.variantSize}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#262626] bg-[#111111]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2 text-[#8A8A8A] hover:text-[#FAF8F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs px-2 tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2 text-[#8A8A8A] hover:text-[#FAF8F5]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs tabular-nums text-[#FAF8F5]">
                        ${(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick Upsell Card (When Cart has items) */}
            {cart.length > 0 && upsellProduct && !cart.some((c) => c.productId === upsellProduct.id) && (
              <div className="pt-4">
                <div className="p-3 bg-[#111111] border border-[#222222] flex items-center justify-between gap-3">
                  <img
                    src={upsellProduct.images[0] || '/images/products/fallback-candle.jpg'}
                    alt=""
                    className="w-12 h-14 object-cover border border-[#2A2A2A]"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src !== '/images/products/fallback-candle.jpg') {
                        target.src = '/images/products/fallback-candle.jpg';
                      }
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-[#B8975A]">Ritual Add-on</p>
                    <p className="text-xs text-[#FAF8F5] line-clamp-1">{upsellProduct.title}</p>
                    <p className="text-xs font-mono text-[#8A8A8A]">${upsellProduct.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(upsellProduct)}
                    className="px-3 py-1.5 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-black text-[11px] uppercase tracking-wider transition-colors shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Controls: Gift Message & Order Note */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-3">
              {/* Gift Message Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowGiftMessage(!showGiftMessage)}
                  className="flex items-center gap-2 text-xs text-[#8A8A8A] hover:text-[#FAF8F5]"
                >
                  <Gift className="w-3.5 h-3.5 text-[#B8975A]" />
                  <span>{showGiftMessage ? 'Gift note attached' : 'Add complimentary handwritten gift note'}</span>
                </button>
                {showGiftMessage && (
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Enter your personalized gift message for the recipient..."
                    className="mt-2 w-full p-2 bg-[#171717] border border-[#262626] text-xs text-[#FAF8F5] placeholder-[#555555] focus:outline-none focus:border-[#B8975A]"
                  />
                )}
              </div>

              {/* Order Notes */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowOrderNote(!showOrderNote)}
                  className="text-[11px] text-[#7A7A7A] hover:text-[#FAF8F5]"
                >
                  {showOrderNote ? 'Studio instructions attached' : '+ Add studio delivery instructions'}
                </button>
                {showOrderNote && (
                  <input
                    type="text"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g. Leave with doorman or pickup buzzer notes..."
                    className="mt-1 w-full p-2 bg-[#171717] border border-[#262626] text-xs text-[#FAF8F5] placeholder-[#555555] focus:outline-none focus:border-[#B8975A]"
                  />
                )}
              </div>

              {/* Discount Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#666666] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. WICKED15)"
                    className="w-full pl-8 pr-2 py-2 bg-[#171717] border border-[#262626] text-xs text-[#FAF8F5] uppercase placeholder-[#555555] focus:outline-none focus:border-[#B8975A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#1C1C1C] hover:bg-[#2A2A2A] text-xs uppercase tracking-wider text-[#FAF8F5] border border-[#2E2E2E]"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
              {discountCode && (
                <div className="flex items-center justify-between text-xs text-[#B8975A]">
                  <span>Code {discountCode} Applied:</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer Subtotal & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#1F1F1F] bg-[#0A0A0A] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A8A8A]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#FAF8F5]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B8975A]">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8A8A8A]">
                  <span>Studio Pickup / Shipping</span>
                  <span className="font-mono text-[#FAF8F5]">
                    {isFreeShipping ? 'FREE' : '$7.50'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif pt-2 border-t border-[#1C1C1C] text-[#FAF8F5]">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-[#B8975A]">${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#666666] text-center">
                Taxes and Brooklyn Studio Pickup confirmed at checkout.
              </p>

              {/* Checkout Action */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-[#B8975A] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
