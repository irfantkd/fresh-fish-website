export type FreshState = "fresh" | "frozen";
export type ContentStatus = "draft" | "published";
export type StockStatus = "in_stock" | "out_of_stock";

export interface ImageObject {
  url: string;
  alt?: string;
  caption?: string;
}

export interface ProductOrigin {
  country: string;
  region?: string;
}

export interface ProductSize {
  label: string;
  weightGrams: number;
  price: number;
  compareAtPrice?: number | null;
}

export interface ProductTab {
  title: string;
  content: string;
}

export interface ProductSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categorySlug: string;
  categoryName?: string;
  featuredImage: ImageObject;
  gallery: ImageObject[];
  shortDescription: string;
  description: string;
  benefits: string[];
  origin: ProductOrigin;
  state: FreshState;
  stockStatus?: StockStatus;
  preparationTypes: string[];
  preparationRequired?: boolean;
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isFreshToday?: boolean;
  isSeasonal?: boolean;
  isPremium?: boolean;
  storageInstructions: string;
  tags: string[];
  tabs: ProductTab[];
  status: ContentStatus;
  seo?: ProductSeo;
}

export interface CategorySeo {
  metaTitle?: string;
  metaDescription?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  featuredImage: ImageObject;
  topContent?: string;
  bottomContent?: string;
  productCount: number;
  seo?: CategorySeo;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName?: string;
  createdAt: string;
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

export type CustomerStatus = "active" | "banned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  createdAt: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";
export type PaymentMethod = "cod" | "bank_transfer";
export type PaymentStatus = "unpaid" | "pending_verification" | "verified" | "rejected";

export interface OrderItem {
  productId?: string;
  productName: string;
  productSlug?: string;
  image?: string;
  preparationType?: string;
  sizeLabel: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string | null;
  items: OrderItem[];
  customer: { name: string; phone: string; email?: string; address: string };
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReceiptImage?: { url: string; publicId: string };
  status: OrderStatus;
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  preparationType?: string;
  sizeLabel: string;
  price: number;
  quantity: number;
  notes?: string;
}

// ---------------- Blog ----------------

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  blogCount?: number;
}

export type RobotsMeta = "index-follow" | "noindex-follow" | "noindex-nofollow";

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  robotsMeta?: RobotsMeta;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BlogAuthor {
  name: string;
  position?: string;
  image?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  categoryName?: string;
  status: ContentStatus;
  publishDate: string;
  featuredImage: ImageObject;
  content: string;
  seo: BlogSeo;
  author: BlogAuthor;
  readTimeMinutes: number;
  readTimeOverride?: number | null;
}
