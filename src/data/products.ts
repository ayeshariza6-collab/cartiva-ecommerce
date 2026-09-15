export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages: string[];
  badge: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specifications: { label: string; value: string }[];
  isNew?: boolean;
}

export const categories = [
  'Electronics',
  'Fashion',
  'Footwear',
  'Beauty',
  'Accessories',
  'Home & Lifestyle',
] as const;

export const categoryInfo: Record<string, { icon: string; description: string }> = {
  Electronics: { icon: 'Cpu', description: 'Latest gadgets & tech' },
  Fashion: { icon: 'Shirt', description: 'Trendy apparel' },
  Footwear: { icon: 'Footprints', description: 'Step in style' },
  Beauty: { icon: 'Sparkles', description: 'Glow up essentials' },
  Accessories: { icon: 'Watch', description: 'Complete your look' },
  'Home & Lifestyle': { icon: 'Home', description: 'Elevate your space' },
};

const img = (url: string) => url;

export const products: Product[] = [
  // ===== ELECTRONICS (6) =====
  {
    id: 'elec-001',
    name: 'AuraBeats Pro Wireless Headphones',
    category: 'Electronics',
    description: 'Immerse yourself in studio-quality sound with active noise cancellation, 40-hour battery life, and plush memory-foam ear cushions. Bluetooth 5.3 with multi-device pairing.',
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.8,
    reviewCount: 2847,
    image: img('https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/577768/pexels-photo-577768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Best Seller',
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Pearl White', hex: '#f5f5f5' },
      { name: 'Royal Blue', hex: '#1d4ed8' },
    ],
    specifications: [
      { label: 'Driver', value: '40mm Dynamic' },
      { label: 'Battery', value: '40 hours' },
      { label: 'Bluetooth', value: '5.3' },
      { label: 'Weight', value: '250g' },
      { label: 'Warranty', value: '1 Year' },
    ],
    isNew: false,
  },
  {
    id: 'elec-002',
    name: 'Galaxy Edge 5G Smartphone',
    category: 'Electronics',
    description: '6.7-inch AMOLED display, triple camera system with 108MP main sensor, 5000mAh battery, and lightning-fast 5G connectivity. 128GB storage expandable up to 1TB.',
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    rating: 4.7,
    reviewCount: 5632,
    image: img('https://images.pexels.com/photos/7068406/pexels-photo-7068406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/13844013/pexels-photo-13844013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/8148581/pexels-photo-8148581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Hot Deal',
    colors: [
      { name: 'Phantom Black', hex: '#1a1a1a' },
      { name: 'Ocean Blue', hex: '#0c4a6e' },
    ],
    specifications: [
      { label: 'Display', value: '6.7" AMOLED' },
      { label: 'Camera', value: '108MP Triple' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Storage', value: '128GB' },
      { label: 'Warranty', value: '1 Year' },
    ],
    isNew: true,
  },
  {
    id: 'elec-003',
    name: 'PulseFit Smartwatch Series 7',
    category: 'Electronics',
    description: 'Track your health with ECG, SpO2, and 100+ sports modes. Always-on AMOLED display, 7-day battery life, and 5ATM water resistance.',
    price: 7999,
    originalPrice: 12999,
    discount: 38,
    rating: 4.6,
    reviewCount: 1843,
    image: img('https://images.pexels.com/photos/6373177/pexels-photo-6373177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/5237706/pexels-photo-5237706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/37735302/pexels-photo-37735302.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Trending',
    colors: [
      { name: 'Graphite', hex: '#333333' },
      { name: 'Rose Gold', hex: '#b76e79' },
      { name: 'Silver', hex: '#c0c0c0' },
    ],
    specifications: [
      { label: 'Display', value: '1.4" AMOLED' },
      { label: 'Battery', value: '7 days' },
      { label: 'Water Rating', value: '5ATM' },
      { label: 'Sensors', value: 'ECC, SpO2' },
      { label: 'Warranty', value: '1 Year' },
    ],
    isNew: false,
  },
  {
    id: 'elec-004',
    name: 'ZenBook Ultra-Slim Laptop',
    category: 'Electronics',
    description: '14-inch 2.8K OLED display, Intel Core i7, 16GB RAM, 512GB SSD. Ultra-light at 1.2kg with all-day battery life. Perfect for work and creativity.',
    price: 64999,
    originalPrice: 89999,
    discount: 28,
    rating: 4.9,
    reviewCount: 987,
    image: img('https://images.pexels.com/photos/8533587/pexels-photo-8533587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/11129922/pexels-photo-11129922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/93405/pexels-photo-93405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Premium',
    colors: [
      { name: 'Intel Blue', hex: '#0067c8' },
      { name: 'Sage Gray', hex: '#9da39a' },
    ],
    specifications: [
      { label: 'Display', value: '14" 2.8K OLED' },
      { label: 'Processor', value: 'Intel i7' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Weight', value: '1.2kg' },
    ],
    isNew: true,
  },
  {
    id: 'elec-005',
    name: 'SoundWave Portable Bluetooth Speaker',
    category: 'Electronics',
    description: '360-degree immersive sound with deep bass. IPX7 waterproof, 24-hour playtime, and dual pairing. Perfect for parties and outdoor adventures.',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.5,
    reviewCount: 3421,
    image: img('https://images.pexels.com/photos/14017595/pexels-photo-14017595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/374114/pexels-photo-374114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/4171747/pexels-photo-4171747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '40% OFF',
    colors: [
      { name: 'Crimson Red', hex: '#dc2626' },
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Ocean Blue', hex: '#0067c8' },
    ],
    specifications: [
      { label: 'Output', value: '20W RMS' },
      { label: 'Battery', value: '24 hours' },
      { label: 'Waterproof', value: 'IPX7' },
      { label: 'Bluetooth', value: '5.1' },
      { label: 'Weight', value: '580g' },
    ],
    isNew: false,
  },
  {
    id: 'elec-006',
    name: 'AirPods Pro Wireless Earbuds',
    category: 'Electronics',
    description: 'Active noise cancellation, transparency mode, and adaptive EQ. Seamless device switching with charging case providing 30 hours total playback.',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.7,
    reviewCount: 4521,
    image: img('https://images.pexels.com/photos/30981655/pexels-photo-30981655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/33797659/pexels-photo-33797659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Best Seller',
    colors: [
      { name: 'White', hex: '#ffffff' },
    ],
    specifications: [
      { label: 'Driver', value: '11mm Dynamic' },
      { label: 'Battery', value: '6h (30h with case)' },
      { label: 'Bluetooth', value: '5.3' },
      { label: 'Charging', value: 'USB-C + Wireless' },
      { label: 'Water Rating', value: 'IPX4' },
    ],
    isNew: false,
  },

  // ===== FASHION (4) =====
  {
    id: 'fash-001',
    name: 'Urban Explorer Bomber Jacket',
    category: 'Fashion',
    description: 'Premium quilted bomber jacket with water-resistant outer shell and insulated lining. Modern fit with ribbed cuffs and hem for a sleek silhouette.',
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    rating: 4.6,
    reviewCount: 892,
    image: img('https://images.pexels.com/photos/6461400/pexels-photo-6461400.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/13786354/pexels-photo-13786354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/5007234/pexels-photo-5007234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'New Arrival',
    colors: [
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Olive Green', hex: '#556b2f' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    specifications: [
      { label: 'Material', value: 'Polyester Blend' },
      { label: 'Fit', value: 'Regular' },
      { label: 'Care', value: 'Machine Wash' },
      { label: 'Season', value: 'Winter' },
    ],
    isNew: true,
  },
  {
    id: 'fash-002',
    name: 'Classic Oxford Check Shirt',
    category: 'Fashion',
    description: 'Timeless Oxford cotton shirt with a tailored fit. Breathable fabric, button-down collar, and durable stitching. Versatile for office and casual wear.',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.5,
    reviewCount: 1234,
    image: img('https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/18533673/pexels-photo-18533673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '40% OFF',
    colors: [
      { name: 'Blue Check', hex: '#4a90d9' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Gray Check', hex: '#9ca3af' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    specifications: [
      { label: 'Material', value: '100% Cotton' },
      { label: 'Fit', value: 'Tailored' },
      { label: 'Care', value: 'Machine Wash' },
      { label: 'Pattern', value: 'Checkered' },
    ],
    isNew: false,
  },
  {
    id: 'fash-003',
    name: 'Floral Summer Maxi Dress',
    category: 'Fashion',
    description: 'Elegant floral print maxi dress with a flattering A-line silhouette. Lightweight rayon fabric with adjustable straps and side pockets.',
    price: 1899,
    originalPrice: 3299,
    discount: 42,
    rating: 4.7,
    reviewCount: 1567,
    image: img('https://images.pexels.com/photos/8619007/pexels-photo-8619007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/39424445/pexels-photo-39424445.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/21897118/pexels-photo-21897118.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Trending',
    colors: [
      { name: 'Blush Pink', hex: '#de5d83' },
      { name: 'Mint Green', hex: '#98fb98' },
      { name: 'Lavender', hex: '#b39ddb' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specifications: [
      { label: 'Material', value: 'Rayon' },
      { label: 'Fit', value: 'A-Line' },
      { label: 'Length', value: 'Maxi' },
      { label: 'Care', value: 'Hand Wash' },
    ],
    isNew: true,
  },
  {
    id: 'fash-004',
    name: 'Slim Fit Stretch Denim Jeans',
    category: 'Fashion',
    description: 'Premium stretch denim with a slim tapered fit. Comfortable 4-way stretch fabric, five-pocket design, and classic mid-rise waist.',
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.4,
    reviewCount: 2103,
    image: img('https://images.pexels.com/photos/2129970/pexels-photo-2129970.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/4440867/pexels-photo-4440867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/10133275/pexels-photo-10133275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Best Seller',
    colors: [
      { name: 'Indigo Blue', hex: '#4b0082' },
      { name: 'Light Wash', hex: '#a3c8e8' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    specifications: [
      { label: 'Material', value: '98% Cotton, 2% Elastane' },
      { label: 'Fit', value: 'Slim Tapered' },
      { label: 'Rise', value: 'Mid Rise' },
      { label: 'Care', value: 'Machine Wash Cold' },
    ],
    isNew: false,
  },

  // ===== FOOTWEAR (3) =====
  {
    id: 'foot-001',
    name: 'AeroFlex Running Sneakers',
    category: 'Footwear',
    description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole. Engineered for long-distance comfort.',
    price: 2299,
    originalPrice: 3999,
    discount: 43,
    rating: 4.6,
    reviewCount: 1876,
    image: img('https://images.pexels.com/photos/1456733/pexels-photo-1456733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/7857501/pexels-photo-7857501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/13807630/pexels-photo-13807630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Best Seller',
    colors: [
      { name: 'Gray/White', hex: '#cbd5e1' },
      { name: 'Black/Red', hex: '#1a1a1a' },
      { name: 'Blue/White', hex: '#3b82f6' },
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: [
      { label: 'Upper', value: 'Engineered Mesh' },
      { label: 'Sole', value: 'Rubber' },
      { label: 'Cushioning', value: 'EVA Foam' },
      { label: 'Weight', value: '280g' },
    ],
    isNew: false,
  },
  {
    id: 'foot-002',
    name: 'Heritage Leather Boots',
    category: 'Footwear',
    description: 'Handcrafted genuine leather boots with cushioned insole and anti-slip sole. Timeless design that ages beautifully. Perfect for all seasons.',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.8,
    reviewCount: 743,
    image: img('https://images.pexels.com/photos/10939830/pexels-photo-10939830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/16195409/pexels-photo-16195409.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/5889482/pexels-photo-5889482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Premium',
    colors: [
      { name: 'Tan Brown', hex: '#d2b48c' },
      { name: 'Dark Brown', hex: '#654321' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Sole', value: 'TPR' },
      { label: 'Lining', value: 'Leather' },
      { label: 'Warranty', value: '6 Months' },
    ],
    isNew: false,
  },
  {
    id: 'foot-003',
    name: 'ProStride Athletic Running Shoes',
    category: 'Footwear',
    description: 'Performance running shoes with energy-return midsole, ultra-breathable knit upper, and heel stabilizer. Designed for speed and comfort.',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.5,
    reviewCount: 2456,
    image: img('https://images.pexels.com/photos/8454904/pexels-photo-8454904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/7880182/pexels-photo-7880182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/3763869/pexels-photo-3763869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Hot Deal',
    colors: [
      { name: 'White/Blue', hex: '#3b82f6' },
      { name: 'Black/Gray', hex: '#1a1a1a' },
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: [
      { label: 'Upper', value: 'Flyknit' },
      { label: 'Sole', value: 'Carbon Rubber' },
      { label: 'Midsole', value: 'Energy Foam' },
      { label: 'Weight', value: '250g' },
    ],
    isNew: true,
  },

  // ===== BEAUTY (4) =====
  {
    id: 'beau-001',
    name: 'LuxColor Eyeshadow Palette',
    category: 'Beauty',
    description: '18 highly pigmented matte and shimmer shades in warm nude tones. Long-lasting formula with minimal fallout. Includes mirror and dual-ended brush.',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.7,
    reviewCount: 3421,
    image: img('https://images.pexels.com/photos/1327689/pexels-photo-1327689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/1571585/beauty-fashion-background-shop-1571585.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/1213558/pexels-photo-1213558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '50% OFF',
    colors: [
      { name: 'Warm Nudes', hex: '#c4a17a' },
      { name: 'Cool Berries', hex: '#8b4d6e' },
    ],
    specifications: [
      { label: 'Shades', value: '18 Colors' },
      { label: 'Finish', value: 'Matte + Shimmer' },
      { label: 'Net Weight', value: '18g' },
      { label: 'Vegan', value: 'Yes' },
    ],
    isNew: false,
  },
  {
    id: 'beau-002',
    name: 'Élégance Eau de Parfum',
    category: 'Beauty',
    description: 'A sophisticated fragrance with notes of bergamot, jasmine, and sandalwood. Long-lasting eau de parfum that evolves beautifully throughout the day.',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    rating: 4.8,
    reviewCount: 987,
    image: img('https://images.pexels.com/photos/37127787/pexels-photo-37127787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/7703038/pexels-photo-7703038.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/10924522/pexels-photo-10924522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Premium',
    colors: [
      { name: '50ml', hex: '#d4af37' },
      { name: '100ml', hex: '#d4af37' },
    ],
    specifications: [
      { label: 'Volume', value: '50ml / 100ml' },
      { label: 'Type', value: 'Eau de Parfum' },
      { label: 'Notes', value: 'Bergamot, Jasmine, Sandalwood' },
      { label: 'Longevity', value: '8+ hours' },
    ],
    isNew: false,
  },
  {
    id: 'beau-003',
    name: 'VelvetMatte Lipstick Set',
    category: 'Beauty',
    description: 'Set of 3 velvet matte lipsticks in everyday nude shades. Transfer-proof formula with up to 12-hour wear. Enriched with vitamin E and shea butter.',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.5,
    reviewCount: 2876,
    image: img('https://images.pexels.com/photos/7256082/pexels-photo-7256082.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/7810570/pexels-photo-7810570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/7256137/pexels-photo-7256137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Set of 3',
    colors: [
      { name: 'Nude Pink', hex: '#d8a0a0' },
      { name: 'Mauve', hex: '#ae5b7c' },
      { name: 'Terracotta', hex: '#e27b58' },
    ],
    specifications: [
      { label: 'Quantity', value: '3 Lipsticks' },
      { label: 'Finish', value: 'Velvet Matte' },
      { label: 'Wear Time', value: '12 hours' },
      { label: 'Cruelty-Free', value: 'Yes' },
    ],
    isNew: true,
  },
  {
    id: 'beau-004',
    name: 'GlowRevive Skincare Set',
    category: 'Beauty',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Formulated with hyaluronic acid and niacinamide for radiant, hydrated skin.',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.6,
    reviewCount: 1543,
    image: img('https://images.pexels.com/photos/27544691/pexels-photo-27544691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/9642839/pexels-photo-9642839.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/8131582/pexels-photo-8131582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '48% OFF',
    colors: [
      { name: '4-Piece Set', hex: '#e0bbd3' },
    ],
    specifications: [
      { label: 'Pieces', value: '4 Products' },
      { label: 'Key Ingredient', value: 'Hyaluronic Acid' },
      { label: 'Skin Type', value: 'All Types' },
      { label: 'Sulfate-Free', value: 'Yes' },
    ],
    isNew: false,
  },

  // ===== ACCESSORIES (4) =====
  {
    id: 'acc-001',
    name: 'Chrono Classic Stainless Watch',
    category: 'Accessories',
    description: 'Timeless analog watch with stainless steel bracelet, sapphire crystal, and chronograph functionality. Water resistant up to 50m.',
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    rating: 4.7,
    reviewCount: 654,
    image: img('https://images.pexels.com/photos/9713527/pexels-photo-9713527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/8968349/pexels-photo-8968349.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Premium',
    colors: [
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Gold', hex: '#d4af37' },
      { name: 'Rose Gold', hex: '#b76e79' },
    ],
    specifications: [
      { label: 'Movement', value: 'Quartz Chronograph' },
      { label: 'Crystal', value: 'Sapphire' },
      { label: 'Water Resistant', value: '50m' },
      { label: 'Warranty', value: '2 Years' },
    ],
    isNew: false,
  },
  {
    id: 'acc-002',
    name: 'Aviator Polarized Sunglasses',
    category: 'Accessories',
    description: 'Classic aviator sunglasses with UV400 polarized lenses and lightweight metal frame. Includes premium case and cleaning cloth.',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.4,
    reviewCount: 1789,
    image: img('https://images.pexels.com/photos/34978681/pexels-photo-34978681.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/5202046/pexels-photo-5202046.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/5202048/pexels-photo-5202048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '50% OFF',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Gold', hex: '#d4af37' },
      { name: 'Silver', hex: '#c0c0c0' },
    ],
    specifications: [
      { label: 'Lens', value: 'Polarized UV400' },
      { label: 'Frame', value: 'Metal' },
      { label: 'Style', value: 'Aviator' },
      { label: 'Includes', value: 'Case + Cloth' },
    ],
    isNew: false,
  },
  {
    id: 'acc-003',
    name: 'Milano Leather Tote Handbag',
    category: 'Accessories',
    description: 'Spacious genuine leather tote bag with multiple compartments, laptop sleeve, and gold-tone hardware. Elegant design perfect for work and everyday use.',
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    rating: 4.8,
    reviewCount: 876,
    image: img('https://images.pexels.com/photos/14806252/pexels-photo-14806252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/30975839/pexels-photo-30975839.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/9267583/pexels-photo-9267583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Best Seller',
    colors: [
      { name: 'Cognac Brown', hex: '#9a3815' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Dimensions', value: '35x30x12 cm' },
      { label: 'Compartments', value: '5' },
      { label: 'Laptop Fit', value: 'Up to 14"' },
    ],
    isNew: true,
  },
  {
    id: 'acc-004',
    name: 'Urban Voyager Laptop Backpack',
    category: 'Accessories',
    description: 'Water-resistant backpack with padded 15.6-inch laptop compartment, USB charging port, and anti-theft back pocket. Ergonomic straps for all-day comfort.',
    price: 1799,
    originalPrice: 3299,
    discount: 45,
    rating: 4.6,
    reviewCount: 2134,
    image: img('https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/1262692/pexels-photo-1262692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/1447474/pexels-photo-1447474.png?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '45% OFF',
    colors: [
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Charcoal Gray', hex: '#36454f' },
      { name: 'Forest Green', hex: '#228b22' },
    ],
    specifications: [
      { label: 'Capacity', value: '25L' },
      { label: 'Laptop Fit', value: 'Up to 15.6"' },
      { label: 'Material', value: 'Water-resistant Polyester' },
      { label: 'Features', value: 'USB Port, Anti-theft' },
    ],
    isNew: false,
  },

  // ===== HOME & LIFESTYLE (4) =====
  {
    id: 'home-001',
    name: 'Nordic Ceramic Vase Set',
    category: 'Home & Lifestyle',
    description: 'Set of 3 minimalist ceramic vases in complementary shapes and sizes. Perfect for dried flowers, pampas grass, or as standalone decor pieces.',
    price: 1199,
    originalPrice: 2299,
    discount: 48,
    rating: 4.5,
    reviewCount: 678,
    image: img('https://images.pexels.com/photos/5870/purple-white-design-decoration.jpg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/37678045/pexels-photo-37678045.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/6758396/pexels-photo-6758396.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Set of 3',
    colors: [
      { name: 'Matte White', hex: '#f5f5f5' },
      { name: 'Sage Green', hex: '#9da39a' },
      { name: 'Terracotta', hex: '#e27b58' },
    ],
    specifications: [
      { label: 'Quantity', value: '3 Vases' },
      { label: 'Material', value: 'Ceramic' },
      { label: 'Heights', value: '15cm, 20cm, 25cm' },
      { label: 'Finish', value: 'Matte' },
    ],
    isNew: false,
  },
  {
    id: 'home-002',
    name: 'Aromatherapy Scented Candle Trio',
    category: 'Home & Lifestyle',
    description: 'Set of 3 soy wax candles with lavender, vanilla, and sandalwood scents. 40-hour burn time each. Natural cotton wicks for clean burning.',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.7,
    reviewCount: 1456,
    image: img('https://images.pexels.com/photos/6724505/pexels-photo-6724505.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/32259042/pexels-photo-32259042.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/4316450/pexels-photo-4316450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: 'Trending',
    colors: [
      { name: 'Lavender', hex: '#b39ddb' },
      { name: 'Vanilla', hex: '#f3e5ab' },
      { name: 'Sandalwood', hex: '#ca965b' },
    ],
    specifications: [
      { label: 'Quantity', value: '3 Candles' },
      { label: 'Wax', value: 'Natural Soy' },
      { label: 'Burn Time', value: '40h each' },
      { label: 'Weight', value: '200g each' },
    ],
    isNew: true,
  },
  {
    id: 'home-003',
    name: 'Modern LED Desk Lamp',
    category: 'Home & Lifestyle',
    description: 'Adjustable LED desk lamp with 3 color temperatures and 5 brightness levels. USB charging port, touch controls, and flexible gooseneck design.',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.6,
    reviewCount: 943,
    image: img('https://images.pexels.com/photos/6265942/pexels-photo-6265942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/4597993/pexels-photo-4597993.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/5998056/pexels-photo-5998056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '48% OFF',
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    specifications: [
      { label: 'Power', value: '10W LED' },
      { label: 'Color Temp', value: '2700K-6500K' },
      { label: 'Brightness', value: '5 Levels' },
      { label: 'Features', value: 'USB Port, Touch Control' },
    ],
    isNew: false,
  },
  {
    id: 'home-004',
    name: 'Artisan Ceramic Coffee Mug Set',
    category: 'Home & Lifestyle',
    description: 'Set of 4 handcrafted ceramic mugs with unique reactive glaze. Microwave and dishwasher safe. Each mug is one-of-a-kind with subtle variations.',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.8,
    reviewCount: 1234,
    image: img('https://images.pexels.com/photos/1724181/pexels-photo-1724181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    additionalImages: [
      img('https://images.pexels.com/photos/9261414/pexels-photo-9261414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
      img('https://images.pexels.com/photos/31046284/pexels-photo-31046284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
    ],
    badge: '50% OFF',
    colors: [
      { name: 'Speckled Cream', hex: '#e8dcc4' },
      { name: 'Ocean Blue', hex: '#4a90d9' },
      { name: 'Forest Green', hex: '#228b22' },
    ],
    specifications: [
      { label: 'Quantity', value: '4 Mugs' },
      { label: 'Material', value: 'Stoneware Ceramic' },
      { label: 'Capacity', value: '350ml each' },
      { label: 'Care', value: 'Microwave & Dishwasher Safe' },
    ],
    isNew: false,
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.rating >= 4.7).slice(0, 8);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.badge === 'Best Seller' || p.reviewCount > 2000).slice(0, 8);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
