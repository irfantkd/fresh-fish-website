"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { useCart } from "@/hooks/useCart";
import { formatAED } from "@/lib/utils/format";
import { buildCartOrderLink } from "@/lib/utils/whatsapp";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, totalPrice } =
    useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const checkoutHref =
    items.length > 0 && name && address
      ? buildCartOrderLink(items, { name, address })
      : undefined;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-ocean-950">
                <ShoppingBag className="h-5 w-5" /> Your Cart
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-gray-400">
                  <ShoppingBag className="h-10 w-10" />
                  <p>Your cart is empty.</p>
                  <Button href="/shop" variant="outline" size="sm" onClick={closeDrawer}>
                    Browse Seafood
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.sizeLabel}`}
                      className="flex gap-3 rounded-2xl border border-gray-100 p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <SeafoodImage
                          src={item.image}
                          alt={item.productName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-semibold text-ocean-950">
                          {item.productName}
                        </span>
                        <span className="text-xs text-gray-400">{item.sizeLabel}</span>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.sizeLabel,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-4 text-center text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.sizeLabel,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-ocean-900">
                            {formatAED(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.productId, item.sizeLabel)}
                        className="self-start text-gray-300 hover:text-offer-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4">
                <div className="flex items-center justify-between font-heading text-base font-bold text-ocean-950">
                  <span>Total</span>
                  <span>{formatAED(totalPrice)}</span>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery address"
                  className="h-11 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
                />
                <Button href="/checkout" variant="aqua" className="w-full" onClick={closeDrawer}>
                  Proceed to Checkout
                </Button>
                {checkoutHref ? (
                  <Button
                    href={checkoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="w-full"
                  >
                    Checkout via WhatsApp
                  </Button>
                ) : (
                  <Button variant="whatsapp" className="w-full" disabled>
                    Enter name & address to checkout
                  </Button>
                )}
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="text-center text-xs font-medium text-ocean-600 hover:underline"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
