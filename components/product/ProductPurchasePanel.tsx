"use client";

import { Minus, Plus, ShoppingCart, Snowflake, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatAED, formatWeight, stripHtml } from "@/lib/utils/format";
import { buildProductInquiryLink } from "@/lib/utils/whatsapp";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

const DESCRIPTION_PREVIEW_THRESHOLD = 180;

export function ProductPurchasePanel({ product }: { product: Product }) {
  const isOutOfStock = product.stockStatus === "out_of_stock";
  const hasPreparationTypes = product.preparationTypes.length > 0;
  const [preparationType, setPreparationType] = useState<string | null>(null);
  const [preparationError, setPreparationError] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addItem, openDrawer } = useCart();
  const size = product.sizes[sizeIndex];
  const plainDescription = stripHtml(product.description);

  function handleAddToCart() {
    if (isOutOfStock) return;
    if (product.preparationRequired && !preparationType) {
      setPreparationError(true);
      return;
    }

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.featuredImage.url,
      preparationType: preparationType ?? undefined,
      sizeLabel: size.label,
      price: size.price,
      quantity,
    });
    openDrawer();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {isOutOfStock && <Badge variant="outOfStock">Out of Stock</Badge>}
        {product.isFreshToday && <Badge variant="fresh">Fresh Today</Badge>}
        {product.isPremium && <Badge variant="premium">Premium</Badge>}
        {product.state === "frozen" && <Badge variant="frozen">Frozen</Badge>}
        {product.isBestSeller && <Badge variant="offer">Best Seller</Badge>}
      </div>

      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-aqua-600">
          {product.origin.country}
          {product.origin.region ? ` — ${product.origin.region}` : ""}
        </span>
        <h1 className="mt-1 font-heading text-3xl font-bold text-ocean-950 sm:text-4xl">
          {product.name}
        </h1>
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        {isDescriptionExpanded ? (
          <div
            className="cms-content text-base text-gray-500"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        ) : (
          <p className="line-clamp-3 text-base leading-relaxed text-gray-500">
            {plainDescription}
          </p>
        )}
        {plainDescription.length > DESCRIPTION_PREVIEW_THRESHOLD && (
          <button
            type="button"
            onClick={() => setIsDescriptionExpanded((prev) => !prev)}
            className="text-sm font-semibold text-aqua-600 hover:text-aqua-700"
          >
            {isDescriptionExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {hasPreparationTypes && (
        <div>
          <span className="mb-2 block text-sm font-semibold text-ocean-950">
            Select Type{product.preparationRequired ? "" : " (optional)"}
          </span>
          <div className="flex flex-wrap gap-2">
            {product.preparationTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setPreparationType(type);
                  setPreparationError(false);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  preparationType === type
                    ? "border-ocean-800 bg-ocean-800 text-white"
                    : "border-gray-200 text-ocean-900 hover:border-ocean-300"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          {preparationError && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              Please select a type before adding to cart.
            </p>
          )}
        </div>
      )}

      <div>
        <span className="mb-2 block text-sm font-semibold text-ocean-950">
          Select Size / Weight
        </span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSizeIndex(i)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition-colors",
                sizeIndex === i
                  ? "border-ocean-800 bg-ocean-800 text-white"
                  : "border-gray-200 hover:border-ocean-300"
              )}
            >
              <span className="block text-sm font-semibold">{s.label}</span>
              <span
                className={cn(
                  "block text-xs",
                  sizeIndex === i ? "text-white/70" : "text-gray-400"
                )}
              >
                {formatWeight(s.weightGrams)} &middot; {formatAED(s.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-wrap gap-2">
        {product.benefits.map((benefit) => (
          <li
            key={benefit}
            className="rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700"
          >
            {benefit}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
        <div>
          <span className="block font-heading text-2xl font-bold text-ocean-900">
            {formatAED(size.price * quantity)}
          </span>
          <span className="text-xs text-gray-400">
            {quantity} x {formatWeight(size.weightGrams)}
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
          <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="h-4.5 w-4.5" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        {isOutOfStock ? (
          <Button variant="whatsapp" size="lg" className="flex-1" disabled>
            <MessageCircle className="h-4.5 w-4.5" /> Order on WhatsApp
          </Button>
        ) : (
          <Button
            href={buildProductInquiryLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="flex-1"
          >
            <MessageCircle className="h-4.5 w-4.5" /> Order on WhatsApp
          </Button>
        )}
      </div>

      <div className="flex items-start gap-2 rounded-2xl bg-ocean-50 p-4 text-sm text-ocean-800">
        <Snowflake className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{product.storageInstructions}</p>
      </div>
    </div>
  );
}
