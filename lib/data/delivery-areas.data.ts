import type { DeliveryArea } from "@/types";

export const DELIVERY_AREAS: DeliveryArea[] = [
  { id: "d-1", name: "Dubai Marina", estimatedTime: "Within 2 hours" },
  { id: "d-2", name: "JBR", estimatedTime: "Within 2 hours" },
  { id: "d-3", name: "Business Bay", estimatedTime: "Within 2 hours" },
  { id: "d-4", name: "Al Barsha", estimatedTime: "Within 2 hours" },
  { id: "d-5", name: "Downtown Dubai", estimatedTime: "Within 2 hours" },
  { id: "d-6", name: "Jumeirah", estimatedTime: "Within 2 hours" },
  { id: "d-7", name: "Palm Jumeirah", estimatedTime: "Within 2 hours" },
  { id: "d-8", name: "Arabian Ranches", estimatedTime: "Within 2 hours" },
  { id: "d-9", name: "Mirdif", estimatedTime: "Within 2 hours" },
  { id: "d-10", name: "Silicon Oasis", estimatedTime: "Within 2 hours" },
  { id: "d-11", name: "Deira", estimatedTime: "Within 2 hours" },
];

// Delivered to, beyond Dubai — timing confirmed on WhatsApp when ordering
// since it depends on the destination emirate.
export const OTHER_EMIRATES = [
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];
