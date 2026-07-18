import { seafoodImage } from "@/lib/utils/seafood-image";
import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "fish",
    name: "Fresh Fish",
    description: "Hand-selected whole fish and fillets, caught daily.",
    image: seafoodImage("fish,market", 1),
    productCount: 18,
  },
  {
    id: "cat-2",
    slug: "salmon",
    name: "Salmon",
    description: "Norwegian and Scottish salmon, fillets and steaks.",
    image: seafoodImage("salmon,fish", 2),
    productCount: 8,
  },
  {
    id: "cat-3",
    slug: "shrimp-prawns",
    name: "Shrimp & Prawns",
    description: "Jumbo tiger prawns and sweet local shrimp.",
    image: seafoodImage("shrimp,prawn", 3),
    productCount: 12,
  },
  {
    id: "cat-4",
    slug: "crab",
    name: "Crab",
    description: "Whole crab and picked crab meat, sustainably sourced.",
    image: seafoodImage("crab,seafood", 4),
    productCount: 6,
  },
  {
    id: "cat-5",
    slug: "lobster",
    name: "Lobster",
    description: "Live and frozen lobster, a premium indulgence.",
    image: seafoodImage("lobster,seafood", 5),
    productCount: 5,
  },
  {
    id: "cat-6",
    slug: "shellfish",
    name: "Shellfish",
    description: "Oysters, mussels, clams and scallops.",
    image: seafoodImage("oyster,shellfish", 6),
    productCount: 10,
  },
];
