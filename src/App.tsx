/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CollectionPage } from './components/CollectionPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { OurStoryPage } from './components/OurStoryPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { ShippingPolicyPage } from './components/ShippingPolicyPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toasts } = useStore();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF8F5] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {(currentPage === 'shop' || currentPage === 'collections') && <CollectionPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'about' && <OurStoryPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'shipping-policy' && <ShippingPolicyPage />}
        {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <ScentQuizModal />
      <CheckoutModal />

      {/* Toast Notification Banner */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#171717] border border-[#B8975A] text-[#FAF8F5] px-4 py-3 text-xs shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <Check className="w-4 h-4 text-[#B8975A] shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
