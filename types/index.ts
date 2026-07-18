export type FreshState = "fresh" | "frozen";

export interface ProductOrigin {
  country: string;
  region?: string;
}

export interface ProductSize {
  label: string;
  weightGrams: number;
  price: number;
  compareAtPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  images: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  origin: ProductOrigin;
  state: FreshState;
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isFreshToday?: boolean;
  isSeasonal?: boolean;
  isPremium?: boolean;
  storageInstructions: string;
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface BannerCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface Banner {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: BannerCta;
  secondaryCta?: BannerCta;
}

export interface DeliveryArea {
  id: string;
  name: string;
  estimatedTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  sizeLabel: string;
  price: number;
  quantity: number;
  notes?: string;
}
