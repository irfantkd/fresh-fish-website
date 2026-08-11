import {
  FileText,
  Apple,
  Truck,
  Snowflake,
  HelpCircle,
  ClipboardList,
  Ruler,
  AlertTriangle,
  MapPin,
  ChefHat,
  Star,
  Info,
  type LucideIcon,
} from "lucide-react";

const RULES: [RegExp, LucideIcon][] = [
  [/description|overview|about/i, FileText],
  [/nutrition|calorie|health|ingredient/i, Apple],
  [/ship|delivery|deliver/i, Truck],
  [/storage|store|care|handling|freeze|frozen/i, Snowflake],
  [/faq|question/i, HelpCircle],
  [/spec|specification|detail/i, ClipboardList],
  [/size|dimension|weight/i, Ruler],
  [/allerg|warning|caution/i, AlertTriangle],
  [/origin|source|sourcing|catch/i, MapPin],
  [/cook|recipe|prepare|preparation/i, ChefHat],
  [/review|rating|feedback/i, Star],
];

/** Picks a reasonable Lucide icon for a product tab based on its title. */
export function getProductTabIcon(title: string): LucideIcon {
  const match = RULES.find(([pattern]) => pattern.test(title));
  return match ? match[1] : Info;
}
