/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../assets/images';

export interface ScentPyramid {
  top: string[];
  heart: string[];
  base: string[];
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'scented-candles' | 'luxury-3wick' | 'wax-melts' | 'room-sprays' | 'gift-sets';
  categoryLabel: string;
  scentFamily: 'Sensual & Smoky' | 'Dark Velvet & Rose' | 'Warm Gourmand' | 'Earthy Botanicals' | 'Crisp & Clean';
  price: number;
  compareAtPrice?: number;
  featured: boolean;
  bestseller?: boolean;
  badge?: 'Best Seller' | 'New' | 'Low Stock' | 'Limited Batch' | 'Holiday Gift';
  rating: number;
  reviewCount: number;
  images: string[];
  scentPyramid: ScentPyramid;
  description: string;
  burnTime: string;
  waxBlend: string;
  wickType: string;
  vessel: string;
  dimensions: string;
  safetyInstructions: string[];
  variants: ProductVariant[];
  reviews: ProductReview[];
  pairsWellWithIds: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-obsidian-rose',
    slug: 'obsidian-smoked-rose-candle',
    title: 'Obsidian & Smoked Rose',
    subtitle: 'Damask Rose Petals, Charred Cedar & Smoked Amber',
    category: 'scented-candles',
    categoryLabel: 'Scented Candles',
    scentFamily: 'Dark Velvet & Rose',
    price: 38,
    compareAtPrice: 44,
    featured: true,
    bestseller: true,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 142,
    images: [
      IMAGES.candleObsidianRose,
      IMAGES.candleInteriorLifestyle,
      IMAGES.heroCandle
    ],
    scentPyramid: {
      top: ['Pink Peppercorn', 'Crushed Blackcurrant', 'Calabrian Bergamot'],
      heart: ['Dark Damask Rose Petals', 'Incense Smoke', 'Guaiacwood'],
      base: ['Smoked Amber', 'Bourbon Vanilla Pod', 'Charred Cedar', 'Black Musk'],
      description: 'A seductive study in contrasts. Crimson damask rose petals touched by hearth smoke, smoothed by Bourbon vanilla bean and mineral amber.'
    },
    description: 'An intoxicating, sultry burn that commands the room. Hand-poured in small batches with our proprietary slow-burning coconut-soy wax and an organic FSC-certified cherry wooden wick that crackles softly like an open fireplace.',
    burnTime: '65–70 Hours',
    waxBlend: '100% Natural Coconut & Soy Wax',
    wickType: 'FSC-Certified Crackling Wooden Wick',
    vessel: 'Handcrafted Matte Black Ceramic Tumbler (Reusable)',
    dimensions: '3.4" D x 4.1" H | Net Wt. 11 oz (312g)',
    safetyInstructions: [
      'Trim wick to 3/16 inch before every lighting.',
      'Allow wax pool to reach the edge of the vessel on first burn to prevent tunneling.',
      'Burn on a level, heat-resistant surface away from drafts, pets, and children.',
      'Never burn for more than 4 consecutive hours.'
    ],
    variants: [
      { id: 'v1-11oz', name: 'Standard Tumbler (11 oz)', size: '11 oz', price: 38, compareAtPrice: 44, inStock: true, stockCount: 18, sku: 'WCK-OBS-11' },
      { id: 'v1-16oz', name: 'Grande 3-Wick (16 oz)', size: '16 oz', price: 56, inStock: true, stockCount: 6, sku: 'WCK-OBS-16' }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Elena V.',
        rating: 5,
        date: 'October 12, 2026',
        title: 'The ultimate sultry evening candle',
        comment: 'This is not your grandmother’s rose. The smoke and amber give it an edgy, gothic richness that fills our two-story loft within twenty minutes. The wooden wick crackle is pure luxury.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marcus K.',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Better than Byredo or Boy Smells',
        comment: 'The scent throw is incredible cold and hot. The heavy matte vessel looks gorgeous on our coffee table.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-grande-avalon', 'prod-bourbon-melts', 'prod-santol-mist']
  },
  {
    id: 'prod-ambre-woods',
    slug: 'lumiere-ambre-woods-candle',
    title: 'Lumière Ambre Woods',
    subtitle: 'Golden Amber Resin, Australian Sandalwood & Vetiver',
    category: 'scented-candles',
    categoryLabel: 'Scented Candles',
    scentFamily: 'Warm Gourmand',
    price: 38,
    featured: true,
    bestseller: true,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 98,
    images: [
      IMAGES.candleAmberNoir,
      IMAGES.candleInteriorLifestyle,
      IMAGES.candleStudioPouring
    ],
    scentPyramid: {
      top: ['Cardamom Pod', 'Sweet Orange Zest', 'Spiced Nutmeg'],
      heart: ['Australian Sandalwood', 'White Birch', 'Cashmere Woods'],
      base: ['Baltic Amber Resin', 'Roasted Tonka Bean', 'Smoked Vetiver'],
      description: 'Golden radiance captured in dark apothecary glass. Sun-warmed woods and aged amber balanced by creamy sandalwood.'
    },
    description: 'Designed for intimate evenings and peaceful unwinding. Housed in custom heavy amber glass that produces an ambient lantern glow while burning.',
    burnTime: '60–65 Hours',
    waxBlend: '100% Pure Soy Wax Blend',
    wickType: 'Sustainable Dual Wooden Wick',
    vessel: 'Heavy UV-Shielded Amber Glass Jar',
    dimensions: '3.2" D x 4.0" H | Net Wt. 10.5 oz (297g)',
    safetyInstructions: [
      'Gently snap off charred wood ash before relighting.',
      'Burn for at least 3 hours during initial lighting.'
    ],
    variants: [
      { id: 'v2-10oz', name: 'Apothecary Amber Jar (10.5 oz)', size: '10.5 oz', price: 38, inStock: true, stockCount: 14, sku: 'WCK-AMB-10' },
      { id: 'v2-16oz', name: 'Grande Apothecary (16 oz)', size: '16 oz', price: 54, inStock: true, stockCount: 5, sku: 'WCK-AMB-16' }
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Sora N.',
        rating: 5,
        date: 'October 3, 2026',
        title: 'Deep, comforting and decadent',
        comment: 'Warm and seductive without being cloying. The amber glass creates the coziest golden light in our bedroom.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-wicked-duo-gift', 'prod-santol-mist']
  },
  {
    id: 'prod-grande-avalon',
    slug: 'avalon-3-wick-grande-hearth-candle',
    title: 'Avalon Grande 3-Wick Hearth Candle',
    subtitle: 'Amber, Charred Sandalwood & Wild Fireplace Embers',
    category: 'luxury-3wick',
    categoryLabel: 'Luxury 3-Wick',
    scentFamily: 'Sensual & Smoky',
    price: 68,
    compareAtPrice: 78,
    featured: true,
    bestseller: true,
    badge: 'Limited Batch',
    rating: 5.0,
    reviewCount: 67,
    images: [
      IMAGES.candleGrande3Wick,
      IMAGES.heroCandle,
      IMAGES.candleObsidianRose
    ],
    scentPyramid: {
      top: ['Smoked Pine Cone', 'Black Pepper', 'Bergamot Zest'],
      heart: ['Charred Sandalwood', 'Incense Bark', 'Virginia Cedar'],
      base: ['Hearth Embers', 'Dark Amber', 'Leather Accord', 'Patchouli'],
      description: 'An architectural centerpiece. Three crackling wicks provide an expansive melt pool and room-filling sillage reminiscent of an alpine fireplace.'
    },
    description: 'Our most substantial creation. Weighing over 22 ounces in a low-profile architectural matte ceramic vessel, equipped with three crackling wooden wicks engineered for open-concept living rooms.',
    burnTime: '90–100 Hours',
    waxBlend: '100% Botanical Soy & Coconut Wax',
    wickType: 'Triple FSC-Certified Wooden Wicks',
    vessel: 'Oversized Hand-Cast Matte Black Ceramic Basin',
    dimensions: '5.2" D x 3.6" H | Net Wt. 22 oz (624g)',
    safetyInstructions: [
      'Light all 3 wicks simultaneously for an even melt pool.',
      'Allow all 3 wax pools to merge completely on every burn.',
      'Keep clear of drafts to avoid smoke.'
    ],
    variants: [
      { id: 'v3-22oz', name: 'Grande 3-Wick Basin (22 oz)', size: '22 oz', price: 68, compareAtPrice: 78, inStock: true, stockCount: 7, sku: 'WCK-AVL-3W' }
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Julian R.',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Fills our entire 2,000 sq ft home',
        comment: 'Worth every single penny. The three wooden wicks crackle in harmony and the vessel is a true piece of modern sculpture.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-brass-ritual-set', 'prod-obsidian-rose']
  },
  {
    id: 'prod-wicked-duo-gift',
    slug: 'nocturne-candle-gift-set-box',
    title: 'The Nocturne Candle & Trimmer Gift Set',
    subtitle: 'Two Hand-Poured Candles + Solid Brass Wick Trimmer',
    category: 'gift-sets',
    categoryLabel: 'Gift Sets',
    scentFamily: 'Dark Velvet & Rose',
    price: 88,
    compareAtPrice: 104,
    featured: true,
    badge: 'Holiday Gift',
    rating: 5.0,
    reviewCount: 52,
    images: [
      IMAGES.candleGiftSetBox,
      IMAGES.candleAmberNoir,
      IMAGES.candleInteriorLifestyle
    ],
    scentPyramid: {
      top: ['Pink Peppercorn', 'Sweet Orange', 'Cardamom'],
      heart: ['Damask Rose', 'Incense Smoke', 'Sandalwood'],
      base: ['Smoked Amber', 'Bourbon Vanilla', 'Charred Cedar'],
      description: 'The ultimate gifting gesture. Includes Obsidian Rose (8.5 oz), Lumière Ambre Woods (8.5 oz), and a solid brushed brass wick trimmer.'
    },
    description: 'Packaged in a rigid, textured matte black presentation box debossed in subtle warm gold foil and tied with a charcoal grosgrain ribbon. The perfect gift for weddings, housewarmings, or personal indulgence.',
    burnTime: '100+ Total Hours (2 x 50 hrs)',
    waxBlend: '100% Natural Coconut & Soy Wax',
    wickType: 'Dual Wooden Wicks + Solid Brass Trimmer',
    vessel: 'Luxury Embossed Presentation Box with Foam Inset',
    dimensions: '11.5" L x 7.0" W x 4.5" H | Net Wt. 17 oz Wax',
    safetyInstructions: [
      'Trim wicks to 3/16 inch using the included brass trimmer before every burn.',
      'Gift box can be repurposed as a keepsake storage case.'
    ],
    variants: [
      { id: 'v-gift-1', name: 'Curated 2-Candle Box + Brass Trimmer', size: '2 x 8.5 oz', price: 88, compareAtPrice: 104, inStock: true, stockCount: 11, sku: 'WCK-GIFT-NOCT' }
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Claire B.',
        rating: 5,
        date: 'October 17, 2026',
        title: 'Unboxing experience was unbelievable',
        comment: 'Sent this to my sister for her new apartment. The packaging looks like a $200 boutique gift. The brass trimmer is hefty and high quality.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-grande-avalon', 'prod-bourbon-melts']
  },
  {
    id: 'prod-bourbon-melts',
    slug: 'bourbon-oak-tonka-wax-melts',
    title: 'Smoked Bourbon & Roasted Tonka Soy Melts',
    subtitle: 'Artisanal Botanical Snap Bar with 24k Gold Flakes',
    category: 'wax-melts',
    categoryLabel: 'Wax Melts',
    scentFamily: 'Warm Gourmand',
    price: 16,
    featured: true,
    bestseller: true,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 112,
    images: [
      IMAGES.waxMeltsBourbonSmoke,
      IMAGES.candleStudioPouring,
      IMAGES.candleAmberNoir
    ],
    scentPyramid: {
      top: ['Aged Kentucky Bourbon', 'Spiced Nutmeg', 'Cinnamon Bark'],
      heart: ['Charred White Oak', 'Raw Honeycomb', 'Coffee Blossom'],
      base: ['Toasted Tonka Bean', 'Golden Amber', 'Smoked Vanilla'],
      description: 'Barrel-aged whiskey sweetness balanced by the nutty richness of roasted tonka beans and hand-charred oak.'
    },
    description: 'Flame-free luxury fragrance. Hand-poured into 6-segment breakable snap bars studded with delicate gold leaf flakes. Delivers 45+ hours of room-filling aroma in any standard wax warmer.',
    burnTime: '45+ Hours Scent Throw',
    waxBlend: '100% Clean-Melt Botanical Soy Wax',
    wickType: 'Flame-Free (Warmer Melts)',
    vessel: 'Compostable Glassine Sleeve with Hand Wax Seal',
    dimensions: '6-Segment Snap Bar | Net Wt. 3.0 oz (85g)',
    safetyInstructions: [
      'Snap off 1–2 cubes and place in approved wax warmer dish.',
      'Do not add water. Do not melt on stovetop.'
    ],
    variants: [
      { id: 'vm-1', name: 'Single Snap Bar (3 oz)', size: '3 oz', price: 16, inStock: true, stockCount: 32, sku: 'WCK-MELT-BRB' },
      { id: 'vm-1-pack3', name: 'Trio Bundle (9 oz)', size: '3 x 3 oz', price: 42, compareAtPrice: 48, inStock: true, stockCount: 15, sku: 'WCK-MELT-BRB-3' }
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Chloe T.',
        rating: 5,
        date: 'October 15, 2026',
        title: 'Throws scent across our entire home',
        comment: 'Just one square fills our open kitchen and living area for three full days. Beautiful packaging with the gold wax seal.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-obsidian-rose', 'prod-ambre-woods']
  },
  {
    id: 'prod-santol-mist',
    slug: 'sandalwood-black-amber-room-spray',
    title: 'Sandalwood & Black Amber Atmosphere Mist',
    subtitle: 'Artisanal Home & Linen Spray with Micro-Fine Atomizer',
    category: 'room-sprays',
    categoryLabel: 'Room Sprays',
    scentFamily: 'Sensual & Smoky',
    price: 32,
    featured: true,
    bestseller: true,
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 76,
    images: [
      IMAGES.roomSpraySantol,
      IMAGES.candleInteriorLifestyle,
      IMAGES.candleAmberNoir
    ],
    scentPyramid: {
      top: ['Crushed Bergamot', 'Spiced Pimento', 'Black Cardamom'],
      heart: ['Creamy Australian Sandalwood', 'Orris Root', 'Smoked Cedar'],
      base: ['Black Amber', 'Musk Crystals', 'Sweet Tobacco Bark'],
      description: 'Instantly resets interior energy. A cloud of smoky sandalwood and resinous amber designed to scent rooms, drapes, and linens.'
    },
    description: 'Crafted with pharmaceutical-grade organic cane alcohol and pure perfume concentrates. Our micro-fine mister produces an ultra-sheer aromatic cloud that hangs in the air and clings softly to fabrics without staining.',
    burnTime: '1,200+ Micro-Mists',
    waxBlend: 'Alcohol-Free Botanical Fragrance Infusion',
    wickType: 'Fine-Mist Atomizer',
    vessel: 'Heavy Amber Glass Apothecary Bottle',
    dimensions: '3.4 fl oz / 100ml',
    safetyInstructions: [
      'Shake gently before misting.',
      'Mist into room air away from open flames and faces.',
      'Safe for cotton, wool, and linen bedding.'
    ],
    variants: [
      { id: 'rs-100', name: '100ml Glass Flask', size: '100ml', price: 32, inStock: true, stockCount: 24, sku: 'WCK-SPR-SNT' }
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Daniel M.',
        rating: 5,
        date: 'October 16, 2026',
        title: 'Instantly elevates our bedroom',
        comment: 'Two spritzes on the duvet in the evening and the room feels like an Aman resort.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-obsidian-rose', 'prod-ambre-woods']
  },
  {
    id: 'prod-cypress-smoke',
    slug: 'cypress-ash-candle',
    title: 'Cypress, Hearth Smoke & Bergamot',
    subtitle: 'Alpine Forest, Crisp Citrus Peel & Smoked Birch Tar',
    category: 'scented-candles',
    categoryLabel: 'Scented Candles',
    scentFamily: 'Sensual & Smoky',
    price: 38,
    featured: false,
    rating: 4.8,
    reviewCount: 43,
    images: [
      IMAGES.cypressAsh,
      IMAGES.candleStudioPouring,
      IMAGES.candleObsidianRose
    ],
    scentPyramid: {
      top: ['Calabrian Bergamot', 'Crushed Pine Needles', 'Eucalyptus Leaf'],
      heart: ['Smoked Cypress', 'Clove Bud', 'Blue Juniper Berry'],
      base: ['Birch Tar', 'Cedarwood Charcoal', 'Haitian Vetiver'],
      description: 'The brisk chill of dusk in an ancient evergreen forest, infused with distant hearth smoke and zesty citrus oils.'
    },
    description: 'An invigorating, grounding woodland scent. Sharp green coniferous needles blackened by birch smoke and warmed by natural cedar oils.',
    burnTime: '60 Hours',
    waxBlend: '100% Coconut & Soy Wax',
    wickType: 'FSC Wooden Wick',
    vessel: 'Architectural Matte Black Glass',
    dimensions: '3.2" D x 3.9" H | Net Wt. 10.5 oz (297g)',
    safetyInstructions: ['Keep wax pool free of wick debris.'],
    variants: [
      { id: 'v-cyp-10', name: 'Standard Tumbler (10.5 oz)', size: '10.5 oz', price: 38, inStock: true, stockCount: 9, sku: 'WCK-CYP-10' }
    ],
    reviews: [
      {
        id: 'r8',
        author: 'David L.',
        rating: 5,
        date: 'October 8, 2026',
        title: 'Pure atmospheric perfection',
        comment: 'Fresh yet dark. Smells like a luxury Scandinavian cabin on a rainy evening.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-santol-mist', 'prod-grande-avalon']
  },
  {
    id: 'prod-velvet-tonka',
    slug: 'velvet-amber-tonka-candle',
    title: 'Velvet Amber & Tonka Hearth Candle',
    subtitle: 'Warm Golden Resin, Toasted Tonka & Vanilla Smoke',
    category: 'scented-candles',
    categoryLabel: 'Scented Candles',
    scentFamily: 'Warm Gourmand',
    price: 38,
    featured: false,
    rating: 4.9,
    reviewCount: 81,
    images: [
      IMAGES.candleAmberNoir,
      IMAGES.candleGrande3Wick,
      IMAGES.candleInteriorLifestyle
    ],
    scentPyramid: {
      top: ['Bitter Almond', 'Cardamom Pod', 'Wild Spiced Honey'],
      heart: ['Peruvian Balsam', 'Tobacco Flower', 'Heliotrope'],
      base: ['Roasted Tonka Bean', 'Dark Amber Resin', 'Cashmere Woods', 'Suede'],
      description: 'Opulent, cocooning warmth. Melted amber swirled with bittersweet almond, toasted tonka, and vintage leather.'
    },
    description: 'Formulated for slow evenings and quiet reading. Velvet Amber balances decadent sweetness with dry resinous woods to avoid feeling overly sugary.',
    burnTime: '65–70 Hours',
    waxBlend: '100% Coconut & Soy Wax',
    wickType: 'FSC Crackling Wooden Wick',
    vessel: 'Heavy Matte Black Ceramic Vessel',
    dimensions: '3.4" D x 4.1" H | Net Wt. 11 oz (312g)',
    safetyInstructions: ['Burn on heat-safe surfaces.'],
    variants: [
      { id: 'v-tonka-11', name: 'Standard Tumbler (11 oz)', size: '11 oz', price: 38, inStock: true, stockCount: 15, sku: 'WCK-TNK-11' }
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Hannah M.',
        rating: 5,
        date: 'October 2, 2026',
        title: 'Decadent without being cloying',
        comment: 'The scent throw while reading in bed is unmatched. The crackling wooden wick is so peaceful.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-bourbon-melts', 'prod-wicked-duo-gift']
  },
  {
    id: 'prod-midnight-fig-melts',
    slug: 'black-fig-tobacco-wax-melts',
    title: 'Black Fig & Pipe Tobacco Soy Melts',
    subtitle: 'Ripe Purple Fig, Sweet Cured Tobacco & Smoked Cedar',
    category: 'wax-melts',
    categoryLabel: 'Wax Melts',
    scentFamily: 'Dark Velvet & Rose',
    price: 16,
    featured: false,
    rating: 4.8,
    reviewCount: 39,
    images: [
      IMAGES.waxMeltsBourbonSmoke,
      IMAGES.candleStudioPouring,
      IMAGES.candleInteriorLifestyle
    ],
    scentPyramid: {
      top: ['Wild Black Fig', 'Plum Nectar', 'Tangerine'],
      heart: ['Virginia Tobacco Leaf', 'Night Blooming Jasmine', 'Coriander'],
      base: ['Dry Cedar', 'Sandalwood', 'Warm Vanilla Resin'],
      description: 'Juicy, shadowy, and addictive. Dark plum and fig nectar enveloped in dry cured pipe tobacco.'
    },
    description: 'Breakable soy wax melt cubes poured with natural botanical extracts. Clean flame-free scent diffusion for hours.',
    burnTime: '40+ Hours',
    waxBlend: '100% Botanical Soy Wax',
    wickType: 'Flame-Free (Warmer Melts)',
    vessel: 'Eco-conscious Kraft Pack',
    dimensions: 'Net Wt. 3.0 oz (85g)',
    safetyInstructions: ['For electric or tealight wax warmers only.'],
    variants: [
      { id: 'vm-fig-1', name: 'Snap Bar (3 oz)', size: '3 oz', price: 16, inStock: true, stockCount: 18, sku: 'WCK-MELT-FIG' }
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Nadia P.',
        rating: 5,
        date: 'September 19, 2026',
        title: 'Mysterious and cozy',
        comment: 'The dark fig is luscious and the tobacco note gives it sophisticated depth.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-obsidian-rose', 'prod-bourbon-melts']
  },
  {
    id: 'prod-white-sage-mist',
    slug: 'white-sage-eucalyptus-cashmere-mist',
    title: 'White Sage, Eucalyptus & Cashmere Mist',
    subtitle: 'Calming Botanical Atmosphere & Pillow Spray',
    category: 'room-sprays',
    categoryLabel: 'Room Sprays',
    scentFamily: 'Crisp & Clean',
    price: 32,
    featured: false,
    rating: 4.9,
    reviewCount: 48,
    images: [
      IMAGES.roomSpraySantol,
      IMAGES.candleInteriorLifestyle,
      IMAGES.candleAmberNoir
    ],
    scentPyramid: {
      top: ['Wild Eucalyptus Leaves', 'Icy Spearmint', 'Lemon Peel'],
      heart: ['White Sage Herbal Infusion', 'French Lavender', 'Rosemary'],
      base: ['Cashmere Woods', 'Clean Musk', 'Clear Amber'],
      description: 'Clearing and meditative. Crisp aromatic greens warmed by soft spun cashmere and clean herbal smoke.'
    },
    description: 'Formulated to restore tranquility and clear stagnant air. Ideal for evening wind-downs, pillowcases, yoga sanctuaries, or post-cooking refresh.',
    burnTime: '1,200+ Micro-Mists',
    waxBlend: 'Botanical Cane Alcohol & Essential Oil Infusion',
    wickType: 'Fine-Mist Atomizer',
    vessel: 'Amber Glass Bottle with Black Atomizer',
    dimensions: '3.4 fl oz / 100ml',
    safetyInstructions: ['For atmospheric room misting and fabric refreshing.'],
    variants: [
      { id: 'rs-euc', name: '100ml Bottle', size: '100ml', price: 32, inStock: true, stockCount: 20, sku: 'WCK-SPR-EUC' }
    ],
    reviews: [
      {
        id: 'r11',
        author: 'Hannah S.',
        rating: 5,
        date: 'October 6, 2026',
        title: 'Authentic eucalyptus, not artificial',
        comment: 'So clean and calming before sleep. We mist our linen pillowcases every evening.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-cypress-smoke', 'prod-santol-mist']
  },
  {
    id: 'prod-atelier-batch',
    slug: 'atelier-reserve-smoked-vanilla-candle',
    title: 'Atelier Reserve: Smoked Vanilla & Cardamom',
    subtitle: 'Small-Batch Hand-Numbered Pouring in Matte Charcoal',
    category: 'scented-candles',
    categoryLabel: 'Scented Candles',
    scentFamily: 'Warm Gourmand',
    price: 42,
    featured: false,
    badge: 'Limited Batch',
    rating: 5.0,
    reviewCount: 31,
    images: [
      IMAGES.candleStudioPouring,
      IMAGES.candleAmberNoir,
      IMAGES.heroCandle
    ],
    scentPyramid: {
      top: ['Black Cardamom', 'Crushed Nutmeg', 'Sweet Bergamot'],
      heart: ['Smoked Vanilla Orchid', 'Dark Cocoa Pod', 'Guaiacwood'],
      base: ['Bourbon Vanilla Bean', 'Charred Oak', 'Velvet Amber'],
      description: 'Rich, non-sweet Madagascar vanilla pods blackened over oak shavings with green cardamom pods.'
    },
    description: 'Each candle is hand-poured in our Brooklyn studio with a batch number handwritten on the base label. Limited to 50 vessels per pour.',
    burnTime: '65–70 Hours',
    waxBlend: '100% Coconut & Soy Wax',
    wickType: 'FSC Crackling Wooden Wick',
    vessel: 'Heavy Matte Charcoal Ceramic Tumbler',
    dimensions: '3.4" D x 4.2" H | Net Wt. 11.5 oz (326g)',
    safetyInstructions: ['Trim wick to 3/16 inch before each burn.'],
    variants: [
      { id: 'v-at-1', name: 'Numbered Tumbler (11.5 oz)', size: '11.5 oz', price: 42, inStock: true, stockCount: 4, sku: 'WCK-RES-01' }
    ],
    reviews: [
      {
        id: 'r12',
        author: 'Simon K.',
        rating: 5,
        date: 'October 18, 2026',
        title: 'Finally a vanilla that is mature and smoky',
        comment: 'Not sugary or synthetic at all. It smells like a luxury cocktail lounge with rich woods.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-grande-avalon', 'prod-brass-ritual-set']
  },
  {
    id: 'prod-brass-ritual-set',
    slug: 'heirloom-brass-wick-trimmer-set',
    title: 'Heirloom Solid Brass Wick Trimmer & Snuffer',
    subtitle: 'Hand-Finished Brushed Brass Candle Care Accessories',
    category: 'gift-sets',
    categoryLabel: 'Gift Sets',
    scentFamily: 'Earthy Botanicals',
    price: 34,
    featured: false,
    rating: 4.9,
    reviewCount: 64,
    images: [
      IMAGES.candleGiftSetBox,
      IMAGES.candleGrande3Wick,
      IMAGES.candleInteriorLifestyle
    ],
    scentPyramid: {
      top: ['Brushed Brass', 'Hand Polished'],
      heart: ['Wick Trimmer Tool', 'Bell Snuffer'],
      base: ['Protective Black Felt Pouch'],
      description: 'The definitive candle care ritual. Extends the burn life and prevents smoke when extinguishing your flame.'
    },
    description: 'Forged from heavy solid brass with an antique brushed finish. The angled trimmer captures charred wick trimmings cleanly, while the articulated bell snuffer extinguishes flames with zero wax splatter or smoke.',
    burnTime: 'Lifetime Durability',
    waxBlend: 'Solid Forged Brass Metal',
    wickType: 'Care Accessory',
    vessel: 'Embossed Black Gift Sleeve & Linen Pouch',
    dimensions: '7.2" Length | Net Wt. 8.4 oz',
    safetyInstructions: ['Wipe clean with a soft dry cloth.'],
    variants: [
      { id: 'v-tool-1', name: 'Trimmer & Snuffer Duo', size: '2-Piece Set', price: 34, inStock: true, stockCount: 16, sku: 'WCK-ACC-BRS' }
    ],
    reviews: [
      {
        id: 'r13',
        author: 'Rebecca G.',
        rating: 5,
        date: 'October 9, 2026',
        title: 'Essential for wooden wick candles',
        comment: 'Beautiful weight in hand. Makes candle lighting feel like an elevated evening ritual.',
        verified: true
      }
    ],
    pairsWellWithIds: ['prod-obsidian-rose', 'prod-grande-avalon', 'prod-ambre-woods']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Candles & Fragrance', count: 12, subtitle: 'Handcrafted small-batch candles and home fragrance' },
  { id: 'scented-candles', label: 'Scented Candles', count: 5, image: IMAGES.candleObsidianRose, subtitle: 'Crackling FSC wooden wicks & pure soy-coconut wax' },
  { id: 'luxury-3wick', label: 'Grande 3-Wick Vessels', count: 1, image: IMAGES.candleGrande3Wick, subtitle: 'Architectural ceramic basins with expansive 100-hour burn' },
  { id: 'wax-melts', label: 'Botanical Wax Melts', count: 2, image: IMAGES.waxMeltsBourbonSmoke, subtitle: 'Flame-free artisanal snap bars infused with 24k gold leaf' },
  { id: 'room-sprays', label: 'Atmosphere Mists', count: 2, image: IMAGES.roomSpraySantol, subtitle: 'Micro-fine organic cane alcohol sprays for spaces & linens' },
  { id: 'gift-sets', label: 'Gift Sets & Accessories', count: 2, image: IMAGES.candleGiftSetBox, subtitle: 'Curated luxury boxed sets and forged solid brass care tools' },
] as const;

export const SCENT_FAMILIES = [
  'All Families',
  'Sensual & Smoky',
  'Dark Velvet & Rose',
  'Warm Gourmand',
  'Earthy Botanicals',
  'Crisp & Clean'
] as const;
