import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  const allItems = [{ name: "Home", url: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(allItems)) }}
      />
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        return (
          <span key={item.url} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {isLast ? (
              <span className="font-medium text-ocean-900">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-ocean-700">
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
