"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Banknote, CheckCircle2, Landmark, ShoppingBag, UploadCloud } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { useCart } from "@/hooks/useCart";
import { formatAED } from "@/lib/utils/format";
import { useGetQuery, usePostMutation } from "@/store/apiSlice";
import { cn } from "@/lib/utils/cn";

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  branch: string;
  notes: string;
}

interface Receipt {
  url: string;
  publicId: string;
}

interface PlacedOrder {
  id: string;
  orderNumber: string;
  total: number;
  paymentMethod: "cod" | "bank_transfer";
}

type PaymentMethod = "cod" | "bank_transfer";

const inputClasses =
  "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const { data: bankDetailsData } = useGetQuery(
    { path: "/settings/bank-details" },
    { skip: paymentMethod !== "bank_transfer" }
  );
  const bankDetails = bankDetailsData as BankDetails | undefined;

  const [uploadReceipt, { isLoading: isUploading }] = usePostMutation();
  const [createOrder, { isLoading: isPlacingOrder }] = usePostMutation();

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormError(null);
    const body = new FormData();
    body.append("file", file);

    try {
      const result = await uploadReceipt({ path: "/orders/upload-receipt", body }).unwrap();
      const { url, publicId } = result as Receipt;
      setReceipt({ url, publicId });
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setFormError(apiError?.data?.message ?? "Failed to upload receipt. Please try again.");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    if (!name || !phone || !address) {
      setFormError("Please fill in your name, phone number, and delivery address.");
      return;
    }
    if (paymentMethod === "bank_transfer" && !receipt) {
      setFormError("Please upload your bank transfer receipt.");
      return;
    }

    const body = {
      items: items.map(({ productId, productName, productSlug, image, sizeLabel, price, quantity }) => ({
        productId,
        productName,
        productSlug,
        image,
        sizeLabel,
        price,
        quantity,
      })),
      customer: { name, phone, email, address },
      notes,
      paymentMethod,
      ...(paymentMethod === "bank_transfer" && receipt ? { paymentReceiptImage: receipt } : {}),
    };

    try {
      const order = await createOrder({ path: "/orders", body }).unwrap();
      clearCart();
      setPlacedOrder(order as PlacedOrder);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setFormError(apiError?.data?.message ?? "Failed to place your order. Please try again.");
    }
  }

  if (placedOrder) {
    return (
      <div className="py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-fresh-green-500" />
            <h1 className="font-heading text-2xl font-bold text-ocean-950">Order Placed!</h1>
            <p className="text-gray-500">
              Thank you — your order <span className="font-semibold text-ocean-900">{placedOrder.orderNumber}</span> for{" "}
              <span className="font-semibold text-ocean-900">{formatAED(placedOrder.total)}</span> has been received.
              {placedOrder.paymentMethod === "bank_transfer"
                ? " We'll verify your payment and confirm your order shortly."
                : " Please have the amount ready for cash on delivery."}
            </p>
            <Button href="/shop" variant="aqua" size="lg" className="mt-2">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
            <ShoppingBag className="h-10 w-10" />
            <p>Your cart is empty.</p>
            <Button href="/shop" variant="outline">
              Browse Seafood
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <SectionHeading eyebrow="Checkout" title="Complete Your Order" />

        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-8">
            <div className="rounded-3xl border border-gray-100 p-6">
              <h2 className="font-heading text-lg font-bold text-ocean-950">Delivery Details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={inputClasses}
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className={inputClasses}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  aria-label="Email address"
                  className={cn(inputClasses, "sm:col-span-2")}
                />
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery address"
                  aria-label="Delivery address"
                  className={cn(inputClasses, "h-auto py-3 sm:col-span-2")}
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Order notes (optional)"
                  aria-label="Order notes"
                  className={cn(inputClasses, "h-auto py-3 sm:col-span-2")}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 p-6">
              <h2 className="font-heading text-lg font-bold text-ocean-950">Payment Method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors",
                    paymentMethod === "cod"
                      ? "border-aqua-400 bg-aqua-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Banknote className="h-6 w-6 text-ocean-700" />
                  <div>
                    <p className="text-sm font-semibold text-ocean-950">Cash on Delivery</p>
                    <p className="text-xs text-gray-400">Pay when your order arrives</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors",
                    paymentMethod === "bank_transfer"
                      ? "border-aqua-400 bg-aqua-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Landmark className="h-6 w-6 text-ocean-700" />
                  <div>
                    <p className="text-sm font-semibold text-ocean-950">Bank Transfer</p>
                    <p className="text-xs text-gray-400">Pay first, then upload your receipt</p>
                  </div>
                </button>
              </div>

              {paymentMethod === "bank_transfer" && (
                <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-gray-50/60 p-5">
                  {bankDetails ? (
                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      {bankDetails.bankName && (
                        <p>
                          <span className="text-gray-400">Bank:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.bankName}</span>
                        </p>
                      )}
                      {bankDetails.accountName && (
                        <p>
                          <span className="text-gray-400">Account Name:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.accountName}</span>
                        </p>
                      )}
                      {bankDetails.accountNumber && (
                        <p>
                          <span className="text-gray-400">Account Number:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.accountNumber}</span>
                        </p>
                      )}
                      {bankDetails.iban && (
                        <p>
                          <span className="text-gray-400">IBAN:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.iban}</span>
                        </p>
                      )}
                      {bankDetails.swiftCode && (
                        <p>
                          <span className="text-gray-400">Swift Code:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.swiftCode}</span>
                        </p>
                      )}
                      {bankDetails.branch && (
                        <p>
                          <span className="text-gray-400">Branch:</span>{" "}
                          <span className="font-semibold text-ocean-950">{bankDetails.branch}</span>
                        </p>
                      )}
                      {bankDetails.notes && (
                        <p className="sm:col-span-2 text-xs text-gray-400">{bankDetails.notes}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">Loading bank details...</p>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-ocean-950">Upload Payment Receipt</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Please transfer the total amount first, then upload a screenshot or photo of your receipt.
                    </p>
                    <label
                      className={cn(
                        "mt-3 flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
                        receipt
                          ? "border-fresh-green-400 bg-fresh-green-500/5"
                          : "border-gray-200 hover:border-aqua-300"
                      )}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {receipt ? (
                        <>
                          <SeafoodImage
                            src={receipt.url}
                            alt="Uploaded receipt"
                            width={120}
                            height={120}
                            className="rounded-xl object-cover"
                          />
                          <span className="text-xs font-semibold text-fresh-green-600">
                            Receipt uploaded — click to replace
                          </span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-6 w-6 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {isUploading ? "Uploading..." : "Click to upload receipt image"}
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
            <h2 className="font-heading text-lg font-bold text-ocean-950">Order Summary</h2>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={`${item.productId}-${item.sizeLabel}`} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {item.productName} ({item.sizeLabel}) &times;{item.quantity}
                  </span>
                  <span className="font-semibold text-ocean-900">
                    {formatAED(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-gray-200 pt-3 font-heading text-base font-bold text-ocean-950">
              <span>Total</span>
              <span>{formatAED(totalPrice)}</span>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}

            <Button
              type="submit"
              variant="aqua"
              size="lg"
              className="w-full"
              disabled={isPlacingOrder || isUploading}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </Button>

            <Link
              href="/cart"
              className="text-center text-xs font-medium text-ocean-600 hover:underline"
            >
              &larr; Back to Cart
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
}
