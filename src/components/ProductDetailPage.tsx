/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, Product, ProductReview } from '../data/products';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  MapPin, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  Flame, 
  Check, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductSlug, 
    addToCart, 
    studioPickupAddress, 
    studioPickupHours,
    setCurrentPage,
    navigateToShop,
    showToast
  } = useStore();

  const product: Product = PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('notes');
  const [justAdded, setJustAdded] = useState(false);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(product.reviews);

  const activeVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const isSoldOut = !activeVariant.inStock || activeVariant.stockCount <= 0;
  const isLowStock = activeVariant.stockCount > 0 && activeVariant.stockCount <= 4;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product, activeVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle || 'Sensational formulation',
      comment: newReviewComment,
      verified: true
    };

    setLocalReviews([newRev, ...localReviews]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Your verified review has been submitted.');
  };

  // Cross-sell pairings
  const pairedProducts = PRODUCTS.filter((p) => product.pairsWellWithIds.includes(p.id));

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5] pb-24">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#1A1A1A] py-3.5 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between text-xs text-[#8A8A8A]">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage('home')} className="hover:text-[#FAF8F5] transition-colors">Home</button>
            <span>/</span>
            <button 
              onClick={() => navigateToShop(product.category)} 
              className="hover:text-[#FAF8F5] transition-colors"
            >
              {product.categoryLabel}
            </button>
            <span>/</span>
            <span className="text-[#FAF8F5] font-medium truncate max-w-xs">{product.title}</span>
          </div>

          <button
            onClick={() => navigateToShop(product.category)}
            className="hidden sm:flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#B8975A] hover:underline"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to {product.categoryLabel}</span>
          </button>
        </div>
      </div>

      {/* Main PDP Grid: Gallery Left + Sticky Purchase Module Right */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Image Frame */}
            <div className="relative aspect-[4/5] w-full bg-[#141414] border border-[#222222] overflow-hidden">
              <img
                src={product.images[activeImageIndex] || product.images[0] || '/images/products/fallback-candle.jpg'}
                alt={`${product.title} presentation`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== '/images/products/fallback-candle.jpg') {
                    target.src = '/images/products/fallback-candle.jpg';
                  }
                }}
              />

              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-black/85 text-[#B8975A] border border-[#B8975A]/40 font-medium">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 aspect-[4/5] overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B8975A] opacity-100'
                        : 'border-[#222222] opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== '/images/products/fallback-candle.jpg') {
                          target.src = '/images/products/fallback-candle.jpg';
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Category & Scent Family */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8975A]">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{product.scentFamily}</span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5] tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-[#8A8A8A] mt-1 font-light">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-mono tabular-nums text-[#FAF8F5]">
                  ${activeVariant.price}
                </span>
                {activeVariant.compareAtPrice && (
                  <span className="text-base font-mono tabular-nums line-through text-[#666666]">
                    ${activeVariant.compareAtPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
                <div className="flex text-[#B8975A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-mono text-[#FAF8F5]">{product.rating.toFixed(1)}</span>
                <span className="text-[#666666]">({localReviews.length} reviews)</span>
              </div>
            </div>

            {/* Short Sensory Description */}
            <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Variant Selectors (Size / Format) */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="uppercase tracking-[0.15em] text-[#8A8A8A]">Select Size / Format</span>
                  <span className="text-[#FAF8F5] font-mono">{activeVariant.size}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-3 text-left border text-xs transition-all ${
                        selectedVariantId === v.id
                          ? 'border-[#B8975A] bg-[#171717] text-[#FAF8F5]'
                          : 'border-[#262626] bg-[#0E0E0E] text-[#8A8A8A] hover:border-[#444444]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-[#FAF8F5]">{v.size}</span>
                        <span className="font-mono">${v.price}</span>
                      </div>
                      <span className="text-[10px] text-[#7A7A7A] block">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Warning Notice */}
            {isLowStock && (
              <div className="p-3 bg-[#17120A] border border-[#B8975A]/40 text-xs text-[#B8975A] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#B8975A] shrink-0" />
                <span>Low Stock: Only {activeVariant.stockCount} vessels remaining in this hand-poured batch.</span>
              </div>
            )}

            {/* Quantity and Primary Buy CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#2E2E2E] bg-[#111111] px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isSoldOut}
                    className="p-2 text-[#8A8A8A] hover:text-[#FAF8F5] disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-xs tabular-nums text-[#FAF8F5]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isSoldOut}
                    className="p-2 text-[#8A8A8A] hover:text-[#FAF8F5] disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Main Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className={`flex-1 py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-[#B8975A] text-black border border-[#B8975A]'
                      : isSoldOut
                      ? 'bg-[#1C1C1C] text-[#666666] border border-[#2E2E2E] cursor-not-allowed'
                      : 'bg-[#B8975A] hover:bg-[#D4AF37] text-black border border-[#B8975A]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Ritual Bag</span>
                    </>
                  ) : isSoldOut ? (
                    <span>Sold Out &middot; Join Waitlist</span>
                  ) : (
                    <>
                      <span>Add to Ritual Bag</span>
                      <span className="font-mono">&middot; ${(activeVariant.price * quantity).toFixed(0)}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#666666] text-center">
                Complimentary gift wrapping &amp; custom note available in cart.
              </p>
            </div>

            {/* Local Studio Pickup & Shipping Availability Block */}
            <div className="p-4 bg-[#111111] border border-[#242424] space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B8975A] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[#FAF8F5] uppercase tracking-wider">
                      Brooklyn Studio Pickup
                    </p>
                    <span className="text-[10px] text-[#B8975A] font-mono uppercase">In Stock</span>
                  </div>
                  <p className="text-[11px] text-[#8A8A8A] mt-0.5">
                    Ready in 2 hours at <span className="text-[#FAF8F5]">{studioPickupAddress}</span>
                  </p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{studioPickupHours}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1C1C1C] flex items-center gap-3 text-xs text-[#8A8A8A]">
                <Truck className="w-4 h-4 text-[#B8975A] shrink-0" />
                <span>Complimentary US shipping over $75. Orders ship within 24 hours.</span>
              </div>
            </div>

            {/* Scent Notes Pyramid Block */}
            <div className="p-5 bg-[#141414] border border-[#242424] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B8975A] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Scent Notes Pyramid
                </span>
                <span className="text-[11px] text-[#7A7A7A] font-light">Aromatic profile</span>
              </div>

              <p className="text-xs text-[#A0A0A0] italic">
                &ldquo;{product.scentPyramid.description}&rdquo;
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-4">
                  <span className="w-20 uppercase tracking-[0.15em] text-[#8A8A8A] text-[11px] shrink-0">Top Notes:</span>
                  <span className="text-[#FAF8F5] font-light">{product.scentPyramid.top.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-4 pt-2 border-t border-[#1F1F1F]">
                  <span className="w-20 uppercase tracking-[0.15em] text-[#8A8A8A] text-[11px] shrink-0">Heart Notes:</span>
                  <span className="text-[#FAF8F5] font-light">{product.scentPyramid.heart.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-4 pt-2 border-t border-[#1F1F1F]">
                  <span className="w-20 uppercase tracking-[0.15em] text-[#8A8A8A] text-[11px] shrink-0">Base Notes:</span>
                  <span className="text-[#FAF8F5] font-light">{product.scentPyramid.base.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#111111] border border-[#1F1F1F]">
                <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] block">Burn Time</span>
                <span className="text-[#FAF8F5] font-medium">{product.burnTime}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#1F1F1F]">
                <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] block">Wick</span>
                <span className="text-[#FAF8F5] font-medium">{product.wickType}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#1F1F1F]">
                <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] block">Vessel</span>
                <span className="text-[#FAF8F5] font-medium">{product.vessel}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#1F1F1F]">
                <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] block">Pouring Batch</span>
                <span className="text-[#FAF8F5] font-medium">Under 50 Units</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-[#1F1F1F] border-t border-b border-[#1F1F1F]">
              {/* Accordion 1: Ritual & Candle Care */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('ritual')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] text-[#FAF8F5] hover:text-[#B8975A]"
                >
                  <span>The Burn Ritual &amp; Care</span>
                  {openAccordion === 'ritual' ? <ChevronUp className="w-4 h-4 text-[#B8975A]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'ritual' && (
                  <div className="pb-4 text-xs text-[#8A8A8A] space-y-2">
                    <p>1. <strong>First Burn:</strong> Burn for 3 to 4 hours until the melt pool touches the vessel edges. This creates a wax memory and prevents tunneling.</p>
                    <p>2. <strong>Wooden Wick Care:</strong> Gently snap off brittle charred ash before relighting (maintain 3/16 inch height).</p>
                    <p>3. <strong>Repurposing:</strong> When 1/2 inch of wax remains, wash with warm soapy water to reuse the luxury ceramic tumbler for cocktail glasses or planter vessels.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Clean Standards & Ingredients */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] text-[#FAF8F5] hover:text-[#B8975A]"
                >
                  <span>Clean Standards &amp; Ingredients</span>
                  {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4 text-[#B8975A]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="pb-4 text-xs text-[#8A8A8A] space-y-2">
                    <p>Formulated 100% free of phthalates, parabens, paraffin, and reproductive toxins. Pure botanical coconut and soy wax with IFRA-certified fragrance oils.</p>
                    <ul className="list-disc pl-4 space-y-1 mt-2">
                      {product.safetyInstructions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Studio Pickup Policy */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] text-[#FAF8F5] hover:text-[#B8975A]"
                >
                  <span>Shipping, Studio Pickup &amp; Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-[#B8975A]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#8A8A8A] space-y-2">
                    <p><strong>Studio Pickup:</strong> Select Brooklyn Studio Pickup at checkout. Orders are ready in 2 hours with free pickup at {studioPickupAddress}.</p>
                    <p><strong>Standard US Shipping:</strong> Orders over $75 ship free. Packed with recyclable protective cushioning to withstand thermal fluctuations.</p>
                    <p><strong>Returns:</strong> 30-day return policy on unlit, undamaged creations.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Pairs Well With Section */}
        {pairedProducts.length > 0 && (
          <div className="mt-24 pt-14 border-t border-[#1C1C1C]">
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-1">
                Harmonious Pairings
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight">
                Layers Beautifully With
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pairedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews & Form Section */}
        <div className="mt-24 pt-14 border-t border-[#1C1C1C]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-1">
                Verified Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight">
                Client Impressions &amp; Ratings
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] text-xs uppercase tracking-[0.18em] text-[#FAF8F5] transition-colors self-start sm:self-auto"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-12 p-6 bg-[#111111] border border-[#262626] space-y-4 max-w-xl">
              <h3 className="text-sm uppercase tracking-wider text-[#FAF8F5] font-medium">Leave Your Scent Impression</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-[#8A8A8A] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Julian R."
                    className="w-full px-3 py-2 bg-[#171717] border border-[#2A2A2A] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8A8A8A] block mb-1">Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#171717] border border-[#2A2A2A] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                  >
                    <option value={5}>5 Stars - Perfection</option>
                    <option value={4}>4 Stars - Wonderful</option>
                    <option value={3}>3 Stars - Decent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#8A8A8A] block mb-1">Review Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Intoxicating scent throw and crackle"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#2A2A2A] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8A8A8A] block mb-1">Your Experience</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the burn time, scent throw, and aroma notes..."
                  className="w-full px-3 py-2 bg-[#171717] border border-[#2A2A2A] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-medium"
              >
                Post Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {localReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#0E0E0E] border border-[#1C1C1C]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-[#B8975A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#666666]">{rev.date}</span>
                </div>
                <h4 className="text-sm font-medium text-[#FAF8F5] mb-1">{rev.title}</h4>
                <p className="text-xs text-[#8A8A8A] leading-relaxed mb-3">{rev.comment}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#666666]">
                  <span className="text-[#FAF8F5]">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[#B8975A] flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#262626] p-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-serif text-[#FAF8F5] truncate max-w-[160px]">{product.title}</p>
          <p className="text-xs font-mono text-[#B8975A]">${activeVariant.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`flex-1 py-3 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all ${
            justAdded
              ? 'bg-[#B8975A] text-black'
              : isSoldOut
              ? 'bg-[#222222] text-[#666666]'
              : 'bg-[#B8975A] text-black'
          }`}
        >
          {justAdded ? 'Added!' : isSoldOut ? 'Sold Out' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};
