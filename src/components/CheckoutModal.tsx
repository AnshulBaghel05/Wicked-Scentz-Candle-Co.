/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, MapPin, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { CheckoutDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    isFreeShipping,
    total,
    discountAmount,
    discountCode,
    giftMessage,
    orderNote,
    completeCheckout,
    completedOrder,
    studioPickupAddress,
    studioPickupHours,
    setCurrentPage,
    navigateToShop
  } = useStore();

  const [fulfillmentType, setFulfillmentType] = useState<'shipping' | 'pickup'>('pickup');
  const [email, setEmail] = useState('collector@wickedscentz.com');
  const [phone, setPhone] = useState('(917) 555-0198');
  const [firstName, setFirstName] = useState('Anshul');
  const [lastName, setLastName] = useState('Baghel');
  const [address, setAddress] = useState('72 Franklin Street');
  const [apt, setApt] = useState('Suite 4B');
  const [city, setCity] = useState('Brooklyn');
  const [state, setState] = useState('NY');
  const [zip, setZip] = useState('11222');
  const [paymentMethod, setPaymentMethod] = useState<'shoppay' | 'card' | 'applepay'>('shoppay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen && !completedOrder) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const details: CheckoutDetails = {
        email,
        phone,
        fulfillmentType,
        pickupLocation: studioPickupAddress,
        pickupTime: studioPickupHours,
        shippingAddress: {
          firstName,
          lastName,
          address,
          apartment: apt,
          city,
          state,
          zip
        },
        giftMessage,
        orderNote
      };
      completeCheckout(details);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-[#262626] text-[#FAF8F5] shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#222222] flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <span className="text-lg font-serif tracking-[0.18em] uppercase text-[#FAF8F5]">
              WICKED SCENTZ
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-[#B8975A]/40 text-[#B8975A]">
              Secure Shopify &amp; Stripe Checkout
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-[#8A8A8A] hover:text-[#FAF8F5]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Completed Confirmation State */}
        {completedOrder ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1A1811] border border-[#B8975A] flex items-center justify-center mx-auto text-[#B8975A]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
                Ritual Confirmed &middot; {completedOrder.orderNumber}
              </span>
              <h2 className="text-3xl font-serif text-[#FAF8F5] tracking-tight">
                Thank you for your order.
              </h2>
              <p className="text-xs text-[#8A8A8A] max-w-md mx-auto mt-2">
                We have dispatched an encrypted confirmation and receipt to <span className="text-[#FAF8F5]">{email}</span>.
              </p>
            </div>

            {/* Fulfillment Status Box */}
            <div className="max-w-md mx-auto p-5 bg-[#141414] border border-[#262626] text-left space-y-3">
              {completedOrder.fulfillmentType === 'pickup' ? (
                <>
                  <div className="flex items-center gap-2 text-xs text-[#B8975A] font-medium uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Ready for Local Pickup in 2 Hours</span>
                  </div>
                  <p className="text-xs text-[#CCCCCC]">
                    Your candles are being hand-packaged at our Brooklyn studio atelier:
                  </p>
                  <p className="text-xs font-mono text-[#FAF8F5] bg-[#0A0A0A] p-3 border border-[#222222]">
                    {studioPickupAddress}
                    <br />
                    <span className="text-[#7A7A7A] text-[11px]">{studioPickupHours}</span>
                  </p>
                  <p className="text-[11px] text-[#8A8A8A]">
                    Please show your order number <strong className="text-[#FAF8F5]">{completedOrder.orderNumber}</strong> or photo ID upon arrival.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs text-[#B8975A] font-medium uppercase tracking-wider">
                    <Truck className="w-4 h-4" />
                    <span>Preparing for Tracked US Shipping</span>
                  </div>
                  <p className="text-xs text-[#CCCCCC]">
                    Your candles are being safely packed with thermal protection. You will receive tracking details within 24 hours.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  navigateToShop('all');
                }}
                className="px-8 py-3.5 bg-[#B8975A] text-black text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Continue Exploring
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setCurrentPage('home');
                }}
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] text-xs uppercase tracking-[0.2em] text-[#FAF8F5]"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          /* Two-Column Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Contact & Fulfillment Choice */}
            <div className="lg:col-span-7 space-y-6">
              {/* Express Checkout Options */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A8A] mb-2">Express Checkout</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('shoppay')}
                    className={`py-2.5 px-3 border text-xs font-mono font-semibold transition-all ${
                      paymentMethod === 'shoppay'
                        ? 'border-[#5A31F4] bg-[#5A31F4]/20 text-[#A688FF]'
                        : 'border-[#262626] bg-[#141414] text-[#8A8A8A]'
                    }`}
                  >
                    Shop Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2.5 px-3 border text-xs font-mono font-semibold transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-white bg-white/10 text-white'
                        : 'border-[#262626] bg-[#141414] text-[#8A8A8A]'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 border text-xs font-mono font-semibold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#B8975A] bg-[#B8975A]/20 text-[#B8975A]'
                        : 'border-[#262626] bg-[#141414] text-[#8A8A8A]'
                    }`}
                  >
                    Credit Card
                  </button>
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#1F1F1F]"></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase tracking-[0.2em] text-[#666666]">Or enter details</span>
                <div className="flex-grow border-t border-[#1F1F1F]"></div>
              </div>

              {/* Delivery Method Choice (Shipping vs Local Pickup) */}
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] block mb-2 font-medium">
                  Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-3.5 border text-left transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'border-[#B8975A] bg-[#17140E] text-[#FAF8F5]'
                        : 'border-[#262626] bg-[#121212] text-[#8A8A8A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs uppercase tracking-wider font-medium text-[#FAF8F5] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B8975A]" />
                        Studio Pickup
                      </span>
                      <span className="text-[10px] font-mono text-[#B8975A]">FREE</span>
                    </div>
                    <span className="text-[11px] text-[#7A7A7A] block">Ready in 2 hours &middot; Brooklyn Studio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType('shipping')}
                    className={`p-3.5 border text-left transition-all ${
                      fulfillmentType === 'shipping'
                        ? 'border-[#B8975A] bg-[#17140E] text-[#FAF8F5]'
                        : 'border-[#262626] bg-[#121212] text-[#8A8A8A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs uppercase tracking-wider font-medium text-[#FAF8F5] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#B8975A]" />
                        Ship to Address
                      </span>
                      <span className="text-[10px] font-mono text-[#B8975A]">
                        {isFreeShipping ? 'FREE' : '$7.50'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7A7A7A] block">2–4 business days</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Contact Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Phone (for pickup alerts)"
                    className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                  />
                </div>
              </div>

              {/* Conditional Location Details */}
              {fulfillmentType === 'pickup' ? (
                <div className="p-4 bg-[#141414] border border-[#2A2A2A] space-y-2">
                  <p className="text-xs font-medium text-[#FAF8F5] uppercase tracking-wider">
                    Studio Pickup Location:
                  </p>
                  <p className="text-xs text-[#B8975A] font-mono">{studioPickupAddress}</p>
                  <p className="text-[11px] text-[#8A8A8A]">
                    Operating Hours: {studioPickupHours}. You will receive a ready-for-pickup notification as soon as your batch is wrapped.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#FAF8F5] font-medium">Shipping Address</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={apt}
                      onChange={(e) => setApt(e.target.value)}
                      placeholder="Apt / Suite"
                      className="px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="ZIP Code"
                      className="px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                  </div>
                </div>
              )}

              {/* Payment Details */}
              <div className="p-4 bg-[#111111] border border-[#242424] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-medium text-[#FAF8F5]">Payment Guarantee</span>
                  <span className="flex items-center gap-1 text-[#B8975A]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    256-bit Encrypted
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value="•••• •••• •••• 4242 (Encrypted Luxury Gateway)"
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2E2E2E] text-xs text-[#8A8A8A] font-mono"
                />
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-[#B8975A] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Encrypted Ritual...</span>
                ) : (
                  <>
                    <span>Place Ritual Order &middot; ${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-[#0A0A0A] p-6 border border-[#1F1F1F] space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-medium pb-3 border-b border-[#1F1F1F]">
                Order Items ({cart.reduce((a, c) => a + c.quantity, 0)})
              </h3>

              <div className="max-h-64 overflow-y-auto space-y-3 divide-y divide-[#171717]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <img
                      src={item.image || '/images/products/fallback-candle.jpg'}
                      alt=""
                      className="w-12 h-14 object-cover border border-[#262626]"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== '/images/products/fallback-candle.jpg') {
                          target.src = '/images/products/fallback-candle.jpg';
                        }
                      }}
                    />
                    <div className="flex-1 text-xs">
                      <p className="text-[#FAF8F5] font-medium line-clamp-1">{item.product.title}</p>
                      <p className="text-[11px] text-[#7A7A7A]">{item.variantSize} &times; {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-[#FAF8F5]">
                      ${(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-4 border-t border-[#1F1F1F] space-y-2 text-xs">
                <div className="flex justify-between text-[#8A8A8A]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAF8F5]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B8975A]">
                    <span>Discount ({discountCode})</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8A8A8A]">
                  <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Studio Pickup' : 'Shipping'})</span>
                  <span className="font-mono text-[#FAF8F5]">
                    {fulfillmentType === 'pickup' || isFreeShipping ? 'FREE' : '$7.50'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif pt-3 border-t border-[#1F1F1F] text-[#FAF8F5]">
                  <span>Total Due</span>
                  <span className="font-mono text-[#B8975A]">${total.toFixed(2)}</span>
                </div>
              </div>

              {giftMessage && (
                <div className="p-3 bg-[#141414] border border-[#262626] text-xs">
                  <p className="text-[10px] uppercase text-[#B8975A] font-medium">Included Gift Note:</p>
                  <p className="text-[11px] text-[#8A8A8A] italic mt-0.5">&ldquo;{giftMessage}&rdquo;</p>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
