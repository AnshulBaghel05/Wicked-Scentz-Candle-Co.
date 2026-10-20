/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './data/products';

export type PageView = 
  | 'home'
  | 'shop'
  | 'collections'
  | 'product'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping-policy'
  | 'privacy-policy'
  | 'terms';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  variantName: string;
  variantSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutDetails {
  email: string;
  phone: string;
  fulfillmentType: 'shipping' | 'pickup';
  pickupLocation: string;
  pickupTime: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zip: string;
  };
  giftMessage?: string;
  orderNote?: string;
}
