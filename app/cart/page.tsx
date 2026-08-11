"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { useCart } from "@/hooks/useCart";
import { formatAED } from "@/lib/utils/format";
import { buildCartOrderLink } from "@/lib/utils/whatsapp";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const checkoutHref =
    items.length > 0 && name && phone && address
      ? buildCartOrderLink(items, { name, phone, address, deliveryTime })
      : undefined;

  return (
    <div className="py-12">
      <Container>
        <SectionHeading eyebrow="Your Order" title="Shopping Cart" />

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-24 text-center text-gray-400">
            <ShoppingBag className="h-10 w-10" />
            <p>Your cart is empty.</p>
            <Button href="/shop" variant="outline">
              Browse Seafood
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.sizeLabel}-${item.preparationType ?? ""}`}
                  className="flex gap-4 rounded-3xl border border-gray-100 p-4"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <SeafoodImage
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${item.productSlug}`}
                        className="font-heading text-base font-bold text-ocean-950 hover:underline"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-xs text-gray-400">
                        {item.preparationType ? `${item.preparationType} · ` : ""}
                        {item.sizeLabel}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.sizeLabel,
                              item.quantity - 1,
                              item.preparationType
                            )
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.sizeLabel,
                              item.quantity + 1,
                              item.preparationType
                            )
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-heading text-base font-bold text-ocean-900">
                        {formatAED(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() =>
                      removeItem(item.productId, item.sizeLabel, item.preparationType)
                    }
                    className="self-start text-gray-300 hover:text-offer-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex h-fit flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
              <h2 className="font-heading text-lg font-bold text-ocean-950">Order Summary</h2>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-ocean-900">{formatAED(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-400">
                Delivery fee confirmed via WhatsApp based on your area.
              </p>

              <div className="mt-2 flex flex-col gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery address"
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
                <input
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  placeholder="Preferred delivery time (optional)"
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
              </div>

              <Button href="/checkout" variant="aqua" size="lg" className="w-full">
                Proceed to Checkout
              </Button>

              {checkoutHref ? (
                <Button
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  Checkout via WhatsApp
                </Button>
              ) : (
                <Button variant="whatsapp" size="lg" className="w-full" disabled>
                  Enter name, phone & address to checkout
                </Button>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
