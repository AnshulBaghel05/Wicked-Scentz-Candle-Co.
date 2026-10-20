/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, Product, ProductVariant } from '../data/products';
import { PageView, CartItem, CheckoutDetails } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  fulfillmentType: 'shipping' | 'pickup';
  pickupAddress: string;
  shippingAddress?: CheckoutDetails['shippingAddress'];
}

interface StoreContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProductSlug: string | null;
  navigateToProduct: (slug: string) => void;
  navigateToShop: (category?: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountCode: string;
  discountPercent: number;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  shippingFee: number;
  total: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isScentQuizOpen: boolean;
  setIsScentQuizOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: OrderConfirmation | null;
  completeCheckout: (details: CheckoutDetails) => void;
  toasts: Toast[];
  showToast: (message: string) => void;
  studioPickupAddress: string;
  studioPickupHours: string;
}

const StoreContext = createContext<StoreContextType | null>(null);

const FREE_SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING_FEE = 7.50;
const STUDIO_ADDRESS = '144 Wickfield St, Studio B, Brooklyn, NY 11222';
const STUDIO_HOURS = 'Mon–Sat: 10:00 AM – 6:00 PM EST';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>('obsidian-smoked-rose-candle');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Cart state initialized with 1 best seller product for immediate luxury preview
  const [cart, setCart] = useState<CartItem[]>(() => {
    const defaultProduct = PRODUCTS[0];
    const defaultVariant = defaultProduct.variants[0];
    return [
      {
        id: `${defaultProduct.id}-${defaultVariant.id}`,
        productId: defaultProduct.id,
        product: defaultProduct,
        variantId: defaultVariant.id,
        variantName: defaultVariant.name,
        variantSize: defaultVariant.size,
        price: defaultVariant.price,
        quantity: 1,
        image: defaultProduct.images[0]
      }
    ];
  });

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [orderNote, setOrderNote] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScentQuizOpen, setIsScentQuizOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type: 'success' }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const navigateToProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (category: string = 'all') => {
    setSelectedCategory(category);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const activeVariant = variant || product.variants[0];
    const cartItemId = `${product.id}-${activeVariant.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          variantId: activeVariant.id,
          variantName: activeVariant.name,
          variantSize: activeVariant.size,
          price: activeVariant.price,
          quantity,
          image: product.images[0]
        }
      ];
    });

    showToast(`Added "${product.title}" (${activeVariant.size}) to ritual bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const applyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WICKED15' || clean === 'FIRST15') {
      setDiscountCode(clean);
      setDiscountPercent(15);
      showToast('15% Inner Circle discount applied!');
      return true;
    }
    if (clean === 'FREESHIP') {
      setDiscountCode(clean);
      setDiscountPercent(0);
      showToast('Complimentary shipping code applied!');
      return true;
    }
    return false;
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || discountCode === 'FREESHIP';
  const shippingFee = cart.length === 0 || isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const completeCheckout = (details: CheckoutDetails) => {
    const orderNum = `WCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrder({
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total,
      fulfillmentType: details.fulfillmentType,
      pickupAddress: STUDIO_ADDRESS,
      shippingAddress: details.shippingAddress
    });
    setCart([]);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductSlug,
        navigateToProduct,
        navigateToShop,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        applyDiscountCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShipping,
        shippingFee,
        total,
        orderNote,
        setOrderNote,
        giftMessage,
        setGiftMessage,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isScentQuizOpen,
        setIsScentQuizOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        completeCheckout,
        toasts,
        showToast,
        studioPickupAddress: STUDIO_ADDRESS,
        studioPickupHours: STUDIO_HOURS
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
