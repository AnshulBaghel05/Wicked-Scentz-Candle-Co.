/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Clock, Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { studioPickupAddress, studioPickupHours, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('pickup');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been delivered to the studio concierge.');
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#FAF8F5]">
      {/* Header */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-b border-[#1A1A1A] text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8975A] font-medium block mb-2">
            Atelier Inquiries
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5]">
            Contact The Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mt-2 font-light">
            Whether inquiring about local pickup, custom bulk gifting, wholesale partnerships, or bespoke batch scents.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Studio Details Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B8975A] font-medium block mb-3">
                Local Pickup Location
              </span>
              <div className="p-6 bg-[#0E0E0E] border border-[#222222] space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#FAF8F5]">Brooklyn Atelier</h3>
                    <p className="text-xs text-[#8A8A8A] mt-1">{studioPickupAddress}</p>
                    <p className="text-[11px] text-[#666666] mt-1">Ground floor, ring buzzer B</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-[#1C1C1C]">
                  <Clock className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#FAF8F5]">Pickup & Visiting Hours</h3>
                    <p className="text-xs text-[#8A8A8A] mt-1">{studioPickupHours}</p>
                    <p className="text-[11px] text-[#666666] mt-1">Sunday: Closed for small-batch pourings</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-[#1C1C1C]">
                  <Mail className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#FAF8F5]">Direct Email</h3>
                    <p className="text-xs text-[#8A8A8A] mt-1">concierge@wickedscentz.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-[#1C1C1C]">
                  <Phone className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#FAF8F5]">Studio Telephone</h3>
                    <p className="text-xs text-[#8A8A8A] mt-1">+1 (718) 555-0924</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Gifting Card */}
            <div className="p-6 bg-[#121212] border border-[#222222] space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-[#B8975A] font-medium">Bespoke Gifting & Events</h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                Planning corporate holiday gifting, luxury wedding guest favors, or private label candles? We formulate bespoke scent profiles with custom laser-engraved wooden lids.
              </p>
            </div>
          </div>

          {/* Contact Form Right Column */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-[#0E0E0E] border border-[#222222]">
              <h3 className="text-xl font-serif text-[#FAF8F5] mb-2">Send an Atelier Message</h3>
              <p className="text-xs text-[#8A8A8A] mb-6">Our studio manager responds to all inquiries within 12 business hours.</p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-[#B8975A] mx-auto" />
                  <h4 className="text-xl font-serif text-[#FAF8F5]">Message Received</h4>
                  <p className="text-xs text-[#8A8A8A] max-w-sm mx-auto">
                    Thank you, {name}. A member of our Brooklyn atelier will follow up with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#171717] border border-[#2E2E2E] text-xs uppercase tracking-wider text-[#FAF8F5]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8A8A8A] block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian Russell"
                        className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#8A8A8A] block mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. julian@domain.com"
                        className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A8A8A] block mb-1">Topic</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    >
                      <option value="pickup">Studio Pickup Question</option>
                      <option value="custom">Bespoke Custom Gifting / Events</option>
                      <option value="wholesale">Wholesale Retail Stockist Inquiry</option>
                      <option value="general">Product Formulation Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A8A8A] block mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details regarding your order, event timeline, or custom notes..."
                      className="w-full p-3 bg-[#141414] border border-[#282828] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#B8975A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#B8975A] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Send Message to Atelier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
