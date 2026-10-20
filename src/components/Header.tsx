/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { PageView } from '../types';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategory,
    navigateToShop,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsScentQuizOpen,
    freeShippingThreshold,
    subtotal
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageView, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    } else if (page === 'shop') {
      setSelectedCategory('all');
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#111111] border-b border-[#222222] text-[#FAF8F5] text-xs py-2 px-4 transition-colors">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between text-center">
          <div className="hidden md:flex items-center gap-2 text-[#8A8A8A] text-[11px] tracking-wider uppercase">
            <span>Brooklyn Atelier &middot; Studio Pickup</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-2 text-center tracking-wide">
            {remainingForFreeShipping === 0 ? (
              <span className="text-[#B8975A] font-medium text-xs">
                Complimentary standard shipping unlocked on your ritual order.
              </span>
            ) : (
              <span className="text-[#FAF8F5]/90 text-xs">
                Complimentary shipping on orders over $75 &middot; Same-day Brooklyn studio pickup
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsScentQuizOpen(true)}
              className="text-[#8A8A8A] hover:text-[#B8975A] text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#B8975A]" />
              <span>Scent Match Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Top Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-xl'
            : 'bg-[#0A0A0A] border-b border-[#1A1A1A] py-5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Clean single-element luxury typography) */}
          <button
            onClick={() => handleNav('home')}
            className="group text-left text-xl sm:text-2xl font-serif tracking-[0.2em] uppercase text-[#FAF8F5] hover:text-[#B8975A] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>WICKED SCENTZ</span>
            <span className="text-[10px] tracking-[0.25em] text-[#8A8A8A] font-sans font-light hidden lg:inline">
              CANDLE CO.
            </span>
          </button>

          {/* Zone 2: Single-Line Clean Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-[#8A8A8A]"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => handleNav('shop', 'all')}
              className={`hover:text-[#FAF8F5] transition-colors whitespace-nowrap ${
                currentPage === 'shop' ? 'text-[#FAF8F5]' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNav('shop', 'scented-candles')}
              className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
            >
              Candles
            </button>
            <button
              onClick={() => handleNav('shop', 'luxury-3wick')}
              className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
            >
              3-Wick Vessels
            </button>
            <button
              onClick={() => handleNav('shop', 'wax-melts')}
              className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
            >
              Wax Melts
            </button>
            <button
              onClick={() => handleNav('shop', 'room-sprays')}
              className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
            >
              Atmosphere Mists
            </button>
            <button
              onClick={() => handleNav('shop', 'gift-sets')}
              className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
            >
              Gift Sets
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-[#FAF8F5] transition-colors whitespace-nowrap ${
                currentPage === 'about' ? 'text-[#FAF8F5]' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-[#FAF8F5] transition-colors whitespace-nowrap ${
                currentPage === 'contact' ? 'text-[#FAF8F5]' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Cart) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8A8A8A] hover:text-[#FAF8F5] transition-colors p-1"
              aria-label="Search Fragrances"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-1 text-xs uppercase tracking-[0.18em] text-[#FAF8F5] hover:text-[#B8975A] transition-colors"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#B8975A]" />
              <span className="hidden sm:inline">Ritual Bag</span>
              <span className="cart-count min-w-5 h-5 flex items-center justify-center text-[10px] font-mono px-1 border border-[#B8975A] text-[#B8975A] bg-[#0A0A0A]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#FAF8F5] hover:text-[#B8975A] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0D0D] border-b border-[#262626] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-3 text-sm uppercase tracking-[0.2em] text-[#8A8A8A]">
              <button
                onClick={() => handleNav('shop', 'all')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Shop All Candles & Fragrance
              </button>
              <button
                onClick={() => handleNav('shop', 'scented-candles')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Scented Candles (Wood Wick)
              </button>
              <button
                onClick={() => handleNav('shop', 'luxury-3wick')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Grande 3-Wick Hearth Candles
              </button>
              <button
                onClick={() => handleNav('shop', 'wax-melts')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Botanical Soy Wax Melts
              </button>
              <button
                onClick={() => handleNav('shop', 'room-sprays')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Atmosphere Room Mists
              </button>
              <button
                onClick={() => handleNav('shop', 'gift-sets')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Gift Sets & Care Tools
              </button>
              <button
                onClick={() => handleNav('about')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                About Our Atelier
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Contact & Studio Pickup
              </button>
              <button
                onClick={() => handleNav('faq')}
                className="block w-full text-left py-2 hover:text-[#FAF8F5] border-b border-[#1A1A1A]"
              >
                Candle Care & FAQ
              </button>
            </div>

            <div className="pt-4 border-t border-[#262626]">
              <button
                onClick={() => {
                  setIsScentQuizOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] border border-[#2E2E2E] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
                Take Scent Match Quiz
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
