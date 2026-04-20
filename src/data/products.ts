import clipperImg from "@/assets/clipper.jpg";
import hairdryerImg from "@/assets/hairdryer.jpg";
import trimmerImg from "@/assets/trimmer.jpg";
import straightenerImg from "@/assets/straightener.jpg";
import curlingImg from "@/assets/curling.jpg";
import accessoriesImg from "@/assets/accessories.jpg";

export type Color = { name: string; hex: string };

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors: Color[];
  images: string[];
  description: string[];
  specs: Record<string, string>;
  services: string[];
};

export const categories = [
  { slug: "all", name: "All Products" },
  { slug: "Clippers", name: "Clippers" },
  { slug: "Hairdryers", name: "Hairdryers" },
  { slug: "Trimmers", name: "Trimmers" },
  { slug: "Straighteners", name: "Straighteners" },
  { slug: "Curling Tools", name: "Curling Tools" },
  { slug: "Accessories", name: "Accessories" },
];

export const allColors: Color[] = [
  { name: "Obsidian", hex: "#0a0a0a" },
  { name: "Royal Gold", hex: "#D4AF37" },
  { name: "Crimson", hex: "#C1121F" },
  { name: "Platinum", hex: "#C0C5CE" },
  { name: "Midnight Blue", hex: "#1B2A4E" },
  { name: "Rose Copper", hex: "#B76E79" },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "professional-clipper-x",
    name: "Professional Clipper X",
    category: "Clippers",
    price: 149,
    originalPrice: 199,
    badge: "Bestseller",
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Royal Gold", hex: "#D4AF37" },
      { name: "Crimson", hex: "#C1121F" },
    ],
    images: [clipperImg, hairdryerImg, trimmerImg],
    description: [
      "High-performance brushless motor for surgical-precision cutting",
      "Ergonomic die-cast aluminum body, balanced for all-day comfort",
      "Self-sharpening Japanese steel blades engineered for longevity",
      "180-minute cordless runtime with rapid magnetic charging",
    ],
    specs: {
      Power: "10W brushless",
      Weight: "300g",
      Technology: "Ionic precision",
      Battery: "180 min runtime",
    },
    services: [
      "2-year international warranty",
      "Free express shipping",
      "24/7 concierge support",
      "Lifetime maintenance program",
    ],
  },
  {
    id: 2,
    slug: "aero-pro-hairdryer",
    name: "Aero Pro Hairdryer",
    category: "Hairdryers",
    price: 289,
    badge: "New",
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Rose Copper", hex: "#B76E79" },
      { name: "Platinum", hex: "#C0C5CE" },
    ],
    images: [hairdryerImg, clipperImg, accessoriesImg],
    description: [
      "Aerodynamic motor delivers 110,000 RPM of controlled airflow",
      "Intelligent heat regulation prevents heat damage",
      "Ionic technology eliminates frizz, locks in shine",
      "Whisper-quiet operation under 76dB",
    ],
    specs: {
      Power: "1800W",
      Weight: "420g",
      Technology: "Ionic + Ceramic",
      Speeds: "3 speeds, 4 heat",
    },
    services: [
      "3-year international warranty",
      "Free express shipping",
      "Premium gift packaging",
      "24/7 concierge support",
    ],
  },
  {
    id: 3,
    slug: "edge-trimmer-elite",
    name: "Edge Trimmer Elite",
    category: "Trimmers",
    price: 119,
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Royal Gold", hex: "#D4AF37" },
    ],
    images: [trimmerImg, clipperImg, accessoriesImg],
    description: [
      "Zero-gap T-blade for crisp lines and seamless fades",
      "Slim profile fits perfectly between fingers",
      "120-minute runtime with quick-charge USB-C",
      "Hypoallergenic titanium-coated blades",
    ],
    specs: {
      Power: "8W",
      Weight: "180g",
      Technology: "Zero-gap T-blade",
      Battery: "120 min runtime",
    },
    services: [
      "2-year international warranty",
      "Free express shipping",
      "Blade replacement program",
      "24/7 concierge support",
    ],
  },
  {
    id: 4,
    slug: "silk-glide-straightener",
    name: "Silk Glide Straightener",
    category: "Straighteners",
    price: 219,
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Rose Copper", hex: "#B76E79" },
      { name: "Royal Gold", hex: "#D4AF37" },
    ],
    images: [straightenerImg, hairdryerImg, accessoriesImg],
    description: [
      "Floating titanium-ceramic plates conform to every strand",
      "Heats to 230°C in under 8 seconds",
      "Smart sensors maintain consistent heat distribution",
      "Universal voltage for global travel",
    ],
    specs: {
      Power: "65W",
      Weight: "350g",
      Technology: "Titanium-Ceramic",
      Heat: "120-230°C",
    },
    services: [
      "3-year international warranty",
      "Free express shipping",
      "Premium travel pouch included",
      "24/7 concierge support",
    ],
  },
  {
    id: 5,
    slug: "ember-curling-wand",
    name: "Ember Curling Wand",
    category: "Curling Tools",
    price: 189,
    badge: "Limited",
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Royal Gold", hex: "#D4AF37" },
      { name: "Rose Copper", hex: "#B76E79" },
    ],
    images: [curlingImg, hairdryerImg, accessoriesImg],
    description: [
      "Tourmaline-infused barrel for glossy, long-lasting curls",
      "Tapered design creates everything from beach waves to tight curls",
      "Heat-resistant glove and protective stand included",
      "60-second instant heat-up technology",
    ],
    specs: {
      Power: "55W",
      Weight: "320g",
      Technology: "Tourmaline ceramic",
      Heat: "150-220°C",
    },
    services: [
      "2-year international warranty",
      "Free express shipping",
      "Heat-resistant glove included",
      "24/7 concierge support",
    ],
  },
  {
    id: 6,
    slug: "atelier-shears-set",
    name: "Atelier Shears Set",
    category: "Accessories",
    price: 349,
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Platinum", hex: "#C0C5CE" },
    ],
    images: [accessoriesImg, clipperImg, trimmerImg],
    description: [
      "Hand-forged Japanese stainless steel by master craftsmen",
      "Convex edge for effortless slide-cutting",
      "Ergonomic offset handle reduces wrist fatigue",
      "Includes thinning shears, comb, and leather case",
    ],
    specs: {
      Material: "Japanese 440C steel",
      Length: '6.0" professional',
      Edge: "Convex hand-honed",
      Weight: "85g",
    },
    services: [
      "Lifetime craftsmanship warranty",
      "Free express shipping",
      "Annual sharpening service",
      "24/7 concierge support",
    ],
  },
  {
    id: 7,
    slug: "fade-master-clipper",
    name: "Fade Master Clipper",
    category: "Clippers",
    price: 179,
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Midnight Blue", hex: "#1B2A4E" },
      { name: "Royal Gold", hex: "#D4AF37" },
    ],
    images: [clipperImg, trimmerImg, accessoriesImg],
    description: [
      "Magnetic motor with 7,200 RPM for clean blunt cuts",
      "Precision-machined fade lever for seamless blending",
      "Premium leather grip for unmatched control",
      "Wireless inductive charging dock included",
    ],
    specs: {
      Power: "12W magnetic",
      Weight: "340g",
      Technology: "Adjustable fade lever",
      Battery: "150 min runtime",
    },
    services: [
      "2-year international warranty",
      "Free express shipping",
      "Charging dock included",
      "24/7 concierge support",
    ],
  },
  {
    id: 8,
    slug: "vortex-pro-dryer",
    name: "Vortex Pro Dryer",
    category: "Hairdryers",
    price: 249,
    colors: [
      { name: "Obsidian", hex: "#0a0a0a" },
      { name: "Crimson", hex: "#C1121F" },
    ],
    images: [hairdryerImg, straightenerImg, accessoriesImg],
    description: [
      "Compact digital motor delivers salon-grade airflow",
      "Three magnetic styling attachments included",
      "Cool-shot lock-in setting for lasting style",
      "Lightweight at just 380g",
    ],
    specs: {
      Power: "1600W",
      Weight: "380g",
      Technology: "Digital motor",
      Speeds: "2 speeds, 3 heat",
    },
    services: [
      "2-year international warranty",
      "Free express shipping",
      "3 magnetic attachments",
      "24/7 concierge support",
    ],
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
