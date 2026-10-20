# Wicked Scentz Candle Co. &ndash; Luxury E-Commerce Storefront

A world-class digital storefront for **Wicked Scentz Candle Co.**, an upscale artisanal home-fragrance atelier based in Brooklyn, New York. Hand-poured small-batch scented candles, architectural 3-wick vessels, botanical soy wax melts, atmosphere mists, and luxury gift sets.

---

## 1. Brand & Design System
- **Color Palette**: Rich Obsidian Black (`#0A0A0A`) canvas, Warm Ivory (`#FAF8F5`) typography, Charcoal (`#141414` / `#1A1A1A`) surfaces, and Restrained Gold (`#B8975A`) reserved strictly for fine hairlines, verified badges, and hover states (&le; 5% visible surface area).
- **Typography**: Cormorant Garamond display serif paired with Plus Jakarta Sans body prose.
- **Imagery**: 100% authentic, high-resolution candle, flame, wax pouring, and interior styling photography downloaded directly into the project source code (`src/assets/images/` and `public/images/`).
- **Tone**: Sensual, dark-luxe, confident (*"Light Something Wicked."*).

---

## 2. Streamlined Customer-Facing Architecture
The website structure has been thoroughly audited and simplified for conversion and luxury presentation:
1. **Home**:
   - Full-bleed campaign hero with measured contrast scrim and dual action buttons (*Shop The Candle Collection* & *Find Your Scent Match*).
   - 5 curated product medium tiles with hover zoom and inventory counters.
   - Signature Bestsellers grid with 4:5 aspect ratio cards, live stock notices, and instant quick-add.
   - Artisanal Brooklyn atelier split section with non-toxic soy wax pledge.
   - Interactive Olfactory Mood Matrix (*Seductive Dusk*, *Hearth & Midnight*, *Decadent Amber*, *Meditative Sanctuary*).
   - Verified customer reviews and four customer trust pillars.
   - Inner Circle 15% discount newsletter capture (`WICKED15`).
2. **Shop (Catalog)**:
   - Complete 12-creation product catalog.
   - Multi-facet interactive filtering by Category, Scent Family, Price Range, and In-Stock Studio Pickup.
   - Real-time sorting (Featured, Price: Low-to-High, Price: High-to-Low, Top Rated, Most Reviewed).
3. **Product Detail Page (PDP)**:
   - High-resolution gallery with thumbnail switcher.
   - Dynamic variant selectors (`11 oz` vs `16 oz Grande 3-Wick`) with live price and stock updates.
   - Visualized **Scent Notes Pyramid** (Top, Heart, and Base notes).
   - Candle specifications: Burn time (65–100 hrs), FSC cherry wood crackling wick, 100% soy-coconut wax, reusable heavy ceramic vessels.
   - **Brooklyn Studio Pickup & Shipping Availability**: In-stock badge with 2-hour collection turnaround.
   - Accordions for burn care rituals, non-toxic standards, and shipping/returns.
   - Harmonious pairing cross-sells and verified customer review submission form.
   - Mobile sticky buy bar for thumb-reach purchase.
4. **Cart Drawer & Checkout Experience**:
   - Slide-out drawer with dynamic progress bar tracking the $75 free shipping milestone.
   - Add-on ritual upsell suggestions.
   - Complimentary handwritten gift note and studio order instructions.
   - Real-time promo code validator (`WICKED15` for 15% off).
   - Branded checkout flow with Shop Pay, Apple Pay, Google Pay, and a toggle between **Local Studio Pickup (Free)** and **Tracked US Shipping**.
5. **About Us / Our Story**:
   - Narrative of small-batch pouring (&lt;50 units per batch), wood wick philosophy, and Brooklyn atelier visit information.
6. **Customer Care & Policies**:
   - **Contact**: Studio address (`144 Wickfield St, Studio B, Brooklyn, NY 11222`), operating hours, direct phone, and contact form.
   - **Candle Care Ritual & FAQ**: The first burn, wooden wick trimming, tunneling prevention, and vessel repurposing.
   - **Shipping & Returns Policy**: Free shipping over $75, 2-hour local pickup, and 30-day returns guarantee.
   - **Privacy Policy & Terms of Service**: Industry-standard compliance and safety agreements.

---

## 3. Deployment Ready for Vercel

The application is pre-configured and tested for immediate zero-config deployment on Vercel:

1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Node.js Version**: 18.x or 20.x
5. **SPA Routing**: `vercel.json` contains the rewrite rule routing all client paths to `/index.html`.
6. **Static Image Assets**: All candle photography is stored locally in `src/assets/images/` and `public/images/`. During `vite build`, all assets are automatically hashed and bundled into `dist/assets/`, guaranteeing permanent uptime and instant loading on Vercel's global CDN.

---

## 4. Development & Build Verification

```bash
# Install dependencies
npm install

# Run local development server (port 3000)
npm run dev

# Run TypeScript check
npm run lint

# Build for production
npm run build
```
